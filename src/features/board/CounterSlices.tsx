import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; 
import { Counters } from './CountersType';

export const initialState: Counters = {
    Cards: 10
}

const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    updateCounter(state, action: PayloadAction<{ id: keyof Counters; total: number }>) {
      const { id, total } = action.payload;
      state[id] = total;
    },
  }
});

export const coutersRoot = (state: RootState) => state.counters;
export const { updateCounter } = countersSlice.actions;
export default countersSlice.reducer;

