import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Box className="text-center p-8">
        <ErrorOutlineIcon
          className="text-red-500 mb-4"
          sx={{ fontSize: 100 }}
        />

        <Typography
          variant="h1"
          className="text-6xl font-bold text-gray-800 mb-4"
        >
          404
        </Typography>

        <Typography variant="h4" className="text-2xl text-gray-600 mb-6">
          Oops! Page Not Found
        </Typography>

        <Typography className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          className="px-6 py-2"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </Box>
    </Box>
  );
}

export default PageNotFound;
