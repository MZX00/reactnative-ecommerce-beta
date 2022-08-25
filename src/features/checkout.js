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
    clearCheckout: (state, { payload }) => {
      state.payment = "cod";
      state.address = { _id: "" };
    },
  },
});

export const { setAddress, setPayment, clearCheckout } = checkout.actions;

export default checkout.reducer;
