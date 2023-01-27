import React from "react";
import { Link } from "react-router-dom";
import './../styles/logout.css';

function Logout(props) {

    const { logout } = props;

    return(
        <React.Fragment>
            <p className="logout-message">Are you sure you want to logout?</p>
            <div className="logout-form">
                <button className="logout-button" onClick={logout}><Link className="logout-link" to={'/'}>Yes</Link></button>
                <button className="logout-button"><Link className="logout-link" to={'/'}>No</Link></button>
            </div>
        </React.Fragment>
    )
}

export default Logout;