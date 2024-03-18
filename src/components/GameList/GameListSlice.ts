import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Defining the structure of a single game object
interface Game {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  thumb: {
    url: string;
  } | null;
}

// Defining the structure of the game list state
interface GameListState {
  searchQuery: string;
  games: Game[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status to manage async operations
  error: string | null; // Error message if fetching games fails
}

// Defining the initial state for the game list
const initialState: GameListState = {
  searchQuery: '',
  games: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch games from the backend
export const fetchGames = createAsyncThunk('gameList/fetchGames', async () => {
  try {
    // Attempting to fetch games data from the backend API
    const response = await fetch(
      'https://casino-test-back.vercel.app/gamedata',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    // Parsing response data and returning it as an array of games
    const data = await response.json();
    return data as Game[];
  } catch (error) {
    throw new Error('An error occurred while fetching games');
  }
});

// Defining a slice of the Redux store for managing game list state
const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    // Reducer to update the search query in the state
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducers for handling asynchronous actions using extraReducers
    builder
      // Reducer for handling pending state of fetchGames async thunk
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading'; // Setting status to 'loading' when fetchGames is pending
      })
      // Reducer for handling fulfilled state of fetchGames async thunk
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Setting status to 'succeeded' when fetchGames is fulfilled
        state.games = action.payload; // Updating games array with fetched data
      })
      // Reducer for handling rejected state of fetchGames async thunk
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed'; // Setting status to 'failed' when fetchGames is rejected
        state.error = action.error.message ?? 'Failed to fetch games';
      });
  },
});

export const { setSearchQuery } = gameListSlice.actions;
export default gameListSlice.reducer;
