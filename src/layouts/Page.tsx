import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import * as React from "react";
import { ReactNode } from "react";

const Page: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-screen min-h-screen">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
