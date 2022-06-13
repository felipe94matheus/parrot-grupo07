export interface User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    ap: string;
    imagem?: string;
}

export interface Post {
    id: number;
    userId: number;
    conteudo: string;
}