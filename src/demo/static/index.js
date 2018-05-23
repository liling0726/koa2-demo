const koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app= new koa()

app.use(static(__dirname))

/* app.use(async (ctx)=>{
    ctx.body = 'hello word'
}) */
app.listen(3000,()=>{
    console.log('3000 start')
})