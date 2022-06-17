import axios from "axios";
import { User, SignIn } from "../components/types";

export const baseUrl = axios.create({
    baseURL: "http://localhost:3333"
})

export const createUser = async (user: Omit<User, "id">) => {
    try {
        const response = await baseUrl.post("/users", user)
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response.data}`)
    }
}

export const signInUser = async (signIn: SignIn) => {
    try {
        const response = await baseUrl.post("/signin", signIn);
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response.data}`)
    }
}