import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GameList from './components/GameList/GameList';
import Slot from './components/Slot/Slot';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/gamelist" element={<GameList />} />
      <Route path="/slot" element={<Slot />} />
      <Route path="*" element={<Navigate to="/gamelist" />} />
    </Routes>
  );
}

export default App;
