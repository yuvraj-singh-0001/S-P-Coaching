import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About Us", path: "/about" },
    { id: 3, title: "Courses", path: "/courses" },
    { id: 4, title: "Contact Us", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    // Direct URL change karo - yehi main fix hai!
    navigate(path);
  };

  // Check karo ke current page konsa hai
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0C4A8B] shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
          onClick={() => navigate("/")}>
          <span className="text-yellow-400 font-extrabold text-4xl">SP</span>
          <div className="text-white font-semibold">
            <p className="text-xl leading-none">Coaching Classes</p>
            <div className="w-24 h-[2px] bg-yellow-400 mt-1"></div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-white text-lg font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`relative pb-1 ${isActive(item.path) ? 'text-yellow-300' : 'hover:text-yellow-300'} transition text-left`}
            >
              {item.title}
              <span className={`absolute left-0 -bottom-1 w-full h-[3px] 
                bg-yellow-400 transition ${isActive(item.path) ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0C4A8B] px-6 pb-4 border-t border-blue-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`block w-full text-left py-3 ${isActive(item.path) ? 'text-yellow-300 font-semibold' : 'text-white hover:text-yellow-300'} transition`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;