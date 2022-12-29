import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./logIn";
import PostList from "./postList";

function Main() {

    return(
        <React.Fragment>
            <Routes>
                <Route exact path="/" element={<PostList />} />
                <Route exact path="/log-in" element={<LogIn />} />                
            </Routes>
        </React.Fragment>
    )
}

export default Main;