// inde.js of reducers
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice"; // Import the correct authReducer from authSlice
import { nearbyReducer } from "../slices/nearbySlice"; // Import the correct nearbyReducer from nearbySlice
const rootReducer = combineReducers({
  auth: authReducer,
  nearby: nearbyReducer,
});

export default rootReducer;
