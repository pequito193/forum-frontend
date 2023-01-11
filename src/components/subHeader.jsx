import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../styles/subHeader.css'

function SubHeader(props) {

    const { isLoggedIn } = props;

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
            <div className="subHeader">
                <Link to={isLoggedIn ? '/posts/new' : '/users/login'} className='subHeader-link'>New Post</Link>
                <Link to={isLoggedIn ? '/posts/new' : '/users/login'} className='subHeader-link'>My Posts</Link>
                <Link to={isLoggedIn ? '/posts/new' : '/users/login'} className='subHeader-link'>My Comments</Link>
                <Link to={headerLink} className='subHeader-link'>{headerMessage}</Link>
            </div>
        </React.Fragment>
    )
}

export default SubHeader;