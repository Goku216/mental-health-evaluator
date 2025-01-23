import { useState, useEffect } from "react";
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

  const [sentMessages, setSentMessages] = useState([]);

  const healthCategories = [
    "General Wellness",
    "Nutrition",
    "Exercise",
    "Mental Health",
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      ...messageData,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };

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
                        <MenuItem key={user.username} value={user.username}>
                          {user.username}
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

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sent Messages
            </Typography>
            {sentMessages.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No messages sent yet
              </Typography>
            ) : (
              <List>
                {sentMessages.map((message) => (
                  <React.Fragment key={message.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${message.title} (${message.category})`}
                        secondary={`To: ${message.recipient} | ${message.date}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MessagesPage;
