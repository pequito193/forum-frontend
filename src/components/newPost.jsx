import React from "react";
import { Link } from "react-router-dom";
import './../styles/newPost.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost(props) {

    const { JWT } = props;

    const navigate = useNavigate();

    function newPost(e) {
        e.preventDefault();
        try {
            axios.post('/posts/new', {
                title: e.target[0].value,
                content: e.target[1].value,
                jwt: JWT
            })
            .then(response => {
                if (response.data.result === 'Success') {
                    navigate('/');
                }
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <h1 className="new-post-title">New Post</h1>
            <form className="new-post" method="post" onSubmit={newPost}>
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