import React from "react";
import './LoginSignup.css';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header.jsx';

function LoginSignup({ action: initialAction }) {
    const navigate = useNavigate();
    const [action, setAction] = React.useState(initialAction || "Sign Up");
    
    return (
        <div id="LoginSignup">
            <Header page={action==="Sign Up"?"REGISTRATION":"LOGING IN"}/>
            <div className="card-container">
                <form action="post" className="form">
                    <h1>{action==="Sign Up"?"REGISTRATION":"LOGING IN"}</h1>
                    <div className="inputs">
                        {action==="Login"?<div></div>:<div className="input">
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                            <input type="text" placeholder="Username" required/>
                        </div>}
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon"/>
                            <input type="email" placeholder="Email" required/>
                        </div>
                        {action==="Login"?<div></div>:<div className="input">
                            <FontAwesomeIcon icon={faPhone} className="form-icon"/>
                            <input type="text" placeholder="Phone" required/>
                        </div>}
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                            <input type="password" placeholder="Password" required/>
                        </div>
                    </div>
                    {action==="Sign Up"?<div></div>:<div className="forgot-password"> Lost Password? <span>Click Here!</span></div>}
                    <div className="sumbit-container">
                        <div className={action==="Login"?"submit gray" : "submit"} onClick={()=>{navigate("/signup"), setAction('Sign Up')}}>Sign Up</div>
                        <div className={action==="Sign Up"?"submit gray" : "submit"} onClick={()=>{navigate("/login"), setAction('Login')}}>Login</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
