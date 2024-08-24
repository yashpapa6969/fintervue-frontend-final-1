import React from "react";
import Navbar from "../components/navbar";

const SignupPage2 = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center py-12 bg-gray-50">
        <h1>How do you want to join our platform </h1>
        <p>this will help us personalize your experience accordingly </p>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <span className="inline-block bg-yellow-200 text-yellow-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-wallet"></i> Earn & Grow 10x
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Become an <span className="text-black">Interviewer</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Join our community of freelance interviewers in Fintervue. Gain
              exposure beyond your workspace and exercise the power of your
              knowledge and freedom.
            </p>
            <button className="bg-yellow-300 text-black py-2 px-6 rounded-md font-semibold hover:bg-gray-800">
              Login
            </button>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <a href="/#" className="text-black font-semibold">
                Register
              </a>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <span className="inline-block bg-green-200 text-green-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-chart-line"></i> Save 90% of hiring
                bandwidth
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              For <span className="text-black">Companies</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Conduct interviews asynchronously on Fintervue platform by vetted
              interviewers. A detailed report of the candidate's performance is
              available within 5 minutes.
            </p>
            <a href="/signup/organisation">
              <button className="bg-green-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-600">
                Login
              </button>
            </a>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup/organisation"
                className="text-green-600 font-semibold"
              >
                Register
              </a>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-200 text-blue-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-comments"></i> Mock interviews
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              For <span className="text-black">Candidates</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Get actionable feedback of your interview from industry experts
              and share it with 400+ actively hiring brands.
            </p>
            <a href="/signup/candidate">
              <button className="bg-blue-200 text-blue-900 py-2 px-6 rounded-md font-semibold hover:bg-blue-400">
                Login
              </button>
            </a>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup/candidate"
                className="text-blue-900 font-semibold"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage2;
