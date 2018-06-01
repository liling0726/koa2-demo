//使用koa2-router
const koa = require('koa')
const fs = require('fs')
const app = new koa()

const path = require('path')
const Router = require('koa-router')

function render(page) {
    return new Promise((resolve, reject) => {
        fs.readFile(page, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}
//路由1
let home = new Router()
home.get('/', async (ctx) => {
    const html = `
     <ul>
         <li><a href="/page/todo">首页</a></li>
        <li><a href="/page/404">404</a></li>
    </ul>
     `
    ctx.body = html
})

//page 路由
let page = new Router()
page.get('/404', async (ctx) => {
    const html= await render(path.resolve(__dirname,'pages/404.html'))
    ctx.body = html
}).get('/todo', async (ctx) => {
   const html= await render(path.resolve(__dirname,'pages/todo.html'))
    ctx.body = html
})

//装在所有路由
let router = new Router()
router.use('/', home.routes())
.use('/page', page.routes())


//加载路由中间件
app.use(router.routes())

app.listen(3000, () => {
    console.log('route-use-middleware is starting at port 3000')
})