import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import FlipText from "../components/ui/flip-text";
import RegisterWithGoogleButton from "../components/RegisterWithGoogleButton";

const SignupPage2 = () => {
    return (
        <div className="h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-12">
                {/* <h1>How do you want to join our platform?</h1> */}
                {/* <p>This will help us personalize your experience accordingly.</p> */}
                <FlipText
                    className="text-2xl font-bold tracking-[-0.1em] bg-clip-text md:text-7xl md:leading-[5rem]"
                    word="Join Fintervue Today"
                />
                <h3 className="mt-[.5rem] text-[1.5rem] p-5">
                    This will help us personalize your experience accordingly.
                </h3>
                <div className="grid w-full grid-cols-1 gap-6 px-4 max-w-7xl md:grid-cols-3 md:px-0">
                    {/* Card 1 - Interviewer */}
                    <div className="p-6 text-center transition-transform transform bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg">
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 font-semibold text-yellow-900 bg-yellow-200 rounded-full">
                                <i className="fas fa-wallet"></i> Earn Side
                                Income
                            </span>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold">
                            Join as an{" "}
                            <span className="text-black">Interviewer</span>
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Become a freelance interviewer at Fintervue and earn
                            extra income. Conduct interviews on your own time
                            and utilize your expertise to guide candidates,
                            while making a significant impact in their careers.
                        </p>
                        <Link
                            to="/login/interviewer"
                            className="px-6 py-2 font-semibold text-black transition-all bg-yellow-300 rounded-md hover:bg-yellow-200"
                        >
                            Login
                        </Link>
                        <p className="mt-4 text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/signup/interviewer"
                                className="font-semibold text-black"
                            >
                                Register
                            </Link>
                        </p>

                        <RegisterWithGoogleButton type="interviewer"/>
                    </div>

                    {/* Card 2 - Interviewee */}
                    <div className="p-6 text-center transition-transform transform bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg">
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 font-semibold text-blue-900 bg-blue-200 rounded-full">
                                <i className="fas fa-comments"></i> Job
                                Opportunities
                            </span>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold">
                            Join as an{" "}
                            <span className="text-black">Interviewee</span>
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Prepare for interviews, get expert feedback, and
                            apply to 400+ top companies. Stand out from the
                            competition and land your dream job with
                            personalized interview feedback and reports.
                        </p>
                        <Link to="/login/candidate">
                            <button className="px-6 py-2 font-semibold text-blue-900 bg-blue-200 rounded-md hover:bg-blue-400">
                                Login
                            </button>
                        </Link>
                        <p className="mt-4 text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/signup/candidate"
                                className="font-semibold text-blue-900"
                            >
                                Register
                            </Link>
                        </p>
                        
                        <RegisterWithGoogleButton type="candidate" />
                    </div>

                    {/* Card 3 - Companies (yet to be launched) */}
                    <div className="p-6 text-center transition-transform transform bg-gray-200 rounded-lg shadow-md opacity-50 cursor-not-allowed hover:scale-105 hover:shadow-lg">
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 font-semibold text-green-900 bg-green-200 rounded-full">
                                <i className="fas fa-chart-line"></i> Save
                                Hiring Bandwidth
                            </span>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold">
                            For <span className="text-black">Companies</span>
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Conduct asynchronous interviews with vetted
                            professionals. Access detailed reports within
                            minutes, enabling your team to make quick and
                            informed hiring decisions.
                        </p>
                        <button
                            disabled
                            className="px-6 py-2 font-semibold text-white bg-green-500 rounded-md"
                        >
                            Login
                        </button>
                        <p className="mt-4 text-gray-600">
                            Feature coming soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage2;
