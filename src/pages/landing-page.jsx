import Header from "../components/header";
import HeroSection from "../components/hero-section";

const LandingPage = ({ handleLogin }) => {
  return (
    <>
      <Header handleLogin={handleLogin} />
      <HeroSection handleLogin={handleLogin} />
    </>
  );
};

export default LandingPage;
