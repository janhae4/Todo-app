import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/LoginPage";
import Signup from "../components/SignUpPage";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDirect, setIsDirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDirect) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isDirect])

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-50 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg w-full h-120 md:flex-row md:flex-1 lg:max-w-screen-md relative">
      <div
        className={`p-4 py-6 text-white bg-gray-700 md:w-1/2 md:flex-shrink-0 md:flex md:flex-col md:items-left md:justify-evenly hidden md-block px-10 transition-transform duration-500 ease-in-out relative z-10 top-0 h-full ${
          isLogin ? "translate-x-0" : "translate-x-full md:translate-x-full"
        }`}
      >

          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/" className="hover:text-gray-200 transition duration-200 text-center text-4xl">
              <h1>TODO APP</h1>
            </a>
          </div>
          <p className="mt-6 font-normal text-justify text-gray-200 md:mt-0 text-sm">
            Take control of your tasks and boost your productivity with the Todo App.
            Stay organized, set clear goals, and let our modern, intuitive design help you stay focused!
          </p>
          <p className="flex flex-col gap-y-5 items-center justify-center mt-10 text-center text-sm">
            <span className="text-gray-200">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="underline py-3 px-7 text-white border boder-white cursor-pointer rounded-3xl hover:text-gray-200 focus:outline-none"
            >
              {isLogin ? "Get Started!" : "Log In!"}
            </button>
          </p>
        </div>

        <div
          className={`right-panel p-5 bg-white  md:flex-1 transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "-translate-x-full md:-translate-x-full"
          }`}
        >
          {isLogin ? <Login setIsDirect={setIsDirect} /> : <Signup setIsDirect={setIsDirect} />}
        </div>
      </div>
    </div>
  );
}

export default Auth;