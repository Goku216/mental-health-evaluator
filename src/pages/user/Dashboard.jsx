import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Alert, AlertTitle } from "@mui/material";

import {
  AvailableTests,
  QuickStats,
  RecentTests,
  UserOverview,
} from "../../components/user";
import axios from "axios";

export const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
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

  // Function to create evaluation session
  const createEvaluationSession = async (testId) => {
    try {
      if (!userData || !userData.id) {
        throw new Error("User data is not available.");
      }

      const sessionData = {
        id: crypto.randomUUID(), // Generate unique ID
        user_id: userData.id,
        questionnaire_id: testId,
        started_at: new Date().toISOString(),
        completed_at: null,
        status: "in_progress",
      };

      // Make API call to create session
      const response = await axios.post(
        "/user/evaluation-sessions",
        sessionData
      );

      // Store session ID safely
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("currentSessionId", sessionData.id);
      }

      return response?.data ?? { error: "Failed to create session" };
    } catch (error) {
      console.error("Error creating evaluation session:", error.message);
      return { error: "Error creating evaluation session. Please try again." };
    }
  };

  const handleStartTest = async (testId) => {
    try {
      const result = await createEvaluationSession(testId);

      if (result.error) {
        alert(result.error); // Notify user about failure
        return;
      }
      console.log(result);

      // Navigate to appropriate test page based on testId
      switch (testId) {
        case "phq9":
          navigate(`/session/${result.data.id}/phq9`);
          break;
        case "gad7":
          navigate(`/session/${result.data.id}/gad7`);
          break;
        default:
          console.warn("Unknown testId:", testId);
          navigate(`/user/${userId}/dashboard`);
      }
    } catch (error) {
      console.error("Error starting test:", error.message);
      alert("Failed to start the test. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg">
      <UserOverview
        name={userData.name}
        lastAssessment={userData.lastAssessment}
      />
      <QuickStats stats={userData.stats} />

      <AvailableTests
        tests={userData.availableTests}
        onStartTest={handleStartTest}
      />
      <RecentTests tests={userData.recentTests} />
      <Alert severity="info" sx={{ mt: 3 }}>
        <AlertTitle>Health Tip</AlertTitle>
        Regular assessment helps track your mental well-being. Consider taking
        tests at consistent intervals for better monitoring.
      </Alert>
    </Container>
  );
};

export default Dashboard;
