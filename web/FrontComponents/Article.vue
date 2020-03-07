<template>
<div>
    <div class="article" >
        <div class="article_head">
            <h3>{{articleInfo.title}}</h3>
            <div>
                <!-- X -->
                <span><span class="user icon"></span><span>{{articleInfo.author}}</span></span>
                <span><span class="time icon"></span><span>{{articleInfo.time|dateFormat}}</span></span>
                <span><span class="icon"></span><span>分类：{{articleInfo.category}}</span></span>
                <span><span class="hot icon"></span><span>{{articleInfo.hot_num}}</span></span>
                <span><span class="i_comment icon"></span><span>{{articleInfo.comment_num}}</span></span>
                <span><span class="zan icon"></span><span>{{articleInfo.love_num}}</span></span>
            </div>
        </div>
        <br>
        <br>
        <hr>
        <div class="article_body">
            <h2>简介</h2>
            <div class="zhaiyao">{{articleInfo.zhaiyao}}</div>
            <br><br>
            <!-- <img :src="articleInfo.img_src"> -->
            <div class="article_content" ref='body'></div>
        </div>
    </div>
    
            
    <articleFooter v-bind:articleid="id" v-bind:category="articleInfo.category" v-bind:title="articleInfo.title"></articleFooter>
    <comment :title='articleInfo.title' :id='this.id' @getCommentNum='commentNum($event)'></comment>
</div>
    
</template>

<script>
import comment from "../commonComponents/comment.vue"
import articleFooter from "../commonComponents/articleFooter.vue"
import { apiDomin } from '../utils';
export default {
    data(){
        return{
            id:this.$route.params.id,
            articleInfo:{}
        }
    },
    beforecreate(){
    },
    created(){
        // this.$router.go(0)
        this.getArticle();
    },
    mounted(){

    },
    methods:{
        // commentNum(data){
            
        //     this.articleInfo.comment_num=data;
        //     console.log(this.articleInfo.comment_num)
            
        // },
        getArticle(){
            this.$store.dispatch('getCommentNum',{id:this.id,that:this});
            // console.log(this);
            this.$http.get(apiDomin(`home/article/${this.id}`)).then(result=>{
                this.articleInfo=result.body[0];
                this.articleInfo.hot_num=this.articleInfo.love_num+this.articleInfo.happy_num+this.articleInfo.yun_num+this.articleInfo.sad_num+this.articleInfo.angry_num;
                this.$refs.body.innerHTML=result.data.content;
                this.articleInfo.comment_num=this.$store.state.commentList[this.id];
                console.log("获取到了"+this.articleInfo.comment_num);
            });
            console.log("4444")
        },
        
    },
    components:{
        comment,
        articleFooter
    },
    watch: {
    　　'$route': function (to, from) {
            this.id=this.$route.params.id;
            console.log(this.id);
            this.getArticle();
    　　}
},

}
</script>

<style>
.article{
    width:100%;
    /* height:800px; */
    background-color: white;
    color:gray;
}
.article_head{
    text-align: center;
}
.article>.article_head>div{
    line-height: 15px;
    height:15px;
}
.article>.article_head>div>span{
    height:15px;
    display: inline-block;
    /* width:100%; */
}
.article>.article_head>div>span>span{
    /* width:15px; */
    height:15px;
    display: inline-block;
}

.article>.article_head>div>span>.icon{
    width:15px;
    background-size: 100%;
    background-position: center center;
}
.article>.article_head>div>span>.user{
    background-image:url('../imgs/i_time.png');
}
.article>.article_head>div>span>.time{
    background-image:url('../imgs/i_time.png');
}
.article>.article_head>div>span>.hot{
    background-image:url('../imgs/i_hot.png');
}
.article>.article_head>div>span>.zan{
    background-image:url('../imgs/i_zan.png');
}
.article>.article_head>div>span>.i_comment{
    background-image:url('../imgs/i_comment.png');
    background-position-y:-10px;
}
.article_body>img{
    width:400px;
    height:auto;
    display: block;
    margin:auto;
}
</style>
