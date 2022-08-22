import { createSlice } from "@reduxjs/toolkit";

const initialState = { address: { _id: "" }, payment: "cod" };

export const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
  },
});

export const { setAddress, setPayment } = checkout.actions;

export default checkout.reducer;
