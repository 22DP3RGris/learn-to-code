import './Header.css';
import React, { useEffect } from "react";
import Logo from '../../assets/LTC-LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

function Header({ page }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(page || "LEARN TO CODE");
    const {user, token} = useStateContext();

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
                <ul>
                    {page !== 'LOGGING IN' && page !== 'REGISTRATION' && (
                        token ? (
                            <li onClick={() => navigate('/profile')}>
                                <a><FontAwesomeIcon icon={faUser} className='nav-icon' /></a>
                            </li>
                        ) : (
                            <li onClick={() => navigate('/login')}>
                                <a><FontAwesomeIcon icon={faRightToBracket} className='nav-icon' /></a>
                            </li>
                        )
                    )}
                </ul>
                <div className='ham-menu'>
                    <FontAwesomeIcon icon={faBars} className='ham-icon'/>
                </div>
            </nav>
        </header>
    );
}

export default Header;
