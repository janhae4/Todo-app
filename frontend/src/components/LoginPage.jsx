import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Signup from "./SignUpPage";

function Login({setIsDirect}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userID = localStorage.getItem("token");
    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userID }),
      });
      if (!response.ok) throw new Error("Failed to login");
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
    <div className="relative w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={showSignup ? "signup" : "login"}
          initial={{ opacity: 0, x: showSignup ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: showSignup ? -100 : 100 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {!showSignup ? (
            <div>
              <h1 className="my-8 sm:my-6 text-3xl font-extrabold text-gray-700">
                Account Login
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-10"
              >
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
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Email address"
                    autoFocus
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
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Password"
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
                    className="w-full p-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 flex items-center justify-center"
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
                        Logging in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center block lg:hidden">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setShowSignup(true)}
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </div>
          ) : (
            <Signup setShowSignup={setShowSignup} setIsDirect={setIsDirect} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;
