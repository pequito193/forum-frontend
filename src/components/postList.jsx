import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './../styles/postList.css';
import { Link } from "react-router-dom";

function PostList() {

    const [ posts, setPosts ] = useState([])

    let dateFormat = {
        hour: 'numeric',
        hour12: false,
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
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
                        <Link to={`/posts/${post.id}`} className='post' key={post.id}>
                            <p className="post-title">{post.title}</p>
                            <p className="post-content">{post.content}</p>
                            <div className="post-info-wrapper">
                                <p className="post-likes">{post.likes}</p>
                                <p className="post-date">{new Date(post.date).toLocaleDateString('en-US', dateFormat)}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default PostList;