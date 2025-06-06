import React,{useEffect} from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { auth } from "../Utils/firebase";
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import {addUser,removeUser} from "../Utils/Redux/userSlice.jsx";

function Body() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          // ...
          const {uid,email} = user;
          dispatch(addUser({uid:uid,email:email}));
          navigate("/browse");
    
        } else {
          // User is signed out
          // ...
          navigate("/");
          dispatch(removeUser());
        }
      });
    
  },[])
 
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Body;
