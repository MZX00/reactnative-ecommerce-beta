import { createSlice } from "@reduxjs/toolkit";

const initialState = { adress: "", payment: "cod" };

export const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAdress: (state, { payload }) => {
      state.address = payload;
    },
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
  },
});

export const { setAdress, setPayment } = checkout.actions;

export default checkout.reducer;
