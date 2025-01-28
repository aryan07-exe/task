import React from 'react';
import { useRoutes } from 'react-router-dom';
// import ReminderPage from './ReminderPage';

import New from './New';
const RoutesComponent = () => {
  const routes = useRoutes([  
    { path: "/new", element: <New /> },
   
    //  { path: "/reminders", element: <ReminderPage /> },
  ]);

  return routes;
};

export default RoutesComponent;
