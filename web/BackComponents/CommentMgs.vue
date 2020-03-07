<template>
    <div class="commentMsg">
        <div class="head">共有{{this.totalCommentNum}}条评论关于</div>
        <!-- <div class="user_input">
            <p>发表评论</p>
            <p>电子邮件地址不会被公开。必须项已用<strong>*</strong>标注</p>
            <div>
                <label for="content" >内容<strong>*</strong></label>
                <textarea id="content" ref='comment_content'></textarea>
            </div>
            <div>
                <label for="name">昵称<strong>*</strong></label>
                <textarea id="name" ref='comment_name'></textarea>
            </div>
            <div>
                <label for="email">邮箱<strong>*</strong></label>
                <textarea id="email" ref='comment_mail'></textarea>
            </div>
            <el-button type="primary" round @click='postComment'>提交评论</el-button>
        </div> -->
        <div class="clear_float" v-for="(item,index) in commentlist" :key="item.id" >
            <div class="left">{{item.comment_name[0]}}</div>
            <div class="right">
                <span style='color:black'>{{item.comment_name}}</span><span>&nbsp;&nbsp;{{item.comment_time|dateFormat}}</span>
                
                回复了你的文章<span class="reply">{{item.title}}</span>
                <span class='hideEditButton'  @click='delectComment(item.id)' style='cursor:pointer;color:red' >&nbsp;&nbsp;&nbsp;&nbsp;删除</span>
                <span class='hideEditButton show' @click='showInput(index)' style='cursor:pointer;color:#409EFF'>回复</span>
                
                <p><span class='reply'>{{item.reply_name?'回复用户:'+item.reply_name+`&nbsp;&nbsp;`+"":''}}</span>{{item.comment_content}}</p>
                <span class="time">{{item.comment_time|dateFormat}}</span>
                <!-- <div > -->
                    <!-- </div> -->
                
                <div class='reply_com showInputReply'>
                    <!-- {{item.id}} -->
                    <el-input
                        type="textarea"
                        show-word-limit 
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容,最大长度为300"
                        maxlength='300'
                        v-model='item.reply_comment'>
                    </el-input>
                    <button @click='postComment(index,item.articleid,item.comment_name,item.title)'>提交</button>
                
                </div>
            </div>
        </div>
  
  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.currentPage"
      :page-size='this.perPageNum'
      layout="total, sizes, prev, pager, next, jumper"
      :total='this.totalCommentNum'>
    </el-pagination>
  </div>
        <!-- <div class="getMoreCommentBut">
            <button id='getMoreComment' @click='getComment' ref='getMoreComment' name='qq'>加载更多评论</button>
        </div> -->
         </div>
    
</template>

<script>
// import commonHomeBody from './CommonHomeBody.vue'
import { apiDomin } from '../utils'
export default {
    data(){
        return {
            currentPage: 1,
            commentlist:[],
            perPageNum:10,
            flag:0,//新增了几条评论，导致分页获取评论时 index向后增加多少
            totalCommentNum:0,
            inputReply:''
        }
    },
    created(){
        this.flag=0;
        this.getComment(1);
        this.getCommentNum();
    },
    methods:{ 
        handleSizeChange(val){
            this.perPageNum=Number.parseInt(val);
            console.log(`每页 ${val} 条`);
             this.getComment();
        },
        handleCurrentChange(val) {
            this.currentPage=Number.parseInt(val);
            this.getComment();
            console.log(`当前页: ${val}`)
        },
        //取消回复 回复 切换 引起回复评论的输入框的隐藏/显示的切换
        showInput(index){
            let value=document.querySelectorAll(".show")[index].innerHTML;
          
            document.querySelectorAll(".show")[index].innerHTML = value=='回复'?'取消回复':'回复';
            // console.log(document.querySelectorAll(".showInputReply")[index].classList);
            document.querySelectorAll(".showInputReply")[index].classList.toggle('reply_com');
            // document.querySelectorAll(".reply_com")[index].style.display='block';
        },
        getCommentNum(){
            this.$http.get(apiDomin('back/comment/getCommentCount')).then(result=>{
                this.totalCommentNum=result.data[0]['count(1)'];
                // this.$emit('getCommentNum', this.comment_num);
            })
        },
        getComment(){
            console.log(this.id);
            // this.pageIndex++;
            let pageIndex=this.currentPage-1;
            //得到文章id为this.id的所有评论
            this.$http.get(apiDomin(`back/comment/getCommentList?pageIndex=${pageIndex}&perPageNum=${this.perPageNum}&flag=${this.flag}`)).then(result=>{
                // if(result.body.length==0) this.$refs.getMoreComment.innerHTML='无更多评论';
                this.commentlist=result.body;
            })
        },
        postComment(index,articleid,reply_name,title){
            // document.getElementById()
            console.log("添加评论");
            let comment_content=this.commentlist[index].reply_comment;
            let alertmsg='';
            let comment_time=this.commentDate();
            console.log(comment_time+"  "+reply_name+" "+comment_content);
            // console.log("comment_content"+comment_content+" "+"comment_name"+comment_name)
            if(!comment_content||!reply_name){
                alertmsg='您提交的评论信息不完整！';
            }
            if(!alertmsg){
                this.$http.post(apiDomin(`home/comment/postComment/${articleid}`),
                {
                    // articleid:articleid,
                    comment_content:comment_content,
                    comment_name:'sy',
                    // comment_mail:comment_mail,
                    reply_name:reply_name,
                    comment_time:comment_time,
                    comment_zan:0,
                    comment_notzan:0,
                },
                     //解决跨域问题，不加无法跨域
                // {emulateJSON:true}
                ).then(
                    function (res) {
                        console.log(res);
                        console.log(res.insertId);
                        this.$message({
                            showClose: true,
                            message: '添加评论成功！',
                            type: 'success'
                        });
                        this.flag++;
                        //添加评论后，用假数据渲染当前的评论列表
                        this.commentlist.unshift({
                            articleid:articleid,
                            comment_content:comment_content,
                            comment_name:'sy',
                            // comment_mail:comment_mail,
                            reply_name:reply_name,
                            comment_time:comment_time,
                            title:title,
                            id:res.insertId
                        });
                        this.commentlist[index+1].reply_comment='';
                    },
                    function (res) {
                        console.log(res.status);
                        this.$message({
                            showClose: true,
                            message: '添加评论失败！',
                            type: 'error'
                        });
                    }
                );
                console.log("添加评论结束");
                
            }
        },
        delectComment(id){
            this.$http.delete(apiDomin(`admin/comment/deleteComment/${id}`)).then(result=>{
                console.log(result);
                this.commentlist.shift();
                this.$message({
                    showClose: true,
                    message: '删除评论成功！',
                    type: 'success'
                });
                
            })
        },
        commentDate(){
            var d = new Date();
            let year=d.getFullYear();
            let month=d.getMonth() + 1;
            month=month>10?month:'0'+month;
            let day=d.getDate()>10?d.getDate():'0'+d.getDate();
            let hour=d.getHours()>10?d.getHours():'0'+d.getHours();
            let minute=d.getMinutes()>10?d.getMinutes():'0'+d.getMinutes();
            let second=d.getSeconds()>10?d.getSeconds():'0'+d.getSeconds();
            var times=year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;         
            return times;
        }
    },
}
</script>

<style>
.commentMsg{
    margin-top:20px;
    background-color: white;
    padding:20px;
    color: gray;
    width:100%;
}
.commentMsg div{
    background-color: rgb(234, 240, 243);
}
.commentMsg .head{
    text-align: center;
    margin-bottom: 20px;
    padding:20px;
}
.commentMsg strong{
    color: red;
}
.commentMsg .user_input{
    padding:10px;
    margin-bottom: 20px;
}
.commentMsg .user_input >div{
    background-color: white;
    margin:10px 5px;
    display: inline-block;
}
.commentMsg .user_input >div:not(first-child){
    width:32%;
    height:50px;
}
.commentMsg .user_input >div:nth-of-type(1){
    width:100%;
    height:100px;
}
.commentMsg .user_input >div:nth-of-type(1) textarea{
    height:100px;
}
.commentMsg .user_input >div textarea{
    border:none;
    width:100%;
    height:50px;
}
.commentMsg .el-button{
    /* position: relative; */
    /* left:50%; 
    transform: translateX(-50%); */
    width:250px;
    height:45px;
    margin:20px auto;
    display: block;
    
}
.commentMsg >div >div{
 display: inline-block;
}
.commentMsg >div .left{
    width:50px;
    height:50px;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    background-color: aquamarine;
    vertical-align: top;
}
.commentMsg >div .right{
    width: calc(100% - 110px);
    height:100px;
    margin-left:2px;
}
.commentMsg .clear_float{
    margin: 10px 0px;
    position: relative;
}
.commentMsg >div .right i{
    display: inline-block;
    width:20px;
    height:20px;
    background-size: 100%;
    vertical-align: top;
    margin-right: 5px;
}
.commentMsg >div .right .commnet_zan{
    background-image: url("../imgs/i_dianzan.png");
}
.commentMsg >div .right .commnet_notzan {
    width:18px;
    height:18px;
    background-image: url("../imgs/i_notdianzan.png");
}
.commentMsg .time{
    position: absolute;
    bottom: 5px;
}
.commentMsg .dianzan{
    position: absolute;
    right:10px;
    bottom: 5px;
    
}
.commentMsg .getMoreCommentBut{
    text-align: center;
}
.commentMsg #getMoreComment{
    border-radius:19px;
    width:250px;
    height:43px;
    background-color: #409EFF;
    color: white;
    font-size:15px;
    /* position: absolute;
    left:50%;
    transform: translateX(-50%); */
}
.clear_float .right{
    color:rgb(173, 173, 173);
}
.clear_float .reply{
    color:#409EFF;
}
.commentMsg  button{
    background-color: #409EFF;
    float:right;
    width:80px;
    height:30px;
    border-radius: 5px;
    color: aliceblue;
    font-size:14px;
    margin-right:15px;
}
.commentMsg .el-textarea{
    width: calc(100% - 150px);
}
.commentMsg .reply_com{
    display: none;
    /* margin-top:10px; */
}
.hideEditButton{
    display: none;
    float:right;
    /* position: absolute; */
    
}
.clear_float:hover .hideEditButton{
    display: inline-block;
}
</style>
