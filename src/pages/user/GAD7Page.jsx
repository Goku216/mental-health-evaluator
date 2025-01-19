import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  QuestionnaireLayout,
  ProgressHeader,
  QuestionCard,
} from "../../components/user";
import { GAD7_QUESTIONS } from "../../constants/questions";

export const GAD7Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  // Add currentAnswer state to handle current selection
  const [currentAnswer, setCurrentAnswer] = useState(null);

  // Reset currentAnswer when question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    // Save the current answer to answers object
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: currentAnswer,
    }));

    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setCurrentAnswer(null); // Reset selection for next question
    } else {
      // Handle assessment completion
      console.log("Assessment completed:", {
        ...answers,
        [currentQuestion]: currentAnswer,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
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
