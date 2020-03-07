<template>
    <div class="backend">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="250px" style="background-color: rgb(238, 241, 246);margin-top:0px;">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <!-- <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <router-link slot="title" to='/backend/home' tag='span'>我的主页</router-link>
                    </el-menu-item> -->
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <router-link slot="title" to='/backend/home' tag='span'>文章管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <router-link slot="title" to='/backend/commentMgs' tag='span'>评论管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <router-link slot="title" to='/backend/writeArticle' tag='span'>发布文章</router-link>
                    </el-menu-item>
                    <el-menu-item index="5" >
                        <i class="el-icon-document"></i>
                        <router-link slot="title" to='/backend/editNotice' tag='span'>公告管理</router-link>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <router-view></router-view>
            </el-container>
    </el-container>
    
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
.backend{
    padding:0px 100px;
}
.el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
  }
  
.el-aside {
    color: #333;
    
  }
.el-col{
    height:800px;
}
.el-col ul{
    height:100%;
}
.backend .el-menu-item>span{
    display: inline-block;
    width:calc(100% - 64px );
}
</style>
