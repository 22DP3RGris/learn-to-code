import {createBrowserRouter, Navigate} from 'react-router-dom';
import Signup from './Components/LoginSignup/Signup.jsx';
import Login from './Components/LoginSignup/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import DefaultLayout from './Layouts/DefaultLayout.jsx';
import GuestLayout from './Layouts/GuestLayout.jsx';
import Profile from './Components/Profile/Profile.jsx';
import News from './Components/News/News.jsx';
import ProgrammingLanguages from './Components/Education/ProgrammingLanguages/ProgrammingLanguages.jsx';
import CodeEditor from './Components/Education/CodeEditor/CodeEditor.jsx';

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
                path: '/programming-languages',
                element: <ProgrammingLanguages/>
            },
            {
                path: '/code-editor',
                element: <CodeEditor/>
            },
            {
                path: '/',
                element: <News/>
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
            {
                path: '/',
                element: <News/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;