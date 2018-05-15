const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

function render(page){
    return new Promise((resolve,reject)=>{
        fs.readFile(page,'utf-8',(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

app.use( async ( ctx ) => {
  let url = ctx.request.url || ''
  url = url.substring(1) || 'index'
  
  let html = await render(path.resolve(__dirname,'pages/'+url+'.html'))
  ctx.body = html
})


app.listen(3000)