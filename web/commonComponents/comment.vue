<template>
    <div class="comment">
        <div class="head">共有{{this.comment_num}}条评论关于{{this.title}}</div>
        <div class="user_input">
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
            <!-- <div>
                <label for="test">验证码<strong>*</strong></label>
                <textarea id="test" ref='comment_validate'></textarea>
            </div> -->
            <el-button type="primary" round @click='postComment'>提交评论</el-button>
        </div>
        <div class="clear_float" v-for="(item,index) in commentlist" :key="item.id">
            <div class="left">{{item.comment_name[0]}}</div>
            <div class="right">
                <span>昵称：{{item.comment_name}}</span>
                <p><span class='reply'>{{item.reply_name?'@'+item.reply_name:''}}</span>{{item.comment_content}}</p>
                <p class="time">{{item.comment_time|dateFormat}}</p>
                <div class="dianzan">
                    <span @click='postZan(index,item.id)'><i class="commnet_zan"></i>{{item.comment_zan}}</span>
                    <span @click='postNotZan(index,item.id)'><i class="commnet_notzan"></i>{{item.comment_notzan}}</span>
                </div>
            </div>
        </div>
        <div class="getMoreCommentBut">
            <button id='getMoreComment' @click='getComment' ref='getMoreComment' name='qq'>加载更多评论</button>

        </div>
         </div>
    
</template>

<script>
import { apiDomin } from '../utils'
export default {
    data(){
        return{
            commentlist:[],
            pageIndex:-1,
            perPageNum:5,
            flag:0,//新增了几条评论，导致分页获取评论时 index向后增加多少
            
        }
    },
    created(){
        this.getComment();
        this.getCommentNum();

    },
    watch:{
        '$route': function (to, from) {
            this.id=this.$route.params.id;
            this.commentlist=[];
            this.pageIndex=-1;
            this.getComment();
            this.getCommentNum();
            //this.comment_num=0;
            this.flag=0;
    　　}
    },
    methods:{
        /*getCommentNum(){
            this.$http.get(apiDomin(`home/comment/getCommentCount/${this.id}`)).then(result=>{
                this.comment_num=result.data[0]['count(1)'];
                // this.$emit('getCommentNum', this.comment_num);
            })
            
        },*/
        getComment(){
            console.log(this.id);
            this.pageIndex++;
            //得到文章id为this.id的所有评论
            this.$http.get(apiDomin(`home/comment/getCommentList/${this.id}?pageIndex=${this.pageIndex}&perPageNum=${this.perPageNum}&flag=${this.flag}`)).then(result=>{
                if(result.body.length==0) this.$refs.getMoreComment.innerHTML='无更多评论';
                this.commentlist=this.commentlist.concat(result.body);
            })
        },
        postComment(){
            console.log("添加评论");
            let [comment_content,comment_name,comment_mail]=[this.$refs.comment_content.value,this.$refs.comment_name.value,this.$refs.comment_mail.value];
            let alertmsg='';
            let comment_time=this.commentDate();
            console.log(comment_time);
            // console.log("comment_content"+comment_content+" "+"comment_name"+comment_name)
            if(!comment_content||!comment_name||!comment_mail){
                alertmsg='您提交的评论信息不完整！';
            }
            if(!alertmsg){
                this.$http.post(apiDomin(`home/comment/postComment/${this.id}`),
                {
                    comment_content:comment_content,
                    comment_name:comment_name,
                    comment_mail:comment_mail,
                    comment_time:comment_time,
                    comment_zan:0,
                    comment_notzan:0,
                },
                     //解决跨域问题，不加无法跨域
                // {emulateJSON:true}
                ).then(
                    function (res) {
                        console.log(res);
                        this.$message({
                            showClose: true,
                            message: '添加评论成功！',
                            type: 'success'
                        });
                        this.flag++;
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
                //添加评论后，用假数据渲染当前的评论列表
                this.commentlist.unshift({
                        comment_content:comment_content,
                        comment_name:comment_name,
                        comment_mail:comment_mail,
                        comment_time:comment_time,
                        comment_zan:0,
                        comment_notzan:0,
                });
            }
        },
        postZan(index,commentId){
            console.log("第"+index+"条评论更改赞数");
            //假数据
            this.commentlist[index]['comment_zan']+=1;
            var zan=this.commentlist[index]['comment_zan'];
            this.$http.post(apiDomin(`home/comment/postZan/${this.id}?commentId=${commentId}`),
                {
                    comment_zan:zan,
                },
            ).then(
                function (res) {
                    console.log(res);
                    this.msg = res.bodyText;
                },
                function (res) {
                    console.log(res.status);
                }
            );
        },
        postNotZan(index,commentId){
            console.log("第"+index+"条评论更改不赞数");
            //假数据
            this.commentlist[index]['comment_notzan']+=1;
            var notzan=this.commentlist[index]['comment_notzan'];
            console.log(notzan);
            console.log("此条评论在数据库中存储的ID:"+commentId);
            this.$http.post(apiDomin(`home/comment/postNotZan/${this.id}?commentId=${commentId}`),
                {
                    comment_notzan:notzan,
                },
            ).then(
                function (res) {
                    console.log(res);
                    this.msg = res.bodyText;
                },
                function (res) {
                    console.log(res.status);
                }
            );
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
    props:['title','id','comment_num']
}
</script>

<style>
.comment{
    margin-top:20px;
    background-color: white;
    padding:20px;
    color: gray;

}
.comment div{
    background-color: rgb(234, 240, 243);
}
.comment .head{
    text-align: center;
    margin-bottom: 20px;
    padding:20px;
}
.comment strong{
    color: red;
}
.comment .user_input{
    padding:10px;
    margin-bottom: 20px;
}
.comment .user_input >div{
    background-color: white;
    margin:10px 5px;
    display: inline-block;
}
.comment .user_input >div:not(first-child){
    width:32%;
    height:50px;
}
.comment .user_input >div:nth-of-type(1){
    width:100%;
    height:100px;
}
.comment .user_input >div:nth-of-type(1) textarea{
    height:100px;
}
.comment .user_input >div textarea{
    border:none;
    width:100%;
    height:50px;
}
.comment .el-button{
    /* position: relative; */
    /* left:50%; 
    transform: translateX(-50%); */
    width:250px;
    height:45px;
    margin:20px auto;
    display: block;
    
}
.comment >div >div{
 display: inline-block;
}
.comment >div .left{
    width:100px;
    height:100px;
    color: white;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    background-color: aquamarine;
    vertical-align: top;
}
.comment >div .right{
    width: calc(100% - 110px);
    height:100px;
    margin-left:2px;
}
.comment .clear_float{
    margin: 10px 0px;
    position: relative;
}
.comment >div .right i{
    display: inline-block;
    width:20px;
    height:20px;
    background-size: 100%;
    vertical-align: top;
    margin-right: 5px;
}
.comment >div .right .commnet_zan{
    background-image: url("../imgs/i_dianzan.png");
}
.comment >div .right .commnet_notzan {
    width:18px;
    height:18px;
    background-image: url("../imgs/i_notdianzan.png");
}
.comment .time{
    position: absolute;
    bottom: 5px;
}
.comment .dianzan{
    position: absolute;
    right:10px;
    bottom: 5px;
    
}
.comment .getMoreCommentBut{
    text-align: center;
}
.comment #getMoreComment{
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
.clear_float .reply{
    color:#409EFF;
}

</style>
