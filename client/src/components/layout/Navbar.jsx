import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const resourceBtnRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About Us", path: "/about" },
    { id: 3, title: "Courses", path: "/courses" },
    { id: 4, title: "Contact Us", path: "/contact" },
  ];

  const JOIN_CLASS_URL =
    "https://wayground.com/join?source=marketing_page_nav_btn&feat=school-plan-quote&pageSource=marketing";

  const handleNavClick = (path) => {
    setIsOpen(false);
    setResourceOpen(false);
    navigate(path);
  };

  const handleJoinClass = () => {
    setIsOpen(false);
    setResourceOpen(false);
    window.location.href = JOIN_CLASS_URL;
  };

  const isActive = (path) => location.pathname === path;

  // ✅ RIGHT-ALIGNED DROPDOWN POSITION (MAIN FIX)
  const dropdownStyle = () => {
    if (!resourceBtnRef.current) return {};
    const rect = resourceBtnRef.current.getBoundingClientRect();

    return {
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right, // 🔥 KEY FIX
    };
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0C4A8B] shadow">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
            onClick={() => navigate("/")}
          >
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
                className={`relative pb-1 ${
                  isActive(item.path)
                    ? "text-yellow-300"
                    : "hover:text-yellow-300"
                } transition`}
              >
                {item.title}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-[3px] bg-yellow-400 transition ${
                    isActive(item.path)
                      ? "opacity-100"
                      : "opacity-0 hover:opacity-100"
                  }`}
                />
              </button>
            ))}

            {/* Resources Button */}
            <button
              ref={resourceBtnRef}
              onClick={() => setResourceOpen(!resourceOpen)}
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              Resources <ChevronDown size={18} />
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
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
                className={`block w-full text-left py-3 ${
                  isActive(item.path)
                    ? "text-yellow-300 font-semibold"
                    : "text-white hover:text-yellow-300"
                } transition`}
              >
                {item.title}
              </button>
            ))}

            <button
              onClick={() => setResourceOpen(!resourceOpen)}
              className="w-full text-left py-3 text-white hover:text-yellow-300 flex justify-between items-center"
            >
              Resources <ChevronDown size={18} />
            </button>

            {resourceOpen && (
              <div className="pl-4">
                <button
                  onClick={() => handleNavClick("/resources")}
                  className="block w-full text-left py-2 text-white hover:text-yellow-300"
                >
                  Study Materials
                </button>
                <button
                  onClick={handleJoinClass}
                  className="block w-full text-left py-2 text-white hover:text-yellow-300"
                >
                  Join Class
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ✅ Desktop Dropdown (RIGHT SAFE – NEVER CUTS) */}
      {resourceOpen && (
        <div
          style={dropdownStyle()}
          className="fixed bg-white text-black rounded-md shadow-lg w-52 z-[9999]"
        >
          <button
            onClick={() => handleNavClick("/resources")}
            className="block w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            Study Materials
          </button>
          <button
            onClick={handleJoinClass}
            className="block w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            Join Class
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
