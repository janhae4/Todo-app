import React, { useEffect, useState, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useHover } from "../hooks/useHover";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";

const Card = ({ id, name, category, process, onFetch }) => {
  const [categories, setCategories] = useState(category ? [...category] : ["Other"]);
  const [isChecked, setIsChecked] = useState(process === "Todo" ? 0 : process === "Doing" ? 1 : 2);
  const [currentProcess, setCurrentProcess] = useState(process || "Todo");
  const [title, setTitle] = useState(name || "Untitled");

  const [isHovering, setIsHovering, cardRef] = useHover();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateCategories = (updatedCategories) => setCategories(updatedCategories);

  const isInitialRender = useRef(true);
  const userId = localStorage.getItem("token");
  const url = userId.startsWith("guest") ? "/api/guest/" : "/api/";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      setTimeout(async () => {
        try {
          console.log(userId);
          const response = await fetch(`${url}${id}/?userId=${userId}`, {method: "DELETE"});
          if (!response.ok) throw new Error("Failed to delete task");
          if (onFetch) onFetch();
        } catch (error) {
          console.log(error);
          setIsDeleting(false);
        }
      }, 500);
    }
  };
  
  const updateTask = async () => {
    try {
      const response = await fetch(`${url}${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title, categories, process: currentProcess, userId }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      onFetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    updateTask();
  }, [title, categories, currentProcess]);


  return (
    <div
      ref={cardRef}
      className={`border border-gray-200 rounded-2xl p-6 w-full h-sm flex flex-col gap-4 bg-white hover:shadow-xl cursor-pointer active:bg-gray-50 transition-all duration-500 ${
        isDeleting ? "animate-slide-out" : ""
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader
        title={title}
        isChecked={isChecked}
        onCheck={setIsChecked}
        process={currentProcess}
        onProcessChange={setCurrentProcess}
        onTitleChange={setTitle}
      />
      <div id="main-card" className="flex justify-between items-center">
        <CardMain
          categories={categories}
          isHovering={isHovering}
          onUpdateCategories={handleUpdateCategories}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition"
          onClick={(e) => e.stopPropagation()}
        >
          <MdDeleteOutline
            size="22"
            className="text-gray-600"
            onClick={handleDelete}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
