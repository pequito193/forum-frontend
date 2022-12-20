import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/header.css';

function Header() {

    const { isLoggedIn, setIsLoggedIn } = useState(false);
    const { headerMessage, setHeaderMessage } = useState(<Link to={'/log-in'} className='links'>Log In</Link>)

    useEffect(() => {
        if(isLoggedIn) {
            setHeaderMessage(<Link to={'/log-out'} className='links'>Log Out</Link>)
        }
    }, []);

    return (
        <React.Fragment>
            <div className="header">
                <div className="trademark">
                    <img className="logo" src={require('./../assets/logo.png')} alt="logo" />
                    <p className="website-name">Blog</p>
                </div>
                <ul>
                    <li className="links">{headerMessage}</li>
                    <li className="links">Settings</li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default Header;