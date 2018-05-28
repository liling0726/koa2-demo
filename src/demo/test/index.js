const koa = require('koa')

const app = new koa()

app.use(async (ctx) => {
    let result = {
        success: true
    }
    const url = ctx.url
    if (ctx.method === "GET") {
        switch (url) {
            case '/test':
                result.data = 'this is a test'
                break
            case 'getNumber':
            result.data = 123456
            break
            default:
            result.data = 'default value'
        }
    }else if (ctx.method === "POST"){
        switch (url) {
            case '/postData':
                result.data = 'this is a postData'
                break
            case 'postNumber':
            result.data = 'post number is123456'
            break
            default:
            result.data = 'post default value'
        }
    }else{
        result.data = {
            success:false,
            data:'this is error request, this just accept post and get methods'
        }
    }
    ctx.body = result
})
app.listen(3000,()=>{
    console.log('start 3000')

})
module.exports=app