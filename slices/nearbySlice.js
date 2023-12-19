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

// const saveData = async () => {
//   try {
//     // Your data to be saved
//     const data =0;

//     // Convert data to a string (AsyncStorage can only store strings)
//     const dataString = JSON.stringify(data);

//     // Save data to AsyncStorage
//     await AsyncStorage.setItem('yourKey', dataString);

//     console.log('Data saved successfully!');
//   } catch (error) {
//     console.error('Error saving data:', error);
//   }
// };



export const nearbyReducer = nearbySlice.reducer;
