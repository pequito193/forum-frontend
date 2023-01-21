import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './../styles/post.css'

function Post(props) {

    const { username, likeOrDislike } = props;

    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);

    const { id } = useParams();

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
        axios.get(`/posts/${id}`)
        .then(response => {
            setPost(response.data.post);
            setComments(response.data.comments);
        })
    }, [])

    return (
        <React.Fragment>
            {post.map((post, i) => {
                return(
                    <div className="post-complete" key={post.id}>
                        <p className="post-complete-title">{post.title}</p>
                        <p className="post-complete-content">{post.content}</p>
                        <div className="post-complete-info-wrapper">
                            <div className="post-complete-likes-wrapper">
                                <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislike} className='like-button' alt="like button" />
                                <p className="post-complete-likes">{post.likes}</p>
                            </div>
                            <p className="post-date">{post.username}, {new Date(post.date).toLocaleTimeString('en-US', hourFormat)}, {new Date(post.date).toLocaleDateString('en-US', dateFormat)}</p>
                        </div>
                    </div>
                )
            })}
            <div className="comment-wrapper">
                {comments.map((comment, i) => {
                    return(
                        <div  className='comment' key={comment.postID}>
                            <p className="comment-user">{comment.username}</p>
                            <p className="comment-content">{comment.content}</p>
                            <div className="comment-info-wrapper">
                                <p className="comment-likes">{comment.likes}</p>
                                <p className="comment-date">{new Date(comment.date).toLocaleDateString('en-US', dateFormat)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Post;