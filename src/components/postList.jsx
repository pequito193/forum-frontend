import axios from "axios";
import React from "react";
import { useEffect } from "react";
import './../styles/postList.css';

function PostList() {

    const posts = [];

    useEffect(() => {
        axios.get('/posts/')
        .then(response => {
            for (let i = 0; i < response.data.data.length; i++) {
                posts.push(response.data.data[i])
            }
            console.log(posts)
        })
    }, []);
   
    return (
        <React.Fragment>
            {posts.map((post, i) => {
                console.log(post)
                return(
                    <div className='post' key={i}>
                        <p className="post-title">{post.title}</p>
                        <p className="post-content">{post.content}</p>
                        <p className="post-date">{post.date}</p>
                        <p className="post-likes">{post.likes}</p>
                    </div>
                )
            })}
        </React.Fragment>
    );
}

export default PostList;