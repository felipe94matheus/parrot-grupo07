import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Logo from "../../assets/logoHorizontalColorido.png";
import * as S from "./styled";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/users";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(signOut())
        alert("Deslogado")
        navigate("/login")
    }
    return (
        <S.NavbarComponent>
            <Container>
                <Navbar.Brand href="/" >
                    <img src={Logo} width="235" alt="Parrot Logo" />
                </Navbar.Brand>
                < Navbar.Collapse className="justify-content-end" >
                    <div>
                        <S.SpanNavbar className="pe-3" > Olá, usuário </S.SpanNavbar>
                        < S.LinkNavbar onClick={handleLogout} className="ps-3" > <a href="" > Sair </a> </S.LinkNavbar >
                    </div>
                </Navbar.Collapse>
            </Container>
        </S.NavbarComponent>
    )
}

export default Header;