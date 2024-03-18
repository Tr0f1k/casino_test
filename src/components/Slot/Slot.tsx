import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { AppDispatch } from '../Store';
import { spin } from './SlotSlice';

const Slot: React.FC = () => {
  const { spinResults, coins, coinsWon, errorMessage } = useSelector(
    (state: RootState) => state.slot,
  );
  const dispatch: AppDispatch = useDispatch();

  const handleSpin = async () => {
    await dispatch(spin());
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
