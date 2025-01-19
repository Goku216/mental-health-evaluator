import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Home, MenuBook, Settings, Logout } from "@mui/icons-material";

export const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  // Redirect to /user/:id/dashboard only if the current path is /user/:id
  useEffect(() => {
    if (location.pathname === "/user/:id") {
      navigate("/user/:id/dashboard", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mental Health Dashboard
          </Typography>

          <Button
            onClick={() => navigate("/user/:id/dashboard")}
            color="inherit"
            startIcon={<Home />}
            sx={{ mx: 1 }}
          >
            Home
          </Button>

          <Button
            onClick={() => navigate("/user/:id/resources")}
            color="inherit"
            startIcon={<MenuBook />}
            sx={{ mx: 1 }}
          >
            Resources
          </Button>

          <Button
            onClick={() => navigate("/user/:id/settings")}
            color="inherit"
            startIcon={<Settings />}
            sx={{ mx: 1 }}
          >
            Settings
          </Button>

          <Button
            onClick={() => navigate("/")}
            color="inherit"
            startIcon={<Logout />}
            sx={{ mx: 1 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
