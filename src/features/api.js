import { createSlice } from "@reduxjs/toolkit";

const initialState = { res: {}, req: {} };

export const apiSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    setReq: (state, { payload }) => {
      state.req = {
        ...state.req,
        [payload.property]: payload.value,
      };
    },
    setRes: (state, { payload }) => {
      state.res = payload;
    },
    resetReq: (state, { payload }) => {
      state.req = {};
    },
    resetRes: (state, { payload }) => {
      state.res = {};
    },
  },
});

export const { setReq, setRes, resetReq, resetRes } = apiSlice.actions;

export default apiSlice.reducer;
