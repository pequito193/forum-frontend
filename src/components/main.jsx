import React from "react";
import { Route, Routes } from "react-router-dom";
import './../styles/main.css'
import LogIn from "./logIn";
import NewPost from "./newPost";
import PostList from "./postList";
import Sidebar from "./sidebar";

function Main() {

    return(
        <React.Fragment>
            <div className="background">
                <div className="main">
                    <Routes>
                        <Route exact path="/" element={<PostList />} />
                        <Route exact path="/log-in" element={<LogIn />} />
                        <Route exact path="/post/new" element={<NewPost />} />
                    </Routes>
                </div>
                <Sidebar />
            </div>                
        </React.Fragment>
    )
}

export default Main;