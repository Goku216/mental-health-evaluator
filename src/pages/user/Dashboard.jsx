import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Alert, AlertTitle } from "@mui/material";
import {
  AvailableTests,
  QuickStats,
  RecentTests,
  UserOverview,
} from "../../components/user";
import { parseJwt } from "../../utils/decodeJWT";
import axios from "axios";

export const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("User_Token");

    if (userToken) {
      const decodedToken = parseJwt(userToken);

      if (decodedToken) {
        const { userId } = decodedToken;
        setUserId(userId);
      } else {
        console.warn("Failed to decode JWT.");
      }
    } else {
      console.warn("No token found.");
    }
  }, []);

  // Sample data - replace with actual data from your backend
  const userData = {
    name: "John",
    id: userId, // Added user ID
    lastAssessment: "March 1, 2024",
    stats: {
      testsCompleted: 12,
      streak: 5,
      latestScore: 3,
      severity: "Mild",
    },
    testHistory: [
      { date: "2024-01-01", PHQ9: 3, GAD7: 4 },
      { date: "2024-01-15", PHQ9: 4, GAD7: 3 },
      { date: "2024-02-01", PHQ9: 2, GAD7: 2 },
      { date: "2024-02-15", PHQ9: 1, GAD7: 2 },
      { date: "2024-03-01", PHQ9: 2, GAD7: 1 },
    ],
    availableTests: [
      {
        id: "phq9",
        name: "PHQ-9",
        description: "Patient Health Questionnaire for Depression",
        timeToComplete: "5-10 minutes",
        questions: 9,
      },
      {
        id: "gad7",
        name: "GAD-7",
        description: "Generalized Anxiety Disorder Assessment",
        timeToComplete: "5-7 minutes",
        questions: 7,
      },
    ],
    recentTests: [
      { id: 1, type: "PHQ-9", score: 3, date: "2024-03-01", severity: "Mild" },
      {
        id: 2,
        type: "GAD-7",
        score: 2,
        date: "2024-03-01",
        severity: "Minimal",
      },
    ],
  };

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
