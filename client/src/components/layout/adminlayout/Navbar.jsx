import { useState } from "react";
import { useAdminAuth } from "../../../modules/Admin/AdminAuthContext";

const Navbar = ({ onMobileMenu }) => {
  const { user, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* MOBILE MENU */}
      <button
        onClick={onMobileMenu}
        className="md:hidden text-xl"
      >
        ☰
      </button>

      <h1 className="text-lg font-bold">Admin Dashboard</h1>

      {/* PROFILE */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
          >
            <span className="font-medium">{user.name}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow rounded w-40 z-50">
              <a
                href="/admin/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </a>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
