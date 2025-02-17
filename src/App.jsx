import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./helpers/useToast";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Fade,
  CardMedia,
  IconButton,
  MobileStepper,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";

import { parseJwt } from "./utils/decodeJWT";
import axios from "axios";

export default function App() {
  const navigate = useNavigate();
  const { toast, showToast, closeToast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const colors = {
    primary: "#4A90E2", // Calming blue
    secondary: "#67B26F", // Healing green
    accent: "#98CAFF", // Soft sky blue
    text: darkMode ? "#FFFFFF" : "#2C3E50",
    background: darkMode ? "#1A202C" : "#F8FAFC",
    gradient: "linear-gradient(135deg, #4A90E2 0%, #67B26F 100%)",
  };

  const mentalHealthTips = [
    {
      title: "Practice Mindfulness",
      content:
        "Take a few minutes each day to practice mindfulness meditation.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
    {
      title: "Stay Active",
      content: "Regular exercise can help improve your mental well-being.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    },
    {
      title: "Connect with Others",
      content: "Maintain strong social connections with friends and family.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    },
  ];

  // Add a function to decode JWT token (optional, but useful)
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  // Update the useEffect hook to check auth status on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          // Token is still valid
          setUser({
            id: decodedToken.userId,
            isAdmin: decodedToken.isAdmin,
          });
        } else {
          // Token is expired
          handleLogout();
        }
      }
    };
    checkAuth();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Carousel controls
  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % mentalHealthTips.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevStep) =>
        (prevStep - 1 + mentalHealthTips.length) % mentalHealthTips.length
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  // Update the handleLoginSubmit function with correct URL
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/user/login",
        {
          email: loginForm.email,
          password: loginForm.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log("Login response:", data);

      if (response.status === 200 && data.token) {
        // Store authentication data
        localStorage.setItem("User_Token", data.token);

        // Set user data
        setUser({
          email: loginForm.email,
          isAdmin: data.isAdmin,
        });

        // Clear form and close modal
        setShowLoginModal(false);
        setLoginForm({ email: "", password: "" });

        // Decode JWT token if necessary
        const decodedToken = parseJwt(data.token);

        if (decodedToken) {
          const { userId, isAdmin } = decodedToken;
          if (isAdmin) {
            navigate("/admin");
          } else {
            navigate(`/user/${userId}/dashboard`);
          }
        } else {
          console.warn("Failed to decode JWT.");
        }
      } else {
        // Handle specific error messages from your backend
        const errorMessage = data.message || "Login failed";
        setError(errorMessage);
        showToast(errorMessage, "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "An error occurred during login";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the handleRegisterSubmit function with correct URL
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check if passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/user/register",
        {
          username: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          isAdmin: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // No need for `await response.data`
      console.log("Register response:", data);

      // Debug logging
      console.log("Register response:", response.status === 200);
      if (response.status === 200) {
        // Handle successful registration
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        showToast("Register Successful!", "success");
      } else {
        // Handle registration error
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err); // Debug logging
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      showToast("Register Failed!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setUser(null);
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Contact form submitted:", contactForm);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-[#1a1f2e] text-white"
          : "bg-gradient-to-br from-[#f0f4ff] to-white text-gray-900"
      }`}
    >
      {/* Modern Navbar */}
      <nav className={`${darkMode ? "bg-[#232838]" : "bg-white"} shadow-lg`}>
        <div className=" mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <PsychologyIcon
                fontSize="large"
                className="w-6 h-6 text-blue-500"
              />
              <h1 className="text-2xl font-bold tracking-tight cursor-pointer">
                MindCare
              </h1>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-500 transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="hover:text-blue-500 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-blue-500 transition-colors"
              >
                Contact
              </a>

              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                Get Started
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <LightModeIcon className="w-5 h-5" />
                ) : (
                  <DarkModeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 bg-gray-800 dark:bg-white shadow-lg rounded-b-lg">
            <a
              href="#"
              className="block text-gray-600 py-2 hover:text-blue-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-gray-600 py-2 hover:text-blue-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-600 py-2 hover:text-blue-500 transition-colors"
            >
              Contact
            </a>

            <button
              onClick={() => setShowLoginModal(true)}
              className="block text-gray-600 w-full text-left py-2 hover:text-blue-500 transition-colors"
            >
              Login
            </button>
            <button
              className="block text-gray-600 w-full text-left py-2 hover:text-blue-500 transition-colors"
              onClick={() => setShowRegisterModal(true)}
            >
              Get Started
            </button>
          </div>
        )}
      </nav>
      {/* Hero Section with Carousel */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          background: colors.gradient,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: "white", mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Your Journey to Mental Wellness
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Professional support and guidance for your mental health
                  journey
                </Typography>
                <Button
                  onClick={() => setShowRegisterModal(true)}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: colors.primary,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={6}
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  width: "100%", // Ensure Paper takes full width
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%", // Ensure container takes full width
                    height: "400px", // Fixed height for consistency
                  }}
                >
                  {mentalHealthTips.map((tip, index) => (
                    <Fade key={index} in={activeStep === index} timeout={500}>
                      <Box
                        sx={{
                          display: activeStep === index ? "block" : "none",
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Ensure consistent image sizing
                          }}
                          image={tip.image}
                          alt={tip.title}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: "rgba(0,0,0,0.6)",
                            color: "white",
                            p: 3,
                          }}
                        >
                          <Typography variant="h5" gutterBottom>
                            {tip.title}
                          </Typography>
                          <Typography>{tip.content}</Typography>
                        </Box>
                      </Box>
                    </Fade>
                  ))}
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    transform: "translateY(-50%)",
                  }}
                >
                  <IconButton
                    onClick={handleBack}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.3)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                      color: "white",
                    }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.3)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                      color: "white",
                    }}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Box>

                <MobileStepper
                  steps={mentalHealthTips.length}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    bgcolor: "transparent",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    "& .MuiMobileStepper-dot": {
                      bgcolor: "rgba(255,255,255,0.5)",
                    },
                    "& .MuiMobileStepper-dotActive": {
                      bgcolor: "white",
                    },
                  }}
                  nextButton={<Box />}
                  backButton={<Box />}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <div className="bg-white dark:bg-[#232838] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                90% Accuracy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reliable Assessments
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                24/7 Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Instant Self-Evaluation
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get Insights in Minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="max-w-7xl  mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Our Platform</h2>
            <p className="text-gray-300 dark:text-gray-600 mb-4">
              We are dedicated to making mental health support accessible to
              everyone. Our AI-driven platform provides self-evaluation tools
              and resources to help you understand and improve your mental
              well-being.
            </p>
            <p className="text-gray-300 dark:text-gray-600">
              Our team has developed comprehensive assessment tools that can
              help identify potential mental health concerns and guide you
              toward appropriate support and resources.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#2E5077] to-[#4DA1A9] p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To provide accessible, user-friendly mental health evaluation
              tools and resources that empower individuals to take control of
              their mental well-being and seek appropriate support when needed.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="bg-white dark:bg-[#232838] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl text-gray-300 dark:text-gray-600 font-bold mb-8 text-center">
            Get in Touch
          </h2>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                className="w-full text-white p-3 border rounded-lg bg-transparent"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                className="w-full text-white p-3 border rounded-lg bg-transparent"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                className="w-full text-white p-3 border rounded-lg bg-transparent h-32"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-[#232838]" : "bg-white"
            } rounded-lg p-8 max-w-md w-full`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <button
                  onClick={switchToRegister}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Register here
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-[#232838]" : "bg-white"
            } rounded-lg p-8 max-w-md w-full`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create Account</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border rounded-lg bg-transparent"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Account
              </button>
              <p className="text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={closeToast}>
        <Alert onClose={closeToast} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
