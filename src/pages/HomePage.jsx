import Navbar from "../components/navbar";
import Hero from "../components/landing_page/hero";
import Pricing from "../components/landing_page/pricing";
import Features from "../components/landing_page/features";
import Footer from "../components/landing_page/footer";
import CTA from "../components/landing_page/CTA";
import Toc from "../components/landing_page/TOC";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Toc/>
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

export default HomePage