import { FaBars } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="md:hidden text-xl"
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
