const koa=require('koa')
const app = new koa()

app.use(async (ctx)=>{
    const {url,query:ctx_query,querystring:ctx_querystring,request:{query,querystring}} = ctx
    ctx.body={
        url,
        ctx_query,
        ctx_querystring,
        query,
        querystring
    }
})
app.listen(3000,()=>{
    console.log('start 3000')
})