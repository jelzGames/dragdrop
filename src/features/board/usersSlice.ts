import { createSlice } from '@reduxjs/toolkit';
import { User } from "./userstypes"
import { RootState } from '../../app/store'; 
import { dataUsers } from '../../data/users'

export const initialState: User[] = dataUsers

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  }
  
});

export const usersRoot = (state: RootState) => state.users;
export const {  } = usersSlice.actions;
export default usersSlice.reducer;

