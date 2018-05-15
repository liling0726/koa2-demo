//generator 在中间件的使用

const koa = require('koa')
const koaConvert = require('koa-convert')
const loggerAsync = require('./logger-async')

const app = new koa()
app.use(koaConvert(loggerAsync()))
app.use((ctx) => {
    ctx.body = 'hello words'
})
app.listen(3000)
console.log('the server is starting at port 3000')