import { IoMdCheckmark } from "react-icons/io";
import Navbar from "../navbar";
import Footer from "../landing_page/footer";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-3 bg-gray-50">
        <div className="flex flex-col items-center font-medium mb-12 px-12  mx-auto max-w-[550px]">
          <div className="border-2 w-fit p-0.5 px-3 py-2 mt-5 text-sm rounded-xl border-slate-300/80">
            Boost your productivity
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
            SELECT YOUR CATEGORY
          </div>
          <div className="text-center text-lg mb-8 md:text-xl">
            10x your chances of landing in financial job by applying with
            Fintervue.
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center p-10 px-20 gap-8">
          {/* Individuals Plan */}
          <div className="shadow-xl border-gray-100 border-2 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105">
            <div className="font-bold text-gray-500">Individuals</div>
            <div className="py-8">
              <span className="font-extrabold text-5xl">₹1,299</span>
              <span className="font-semibold text-gray-600">/month</span>
              <br />
              <span className="font-extrabold text-3xl mt-2">₹9,999</span>
              <span className="font-semibold text-gray-600">/year</span>
            </div>
            <button className="text-white mb-8 bg-black py-1.5 w-full rounded-lg cursor-pointer transition-transform duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-95">
              Get started for individuals
            </button>
            <div className="flex flex-col gap-6">
              <div>
                <IoMdCheckmark className="inline mr-2" /> Resume Builder
              </div>
              <div>
                <IoMdCheckmark className="inline mr-2" /> Resume Analysis
              </div>
              <div>
                <IoMdCheckmark className="inline mr-2" /> Unlimited AI
                Interviews and Feedback
              </div>
            </div>
          </div>

          {/* Team Plan */}
          <div className="shadow-2xl border-2 rounded-2xl p-8 bg-black text-white h-[430px] transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-500">Team</div>
              <div className="border-2 w-fit p-0.5 px-3 text-xs rounded-xl border-slate-300/20 bg-gradient-to-r from-pink-500 via-lime-600 to-sky-400 text-transparent bg-clip-text font-bold tracking-tighter">
                Most Popular
              </div>
            </div>
            <div className="py-8">
              <span className="font-extrabold text-5xl">₹4,999</span>
              <span className="font-semibold text-gray-600">/month</span>
              <br />
              <span className="font-extrabold text-3xl mt-2">₹59,999</span>
              <span className="font-semibold text-gray-600">/year</span>
            </div>
            <button className="text-black font-medium mb-8 bg-white py-1.5 w-full rounded-lg cursor-pointer transition-transform duration-200 hover:bg-gray-300 hover:shadow-lg active:scale-95">
              Sign up for Team
            </button>
            <div className="flex flex-col gap-6">
              <div>
                <IoMdCheckmark className="inline mr-2" /> Up to 20 AI Interviews
                per day
              </div>
              <div>
                <IoMdCheckmark className="inline mr-2" /> Detailed reports of
                candidates on soft and technical skills
              </div>
            </div>
          </div>

          {/* Business Plan */}
          <div className="shadow-xl border-gray-100 border-2 rounded-2xl p-8 transform transition-transform duration-300 hover:scale-105">
            <div className="font-bold text-gray-500">Business</div>
            <div className="py-8">
              <span className="font-extrabold text-5xl">₹8,333</span>
              <span className="font-semibold text-gray-600">/month</span>
              <br />
              <span className="font-extrabold text-3xl mt-2">₹99,999</span>
              <span className="font-semibold text-gray-600">/year</span>
            </div>
            <button className="text-white mb-8 bg-black py-1.5 w-full rounded-lg cursor-pointer transition-transform duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-95">
              Sign up for Business
            </button>
            <div className="flex flex-col gap-6">
              <div>
                <IoMdCheckmark className="inline mr-2" /> Up to 50 AI Interviews
                per day
              </div>
              <div>
                <IoMdCheckmark className="inline mr-2" /> Detailed reports of
                candidates on soft & technical skills
              </div>
              <div>
                <IoMdCheckmark className="inline mr-2" /> Industry expert-based
                interviews
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Pricing;
