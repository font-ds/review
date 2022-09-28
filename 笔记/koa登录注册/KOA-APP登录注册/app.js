const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')


const users = require("./routes/api/users")
const profile = require('./routes/api/profile')

//实例化koa
const app = new koa()
const router = new Router()

app.use(bodyParser())

//路由
router.get('/', async ctx => {
    ctx.body = { msg: 'Hello Koa' }
})

//连接数据库
mongoose.connect("mongoose://test:test123456@ds119210.mlab.com:19210/koa-restful-api", { useNewUrlParser: true })
    .then(() => {
        console.log("Mongodb Connectd...");
    })
    .catch(err => {
        console.log(err);
    })


app.use(passport.initialize())
app.use(passport.session())

//回调到config文件中
require('./config/passport')(passport)

//配置路由地址
router.use('/api/users', users)
router.use('/api/profile', profile)

//配置路由
app.use(router.routes()).use(router.allowedMethods())

const post = process.env.PORT || 5000

app.listen(post, () => {
    console.log(`server started on ${post}`);
})