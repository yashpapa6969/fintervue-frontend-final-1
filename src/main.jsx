import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";

import "./styles/index.css";
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import * as Lazy from './components/lazy-load';
import { Loader } from './loader';
import { NotFoundPage } from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage.jsx';
import FinalInterviewPage from './pages/finalInterview.jsx';
import AIAnalysisPage from './pages/AiAnalysis.jsx';

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
    element: <Lazy.MeetingPage />,
  },
 
    
{
  // In the route definition
  path: "/analysis",
  element: <AIAnalysisPage />,
},
  {
    path: "/signup",
    element: <Lazy.SignUpPage />,
  },
  {
    path: "/signup/candidate",
    element: <Lazy.CandidateSignupPage />,
  },
  // {
  //   path: "/signup/interDashboardviewer",
  //   element: <Lazy.InterviewerSignupPage />,
  // },
  {
    path: "/signup/organisation",
    element: <Lazy.SignupOrgPage />,
  },
  {
    path: "/signup/interviewer",
    element: <Lazy.SignupInterviewerPage />,
  },

  {
    path: "/login/interviewer",
    element: <Lazy.LoginInterviewer />,
  },
  {
    path: "/login/candidate",
    element: <Lazy.LoginInterviewe />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/ai_intervue",
    element: <Lazy.AiIntervuePage />,
  },
  {
    path: "/product/resumeBuilder",
    element: <Lazy.ResumeBuilderPage />,
  },
  {
    path: "/product/resumeAnalysis",
    element: <Lazy.ResumeAnalysisPage />,
  },
  {
    path: "/TOC",
    element: <Lazy.TocPage />,
  },
  {
    path: "/Contact",
    element: <Lazy.ContactPage />,
  },
  {
    path: "/About",
    element: <Lazy.AboutPage />,
  },
  {
    path: "/PrivacyPolicy",
    element: <Lazy.PrivacyPolicyPage />,
  },
  {
    path: "/Pricing",
    element: <Lazy.PricingPage />,
  },
  {
    path: "/RefundsAndCancellation",
    element: <Lazy.RefundsAndCancellationPage />,
  },
  {
    path: "/display",
    element: <Lazy.DisplayPage />,
  },
  {
    path: "/display/job",
    element: <Lazy.JobDetailPage />,
  },
  {
    path: "/home",
    element: <Lazy.HomePage />,
  },
  {
    path: "/employee-profile",
    element: <Lazy.EmployeeProfilePage />,
  },
  {
    path: "/thank-you",
    element: <Lazy.ThankYou />,
  },
  {
    path: "/scheduleInterview",
    element: <Lazy.ScheduleInterviewForm />,
  },
  {
    path: "/pendingInterviews",
    element: <Lazy.PendingInterviews />,
  },
  
  {
    path: "product/resumeSelect",
    element: <Lazy.ResumeSelect />,
  },
  {
    path: "/jobAssign",
    element: <Lazy.JobSchedule />,
  },
  {
    path: "/upcomingInterviews",
    element: <Lazy.UpcomingInterviews />,
  },
  
{
  // In the route definition
  path: "/finalInterviewPage",
  element: <FinalInterviewPage />,
}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <HMSRoomProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </HMSRoomProvider>
    </ChakraProvider>
  </React.StrictMode>
);

