const supertest = require("supertest")
const app = require("../app")
require("dotenv").config()
const { faker } = require("@faker-js/faker")
const AuthService = require("../domain/users/services/authService")


describe('No userController, ao executar a função', () => {
    describe('register', () => {
        test('em caso de sucesso, deve retornar o status 201', async () => {
            const emailTeste = faker.internet.email()
            const response = await supertest(app)
            .post("/user")
            .send({
                name: "Laura",
                email: emailTeste,
                appartment: 1001,
                password: "123456",
                status: true,
                adm: false,
            })
            expect(response.status).toBe(201)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const emailTeste = faker.internet.email()
            const response = await supertest(app)
            .post("/user")
            .send({
                name: "Laura",
                email: emailTeste,
                appartment: 201,
                password: "123456",
                status: true,
                adm: true
            })
            
            expect(response.body).toEqual(
                expect.objectContaining({
                    id_user: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    appartment: expect.any(Number),
                    password: expect.any(String),
                    status: expect.any(Boolean),
                    adm: expect.any(Boolean),
                    id_user: expect.any(Number),
                })
            )
        })

        test('em caso de email já cadastrado, retornar status 400', async () => {
            const response = await supertest(app)
            .post("/user")
            .send({
                name: "Laura",
                email: "email@email.com",
                appartment: 301,
                password: "senhasecreta",
                status: true,
                adm: false,
            })
            expect(response.status).toBe(400)
        })

        test('em caso de request sem propriedade status definida, retornar objeto com valor de status true', async () => {
            const emailTeste = faker.internet.email()
            const response = await supertest(app)
            .post("/user")
            .send({
                name: "Laura",
                email: emailTeste,
                appartment: 301,
                password: "senhasecreta",
                adm: false,
            })
            expect(response.body).toEqual(
                expect.objectContaining({
                    id_user: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    appartment: expect.any(Number),
                    password: expect.any(String),
                    status: true,
                    adm: expect.any(Boolean),
                    id_user: expect.any(Number),
                })
            )
        })

        test('em caso de request sem propriedade adm definida, retornar objeto com valor de adm false', async () => {
            const emailTeste = faker.internet.email()
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .post("/user")
            .send({
                name: "Laura",
                email: emailTeste,
                appartment: 301,
                password: "senhasecreta",
                status: true,
            })
            expect(response.body).toEqual(
                expect.objectContaining({
                    id_user: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    appartment: expect.any(Number),
                    password: expect.any(String),
                    status: expect.any(Boolean),
                    adm: false,
                    id_user: expect.any(Number),
                })
            )
        })

    })

    describe('findUser', () => {
        test('em caso de sucesso, deve retornar o status 200', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/user/1")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(200)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/user/1")
            .auth(token, { type: 'bearer' })

            expect(response.body).toEqual(
                expect.objectContaining({
                    id_user: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    appartment: expect.any(Number),
                    password: expect.any(String),
                    status: expect.any(Boolean),
                    adm: expect.any(Boolean),
                    id_user: expect.any(Number),
                })
            )
        })

        test('em caso de id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/user/10000")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(404)

        })
    })

    describe('update', () => {
        test('em caso de sucesso, deve retornar o status 200', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/user/3")
            .auth(token, { type: 'bearer' })
            .send({
                name: "Laura",
                appartment: 301,
                status: true,
            })

            expect(response.status).toBe(200)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/user/2")
            .auth(token, { type: 'bearer' })
            .send({
                name: "Laura",
                appartment: 301,
                status: true
            })

            expect(response.body).toEqual(
                expect.objectContaining({
                    id_user: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    appartment: expect.any(Number),
                    password: expect.any(String),
                    status: expect.any(Boolean),
                    adm: expect.any(Boolean),
                    id_user: expect.any(Number),
                })
            )
        })

        test('em caso de id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/user/16585432")
            .auth(token, { type: 'bearer' })
            .send({
                name: "Laura",
                appartment: 301,
                status: true,
            })

            expect(response.status).toBe(404)
        })
    })

    describe('delete', () => {
        test('em caso de sucesso, deve retornar o status 204', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/delete/4")
            .auth(token, { type: 'bearer' })
            .send({
                status: false
            })

            expect(response.status).toBe(204)
        })

        test('em caso de id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/delete/16585432")
            .auth(token, { type: 'bearer' })
            .send({
                status: false
            })

            expect(response.status).toBe(404)
        })
    })
})