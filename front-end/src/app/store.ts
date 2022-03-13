import { configureStore } from '@reduxjs/toolkit';
import laoderSlice from './slices/laoderSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    loader: laoderSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
