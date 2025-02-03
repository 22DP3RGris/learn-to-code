import {createBrowserRouter, Navigate} from 'react-router-dom';
import Signup from './Components/LoginSignup/Signup.jsx';
import Login from './Components/LoginSignup/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Profile from './Components/Profile/Profile.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '/',
                element: <Navigate to="/profile"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;