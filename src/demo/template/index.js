const koa= require('koa')
const views=require('koa-views')
const path = require('path')
const app = new koa()

//加载引擎模板
app.use(views(path.join(__dirname,'./view'),{
    extension:'ejs'
}))

app.use(async (ctx)=>{
    let title = 'this is a koa <br />template'
    await ctx.render('index',{
        title
    })
})
app.listen(3000,()=>{
    console.log('start 3000')
})