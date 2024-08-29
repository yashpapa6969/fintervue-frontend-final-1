import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.css";
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {
  AboutPage,
  AiIntervuePage,
  CandidateSignupPage,
  ContactPage,
  DisplayPage,
  EmployeeLoginPage,
  HomePage,
  InterviewerSignupPage,
  JobDetailPage,
  LoginPage,
  MeetingPage,
  PricingPage,
  PrivacyPolicyPage,
  ProductPage,
  RefundsAndCancellationPage,
  ResumeAnalysisPage,
  ResumeBuilderPage,
  SignupOrgPage,
  SignUpPage,
  TocPage
} from './components/lazy-load';
import { Loader } from './loader';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/meeting",
    element: <MeetingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signup/candidate",
    element: <CandidateSignupPage />,
  },
  {
    path: "/signup/interDashboardviewer",
    element: <InterviewerSignupPage />,
  },
  {
    path: "/signup/organisation",
    element: <SignupOrgPage />,
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
    element: <ResumeBuilderPage />,
  },
  {
    path: "/product/resumeAnalysis",
    element: <ResumeAnalysisPage />,
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
    element: <HomePage />,
  },
  {
    path: "/Employee-login",
    element: <EmployeeLoginPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ChakraProvider>
  </React.StrictMode>,
)