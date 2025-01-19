import React from "react";
import { Paper, Avatar, Typography, Box } from "@mui/material";
import { Person } from "@mui/icons-material";

export const UserOverview = ({ name, lastAssessment }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <Person />
        </Avatar>
        <Box>
          <Typography variant="h5">Welcome back, {name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Last assessment: {lastAssessment}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserOverview;
