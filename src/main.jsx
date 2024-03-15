import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Events from './events/Events.jsx';
import Event from './events/Event.jsx';
import ErrorPage from './router/ErrorPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/events',
        element: <Events />,
        children: [],
      },
      {
        path: '/events/:id',
        element: <Event />,
      },
    ],
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />} errorElement={<ErrorPage />}>
//       <Route path='/events' element={<Events />}>
//         <Route path='/:id' element={<Event />} />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
