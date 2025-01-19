import React from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import { Info } from "@mui/icons-material";

export const AvailableTests = ({ tests, onStartTest }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {tests.map((test) => (
        <Grid item xs={12} md={6} key={test.id}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">{test.name}</Typography>
              <Info color="primary" />
            </Box>
            <Typography color="text.secondary" gutterBottom>
              {test.description}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2">
                Time: {test.timeToComplete}
              </Typography>
              <Typography variant="body2">
                {test.questions} questions
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onStartTest(test.id)}
            >
              Start Test
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableTests;
