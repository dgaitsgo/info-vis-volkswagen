//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let app = require('../')

import 'mocha'

chai.use(chaiHttp)

//Our parent block
describe('Make configurations', () => {

    describe('/Post Make new configurations', () => {
      it('Should create new configurations', (done) => {
        chai.request(app)
            .post('/makeConfigurations')
            .type('application/json')
            .send([
              {
                id : 'd0a3d237-789c-5f58-ad22-5dff4688b233',
                type : { id : 'a4e62ea7-6616-5c20-8f80-09fce8bf994e' }
              },
              {
                id : '6cce81b5-964c-52b5-a311-35ad0d8446a9',
                type : { id : 'a72b576a-3143-586c-bfa5-9f070fdbae6c' }
              }
            ]).end( (err, res) => {

                  const { data } = res

                  res.should.have.status(200)
                  data.should.be.a('object')
                  data.should.have('newConfigurations')

                  const { data : { newConfigurations } } = res

                  data.to.have.own.property('newConfigurations')
                  newConfigurations.model.should.be.eql('d0a3d237-789c-5f58-ad22-5dff4688b233')
                  newConfigurations.wltps.should.be.a('array')
                  newConfigurations.images.should.be.a('object')

                  done()
            })
      })
  })
})