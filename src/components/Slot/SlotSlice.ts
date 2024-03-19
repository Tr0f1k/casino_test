/* eslint-disable no-useless-catch */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Endpoint URL for spinning the slot
const SPIN_ENDPOINT_URL = 'https://casino-test-back.vercel.app/spin';

// Defining the structure of slot
interface SlotState {
  spinResults: string[];
  coins: number;
  coinsWon: number;
  errorMessage: string;
}

// Defining initial state for slot machine
const initialState: SlotState = {
  spinResults: [],
  coins: 20,
  coinsWon: 0,
  errorMessage: '',
};

// Async thunk for spinning the slot
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

// Action for adding coins
export const addCoins = createSlice({
  name: 'slot/addCoins',
  initialState,
  reducers: {
    // Reducer to add coins to the current count
    addCoinsToCount(state, action: PayloadAction<number>) {
      state.coins += action.payload;
    },
  },
});

// Creating a slice for the slot
const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
    // No additional reducers defined
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        spin.fulfilled,
        (
          state,
          action: PayloadAction<{ spinResults: string[]; coinsWon: number }>, // Payload action with spin results and coins won
        ) => {
          state.spinResults = action.payload.spinResults; // Updating spin results
          state.coins += action.payload.coinsWon - 1; // Updating number of coins (subtracting 1 for each spin)
          state.coinsWon = action.payload.coinsWon; // Updating number of coins won
          state.errorMessage = '';
        },
      )
      .addCase(spin.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown error occurred';
      })
      .addCase(addCoins.actions.addCoinsToCount, (state, action) => {
        state.coins += action.payload; // Adding specified number of coins to the current count
      });
  },
});

export default slotSlice.reducer;
