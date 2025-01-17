import React, { useRef } from "react";
import './LoginSignup.css';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header.jsx';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

function LoginSignup({ action: initialAction }) {
    const { token } = useStateContext();
    const navigate = useNavigate();

    console.log(token);

    const [action, setAction] = React.useState(initialAction || "Sign Up");

    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const phone = phoneRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordConfirm = passwordConfirmRef.current?.value;
    
        const payload = action === "Sign Up"
            ? { username, email, phone, password, passwordConfirm }
            : { email, password };
        
        console.log(payload);

        axiosClient.post(`/${action.replace(/\s+/g, '').toLowerCase()}`, payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <div id="LoginSignup">
            <Header page={action==="Sign Up"?"REGISTRATION":"LOGING IN"}/>
            <div className="card-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>{action==="Sign Up"?"REGISTRATION":"LOGING IN"}</h1>
                    <div className="inputs">
                        {action==="Login"?<div></div>:<div className="input">
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                            <input ref={usernameRef} type="text" placeholder="Username" required/>
                        </div>}
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon"/>
                            <input ref={emailRef} type="email" placeholder="Email" required/>
                        </div>
                        {action==="Login"?<div></div>:<div className="input">
                            <FontAwesomeIcon icon={faPhone} className="form-icon"/>
                            <input ref={phoneRef} type="text" placeholder="Phone" required/>
                        </div>}
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                            <input ref={passwordRef} type="password" placeholder="Password" required/>
                        </div>
                        {action==="Login"?<div></div>:<div className="input">
                            <FontAwesomeIcon icon={faCheck} className="form-icon"/>
                            <input ref={passwordConfirmRef} type="password" placeholder="Password Confirmation" required/>
                        </div>}
                    </div>
                    {action==="Sign Up"?<div></div>:<div className="forgot-password"> Lost Password? <span>Click Here!</span></div>}
                    <div className="sumbit-container">
                        <button type={action === "Login" ? "button" : "submit"} className={action==="Login"?"submit gray" : "submit"} onClick={()=>{navigate("/signup"), setAction('Sign Up')}}>Sign Up</button>
                        <button type={action === "Sign Up" ? "button" : "submit"} className={action==="Sign Up"?"submit gray" : "submit"} onClick={()=>{navigate("/login"), setAction('Login')}}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
