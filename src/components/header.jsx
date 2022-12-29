import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/header.css';

function Header() {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ headerMessage, setHeaderMessage ] = useState('');
    const [ headerLink, setHeaderLink ] = useState('');

    useEffect(() => {
        if(isLoggedIn) {
            setHeaderMessage('Log Out');
            setHeaderLink('/log-out');
        } else {
            setHeaderMessage('Log In');
            setHeaderLink('/log-in');
        }
    })

    return (
        <React.Fragment>
            <div className="header">
                <div className="left-header">
                    <Link to={'/'} className="website-name"><img className="logo" src={require('./../assets/logo.png')} alt="logo" /></Link>
                    <form /*onSubmit={}*/ className="search">
                        <button className="search-submit" type="submit"><img className="search-logo" src={require('./../assets/search.png')} alt="search button" /></button>
                        <input type="text" className="search-input" required={true} placeholder="Search..."/>
                    </form>
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