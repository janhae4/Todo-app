import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember:", remember);
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-50 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max-w-full md:flex-row md:flex-1 lg:max-w-screen-md">
        {/* Left Section */}
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-left md:justify-evenly px-14">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-200 text-left text-4xl"
            >
              <h1>TODO</h1>
              <h1>APP</h1>
            </Link>
          </div>
          <p className="mt-6 font-normal text-justify text-gray-200 md:mt-0 text-sm">
            Take control of your tasks and boost your productivity with the Todo
            App. Stay organized, set clear goals, and let our modern, intuitive
            design help you stay focused on what truly matters!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-sm">
            <span className="text-gray-200">Don't have an account?</span>
            <Link
              to="/signup"
              className="underline text-white hover:text-gray-200"
            >
              Get Started!
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-200">
            Read our{" "}
            <Link to="/terms" className="underline hover:text-gray-200">
              terms
            </Link>{" "}
            and{" "}
            <Link to="/conditions" className="underline hover:text-gray-200">
              conditions
            </Link>
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Password"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-300"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              >
                Log in
              </button>
            </div>

            {/* Social Login */}
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                {/* Github */}
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 space-x-2 border border-gray-800 rounded-md group hover:bg-blue-500 transition duration-300"
                >
                  <FcGoogle
                    className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                  />
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Google
                  </span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
