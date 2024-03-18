import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { setSearchQuery, fetchGames } from './GameListSlice';
import { RootState } from '../Store';
import './GameList.css';

const GameList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, Action>>(); // Creating a dispatch function
  const searchQuery = useSelector(
    (state: RootState) => state.gameList.searchQuery,
  );
  const games = useSelector((state: RootState) => state.gameList.games); // Getting games array from the Redux store
  const status = useSelector((state: RootState) => state.gameList.status); // Getting status from the Redux store
  const error = useSelector((state: RootState) => state.gameList.error); // Getting error message from the Redux store

  // useEffect hook to dispatch fetchGames action when the component mounts
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  // Event handler for handling search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValidInput = /^[a-zA-Z0-9]*$/.test(value); // Regular expression to match only English letters and numbers

    if (isValidInput && value.length <= 50) {
      // Checking if the input value is valid and its length doesn't exceed 50 characters
      dispatch(setSearchQuery(value));
    } else if (!isValidInput) {
      console.error(
        'Search query should contain only English letters and numbers (0-9)',
      );
    } else {
      console.error('Search query length cannot exceed 50 characters');
    }
  };

  // Filtering games based on the search query
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <div className="game-list-container">
      <h1>Game List</h1>
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <div className="game-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-item">
              <h2>{game.title}</h2>
              <p>Provider: {game.providerName}</p>
              {game.thumb && (
                <img
                  src={game.thumb.url}
                  alt={game.title}
                  className="game-thumb"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;
