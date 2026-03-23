import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice";
import userDetailReducer from "./slices/userDetailSlice";
import appliedJobsReducer from "./slices/appliedJobSlice"
const store= configureStore({
     reducer:{
        signup:signupReducer,
        userDetail:userDetailReducer,
        appliedJobs:appliedJobsReducer,
     }
})

export default store;