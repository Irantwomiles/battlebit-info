import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import './App.scss';

import ServerBrowser from './components/ServerBrowser';
import Header from "./components/Header";


const router = createBrowserRouter([
    {
        path: "/",
        element: <ServerBrowser />
    },
    {
        path: "/weapons",
        element: <i className={"fa-regular fa-sun"} />
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Header />
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
