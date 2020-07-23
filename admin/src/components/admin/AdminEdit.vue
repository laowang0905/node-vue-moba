<template>
  <div class="cateedit-container">
    <h1>新建管理员</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <el-form-item label="用户名">
        <el-row>
          <el-col :span="12">
            <el-input v-model="admin.username" clearable class="input-width"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="密码">
        <el-row>
          <el-col :span="12">
            <el-input v-model="admin.password" clearable class="input-width" show-password></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="admin.avator" :src="admin.avator" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reqCreateAdmin } from '../../network/index'
export default {
  data () {
    return {
      admin: {}
    }
  },
  methods: {
    // 提交数据
    async save () {
      const result = await reqCreateAdmin(this.admin)
      console.log(result)
      result.status === 200 && this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/admin/list')
      this.admin = {}
    },
    handleAvatarSuccess(res) {
      this.$set(this.admin, 'avator', res.url)
    }
  },
  created () {

  },
}
</script>
<style lang='less'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
</style>