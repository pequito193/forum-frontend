import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import './../styles/post.css'
import { Link } from "react-router-dom";
import moment from 'moment';

function Post(props) {

    const { username, likeOrDislikePost, likeOrDislikeComment, JWT, isLoggedIn } = props;

    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ deleteClass, setDeleteClass ] = useState('delete-button-hidden');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/posts/${id}`)
        .then(response => {
            setPost(response.data.post);
            setComments(response.data.comments);
        })
    }, [])

    // Shows delete post option
    function showDeleteOption() {
        setDeleteClass('delete-button-visible');
    }

    // Hides delete post option
    function hideDeleteOption() {
        setDeleteClass('delete-button-hidden');
    }

    // Sends delete request to the server
    function deletePost(e) {
        axios.delete(`/posts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                navigate('/');
            }
        })
    }

    // Handles the creation of a new comment
    function newComment(e) {
        e.preventDefault();
        axios.post('/comments/new', {
            postID: id,
            content: e.target[0].value
        }, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                window.location.reload();
            }
        })
    }

    return (
        <React.Fragment>
            {post.map((post, i) => {
                return(
                    <div className="post-complete" key={post.id}>
                        <div className="post-complete-header">
                            <div className="post-complete-title">{post.title}</div>
                            {(username === post.username) ? 
                                <div className="post-options-wrapper">
                                    <Link to={`/posts/edit/${id}`} className="post-options">Edit</Link>
                                    <p onClick={showDeleteOption} className="post-options">Delete</p>
                                </div>
                                :
                                <div className="nothing"></div>
                            }
                        </div>
                        <p className="post-complete-content">{post.content}</p>
                        <div className="post-complete-info-wrapper">
                            <div className="post-complete-likes-wrapper">
                            {isLoggedIn ? 
                                <img src={require(`./../assets/${post.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={post.id} onClick={likeOrDislikePost} className='like-button' alt="like button" />
                                : 
                                <Link to={'/users/login'}>
                                    <img src={require('./../assets/heart_empty.png')} id={post.id} onClick={likeOrDislikePost} className='like-button' alt="like button" />
                                </Link>
                                }
                                <p className="post-complete-likes">{post.likes}</p>
                            </div>
                            <p className="post-complete-date">{post.username}, {moment(new Date(post.date)).fromNow()}</p>
                        </div>
                    </div>
                )
            })}
            <div className={`${deleteClass}`}>
                <p className="delete-post-message">Are you sure you want to <span className='delete-word'>delete</span> this post?</p>
                <button onClick={deletePost} className="delete-post-button">Delete</button>
                <button onClick={hideDeleteOption} className="delete-post-button">Cancel</button>
            </div>
            {isLoggedIn ?
            <form onSubmit={newComment} method='post' className="new-comment-form">
                <p className="new-comment-form-description">Add a Comment</p>
                <textarea name="new-comment-input" className="new-comment-input" id="" cols="30" rows="4" required={true} placeholder="Write your comment here"></textarea>
                <button type="submit" className="submit new-comment-button">Create</button>
            </form>
            :
            <div className="new-comment-form">
                <p className="new-comment-form-description"><Link to={'/users/login'} className='login-link'>Login</Link> to leave a comment!</p>
            </div>
            }
            <div className="comment-wrapper">
                {comments.map((comment, i) => {
                    return(
                        <div className='comment' key={comment.commentID}>
                            <p className="comment-user">{comment.username}, {moment(new Date(comment.date)).fromNow()}</p>
                            <p className="comment-content">{comment.content}</p>
                            <div className="comment-bottom-wrapper">
                                <div className="comment-likes-wrapper">
                                    <img src={require(`./../assets/${comment.liked_by.includes(username) ? 'heart_full' : 'heart_empty'}.png`)} id={comment.commentID} onClick={likeOrDislikeComment} className='like-button' alt="like button" />
                                    <p className="comment-likes">{comment.likes}</p>
                                </div>
                                {(username === comment.username) ?
                                    <div className="post-options-wrapper">
                                        <Link to={`/comments/edit/${comment.commentID}`} className="post-options">Edit</Link>
                                        {/* <p onClick={showDeleteOption} className="post-options">Delete</p> */}
                                    </div>
                                    :
                                    <div className="nothing"></div>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Post;