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
            setHeaderLink('/user/logout');
        } else {
            setHeaderMessage('Log In');
            setHeaderLink('/user/login');
        }
    }, [isLoggedIn])


    return (
        <React.Fragment>
            <div className="subHeader">
                <Link to={isLoggedIn ? '/posts/new' : '/user/login'} className='subHeader-link'>New Post</Link>
                <Link to={isLoggedIn ? '/user/posts' : '/user/login'} className='subHeader-link'>My Posts</Link>
                <Link to={headerLink} className='subHeader-link'>{headerMessage}</Link>
            </div>
        </React.Fragment>
    )
}

export default SubHeader;