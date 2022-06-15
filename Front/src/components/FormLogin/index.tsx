import logoColorido from '../../assets/logoColorido.png';
import * as S from './styled';
import { useFormik } from 'formik';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { postsignIn } from '../../services/auth';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .required("senha é obrigatório")
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .max(12, "A senha deve ter no máximo 12 caracteres"),
});
const FormLogin: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },

        validationSchema,

        onSubmit: async values => {
            const postLogin = await postsignIn(values);
            alert(JSON.stringify(postLogin, null, 2));
        }
    });
    return (
        <>
            <S.Logo src={logoColorido} alt="Logo Parrot" />
            <h2>LOGIN</h2>
            <Card.Body>
                <S.FormLogin onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        {formik.errors.email && <small>{formik.errors.email}</small>}
                        <S.FormInput
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                            isValid={formik.touched.email && !formik.errors.email}
                        />
                    </Form.Group>
                    <Form.Group>
                        {formik.errors.senha && <small>{formik.errors.senha}</small>}
                        <S.FormInput
                            id="senha"
                            placeholder="Senha"
                            type="password"
                            value={formik.values.senha}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.senha && formik.touched.senha}
                            isValid={formik.touched.senha && !formik.errors.senha}
                        />
                    </Form.Group>
                    <S.FormButton
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        Entrar
                    </S.FormButton>
                    <div>
                        <S.linkForm href="/">cadastre-se</S.linkForm>
                    </div>
                </S.FormLogin>
            </Card.Body>
        </>
    );
}

export default FormLogin;
