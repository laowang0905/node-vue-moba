<template>
  <div class="catelist-container">
    <h1>英雄列表</h1>
    <el-main>
      <el-table :data="heroList">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" class="avator-icon" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteHero(scope.row._id)"
            >删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getHeroInfo(scope.row._id)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑英雄" :visible.sync="dialogVisible" width="50%" @close="tabsInit='basic'">
        <el-form :model="heroInfo" ref="form" label-width="80px">
          <el-tabs v-model="tabsInit">
            <el-tab-pane label="基本信息" name="basic">
              <el-form-item label="英雄名称">
                <el-input v-model="heroInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="称号">
                <el-input v-model="heroInfo.title"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/admin/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="heroInfo.icon" :src="heroInfo.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="类型" class="cate-pos">
                <el-tag
                  type="primary"
                  closable
                  v-for="item in selectFormat"
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
                <el-rate
                  v-model="heroInfo.scores.difficult"
                  :max="9"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="技能">
                <el-rate
                  v-model="heroInfo.scores.skills"
                  :max="9"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="攻击">
                <el-rate
                  v-model="heroInfo.scores.attack"
                  :max="9"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="生存">
                <el-rate
                  v-model="heroInfo.scores.survice"
                  :max="9"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="顺风出装">
                <el-select v-model="heroInfo.items1" placeholder="请选择" clearable multiple>
                  <el-option
                    v-for="item in items"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select v-model="heroInfo.items2" placeholder="请选择" clearable multiple>
                  <el-option
                    v-for="item in items"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用技巧">
                <el-input v-model="heroInfo.usageTips" type="textarea" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="对抗技巧">
                <el-input v-model="heroInfo.battleTips" type="textarea" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="团战思路">
                <el-input v-model="heroInfo.teamTips" type="textarea" style="width: 80%"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能" style="min-height: 60vh" name="skills">
              <el-button type="default" size="small" @click="addSkill">
                <i class="el-icon-plus"></i>添加技能
              </el-button>
              <el-row>
                <el-col
                  :span="12"
                  v-for="(item, index) in heroInfo.skills"
                  :key="index"
                  style="padding: 0 20px;"
                >
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
                      :headers="getAuth()"
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
                  <el-button type="danger" @click="heroInfo.skills.splice(i, 1)">删除</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putHeroEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import { reqHeroList, reqDeleteHero, reqHeroInfo, reqHeroEdit, reqCategoryList, reqItemList } from '../../network/index'
export default {
  data () {
    return {
      heroList: [],
      heroInfo: {
        scores: {},
        skills: {}
      },
      categories: [],
      dialogVisible: false,
      selectedCate: [],
      items: [],
      tabsInit: 'basic'
    }
  },
  methods: {
    async getcateList () {
      const data = await reqCategoryList('/categories')
      if (data.status === 200) {
        this.categories = data.data
      }
    },
    async getHeroList () {
      const res = await reqHeroList()
      this.heroList = res.data
    },
    async deleteHero (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await reqDeleteHero(id)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getHeroList()
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
    async getHeroInfo (id) {
      this.heroInfo = { scores: {} }
      const data = await reqHeroInfo(id)
      this.dialogVisible = true
      this.heroInfo = Object.assign({}, this.heroInfo, data.data)
      this.heroId = data.data._id
      this.selectedCate = data.data.categories
    },
    async putHeroEdit () {
      const res = await reqHeroEdit(this.heroId, this.heroInfo)
      if (res.status === 200) {
        this.getHeroList()
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
    handleAvatarSuccess (res) {
      this.$set(this.heroInfo, 'icon', res.url)
    },
    addCategories (item) {
      if (this.heroInfo.categories.indexOf(item._id) === -1) {
        this.heroInfo.categories.push(item._id)
      }
    },
    deleteCate (item) {
      this.heroInfo.categories.splice(this.heroInfo.categories.indexOf(item._id))
    },
    async getItemList () {
      const res = await reqItemList()
      this.items = res.data
    },
    addSkill() {
      this.heroInfo.skills.push({})
    }
  },
  created () {
    this.getHeroList()
    this.getcateList()
    this.getItemList()
  },
  computed: {
    selectFormat () {
      const arr = this.categories.filter(item => {
        return this.selectedCate.indexOf(item._id) !== -1
      })
      return arr
    }
  },
}
</script>
<style lang='less' scope>
.avator-icon {
  width: 25px;
}
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