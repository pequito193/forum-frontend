import React from "react";
import { Link } from "react-router-dom";
import './../styles/logIn.css';

function LogIn() {
    
    return(
        <React.Fragment>
            <h1 className="login-title">Log In</h1>
            <form className="login-form" method='post' action="/users/login">
                <input className="input" name="username" type="text" placeholder="Username" required={true}/>
                <input className="input" name="password" type="password" placeholder="Password" required={true}/>
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

export default LogIn;