import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Post() {

    const [ post, setPost ] = useState();
    const [ comments, setComment ] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/posts/${id}`)
        .then(response => {
            setPost(response.data.post);
            setComment(response.data.comments);
        })
    }, [])

    return (
        <React.Fragment>
            {post}
            {comments}
        </React.Fragment>
    )
}

export default Post;