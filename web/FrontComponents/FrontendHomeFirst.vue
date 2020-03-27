<template>
    <div class="home">
        <div class="home_head">
            <!-- <span>X</span> -->
            <img src='../imgs/timg.jpeg'>
            <div>
                <div >
                    <div class="cover">JS基础知识</div>
                </div>
                <div >
                    <div class="cover">vue全家桶</div>
                </div>
                <div >
                    <div class="cover">es6相关</div>
                </div>
            </div>
        </div>
        <div class="home_body">
            <ul>
                <li v-for="item in articleList" :key='item.id'>
                    <div class="bgimg" v-bind:style="{backgroundImage:'url(' + item.img_src + ')'}"></div>
                    
                    <!-- <div class="bgimg"></div> -->
                    
                    <div class="intro">
                        <span class="category">{{item.category}}</span>
                        <router-link :to="'/home/article/'+item.id">{{item.title}}</router-link>
                        <p>{{item.zhaiyao}}</p>
                        <div>
                            <span><span class="time"></span><span>{{item.time|dateFormat}}</span></span>
                            <span><span class="hot"></span><span>{{item.hot_num}}</span></span>
                            <span><span class="comment1"></span><span >{{item.comment_num}}</span></span>
                            <span><span class="zan"></span><span>{{item.love_num}}</span></span>
                            <router-link :to="'/home/article/'+item.id" tag="button">
                            阅读详情</router-link>
                        </div>
                    </div>
                    
                </li>
            </ul>
             <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.currentPage"
      :page-size='this.perPageNum'
      layout="total, sizes, prev, pager, next, jumper"
      :total='this.totalArticleNum'>
    </el-pagination>
  </div>
            <!--<div class="getMoreArticleBut">
                <button id='getMoreArticle' @click='getHomeArticle' ref='getMoreArticle' name='qq'>加载更多文章</button>
            </div>
            !-->
        </div>
    </div>
</template>

<script>
import { apiDomin } from '../utils'
export default {
    data(){
        return{
            articleList:[],
            // pageIndex:-1,
            currentPage: 1,
            perPageNum:10,
            totalArticleNum:0,
        }
    },
    created(){
        // console.log("222");
        this.articleList=[];
        // this.pageIndex=-1;
        this.getArticleNum();
        this.getHomeArticle();
        // console.log("333");
    },
    methods:{
        handleSizeChange(val){
            this.perPageNum=Number.parseInt(val);
            console.log(`每页 ${val} 条`);
             this.getHomeArticle();
        },
        handleCurrentChange(val) {
            this.currentPage=Number.parseInt(val);
            this.getHomeArticle();
        },
        getArticleNum(){
            this.$http.get(apiDomin('user/article/acount/getAllArticleCount')).then(result=>{
                const { body } = result;
                const { data } = body;
                const { status } = body;
                if(status==0){
                    console.log(data);
                    this.totalArticleNum=data[0]['count(1)'];
                }
               
            })
        },
        getHomeArticle(){
            // this.pageIndex++;
            let pageIndex=this.currentPage-1;
            this.$http.get(apiDomin(`home/article?pageIndex=${pageIndex}&perPageNum=${this.perPageNum}`)).then(async function(result){
                
                //if(result.body.length==0) this.$refs.getMoreArticle.innerHTML='无更多文章';
                const { body } = result;
                const { data } = body;
                const { status } = body;
                const { message } = body;
                if(status==0){
                    this.articleList=data;
                    var that=this;
                    var arr=this.articleList;
                    
                }else{
                    alert(message);
                }
             
                // console.log(this);
                // for(let i=0;i<this.articleList.length;i++){
                //     this.articleList[i].hot_num=this.articleList[i].love_num+this.articleList[i].happy_num+this.articleList[i].yun_num+this.articleList[i].sad_num+this.articleList[i].angry_num;
                //     await this.getCommentNum(i);
                // }

                /*this.articleList.forEach( async (item,index) => {
                    item.hot_num=item.love_num+item.happy_num+item.yun_num+item.sad_num+item.angry_num;
                    await this.getComment_Num(index);
                    // this.console1();
                    // await that.$store.dispatch('getCommentNum',{id:item.id,that:that})
                    // .then(()=>{
                        // console.log(this.$store.state.commentList);
                        // item.comment_num=that.$store.state.commentList[item.id];
                        // console.log(item.id+"获取到了"+item.comment_num);
                    // });
                })*/
                console.log("777");
                console.log(this.articleList);
            });
        },
        /*async getComment_Num(i){
            // console.log(this);
            await this.$store.dispatch('getCommentNum',{id:this.articleList[i].id,that:this});
            this.articleList[i].comment_num=this.$store.state.commentList[this.articleList[i].id];
            this.$forceUpdate();
            // console.log(that.$store.state.commentList);
            // console.log(that.$store.state.commentList[that.articleList[i].id]);
            // console.log(that.articleList[i].id+"获取到了"+that.articleList[i].comment_num);
        },
        */
        console1(){
            console.log("1234");
        }
    }
}
</script>

<style>
.home_head{
    height:400px;
    font-size:0px;
}
.home_head>img{
    /* width:500px; */
    width:73%;
    /* width:auto; */
    height:400px;
    border-radius: 5px;
}
.home_head> div{
    display: inline-block;
    width:200px;
    /* width:25%; */
    vertical-align: top;

}
.home_head>div>div{
    width:100%;
    height:125px;
    margin:0px 0px 13px 20px;
    border-radius: 5px;
    position: relative;
    
}
.home_head> div>div:first-child{
    background: url('../imgs/1.jpeg');
    background-size: 100%;
}
.home_head> div>div:nth-of-type(2){
    background: url('../imgs/2.jpg');
    background-size: 100%;
}
.home_head> div>div:nth-of-type(3){
    background: url('../imgs/3.jpg');
    background-size: 100%;
}
.home_head>div>div>.cover{
    position: absolute;
    width:100%;
    bottom: 0px;
    left: 0px;
    background-color: #ccc;
    color: black;
    font-size: 14px;
    height:15%;
    opacity: 0.4;
    text-align: center;
}
.home_head> div>img:last-child{
    margin-bottom: none;
}
.home_body {
    /* width:1120px; */
    width:100%;
    margin-top:30px;
    background-color: white;
}
.home_body li{
    margin-bottom:20px;
    font-size:14px;
    margin-bottom: 10px;
    padding:0px 20px;
    border-bottom:1px solid #C0C4CC;
    position: relative;
    /* transition: all 0.5s ease; */
}
.home_body li:before,.home_body li:after,.home_body li>.ui-border-element:before,.home_body li>.ui-border-element:after{
    position: absolute;
    content: '';
}
.home_body li:after{
    border-bottom:1px solid #409EFF;
    left:0%;
    right:100%;
    bottom:0px;
    transition: all 0.5s ease;
}
.home_body li:hover:after{
    left:0%;
    right:0%;
    bottom:0%;
}
.home_body li>.bgimg{
    display: inline-block;
    width:220px;
    height:160px;
    /* background-image: url('../imgs/3.jpg'); */
    background-position: center center;
    background-size:auto 100%;
    background-repeat: no-repeat;
    margin-top:10px;
    transition: all 0.5s ease;

}
.home_body li:hover >.bgimg{
    background-size: auto 120%;
    background-clip: content-box;
    /* transition: all 0.5s ease; */
}

.home_body li>.intro{
    margin-left:10px;
    padding-top:10px;
    display: inline-block;
    width:calc(100% - 260px);
    vertical-align: top;

}

.home_body li>.intro>.category{
    display: inline-block;
    width:60px;
    height:25px;
    background-color: #409EFF;
    color: aliceblue;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
}
.home_body li>.intro>a{
    text-decoration: none;
    color: black;
    font-size: 17px;
    vertical-align: top;
}
.home_body li>.intro>a:hover{
    color:#409EFF;
}
.home_body li>.intro>p{
    font-size: 12px;
    margin-top:10px;
}
.home_body li>.intro>div{
    /* width:px; */
    height:25px;
    line-height: 25px;
    
}
.home_body li>.intro>div>span{
    color:tomato;
}
.home_body li>.intro>div>span>span:first-child{
    width:15px;
    background-size: 100%;
    background-position: center center;
}
.home_body li>.intro>div>span>.time{
    background-image:url('../imgs/i_time.png');
}
.home_body li>.intro>div>span>span{
    vertical-align:bottom;
    font-size:14px;
    display: inline-block;
    height:15px;
    line-height: 15px;
    margin-right: 5px;
}
.home_body li>.intro>div>span>.hot{
    background-image:url('../imgs/i_hot.png');
}
.home_body li>.intro>div>span>.comment1{
    background-image:url('../imgs/i_comment.png');
}
.home_body li>.intro>div>span>.zan{
    background-image:url('../imgs/i_zan.png');
}
.home_body li>.intro>div>button{
    background-color: #409EFF;
    float:right;
    width:80px;
    height:30px;
    border-radius: 5px;
    color: aliceblue;
    font-size:14px;
    margin-right:15px;
}
.home .getMoreArticleBut{
    text-align: center;
}
.home #getMoreArticle{
    border-radius:19px;
    width:250px;
    height:43px;
    background-color: #409EFF;
    color: white;
    font-size:15px;
}
</style>
