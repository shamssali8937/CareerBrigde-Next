import { createSlice } from "@reduxjs/toolkit";

const signupSlice=createSlice({
    name:"signup",
    initialState:{
        email:"",
        role:"",
        details:{}
    },
    reducers:{
        setEmail:(state,action)=>{
          state.email=action.payload
        },
        setRole:(state,action)=>{
          state.role=action.payload
        },
        setDetails:(state,action)=>{
          state.details=action.payload
        }
    }
});

export const {setEmail,setRole,setDetails}=signupSlice.actions;
export default signupSlice.reducer;