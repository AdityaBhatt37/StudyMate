import React, { useRef, useState, useEffect } from "react";
import { checkValidateData } from "../common/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,   
} from "firebase/auth";
import { auth } from "../Utils/firebase.js";
import { useNavigate } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import {addUser,removeUser} from "../Utils/Redux/userSlice.jsx";

function Login() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonclick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

    setErrorMsg(message);

    if (message) return; //if (message(means error)) then return from this function

    if (!isSignInForm) {
      //Sign Up Logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...

        
       
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      
          // ..
          setErrorMsg(errorCode + "\n" + errorMessage);
 
         
        });

    } else {
      //Sign In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
          // ...

        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "\n" + errorMessage);
     
          
        });
    }
  };





  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome to <span className="text-yellow-500">StudyMate</span>
        </h2>

        {isSignInForm ? null : (
          <div className="mb-4">
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="mb-4">
          <input
            ref={email}
            type="email"
            placeholder="Enter your Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <input
            ref={password}
            type="password"
            placeholder="Enter your Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-red-500 mt-2">{errorMsg}</p>
        </div>

        <button
          onClick={handleButtonclick}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignInForm ? "New to StudyMate? " : "Already have an account? "}

          <span
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            onClick={toogleSignInForm}
          >
            {isSignInForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
