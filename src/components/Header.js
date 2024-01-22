import React,{ useEffect } from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            // navigate("/");
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });        
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              const {uid,email,displayName} = user;
              dispatch(addUser({uid,email,displayName}));
              navigate("/browse");
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });   
          
          //unsubscribe when components unmounts
          return () => unsubscribe();
    },[]);    

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-44'
        src={LOGO}
        alt='logo'
      />
      {user && (
      <div className='flex p-3'>
      <img alt='User Icon' className='w-12 h-12' src={USER_AVATAR}/>
      <button onClick={handleSignOut} className='text-white font-bold p-2'>Sign Out</button>
    </div>
      )}

    </div>
  );
};

export default Header;
