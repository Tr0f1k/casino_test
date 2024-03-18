import React, { useState } from 'react';
import GameList from './GameList/GameList';
import Slot from './Slot/Slot';

function Main(): JSX.Element {
  const [showGameList, setShowGameList] = useState<boolean>(true);

  return (
    <div>
      <div>
        {/* These two buttons are providing the possibility to switch between two components of my app: the game list and the slot machine */}
        <button onClick={() => setShowGameList(true)}>Game List</button>
        <button onClick={() => setShowGameList(false)}>Slot</button>
      </div>
      {showGameList ? <GameList /> : <Slot />}
    </div>
  );
}

export default Main;
