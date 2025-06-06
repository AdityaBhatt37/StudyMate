```jsx
import React,{useEffect} from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import {auth} from "../Utils/firebase";
// import {useDispatch} from "react-redux";
// import {addUser,removeUser} from "../Utils/Redux/userSlice";
// import { useNavigate } from 'react-router';

function Browse() {
  
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {

  //   const unsubscribed = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       const {uid,email} = user;
        
  //       dispatch(addUser({uid:uid,email:email}));
  //       navigate("/browse");
        
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //       dispatch(removeUser());
  //       navigate("/");
  //     }
  //   });

  //   return () => unsubscribed();
    
  // }, []);

  return (

    <div>Browse</div>
  )
}

export default Browse
```