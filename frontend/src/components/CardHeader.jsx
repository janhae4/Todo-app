import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

const CardHeader = ({
  title: initialTitle,
  isChecked,
  onCheck,
  process,
  onProcessChange,
  onTitleChange,
}) => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  const handleBlur = () => {
    finishEditing();
  };

  const finishEditing = () => {
    const newTitle = inputRef.current.value.trim();
    if (newTitle === "") {
      console.log("Cannot leave the title empty. Restoring original title.");
      onTitleChange(initialTitle);
    } else if (newTitle !== initialTitle) {
      onTitleChange(newTitle);
    }
    setEditing(false);
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    const nextCheck = isChecked === 0 ? 1 : isChecked === 1 ? 2 : 0;
    onCheck(nextCheck);
    onProcessChange(process === "Todo" ? "Doing" : process === "Doing" ? "Done" : "Todo");
  };

  return (
    <div
      id="header-card"
      className="flex justify-between items-center gap-4 h-20"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          defaultValue={initialTitle}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-semibold text-gray-800 break-words w-full outline-none border-b border-gray-300 focus:border-blue-500 py-1 px-2"
        />
      ) : (
        <h4
          className="text-lg font-semibold text-gray-800 break-words max-w-full line-clamp-2"
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
        >
          {initialTitle}
        </h4>
      )}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition ease-in-out"
        onClick={handleStatusClick}
      >
        <div className="icon-wrapper">
          {process == "Done" ? (
            <FaCheckCircle
              size="15"
              className="text-green-600"
              fontWeight="bold"
            />
          ) : process == "Todo" ? (
            <FaRegCircle size="15" className="text-gray-600" />
          ) : (
            <FaCircleMinus size="15" className="text-gray-400" />
          )}
        </div>
      </button>
    </div>
  );
};

export default CardHeader;
