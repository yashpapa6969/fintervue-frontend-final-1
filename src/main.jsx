import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.css";
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import SignupPage2 from './pages/signupPage2.jsx';
import DisplayPage from './pages/DisplayPage.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import SignupOrg from './pages/signupOrg.jsx';
import Employee from './User_Profile/Employee-login.jsx'



const SignupPage = React.lazy(() => import("./pages/SignupPage.jsx"));
const InterviewerSignupPage = React.lazy(() => import("./pages/InterviewerSignupPage.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const MeetingPage = React.lazy(() => import("./pages/MeetingPage.jsx"));
const ProductPage = React.lazy(() => import("./pages/ProductPage.jsx"));
const AiIntervuePage = React.lazy(() => import("./pages/AiIntervuePage.jsx"));
const ResumeBuilder = React.lazy(() => import("./products/resumeBuilder.jsx"));
//const userDashboard = React.lazy(() => import("./User_Profile/userDashboard.jsx"));

const TocPage = React.lazy(() => import("./pages/TocPage.jsx"));
const RefundsAndCancellationPage = React.lazy(() => import("./pages/RefundsAndCancellationPage.jsx"));
const ContactPage = React.lazy(() => import("./pages/ContactPage.jsx"));
const AboutPage = React.lazy(() => import("./pages/AboutPage.jsx"));
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const PricingPage = React.lazy(() => import("./pages/PricingPage.jsx"));

const ResumeAnalysis = React.lazy(() =>
  import("./products/resumeAnalysis.jsx")
);

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
    element: <SignupPage2 />,
  },
  {
    path: "/signup/candidate",
    element: <SignupPage />,
  },
  {
    path: "/signup/interDashboardviewer",
    element: <InterviewerSignupPage />,
  },
  {
    path: "/signup/organisation",
    element: <SignupOrg />,
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
    element: <ResumeBuilder />,
  },
  {
    path: "/product/resumeAnalysis",
    element: <ResumeAnalysis />,
  },
  {
    path: "/TOC",
    element: <TocPage />,
  },
  {
    path: "/Contact",
    element: <ContactPage />,
  },
  {
    path: "/About",
    element: <AboutPage />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/Pricing",
    element: <PricingPage />,
  },
  {
    path: "/RefundsAndCancellation",
    element: <RefundsAndCancellationPage />,
  },
  {
    path: "/display",
    element: <DisplayPage />,
  },
  {
    path: "/display/job",
    element: <JobDetailPage />,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/Employee-login",
    element: <Employee/>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)