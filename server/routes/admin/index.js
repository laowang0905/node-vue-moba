module.exports = app => {
  const express = require("express")
  const login = require("../../models/Admin")
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
   // 上传文件中间件multer
   const multer = require('multer')
   const upload = multer({
     dest: __dirname + '/../../uploads'
   })

  const router = express.Router({
    mergeParams: true
  })

  // const authMiddleWare = async (req, res, next) => {
  //   const token = String(req.headers.authorization || '').split(' ').pop()
  //   assert(token, 422, 'useless token')
  //   // 使用jwt确认token加密的数据
  //   const {
  //     id
  //   } = jwt.verify(token, app.get('secret'))
  //   // console.log(tokenData);
  //   req.user = login.findById(id)
  //   assert(req.user, 422, '用户不存在')
  //   next()
  // }
  // const resourceMiddleWare = async (req, res, next) => {
  //   const modelName = require('inflection').classify(req.params.resource)
  //   req.model = require(`../../models/${modelName}`)
  //   next()
  // }
  const authMiddleWare = require('../../middleware/auth')
  const resourceMiddleWare = require('../../middleware/resource')
  // 创建分类
  router.post('/', async (req, res) => {
    const model = await req.model.create(req.body)
    res.send(model)
  })

  // 获取分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const result = await req.model.find().setOptions(queryOptions).limit(100)
    res.send(result)
  })

  // 获取分类信息
  router.get('/:id', async (req, res) => {
    const result = await req.model.findById(req.params.id)
    res.send(result)
  })

  // 编辑分类信息
  router.put('/:id', async (req, res) => {
    const result = await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.send(result)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    const data = await req.model.findByIdAndDelete(req.params.id, req.body)
    res.send(data)
  })
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)
 
  // 单文件上传， filed名为file， 可以在前端指定
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  app.post('/admin/api/login', async (req, res, next) => {
    const {
      username,
      password
    } = req.body
    const user = await login.findOne({
      username
    }).select('+password')
    // if (!user) {
    //   res.status(422).send({
    //     message: '用户名或密码不正确'
    //   })
    // }
    assert(user, 422, '用户名或密码错误')
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      res.status(422).send({
        message: '用户名或密码不正确'
      })
    }
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      token
    })
  })
  // 错误处理中间件， 四个参数
  app.use(async (err, req, res, next) => {
    console.log(err.statusCode);
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}