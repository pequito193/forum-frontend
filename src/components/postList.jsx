import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './../styles/postList.css';
import { Link } from "react-router-dom";

function PostList(props) {

    const { username, isLoggedIn, likeOrDislikePost } = props;

    const [ posts, setPosts ] = useState([])

    let dateFormat = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }

    let hourFormat = {
        hour: 'numeric',
        hour12: false,
        minute: 'numeric'
    }

    useEffect(() => {
        axios.get('/posts/')
        .then(response => {
            setPosts(response.data.posts)
        })
    }, []);
   
    return (
        <React.Fragment>
            <div className="post-wrapper">
                {posts.map((post, i) => {
                    return(
                        <div className='post' key={post.id}>
                            <div className="post-likes-wrapper">
                                {isLoggedIn ? 
                                <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislikePost} className='like-button' alt="like button" />
                                : 
                                <Link to={'/users/login'}>
                                    <img src={require('./../assets/heart_empty.png')} id={post.id} onClick={likeOrDislikePost} className='like-button' alt="like button" />
                                </Link>
                                }
                                <p className="post-likes">{post.likes}</p>
                            </div>
                            <Link to={`/posts/${post.id}`} className="post-info-wrapper">
                                <p className="post-title">{post.title}</p>
                                <p className="post-date">{post.username}, {new Date(post.date).toLocaleTimeString('en-US', hourFormat)}, {new Date(post.date).toLocaleDateString('en-US', dateFormat)}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default PostList;