<template>
<div class="login-container">
  <el-card :body-style="{ padding: '0px' }" class="login-card">
    <div slot="header">
      <span>请先登录</span>
    </div>
    <el-form :model="login_form" ref="login" label-width="80px" @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="login_form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="login_form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>
<script>
import { reqLogin } from '../network/index'
export default {
  data() {
    return {
      login_form: {}
    }
  },
  methods: {
    async login() {
      const res = await reqLogin(this.login_form)
      if(res.status === 200) {
        sessionStorage.token = res.data.token
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
}
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  padding: 50px;
  
}
</style>