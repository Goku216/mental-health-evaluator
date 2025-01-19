import { Box, Typography, LinearProgress } from "@mui/material";

export const ProgressHeader = ({ title, progress }) => (
  <Box sx={{ p: 3, bgcolor: "primary.main", color: "white" }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        mt: 2,
        height: 10,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        "& .MuiLinearProgress-bar": {
          backgroundColor: "white",
        },
      }}
    />
  </Box>
);

export default ProgressHeader;
