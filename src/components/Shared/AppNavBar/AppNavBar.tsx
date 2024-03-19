import React from 'react';
import { Link } from 'react-router-dom';
import './AppNavBar.css';

interface AppNavBarProps {
  activeButton: 'gamelist' | 'slot';
}

// This component is rendering two buttons that lets user navigate between the page with games list and slot machine
const AppNavBar: React.FC<AppNavBarProps> = ({ activeButton }) => {
  return (
    <div className="nav-buttons">
      <Link to="/gamelist">
        <button className={activeButton === 'gamelist' ? 'active' : ''}>
          Game List
        </button>
      </Link>
      <Link to="/slot">
        <button className={activeButton === 'slot' ? 'active' : ''}>
          Slot
        </button>
      </Link>
    </div>
  );
};

export default AppNavBar;
