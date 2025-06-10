import './Header.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRightToBracket, faTachographDigital, faXmark } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/LTC-LOGO.png';
import { useStateContext } from '../../contexts/ContextProvider';

function Header({ page }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(page || "LEARN TO CODE");
    const { user, token } = useStateContext();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setCurrentPage(page || "LEARN TO CODE");
    }, [page]);

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); 
    };

    const isAuthPage = page === 'LOGGING IN' || page === 'REGISTRATION';

    return (
        <header className="header">
            <div className="logo" onClick={() => handleNavigation('/')}>
                <img src={Logo} alt="Logo" />
                <h1>{currentPage}</h1>
            </div>

            {!isAuthPage && (
                <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
                    <ul className={menuOpen ? 'active' : ''}>
                        {token ? (
                            <>
                            {user?.role === 'admin' && (
                                <li onClick={() => handleNavigation('/admin-dashboard')}>
                                <FontAwesomeIcon icon={faTachographDigital} className="nav-icon" />
                                {menuOpen && <span className="nav-text">Admin Dashboard</span>}
                                </li>
                            )}
                            <li onClick={() => handleNavigation('/profile')}>
                                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                {menuOpen && <span className="nav-text">Profile</span>}
                            </li>
                            </>
                        ) : (
                            <li onClick={() => handleNavigation('/login')}>
                            <FontAwesomeIcon icon={faRightToBracket} className="nav-icon" />
                            {menuOpen && <span className="nav-text">Login</span>}
                            </li>
                        )}
                    </ul>
                    <div className="ham-menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="ham-icon" />
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
