//generator 在中间件的使用

const koa = require('koa')
const koaConvert = require('koa-convert')
const loggerGennerator = require('./logger-generator')

const app = new koa()
app.use(koaConvert(loggerGennerator()))
app.use((ctx) => {
    ctx.body = 'hello words'
})
app.listen(3000)
console.log('the server is starting at port 3000')