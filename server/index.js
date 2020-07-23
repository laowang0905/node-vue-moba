const express = require("express")
const app = express()
const cors = require('cors')
app.set('secret', 'wangjidong')

app.use(cors())
// app.all(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin","*")
//   res.header("Access-Control-Allow-Headers","X-Request-With,Content-Type")
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
//   next()
// })
app.use(express.json())
// 管理静态资源
app.use('/uploads', express.static(__dirname+'/uploads'))
require("./routes/admin")(app)
// 数据库
require("./plugins/db")(app)

app.listen(3000, () => {
  console.log("app is running")
})