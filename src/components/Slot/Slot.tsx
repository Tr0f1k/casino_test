import React from 'react';
import SpinLogic from './SpinLogic/SpinLogic';
import AppTitle from '../Shared/AppTitle/AppTitle';
import AppNavBar from '../Shared/AppNavBar/AppNavBar';
import RewardList from './RewardList/RewardList';
import './Slot.css';

// Rendering the parent component of the slot machine page
const Slot: React.FC = () => {
  return (
    <div className="slot-body">
      {/* App navigation component */}
      <AppNavBar activeButton="slot" />
      {/* App title component */}
      <AppTitle title="Slot Machine" />
      {/* Spin logic component */}
      <SpinLogic />
      {/* Reward list component */}
      <RewardList />
    </div>
  );
};

export default Slot;
