import React, { useEffect } from "react";
import { AdminAppBar, AdminSideBar } from "../../components/admin";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Redirect to /admin/manageQuestions only if the current path is /admin
  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/manageQuestions", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <AdminAppBar toggleDrawer={toggleDrawer} />
      <AdminSideBar open={open} toggleDrawer={toggleDrawer} />
      <section
        style={{
          maxWidth: "1280px",
          padding: "5rem 2rem",
          margin: "auto",
        }}
      >
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
