import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";
import {
  Lock as LockIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    marketingEmails: false,
  });
  const [message, setMessage] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate profile update
    setMessage("Profile updated successfully");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    // Simulate password change
    setMessage("Password updated successfully");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Settings
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Paper square>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<LockIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box component="form" onSubmit={handleProfileUpdate} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={() => toggleNotification("emailNotifications")}
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={() => toggleNotification("pushNotifications")}
                  />
                }
                label="Push Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.securityAlerts}
                    onChange={() => toggleNotification("securityAlerts")}
                  />
                }
                label="Security Alerts"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketingEmails}
                    onChange={() => toggleNotification("marketingEmails")}
                  />
                }
                label="Marketing Emails"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default AdminSettings;
