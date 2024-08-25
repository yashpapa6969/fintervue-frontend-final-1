import React from "react";


const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-400 text-black bg-opacity-80 rounded-r-3xl p-6 flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:translate-x-2">
        <div className="text-4xl font-bold mb-10">Fintervue</div>
        <nav>
          <ul className="space-y-6 text-lg">
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300">Dashboard</li>
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300">Courses</li>
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300">Jobs</li>
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300">Profile</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">20-27 Jan, 2025</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
              Add Course
            </button>
          </div>
        </header>

        {/* Overview Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Progress */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform duration-300 transform hover:scale-105 hover:bg-blue-50">
            <img
              src="https://via.placeholder.com/150"
              alt="Course Progress"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Course Progress</h3>
            <p className="text-gray-600 mb-4">
              Track your learning progress across all enrolled courses.
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
              View Progress
            </button>
          </div>

          {/* Job Applications */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">Job Applications</h3>
            <p className="text-gray-600 mb-4">Active Applications: 8</p>
            <div className="h-32 bg-blue-100 rounded-lg flex justify-center items-center">
              <span className="text-xl text-blue-500 font-bold">3 Interviews</span>
            </div>
          </div>

          {/* Available Courses */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">Available Courses</h3>
            <p className="text-gray-600 mb-4">New Courses: 12</p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Data Science</h4>
              <p className="text-xl font-bold text-blue-500">Enroll Now</p>
            </div>
          </div>
        </section>

        {/* Additional Content */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Applications</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-104 hover:bg-blue-50">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4">Job Title</th>
                  <th className="pb-4">Company</th>
                  <th className="pb-4">Date Applied</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-600">
                  <td className="py-2">Software Engineer</td>
                  <td className="py-2">Google</td>
                  <td className="py-2">24 Aug, 2024</td>
                  <td className="py-2 text-green-600">Interview Scheduled</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-2">Data Analyst</td>
                  <td className="py-2">Facebook</td>
                  <td className="py-2">22 Aug, 2024</td>
                  <td className="py-2 text-yellow-600">Pending</td>
                </tr>
                <tr className="text-gray-600">
                  <td className="py-2">Web Developer</td>
                  <td className="py-2">Amazon</td>
                  <td className="py-2">20 Aug, 2024</td>
                  <td className="py-2 text-red-600">Rejected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
