import React, { useRef, useState } from "react";
import './LoginSignup.css';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header.jsx';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

function Signup() {
    const { token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const phone = phoneRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordConfirm = passwordConfirmRef.current?.value;

        setErrors(null);

        const payload = { username, email, phone, password, password_confirmation: passwordConfirm };
        
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate("/");
            })
            .catch((error) => {
                const { response } = error;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="LoginSignup">
            <Header page="REGISTRATION"/>
            <div className="card-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>REGISTRATION</h1>
                    <div className="inputs">
                        <div className="input">
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                            <input ref={usernameRef} type="text" placeholder="Username"/>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon"/>
                            <input ref={emailRef} type="email" placeholder="Email"/>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faPhone} className="form-icon"/>
                            <input ref={phoneRef} type="text" placeholder="Phone"/>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                            <input ref={passwordRef} type="password" placeholder="Password"/>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faCheck} className="form-icon"/>
                            <input ref={passwordConfirmRef} type="password" placeholder="Password Confirmation"/>
                        </div>
                    </div>
                    {errors && <div className="alerts">
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="alert">{errors[key][0]}</p>
                        ))}
                    </div>}
                    <div className="tip">Already have an account? <span onClick={handleLoginClick} >Login</span></div>
                    <div className="sumbit-container">
                        <button type="submit" className="submit-form">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
