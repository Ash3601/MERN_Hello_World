/*
METHOD 1

jest.useFakeTimers()
const request = require('supertest');
const app = require('../app')

describe('Testing get API', () => {
it('should return 200 Status', () => {
    request(app)
      .get('/')
      .expect(200);
  })
}
)
*/

let chai = require('chai');
let chaiHttp  = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);
const serverUrl = 'http://localhost:8000';
const testUserName = 'John Doe';
const testEmail = 'doe@test.com';
const testPhoneNumber = '123456789';
const testPassword = 'password';
const testWork = 'Web Developer';

describe('Testing API Endpoints on http://localhost:8000', () => {

    it('GET / : should return status 200', (done)=>{
        chai
            .request('http://localhost:8000')
            .get('/')
            .then( (res) =>{
                expect(res).to.have.status(200)
                done() //go to next
            })
            .catch((err)=>{ throw(err) })
    })

    it ('POST /register: Adds a new user to the Mongo DB', (done) => {
        chai
        .request(serverUrl)
        .post('/register')
        .send({ 
            name: testUserName,
            email: testEmail,
            work: testWork,
            phone: testPhoneNumber,
            password: testPassword,
            cpassword: testPassword
        })
        .then( (res)=>{
            // console.log('Value in test status code', res.status)
            expect(res).to.have.status(200)
            done()
        })
        .catch((err)=>{ throw(err) })
    })

    it ('POST /register with empty body : should return 400 bad request', (done) => {
        chai
        .request(serverUrl)
        .post('/register')
        .send({ })
        .then((res) => {
            expect(res).to.have.status(400) && expect(res.text).to.equal('Empty Body is not expected')
            done()
        })
        .catch(err => {throw(err)})
    })
    
    it('POST /register: Checks if all the required properties are present', (done) => {
        chai.request(serverUrl)
        .post('/register')
        .send({
            email:    testEmail,
            work:     testWork,
            phone:    testPhoneNumber,
            password: testPassword,
            cpassword:testPassword
        })
        .then((res) => {
            expect(res).to.have.status(422);
            done();
        })
        .catch((err) => { throw(err) })

    })
    it ('POST /register: Checks for the name, email & work validations', (done) => {
        chai
        .request(serverUrl)
        .post('/register')
        .send({
            name:       testUserName + "123", // must not contain any numbers and should be greater than 0
            email:      123, // must be in proper format and should be greater than 0
            work:       testWork + testWork + testWork + testWork + testWork, // should not exceed more than 150 chars
            phone:      testPhoneNumber, // should not exceed more than 10 chars
            password:   testPassword, 
            cpassword:  testPassword
        })
        .then((res) => {
            // console.log('Res text', res)
            expect(res).to.have.status(400);
            done()
        }) 
        .catch(err => {throw(err)})
    })

    // check if user already exist


})

