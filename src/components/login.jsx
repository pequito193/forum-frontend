import React from "react";
import { Link } from "react-router-dom";
import './../styles/login.css';
import { redirect } from "react-router-dom";
import { useEffect } from "react";

function Login(props) {

    const { login, errorMessage, isLoggedIn } = props;

    useEffect(()=> {
        redirect('/');
    },[isLoggedIn])
    
    return(
        <React.Fragment>
            <h1 className="login-title">Log In</h1>
            <form className="login-form" method='post' onSubmit={login}>
                <input className="input" name="username" type="text" placeholder="Username" required={true}/>
                <input className="input" name="password" type="password" placeholder="Password" required={true}/>
                <p className="error-message">{errorMessage}</p>
                <div className="no-account">
                    <p>Don't have an account yet?
                        <Link to={'/users/signup'} className='signup-link'> Sign Up </Link>
                    </p>
                </div>
                <button className="submit">Log In</button>
            </form>
        </React.Fragment>
    )
}

export default Login;