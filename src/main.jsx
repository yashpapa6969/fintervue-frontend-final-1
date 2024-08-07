import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.css";
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MeetingPage from './pages/MeetingPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div >
        <App />
      </div>
    )
  }, 
  {
    path: "/meeting/:id",
    element: (
      <MeetingPage />
    )
  }, 
  {
    path: "/signup",
    element: (
      <SignupPage />
    )
  },
  {
    path: "/login",
    element: (
      <LoginPage />
    )
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
