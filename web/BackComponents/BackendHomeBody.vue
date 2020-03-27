<template>
    <div>
        <div class="backhome_body">
                <ul>
                    <li v-for="item in articleList" :key='item.id'>
                        <!-- <div class="bgimg" v-bind:style="{backgroundImage:'url(' + item.img_src + ')'}"></div> -->
                        <!-- <div class="bgimg"></div> -->
                        <div class="intro">
                            <span class="category">{{item.category}}</span>
                            <router-link :to="'/backend/article/editarticle/'+item.id">{{item.title}}</router-link>
                            <p>{{item.zhaiyao}}</p>
                            <div>

                                <span><span class="time"></span><span>{{item.time|dateFormat}}</span></span>
                                <span><span class="hot"></span><span>{{item.hot_num}}</span></span>
                                <span><span class="comment1"></span><span>{{typeof item.comment_num == 'object'?0:item.comment_num}}</span></span>
                                <span><span class="zan"></span><span>{{typeof item.love_num == 'object'?0:item.love_num}}</span></span>
                                <router-link :to="'/backend/article/editarticle/'+item.id" tag="button">
                                编辑文章</router-link>
                            </div>
                        </div>
                        
                    </li>
                </ul>
                <div class="getMoreArticleBut">
                    <button id='getMoreArticle' @click='getHomeArticle' ref='getMoreArticle' name='qq'>加载更多文章</button>
                </div>
        </div>
        
    </div>
</template>

<script>
// import commonHomeBody from './CommonHomeBody.vue'
import { apiDomin } from '../utils'
export default {
    data(){
        return {
            articleList:[],
            pageIndex:-1,
            perPageNum:10
        }
    },
    created(){
        this.getHomeArticle();
    },
    methods:{
        getHomeArticle(){
            this.pageIndex++;
           this.$http.get(apiDomin(`back/article?pageIndex=${this.pageIndex}&perPageNum=${this.perPageNum}`)).then((result)=>{
                if(result.body.length==0) this.$refs.getMoreArticle.innerHTML='无更多文章';
                const { body } = result;
                const { data } = body;
                const { status } = body;
                const { message } = body;
                if(status==0){
                    this.articleList=this.articleList.concat(data);
                }else{
                    alert(message);
                }
                
                // console.log(result);
                console.log(this.articleList);
            });
        }
    },
    // components:{
    //   commonHomeBody
    // },
}
</script>

<style>
.backhome_body {
    /* width:1120px; */
    width:100%;
    /* margin-top:30px; */
    background-color: white;
}
.backhome_body li{
    margin-bottom:20px;
    font-size:14px;
    margin-bottom: 10px;
    padding:0px 20px;
    border-bottom:1px solid #C0C4CC;
    position: relative;
    /* transition: all 0.5s ease; */
}
/* .backhome_body li:before,.backhome_body li:after,.backhome_body li>.ui-border-element:before,.backhome_body li>.ui-border-element:after{
    position: absolute;
    content: '';
} */
/* .backhome_body li:after{
    border-bottom:1px solid #409EFF;
    left:0%;
    right:100%;
    bottom:0px;
    transition: all 0.5s ease;
} */
/* .backhome_body li:hover:after{
    left:0%;
    right:0%;
    bottom:0%;
} */
.backhome_body li>.bgimg{
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
.backhome_body li:hover >.bgimg{
    background-size: auto 120%;
    background-clip: content-box;
    /* transition: all 0.5s ease; */
}

.backhome_body li>.intro{
    margin-left:10px;
    padding-top:10px;
    display: inline-block;
    vertical-align: top;
        width: 100%;
}

.backhome_body li>.intro>.category{
    display: inline-block;
    width:60px;
    height:25px;
    background-color: #409EFF;
    color: aliceblue;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
}
.backhome_body li>.intro>a{
    text-decoration: none;
    color: black;
    font-size: 17px;
    vertical-align: top;
}
.backhome_body li>.intro>a:hover{
    color:#409EFF;
}
.backhome_body li>.intro>p{
    font-size: 12px;
    margin-top:10px;
}
.backhome_body li>.intro>div{
    /* width:px; */
    height:25px;
    line-height: 25px;
    
}
.backhome_body li>.intro>div>span{
    color:tomato;
}
.backhome_body li>.intro>div>span>span:first-child{
    width:15px;
    background-size: 100%;
    background-position: center center;
}
.backhome_body li>.intro>div>span>.time{
    background-image:url('../imgs/i_time.png');
}
.backhome_body li>.intro>div>span>span{
    vertical-align:bottom;
    font-size:14px;
    display: inline-block;
    height:15px;
    line-height: 15px;
    margin-right: 5px;
}
.backhome_body li>.intro>div>span>.hot{
    background-image:url('../imgs/i_hot.png');
}
.backhome_body li>.intro>div>span>.comment1{
    background-image:url('../imgs/i_comment.png');
}
.backhome_body li>.intro>div>span>.zan{
    background-image:url('../imgs/i_zan.png');
}
.backhome_body li>.intro>div>button{
    background-color: #409EFF;
    float:right;
    width:80px;
    height:30px;
    border-radius: 5px;
    color: aliceblue;
    font-size:14px;
    margin-right:15px;
}
.backhome_body .getMoreArticleBut{
    text-align: center;
}
.backhome_body #getMoreArticle{
    border-radius:19px;
    width:250px;
    height:43px;
    background-color: #409EFF;
    color: white;
    font-size:15px;
}
</style>
