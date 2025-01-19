import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { QuestionAnswer, Settings, Message, Group } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export function AdminSideBar({ open, toggleDrawer }) {
  const menuItems = [
    {
      label: "Questionnaires",
      icon: <QuestionAnswer />,
      path: "/admin/manageQuestions",
    },
    { label: "Settings", icon: <Settings />, path: "/admin/settings" },
    { label: "Messages", icon: <Message />, path: "/admin/messages" },
    { label: "Users", icon: <Group />, path: "/admin/manageUsers" },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(({ label, icon, path }, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            } // Add active class
            style={{ textDecoration: "none", color: "inherit" }} // Optional styling
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
