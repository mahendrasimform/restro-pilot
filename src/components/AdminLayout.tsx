import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div>
      <header>Admin Layout Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;