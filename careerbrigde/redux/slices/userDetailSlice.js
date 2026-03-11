import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice=createSlice({
    name:"userDetail",
    initialState:{
        user:{},
        provider:{},
        seeker:{},
        otp:""
    },
    reducers:{
         setUser:(state,action)=>{
            state.user=action.payload
        },
        setProviderDetail:(state,action)=>{
            state.provider=action.payload
        },
        setSeekerDetail:(state,action)=>{
            state.seeker=action.payload
        },
        setOtp:(state,action)=>{
            state.otp=action.payload
        },
        resetUserDetail: (state) => {
         state.user = {};
         state.provider = {};
         state.seeker = {};
         state.otp="";
       }
    }
});

export const { setUser, setProviderDetail, setSeekerDetail, setOtp, resetUserDetail} = userDetailSlice.actions;
export default userDetailSlice.reducer;