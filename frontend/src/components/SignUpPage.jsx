import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Signup({ setShowSignup, setIsDirect }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const userID = localStorage.getItem("token");

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userID }),
      });
      if (!response.ok) throw new Error("Failed to sign up");
      const data = await response.json();
      localStorage.setItem("token", data.user._id);
      setIsDirect(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setTimeout(()=>setLoading(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="my-6 sm:my-3 text-3xl font-extrabold text-gray-700">
        Create Account
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-gray-500"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="username"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-500"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Password"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="signup-confirm-password"
            className="text-sm font-semibold text-gray-500"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="signup-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Confirm Password"
            disabled={loading}
          />
        </div>
        <div>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="submit"
            className="w-full p-4 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:bg-gray-400 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
      <div className="text-center mt-3 block lg:hidden">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setShowSignup(false)}
        >
          Already have an account? Log in
        </button>
      </div>
    </motion.div>
  );
}

export default Signup;
