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
import EditComment from "./editComment";
import User from "./user";
import DeleteAccount from "./deleteAccount";
import DeleteComment from "./deleteComment";

function Main(props) {

    const { likeOrDislikePost, likeOrDislikeComment, username, errorMessage, isLoggedIn, logout, login, signup, JWT, search, deleteAccount } = props;

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/forum-frontend/" element={<PostList username={username} likeOrDislikePost={likeOrDislikePost} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/forum-frontend/user" element={<User JWT={JWT} />} />
                        <Route exact path="/forum-frontend/user/login" element={<Login isLoggedIn={isLoggedIn} errorMessage={errorMessage} login={login} />} />
                        <Route exact path="/forum-frontend/user/logout" element={<Logout logout={logout} />} />
                        <Route exact path="/forum-frontend/user/signup" element={<SignUp signup={signup} errorMessage={errorMessage} />} />
                        <Route exact path="/forum-frontend/user/delete" element={<DeleteAccount deleteAccount={deleteAccount} />} />
                        <Route exact path="/forum-frontend/user/posts" element={<MyPosts likeOrDislikePost={likeOrDislikePost} JWT={JWT} username={username} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/forum-frontend/posts/new" element={<NewPost JWT={JWT} />} />
                        <Route exact path="/forum-frontend/posts/search" element={<PostListSearch username={username} search={search} likeOrDislikePost={likeOrDislikePost} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/forum-frontend/posts/edit/:id" element={<EditPost JWT={JWT} />} />
                        <Route exact path="/forum-frontend/posts/:id" element={<Post username={username} likeOrDislikePost={likeOrDislikePost} likeOrDislikeComment={likeOrDislikeComment} JWT={JWT} isLoggedIn={isLoggedIn} />} />
                        <Route exact path="/forum-frontend/comments/delete/:id" element={<DeleteComment JWT={JWT} /> } />
                        <Route exact path="/forum-frontend/comments/edit/:id" element={<EditComment JWT={JWT} />} />
                    </Routes>
                </div>
            </div>                
        </React.Fragment>
    )
}

export default Main;