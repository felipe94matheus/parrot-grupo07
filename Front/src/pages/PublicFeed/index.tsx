import React, { useEffect, useState} from 'react';
import { BodyContainer } from '../../components/Container/styled';
import FeedContainer from '../../components/FeedContainer';
import Navbar from '../../components/Navbar';
import PostCreator from '../../components/PostCreator';
import PostFeed from '../../components/PostFeed';
import ProfileFeed from '../../components/ProfileFeed';
import { Post } from '../../components/types';
import { renderPosts } from '../../services/posts';



function PublicFeed(): JSX.Element {

    const [postList, setPostList] = useState<Post[]>([] as Post[]);

    useEffect(() => {

        const getPosts = async () => {
            const posts = await renderPosts()
            setPostList(posts)
        }
        getPosts();
    }, [])

    return (
        <div>
            <Navbar />
            <BodyContainer>
                <FeedContainer>
                    <PostCreator atualizarPosts={setPostList}/>
                    <PostFeed posts={postList} />
                </FeedContainer>
            </BodyContainer>
        </div>
    );
}

export default PublicFeed;