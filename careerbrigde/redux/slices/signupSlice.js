import { createSlice } from "@reduxjs/toolkit";

const signupSlice=createSlice({
    name:"signup",
    initialState:{
        email:"",
        role:"",
        details:{},
        seekerInfo:{},
        providerInfo:{}
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
        },
        setSeekerInfo: (state, action) => {
          state.seekerInfo = action.payload;
        },
        setProviderInfo: (state, action) => {
          state.providerInfo = action.payload;
        },
        resetSignup: (state) => {
          state.email = "";
          state.role = "";
          state.details = {};
          state.seekerInfo = {};
          state.providerInfo = {};
        }
    }
});

export const {setEmail,setRole,setDetails,setSeekerInfo, setProviderInfo, resetSignup}=signupSlice.actions;
export default signupSlice.reducer;