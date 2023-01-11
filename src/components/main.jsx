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
import { useNavigate } from "react-router-dom";

function Main() {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ JWT, setJWT ] = useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ username, setUsername ] = useState('');

    const navigate = useNavigate();

    // Login function, fetches a login JSON web token from the server and stores it
    function login(e) {
        e.preventDefault();
        try {
            axios.post('/users/login', {
                username: e.target[0].value,
                password: e.target[1].value
            })
            .then(response => {
                setErrorMessage(response.data.message);
                setJWT(response.data.accessToken);
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    // Create a new user
    function signup(e) {
        e.preventDefault();
        try {
            axios.post('/users/signup', {
                username: e.target[0].value,
                username_lowercase: e.target[0].value.toLowerCase(),
                email: e.target[1].value,
                password: e.target[2].value,
                confirmPassword: e.target[3].value
            })
            .then(response => {
                setErrorMessage(response.data.message);
                if (response.data.result === 'Success') {
                    navigate('/users/login');
                }
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    // Logout function, deletes JSON web token
    function logout(e) {
        setJWT(undefined);
        localStorage.removeItem('JWT');
        navigate('/');
    }

    // Sets user status
    useEffect(() => {
        if (JWT) {
            localStorage.setItem('JWT', JWT);
        }
        if (localStorage.getItem('JWT') === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [JWT])

    // Decodes JSON web token to obtain username
    useEffect(() => {
        if(!(localStorage.getItem('JWT') === null)) {
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
                        <Route exact path="/users/signup" element={<SignUp signup={signup} errorMessage={errorMessage} />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                    </Routes>
                </div>
                <Sidebar username={username} isLoggedIn={isLoggedIn} />
            </div>                
        </React.Fragment>
    )
}

export default Main;