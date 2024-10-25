// import React from 'react'
// import About from '../components/footerComponents/about';

// const AboutPage = () => {
//   return (
//     <div>
//       <About/>
//     </div>
//   )
// }

// export default AboutPage

import AboutSection from "@/components/AboutSection";
import Page from "@/layouts/Page";

const About = () => {
  return (
    <Page>
      <AboutSection />
    </Page>
  );
};

export default About;