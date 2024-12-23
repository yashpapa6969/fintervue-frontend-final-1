import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";

import { UserProvider } from "./context/UserProvider";

import "./styles/index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import * as Lazy from "./components/lazy-load";
import { Loader } from "./loader";
import { NotFoundPage } from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage.jsx";
import FinalInterviewPage from "./pages/finalInterview.jsx";
import AIAnalysisPage from "./pages/AiAnalysis.jsx";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

import ResumeBuilderPage from "./products/resumeBuilder";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import config from "./config";

SuperTokens.init({
    appInfo: {
        apiDomain: `${config.uploadBaseUrl}`,
        apiBasePath: "/api",
        appName: "...",
    },
    recipeList: [Session.init(), ThirdParty.init(), EmailPassword.init()],
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
        element: (
            <UserProvider>
                <ProtectedRoute>
                    <AIAnalysisPage />
                </ProtectedRoute>
            </UserProvider>
        ),
    },
    {
        path: "/signup",
        element: <Lazy.SignUpPage />,
    },
    {
        path: "/signup/candidate",
        element: (
            <UserProvider>
                <Lazy.CandidateSignupPage />
            </UserProvider>
        ),
    },
    {
        path: "/signup/organisation",
        element: <Lazy.SignupOrgPage />,
    },
    {
        path: "/forgotpw",
        element: <ForgotPassword />,
    },
    {
        path: "/signup/interviewer",
        element: (
            <UserProvider>
                <Lazy.SignupInterviewerPage />
            </UserProvider>
        ),
    },

    {
        path: "/login/interviewer",
        element: (
            <UserProvider>
                <Lazy.LoginInterviewer />
            </UserProvider>
        ),
    },
    {
        path: "/login/candidate",
        element: (
            <UserProvider>
                <Lazy.LoginInterviewe />,
            </UserProvider>
        ),
    },
    {
        path: "/product",
        element: (
            <ProtectedRoute>
                <ProductPage />
            </ProtectedRoute>
        ),
    },

    {
        path: "/product/ai_intervue",
        element: (
            <ProtectedRoute>
                <Lazy.AiIntervuePage />
            </ProtectedRoute>
        ),
    },

    {
        path: "/product/resumeBuilder",
        element: <ResumeBuilderPage />,
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
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <HMSRoomProvider>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
            </Suspense>
        </HMSRoomProvider>
    </ChakraProvider>
);
