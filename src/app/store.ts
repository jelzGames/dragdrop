import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from  '../features/board/columnsSlice';
import usersSlice from "../features/board/usersSlice"
import countersSlice from "../features/board/CounterSlices"

export const store = configureStore({
  reducer: {
    columns: columnsSlice,
    users: usersSlice,
    counters: countersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
