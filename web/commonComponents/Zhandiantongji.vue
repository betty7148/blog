<template>
    <div id="zhandiantongji">
        <!-- X -->
        <div class="title">
            <img src="../imgs/gonggao.png">
            <span >站点统计</span>
        </div>
        <div >

        </div>
        <div class="clear_flo content" >
            <div>
                <span>标签：166个</span>
                <span>页面：5个</span>
                <span>分类：30个</span>
            </div>
            <div>
                <span>文章：96篇</span>
                <span>评论：975条</span>
                <span>最后更新：2019-10-11</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#zhandiantongji{
    padding: 10px ;
    font-size: 13px;
    background-color: white;
    margin-bottom: 30px;
}

.title{
    height: 30px;
    line-height: 30px;
}
#zhandiantongji> div:first-child{
    border-bottom:1px solid indigo;
    overflow: hidden;
    /* display: inline-block; */
    float: left;
}
#zhandiantongji> div:nth-of-type(2){
    border-bottom:1px solid #ccc;
    width: calc(100% - 90px);
    height:30px;
    /* overflow: hidden; */
    /* display: inline-block; */
    float: left;
}
#zhandiantongji> div:nth-of-type(3){
    padding-top: 10px ;
}
#zhandiantongji img{
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
.content{
    display: flex;
}
.content>div:first-child{
    flex:3;
}
.content>div{
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.content>div>span{
    padding-bottom:5px ;
    font-size:14px;
}

</style>
