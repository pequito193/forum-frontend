import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import Logout from "./logout";
import Login from "./login";
import NewPost from "./newPost";
import PostList from "./postList";
import Sidebar from "./sidebar";
import SignUp from "./signUp";
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom'

function Main() {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ JWT, setJWT ] = useState(undefined);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ username, setUsername ] = useState('');

    // Login function, fetches a login JSON web token from the server and stores it
    async function login(e) {
        e.preventDefault();
        try {
            await axios.post('/users/login', {
                username: e.target[0].value,
                password: e.target[1].value
            })
            .then(response => {
                setErrorMessage(response.data.message)
                setJWT(response.data.accessToken);
                localStorage.setItem('JWT', JWT);
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    // Logout function, deletes JSON web token
    function logout(e) {
        redirect('/');
        setJWT(undefined);
        localStorage.clear('JWT');
    }

    // Sets user status
    useEffect(() => {
        if (localStorage.getItem('JWT') === null || localStorage.getItem('JWT') === undefined) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [JWT])

    // Decodes JSON web token to obtain username
    useEffect(() => {
        if(!(localStorage.getItem('JWT') === null || localStorage.getItem('JWT') === undefined)) {
            const decoded_jwt = jwt_decode(JWT, process.env.REACT_APP_SECRET_ACCESS_KEY)
            setUsername(decoded_jwt.name);
        } else {
            setUsername('');
        }
    }, [isLoggedIn])


    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList JWT={JWT} />} />
                        <Route exact path="/users/login" element={<Login login={login} errorMessage={errorMessage} isLoggedIn={isLoggedIn} />} />
                        <Route exact path='/users/logout' element={<Logout logout={logout} />} />
                        <Route exact path="/users/signup" element={<SignUp />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                    </Routes>
                </div>
                <Sidebar username={username} isLoggedIn={isLoggedIn} />
            </div>                
        </React.Fragment>
    )
}

export default Main;