import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedID: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const i = state.items.map((e) => e._id).indexOf(payload._id);
      if (i != -1) {
        state.items[i].quantity++;
      } else {
        payload.quantity = 1;
        state.items.push(payload);
      }
    },
    removeFromCart: (state, { payload }) => {
      const i = state.items.map((e) => e._id).indexOf(payload);
      if (i != -1) {
        state.items.splice(i, 1);
      }
    },
    removeOneFromCart: (state, { payload }) => {
      const i = state.items.map((e) => e._id).indexOf(payload);
      if (i != -1) {
        if (state.items[i].quantity > 1) {
          state.items[i].quantity--;
        } else {
          state.items.splice(i, 1);
        }
      }
    },
    clearCart: (state, { payload }) => {
      state.items = [];
    },
    selectItem: (state, { payload }) => {
      state.selectedID = payload;
    },
    clearSelectedItem: (state, { payload }) => {
      state.selectedID = "";
    },
  },
});

export const {
  addToCart,
  removeOneFromCart,
  removeFromCart,
  clearCart,
  selectItem,
  clearSelectedItem,
} = cartSlice.actions;

export default cartSlice.reducer;
