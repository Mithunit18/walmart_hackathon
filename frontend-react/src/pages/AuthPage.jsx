import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast'; // Import Toast functions
import { FaHome } from "react-icons/fa";



function AuthPage() {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Buyer");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [loadLogin,setLoadLogin] = useState(false);
  const [signIn,setSignIn] = useState(false); 
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const loginInputRef = useRef(null); // Reference to login username input

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoadLogin(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: loginUsername,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!"); // Show success toast
      navigate("/dashboard");
    } catch {
      setLoginError("Invalid credentials or server error.");
      toast.error("Login failed. Please check your credentials."); // Show error toast
    } finally {
      setLoadLogin(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");
    setSignIn(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        username: signupUsername,
        password: signupPassword,
        role: signupRole,
      });
      setSignupSuccess("Signup successful. You can now log in.");
      toast.success("Signup successful! You can now log in."); // Show success toast
      setSignupUsername("");
      setSignupPassword("");
      setSignupRole("Buyer");

      // Auto-fill and focus login input
      setLoginUsername(signupUsername);
      setTimeout(() => loginInputRef.current?.focus(), 100);
    } catch (err) {
      if (err.response?.status === 400) {
        setSignupError("User already exists or invalid data.");
        toast.error("User already exists or invalid data."); // Show error toast
      } else {
        setSignupError("Server error.");
        toast.error("Server error. Please try again later."); // Show error toast
      }
    } finally {
      setSignIn(false);
    }
  };

  return (

    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('/images/background.jpg.png')`, }} // Background image
    >
      <div className="absolute top-6 right-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
      >
        <FaHome className="text-xl" />
        <span className="hidden sm:inline">Home</span>
      </button>
    </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 , ease: 'easeOut' }}
        className="flex flex-col mt-4 sm:mt-0 md:flex-row gap-10 md:gap-20 lg:gap-32 xl:gap-60 w-full max-w-6xl px-4 justify-center"
      >
        {/* Login Box */}
        <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl shadow-md p-12 w-full max-w-md bg-opacity-80">
          <h2 className="text-2xl  text-gray-300 dark:text-blue-200 mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              ref={loginInputRef} // Ref attached
              className="w-full p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:border-black bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full p-3 rounded-lg border  border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:border-black bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 border-purple-900 text-white py-2 rounded-lg"
              disabled={loadLogin}
            >
              {loadLogin ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Signup Box */}
        <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl shadow-md p-12 w-full max-w-md bg-opacity-80">
          <h2 className="text-2xl text-gray-300 dark:text-green-200 mb-6 text-center">Register</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="w-full p-3 rounded-lg border  border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:border-black bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full p-3 rounded-lg border  border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:border-black bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
            <select
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              className="w-full p-3 rounded-lg border  border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:border-black bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="Admin">Admin</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Owner">Owner</option>
            </select>
            {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
            {signupSuccess && <p className="text-green-600 text-sm">{signupSuccess}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 border border-purple-900 text-white py-2 rounded-lg"
              disabled={setSignIn}
            >
              {signIn ? "Signning in" : "signIn"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
