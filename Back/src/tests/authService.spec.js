const AuthService = require("../domain/users/services/authService")
const { faker } = require("@faker-js/faker");
const bcrypt=require("bcryptjs");
const { createFalse } = require("typescript");
require("dotenv").config()
const jwt = require("jsonwebtoken")

//Testes unitários
describe ('testes unitários authService', () => {

    const id=faker.datatype.number()
    const email=faker.internet.email()
    const adm=faker.datatype.boolean()

    describe('método generateToken', () => {        

        test('deve retornar um token (string)', () => {
            expect(typeof AuthService.generateToken(id,email,adm)).toBe("string")
        })

        test('deve retornar um token válido', () => {
            expect(jwt.verify(AuthService.generateToken(id,email,adm),process.env.SECRET,["HS256"])).toMatchObject({"adm": adm, "email": email, "id_user": id})
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
            expect(AuthService.uncripPass(passLoginFalse,passDataBase)).toBe(false)
        })
    })

    describe('método login', () => {
        const loginData = {
            "email":"email3@email.com",
            "senha":"senhasecreta"
        }

        const loginFakeData = {
            "email":"emailfalse@email.com",
            "senha":"senhasecreta"
        }

        test('deve retornar o usuário encontrado', async ()=>{
            expect(await AuthService.login(loginData)).toMatchObject({adm: true, appartment: 103,email: "email3@email.com",name: "teste3", status: false})
        })

        test('deve retornar null', async ()=>{
            expect(await AuthService.login(loginFakeData)).toBe(null)
        })

    })


})