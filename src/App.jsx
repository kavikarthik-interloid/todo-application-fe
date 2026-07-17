import { useState } from "react";
import LandingPage from "./pages/landing-page";
import { ToastProvider } from "./components/toast";
import Home from "./pages/home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("visited"));
//  console.log('isLoggedIn', isLoggedIn)
  const handleLogin = () => {
    localStorage.setItem("visited", "true");
    // console.log(localStorage.setItem("visited", "true"))
    setIsLoggedIn(true);
  };

  return (
    <ToastProvider>
      { isLoggedIn ? <Home /> : <LandingPage handleLogin={handleLogin} />}
    </ToastProvider>
  );
}

export default App;
