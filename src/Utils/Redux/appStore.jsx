import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import geminiReducer from "../Redux/geminiSlice.jsx"
import firebaseReducer from "../Redux/firebaseSlice.jsx"
import adminReducer from "./adminSlice.jsx";

const appStore = configureStore({

    reducer:{

        user:userReducer,
        gemini:geminiReducer,
        firebase: firebaseReducer,
        admin:adminReducer

    }


});

export default appStore;