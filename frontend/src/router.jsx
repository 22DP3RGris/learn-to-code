import {createBrowserRouter, Navigate} from 'react-router-dom';
import Signup from './Components/LoginSignup/Signup.jsx';
import Login from './Components/LoginSignup/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import DefaultLayout from './Layouts/DefaultLayout.jsx';
import GuestLayout from './Layouts/GuestLayout.jsx';
import Profile from './Components/Profile/Profile.jsx';
import News from './Components/News/News.jsx';
import ProgrammingLanguages from './Components/Education/ProgrammingLanguages/ProgrammingLanguages.jsx';
import Topics from './Components/Education/Topics/Topics.jsx';
import Theory from './Components/Education/Theory/Theory.jsx';
import CodeEditor from './Components/Education/CodeEditor/CodeEditor.jsx';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import TopicQuestions from "./Components/Education/Topics/TopicQuestions.jsx";

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
                path: '/language/:name/topics',
                element: <Topics/>
            },
            {
                path: '/topics/:topicId/theory',
                element: <Theory/>
            }, 
            {
                path: '/code-editor',
                element: <CodeEditor/>
            },
            {
                path: '/admin-dashboard',
                element: <AdminDashboard/>
            },
            {
                path: "/topics/:topicId/questions/:questionPage", 
                element: <TopicQuestions/>
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