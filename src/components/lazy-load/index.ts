import React from "react";

// sign up
export const AllSignUpPage = React.lazy(() => import("../../pages/signupPage2.jsx"));
export const CandidateSignupPage = React.lazy(() => import("../../pages/SignupPage.jsx"));
export const InterviewerSignupPage = React.lazy(() => import("../../pages/InterviewerSignupPage.jsx"));
export const OrganizationSignupPage = React.lazy(() => import("../../pages/signupOrg.jsx"));

// log in
export const InterviewerLogin = React.lazy(() => import("../../pages/LoginInterviewer.jsx"));
export const CandidateLogin = React.lazy(() => import("../../pages/LoginInterviewe.jsx"));

// protected services
export const ResumeSelect = React.lazy(() => import("../chooseResume/resumeSelect.jsx"));
export const ResumeBuilderPage = React.lazy(() => import("../../products/resumeBuilder.jsx"));
export const AiIntervuePage = React.lazy(() => import("../../pages/AiIntervuePage.jsx"));
export const aIAnalysis = React.lazy(() => import("../../pages/AiAnalysis.jsx"));
export const MeetingPage = React.lazy(() => import("../../pages/MeetingPage.jsx"));
export const JobSchedule = React.lazy(() => import("../../pages/JobSchedulePage.jsx"));

export const ScheduleInterviewForm = React.lazy(() => import("../../pages/scheduleInterview.jsx"));
export const UpcomingInterviews = React.lazy(() => import("../../pages/upcomingInterviews.jsx"));
export const PendingInterviews = React.lazy(() => import("../../pages/pendingInterview.jsx"));
export const FinalInterviewPage = React.lazy(() => import("../../pages/finalInterview.jsx"));

export const DisplayPage = React.lazy(() => import("../../pages/DisplayPage.jsx"));
export const JobDetailPage = React.lazy(() => import("../../pages/JobDetailPage.jsx"));
export const EmployeeProfilePage = React.lazy(() => import("../../pages/EmployeeProfilePage.jsx"));
export const ThankYou = React.lazy(() => import("../../pages/ThankYou.jsx"));

// other pages
export const ProductPage = React.lazy(() => import("../../pages/ProductPage.jsx"));
export const TocPage = React.lazy(() => import("../../pages/TocPage.jsx"));
export const RefundsAndCancellationPage = React.lazy(() => import("../../pages/RefundsAndCancellationPage.jsx"));
export const ContactPage = React.lazy(() => import("../../pages/ContactPage.jsx"));
export const AboutPage = React.lazy(() => import("../../pages/About.jsx"));
export const PricingPage = React.lazy(() => import("../../pages/PricingPage.jsx"));
export const PrivacyPolicyPage = React.lazy(() => import("../../pages/PrivacyPolicyPage.jsx"));
export const ResumeAnalysisPage = React.lazy(() => import("../../products/resumeAnalysis.jsx"));
