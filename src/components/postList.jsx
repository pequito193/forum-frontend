import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './../styles/postList.css';

function PostList() {

    const [ posts, setPosts ] = useState([])

    let dateFormat = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        hour12: false
    }

    useEffect(() => {
        axios.get('/posts/')
        .then(response => {
            setPosts(response.data.data)
        })
    }, []);
   
    return (
        <React.Fragment>
            <div className="post-wrapper">
                {posts.map((post, i) => {
                    return(
                        <div className='post' key={post.id}>
                            <p className="post-title">{post.title}</p>
                            <p className="post-content">{post.content}</p>
                            <div className="post-info-wrapper">
                                <p className="post-likes">{post.likes}</p>
                                <p className="post-date">{post.date.toLocaleString('en-US', dateFormat)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default PostList;