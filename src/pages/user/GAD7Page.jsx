import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  QuestionnaireLayout,
  ProgressHeader,
  QuestionCard,
} from "../../components/user";
import axios from "axios";

export const GAD7Page = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [GAD7_QUESTIONS, setGAD7_QUESTIONS] = useState([]);
  const [answers, setAnswers] = useState(
    new Array(GAD7_QUESTIONS.length).fill(null)
  );

  //fetch questions
  useEffect(() => {
    const fetchGAD7_QUESTIONS = async () => {
      try {
        const response = await axios.get("/user/gad7");
        const data = await response.data;
        setGAD7_QUESTIONS(data.data);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };

    fetchGAD7_QUESTIONS();
  }, []);

  // Reset currentAnswer when question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    // Save the current answer to answers object
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = currentAnswer;
      return newAnswers;
    });

    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
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
        assessmentType: "GAD7",
      });

      // Then complete the session
      const sessionResponse = await axios.patch(`/user/${id}/complete-session`);

      console.log("Assessment Result:", answersResponse.data);
      console.log("Session Response:", sessionResponse);
      console.log("State to be passed:", answersResponse.data.data);
      navigate(`/session/${id}/result`, { state: answersResponse.data.data });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const progress = (currentQuestion + 1) * (100 / GAD7_QUESTIONS.length);

  return (
    <QuestionnaireLayout>
      <ProgressHeader title="Anxiety Assessment (GAD-7)" progress={progress} />
      <Box sx={{ p: 3 }}>
        <QuestionCard
          question={GAD7_QUESTIONS[currentQuestion]}
          selectedAnswer={currentAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === GAD7_QUESTIONS.length - 1}
        />
      </Box>
    </QuestionnaireLayout>
  );
};

export default GAD7Page;
