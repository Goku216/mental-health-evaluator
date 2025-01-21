import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import StyledRadio from "./StyleRadio";

export const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}) => {
  if (!question) {
    return <p>Loading question...</p>;
  }

  // Ensure selectedAnswer is always a controlled value by providing a default
  const currentValue = selectedAnswer === undefined ? null : selectedAnswer;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card sx={{ mb: 2, boxShadow: 3 }}>
        <CardContent>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "primary.light",
              p: 2,
              mb: 3,
              borderRadius: 2,
              color: "white",
            }}
          >
            <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>
              Over the last 2 weeks, how often have you been bothered by the
              following problems?
            </Typography>
          </Paper>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "text.primary",
              mb: 3,
              fontWeight: 500,
            }}
          >
            {question.text}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <RadioGroup
            value={currentValue}
            onChange={(e) => onAnswer(Number(e.target.value))}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {question.options.map((option, index) => (
                <Box
                  key={option.value}
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                        transform: "translateX(8px)",
                      },
                    }}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<StyledRadio />}
                      label={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {option.label}
                        </Typography>
                      }
                      sx={{
                        m: 0,
                        p: 1.5,
                        width: "100%",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Paper>
                </Box>
              ))}
            </Box>
          </RadioGroup>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              onClick={onPrevious}
              disabled={isFirstQuestion}
              startIcon={<NavigateBeforeIcon />}
              size="large"
              sx={{ px: 4 }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={currentValue === null}
              endIcon={<NavigateNextIcon />}
              size="large"
              sx={{ px: 4 }}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionCard;
