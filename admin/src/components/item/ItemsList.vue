<template>
  <div class="catelist-container">
    <h1>物品列表</h1>
    <el-main>
      <el-table :data="itemList">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" class="avator-icon">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteItem(scope.row._id)"
            >删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getItemInfo(scope.row._id)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑物品" :visible.sync="dialogVisible" width="50%">
        <el-form :model="itemInfo" ref="form" label-width="80px">
          <el-form-item label="物品名称">
            <el-input v-model="itemInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="getAuth()"
            >
              <img v-if="itemInfo.icon" :src="itemInfo.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putItemEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import { reqItemList, reqDeleteItem, reqItemInfo, reqItemEdit } from '../../network/index'
export default {
  data () {
    return {
      itemList: [],
      itemInfo: {},
      dialogVisible: false,
    }
  },
  methods: {
    async getItemList () {
      const res = await reqItemList()
      this.itemList = res.data
    },
    async deleteItem (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await reqDeleteItem(id)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getItemList()
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
    async getItemInfo (id) {
      const data = await reqItemInfo(id)
      this.dialogVisible = true
      this.itemInfo = data.data
      this.itemId = data.data._id
    },
    async putItemEdit () {
      const res = await reqItemEdit(this.itemId, this.itemInfo)
      if (res.status === 200) {
        this.getItemList()
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
      this.$set(this.itemInfo, 'icon', res.url)
    }
  },
  created () {
    this.getItemList()
  },
}
</script>
<style lang='less' scope>
.avator-icon {
  width: 25px;
}
</style>