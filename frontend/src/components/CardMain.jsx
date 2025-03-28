import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useClickOutside } from "../hooks/useClickOutSide";

const mapClass = {
  Class: "bg-red-50 text-red-700 ring-red-600/10",
  Home: "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
  Work: "bg-green-50 text-green-700 ring-green-600/10",
  Other: "bg-blue-50 text-blue-700 ring-blue-700/10",
};

const availableCategories = ["Class", "Home", "Work", "Other"];

const CardMain = ({ categories, isHovering, onUpdateCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside(() => setShowDropdown(false));

  const handleRemoveCategory = (catToRemove) => {
    const updatedCategories = categories.filter((cat) => cat !== catToRemove);
    if (updatedCategories.length === 0) {
      updatedCategories.push("Other");
    }
  };

  const handleAddCategory = (newCat) => {
    if (categories.length >= 4) {
      setShowDropdown(false);
      return;
    }
    if (!categories.includes(newCat)) {
      const updatedCategories = [...categories, newCat];
      onUpdateCategories(updatedCategories);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {categories.map((cat) => (
          <div key={cat} className="relative inline-flex items-center">
            <span
              className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium ring-1 ${mapClass[cat] || mapClass["Other"]}`}
            >
              {cat}
            </span>
            {isHovering && (
              <button
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-500 hover:text-red-700 hover:bg-gray-50 shadow-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveCategory(cat);
                }}
              >
                <FaTimes size="10" />
              </button>
            )}
          </div>
        ))}
        {isHovering && categories.length < 4 && (
          <button
            className="ml-2 text-gray-500 hover:text-green-500 p-1.5 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <FaPlus size="12" />
          </button>
        )}
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-8 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
        >
          {availableCategories
            .filter((cat) => !categories.includes(cat))
            .map((cat) => (
              <button
                key={cat}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CardMain;