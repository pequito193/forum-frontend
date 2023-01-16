import axios from "axios";
import React from "react";
import { useEffect } from "react";
import './../styles/postList.css';

function Posts() {

    const posts = [];

    useEffect(() => {
        axios.get('/posts/')
        .then(response => {
            for (let i = 0; i < response.data.data.length; i++) {
                posts.push(
                    response.data.data[i]
                    // <div className='post' key={response.data.data[i]}>
                    //     <p className="post-title">{response.data.data[i].title}</p>
                    //     <p className="post-content">{response.data.data[i].content}</p>
                    //     <p className="post-date">{response.data.data[i].date}</p>
                    //     <p className="post-likes">{response.data.data[i].likes}</p>
                    // </div>
                )
            }
            console.log(response.data.data, posts)
        })
    }, []);
   
    return (
        <React.Fragment>
            {posts}
        </React.Fragment>
    );
}

export default Posts;