import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Form from "../components/Form";
import TaskColumn from "../components/TaskColumn";
import {v4 as uuidv4} from "uuid";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [userID, setUserID] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) return storedToken;
    const newID = `guest-${uuidv4()}`;
    localStorage.setItem("token", newID);
    return newID;
  });

  const fetchTasks = async () => {
    console.log(localStorage.getItem("token"));
    const url = userID.startsWith("guest") ? "/api/guest/" : "/api/";
    try {
      const response = await fetch(`${url}${userID}/`,);
      if (!response.ok) {
        console.log("STATUS", response.status)
        throw new Error("Failed to fetch tasks from the server");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setTasks(data["task"] || []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const todoTasks = safeTasks.filter((task) => task.process === "Todo");
  const doingTasks = safeTasks.filter((task) => task.process === "Doing");
  const doneTasks = safeTasks.filter((task) => task.process === "Done");

  return (
    <div>
      <Header />
      <main className="px-4 md:px-10 lg:px-20 py-5 w-full">
        <Form onTaskAdded={fetchTasks}/>
        <hr className="border-t border-gray-300 my-4" />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">
            <p>{error.message || "Something went wrong!"}</p>
            <button
              onClick={fetchTasks}
              className="mt-2 text-blue-500 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 w-full">
            <TaskColumn
              title={"TO DO"}
              tasks={todoTasks}
              onFetch={fetchTasks}
            />
            <TaskColumn
              title={"DOING"}
              tasks={doingTasks}
              onFetch={fetchTasks}
            />
            <TaskColumn
              title={"DONE"}
              tasks={doneTasks}
              onFetch={fetchTasks}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;