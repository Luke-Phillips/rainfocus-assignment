import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Events from './events/Events.jsx';
import Event, { loader as eventLoader } from './events/Event.jsx';
import EventEdit from './events/EventEdit.jsx';
import ErrorPage from './router/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/events',
    element: <Events />,
  },
  {
    path: '/events/:id',
    element: <Event />,
    loader: eventLoader,
  },
  {
    path: '/events/:id/edit',
    element: <EventEdit />,
    loader: eventLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
