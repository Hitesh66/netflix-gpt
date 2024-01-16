import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignIn,setIsSignIn] = useState(true);
    const toggleSignIn = () =>{
        setIsSignIn(!isSignIn);
    };

  return (
    <div>
        <Header />
        <div className='absolute'>
          <img
            src='https://thefatork.store/cdn/shop/articles/netflix.jpg?v=1669877376&width=1400'
            alt='logo'
            />
        </div>
        <form className="w-4/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-[#e5e5e5] bg-opacity-85 rounded-lg">
            <h1 className='text-3xl py-4'>{isSignIn ? "Sign In": "Sign Up"}</h1>
            {!isSignIn && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-[#b3b3b3] rounded-lg'/>}
            <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-[#b3b3b3] rounded-lg'/>
            <input type='password' placeholder='Password' className='p-4 my-4 w-full  bg-[#b3b3b3] rounded-lg'/>
            <button className='p-4 my-6 bg-red-700 rounded-lg'>{isSignIn ? "Sign In": "Sign Up"}</button>
            <p className='py-4 text-sm cursor-pointer' onClick={toggleSignIn}>
                {isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
            </p>
        </form>
    </div>
  )
}

export default Login