import React from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import LogIn from "./logIn";
import NewPost from "./newPost";
import PostList from "./postList";
import Sidebar from "./sidebar";
import SignUp from "./signUp";

function Main() {

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList />} />
                        <Route exact path="/users/login" element={<LogIn />} />
                        <Route exact path="/users/signup" element={<SignUp />} />
                        <Route exact path="/post/new" element={<NewPost />} />
                    </Routes>
                </div>
                <Sidebar />
            </div>                
        </React.Fragment>
    )
}

export default Main;