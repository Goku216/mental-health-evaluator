import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export const ResourceCard = ({ title, topics }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List>
            {topics.map((topic, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={topic.title}
                  secondary={
                    <List>
                      {topic.subtopics.map((subtopic, subIndex) => (
                        <ListItem key={subIndex} sx={{ pl: 4 }}>
                          <ListItemText primary={subtopic} />
                        </ListItem>
                      ))}
                    </List>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
