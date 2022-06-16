const supertest = require("supertest")
const app = require("../app")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { faker } = require("@faker-js/faker");

//Teste de integração
describe('No authController, ao executar a função login', () =>{

    test('em caso de sucesso, deve retornar o status 200', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"email@email.com",
                password:"senhasecreta"
            })
        expect(response.status).toBe(200)
    })

    test('em caso de sucesso, deve retornar o token criado', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"email@email.com",
                password:"senhasecreta"
            })
        expect(jwt.verify(response.body,process.env.SECRET,["HS256"])).toMatchObject({"email": "email@email.com"})
    })

    test('em caso de e-mail não corresponder ao usuário, deve retornar o status 401', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:faker.internet.email(),
                password:"senhasecreta"
            })
        expect(response.status).toBe(401)
    })

    test('em caso da senha estar errada, deve retornar o status 401', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"email@email.com",
                password:"senhaerrada"
            })
        expect(response.status).toBe(401)
    })

    test('em caso do usuário estar desligado, deve retornar o status 401', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"email2@email.com",
                password:"senhasecreta"
            })
        expect(response.status).toBe(401)
    })


})


