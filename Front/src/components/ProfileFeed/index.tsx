import React from 'react';
import { Container } from 'react-bootstrap';
import { Post } from '../../components/types';
import Icon from "../../assets/Icon.png";
import "./style.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { renderPostsById } from '../../services/posts';
import { useEffect, useState } from "react";


const ProfileFeed: React.FC = () => {
    let id = parseInt(window.location.search.split('?')[1])

    const [postListById, setPostListByID] = useState<Post[]>([] as Post[]);

    useEffect(() => {
        renderPostsById(id).then(posts => setPostListByID(posts))
    }, [])

    console.log(postListById)

    // const [postListById, setPostListByID] = useState<Post[]>([] as Post[]);
    // const { userposts } = usePost() 
    // useEffect(() => {
    //   let id = parseInt(window.location.search.split('?')[1])
    //  userposts(id);
    // }, [])

    return (
        <Container className='p-0'>
            {postListById.map(post => (
                <div className="containerPostFeed">
                    <div className="postFeed">
                        <img src={Icon} alt="" />
                        <div>
                            <h5 className='nomeApartamento'>{post.user_nome} - apê {post.user_ap}</h5>
                            <h5 className='dataHora'>13/06/2022 03:05</h5>
                            <p className='comentario'>{post.comentario}</p>
                        </div>
                    </div>
                </div>
            )).reverse()}
        </Container>
    );
}

export default ProfileFeed;