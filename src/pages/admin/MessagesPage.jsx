import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import { Send as SendIcon, Message as MessageIcon } from "@mui/icons-material";

export function MessagesPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const [messageData, setMessageData] = useState({
    recipient: "",
    category: "",
    title: "",
    content: "",
  });
  const [successmessage, setSuccessMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage(""); // Clear the message after a certain time
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
  }, []);

  const [sentMessages, setSentMessages] = useState([]);

  const healthCategories = [
    "General Wellness",
    "Nutrition",
    "Exercise",
    "Mental Health",
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      ...messageData,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };

    console.log(e);

    const payload = {
      to: messageData.recipient,
      subject: newMessage.title,
      text: newMessage.content,
    };

    try {
      const response = await axios.post("/admin/sendemail", payload);
      const data = response.data;
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message || "Something went wrong");
    }
    console.log("Sending message:", newMessage);

    setSentMessages([newMessage, ...sentMessages]);

    // Reset form
    setMessageData({
      recipient: "",
      category: "",
      title: "",
      content: "",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {successmessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successmessage}
        </Alert>
      )}

      {errormessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errormessage}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        Health Tips and Messages
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Send New Message
            </Typography>
            <Box component="form" onSubmit={handleSendMessage}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Send To</InputLabel>
                    <Select
                      value={messageData.recipient}
                      label="Send To"
                      onChange={(e) =>
                        setMessageData({
                          ...messageData,
                          recipient: e.target.value,
                        })
                      }
                      required
                    >
                      {users.map((user) => (
                        <MenuItem key={user.username} value={user.email}>
                          {" "}
                          {user.username} ({user.email}){" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Health Category</InputLabel>
                    <Select
                      value={messageData.category}
                      label="Health Category"
                      onChange={(e) =>
                        setMessageData({
                          ...messageData,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      {healthCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message Title"
                    value={messageData.title}
                    onChange={(e) =>
                      setMessageData({
                        ...messageData,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message Content"
                    multiline
                    rows={4}
                    value={messageData.content}
                    onChange={(e) =>
                      setMessageData({
                        ...messageData,
                        content: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MessagesPage;
