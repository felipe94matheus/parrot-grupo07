import React from 'react';
import * as S from "./styled";

const FeedContainer = ({ children }: { children: React.ReactNode }) => (
    <S.FeedContainer>
        {children}
    </S.FeedContainer>
)

export default FeedContainer;