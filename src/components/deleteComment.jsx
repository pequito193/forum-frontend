import React from "react";
import { Link } from "react-router-dom";
import './../styles/logout.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DeleteComment(props) {

    const { JWT } = props;

    const [ postID, setPostID ] = useState();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://forum-api-production.up.railway.app/comments/${id}`)
        .then(response => {
            setPostID(response.data.postID);
        })
    }, [])

    // Sends delete request to the server
    function deleteComment() {
        axios.post('https://forum-api-production.up.railway.app/comments/delete', {
            commentID: id
        }, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                navigate(`/posts/${postID}`)
            }
        })
    }

    return(
        <React.Fragment>
            <p className="logout-message">Are you sure you want to delete your comment?</p>
            <div className="logout-form">
                <button className="logout-button" onClick={deleteComment}>Yes</button>
                <button className="logout-button"><Link className="logout-link" to={`/posts/${postID}`}>No</Link></button>
            </div>
        </React.Fragment>
    )
}

export default DeleteComment;