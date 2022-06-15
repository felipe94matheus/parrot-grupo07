const supertest = require("supertest")
const app = require("../app")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//Teste de integração
describe('No authController, ao executar a função login', () =>{

    test('em caso de sucesso, deve retornar o status 200', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"adele@gmail.com",
                password:"senhasecreta"
            })
        expect(response.status).toBe(200)
    })

    test('em caso de sucesso, deve retornar o token criado', async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email:"adele@gmail.com",
                password:"senhasecreta"
            })
        expect(jwt.verify(response.body,process.env.SECRET,["HS256"])).toMatchObject({"adm": false, "email": "adele@gmail.com", "id_user": 8})
    })


})


//Testes unitários