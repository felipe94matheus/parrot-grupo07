import logoColorido from '../../assets/logoColorido.png';
import * as S from './styled';
import { useFormik } from 'formik';
import { Button, Card, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { createUser, baseUrl } from '../../services/auth';
import { signIn } from '../../store/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    nome: Yup.string()
        .required('O nome é obrigatório'),
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .required("senha é obrigatório")
        .min(5, "A senha deve ter pelo menos 6 caracteres")
        .max(15, "A senha deve ter no máximo 12 caracteres"),
    confirmarSenha: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'As senhas não conferem')
        .required("Confirmação de senha é obrigatório"),
    ap: Yup.string()
        .required("AP é obrigatório"),
    // imagem: Yup.string()
});
const FormRegister: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            ap: 0,
            // imagem: '',
        },

        validationSchema,

        onSubmit: async values => {
            const { accessToken, user } = await createUser({ ...values, permission: 1 });
            dispatch(signIn({ accessToken, permission: user.permission}));
            //@ts-ignore
            baseUrl.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
            navigate('/login');

        }
    });
    return (
        <>
            <S.Logo src={logoColorido} alt="Logo Parrot" />
            <h2>CADASTRO</h2>
            <Card.Body>
                <S.FormCadastro onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        {formik.errors.nome && <small>{formik.errors.nome}</small>}
                        <S.FormInput
                            id="nome"
                            placeholder="Nome"
                            type="text"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.nome && !!formik.errors.nome}
                            isValid={formik.touched.nome && !formik.errors.nome}
                        />
                    </Form.Group>
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
                    <Form.Group>
                        {formik.errors.confirmarSenha && <small>{formik.errors.confirmarSenha}</small>}
                        <S.FormInput
                            id="confirmarSenha"
                            placeholder="Confirmar Senha"
                            type="password"
                            value={formik.values.confirmarSenha}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.confirmarSenha && formik.touched.confirmarSenha}
                            isValid={formik.touched.confirmarSenha && !formik.errors.confirmarSenha}
                        />
                    </Form.Group>
                    <Form.Group>
                        {formik.errors.ap && <small>{formik.errors.ap}</small>}
                        <S.FormInput
                            id="ap"
                            placeholder="Apartamento"
                            type="number"
                            value={formik.values.ap}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.ap && formik.touched.ap}
                            isValid={formik.touched.ap && !formik.errors.ap}
                        />
                    </Form.Group>
                    {/* <Form.Group>
                        <S.FormInput
                            id="imagem"
                            placeholder="Foto do Perfil"
                            type="string"
                            value={formik.values.imagem}
                            onChange={formik.handleChange}
                        />
                    </Form.Group> */}
                    <S.FormButton
                        type="submit"
                        variant="primary"
                        disabled={!formik.isValid}
                    >
                        Cadastrar
                    </S.FormButton>
                </S.FormCadastro>
            </Card.Body>
        </>
    );
}

export default FormRegister;
