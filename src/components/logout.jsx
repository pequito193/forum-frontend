import React from "react";
import { Link } from "react-router-dom";
import './../styles/logout.css'

function Logout() {

    return(
        <React.Fragment>
            <p className="logout-message">Are you sure you want to logout?</p>
            <form className="logout-form">
                <button type="submit" className="logout-button">Yes</button>
                <button type="button" className="logout-button"><Link className="logout-link" to='/'>No</Link></button>
            </form>
        </React.Fragment>
    )
}

export default Logout;