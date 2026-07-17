import {useState} from "react"
import LandingPage from "./pages/landing-page"
import { ToastProvider } from "./components/toast";
import Home from "./pages/home"

function App() {

  const [isHome, setIsHome] = useState(false);
  const [islandingPage, setIsLandingPage] = useState(true);

  const showHome = () => {
    setIsHome(true);
  };

  const showLandingPage = () => {
    setIsLandingPage(false)
  }

  return (
    <ToastProvider>
      {isHome && <Home showLandingPage={showLandingPage}/>}
      {islandingPage && <LandingPage showHome={showHome}/>}
    </ToastProvider>
  );
}

export default App;
