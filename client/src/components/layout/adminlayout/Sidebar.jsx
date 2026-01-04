import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaChartPie,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({ open, onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button
            onClick={onClose}
            className="md:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaChartPie /> Dashboard
          </NavLink>

          <NavLink to="/admin/students" className={linkClass}>
            <FaUsers /> All Students
          </NavLink>

          <NavLink to="/admin/students/pending" className={linkClass}>
            <FaClock /> Pending
          </NavLink>

          <NavLink to="/admin/students/approved" className={linkClass}>
            <FaCheckCircle /> Approved
          </NavLink>

          <NavLink to="/admin/students/rejected" className={linkClass}>
            <FaTimesCircle /> Rejected
          </NavLink>

          <NavLink to="/admin/fees" className={linkClass}>
            <FaRupeeSign /> Due Fees
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
