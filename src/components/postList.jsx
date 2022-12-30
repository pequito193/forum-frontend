import React from "react";
import { useState, useEffect } from "react";
import './../styles/postList.css';
import Posts from "./posts";

function PostList() {

    return (
        <React.Fragment>
            <div className="background">
                <Posts />
            </div>
        </React.Fragment>
    )
}

export default PostList;