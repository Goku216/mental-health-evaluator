import { useNavigate } from "react-router-dom";
import { Container, Alert, AlertTitle } from "@mui/material";
import {
  AvailableTests,
  QuickStats,
  RecentTests,
  UserOverview,
} from "../../components/user";

export const Dashboard = () => {
  const navigate = useNavigate();
  // Sample data - replace with actual data from your backend

  const userData = {
    name: "John",
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

  const handleStartTest = (testId) => {
    console.log(`Starting test: ${testId}`);
    if (testId === "phq9") {
      navigate("/user/:id/phq9");
    } else if (testId === "gad7") {
      navigate("/user/:id/gad7");
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
