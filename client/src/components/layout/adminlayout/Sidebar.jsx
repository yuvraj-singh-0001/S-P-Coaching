import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaChartPie,
  FaAngleLeft,
  FaAngleRight,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({ open, onClose, onToggle }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`;

  // ✅ MOBILE AUTO CLOSE HANDLER
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-gray-900 text-white
        transition-all duration-300
        ${open ? "w-64 translate-x-0" : "w-16 -translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open && <h2 className="text-lg font-bold">Admin</h2>}

          {/* DESKTOP TOGGLE */}
          <button
            onClick={onToggle}
            className="hidden md:block text-xl"
          >
            {open ? <FaAngleLeft /> : <FaAngleRight />}
          </button>

          {/* MOBILE CLOSE */}
          <button
            onClick={onClose}
            className="md:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="p-2 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaChartPie />
            {open && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/admin/students"
            end
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaUsers />
            {open && <span>All Students</span>}
          </NavLink>

          <NavLink
            to="/admin/students/pending"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaClock />
            {open && <span>Pending</span>}
          </NavLink>

          <NavLink
            to="/admin/students/approved"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaCheckCircle />
            {open && <span>Approved</span>}
          </NavLink>

          <NavLink
            to="/admin/students/rejected"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaTimesCircle />
            {open && <span>Rejected</span>}
          </NavLink>

          <NavLink
            to="/admin/fees"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <FaRupeeSign />
            {open && <span>Due Fees</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
