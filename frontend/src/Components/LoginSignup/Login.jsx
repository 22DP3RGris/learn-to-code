import React, { useRef, useState } from "react";
import './LoginSignup.css';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header.jsx';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

function Login() {
    const { token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleDontHaveAnAccountClick = () => {
        navigate('/signup');
    };

    // if (token) {
    //     navigate("/");
    // }

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        setErrors(null);

        const payload = { email, password };

        axiosClient.defaults.withCredentials = true;
        axiosClient.post("/login", payload)
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
            <Header page="LOGING IN"/>
            <div className="card-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>LOGING IN</h1>
                    <div className="inputs">
                        <div className="input">
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon"/>
                            <input ref={emailRef} type="email" placeholder="Email"/>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                            <input ref={passwordRef} type="password" placeholder="Password"/>
                        </div>
                    </div>
                    {errors && <div className="alerts">
                        {Object.keys(errors).map((key) => (
                            <p className="alert" key={key}>{errors[key][0]}</p>
                        ))}
                    </div>} 
                    <div className="tip">Don’t Have An Account?<span onClick={handleDontHaveAnAccountClick}> Sign Up</span></div>
                    <div className="sumbit-container">
                        <button type="submit" className="submit">Login</button>
                    </div>
                </form>
            </div> 
        </div>
    );
}

export default Login;
