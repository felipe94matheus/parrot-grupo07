import React from 'react';
import { BodyContainer } from '../../components/Container/styled';
import FeedContainer from '../../components/FeedContainer';
import Navbar from '../../components/Navbar';
import ProfileData from '../../components/ProfileData';
import PostFeed from '../../components/PostFeed';
import ProfileFeed from '../../components/ProfileFeed';



function ProfileUser(): JSX.Element {
    return (
        <div>
            <Navbar />
            <BodyContainer>
                <FeedContainer>
                    <ProfileData />
                    {/* aqui vao os posts do usuario logado - postfeed*/}
                    <ProfileFeed />
                </FeedContainer>
            </BodyContainer>
        </div>
    );
}

export default ProfileUser;