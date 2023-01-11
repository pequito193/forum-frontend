import React from "react";
import { Link } from "react-router-dom";
import './../styles/signUp.css';

function SignUp(props) {

    const { signup, errorMessage } = props;
    
    return(
        <React.Fragment>
            <h1 className="signup-title">Sign Up</h1>
            <form className="signup-form" method='post' onSubmit={signup}>
                <input className="input" name="username" type="text" placeholder="Username" required={true}/>
                <input className="input" name="email" type="email" placeholder="Email" required={true}/>
                <input className="input" name="password" type="password" placeholder="Password" required={true}/>
                <input className="input" name="confirmPassword" type="password" placeholder="Confirm Password" required={true}/>
                <p className="error-message">{errorMessage}</p>
                <div className="no-account">
                    <p className="question">Already have an account?
                        <Link to={'/users/login'} className='login-link'> Log In </Link>
                    </p>
                </div>
                <button className="submit">Sign Up</button>
            </form>
        </React.Fragment>
    )
}

export default SignUp;