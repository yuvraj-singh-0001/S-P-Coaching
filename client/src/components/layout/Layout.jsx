import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showTakeAdmission =
    location.pathname !== "/admission" && !location.pathname.startsWith("/admin");

  const handleTakeAdmission = () => {
    navigate("/fees");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow">{children}</main>

      {showTakeAdmission && (
        <button
          onClick={handleTakeAdmission}
          className="
  fixed right-4 
  bottom-20 sm:bottom-4
  z-40 
  px-6 py-2 
  rounded-full 
  bg-gradient-to-r from-[#0C4A8B] to-blue-500 
  text-white font-semibold 
  shadow-lg shadow-blue-500/40 
  border border-white/20 
  hover:scale-105 hover:shadow-blue-500/60 
  transition-transform transition-shadow
"
        >
          Take Admission
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Layout;