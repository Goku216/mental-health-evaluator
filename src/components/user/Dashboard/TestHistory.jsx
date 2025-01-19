import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const TestHistory = ({ data }) => {
  return (
    <Paper sx={{ p: 3, mb: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Test History
      </Typography>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="PHQ9" stroke="#1976d2" name="PHQ-9" />
          <Line type="monotone" dataKey="GAD7" stroke="#4caf50" name="GAD-7" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TestHistory;
