import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Fade,
  Grow,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Assessment,
  Dashboard,
  Refresh,
  TrendingUp,
  HealthAndSafety,
  ReportProblem,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Custom theme colors
const theme = {
  primary: "#1976D2", // Medical blue
  secondary: "#4CAF50", // Healing green
  warning: "#FF9800", // Alert orange
  error: "#f44336", // Emergency red
  background: "#F5F9FD", // Soft blue background
};

// Severity color mapping
const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
    case "minimal":
      return theme.secondary;
    case "mild":
      return theme.primary;
    case "moderate":
      return theme.warning;
    case "moderately severe":
    case "severe":
      return theme.error;
    default:
      return theme.primary;
  }
};

export const ResultPage = () => {
  const location = useLocation();
  console.log(location.state);
  const {
    status,
    severity = "",
    score,
    recommendation,
    completedAt,
  } = location.state || {};
  console.log(location);

  console.log(status);
  const navigate = useNavigate();

  const handleRetake = () => {
    // navigate("/assessment");
  };

  const handleDashboard = () => {
    // navigate("/dashboard");
  };
  if (!location.state) {
    return <p>No state passed!</p>; // Or any error handling
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.background,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <HealthAndSafety
              sx={{
                fontSize: 60,
                color: theme.primary,
                mb: 2,
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Assessment Results
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Completed on {new Date(completedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Score Card */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={1000}>
              <Card elevation={3} sx={{ height: "100%" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TrendingUp sx={{ color: theme.primary, mr: 1 }} />
                    <Typography variant="h6">Score Analysis</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 4,
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={120}
                      thickness={4}
                      sx={{
                        color: getSeverityColor(severity),
                        position: "relative",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h4" component="div">
                        {score}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Score
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      color: getSeverityColor(severity),
                      mb: 1,
                    }}
                  >
                    {severity} Level
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    Status: {status}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>

          {/* Recommendation Card */}
          <Grid item xs={12} md={6}>
            <Grow in timeout={1500}>
              <Card elevation={3} sx={{ height: "100%" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <ReportProblem sx={{ color: theme.warning, mr: 1 }} />
                    <Typography variant="h6">Recommendations</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {recommendation}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    Remember: These results are intended as a screening tool and
                    not a diagnosis. Always consult with healthcare
                    professionals for proper evaluation and treatment.
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Fade in timeout={2000}>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={handleRetake}
              sx={{
                backgroundColor: theme.secondary,
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
            >
              Retake Assessment
            </Button>
            <Button
              variant="contained"
              startIcon={<Dashboard />}
              onClick={handleDashboard}
              sx={{
                backgroundColor: theme.primary,
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ResultPage;
