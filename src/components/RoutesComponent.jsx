import React from 'react';
import { useRoutes } from 'react-router-dom';
import ReminderPage from './ReminderPage';
import Dashboard from './Dashboard';
import New from './New';
import Collab from './Collab';
import Notes from './Notes';
const RoutesComponent = () => {
  const routes = useRoutes([  
    { path: "/new", element: <New /> },
    { path: "/dash", element: <Dashboard /> },
     { path: "/reminders", element: <ReminderPage /> },
     { path: "/collab", element: <Collab /> },
     { path: "/notes", element: <Notes /> },
  ]);

  return routes;
};

export default RoutesComponent;
