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

export const ResourceCard = ({ resourceData }) => {
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
            {resourceData.title}
          </Typography>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List>
            {resourceData.topics.map((topic, topicIndex) => (
              <ListItem key={topicIndex}>
                <ListItemText
                  primary={topic.title}
                  secondary={
                    <List>
                      {topic.subtopics.map((subtopic, subtopicIndex) => {
                        // Handling both simple strings and objects with title/description
                        const subtopicTitle =
                          typeof subtopic === "string"
                            ? subtopic
                            : subtopic.title;
                        const subtopicDescription =
                          typeof subtopic === "object"
                            ? subtopic.description
                            : null;

                        return (
                          <ListItem key={subtopicIndex} sx={{ pl: 4 }}>
                            <ListItemText
                              primary={subtopicTitle}
                              secondary={subtopicDescription}
                            />
                          </ListItem>
                        );
                      })}
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
