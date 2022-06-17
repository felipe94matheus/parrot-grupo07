import { 
    BrowserRouter as Router, 
    Routes,
    Route,
    } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import PublicFeed from '../pages/PublicFeed';
import PublicUser from '../pages/PublicUser';
import Users from '../store/users';
import RequireAuth from './RequiredAuth';

const MyRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/feed" element={
                <RequireAuth>
                    <PublicFeed />
                </RequireAuth>} />
                <Route path='/users' element={<PublicUser />} />
            </Routes>
        </Router>
    );
};

export default MyRoutes;