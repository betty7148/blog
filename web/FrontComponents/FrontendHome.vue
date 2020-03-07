<template>
    <div id="index">
        <el-container style="height: 1000px; ">
            <el-header id="header"> 
                <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <!-- <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="color: rgb(255, 208, 75); border-bottom-color: rgb(255, 208, 75); background-color: rgb(84, 92, 100);">首页</li> -->
                    <el-menu-item index="1"><router-link to='/home' tag='div'>首页</router-link></el-menu-item>
                    <el-submenu index="2">
                        <template slot="title" >WEB前端</template>
                        <el-menu-item index="2-1" ><router-link to='/home/article/category/css3' tag='div'>CSS3</router-link></el-menu-item>
                        <el-menu-item index="2-2"><router-link to='/home/article/category/vue' tag='div'>Vue</router-link></el-menu-item>
                        <el-menu-item index="2-3"><router-link to='/home/article/category/js' tag='div'>JavaScript</router-link></el-menu-item>
                        <el-menu-item index="2-4"><router-link to='/home/article/category/html5' tag='div'>HTML5</router-link></el-menu-item>
                        <el-menu-item index="2-5"><router-link to='/home/article/category/es6' tag='div'>es6</router-link></el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" >
                        <template slot="title">前端工程化</template>
                        <el-menu-item index="3-1"><router-link to='/home/article/category/webpack' tag='div'>Webpack</router-link></el-menu-item>
                        <el-menu-item index="3-2"><router-link to='/home/article/category/git' tag='div'>Git</router-link></el-menu-item>
                    </el-submenu>
                    <el-submenu index="4" >
                        <template slot="title">服务端</template>
                        <el-menu-item index="4-1"><router-link to='/home/article/category/node.js' tag='div'>Node.js</router-link></el-menu-item>
                        <el-menu-item index="4-2"><router-link to='/home/article/category/php' tag='div'>PHP</router-link></el-menu-item>
                    </el-submenu>
                    <el-submenu index="5" >
                        <template slot="title">数据库</template>
                        <el-menu-item index="5-1"><router-link to='/home/article/category/mysql' tag='div'>MySQL</router-link></el-menu-item>
                        <el-menu-item index="5-2"><router-link to='/home/article/category/mongodb' tag='div'>MongoDB</router-link></el-menu-item>
                    </el-submenu>
                    <!-- <el-menu-item index="6" ><a href="https://www.ele.me" target="_blank">其他</a></el-menu-item> -->
                    <el-menu-item index="7" class="float_rig"><router-link to='/backend/login'>登录</router-link></el-menu-item>
                    <el-menu-item index="8" class="float_rig"><a href="#" target="_blank">注册</a></el-menu-item>
                    <el-menu-item index='9' class="demo-input-suffix float_rig">
                        <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input2">
                        </el-input>
                    </el-menu-item>
                </el-menu>
            </el-header>
                <!-- <transition> -->
            <el-container class="main_content">
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-aside width="280px">
                    <gonggao></gonggao>
                    <latestcommont></latestcommont>
                    <zhandiantongji></zhandiantongji>
                    <tagcloud></tagcloud>
                </el-aside>
            </el-container>
                <!-- </transition> -->
            <footer id="footer">
                <ul>
                    <li><a href="#">网站首页</a></li>
                    <li><a href="#">关于本站</a></li>
                    <li><a href="#">免责声明</a></li>
                    <li><a href="#">积分规则</a></li>
                    <li><a href="#">在线留言</a></li>
                    <li><a href="#">友情链接</a></li>
                    <li><a href="#">RSS订阅</a></li>
                    <li><a href="#">联系站长</a></li>               
                </ul>
                <ul>
                    <li><a href="#">Copyright © 2018 WEB前端技能</a></li>
                    <li><a href="#">晋ICP备17011230号-3</a></li>
                    <li><a href="#">本站CDN存储服务由<span>图标</span>赞助提供</a></li>
                </ul>
            </footer>
            </el-container>
    </div>
</template>

<script>
import gonggao from '../commonComponents/Gonggao.vue';
import latestcommont from '../commonComponents/Zuixinpinglun.vue';
import zhandiantongji from '../commonComponents/Zhandiantongji.vue';
import tagcloud from '../commonComponents/TagCloud.vue'
export default {
    
  data() {
    return {
      data: "",
      input2:'',
      articleCategory:this.$route.params.categoryName,
      activeIndex: "",
    };
  },
  components:{
      gonggao,
      latestcommont,
      zhandiantongji,
      tagcloud
  },
  created() {
    this.articleCategory=this.$route.params.categoryName;
    this.getActive();
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    getActive(){
            console.log(this.articleCategory);
            if(!this.articleCategory){
                this.activeIndex="1";
            }
            switch(this.articleCategory){
                case 'css3':
                    console.log("确实是css3");
                    // console.log(document.getElementById("2"));//null
                    //不能用这种方式，因为created阶段还未生成DOM节点 无法获取节点
                    // document.getElementById("2").classList.add("is-active");
                    this.activeIndex="2-1";
                    break;
                case 'vue':
                    this.activeIndex="2-2";
                    break;
                case 'js':
                    this.activeIndex="2-3";
                    break;
                case 'html5':
                    this.activeIndex="2-4";
                    break;
                case 'es6':
                    this.activeIndex="2-5";
                    break;
                case 'webpack':
                    this.activeIndex="3-1";
                    break;
                case 'git':
                    this.activeIndex="3-2";
                    break;
                case 'node.js':
                    this.activeIndex="4-1";
                    break;
                case 'php':
                    this.activeIndex="4-2";
                    break;
                case 'mysql':
                    this.activeIndex="5-1";
                    break;
                case 'mongodb':
                    this.activeIndex="5-2";
                    break;
            }
            console.log(this.activeIndex);
        }
  },
  watch: {
    　　'$route': function (to, from) {
            this.articleCategory=this.$route.params.categoryName,
            this.activeIndex=this.getActive();
    　　}
    },
};
</script>

<style>
*{
    padding:0px;
    margin:0px;
}
ul{
    list-style: none;
}
.el-main {
  /* height: 800px; */
  margin-top:60px;
}
.el-aside{
    margin-top:60px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
#header .float_rig{
    float:right;
}
.el-aside {
  color: #333;
}
#header {
    padding: 0px;
    text-align: center;
    position: fixed;
    width:100%;
    z-index: 100;
}
#header .el-menu{
    padding:0px 10%;
}
#header a{
    text-decoration: none;
}
#footer{
    background-color:  #545c64;
    color: white;
    display: flex;
    justify-content: center;
    padding:20px 0px;
    flex-direction: column;
    align-items: center;
}
#footer ul{
    flex:1;
  
}
#footer ul li{
    display: inline-block;
}
#footer a{
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
}
.main_content{
    background-color:#eee;
    display: flex;
    justify-content:space-around;
    padding:0px 10%;
}
</style>
