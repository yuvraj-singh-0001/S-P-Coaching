import { FaBars } from "react-icons/fa";

const Navbar = ({ onMobileMenu }) => {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* MOBILE MENU ONLY */}
      <button
        onClick={onMobileMenu}
        className="md:hidden text-xl text-gray-700"
      >
        <FaBars />
      </button>

      <h1 className="text-lg md:text-xl font-bold">
        Admin Dashboard
      </h1>

      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
