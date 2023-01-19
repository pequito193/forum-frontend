import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Post() {

    const [ post, setPost ] = useState([]);
    const [ comments, setComment ] = useState([]);

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
            setComment(response.data.comments);
        })
    }, [])

    return (
        <React.Fragment>
            {post.map((post, i) => {
                return(
                    <div className="post-complete" key={post.id}>
                        <p className="post-title">{post.title}</p>
                        <p className="post-content">{post.content}</p>
                        <div className="post-info-wrapper">
                            <p className="post-likes">{post.likes}</p>
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