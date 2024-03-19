import React from 'react';
import { Game } from '../GameListSlice';
import no_image from '../../../img/no_image.jpg';
import '../GameList.css';

// Passing props with game data
interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Adding ability to access the games that have startUrl by clicking on their card
  const handleGameClick = () => {
    if (game.startUrl) {
      window.location.href = game.startUrl;
    }
  };

  // Rendering the game data. If the game has startUrl, it will have green background. If the game does not have
  // a game.thumb.url property, then it will render a placeholder instead
  return (
    <div
      className={`game-item${game.startUrl ? ' with-start-url' : ''}`}
      onClick={handleGameClick}
    >
      {game.thumb ? (
        <img src={game.thumb.url} alt={game.title} className="game-thumb" />
      ) : (
        <img src={no_image} alt={game.title} className="game-thumb" />
      )}
      <h2>{game.title}</h2>
      <p>Provider: {game.providerName}</p>
    </div>
  );
};

export default GameCard;
