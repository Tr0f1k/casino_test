import React from 'react';
import './AppTitle.css';

interface AppTitleProps {
  title: string;
}

// This component is used to render the page title
const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
  return (
    <div className="app-title">
      <h1>{title}</h1>
    </div>
  );
};

export default AppTitle;
