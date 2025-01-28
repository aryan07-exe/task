
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/RoutesComponent'; // Import your routes setup

import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Initialize OneSignal when the component mounts
    const initOneSignal = async () => {
      if (window.OneSignal) {
        window.OneSignal = window.OneSignal || [];
        window.OneSignal.push(async function() {
          await window.OneSignal.init({
            appId: "76d17b95-84cd-4c4f-84ff-f0c725d908dc", // Your OneSignal App ID
          });
        });
      }
    };

    // Call the initialization function
    initOneSignal();
  }, []);

  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;