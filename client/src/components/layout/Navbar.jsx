import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About Us", path: "/about" },
    { id: 3, title: "Courses", path: "/courses" },
    { id: 4, title: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0C4A8B] shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-extrabold text-4xl">SP</span>

          <div className="text-white font-semibold">
            <p className="text-xl leading-none">Coaching Centre</p>
            <div className="w-24 h-[2px] bg-yellow-400 mt-1"></div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-white text-lg font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-1 ${
                  isActive
                    ? "text-yellow-300"
                    : "hover:text-yellow-300 transition"
                }`
              }
            >
              {item.title}

              <span className="absolute left-0 -bottom-1 w-full h-[3px] 
                bg-yellow-400 opacity-0 group-hover:opacity-100 transition
              "></span>
            </NavLink>
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
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-white ${
                  isActive ? "text-yellow-300 font-semibold" : ""
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
