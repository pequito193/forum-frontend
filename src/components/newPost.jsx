import React from "react";
import { Link } from "react-router-dom";
import './../styles/newPost.css';

function NewPost() {

    return (
        <React.Fragment>
            <h1 className="new-post-title">New Post</h1>
            <form className="new-post" method="post" action="/posts">
                <input name='title' className="input" type="text" placeholder="Title" maxLength={50} required={true}/>
                <textarea name='post' className="input" type='text' rows={16} placeholder="Write your post here..." required={true}/>
                <div className="wrapper">
                    <button className="submit" type="submit">Create</button>
                    <button className="submit" type='button'><Link className="no-underline" to={'/'}>Cancel</Link></button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default NewPost;