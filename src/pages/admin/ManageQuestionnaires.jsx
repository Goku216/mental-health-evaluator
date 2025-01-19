// QuestionnairePage.jsx
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Initial questionnaires data
const initialQuestionnaires = [
  {
    id: 1,
    title: "PHQ-9",
    description:
      "Patient Health Questionnaire for depression screening and monitoring.",
    image: "/api/placeholder/400/200",
    questions: 9,
    timeToComplete: "5-10 minutes",
  },
  {
    id: 2,
    title: "GAD-7",
    description:
      "Generalized Anxiety Disorder assessment for anxiety screening.",
    image: "/api/placeholder/400/200",
    questions: 7,
    timeToComplete: "5-8 minutes",
  },
];

const QuestionnaireCard = ({ questionnaire, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={questionnaire.image}
        alt={questionnaire.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography gutterBottom variant="h6" component="h2">
            {questionnaire.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(questionnaire)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(questionnaire.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {questionnaire.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Questions: {questionnaire.questions}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time: {questionnaire.timeToComplete}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const AddQuestionnaireCard = ({ onClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "action.hover",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <AddIcon sx={{ fontSize: 60, color: "text.secondary" }} />
          <Typography variant="h6" color="text.secondary">
            Add New Questionnaire
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const QuestionnaireDialog = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      questions: "",
      timeToComplete: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Questionnaire" : "Add New Questionnaire"}
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <TextField
            margin="dense"
            label="Number of Questions"
            type="number"
            fullWidth
            value={formData.questions}
            onChange={(e) =>
              setFormData({ ...formData, questions: e.target.value })
            }
            required
          />
          <TextField
            margin="dense"
            label="Time to Complete"
            fullWidth
            value={formData.timeToComplete}
            onChange={(e) =>
              setFormData({ ...formData, timeToComplete: e.target.value })
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Save Changes" : "Add Questionnaire"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const ManageQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState(initialQuestionnaires);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestionnaire, setEditingQuestionnaire] = useState(null);

  const handleAdd = (newQuestionnaire) => {
    setQuestionnaires([
      ...questionnaires,
      {
        ...newQuestionnaire,
        id: questionnaires.length + 1,
        image: "/api/placeholder/400/200",
      },
    ]);
  };

  const handleEdit = (questionnaire) => {
    setEditingQuestionnaire(questionnaire);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setQuestionnaires(questionnaires.filter((q) => q.id !== id));
  };

  const handleSubmit = (formData) => {
    if (editingQuestionnaire) {
      setQuestionnaires(
        questionnaires.map((q) =>
          q.id === editingQuestionnaire.id ? { ...q, ...formData } : q
        )
      );
      setEditingQuestionnaire(null);
    } else {
      handleAdd(formData);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Questionnaires
      </Typography>
      <Grid container spacing={4}>
        {questionnaires.map((questionnaire) => (
          <Grid item key={questionnaire.id} xs={12} sm={6} md={4}>
            <QuestionnaireCard
              questionnaire={questionnaire}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <AddQuestionnaireCard onClick={() => setDialogOpen(true)} />
        </Grid>
      </Grid>

      <QuestionnaireDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingQuestionnaire(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingQuestionnaire}
      />
    </Container>
  );
};
