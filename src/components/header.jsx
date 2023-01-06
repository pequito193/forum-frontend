import React from "react";
import { Link } from "react-router-dom";
import './../styles/header.css';

function Header() {

    return (
        <React.Fragment>
            <div className="header">
                <div className="left-header">
                    <Link to={'/'}><img className="logo" src={require('./../assets/logo.png')} alt="logo" /></Link>
                    <form className="search">
                        <button className="submit-search" type="submit"><img className="search-logo" src={require('./../assets/search.png')} alt="search button" /></button>
                        <input type="text" className="search-input" required={true} placeholder="Search..."/>
                    </form>
                </div>
                <p className="links"><img className="settings" src={require('./../assets/settings.png')} alt="settings" /></p>
            </div>
        </React.Fragment>
    );
}

export default Header;