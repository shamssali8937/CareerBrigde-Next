import { createSlice } from "@reduxjs/toolkit";


const appliedJobSlice=createSlice({
    name:"appliedJobs",
    initialState:{
        applications:[],
        jobs:[]
    },
    reducers:{
        addAppliedJobs:(state,action)=>{
         state.applications = action.payload;
        },
        setJobs:(state,action)=>{
          state.jobs=action.payload;
        },
        resetJobs:(state)=>{
          state.applications=[];
          state.jobs=[];
        },
        hideJob: (state, action) => {
         const idx = state.applications.findIndex(app => app.apId === action.payload);
         if (idx > -1) {
           state.applications[idx].isdelete = true;
         }
       }
    }
});

export const {addAppliedJobs,setJobs,resetJobs,hideJob} =appliedJobSlice.actions;

export default appliedJobSlice.reducer;