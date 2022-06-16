import axios from "axios";
import { User } from "../components/types";
import { Permission } from "../store/users"

interface SignIn {
    email: string;
    senha: string;
}

export const baseUrl = axios.create({
    baseURL: "http://localhost:3333",
});

export const createUser = async (user: Omit<User, "id">):Promise<User> => {
    try {
        return await baseUrl.post("/register", user)
    } catch (error) {
        return error as unknown as User;
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