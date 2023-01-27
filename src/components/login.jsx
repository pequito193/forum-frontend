import React from "react";
import { Link } from "react-router-dom";
import './../styles/login.css';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const { login, errorMessage, isLoggedIn } = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate])
    
    return(
        <React.Fragment>
            <h1 className="login-title">Log In</h1>
            <form className="login-form" method='post' onSubmit={login}>
                <input className="input" name="username" type="text" placeholder="Username" required={true}/>
                <input className="input" name="password" type="password" placeholder="Password" required={true}/>
                <p className="error-message">{errorMessage}</p>
                <div className="no-account">
                    <p className="question">Don't have an account yet?
                        <Link to={'/user/signup'} className='signup-link'> Sign Up </Link>
                    </p>
                </div>
                <button className="submit">Log In</button>
            </form>
        </React.Fragment>
    )
}

export default Login;