import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Ui/Header";
import Footer from "./components/LandingPage/Footer";
const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
