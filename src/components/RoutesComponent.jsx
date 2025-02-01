import React from 'react';
import { useRoutes } from 'react-router-dom';
import ReminderPage from './ReminderPage';
import Dashboard from './Dashboard';
import New from './New';
import Collab from './Collab';
import Notes from './Notes';
import Plan from './Planner';
const RoutesComponent = () => {
  const routes = useRoutes([  
    { path: "/new", element: <New /> },
    { path: "/", element: <Dashboard /> },
     { path: "/reminders", element: <ReminderPage /> },
     { path: "/collab", element: <Collab /> },
     { path: "/notes", element: <Notes /> },
  { path: "/plan", element: <Plan /> },
    ]);

  return routes;
};

export default RoutesComponent;
