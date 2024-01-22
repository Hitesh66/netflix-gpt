import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGIN_BG } from '../utils/constants';


const Login = () => {

    const [isSignIn,setIsSignIn] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const toggleSignIn = () =>{
        setIsSignIn(!isSignIn);
    };

    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const handleButtonClick = () => {

        //Validate the form data
        let message=null;
        if(!isSignIn && name.current.value.length === 0){
            setErrorMessage("Name is a required field");
            message = "Name is a required field";
        }else{
            setErrorMessage(checkValidData(email.current.value,password.current.value));
            message = checkValidData(email.current.value,password.current.value)
        }
        if(message) return;

        if(!isSignIn){
            //Sign up form
            createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              updateProfile(auth.currentUser, {
                displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                // navigate("/browse");
                const {uid,email,displayName} = auth.currentUser;
                dispatch(addUser({uid,email,displayName}));
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message);
              });              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"-"+errorMessage);
            });            
        }else{
            //Sign in form
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
            //   navigate("/browse");

            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"-"+errorMessage);
            });            
        }
    };

  return (
    <div>
        <Header />
        <div className='absolute top-0 left-0 w-full h-full bg-cover'>
          <img
            src={LOGIN_BG}
            alt='logo'
            className='w-full h-full object-cover'
            />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-4/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-[#e5e5e5] bg-opacity-85 rounded-lg">
            <h1 className='text-3xl py-4'>{isSignIn ? "Sign In": "Sign Up"}</h1>
            {!isSignIn && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-[#b3b3b3] rounded-lg'/>}
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-[#b3b3b3] rounded-lg'/>
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full  bg-[#b3b3b3] rounded-lg'/>
            <p className='text-red-600 font-bold'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 rounded-lg' onClick={handleButtonClick} >{isSignIn ? "Sign In": "Sign Up"}</button>
            <p className='py-4 text-sm cursor-pointer' onClick={toggleSignIn}>
                {isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
            </p>
        </form>
    </div>
  )
}

export default Login