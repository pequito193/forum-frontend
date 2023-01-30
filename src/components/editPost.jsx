import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EditPost(props) {

    const { JWT } = props;

    const [ post, setPost ] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/posts/${id}`)
        .then(response => {
            setPost(response.data.post);
        })
    }, [])

    // Handles the request for editing a post
    function editPost(e) {
        e.preventDefault();
        const newTitle = e.target[0].value;
        const newContent = e.target[1].value;
        axios.post('/posts/edit', {
            id: id,
            title: newTitle,
            content: newContent
        }, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                navigate(`/forum-frontend/posts/${id}`);
            }
        })
    }

    return(
        <React.Fragment>
            {post.map((post, i) => {
                return(
                    <div key={post.id}>
                        <h1 className="new-post-title">Edit Post</h1>
                        <form className="new-post" method="post" onSubmit={editPost}>
                            <input name='title' className="input" type="text" maxLength={50} defaultValue={post.title} required={true} />
                            <textarea name='post' className="input" type='text' rows={16} defaultValue={post.content} required={true}/>
                            <div className="wrapper">
                                <button className="submit" type="submit">Edit</button>
                                <button className="submit" type='button'><Link className="no-underline" to={`/forum-frontend/posts/${id}`}>Cancel</Link></button>
                            </div>
                        </form>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default EditPost;