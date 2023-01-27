import React from "react";
import { Link } from "react-router-dom";
import './../styles/logout.css';

function DeleteAccount(props) {

    const { deleteAccount } = props;

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