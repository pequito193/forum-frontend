import React from "react";
import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import LogIn from "./logIn";
import NewPost from "./newPost";
import PostList from "./postList";
import Sidebar from "./sidebar";
import SignUp from "./signUp";

function Main() {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ JWT, setJWT ] = useState(undefined);

    async function getJWT(e) {
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
                console.log('JWT =', JWT);
                console.log('error =', errorMessage);
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList JWT={JWT} />} />
                        <Route exact path="/users/login" element={<LogIn getJWT={getJWT} JWT={JWT} errorMessage={errorMessage} />} />
                        <Route exact path="/users/signup" element={<SignUp />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                    </Routes>
                </div>
                <Sidebar JWT={JWT} />
            </div>                
        </React.Fragment>
    )
}

export default Main;