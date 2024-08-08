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
import ProductPage from './pages/ProductPage.jsx';
import AiIntervuePage from './pages/AiIntervuePage.jsx';
import ResumeBuilder from './products/resumeBuilder.jsx';
import ResumeAnalysis from './products/resumeAnalysis.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App />
      </div>
    ),
  },
  {
    path: "/meeting",
    element: <MeetingPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/ai_intervue",
    element: <AiIntervuePage />,
  },
  {
    path: "/product/resumeBuilder",
    element: <ResumeBuilder/>,
  },
  {
    path: "/product/resumeAnalysis",
    element: <ResumeAnalysis />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)