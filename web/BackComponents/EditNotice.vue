<template>
    <div id="editor_notice">
        <h3>&nbsp;编辑博客主页公告</h3>
        <div style="margin: 20px 0;"></div>
        <el-input
            type="textarea"
            show-word-limit 
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容,最大长度为300"
            v-model='textarea3'
            maxlength='300'>
        </el-input>
        <!-- <div class="getMoreCommentBut"> --> 
            <button @click='editNotice' ref='editNotice' name='qq'>提交</button>
            {{this.$store.state.gonggao}}
        <!-- </div> -->
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      textarea2: '',
      textarea3: this.$store.state.gonggao
    //   '博客数据迁移完毕，部分细节有待优化中...   博客首次打开可能会很慢，由于目前菜的不谈无解╮(╯▽╰)╭【主题】采用nuxtjs + wordpress rest api实现前后端分离，服务端渲染页面'
    }
  },
  methods:{
      editNotice(){

          this.$store.commit('setNotice',this.textarea3);

      }
  }
}
</script>


<style>
#editor_notice{
    background-color: white;
    width:100%;
    padding:30px;
}
#editor input::-webkit-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}
input::-moz-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}
input::-ms-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}
#editor_notice button{
    border-radius:19px;
    width:80px;
    height:43px;
    background-color: #409EFF;
    color: white;
    font-size:15px;
    float: right;
    margin-top:10px;
}

</style>
