import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  MenuBook,
  Logout,
  Person,
  KeyboardArrowDown,
  Settings,
} from "@mui/icons-material";
import { parseJwt } from "../../utils/decodeJWT";

export const UserLayout = () => {
  const [userid, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  useEffect(() => {
    const userToken = localStorage.getItem("User_Token");
    if (!userToken) {
      navigate("/");
    }
    if (userToken) {
      const decodedToken = parseJwt(userToken);
      if (decodedToken) {
        const { userId } = decodedToken;
        setUserId(userId);
      }
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("User_Token");
    window.location.reload();
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: `/user/${userid}/dashboard`,
    },
    {
      text: "Resources",
      icon: <MenuBook />,
      path: `/user/${userid}/resources`,
    },
    {
      text: "Settings",
      icon: <Settings />,
      path: `/user/${userid}/settings`,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box sx={{ width: "200px" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Dashboard sx={{ mr: 1 }} />
              MindCare
            </Typography>
          </Box>

          {/* Centered Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              mx: 2,
            }}
          >
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color:
                        location.pathname === item.path ? "#000000" : "inherit",
                      backgroundColor:
                        location.pathname === item.path
                          ? "rgba(255, 255, 255, 0.9)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor:
                          location.pathname === item.path
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(255, 255, 255, 0.1)",
                      },
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      px: 3,
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <>
                <Button
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                  endIcon={<KeyboardArrowDown />}
                >
                  Menu
                </Button>
                <Menu
                  anchorEl={mobileMenuAnchorEl}
                  open={Boolean(mobileMenuAnchorEl)}
                  onClose={handleMobileMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        handleMobileMenuClose();
                      }}
                      selected={location.pathname === item.path}
                      sx={{
                        color:
                          location.pathname === item.path
                            ? "#000000"
                            : "inherit",
                        backgroundColor:
                          location.pathname === item.path
                            ? "rgba(0, 0, 0, 0.08)"
                            : "transparent",
                        "&:hover": {
                          backgroundColor:
                            location.pathname === item.path
                              ? "rgba(0, 0, 0, 0.12)"
                              : "rgba(0, 0, 0, 0.04)",
                        },
                        fontWeight: location.pathname === item.path ? 600 : 400,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            location.pathname === item.path
                              ? "#000000"
                              : "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {item.text}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          {/* Profile Section */}
          <Box
            sx={{ width: "200px", display: "flex", justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "secondary.main",
                }}
              >
                <Person />
              </Avatar>
              {!isMobile && (
                <>
                  <Typography sx={{ ml: 1, mr: 0.5 }}>John Doe</Typography>
                  <KeyboardArrowDown />
                </>
              )}
            </Box>

            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          bgcolor: "background.default",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
