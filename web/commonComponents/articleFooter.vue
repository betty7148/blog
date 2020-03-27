<template>
    <div class="articleFooter">
        <ul>
            <li @click='postBiaoQingByArticleId("love_num")'>
                <span>{{this.biaoqing.love_num}}人</span>
                <img src="../imgs/biaoqing_love.png">
                <span>超赞</span>
            </li>
            <li @click='postBiaoQingByArticleId("happy_num")'>
                <span>{{this.biaoqing.happy_num}}人</span>
                <img src="../imgs/biaoqing_happy.png">
                <span>喜欢</span>
            </li>
            <li @click='postBiaoQingByArticleId("yun_num")'>
                <span>{{this.biaoqing.yun_num}}人</span>
                <img src="../imgs/biaoqing_yun.png">
                <span>无感</span>
            </li>
            <li @click='postBiaoQingByArticleId("sad_num")'>
                <span>{{this.biaoqing.sad_num}}人</span>
                <img src="../imgs/biaoqing_sad.png">
                <span>不喜欢</span>
            </li>
            <li @click='postBiaoQingByArticleId("angry_num")'>
                <span>{{this.biaoqing.angry_num}}人</span>
                <img src="../imgs/biaoqing_angry.png">
                <span>愤怒</span>
            </li>
        </ul>
        <ul>
            <span>分享到：</span>
            <a href=""><li>QQ</li></a>
            <a href=""><li>微信</li></a>
            <a href=""><li>微博</li></a>
            <a href=""><li>其他</li></a>
        </ul>
        <div>
            <svg t="1575539386441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11720" width="200" height="140">
            <path d="M657.775 454.41c-28.224 0-51.104 22.924-51.104 51.207 0 28.284 22.881 51.208 51.104 51.208 28.219 0 51.095-22.924 51.095-51.208-0.001-28.284-22.877-51.207-51.095-51.207z" fill="#4C5AA3" p-id="11721"></path><path d="M664.612 635.344H58.188c-26.33 0-47.668 21.339-47.668 47.664v3.672c0 26.324 21.339 47.664 47.668 47.664h606.423c26.324 0 47.664-21.34 47.664-47.664v-3.672c0.001-26.325-21.339-47.664-47.663-47.664z" fill="#667DC5" p-id="11722"></path><path d="M61.649 290.547h-3.461c-26.33 0-47.668 21.339-47.668 47.664V686.68c0 26.324 21.339 47.664 47.668 47.664h3.461c26.325 0 47.66-21.34 47.66-47.664V338.211c0-26.325-21.335-47.664-47.66-47.664z" fill="#D860B5" p-id="11723"></path><path d="M664.612 290.547H58.188c-26.33 0-47.668 21.339-47.668 47.664v3.671c0 26.325 21.339 47.664 47.668 47.664h606.423c26.324 0 47.664-21.339 47.664-47.664v-3.671c0.001-26.325-21.339-47.664-47.663-47.664z" fill="#F35A50" p-id="11724"></path><path d="M1007.218 491.707l-1.666-2.976c-12.875-23.027-41.939-31.229-64.919-18.324L637.527 640.66c-22.972 12.909-31.161 42.034-18.282 65.061l1.667 2.977c12.874 23.026 41.943 31.229 64.919 18.324l303.106-170.254c22.979-12.909 31.165-42.039 18.281-65.061z" fill="#F9D73B" p-id="11725"></path><path d="M990.216 464.146l-304.029-167.72c-23.049-12.716-51.989-4.26-64.641 18.883l-1.632 2.993c-12.651 23.143-4.226 52.212 18.818 64.923l304.034 167.719c23.044 12.716 51.98 4.261 64.632-18.882l1.641-2.994c12.652-23.142 4.226-52.207-18.823-64.922z" fill="#FD9E22" p-id="11726"></path></svg>
            <span>{{this.category}},</span><span>{{this.title}}</span>
        </div>
        <div class="footer">
            <div ><span @click='goPrevious()'>上一篇:{{this.previous.title}}</span></div>
            <div ><span @click='goNext()'>下一篇:{{this.next.title}}</span></div>
        </div>
    </div>
</template>

<script>
import { apiDomin } from '../utils';
export default {
    data(){
        return{
            articleid:this.$route.params.id,
            previous:{},
            next:{},
            lastArticleId:parseInt(this.articleid)-1,
            nextArticleId:parseInt(this.articleid)+1
        }
    },
    created(){
        //this.getBiaoQingByArticleId();
        this.getPreviousByArticleId();
        this.getNextByArticleId();
    },
    props:['category','title','biaoqing'],
    methods:{
        /*getBiaoQingByArticleId(){
            this.$http.get(apiDomin(`home/article/getBiaoQing/${this.articleid}`)).then(result=>{
                this.biaoqing=result.body;
            })
        },
*/
        postBiaoQingByArticleId(flag){
            switch(flag){
                case 'love_num':
                    this.biaoqing.love_num++;
                    break;
                case 'happy_num':
                    this.biaoqing.happy_num++;
                    break;
                case 'yun_num':
                    this.biaoqing.yun_num++;
                    break;
                case 'sad_num':
                    this.biaoqing.sad_num++;
                    break;
                case 'angry_num':
                    this.biaoqing.angry_num++;
                    break;
                
            }
            console.log("第"+this.articleid+"篇文章更改表情");
            //假数据
            // this.biaoqing.love_num=love_num;
            // this.biaoqing.happy_num=happy_num;
            // this.biaoqing.yun_num=yun_num;
            // this.biaoqing.sad_num=sad_num;
            // this.biaoqing.angry_num=angry_num;

            // var zan=this.commentlist[index]['comment_zan'];
            // console.log(zan);
            // console.log("此条评论在数据库中存储的ID:"+commentId);
            this.$http.post(apiDomin(`home/article/postBiaoQing/${this.articleid}`),
            {
                    love_num:this.biaoqing.love_num,
                    happy_num:this.biaoqing.happy_num,
                    yun_num:this.biaoqing.yun_num,
                    sad_num:this.biaoqing.sad_num,
                    angry_num:this.biaoqing.angry_num
            },
            ).then(
                function (res) {
                    const { body } = res;
                    const { data } = body;
                    //console.log(body);
                    //console.log(body['status']);
                    if(body['status']!==0){
                        alert(body['message']);
                    }
                   // console.log(res,'gengxinbiaoqing');
                    //this.msg = res.bodyText;
                },
                function (res) {
                    console.log(res.status);
                }
            );
        },

        getPreviousByArticleId(){
            this.lastArticleId=parseInt(this.articleid)-1;
            console.log("前一篇文章id为："+this.lastArticleId);
            this.$http.get(apiDomin(`home/article/${this.lastArticleId}`)).then(result=>{
                // console.log("前一篇数据")
                // console.log(result.data.length);
                if(result.body['status']==404){
                //if(!result.data.length){
                    // console.log('第一篇');
                    this.previous={title:"当前文章已经是第一篇！"};
                }
                else{
                    this.previous=result.body['data'][0];
                }
                
            })
        },
        getNextByArticleId(){
            this.nextArticleId=parseInt(this.articleid)+1;
            // console.log("后一篇文章id为："+this.nextArticleId);
            this.$http.get(apiDomin(`home/article/${this.nextArticleId}`)).then(result=>{
                
                //console.log("下一篇数据");
                //console.log(result.body['data'][0]);
                
                if(result.body['status']==404){
                //if(!result.data.length){
                    // console.log('最后一篇');
                    this.next={title:"当前文章已经是最后一篇！"};
                }else{
                    this.next=result.body['data'][0];
                }
                // console.log(this.next);
            })
        },
        goPrevious(){
            if(this.previous.title=="当前文章已经是第一篇！"){
                //  this.$router.push('/home/article/'+this.articleid)
            }else{
                this.$router.push('/home/article/'+this.lastArticleId)
            }
        },
        goNext(){
            if(this.next.title=="当前文章已经是最后一篇！"){
                //  this.$router.push('/home/article/'+this.articleid)
            }else{
                this.$router.push('/home/article/'+this.nextArticleId)
            }
        }
    },
    watch:{
        '$route': function (to, from) {
            this.articleid=this.$route.params.id;
            this.lastArticleId=parseInt(this.articleid)-1;
            this.nextArticleId=parseInt(this.articleid)+1;
            //this.getBiaoQingByArticleId();
            this.getPreviousByArticleId();
            this.getNextByArticleId();
    　　}
    }
}
</script>

<style>
    a{
        text-decoration: none;
    }
    .articleFooter{
        margin-top:20px;
        background-color: white;
        text-align: center;
        padding:10px 0px;
        color:gray;
    }
    .articleFooter ul{
        /* text-align: center; */
        margin:30px 0px;
    }
    .articleFooter ul li{
        font-size: 13px;
        display: inline-block;
        width:45px;
        text-align: center;
        margin:0px 10px;
    }
     .articleFooter ul li img{
        width:45px;
     } 
    .articleFooter ul li{
        cursor: pointer;
    }
    .articleFooter >div{
        margin:30px 0px 0px 20px;
        
    }
    .articleFooter >div>svg{
        /* content:''; */
        width:35px;
        height:auto;
        display: inline-block;

        vertical-align: bottom;
        

    }
    .articleFooter .footer{
        text-align: left;

    }
    .articleFooter .footer>div>span{
        cursor: pointer;
    }
    
</style>
