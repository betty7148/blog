<template>
<div class="categoryArt">
    <div class="home_body">
        <h2>当前频道{{this.articleCategory}}</h2>
            <ul>
                <li v-for="item in articleList" :key='item.id'>
                    <div class="bgimg" v-bind:style="{backgroundImage:'url(' + item.img_src + ')'}"></div>
                    <!-- <div class="bgimg"></div> -->
                    <div class="intro">
                        <span class="category">{{item.id}}{{item.category}}</span>
                        <router-link :to="'/home/article/'+item.id">{{item.title}}</router-link>
                        <p>{{item.zhaiyao}}</p>
                        <div>
                            <span><span class="time"></span><span>{{item.time|dateFormat}}</span></span>
                            <span><span class="hot"></span><span>{{item.hot_num}}</span></span>
                            <span><span class="comment1"></span><span >{{typeof item.comment_num == 'object'?0:item.comment_num}}</span></span>
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
            <!-- <div class="getMoreArticleBut">
                <button id='getMoreArticle' @click='getArticleByCategory' ref='getMoreArticle' name='qq'>加载更多文章</button>
            </div> -->
        </div>
</div>
    
</template>

<script>
import { apiDomin } from '../utils'
export default {
    mounted(){
        console.log("2222");
    },
    data(){
        return{
            articleCategory:this.$route.params.categoryName,
            articleList:[],
            currentPage: 1,
            perPageNum:10,
            totalArticleNum:0,
        }
    },
    created(){
        this.articleList=[];
        this.getArticleNum();
        this.getArticleByCategory();
    },
    methods:{
         handleSizeChange(val){
            this.perPageNum=Number.parseInt(val);
            console.log(`每页 ${val} 条`);
             this.getArticleByCategory();
        },
        handleCurrentChange(val) {
            this.currentPage=Number.parseInt(val);
            this.getArticleByCategory();
            console.log(`当前页: ${val}`)
        },
        getArticleNum(){
            this.$http.get(apiDomin(`home/article/getArticleCount/${this.articleCategory}`)).then(result=>{
                const { body } = result;
                const { data } = body;
                const { status } = body;
                const { message } = body;
                if(status==0){
                   this.totalArticleNum=data;
                }else{
                    alert(message);
                }
            })
        },
        getArticleByCategory(){
            // this.pageIndex++;
            let pageIndex=this.currentPage-1;
            this.$http.get(apiDomin(`home/article/category/${this.articleCategory}?pageIndex=${pageIndex}&perPageNum=${this.perPageNum}`)).then(async function(result){
                //if(result.body.length==0) this.$refs.getMoreArticle.innerHTML='无更多文章';
                //this.articleList=result.body;
                const { body } = result;
                const { data } = body;
                const { status } = body;
                const { message } = body;
                console.log(body);
                if(status==0){
                    this.articleList=data;
                    
                }else{
                    alert(message);
                }
             
            });
        },  
    },
    components:{
        // comment,
        // articleFooter
    },
    watch: {
    　　'$route': function (to, from) {
            this.articleList=[];
            // this.pageIndex=-1;
            
            this.currentPage= 1,
            this.articleCategory=this.$route.params.categoryName,
            this.getArticleNum();
            this.getArticleByCategory();
            
    　　}
    },
}
</script>

<style>
.categoryArt{
    width:100%;
    /* height:800px; */
    background-color: white;
    color:gray;
}
.categoryArt li>.intro>div>button{
    background-color: #409EFF;
    float:right;
    width:80px;
    height:30px;
    border-radius: 5px;
    color: aliceblue;
    font-size:14px;
    margin-right:15px;
}
.categoryArt .getMoreArticleBut{
    text-align: center;
}
.categoryArt #getMoreArticle{
    border-radius:19px;
    width:250px;
    height:43px;
    background-color: #409EFF;
    color: white;
    font-size:15px;
}
</style>
