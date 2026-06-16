import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Modules from "../components/Modules";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Modules />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
