import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-4 py-3 font-bold">
        Student Dashboard
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
