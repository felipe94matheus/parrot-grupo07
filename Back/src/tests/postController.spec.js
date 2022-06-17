const supertest = require("supertest")
const app = require("../app")
require("dotenv").config()
const { faker } = require("@faker-js/faker")
const AuthService = require("../domain/users/services/authService")


describe('No postController, ao executar a função', () => {
    describe('createPost', () => {
        test('em caso de sucesso, deve retornar o status 201', async () => {
            const content = faker.random.alpha(100);
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .post("/post")
            .auth(token, { type: 'bearer' })
            .send({
                content: content
            })
            expect(response.status).toBe(201)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const content = faker.random.alpha(100);
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .post("/post")
            .auth(token, { type: 'bearer' })
            .send({
                content: content
            })
            
            expect(response.body).toEqual(
                expect.objectContaining({
                    id_post: expect.any(Number),
                    content: expect.any(String),
                    email: expect.any(String),
                    user_id: expect.any(Number),
                })
            )
        })

        
    })

    describe('getPostByUserID', () => {
        test('em caso de sucesso, deve retornar o status 201', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/post/1")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(201)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/post/1")
            .auth(token, { type: 'bearer' })

            expect(response.body).toEqual(
                expect.objectContaining({
                    id_post: expect.any(Number),
                    content: expect.any(String),
                    email: expect.any(String),
                    user_id: expect.any(Number),
                }),
            )
        })

        test('em caso não existam posts para exibir, deve retornar status 201', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/post/91")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(201)

        })

        test('em caso de id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/post/10000")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(404)

        })


        

    })

    

    describe('getAll', () => {
        test('caso não exista token no request', async () => {
            const token = null
            const response = await supertest(app)
            .get("/feed")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(401)
        })

        test('em caso de sucesso, retornar response do request', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .get("/feed")
            .auth(token, { type: 'bearer' })
            
            expect(response.body).toEqual(
                expect.objectContaining({
                    id_post: expect.any(Number),
                    content: expect.any(String),
                    user_id: expect.any(String),
                })
            )
        })

        
    })

    describe('delete', () => {
        test('em caso de sucesso, deve retornar o status 204', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .delete("/post/90")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(204)
        })

        test('caso o usuário não esteja autorizado para deletar, deve retornar o status 401', async () => {
            const token = await AuthService.generateToken(1, "Elaina.Purdy33@hotmail.com", false)
            const response = await supertest(app)
            .delete("/post/90")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(204)
        })

        test('em caso de post id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/post/10000")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(404)
        })
    })

    describe('update', () => {
        test('em caso de sucesso, deve retornar o status 200', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/post/90")
            .auth(token, { type: 'bearer' })
            .send({
                content : "Post sendo alterado"
            })

            expect(response.status).toBe(204)
        }),

        test('em caso de post id não encontrado, retornar status 404', async () => {
            const token = await AuthService.generateToken(1, "email@email.com", true)
            const response = await supertest(app)
            .put("/post/10000")
            .auth(token, { type: 'bearer' })

            expect(response.status).toBe(404)
        })

    
    })

    
})