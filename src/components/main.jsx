import React from "react";
import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import Logout from "./logout";
import Login from "./login";
import NewPost from "./newPost";
import PostList from "./postList";
import Sidebar from "./sidebar";
import SignUp from "./signUp";
import { useEffect } from "react";

function Main() {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ JWT, setJWT ] = useState(undefined);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    async function login(e) {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', {
                username: e.target[0].value,
                password: e.target[1].value
            })
            .then(response => {
                console.log(response.data);
                setErrorMessage(response.data.message)
                setJWT(response.data.accessToken);
                localStorage.setItem('JWT', JWT);
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('JWT') === undefined) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [JWT])

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList JWT={JWT} />} />
                        <Route exact path="/users/login" element={<Login login={login} errorMessage={errorMessage} />} />
                        <Route exact path='/users/logout' element={<Logout />} />
                        <Route exact path="/users/signup" element={<SignUp />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                    </Routes>
                </div>
                <Sidebar JWT={JWT} isLoggedIn={isLoggedIn} />
            </div>                
        </React.Fragment>
    )
}

export default Main;