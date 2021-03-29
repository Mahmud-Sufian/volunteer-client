import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
 
 

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(userContext);


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });


    const handleSignIn = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFormValid = isEmailValid;
        }
        if (e.target.name === 'password') {
            const isPasswordLength = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordLength && isPasswordHasNumber;
        }
        if (isFormValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user };
                    newUser.success = true;
                    newUser.error = "";
                    setUser(newUser);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.success = false;
                    newUser.error = error.message;
                    setUser(newUser);
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user };
                    newUser.success = true;
                    newUser.error = "";
                    newUser.name = res.user.displayName;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                    // console.log('sign in user', res.user.displayName)

                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.success = false;
                    newUser.error = error.message;
                    setUser(newUser);
                });
        }

        if (!user.email || !user.password) {
            const newUser = { ...user };
            newUser.error = <p>Email or Password is Invalid.. please Try again</p>
            console.log(newUser.error);
            setUser(newUser);
        }
    }

    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    const HandleFbSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then((result) => {  
                const user = result.user;
                setUser(user);
                
            }).catch((error) => { 
                const errorMessage = error.message;  
               setUser(errorMessage)
            });
    }


    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
                <label htmlFor="newUser">Creat Account</label>
                {newUser && <input type="text" name="name" onBlur={handleSignIn} placeholder="Your Name" required />}
                <input type="text" name="email" onBlur={handleSignIn} placeholder="Your Email" required />
                <input type="password" name="password" onBlur={handleSignIn} placeholder="Your Password" required />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
                <button class="btn btn-danger" style={{ width: '100%' }} onClick={HandleFbSignIn} ><FacebookIcon></FacebookIcon> Sign In With Facebook</button>
            </form>


            <p style={{ color: 'red', textAlign: 'center' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green', textAlign: 'center' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
            }


        </div>
    );
};

export default Login;