import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { setSearchQuery, fetchGames } from './GameListSlice';
import { RootState } from '../Store';
import './GameList.css';

const GameList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, Action>>();
  const searchQuery = useSelector(
    (state: RootState) => state.gameList.searchQuery,
  );
  const games = useSelector((state: RootState) => state.gameList.games);
  const status = useSelector((state: RootState) => state.gameList.status);
  const error = useSelector((state: RootState) => state.gameList.error);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]); // Fetch games only once when component mounts

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

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
