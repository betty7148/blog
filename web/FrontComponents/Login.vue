<template>
<div class="login">
    <h2>个人博客后台登录</h2>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
       
            <el-button type="primary" size='medium' @click="onSubmit">登录</el-button>
    </el-form>
</div>
   
</template>

<script>
export default {
data() {
      return {
        form: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
         this.$router.push({ path: '/backend/home' }) 
      }
    }
}
</script>

<style>
/* body{
    background-color: aliceblue;
} */
.login{
    width:30%;
    margin:auto;
    text-align: center;
    border:1px solid #ccc;
    padding:20px;
    margin-top:100px;
}
.login .el-form-item__content{
    /* margin-left: 0px !important; */
}
</style>
