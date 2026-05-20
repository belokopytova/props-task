import React from 'react';
import Listing from './components/Listing';
import etsyData from './data/etsy.json';
import './css/main.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Listing items={etsyData} />
    </div>
  );
};

export default App;