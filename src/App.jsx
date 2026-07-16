import Home from "./pages/home";
import { ToastProvider } from "./components/toast";

function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}

export default App;
