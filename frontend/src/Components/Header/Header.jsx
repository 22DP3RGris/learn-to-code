import './Header.css';
import React, { useEffect } from "react";
import Logo from '../../assets/LTC-LOGO.png';
import { useNavigate } from 'react-router-dom';

function Header({ page }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(page || "LEARN TO CODE");

    useEffect(() => {
        setCurrentPage(page || "LEARN TO CODE");
    }, [page]);


    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Logo" onClick={() => navigate('/')}/>
                <h1>{currentPage}</h1>
            </div>
            <nav className="navbar">
    
            </nav>
        </header>
    );
}

export default Header;
