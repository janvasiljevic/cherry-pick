import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoaderQueue {
  value: number;
}

const initialState: ILoaderQueue = {
  value: 0,
};

export const loaderSlice = createSlice({
  name: "loaderQueue",
  initialState,
  reducers: {
    pushLoad: (state) => {
      state.value += 1;
    },
    popLoad: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushLoad, popLoad } = loaderSlice.actions;
export default loaderSlice.reducer;
