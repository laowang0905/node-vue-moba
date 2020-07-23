<template>
  <div class="catelist-container">
    <h1>分类列表</h1>
    <el-main>
      <el-table :data="cateList">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteCategory(scope.row._id)"
            >删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getCategoryInfo(scope.row._id)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑分类" :visible.sync="dialogVisible" width="50%">
        <el-form label-width="50px">
          <el-form-item label="上级分类">
            <el-select v-model="categoryInfo.parent" placeholder="请选择">
              <el-option
                v-for="item in cateListRoot"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="名称">
            <el-input clearable v-model="categoryInfo.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putCategoryEdit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import { reqCategoryList, reqCategoryInfo, reqCategoryEdit, reqDeleteCategory } from '../../network/index'
export default {
  data () {
    return {
      cateList: [],
      cateListRoot: [],
      dialogVisible: false,
      categoryInfo: {},
      cateId: ''
    }
  },
  methods: {
    async getcateList () {
      const data = await reqCategoryList('/categories')
      if (data.status === 200) {
        const arr = data.data.filter(item => {
          return !item.parent
        })
        this.cateListRoot = arr
        this.cateList = data.data
      }
    },
    // 获取分类信息
    async getCategoryInfo (id) {
      this.cateId = id
      this.dialogVisible = true
      const res = await reqCategoryInfo(id)
      console.log(res);
      this.categoryInfo = res.data
    },
    // 编辑分类提交
    async putCategoryEdit () {
      const res = await reqCategoryEdit(this.cateId, this.categoryInfo)
      if (res.status === 200) {
        this.getcateList()
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
    // 删除分类
    deleteCategory (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await reqDeleteCategory(id)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getcateList()
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

    }
  },
  created () {
    this.getcateList()
  },
}
</script>
<style lang='less' scope>
</style>