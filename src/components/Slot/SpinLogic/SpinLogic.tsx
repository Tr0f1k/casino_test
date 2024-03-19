import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { AppDispatch } from '../../Store';
import { spin, addCoins } from '../SlotSlice'; // Import addCoins action
import './SpinLogic.css'; // Import CSS file for styling
import lemonPic from '../../../img/Lemon.png';
import bananaPic from '../../../img/Banana.png';
import applePic from '../../../img/Apple.png';
import cherryPic from '../../../img/Cherry.png';

// Defining mapping for the fruit images
const fruitImages: Record<string, string> = {
  lemon: lemonPic,
  banana: bananaPic,
  apple: applePic,
  cherry: cherryPic,
};

const SpinLogic: React.FC = () => {
  // Accessing the state from the slice
  const { spinResults, coins, coinsWon, errorMessage } = useSelector(
    (state: RootState) => state.slot,
  );

  const dispatch: AppDispatch = useDispatch();

  // Accessing the action for fetching the spin result
  const handleSpin = async () => {
    await dispatch(spin());
  };

  // Accessing the action for adding 20 coins in case if user runs out of coins
  const handleAddCoins = () => {
    dispatch(addCoins.actions.addCoinsToCount(20));
  };

  // Rendering the slot machine. It is displaying the spin result as fruit pictures, the amount of coins that user currently has,
  // the amount of coins that user won from that spin, and spin button. If user runs out of coins, instead of spin button a new
  // button will appear by pressing which the user can get extra 20 coins. If user won any coins, the 'Coin won' will be highlited
  // in green.
  return (
    <div className="container">
      <div className="spin-results-container">
        <div className="fruit-images-container">
          {spinResults && spinResults.length > 0 ? (
            spinResults.map((result, index) => (
              <div key={index} className="fruit-image-wrapper">
                <img
                  src={fruitImages[result]}
                  alt={result}
                  className="fruit-image"
                />
              </div>
            ))
          ) : (
            <>
              <div className="fruit-image-wrapper">
                <img src={lemonPic} alt="Cherry" className="fruit-image" />
              </div>
              <div className="fruit-image-wrapper">
                <img src={applePic} alt="Cherry" className="fruit-image" />
              </div>
              <div className="fruit-image-wrapper">
                <img src={bananaPic} alt="Cherry" className="fruit-image" />
              </div>
            </>
          )}
        </div>
      </div>
      {coins > 0 ? (
        <div className="spin-container">
          <button onClick={handleSpin} className="spin-button">
            SPIN
          </button>
        </div>
      ) : (
        <div className="spin-container">
          <button onClick={handleAddCoins} className="add-coins-button">
            ADD COINS
          </button>
        </div>
      )}
      <h3 className="coins-text">Coins: {coins}</h3>
      {coinsWon >= 0 && (
        <h3 className={`coins-won-text ${coinsWon > 0 ? 'green-text' : ''}`}>
          Coins won: {coinsWon}
        </h3>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SpinLogic;
