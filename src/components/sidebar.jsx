import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/sidebar.css'

function Sidebar(props) {

    const { username, isLoggedIn } = props;

    const [ headerMessage, setHeaderMessage ] = useState('');
    const [ headerLink, setHeaderLink ] = useState('');

    useEffect(() => {
        if(isLoggedIn) {
            setHeaderMessage('Log Out');
            setHeaderLink('/users/logout');
        } else {
            setHeaderMessage('Log In');
            setHeaderLink('/users/login');
        }
    }, [isLoggedIn])

    return (
        <React.Fragment>
            <div className="sidebar">
                <div className="sidebar-title-wrapper">
                    <h2 className="sidebar-title1">Welcome</h2>
                    <h2 className="sidebar-title2">{username}</h2>
                </div>
                <div className="sidebar-wrapper">
                    <Link to={headerLink} className='sidebar-link'>{headerMessage}</Link>
                    <Link to={'/posts/new'} className='sidebar-link'>New Post</Link>
                    <Link to={'/posts/new'} className='sidebar-link'>My Posts</Link>
                    <Link to={'/posts/new'} className='sidebar-link'>My Comments</Link>
                </div>
                <h2 className="sidebar-title1">Settings</h2>
            </div>
        </React.Fragment>
    )
}

export default Sidebar;