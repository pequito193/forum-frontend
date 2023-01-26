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
import PostListSearch from "./postListSearch";
import EditPost from "./editPost";

function Main(props) {

    const { likeOrDislikePost, likeOrDislikeComment, username, errorMessage, isLoggedIn, logout, login, signup, JWT, search } = props;

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList username={username} likeOrDislikePost={likeOrDislikePost} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/user/login" element={<Login isLoggedIn={isLoggedIn} errorMessage={errorMessage} login={login} />} />
                        <Route exact path="/user/logout" element={<Logout logout={logout} />} />
                        <Route exact path="/user/signup" element={<SignUp signup={signup} errorMessage={errorMessage} />} />
                        <Route exact path="/user/posts" element={<MyPosts likeOrDislikePost={likeOrDislikePost} JWT={JWT} username={username} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/posts/new" element={<NewPost JWT={JWT} />} />
                        <Route exact path="/posts/search" element={<PostListSearch username={username} search={search} likeOrDislikePost={likeOrDislikePost} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/posts/edit/:id" element={<EditPost JWT={JWT} />} />
                        <Route exact path="/posts/:id" element={<Post username={username} likeOrDislikePost={likeOrDislikePost} likeOrDislikeComment={likeOrDislikeComment} JWT={JWT} isLoggedIn={isLoggedIn} />} />
                    </Routes>
                </div>
            </div>                
        </React.Fragment>
    )
}

export default Main;