// QuestionnairePage.jsx
import { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import Image from "../../assets/questionnaire.jpg";

const QuestionnaireCard = ({ questionnaire, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={Image}
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        questions: initialData.no_of_questions || "", // Match backend field
        timeToComplete: initialData.time_to_complete || "", // Match backend field
      });
    } else {
      setFormData({
        title: "",
        description: "",
        questions: "",
        timeToComplete: "",
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Transform data before submission
    const submissionData = {
      ...formData,
      no_of_questions: Number(formData.questions), // Ensure number type
    };
    onSubmit(submissionData);
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
  const [questionnaires, setQuestionnaires] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get("/admin/questionnaires");
        const data = await response.data;
        setQuestionnaires(data);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
        setError("Failed to fetch questionnaires");
      }
    };

    fetchQuestionnaires();
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestionnaire, setEditingQuestionnaire] = useState(null);

  const handleAdd = async (formData) => {
    try {
      // Transform the data to match backend expectations
      const questionnaireData = {
        title: formData.title,
        description: formData.description,
        no_of_questions: Number(formData.questions), // Ensure this is a number
        time_to_complete: formData.timeToComplete,
      };

      console.log("Adding questionnaire:", questionnaireData);

      const response = await axios.post(
        "/admin/questionnaires",
        questionnaireData
      );

      if (response.data.success) {
        setQuestionnaires([...questionnaires, response.data.data]);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error adding questionnaire:", error);
      setError(error.response?.data?.message || "Failed to add questionnaire");
    }
  };

  const handleEdit = (questionnaire) => {
    setEditingQuestionnaire(questionnaire);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/admin/questionnaires/${id}`);
      setQuestionnaires(questionnaires.filter((q) => q.id !== id));
      console.log("Item deleted successfully", response.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setError(null);

      // Transform the data to match backend expectations
      const questionnaireData = {
        title: formData.title,
        description: formData.description,
        no_of_questions: Number(formData.questions), // Ensure this is a number
        time_to_complete: formData.timeToComplete,
      };

      console.log("Submitting questionnaire:", questionnaireData);

      if (editingQuestionnaire) {
        const response = await axios.put(
          `/admin/questionnaires/${editingQuestionnaire.id}`,
          questionnaireData
        );

        if (response.data.success) {
          setQuestionnaires(
            questionnaires.map((q) =>
              q.id === editingQuestionnaire.id ? response.data.data : q
            )
          );
          setEditingQuestionnaire(null);
        } else {
          setError(response.data.message);
          return; // Don't close dialog if there's an error
        }
      } else {
        await handleAdd(formData);
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      setError(
        error.response?.data?.message || "Failed to submit questionnaire"
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Questionnaires
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

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
          setError(null);
        }}
        onSubmit={(formData) => {
          setDialogOpen(false);
          handleSubmit(formData);
          window.location.reload();
        }}
        initialData={editingQuestionnaire}
        error={error}
      />
    </Container>
  );
};
