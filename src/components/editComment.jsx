import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EditComment(props) {

    const { JWT } = props;

    const [ comment, setComment ] = useState([]);
    const [ postID, setPostID ] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://forum-api-production.up.railway.app/comments/${id}`)
        .then(response => {
            setComment(response.data.comment);
            setPostID(response.data.postID);
        })
    }, [])

    // Handles the request for editing a post
    function editComment(e) {
        e.preventDefault();
        const newComment = e.target[0].value;
        axios.post('https://forum-api-production.up.railway.app/comments/edit', {
            commentID: id,
            content: newComment
        }, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                navigate(`/posts/${postID}`);
            }
        })
    }

    return(
        <React.Fragment>
            {comment.map((comment, i) => {
                return(
                    <div key={comment.commentID}>
                        <h1 className="new-post-title">Edit Comment</h1>
                        <form className="new-post" method="post" onSubmit={editComment}>
                            <textarea name="new-comment-input" className="new-comment-input" id="" cols="30" rows="4" required={true} defaultValue={comment.content}></textarea>
                            <div className="wrapper">
                                <button className="submit" type="submit">Edit</button>
                                <button className="submit" type='button'><Link className="no-underline" to={`/posts/${postID}`}>Cancel</Link></button>
                            </div>
                        </form>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default EditComment;