import React from 'react';
import cherryPic from '../../../img/Cherry.png';
import applePic from '../../../img/Apple.png';
import bananaPic from '../../../img/Banana.png';
import lemonPic from '../../../img/Lemon.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import './RewardList.css';

const RewardsList: React.FC = () => {
  // Getting the amount of coins won by the user to highlight the winning combination in green color
  const coinsWon: number = useSelector(
    (state: RootState) => state.slot.coinsWon,
  );

  // Rendering the list of the rewards for combinations on the slot machine with pictures
  return (
    <div className="rewards-container">
      <h2>Rewards:</h2>
      <p>Note that all rewards are calculated starting from the first reel</p>
      <div className="reward-row">
        <div className={`reward${coinsWon === 40 ? ' green-text' : ''}`}>
          <img src={cherryPic} alt="Cherry" />
          <img src={cherryPic} alt="Cherry" />
          <p>2 cherries = 40 coins</p>
        </div>
        <div className={`reward${coinsWon === 50 ? ' green-text' : ''}`}>
          <img src={cherryPic} alt="Cherry" />
          <img src={cherryPic} alt="Cherry" />
          <img src={cherryPic} alt="Cherry" />
          <p>3 cherries = 50 coins</p>
        </div>
      </div>
      <div className="reward-row">
        <div className={`reward${coinsWon === 10 ? ' green-text' : ''}`}>
          <img src={applePic} alt="Apple" />
          <img src={applePic} alt="Apple" />
          <p>2 apples = 10 coins</p>
        </div>
        <div className={`reward${coinsWon === 20 ? ' green-text' : ''}`}>
          <img src={applePic} alt="Apple" />
          <img src={applePic} alt="Apple" />
          <img src={applePic} alt="Apple" />
          <p>3 apples = 20 coins</p>
        </div>
      </div>
      <div className="reward-row">
        <div className={`reward${coinsWon === 5 ? ' green-text' : ''}`}>
          <img src={bananaPic} alt="Banana" />
          <img src={bananaPic} alt="Banana" />
          <p>2 bananas = 5 coins</p>
        </div>
        <div className={`reward${coinsWon === 15 ? ' green-text' : ''}`}>
          <img src={bananaPic} alt="Banana" />
          <img src={bananaPic} alt="Banana" />
          <img src={bananaPic} alt="Banana" />
          <p>3 bananas = 15 coins</p>
        </div>
      </div>
      <div className="reward-row">
        <div className={`reward${coinsWon === 3 ? ' green-text' : ''}`}>
          <img src={lemonPic} alt="Lemon" />
          <img src={lemonPic} alt="Lemon" />
          <img src={lemonPic} alt="Lemon" />
          <p>3 lemons = 3 coins</p>
        </div>
      </div>
    </div>
  );
};

export default RewardsList;
