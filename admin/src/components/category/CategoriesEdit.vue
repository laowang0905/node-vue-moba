<template>
  <div class="cateedit-container">
    <h1>新建分类</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <!-- 选择上级分类 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择" clearable>
          <el-option
            v-for="item in parentOptions"
            :key="item.value"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-row>
          <el-col :span="12">
            <el-input v-model="model.name" clearable class="input-width"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reqCategoryCreate, reqCategoryList } from '../../network/index'
export default {
  data () {
    return {
      model: {
      },
      parentOptions: []
    }
  },
  methods: {
    // 提交数据
    async save () {
      if(this.model.parent===''){
        this.model.parent = null
      }
      console.log(this.model);
      
      const result = await reqCategoryCreate(this.model)
      result.status === 200 && this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/categories/list')
      this.model = {}
    },
    async getcateList () {
      const data = await reqCategoryList('/categories')
      if (data.status === 200) {
        this.parentOptions = data.data
      }
    },
  },
  created () {
    this.getcateList()
  },
}
</script>
<style lang='less' scoped>
</style>