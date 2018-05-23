const koa = require('koa')
const session = require('koa-session-minimal')
const sqlSession = require('koa-mysql-session')
const app = new koa()

const store=new sqlSession({
    user:'root',
    database:'koa_demo',
    host:'127.0.0.1'
})
const cookie = {
    maxAge:'',
    expires:'',//失效时间
    path:'',//路径
    domain:'',
    httpOnly:false,
    overwrite:true,
    secure:'',
    sameSite:'',
    signed:''
}
app.use(session({
    key:'SESSION_ID',
    store,
    cookie
}))
app.use(async (ctx)=>{
    if(ctx.url==='/set'){
        ctx.session={
            user_id:Math.random().toString(36).substr(2),
            count:0
        }
        ctx.body=ctx.session
    }else{
        ctx.session.count = ctx.session.count +1
        ctx.body=ctx.session
    }
})
app.listen(3001,()=>{
    console.log('start 3000')
})