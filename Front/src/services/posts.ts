import axios from "axios";
import { Post } from "../components/types";

const baseUrl = axios.create({
    baseURL: "http://localhost:3333"
});

export const renderPosts = (): Promise<Post[]> => {
    return baseUrl.get<Post[]>("/posts").then(response => response.data);
}

export const renderPostsById = (id: number): Promise<Post[]> => {
    return baseUrl.get<Post[]>(`/posts/${id}`).then(response => response.data)
}

export const createPost = async (post: Omit<Post, "id">) => {
    try {
        const response = await baseUrl.post("/posts", post)
        return response.data;
    } catch (error: any) {
        alert(`Error: ${error.response.data}`)
    }
}




// export const renderPostsById = async (id: number, post: Omit<Post, "id">) => {
//     try{
//         const response = await api.get<Post[]>(`/posts/${id}`, post)
//         return response.data;
//     } catch(error: any) {
//         alert(`Error: ${error.response.data}`)
//     }
// }