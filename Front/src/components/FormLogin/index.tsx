import logoColorido from '../../assets/logoColorido.png';
import * as S from './styled';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { postsignIn, baseUrl } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/users';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .required("senha é obrigatório")
        .min(5, "A senha deve ter pelo menos 6 caracteres")
        .max(15, "A senha deve ter no máximo 12 caracteres"),
});
const FormLogin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },

        validationSchema,

        onSubmit: async values => {
            const { accessToken, user } = await postsignIn(values);
            dispatch(signIn({accessToken, permission: user.permission}));
            //@ts-ignore
            baseUrl.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
            navigate('/feed');
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
