import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import {
  Assessment,
  Person,
  CalendarToday,
  Warning,
  ArrowBack,
} from "@mui/icons-material";

const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

export const UserView = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // api call for dashboard data

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/user/${id}/getstats`);
        if (response.data) {
          setUserData(response.data);
        } else {
          setUserData({}); // Set empty object if no data is returned
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({}); // Handle error gracefully
      }
    };

    fetchStats();
  }, [id]);

  if (!userData) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  const { name, stats, recentTests, lastAssessment } = userData;

  return (
    <Box sx={{ p: 3 }}>
      {/* User Identity Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Person sx={{ fontSize: 40, color: "primary.main" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">User Profile</Typography>
            <Typography color="textSecondary">
              ID: {id} | Name: {name}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Assessment sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Total Assessments</Typography>
              </Box>
              <Typography variant="h4">{stats.testsCompleted}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CalendarToday sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Last Assessment</Typography>
              </Box>
              <Typography variant="h6">{lastAssessment}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Warning sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Current Severity</Typography>
              </Box>
              <Chip
                label={stats.severity}
                color={getSeverityColor(stats.severity)}
                sx={{ fontSize: "1.2rem", p: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assessment History */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Assessment History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assessment Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Severity Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.type}</TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell>{test.score}</TableCell>
                <TableCell>
                  <Chip
                    label={test.severity}
                    color={getSeverityColor(test.severity)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{
          mt: 5,
          mb: 3,
          color: "primary.main",
          borderColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "primary.contrastText",
          },
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default UserView;
