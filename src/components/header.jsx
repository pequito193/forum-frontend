import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/header.css';

function Header() {

    const { isLoggedIn, setIsLoggedIn } = useState(false);
    let headerLink;
    let headerMessage;

    if(isLoggedIn) {
        headerMessage = 'Log Out';
        headerLink = '/log-out';
    } else {
        headerMessage = 'Log In';
        headerLink = '/log-in';
    }

    return (
        <React.Fragment>
            <div className="header">
                <div className="trademark">
                    <img className="logo" src={require('./../assets/logo.png')} alt="logo" />
                    <Link to={'/'} className="website-name">Blog</Link>
                </div>
                <ul>
                    <li className="links"><Link to={headerLink} className='link'>{headerMessage}</Link></li>
                    <li className="links">Settings</li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default Header;