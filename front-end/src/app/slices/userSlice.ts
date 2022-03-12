import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  value: number;
}

const initialState: IUser = {
  value: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
