import './Header.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRightToBracket, faTachographDigital } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/LTC-LOGO.png';
import { useStateContext } from '../../contexts/ContextProvider';

function Header({ page }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(page || "LEARN TO CODE");
    const { user, token } = useStateContext();

    useEffect(() => {
        setCurrentPage(page || "LEARN TO CODE");
    }, [page]);

    const handleNavigation = (path) => navigate(path);

    const isAuthPage = page === 'LOGGING IN' || page === 'REGISTRATION';

    return (
        <header className="header">
            <div className="logo" onClick={() => handleNavigation('/')}>
                <img src={Logo} alt="Logo" />
                <h1>{currentPage}</h1>
            </div>

            <nav className="navbar">
                <ul>
                    {!isAuthPage && (
                        token ? (
                            <>
                                {user?.role === 'admin' && (
                                    <li onClick={() => handleNavigation('/admin-dashboard')}>
                                        <FontAwesomeIcon icon={faTachographDigital} className="nav-icon" />
                                    </li>
                                )}
                                <li onClick={() => handleNavigation('/profile')}>
                                    <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                </li>
                            </>
                        ) : (
                            <li onClick={() => handleNavigation('/login')}>
                                <FontAwesomeIcon icon={faRightToBracket} className="nav-icon" />
                            </li>
                        )
                    )}
                </ul>
                <div className="ham-menu">
                    <FontAwesomeIcon icon={faBars} className="ham-icon" />
                </div>
            </nav>
        </header>
    );
}

export default Header;
