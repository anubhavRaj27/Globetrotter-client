import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser : (state, action) => {
      state.user = action.payload;
    },
    updateUserCities : (state,action) => {
      state.user.cities.push(action.payload);
      state.user.currentCityId = action.payload;
    }
  },
});

export const { setLogin,updateUser,updateUserCities } = authSlice.actions;
export default authSlice.reducer;
