import Header from "../components/header";
import HeroSection from "../components/hero-section";

const LandingPage = ({showHome}) => {
  return (
    <>
      <Header showHome={showHome} />
      <HeroSection showHome={showHome} />
    </>
  );
};

export default LandingPage;
