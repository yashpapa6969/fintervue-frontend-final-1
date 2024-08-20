import React from "react";

const companiesData = [
  {
    title: "Internet",
    companies: ["Ampere", "Greaves", "OLX", "Flipkart"],
    link: "#",
    activeHiring: 194,
  },
  {
    title: "Manufacturing",
    companies: ["Triveni", "Turbines", "Goltens", "L&T"],
    link: "#",
    activeHiring: 807,
  },
  {
    title: "Fortune 500",
    companies: ["CAT", "Accenture", "Apple", "Honda"],
    link: "#",
    activeHiring: 108,
  },
  {
    title: "Product",
    companies: ["Oracle", "Keso", "HostBooks", "GameColony"],
    link: "#",
    activeHiring: 950,
  },
  {
    title: "Banking & Fin",
    companies: ["AXA", "Bonanza", "ICICI", "HDFC"],
    link: "#",
    activeHiring: 342,
  },
  // Add more categories as needed
];

const TopCompanies = () => {
  return (
    <section className="bg-blue-700 py-10">
      <div className=" mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Top companies hiring now
        </h2>
        <div className="relative flex items-center justify-center overflow-hidden">
          <div
            className="flex space-x-6 marquee"
            style={{
              display: "flex",
              animation: "marquee 60s linear infinite", // Slow down and repeat indefinitely
            }}
          >
            {companiesData.concat(companiesData).map((category, index) => (
              <div
                key={index}
                className="min-w-[300px] p-6 bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => (window.location.href = category.link)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.title} &rarr;
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.activeHiring} are actively hiring
                </p>
                <div className="flex space-x-4">
                  {category.companies.map((company, i) => (
                    <img
                      key={i}
                      src={`/${company}.png`} // Assume images are named after companies
                      alt={company}
                      className="h-10 w-10 object-contain"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee {
          width: 200%;
        }
      `}</style>
    </section>
  );
};

export default TopCompanies;
