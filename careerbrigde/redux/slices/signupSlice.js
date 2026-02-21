import { createSlice } from "@reduxjs/toolkit";

const signupSlice=createSlice({
    name:"signup",
    initialState:{
        email:"",
        role:""
    },
    reducers:{
        setEmail:(state,action)=>{
          state.email=action.payload
        },
        setRole:(state,action)=>{
          state.role=action.payload
        }
    }
});

export const {setEmail,setRole}=signupSlice.actions;
export default signupSlice.reducer;