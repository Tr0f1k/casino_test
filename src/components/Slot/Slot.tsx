import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { AppDispatch } from '../Store';
import { spin } from './SlotSlice';

// Functional component for the slot machine
const Slot: React.FC = () => {
  // Selecting relevant state variables using useSelector hook
  const { spinResults, coins, coinsWon, errorMessage } = useSelector(
    (state: RootState) => state.slot, // Extracting state values from RootState using useSelector
  );
  // Getting dispatch function using useDispatch hook
  const dispatch: AppDispatch = useDispatch(); // Defining dispatch type as AppDispatch
  // Asynchronous function to handle spin action
  const handleSpin = async () => {
    await dispatch(spin()); // Dispatching the spin action to Redux store
  };

  return (
    <div>
      <h1>Slot Machine</h1>
      <button onClick={handleSpin} disabled={coins === 0}>
        Spin
      </button>
      <p>Coins: {coins}</p>
      {coinsWon >= 0 && <p>Coins won: {coinsWon}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {coins === 0 && <p>Sorry, you ran out of coins</p>}
      {spinResults && <p>Spin results: {spinResults.join(' ')}</p>}
    </div>
  );
};

export default Slot;
