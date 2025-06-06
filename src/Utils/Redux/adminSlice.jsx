import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({

    name:'admin',
    initialState : {

        adminEmailAndPassword: null
    },

    reducers:{

        addAdminEmailAndPassword: (state,action) =>{

            const {email,password} = action.payload;

            state.adminEmailAndPassword = {email,password};
        },

        removeAdminEmailAndPassword: (state)=>{

            state.adminEmailAndPassword = null;
        }
    }

})

export const {addAdminEmailAndPassword,removeAdminEmailAndPassword} = adminSlice.actions;
export default adminSlice.reducer;