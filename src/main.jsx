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
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GoogleOauthCallbackPage from "./pages/GoogleOauthCallbackPage";

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
    // Not Found Page
    {
        path: "*",
        element: <NotFoundPage />,
    },
    // Home Page
    {
        path: "/",
        element: <App />,
    },
    // Auth routes
    {
        path: "/signup",
        children: [
            { path: "", element: <Lazy.AllSignUpPage /> },
            { path: "candidate", element: <Lazy.CandidateSignupPage /> },
            { path: "organisation", element: <Lazy.OrganizationSignupPage /> },
            { path: "interviewer", element: <Lazy.InterviewerSignupPage /> },
        ],
    },
    {
        path: "/login",
        children: [
            { path: "interviewer", element: <Lazy.InterviewerLogin /> },
            { path: "candidate", element: <Lazy.CandidateLogin /> },
        ],
    },
    {
        path: "/api/auth/callback/google",
        element: <GoogleOauthCallbackPage />,
    },
    {
        path: "/forgotpw",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    // Other routes
    {
        path: "/product",
        children: [
            { path: "", element: <ProductPage /> },
            {
                path: "ai_intervue",
                element: (
                    <ProtectedRoute>
                        <Lazy.AiIntervuePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "resumeBuilder",
                element: (
                    <ProtectedRoute>
                        <ResumeBuilderPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "resumeAnalysis",
                element: (
                    <ProtectedRoute>
                        <Lazy.ResumeAnalysisPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "resumeSelect",
                element: (
                    <ProtectedRoute>
                        <Lazy.ResumeSelect />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/display",
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <Lazy.DisplayPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "job",
                element: (
                    <ProtectedRoute>
                        <Lazy.JobDetailPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/analysis",
        element: (
            <ProtectedRoute>
                <AIAnalysisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/meeting",
        element: (
            <ProtectedRoute>
                <Lazy.MeetingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/employee-profile",
        element: (
            <ProtectedRoute>
                <Lazy.EmployeeProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/thank-you",
        element: (
            <ProtectedRoute>
                <Lazy.ThankYou />
            </ProtectedRoute>
        ),
    },
    {
        path: "/scheduleInterview",
        element: (
            <ProtectedRoute>
                <Lazy.ScheduleInterviewForm />
            </ProtectedRoute>
        ),
    },
    {
        path: "/pendingInterviews",
        element: (
            <ProtectedRoute>
                <Lazy.PendingInterviews />
            </ProtectedRoute>
        ),
    },
    {
        path: "/jobAssign",
        element: (
            <ProtectedRoute>
                <Lazy.JobSchedule />
            </ProtectedRoute>
        ),
    },
    {
        path: "/upcomingInterviews",
        element: (
            <ProtectedRoute>
                <Lazy.UpcomingInterviews />
            </ProtectedRoute>
        ),
    },
    {
        path: "/finalInterviewPage",
        element: (
            <ProtectedRoute>
                <FinalInterviewPage />
            </ProtectedRoute>
        ),
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <HMSRoomProvider>
            <UserProvider>
                <Suspense fallback={<Loader />}>
                    <RouterProvider router={router} />
                </Suspense>
            </UserProvider>
        </HMSRoomProvider>
    </ChakraProvider>
);
