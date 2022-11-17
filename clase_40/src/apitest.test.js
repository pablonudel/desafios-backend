import SuperTest from 'supertest'
import Chai from 'chai'

const expect = Chai.expect
const requester = SuperTest('http://localhost:8080')

describe('Prueba de API',()=>{
    describe('Users', ()=>{
        it('La petición a Users debería retornar OK', async()=>{
            let response = await requester.get('/api/users')
            const {_body} = response
            console.log(_body);
            expect(response.status).to.eql(200)
        })
    })
})