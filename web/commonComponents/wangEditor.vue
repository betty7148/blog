<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import { apiDomin } from '../utils'
  export default {
    name: 'Editorbar',
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null,
        imgsrc:[]
      }
    },
    created(){
      this.imgsrc=[]
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function(value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods: {
      seteditor() {
        // http://192.168.2.125:8080/admin/storage/create
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
        // this.editor.customConfig.uploadImgServer = 'http://otp.cdinfotech.top/file/upload_images'// 配置服务器端地址
        this.editor.customConfig.uploadImgServer = 'http://localhost:7001/home/article/uploadImg'// 配置服务器端地址
        
        this.editor.customConfig.uploadImgHeaders = { }// 自定义 header
        this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

        // 配置菜单
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]
        this.editor.customConfig.showLinkImg = false;
        this.editor.customConfig = {
            debug: true,//开启debug调试
            uploadImgServer: apiDomin('home/article/uploadImg'),//配置上传图片的接口api
            uploadImgMaxSize: 5 * 1024 * 1024,//图片大小限制为 5M
            uploadImgMaxLength: 10,// 限制一次最多上传 10 张图片
            // uploadFileName: 'myFileName',//配置文件参数名（这个参数必需配置，后台用这个值接收图片）
            showLinkImg:false  //隐藏网络图片tab
        };
        this.editor.customConfig.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
            console.log(result);
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            console.log(result);
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
            console.log(editor);
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
            console.log(editor);
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result.data[0].url)
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              console.log(result)
              result=result['data'];
              let url = apiDomin(result.url);
              
              url = result.url[0];
              console.log(' 图片上传并返回结果'+url);
              this.imgsrc.push(url);
              console.log(this.imgsrc);
              insertImg(url)
            // }
          }
        }
        this.editor.customConfig.onchange = (html) => {

          console.log(this.imgsrc);
          if (this.imgsrc.length !== 0) {
            let nowimgs = this.getSrc(html);
            //将nowimgs中的数据深拷贝到concatImg中
            let concatImg=[];
            nowimgs.forEach(item=>{
              concatImg.push(item);
            })
            
            console.log(nowimgs);
            console.log(concatImg);
            this.imgsrc.forEach(item=>{
              console.log("遍历"+item);
              concatImg.push(item+'');
            })
            console.log(concatImg);
            let merge = concatImg.filter(function (v, i, arr) {
              console.log(arr);
              console.log("图片"+v+"第一次出现的位置是："+arr.indexOf(v));
              console.log("图片"+v+"最后一次出现的位置是："+arr.lastIndexOf(v));
              return arr.indexOf(v) === arr.lastIndexOf(v)
            })
            for (let x in merge) {
              let colds = merge[x];
              console.log("删除"+colds)
              this.deleteImage(colds) //服务器删除文件
            }
            this.imgsrc = nowimgs
          }
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
        
      },
      getSrc (html) {
        var imgReg = /<img.*?(?:>|\/>)/gi
        // 匹配src属性
        var srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i
        var arr = html.match(imgReg)
        let imgs = []
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg)[1]
            imgs.push(src)
          }
        }
        return imgs
      },
      deleteImage(imgsrc){
        imgsrc=imgsrc+'';
        console.log("删除"+imgsrc);
        var imgsrcArr=imgsrc.split("/");
        console.log(imgsrcArr);
        this.$http.get(apiDomin(`home/article/removeImg?img=${imgsrcArr[2]}`)).then(result=>{
          console.log("删除的路径");
          console.log(result['data']);
        })
      }
    }
  }
</script>

<style lang="css">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>