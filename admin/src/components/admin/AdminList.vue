<template>
  <div class="catelist-container">
    <h1>管理员列表</h1>
    <el-main>
      <el-table :data="adminList">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteAdmin(scope.row._id)"
            >删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getAdminInfo(scope.row._id)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%">
        <el-form :model="adminInfo" ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="adminInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="adminInfo.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="adminInfo.avator" :src="adminInfo.avator" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putAdminEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import { reqAdminList, reqDeleteAdmin, reqAdminInfo, reqAdminEdit } from '../../network/index'
export default {
  data () {
    return {
      adminList: [],
      adminInfo: {},
      dialogVisible: false,
    }
  },
  methods: {
    async getAdminList () {
      const res = await reqAdminList()
      this.adminList = res.data
    },
    async deleteAdmin (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await reqDeleteAdmin(id)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAdminList()
        } else {
          this.$message({
            type: 'error',
            message: res.data
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async getAdminInfo (id) {
      const data = await reqAdminInfo(id)
      this.dialogVisible = true
      this.adminInfo = data.data
      this.adminId = data.data._id
    },
    async putAdminEdit () {
      const res = await reqAdminEdit(this.adminId, this.adminInfo)
      if (res.status === 200) {
        this.getAdminList()
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '提交失败'
        })
      }
    },
    handleAvatarSuccess(res) {
      this.$set(this.adminInfo, 'icon', res.url)
    }
  },
  created () {
    this.getAdminList()
  },
}
</script>
<style lang='less' scope>
.avator-icon {
  width: 25px;
}
</style>