import axios from "axios";

interface SignIn {
    email: string;
    senha: string;
}

interface User extends SignIn {
    id: number;
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    ap: number;
    // imagem: string;
}


const baseUrl = axios.create({
    baseURL: "http://localhost:3333",
});

export const createUser = async (user: Omit<User, "id">) => {
    try {
        const response = await baseUrl.post<User>("/register", user)
        return response.data
    } catch (error: any) {
        alert("Error: " + error.response.data)
    }
}

export const postsignIn = async (signIn: SignIn) => {
    try {
        const response = await baseUrl.post("/signin", signIn)
        return response.data
    } catch (error: any) {
        alert("Error: " + error.response.data)
    }
}