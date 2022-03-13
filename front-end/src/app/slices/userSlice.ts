import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: string;
  email: string;
  yearOfBirth: number;
  telephoneNumber: string;
  userType: string;
}

const initialState: IUser = {
  id: '',
  email: '',
  yearOfBirth: 4,
  telephoneNumber: '',
  userType: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      const { id, email, yearOfBirth, telephoneNumber, userType } = action.payload;

      return { id, email, yearOfBirth, telephoneNumber, userType };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
