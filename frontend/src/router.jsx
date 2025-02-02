import {createBrowserRouter} from 'react-router-dom';
import Signup from './Components/LoginSignup/Signup.jsx';
import Login from './Components/LoginSignup/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;