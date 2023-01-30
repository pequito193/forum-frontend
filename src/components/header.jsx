import React from "react";
import { Link } from "react-router-dom";
import './../styles/header.css';
import SubHeader from "./subHeader";

function Header(props) {

    const { username, isLoggedIn, searchPost } = props;

    return (
        <React.Fragment>
            <div className="header">
                <div className="left-header">
                    <Link to={'/'}><img className="logo" src={require('./../assets/logo.png')} alt="logo" /></Link>
                    <form className="search" onSubmit={searchPost}>
                        <button className="submit-search" type="submit"><img className="search-logo" src={require('./../assets/search.png')} alt="search button" /></button>
                        <input type="text" className="search-input" required={true} placeholder="Search..."/>
                    </form>
                </div>
                <div className="header-wrapper">
                    <Link to={'/user'} className="username">{username}</Link>
                    <Link to={'/user'} className="links"><img className="settings" src={require('./../assets/settings.png')} alt="settings" /></Link>
                </div>
            </div>
            <SubHeader isLoggedIn={isLoggedIn} />
        </React.Fragment>
    );
}

export default Header;