import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  QuestionnaireLayout,
  ProgressHeader,
  QuestionCard,
} from "../../components/user";
import { PHQ9_QUESTIONS } from "../../constants/questions";

export const PHQ9Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Initialize answers as an array with length matching questions, filled with null
  const [answers, setAnswers] = useState(
    new Array(PHQ9_QUESTIONS.length).fill(null)
  );
  const [currentAnswer, setCurrentAnswer] = useState(null);

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

      console.log("Submitted Answers:", sampleAnswer);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
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
