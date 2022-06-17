import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "./style.css";
import Logo from "../../assets/logoColorido.png";
import { User } from "../../components/types";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, baseUrl } from "../../services/users";
import { signIn } from "../../store/users";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const validationSchema = Yup.object({
    nome: Yup.string().required('Por favor preencha com seu nome'),
    email: Yup.string().email('Por favor preencha com um email válido').required('Por favor preencha com seu email'),
    password: Yup.string().required('Por favor preencha com uma password').min(8, 'Sua password deve ter no mínimo 8 caracteres').max(12, 'Sua password deve ter no máximo 12 caracteres'),
    confirmarSenha: Yup.string().oneOf([Yup.ref('password'), null], 'As passwords não são iguais').required('Por favor preencha com uma password'),
    ap: Yup.string().required('Por favor preencha com o número do seu apartamento'),
    imagem: Yup.string().required('Por favor preencha com um link para sua foto')
})

const FormRegister: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            nome: '',
            email: '',
            password: '',
            confirmarSenha: '',
            ap: '',
            imagem: ''
        },
        validationSchema,
        onSubmit: async values => {
            const { accessToken, user } = await createUser({ ...values, permission: 1 });
            dispatch(signIn({ accessToken, permission: user.permission, user }))
            //@ts-ignore
            api.defaults.headers["Authorization"] = `Bearer ${accessToken}`

            navigate(`/feed/?${user.id}`)
        }
    })

    return (
        <div className="background">
            <div className="containerForm">
                <div className="divImage">
                    <img src={Logo} alt="" />
                </div>
                <h3>CADASTRO</h3>
                <Form className="form" onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-1">
                        <Form.Control id="nome" type="text" placeholder="nome" value={formik.values.nome} onChange={formik.handleChange} isInvalid={formik.touched.nome && !!formik.errors.nome} isValid={formik.touched.nome && !formik.errors.nome} />
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Control id="email" type="email" placeholder="email" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && !!formik.errors.email} isValid={formik.touched.email && !formik.errors.email} />
                    </Form.Group>
                    <Form.Group className="mb-1" >
                        <Form.Control id="password" type="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && !!formik.errors.password} isValid={formik.touched.password && !formik.errors.password} />
                    </Form.Group>
                    <Form.Group className="mb-1" >
                        <Form.Control id="confirmarSenha" type="password"
                            placeholder="confirmar senha" value={formik.values.confirmarSenha} onChange={formik.handleChange} isInvalid={formik.touched.confirmarSenha && !!formik.errors.confirmarSenha} isValid={formik.touched.confirmarSenha && !formik.errors.confirmarSenha} />
                    </Form.Group>
                    <Form.Group className="mb-1" >
                        <Form.Control id="ap" type="text" placeholder="unidade/apartamento" value={formik.values.ap} onChange={formik.handleChange} isInvalid={formik.touched.ap && !!formik.errors.ap} isValid={formik.touched.ap && !formik.errors.ap} />
                    </Form.Group>
                    <Form.Group className="mb-1" >
                        <Form.Control id="imagem" type="text" placeholder="link da foto" value={formik.values.imagem} onChange={formik.handleChange} isInvalid={formik.touched.imagem && !!formik.errors.imagem} isValid={formik.touched.imagem && !formik.errors.imagem} />
                    </Form.Group>
                    <Button variant="" type="submit">
                        entrar
                    </Button>
                    {formik.errors.email && formik.touched.email
                        && (
                            <Alert style={{ marginTop: 15 }} variant="danger">
                                {formik.errors.email}
                                {formik.errors.password && formik.touched.password
                                    && (
                                        <Alert style={{ marginTop: 15 }} variant="danger">
                                            {formik.errors.password}
                                        </Alert>
                                    )}
                                {formik.errors.confirmarSenha && formik.touched.confirmarSenha
                                    && (
                                        <Alert style={{ marginTop: 15 }} variant="danger">
                                            {formik.errors.confirmarSenha}
                                        </Alert>
                                    )}
                            </Alert>
                        )}
                    <div>
                        <a className="" href="/">Voltar</a></div>
                </Form>
            </div>
        </div>
    );
};

export default FormRegister;