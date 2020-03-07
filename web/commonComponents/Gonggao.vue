<template>
    <div id="gonggao">
        <!-- X -->
        <div class="title">
            <img src="../imgs/gonggao.png">
            <span >公告</span>
        </div>
        <div>

        </div>
        <div class="clear_flo" ref='gonggao' >
            {{this.$store.state.gonggao}}
            <!-- <textarea cols="25" rows="10"  name="gonggao" :value='this.$store.state.gonggao'></textarea> -->
        </div>
    </div>
</template>

<script>
export default {
    created(){
        // this.$refs.gionggao.innerHTML=this.$store.state.gonggao;
    }
}
</script>

<style>
#gonggao{
    padding: 10px ;
    font-size: 13px;
    background-color: white;
    margin-bottom: 30px;
}

.title{
    height: 30px;
    line-height: 30px;
}
#gonggao> div:first-child{
    border-bottom:1px solid indigo;
    overflow: hidden;
    /* display: inline-block; */
    float: left;
}
#gonggao> div:nth-of-type(2){
    border-bottom:1px solid #ccc;
    width: calc(100% - 67px);
    height:30px;
    /* overflow: hidden; */
    /* display: inline-block; */
    float: left;
}
#gonggao> div:nth-of-type(3){
    padding: 10px 0px;
}

#gonggao img{
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
.clear_flo>textarea{
    display: inline-block;
    width:100%;
    /* word-break: break-all; */
    height:auto;
}
</style>
