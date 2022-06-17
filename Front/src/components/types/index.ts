export interface Post {
    id: number,
    user_nome: string,
    user_email: string,
    user_ap: string | number,
    comentario: string,
    user_imagem: string
    user_id: number
}

export interface SignIn {
    email: string,
    password: string
}

export interface User extends SignIn {
    id: number,
    password: string,
    ap: string | number,
    imagem: string
    permission: Permission
}

export enum Permission {
    "Nothing",
    "User",
    "Admin"
}

export interface UserState {
    isLogged: boolean,
    accessToken: string,
    permission: Permission,
    id?: number,
    nome?: string,
    email?: string,
    ap?: string | number
    imagem?: string
}

export interface PostState {
    post: Post[]
}