import React from 'react';
import Header from './components/header';
import Main from './components/main';
import './styles/app.css';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function App() {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ JWT, setJWT ] = useState(localStorage.getItem('JWT') ? localStorage.getItem('JWT') : null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ search, setSearch ] = useState([]);

    const navigate = useNavigate();

    // Delete account function
    function deleteAccount() {
        axios.post('https://forum-api-production.up.railway.app/user/delete', null, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
        .then(response => {
            if (response.data.message === 'Success') {
                setJWT(undefined);
                localStorage.removeItem('JWT');
                navigate('/');
            }
        })
    }

    // Login function, fetches a login JSON web token from the server and stores it
    function login(e) {
        e.preventDefault();
        axios.post('https://forum-api-production.up.railway.app/user/login', {
            username: e.target[0].value,
            password: e.target[1].value
        })
        .then(response => {
            setErrorMessage(response.data.message);
            setJWT(response.data.accessToken);
        })
    }

    // Create a new user
    function signup(e) {
        e.preventDefault();
        axios.post('https://forum-api-production.up.railway.app/user/signup', {
            username: e.target[0].value,
            username_lowercase: e.target[0].value.toLowerCase(),
            email: e.target[1].value,
            password: e.target[2].value,
            confirmPassword: e.target[3].value
        })
        .then(response => {
            setErrorMessage(response.data.message);
            if (response.data.result === 'Success') {
                navigate('/user/login');
            }
        })
    }

    // Logout function, deletes JSON web token
    function logout() {
        setJWT(undefined);
        localStorage.removeItem('JWT');
        navigate('/');
    }

    // Function to search for a post
    function searchPost(e) {
        e.preventDefault();
        const searchParams = e.target[1].value;
        axios.get(`https://forum-api-production.up.railway.app/posts/search/${searchParams}`)
        .then(response => {
            if (response.data.message === 'Success') {
                e.target[1].value = '';
                setSearch(response.data.postsFound);
                navigate('/posts/search');
            }
        })
    }

    // Function that handles liking and disliking posts
    function likeOrDislikePost(e) {
        const image = e.target.src;
        const id = e.target.id;
        if (image.match(/\/media\/(.*?)\./)[1] === 'heart_empty') {
            axios.post('https://forum-api-production.up.railway.app/posts/likes/', {
                id: id,
                info: 'Like'
            }, {
                headers: {
                    Authorization: `Bearer ${JWT}`
                }
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
        else if (image.match(/\/media\/(.*?)\./)[1] === 'heart_full') {
            axios.post('https://forum-api-production.up.railway.app/posts/likes/', {
                id: id,
                info: 'Dislike'
            }, {
                headers: {
                    Authorization: `Bearer ${JWT}`
                }
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
    }

    // Function that handles liking and disliking comments
    function likeOrDislikeComment(e) {
        const image = e.target.src;
        const id = e.target.id;
        if (image.match(/\/media\/(.*?)\./)[1] === 'heart_empty') {
            axios.post('https://forum-api-production.up.railway.app/comments/likes/', {
                id: id,
                info: 'Like'
            }, {
                headers: {
                    Authorization: `Bearer ${JWT}`
                }
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
        else if (image.match(/\/media\/(.*?)\./)[1] === 'heart_full') {
            axios.post('https://forum-api-production.up.railway.app/comments/likes/', {
                id: id,
                info: 'Dislike'
            }, {
                headers: {
                    Authorization: `Bearer ${JWT}`
                }
            })
            .then(response => {
                if (response.data.message === 'Success') {
                    window.location.reload();
                }
            })
        }
    }

    // Sets user status
    useEffect(() => {
        if (JWT) {
            localStorage.setItem('JWT', JWT);
        }
        if (localStorage.getItem('JWT') === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [JWT])

    // Decodes JSON web token to obtain username
    useEffect(() => {
        if(!(localStorage.getItem('JWT') === null)) {
            const decoded_jwt = jwt_decode(JWT, process.env.REACT_APP_SECRET_ACCESS_KEY)
            setUsername(decoded_jwt.name);
        } else {
            setUsername('');
        }
    }, [isLoggedIn, JWT])

  return (
    <React.Fragment>
      <Header username={username} isLoggedIn={isLoggedIn} searchPost={searchPost} />
      <Main deleteAccount={deleteAccount} likeOrDislikePost={likeOrDislikePost} likeOrDislikeComment={likeOrDislikeComment} username={username} errorMessage={errorMessage} isLoggedIn={isLoggedIn} JWT={JWT} login={login} signup={signup} logout={logout} search={search} />
    </React.Fragment>
  );
}

export default App;
