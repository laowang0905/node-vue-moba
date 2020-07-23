<template>
  <div class="cateedit-container">
    <h1>新建英雄</h1>
    <el-form @submit.native.prevent="save" label-width="100px">
      <el-tabs value="skills">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-row>
              <el-col :span="12">
                <el-input v-model="hero.name" clearable class="input-width"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="称号">
            <el-row>
              <el-col :span="12">
                <el-input v-model="hero.title" clearable class="input-width"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="getAuth()"
            >
              <img v-if="hero.icon" :src="hero.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型" class="cate-pos">
            <el-tag
              type="primary"
              closable
              v-for="item in selectedCate"
              :key="item._id"
              @close="deleteCate(item)"
            >{{item.name}}</el-tag>
            <el-popover placement="top" width="400" trigger="click" class="popover">
              <div class="all-cate">
                <el-tag
                  class="mr-10"
                  type="primary"
                  v-for="item in categories"
                  :key="item._id"
                  @click="addCategories(item)"
                >{{item.name}}</el-tag>
              </div>
              <el-button slot="reference">添加</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="hero.scores.difficult" :max="9" show-score style="margin-top: 10px"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="hero.scores.skills" :max="9" show-score style="margin-top: 10px"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="hero.scores.attack" :max="9" show-score style="margin-top: 10px"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="hero.scores.survice" :max="9" show-score style="margin-top: 10px"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="hero.items1" placeholder="请选择" clearable multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="hero.items2" placeholder="请选择" clearable multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="hero.usageTips" type="textarea" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="hero.battleTips" type="textarea" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="hero.teamTips" type="textarea" style="width: 80%"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" style="min-height: 60vh" name="skills">
          <el-button type="default" size="small" @click="addSkill">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row>
            <el-col :span="12" v-for="(item, index) in hero.skills" :key="index" style="padding: 0 20px;">
              <el-tag type="danger" style="margin-top: 20px">技能{{index+1}}</el-tag>
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/admin/api/upload"
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'avator', res.url)"
                >
                  <img v-if="item.avator" :src="item.avator" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input v-model="item.desc"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-button type="danger" @click="hero.skills.splice(i, 1)">删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reqCreateHero, reqCategoryList, reqItemList } from '../../network/index'
export default {
  data () {
    return {
      hero: {
        categories: [],
        scores: {},
        skills: []
      },
      // 所有分类
      categories: {},
      // isShow: false
      selectedCate: [],
      items: []
    }
  },
  methods: {
    async getcateList () {
      const data = await reqCategoryList('/categories')
      if (data.status === 200) {
        this.categories = data.data
      }
    },
    // 提交数据
    async save () {
      const result = await reqCreateHero(this.hero)
      console.log(result)
      result.status === 200 && this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/hero/list')
      this.hero = {}
    },
    handleAvatarSuccess (res) {
      this.$set(this.hero, 'icon', res.url)
    },
    //  像hero中添加分类
    addCategories (item) {
      if (this.selectedCate.indexOf(item) === -1) {
        this.selectedCate.push(item)
        this.hero.categories.push(item._id)
      }
    },
    // 删除已选的分类
    deleteCate (item) {
      this.selectedCate.splice(this.selectedCate.indexOf(item), 1)
      this.hero.categories.splice(this.hero.categories.indexOf(item._id), 1)
    },
    async getItemList () {
      const res = await reqItemList()
      this.items = res.data
    },
    addSkill () {
      this.hero.skills.push({})
    }
  },
  created () {
    this.getcateList()
    this.getItemList()
  },
}
</script>
<style lang='less' scoped>
.mr-10 {
  cursor: pointer;
  margin-right: 10px;
}
.cate-pos {
  position: relative;
  span {
    margin-right: 10px;
  }
  .popover {
    position: absolute;
    top: 0;
    left: 40%;
  }
}
</style>