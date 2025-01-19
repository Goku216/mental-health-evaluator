import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export const RecentTests = ({ tests }) => {
  return (
    <Paper sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Recent Tests
      </Typography>
      <List>
        {tests.map((test, index) => (
          <React.Fragment key={test.id}>
            <ListItem>
              <ListItemText primary={test.type} secondary={test.date} />
              <ListItemText
                primary={`Score: ${test.score}`}
                secondary={test.severity}
                sx={{ textAlign: "right" }}
              />
            </ListItem>
            {index < tests.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
