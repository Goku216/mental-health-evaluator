import React, { useState, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mentalHealthTips.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mentalHealthTips.length) % mentalHealthTips.length
    );
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Contact form submitted:", contactForm);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Mental Health Evaluator</h1>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md focus:outline-none"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
              <a href="#about" className="hover:text-blue-500">
                About
              </a>
              <a href="#contact" className="hover:text-blue-500">
                Contact
              </a>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4">
            <a href="#" className="block py-2">
              Home
            </a>
            <a href="#about" className="block py-2">
              About
            </a>
            <a href="#contact" className="block py-2">
              Contact
            </a>
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full text-left py-2"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Your Mental Health Matters
          </h1>
          <p className="text-xl mb-8">
            Get professional evaluation and support for your mental well-being
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Updated Full-width Carousel Section */}
      <div className="mx-auto max-w-7xl py-12">
        <div className="relative w-full">
          <div
            className="h-[500px] w-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${mentalHealthTips[currentSlide].image})`,
              transition: "background-image 0.5s ease-in-out",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-4">
                  {mentalHealthTips[currentSlide].title}
                </h2>
                <p className="text-xl mb-4">
                  {mentalHealthTips[currentSlide].content}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-3 rounded-full hover:bg-white/75 transition-all"
          >
            <ArrowBackIcon className="text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-3 rounded-full hover:bg-white/75 transition-all"
          >
            <ArrowForwardIcon className="text-gray-800" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {mentalHealthTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              We are dedicated to making mental health support accessible to
              everyone. Our platform provides self evaluation tools and
              resources to help you understand and improve your mental
              well-being.
            </p>
            <p>
              Our team has developed comprehensive assessment tools that can
              help identify potential mental health concerns and guide you
              toward appropriate support and resources.
            </p>
          </div>
          <div className="bg-green dark:bg-blue-700 p-6 rounded-lg">
            <h3 className="text-xl text-white font-bold mb-4">Our Mission</h3>
            <p className="text-white">
              To provide accessible, user-friendly mental health evaluation
              tools and resources that empower individuals to take control of
              their mental well-being and seek appropriate support when needed.
            </p>
          </div>
        </div>
      </div>

      {/* New Contact Form Section */}
      <div id="contact" className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={contactForm.name}
              onChange={handleContactChange}
              className={`w-full p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactChange}
              className={`w-full p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              className={`w-full p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg p-8 max-w-md w-full`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Login</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
