import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  LinearProgress,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Info as InfoIcon,
  AccessTime as TimeIcon,
  QuestionAnswer as QuestionIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Star as StarIcon,
} from "@mui/icons-material";

export const AvailableTests = ({ tests, onStartTest }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {tests.map((test) => (
        <Grid item xs={12} key={test.id}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: { sm: "translateY(-4px)" },
                boxShadow: 6,
              },
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              mb={2}
              gap={2}
            >
              <PsychologyIcon
                sx={{
                  fontSize: { xs: 32, sm: 40 },
                  color: "primary.main",
                  alignSelf: { xs: "center", sm: "flex-start" },
                }}
              />
              <Box flex={1}>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  mb={1}
                  gap={1}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    {test.name}
                  </Typography>
                  <Tooltip title="View test details">
                    <IconButton size={isMobile ? "small" : "medium"}>
                      <InfoIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  gap={1}
                >
                  <Chip
                    size="small"
                    label={test.category || "Assessment"}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    icon={<StarIcon sx={{ fontSize: 16 }} />}
                    label={`${test.difficulty || "Intermediate"} Level`}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box
                textAlign={{ xs: "center", sm: "right" }}
                width={{ xs: "100%", sm: "auto" }}
              >
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {test.completionRate || "87%"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completion Rate
                </Typography>
              </Box>
            </Box>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.6,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {test.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  icon: <TimeIcon />,
                  label: "Time to Complete",
                  value: test.timeToComplete,
                },
                {
                  icon: <QuestionIcon />,
                  label: "Questions",
                  value: `${test.questions} questions`,
                },
                {
                  icon: <TrendingUpIcon />,
                  label: "Average Score",
                  value: test.averageScore || "75%",
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: { mr: 1, color: "text.secondary" },
                    })}
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign={{ xs: "center", sm: "left" }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        textAlign={{ xs: "center", sm: "left" }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                textAlign={{ xs: "center", sm: "left" }}
              >
                Test Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={test.progress || 0}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={{ xs: "center", sm: "left" }}
              >
                {test.completions || "2,547"} people have taken this test
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
                onClick={() => onStartTest(test.id)}
                sx={{
                  px: { xs: 2, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                Start Assessment
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableTests;
