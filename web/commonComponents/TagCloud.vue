<template>
    <div id="tagcloud">
        <!-- X -->
        <div class="title">
            <img src="../imgs/gonggao.png">
            <span >标签云</span>
        </div>
        <div >

        </div>
        <div class="clear_flo tag" ref='tag'>
            <span v-for='item in categoryList' :key='item.id' :class='colorList[item.id%7]'>
                {{item.name}}
            </span>
        </div>
    </div>
</template>

<script>
import { apiDomin } from '../utils'
export default {
    data(){
        return{
            categoryList:[],
            colorList:['orange','green','purple','blue','pink','yellow','yellow_orange']
        }
    },
    created(){
        this.getCategoryList();
        this.addClass();
    },
    methods:{
        getCategoryList(){
            this.$http.get(apiDomin('home/getCategoryList')).then(result=>{
                this.categoryList = result.data;
            })
        },
        addClass(){
            let spanList=this.$refs.tag;
            console.log(spanList);
        }
    }

}
</script>

<style>
#tagcloud{
    padding: 10px ;
    font-size: 13px;
    background-color: white;
    margin-bottom: 30px;
}

.title{
    height: 30px;
    line-height: 30px;
}
#tagcloud> div:first-child{
    border-bottom:1px solid indigo;
    overflow: hidden;
    float: left;
}
#tagcloud> div:nth-of-type(2){
    border-bottom:1px solid #ccc;
    width: calc(100% - 75px);
    height:30px;
    float: left;
}
#tagcloud> div:nth-of-type(3){
    padding: 10px 0px;
}

#tagcloud img{
    height: 30px;
    /* display: inline-block; */
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
.tag >span{
    display: inline-block;
    border-radius: 3px;
    padding:4px 4px;
    margin:4px 2px;
    color: white;
}

.tag >span.yellow_orange{
    background-color: #f3a683;
}

.tag >span.blue{
    background-color: #778beb;
}
.tag >span.purple{
    background-color: slateblue;
}
.tag>span.green{
    background-color: #20bf6b;
}
.tag>span.pink{
    background-color: pink;
}
.tag>span.orange{
    background-color: #e77f67;
}
.tag>span.yellow{
    background-color: rgb(229, 131,8);
}
</style>
