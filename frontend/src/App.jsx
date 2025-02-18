import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App(){
    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
            <Footer/>
        </React.StrictMode>
    );
}

export default App;