import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './../styles/logout.css';

function DeleteAccount(props) {

    const { JWT } = props;

    const navigate = useNavigate();

    function deleteAccount() {
        axios.post('/user/delete', null, {
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

    return(
        <React.Fragment>
            <p className="logout-message">Are you sure you want to delete your account?</p>
            <div className="logout-form">
                <button className="logout-button" onClick={deleteAccount}>Yes</button>
                <button className="logout-button"><Link className="logout-link" to={'/user'}>No</Link></button>
            </div>
        </React.Fragment>
    )
}

export default DeleteAccount;