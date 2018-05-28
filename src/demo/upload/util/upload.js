/**
 * 上传js
 */
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件夹
 * @param {* string} dirname  目录绝对路径
 * @return {boolean} 创建目录结果
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    }
    console.log('创建文件夹', path.dirname(dirname), mkdirsSync(path.dirname(dirname)))
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
    }
}
/**
 * 获取文件名后缀
 * @param { string} fileName 
 */
function getSuffixName(fileName) {
    const nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
    const { req, req: { headers } } = ctx

    const busboy = new Busboy({ headers })

    //获取类型
    const { fileType = 'common' } = options
    const filePath = path.join(options.path, fileType)
    const mkdirResult = mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('进入下载')
        let result = {
            success: false,
            formData: {}
        }
        //解析文件请求
        busboy.on('file', function (fieldName, file, fileName, encoding, mimeType) {
            console.log('文件解析')
            fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(fileName)
            const _uploadFilePath = path.join(filePath, fileName)
            const saveTo = path.join(_uploadFilePath)

            //文件保存到指定路径
            file.pipe(fs.createWriteStream(saveTo))

            //文件写入事件结束
            file.on('end', function () {
                Object.assign(result, {
                    success: true,
                    data:{
                        pictureUrl:`//${ctx.host}/image/${fileType}/${fileName}`
                    },
                    message: '文件上传成功'
                })
                console.log('文件上传成功')
                resolve(result)
            })
        })
        //解析表单中其他字段信息
        busboy.on('filed', function (fieldName, value, fieldNameTruncated, encoding, mimeType) {
            console.log(`表单字段数据[${fileName}]:value:${inspect(value)}`)
            result.formData[fileName] = inspect(value)
        })

        //解析事件结束
        busboy.on('finish', () => {
            console.log('文件上传结束')
            resolve(result)
        })
        //文件解析错误
        busboy.on('error', (err) => {
            console.log('文件上传出错')
            result.errInfo = err
            reject(resutl)
        })

        req.pipe(busboy)
    })
}
module.exports = {
    uploadFile
}