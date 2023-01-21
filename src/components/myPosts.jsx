import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function MyPosts(props) {

    const { JWT, username, likeOrDislike } = props;

    const [ posts, setPosts ] = useState([]);

    const { user } = useParams();

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
        axios.get(`/posts/users/${user}`, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            setPosts(response.data.posts);
        })
    }, [])

    return(
        <React.Fragment>
            <div className="post-wrapper">
                {posts.map((post, id) => {
                    return(
                        <div className="post" key={post.id}>
                             <div className="post-likes-wrapper">
                                <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislike} className='like-button' alt="like button" />
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
    )
}

export default MyPosts;