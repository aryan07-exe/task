import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/RoutesComponent'; // Import your routes setup

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
