import React from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import Logout from "./logout";
import Login from "./login";
import NewPost from "./newPost";
import PostList from "./postList";
import SignUp from "./signUp";
import Post from "./post";
import MyPosts from "./myPosts";

function Main(props) {

    const { likeOrDislike, username, errorMessage, isLoggedIn, logout, login, signup, JWT } = props;

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList username={username} likeOrDislike={likeOrDislike} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/users/login" element={<Login isLoggedIn={isLoggedIn} errorMessage={errorMessage} login={login} />} />
                        <Route exact path="/users/logout" element={<Logout logout={logout} />} />
                        <Route exact path="/users/signup" element={<SignUp signup={signup} errorMessage={errorMessage} />} />
                        <Route exact path="/users/posts/:user" element={<MyPosts likeOrDislike={likeOrDislike} JWT={JWT} username={username} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                        <Route exact path="/posts/:id" element={<Post username={username} likeOrDislike={likeOrDislike} JWT={JWT} isLoggedIn={isLoggedIn} />} />
                    </Routes>
                </div>
            </div>                
        </React.Fragment>
    )
}

export default Main;