<template>
    <div id="zuixinpinglun">
        <!-- X -->
        <div class="title">
            <img src="../imgs/gonggao.png">
            <span >最新评论</span>
        </div>
        <div >

        </div>
        <div class="clear_flo pinglunliebiao">
            <ul >
                <li v-for='item in latestComment' :key='item.id'>
                    <div class='cler_float'>
                        <div class="left">{{item.comment_name[0]}}</div>
                        <div class="right">
                            <span>昵称：{{item.comment_name}}</span>
                            <p>{{item.comment_content}}</p>
                        </div>
                    </div>
                    <div class='lititle'>评:{{item.title}}<br><i class='el-icon-time'></i>{{item.comment_time|dateFormat}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { apiDomin } from '../utils';
export default {
    data(){
        return{
            perNum:5,
            latestComment:[
                {
                    id:1,
                    comment_name:'东东',
                    comment_content:'HFSKJFHJLNaaaaaaaaaaaFALJsaaaaaafffffffffffBKCNAfafaaaaaaaasafasfafssssssssssssSALNSCAJKSC',
                    comment_time:'2020-01-02 20:01:01',
                    article_title:'标题哈哈哈哈'
                },{
                    id:2,
                    comment_name:'东东',
                    comment_content:'HFSKJFHJLNFALJBKCNASALNSCAJKSC',
                    comment_time:'2020-01-02 20:01:01',
                    article_title:'标题哈哈哈哈'
                },{
                    id:3,
                    comment_name:'东东',
                    comment_content:'HFSKJFHJLNFALJBKCNASALNSCAJKSC',
                    comment_time:'2020-01-02 20:01:01',
                    article_title:'标题哈哈哈哈'
                }
            ]
        }
    },
    methods:{
        getLatestComments(){
            this.$http.get(apiDomin(`home/getLatestComt?perNum=${this.perNum}`)).then(result=>{
                this.latestComment=result.data;
            })
        }
    },
    created(){
        this.getLatestComments();
    }
}
</script>

<style>
#zuixinpinglun{
    padding: 10px ;
    font-size: 13px;
    background-color: white;
     margin-bottom: 30px;
}

.title{
    height: 30px;
    line-height: 30px;
}
#zuixinpinglun >div:first-child{
    border-bottom:1px solid indigo;
    overflow: hidden;
    /* display: inline-block; */
    float: left;
}
#zuixinpinglun> div:nth-of-type(2){
    border-bottom:1px solid #ccc;
    width: calc(100% - 90px);
    height:30px;
    float: left;
}
.title >img{
    height: 30px;
    vertical-align: bottom;
    float: left;
}
.title span{
    font-size: 15px;
    height:30px;
    float: left;
}
.clear_flo{
    clear: both;
}
.pinglunliebiao ul>li{
    border-bottom:1px dashed #eee;
    padding:15px 0px;
}
.pinglunliebiao ul>li:last-child{
    border-bottom: none;
}
.pinglunliebiao li> div:nth-of-type(2)>span:first-child,.pinglunliebiao li> div:nth-of-type(2)>span:nth-of-type(3){
    color:rgb(83, 162, 253);
    font-size:14px;
}
.pinglunliebiao  .left{
    float: left;
    width:50px;
    height:50px;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    background-color: aquamarine;
    vertical-align: top;
}
.pinglunliebiao  .right{
    float: right;
    width: calc(100% - 60px);
    /* height:70px; */
    margin-left:2px;
}
 .pinglunliebiao  .right p{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
 } 
.pinglunliebiao .cler_float{
    overflow:hidden;
}
.pinglunliebiao  .right span{
    color: rgb(83, 162, 253);
}
.pinglunliebiao li .lititle{
    margin-left:60px;
    color: rgb(83, 162, 253);
}
</style>
