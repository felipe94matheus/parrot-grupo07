const AuthService = require("../domain/users/services/authService")
const PostService = require("../domain/posts/services/postService")
const { faker } = require("@faker-js/faker");
require("dotenv").config()

//Testes unitários
describe ('testes unitários postServices', () => {

    describe('método register', () => {
        const bodyRequest = {
            "id_post":"95",
            "content":"Post de teste",
        }

        test('deve retornar o post criado', async ()=>{
            expect(await PostService.register(bodyRequest,1)).toMatchObject({"id_post": 95, "content" : "Post de teste", "user_id": 1 })
        })

    })

    describe('método getUserPosts', () => {
    
        test('deve retornar post do usuário 50', async ()=>{
            expect(await PostService.getUserPosts(50)).toMatchObject({"id_post" : 50, "user_id": 50})
        })

    })

    describe('método getAll', () => {
    
        test('deve retornar todos os posts', async () => {
            expect(await PostService.getAll()).toBe(!null)
        })

    })


})