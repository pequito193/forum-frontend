import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import './../styles/user.css'
import { Link } from 'react-router-dom'

function User(props) {

    const { JWT } = props;

    const [ user, setUser ] = useState([]);
    const [ postCount , setPostCount ] = useState();
    const [ commentCount , setCommentCount ] = useState();    

    useEffect(() => {
        axios.get('/user', {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            setUser(response.data.user);
            setPostCount(response.data.postCount);
            setCommentCount(response.data.commentCount);
        })
    }, [])

    return(
        <div className="account-info-wrapper">
            <h2 className="account-info-title">Account Details</h2>
            {user.map((user, i) => {
                return(
                    <React.Fragment key={i}>
                        <p className="account-info">Username - {user.username}</p>
                        <p className="account-info">Email - {user.email}</p>
                        <p className="account-info">Posts - {postCount}</p>
                        <p className="account-info">Comments - {commentCount}</p>
                        <p className="account-info">Created at - {moment(user.date_created).format("HH:mm, Do MMMM of YYYY")}</p>
                    </React.Fragment>
                )
            })}
            <h2 className="account-info-title">Account Actions</h2>
            <Link to={'/forum-frontend/user/delete'} className="submit delete-account-button">Delete Account</Link>
        </div>
    )
}

export default User;