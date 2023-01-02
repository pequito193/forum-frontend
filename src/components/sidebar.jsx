import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/sidebar.css'

function Sidebar() {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
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
                <Link to={headerLink} className='sidebar-link'>{headerMessage}</Link>
                <Link to={'/post/new'} className='sidebar-link'>New Post</Link>
            </div>
        </React.Fragment>
    )
}

export default Sidebar;