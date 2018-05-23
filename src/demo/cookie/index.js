const koa = require('koa')
const app = new koa()

app.use(async (ctx)=>{
    if(ctx.url==='/index'){
        ctx.cookies.set('indexCookie',`this is cookies ${Math.random()*1000}`,{
            domian:'localhost',
            path:'/index',
            expires:new Date('2018-09-3'),
            httpOnly:false,
            overwrite:false
        }) 
        //异步，首次undefined
        ctx.body=ctx.cookies.get('indexCookie')+' ha ha'
    }else{
        ctx.body = 'hello word'
    }
    
})
app.listen(3000,()=>{
    console.log('3000 start')
})