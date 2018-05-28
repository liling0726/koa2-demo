const supertest = require('supertest')
const chai = require('chai')
const { expect } = chai
const app = require('./index')

const request = supertest(app.listen())


describe('开始测试demo请求', () => {
    it('测试test请求', (done) => {
        request.get('/test')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an('object')
                expect(res.body.success).to.be.an('boolean')
                expect(res.body.data).to.be.an('string')
                done()
            })
    })
    it('测试post请求',(done)=>{
        request.post('/postData')
            .expect(200)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body).to.be.an('object')
                expect(res.body.success).to.be.an('boolean')
                expect(res.body.data).to.be.an('string')
                done()
            })
    })
})
