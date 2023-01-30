import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './../styles/postList.css';
import { Link } from "react-router-dom";
import moment from "moment";

function PostList(props) {

    const { username, isLoggedIn, likeOrDislikePost } = props;

    const [ posts, setPosts ] = useState([])

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
                                <Link to={'/user/login'}>
                                    <img src={require('./../assets/heart_empty.png')} id={post.id} className='like-button' alt="like button" />
                                </Link>
                                }
                                <p className="post-likes">{post.likes}</p>
                            </div>
                            <Link to={`/posts/${post.id}`} className="post-info-wrapper">
                                <p className="post-title">{post.title}</p>
                                <p className="post-date">{post.username}, {moment(new Date(post.date)).fromNow()}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default PostList;