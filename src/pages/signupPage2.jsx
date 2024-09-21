import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import FlipText from "../components/ui/flip-text";

const SignupPage2 = () => {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-12">
        {/* <h1>How do you want to join our platform?</h1> */}
        {/* <p>This will help us personalize your experience accordingly.</p> */}
        <FlipText
          className="text-2xl font-bold tracking-[-0.1em] bg-clip-text md:text-7xl md:leading-[5rem]"
          word="Join Fintervue Today"
        />
        <h3 className="mt-[.5rem] text-[1.5rem] p-5">
          This will help us personalize your experience accordingly.
        </h3>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
          {/* Card 1 - Interviewer */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="mb-4">
              <span className="inline-block bg-yellow-200 text-yellow-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-wallet"></i> Earn Side Income
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Join as an <span className="text-black">Interviewer</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Become a freelance interviewer at Fintervue and earn extra income.
              Conduct interviews on your own time and utilize your expertise to
              guide candidates, while making a significant impact in their
              careers.
            </p>
            <Link
              to="/login/interviewer"
              className="bg-yellow-300 transition-all text-black py-2 px-6 rounded-md font-semibold hover:bg-yellow-200"
            >
              Login
            </Link>
            <p className="mt-4 text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup/interviewer"
                className="text-black font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Card 2 - Interviewee */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="mb-4">
              <span className="inline-block bg-blue-200 text-blue-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-comments"></i> Job Opportunities
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Join as an <span className="text-black">Interviewee</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Prepare for interviews, get expert feedback, and apply to 400+ top
              companies. Stand out from the competition and land your dream job
              with personalized interview feedback and reports.
            </p>
            <Link to="/login/candidate">
              <button className="bg-blue-200 text-blue-900 py-2 px-6 rounded-md font-semibold hover:bg-blue-400">
                Login
              </button>
            </Link>
            <p className="mt-4 text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup/candidate"
                className="text-blue-900 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Card 3 - Companies (yet to be launched) */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center opacity-50 cursor-not-allowed transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="mb-4">
              <span className="inline-block bg-green-200 text-green-900 font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-chart-line"></i> Save Hiring Bandwidth
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              For <span className="text-black">Companies</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Conduct asynchronous interviews with vetted professionals. Access
              detailed reports within minutes, enabling your team to make quick
              and informed hiring decisions.
            </p>
            <button
              disabled
              className="bg-green-500 text-white py-2 px-6 rounded-md font-semibold"
            >
              Login
            </button>
            <p className="mt-4 text-gray-600">Feature coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage2;
