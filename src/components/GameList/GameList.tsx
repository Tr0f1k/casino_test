import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { fetchGames } from './GameListSlice';
import { RootState } from '../Store';
import GameCard from './GameCard/GameCard';
import SearchBar from './SearchBar/SearchBar';
import AppTitle from '../Shared/AppTitle/AppTitle';
import AppNavBar from '../Shared/AppNavBar/AppNavBar';
import './GameList.css';

const GameList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, Action>>();
  const games = useSelector((state: RootState) => state.gameList.games);
  const status = useSelector((state: RootState) => state.gameList.status);
  const error = useSelector((state: RootState) => state.gameList.error);
  const searchQuery = useSelector(
    (state: RootState) => state.gameList.searchQuery,
  );

  // Fetching the games data
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  // Filtering games based on the search query
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  // Rendering the parent component of the game list page
  return (
    <div className="game-list-body">
      {/* App navigation bar component*/}
      <AppNavBar activeButton="gamelist" />
      {/* App title component */}
      <AppTitle title="Game List" />
      {/* Search bar component */}
      <SearchBar />
      <h4 className="note">
        Games with green background are available to play by pressing them
      </h4>
      {/* Rendering component with game list in case if fetch went through. Otherwise throw an error or loading message */}
      <div className="game-list-container">
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        {status === 'succeeded' &&
          filteredGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default GameList;
