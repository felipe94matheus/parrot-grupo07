import { 
    BrowserRouter as Router, 
    Routes,
    Route,
    } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Users from '../store/users';
import RequireAuth from './RequiredAuth';

const MyRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/feed" element={
                    <RequireAuth>
                    <Feed />
                    </RequireAuth>
                } />  */}
            
            </Routes>
        </Router>
    );
};

export default MyRoutes;