import * as S from './styled';

const Container = ({ children }: { children: React.ReactNode }) => { 
    return (
        <S.Container>
            <S.CardCentral>
            {children}
            </S.CardCentral>
        </S.Container>
    )
}

export default Container;