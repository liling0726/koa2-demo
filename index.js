const koa = require('koa')
const app = new koa()
app.use(async (ctx)=>{
    ctx.body='hello koa2'
})
app.listen(3000)
console.log('start-quick is starting at port 3000')