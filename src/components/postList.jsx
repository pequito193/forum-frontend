import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import './../styles/postList.css';
import { Link } from "react-router-dom";

function PostList(props) {

    const { username, JWT, isLoggedIn } = props;

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
            setPosts(response.data.data)
        })
    }, []);

    function likeOrDislike(e) {
        const image = e.target.src;
        const id = e.target.id;
        if (image.match(/\/media\/(.*?)\./)[1] === 'heart_empty') {
            axios.post(`/posts/likes/${id}`, {
                info: 'Like',
                jwt: JWT
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
        else if (image.match(/\/media\/(.*?)\./)[1] === 'heart_full') {
            axios.post(`/posts/likes/${id}`, {
                info: 'Dislike',
                jwt: JWT
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
    }
   
    return (
        <React.Fragment>
            <div className="post-wrapper">
                {posts.map((post, i) => {
                    return(
                        <div className='post' key={post.id}>
                            <div className="post-likes-wrapper">
                                {isLoggedIn ? 
                                <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislike} className='like-button' alt="like button" />
                                : 
                                <Link to={'/users/login'}>
                                    <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislike} className='like-button' alt="like button" />
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