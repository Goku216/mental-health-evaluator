// SettingsPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Save,
  NotificationsActive,
  ColorLens,
  Language,
} from "@mui/icons-material";

const SettingsSection = ({ title, children }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Divider sx={{ mb: 3 }} />
    {children}
  </Paper>
);

export const UserSettings = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetch_UserProfile = async () => {
      try {
        const response = await axios.get(`/user/${id}/getusername`);
        const data = await response.data;
        setFormData({
          username: data.username,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetch_UserProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user entered a new password
    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        return alert("Passwords do not match");
      }
    }

    if (
      (formData.currentPassword &&
        (!formData.newPassword || !formData.confirmPassword)) ||
      (formData.newPassword &&
        (!formData.currentPassword || !formData.confirmPassword)) ||
      (formData.confirmPassword &&
        (!formData.newPassword || !formData.currentPassword))
    ) {
      return alert("Please enter remaining field");
    }

    // Prepare the payload dynamically, excluding empty fields
    const payload = {
      username: formData.username,
      email: formData.email,
    };

    if (formData.currentPassword && formData.newPassword) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    try {
      const response = await axios.put(`/user/${id}/changesettings`, payload);
      console.log(payload);
      console.log(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Profile Settings */}
          <SettingsSection title="Profile Settings">
            <Stack spacing={3}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </SettingsSection>

          {/* Password Settings */}
          <SettingsSection title="Change Password">
            <Stack spacing={3}>
              <TextField
                label="Current Password"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="New Password"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </SettingsSection>

          {/* Preferences */}
          <SettingsSection title="Preferences">
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    name="emailNotifications"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <NotificationsActive sx={{ mr: 1 }} />
                    Email Notifications
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.darkMode}
                    onChange={handleChange}
                    name="darkMode"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ColorLens sx={{ mr: 1 }} />
                    Dark Mode
                  </Box>
                }
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Language sx={{ mr: 1 }} />
                <TextField
                  select
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </TextField>
              </Box>
            </Stack>
          </SettingsSection>

          {/* Feedback Messages */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            fullWidth
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserSettings;
