const AuthService = require("../domain/users/services/authService")
const { faker } = require("@faker-js/faker");
const bcrypt=require("bcryptjs")
require("dotenv").config()

//Testes unitários
describe ('testes unitários authService', () => {

    describe('método generateToken', () => {
        
        const id=faker.datatype.number()
        const email=faker.internet.email()
        const adm=faker.datatype.boolean()

        test('deve retornar um token (string)', () => {
            expect(typeof AuthService.generateToken(id,email,adm)).toBe("string")
        })

        test('deve retornar um token válido', () => {
            expect(jwt.verify(AuthService.generateToken(id,email,adm)),process.env.SECRET,["HS256"]).toBe("string")
        })


    })

    describe('método uncripPass', () => {
        const passLogin="senha"
        const passLoginFalse="senhaerrada"
        const passDataBase=bcrypt.hashSync(passLogin,10)

        test('deve retornar true, por que as senhas são equivalentes', ()=>{
            expect(AuthService.uncripPass(passLogin,passDataBase)).toBe(true)
        })

        test('deve retornar false, por que as senhas não são equivalentes', ()=>{
            expect(AuthService.uncripPass(passLoginFalse,passDataBase)).toMatchObject({"adm": false, "email": "adele@gmail.com", "id_user": 8})
        })
    })


})