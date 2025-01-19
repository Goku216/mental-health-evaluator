import { Radio } from "@mui/material";
import { motion } from "framer-motion";

export const StyledRadio = (props) => (
  <Radio
    {...props}
    sx={{
      "& .MuiSvgIcon-root": {
        fontSize: 28, // Larger radio buttons
      },
      "&:hover": {
        bgcolor: "rgba(25, 118, 210, 0.04)",
      },
      "&.Mui-checked": {
        "& .MuiSvgIcon-root": {
          transform: "scale(1.2)",
          transition: "transform 0.2s",
        },
      },
    }}
    componentsProps={{
      input: {
        component: motion.input,
        whileTap: { scale: 0.9 },
      },
    }}
  />
);

export default StyledRadio;

// components/QuestionCard.js
