// inde.js of reducers
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice"; // Import the correct authReducer from authSlice

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
