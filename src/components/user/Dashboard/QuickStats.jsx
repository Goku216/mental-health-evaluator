import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { Assessment, CalendarToday, ShowChart } from "@mui/icons-material";

export const QuickStats = ({ stats }) => {
  const StatCard = ({ icon: Icon, title, value }) => (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="text.secondary">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Icon sx={{ fontSize: 40, color: "primary.main" }} />
      </Box>
    </Paper>
  );

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <StatCard
          icon={Assessment}
          title="Tests Completed"
          value={stats.testsCompleted}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          icon={CalendarToday}
          title="Current Streak"
          value={`${stats.streak} days`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          icon={ShowChart}
          title="Latest PHQ-9 Score"
          value={`${stats.latestScore} (${stats.severity})`}
        />
      </Grid>
    </Grid>
  );
};

export default QuickStats;
