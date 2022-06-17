import React from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import Icon from "/src/assets/Icon.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createPost, renderPosts } from "../../services/posts";
import { addNewPost } from "../../store/post";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface PostCreatorProps {
    atualizarPosts: any
}

const PostCreator: React.FC<PostCreatorProps> = ({atualizarPosts}) => {
    const id = useSelector((state: RootState) => state.usersSlice.id) as number;
    const nome = useSelector((state: RootState) => state.usersSlice.nome) as string;
    const email = useSelector((state: RootState) => state.usersSlice.email) as string;
    const ap = useSelector((state: RootState) => state.usersSlice.ap) as string | number;
    const imagem = useSelector((state: RootState) => state.usersSlice.imagem) as string;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: '',
            user_nome: '',
            user_email: '',
            user_ap: '',
            comentario: '',
            user_imagem: '',
            user_id: ''
        },
        onSubmit: async values => {
            const data = await createPost({ ...values, user_id: id, user_ap: ap, user_email: email, user_imagem: imagem, user_nome: nome });
            const posts = await renderPosts()
            atualizarPosts(posts)
            dispatch(addNewPost({ post: data }));
            formik.resetForm();
        }
    })

    return (
        <div className="containerPostCreator">
            <div className="postCreator">
                <a href="{`/profile/?${parseInt(window.location.search.split('?')[1])}`}"><img src={Icon} alt="user" /></a>
                <form onSubmit={formik.handleSubmit}>
                    <textarea className="post-area" id="comentario" placeholder="Deixe aqui seu comentário" value={formik.values.comentario} onChange={formik.handleChange}></textarea>
                    <div className="between">
                        <a className="perfil" href={`/profile/?${parseInt(window.location.search.split('?')[1])}`}>visualizar perfil</a>
                    <button className="button" type="submit">publicar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostCreator;

function atualizarPosts(posts: import("../types").Post[]) {
    throw new Error("Function not implemented.");
}
