import React from "react";
import './LoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function LoginSignup() {
    const [action, setAction] = React.useState("Sign Up");
    return (
        <div className="container">
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
                    <div className={action==="Login"?"submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </form>
        </div>);
}

export default LoginSignup;
