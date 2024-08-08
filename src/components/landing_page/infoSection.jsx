import { Link } from "react-router-dom";

const InfoSection = ({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
}) => {
  return (
    <div className={`${lightBg ? "bg-white" : "bg-gray-900"} text-white py-20`}>
      <div className="container mx-auto flex flex-wrap items-center px-6">
        <div
          className={`w-full lg:w-1/2 px-6 ${
            imgStart ? "order-2 lg:order-1" : ""
          }`}
        >
          <div className="max-w-xl mb-10 lg:mb-0">
            <div
              className={`${
                lightTopLine ? "text-gray-400" : "text-blue-500"
              } text-sm font-semibold mb-4 tracking-widest`}
            >
              {topLine}
            </div>
            <h1
              className={`${
                lightText ? "text-gray-200" : "text-gray-900"
              } text-4xl font-semibold mb-6`}
            >
              {headline}
            </h1>
            <p
              className={`${
                lightTextDesc ? "text-gray-400" : "text-gray-700"
              } mb-6`}
            >
              {description}
            </p>
            <Link to="/signup">
              <button
                className={`px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300 ${
                  primary
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-800 hover:bg-gray-900 text-white"
                }`}
              >
                {buttonLabel}
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`w-full lg:w-1/2 px-6 ${
            imgStart ? "order-1 lg:order-2" : ""
          }`}
        >
          <div
            className={`max-w-xl mx-auto ${
              start ? "justify-start" : "justify-end"
            } flex`}
          >
            <img src={img} alt={alt} className="max-h-80 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
