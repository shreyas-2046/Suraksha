// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const storedToken = await AsyncStorage.getItem('token');

const initialState = {
  nearby: "This is the token i want to retreive from the local storage",
  // token: storedToken ? JSON.parse(storedToken) : null,
};

// Work to be done

//  fix the erro of async storage and next
const nearbySlice = createSlice({
  name: "nearby",
  initialState: initialState,
  reducers: {
    setNearby(state, action) {
      state.nearby = action.payload;
    },
  },
});



export const { setNearby } = nearbySlice.actions;



export const nearbyReducer = nearbySlice.reducer;
