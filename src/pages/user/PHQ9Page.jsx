import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  QuestionnaireLayout,
  ProgressHeader,
  QuestionCard,
} from "../../components/user";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PHQ9Page = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [PHQ9_QUESTIONS, setPHQ9_QUESTIONS] = useState([]);
  useEffect(() => {
    const fetchPHQ9_QUESTIONS = async () => {
      try {
        const response = await axios.get("/user/phq9");
        const data = await response.data;
        setPHQ9_QUESTIONS(data.data);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };

    fetchPHQ9_QUESTIONS();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Initialize answers as an array with length matching questions, filled with null
  const [answers, setAnswers] = useState(
    new Array(PHQ9_QUESTIONS.length).fill(null)
  );
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  // Reset currentAnswer when question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentQuestion]);
  }, [currentQuestion, answers]);

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    // Update the answers array at the current question index
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = currentAnswer;
      return newAnswers;
    });

    if (currentQuestion < PHQ9_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setCurrentAnswer(null); // Reset selection for next question
    } else {
      // Handle assessment completion
      const sampleAnswer = [
        ...answers.slice(0, currentQuestion),
        currentAnswer,
      ];
      handleAssessmentCompletion(sampleAnswer);
      console.log("Submitted Answers:", sampleAnswer);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleAssessmentCompletion = async (sampleAnswer) => {
    try {
      // First, post the answers and get the assessment result
      const answersResponse = await axios.post(`/user/${id}/submit-answers`, {
        answers: sampleAnswer,
        assessmentType: "PHQ9",
      });

      // Then complete the session
      const sessionResponse = await axios.patch(`/user/${id}/complete-session`);

      setResponseMessage("Your assessment has been completed successfully.");
      console.log("Assessment Result:", answersResponse.data);
      console.log("Session Response:", sessionResponse);
      console.log("State to be passed:", answersResponse.data.data);
      navigate(`/session/${id}/result`, { state: answersResponse.data.data });
    } catch (error) {
      console.error("Error submitting answers:", error);
      setResponseMessage("There was an error submitting your answers.");
    }
  };

  const progress = (currentQuestion + 1) * (100 / PHQ9_QUESTIONS.length);

  return (
    <QuestionnaireLayout>
      <ProgressHeader
        title="Depression Assessment (PHQ-9)"
        progress={progress}
      />
      <Box sx={{ p: 3 }}>
        <QuestionCard
          question={PHQ9_QUESTIONS[currentQuestion]}
          selectedAnswer={currentAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === PHQ9_QUESTIONS.length - 1}
        />
      </Box>
    </QuestionnaireLayout>
  );
};

export default PHQ9Page;
