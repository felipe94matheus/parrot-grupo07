import React from "react";
import { Button, Form } from "react-bootstrap";
import "./style.css";
import Logo from "../../assets/logoColorido.png";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { baseUrl, signInUser } from "../../services/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../store/users";

const validationSchema = Yup.object({
    email: Yup.string().email('Por favor preencha com um email válido').required('Por favor preencha com seu email'),
    password: Yup.string().required('Por favor preencha com uma password').min(5, 'Sua senha deve ter no mínimo 5 caracteres').max(12, 'Sua senha deve ter no máximo 12 caracteres')
})


const FormLogin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async values => {
            const { accessToken, user } = await signInUser(values);
            dispatch(signIn({ accessToken, permission: user.permission, user }));
            //@ts-ignore
            baseUrl.defaults.headers["Authorization"] = `Bearer ${accessToken}`
            navigate(`/feed/?${user.id}`)
        }
    })

    return (
        <div className="background">
            <div className="containerForm">
                <div className="divImage">
                    <img className="ocult-img" src={Logo} alt="" />
                </div>
                <h3>LOGIN</h3>
                <Form className="form" onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-1">
                        <Form.Control id="email" type="email" placeholder="email" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && !!formik.errors.email} isValid={formik.touched.email && !formik.errors.email} />
                    </Form.Group>
                    <Form.Group className="mb-1" >
                        <Form.Control id="password" type="password" placeholder="senha" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && !!formik.errors.password} isValid={formik.touched.password && !formik.errors.password} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
                        entrar
                    </Button>
                </Form>
                <div className="divLinkCadastro">
                    <a href="/register">cadastre-se</a>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;