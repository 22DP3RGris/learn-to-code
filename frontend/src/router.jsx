import {createBrowserRouter} from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginSignup action="Login"/>
    },
    {
        path: '/signup',
        element: <LoginSignup action="Sign Up"/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;