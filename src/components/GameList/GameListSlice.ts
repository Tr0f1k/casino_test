import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  thumb: {
    url: string;
  } | null;
}

interface GameListState {
  searchQuery: string;
  games: Game[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GameListState = {
  searchQuery: '',
  games: [],
  status: 'idle',
  error: null,
};

export const fetchGames = createAsyncThunk('gameList/fetchGames', async () => {
  try {
    const response = await fetch('http://localhost:3001/gamedata');
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    return data as Game[];
  } catch (error) {
    throw new Error('An error occurred while fetching games');
  }
});

const gameListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch games';
      });
  },
});

export const { setSearchQuery } = gameListSlice.actions;
export default gameListSlice.reducer;
