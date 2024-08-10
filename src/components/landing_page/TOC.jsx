import React from "react";

const Toc = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Terms and Conditions Heading */}
      <div className="text-3xl md:text-4xl lg:text-5xl py-3 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
        Terms and Conditions
      </div>

      {/* Interviewers Section */}
      <div className="text-center text-2xl font-bold mt-10 mb-4 md:text-3xl">
        For Interviewer
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-blue-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2m0 8c3.313 0 6-2.687 6-6S15.313 4 12 4 6 6.687 6 10s2.687 6 6 6z"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">
            Conduct Professionalism
          </h3>
          <p className="text-sm text-gray-600">
            Interviewers must maintain a professional demeanor, ensuring that
            all interactions are respectful, unbiased, and free from any
            discriminatory behavior.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-blue-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 10.5A5.5 5.5 0 0113.5 16v2.379a2 2 0 01-.629 1.421l-1.07 1.07a1 1 0 01-1.41-1.415l.702-.701V16A5.5 5.5 0 115.5 10h.5a1 1 0 010 2h-.5a3.5 3.5 0 101.31 6.776A2 2 0 016.5 20H6a1 1 0 010-2h.5a1 1 0 010 2h-.5a4.5 4.5 0 119 0v2.375a3.98 3.98 0 01-.868 2.505A3.5 3.5 0 1019 10.5z"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">Confidentiality</h3>
          <p className="text-sm text-gray-600">
            Interviewers must respect the privacy of interviewees by not sharing
            or disclosing any personal information, interview responses, or
            other sensitive data without explicit consent.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-blue-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">Fair Assessment</h3>
          <p className="text-sm text-gray-600">
            Interviewers should evaluate all candidates based on their skills,
            experience, and qualifications, ensuring a fair and consistent
            assessment process for every interviewee.
          </p>
        </div>
      </div>

      {/* Interviewees Section */}
      <div className="text-center text-2xl font-bold mt-10 mb-4 md:text-3xl">
        For Interviewee
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2m0 8c3.313 0 6-2.687 6-6S15.313 4 12 4 6 6.687 6 10s2.687 6 6 6z"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">Honesty and Integrity</h3>
          <p className="text-sm text-gray-600">
            Interviewees must provide truthful and accurate information during
            the interview process and refrain from any form of deception or
            misrepresentation.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">Punctuality</h3>
          <p className="text-sm text-gray-600">
            Interviewees are expected to join the interview session at the
            scheduled time. Any delays or cancellations should be communicated
            in advance through the appropriate channels.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="font-semibold text-lg mb-2">
            Respectful Communication
          </h3>
          <p className="text-sm text-gray-600">
            Interviewees should maintain a courteous and respectful tone during
            the interview, avoiding any inappropriate language or behavior.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toc;
