import React from "react";
import { ResourceCard } from "../../components/user";
import {
  educationalResources,
  crisisResources,
} from "../../components/user/Resources/ResourceData";
import { Container, Typography, Box } from "@mui/material";

export const ResourcesPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mental Health Resources
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Access comprehensive mental health resources and crisis support
          information. Click on each section to learn more.
        </Typography>

        <ResourceCard {...educationalResources} />
        <ResourceCard {...crisisResources} />
      </Box>
    </Container>
  );
};

export default ResourcesPage;
