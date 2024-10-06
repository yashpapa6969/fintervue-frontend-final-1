import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import "./styles/index.css";
import createStore from 'react-auth-kit/createStore'
import App from './App.jsx'
import RequireAuth from '@auth-kit/react-router/RequireAuth'

import AuthProvider from 'react-auth-kit'

import { ChakraProvider } from '@chakra-ui/react'
import * as Lazy from './components/lazy-load';
import { Loader } from './loader';
import { NotFoundPage } from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage.jsx';
import FinalInterviewPage from './pages/finalInterview.jsx';
import About from './components/footerComponents/about.jsx';
import JoinForm from './pages/JoinInterview.jsx';
import Conference from './pages/Conference.jsx';
import ScheduleInterviewForm from './pages/scheduleInterview.jsx';
import PendingInterviews from './pages/pendingInterview.jsx';
import UpcomingInterviews from './pages/upcomingInterviews.jsx';


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});


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
    path: "/analysis",
    element: <Lazy.aIAnalysis />,
  },
  {
    path: "/signup",
    element: <Lazy.SignUpPage />,
  },
  {
    path: "/signup/candidate",
    element: <Lazy.CandidateSignupPage />,
  },
  {
    path: "/signup/interDashboardviewer",
    element: <>bxsjbckjbdc</>,
  },
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
    element: <RequireAuth fallbackPath='/signup'>
      <About />
    </RequireAuth>,
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
    element: <ScheduleInterviewForm/>,
  },
  {
    path: "/pendingInterviews",
    element: <PendingInterviews/>,
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
    element: <UpcomingInterviews/>,
  },

  {
    // In the route definition
    path: "/finalInterviewPage",
    element: <FinalInterviewPage />,
  }, {
    path: "/join",
    element: <JoinForm />
  }, {
    path: "/conference",
    element: <Conference />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
      store={store}
    >
      <ChakraProvider>
        <HMSRoomProvider>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </HMSRoomProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>

);

