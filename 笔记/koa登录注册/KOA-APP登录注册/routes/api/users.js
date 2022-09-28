const Router = require('koa-router')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')



const router = new Router()

const User = require('../../models/Users')
const tools = require('../../config/tools')

//测试接口
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = { msg: 'users works' }
})


// 注册
router.post('/register', async ctx => {

    //存储到数据库
    const findResult = await User.find({ email: ctx.request.body.email })
    if (findResult.length > 0) {
        ctx.status = 500,
            ctx.body = {
                "email": "邮箱已被占用"
            }
    } else {
        const avatar = gravatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' })
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: tools.enbcrypt(ctx.request.body.password),
            avatar
        })

        //存储到数据库
        await newUser.save().then(user => {
            ctx.body = user
        }).catch(err => {
            console.log(err)
        })

        //返回json数据
        ctx.body = newUser
    }
})


//登录
router.post('/login', async ctx => {
    //查询
    const findResult = await User.find({ email: ctx.request.body.email })

    if (findResult.length === 0) {
        ctx.status = 404
        ctx.body = { email: '用户不存在' }
    } else {
        var result = await bcrypt.compareSync(ctx.request.body.password, findResult[0].password)
        if (result) {

            //返回token
            const payload = { id: user.id, name: user.name, avatar: user.avatar }
            const token = jwt.sign(payload, 'secret', { expiresIn: '1d' })


            ctx.status = 200
            ctx.body = { success: true, token: 'Bearer ' + token }
        } else {
            ctx.status = 400
            ctx.body = { password: '密码错误' }
        }
    }
})


//验证token
router.get('/current', passport.authenticate('jwt', { session: false }), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        avatar: ctx.state.user.avatar,
        email: ctx.state.user.email,
    }
})

module.exports = router.routes()