import React from "react";
import { useState, useEffect } from "react";
import './../styles/postList.css';

function Posts() {

    const [ postList, setPostList ] = useState([]);

    const posts = [];

    useEffect(() => {
        fetch('/post/').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setPostList(jsonRes.userStatus))
    },[]);

    for (let i = 0; i < postList.length; i++) {

        posts.push(
            <div className='post' key={postList[i]}>
                <p className="post-title">{postList.title}</p>
                <p className="post-likes">{postList.likes}</p>
            </div>
        )

    }
    console.log(posts)

    return posts;
}

export default Posts;