/* eslint-disable no-useless-catch */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const SPIN_ENDPOINT_URL = 'http://localhost:3001/spin';

interface SlotState {
  spinResults: string[];
  coins: number;
  coinsWon: number;
  errorMessage: string;
}

const initialState: SlotState = {
  spinResults: [],
  coins: 20,
  coinsWon: 0,
  errorMessage: '',
};

export const spin = createAsyncThunk('slot/spin', async () => {
  try {
    const response = await fetch(SPIN_ENDPOINT_URL);
    if (!response.ok) {
      throw new Error('Failed to spin');
    }
    const data = await response.json();
    return { spinResults: data.spinResults, coinsWon: data.coinsWon };
  } catch (error) {
    throw error;
  }
});

const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
    // -
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        spin.fulfilled,
        (
          state,
          action: PayloadAction<{ spinResults: string[]; coinsWon: number }>,
        ) => {
          state.spinResults = action.payload.spinResults;
          state.coins += action.payload.coinsWon - 1;
          state.coinsWon = action.payload.coinsWon;
          state.errorMessage = '';
        },
      )
      .addCase(spin.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown error occurred';
      });
  },
});

export default slotSlice.reducer;
