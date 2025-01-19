import { Container, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

export const QuestionnaireLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #E3F2FD, #BBDEFB)",
      py: 4,
    }}
  >
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Paper elevation={4} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {children}
        </Paper>
      </Box>
    </Container>
  </Box>
);
export default QuestionnaireLayout;
