import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form({ onTaskAdded }) {
    const [isSelected, setSelected] = useState([]);
    const [isName, setName] = useState();
    const [isProcess, setProcess] = useState("Todo");
    const categories = [
        {
            name: "Class",
            base: "bg-red-50 text-red-700 ring-red-600/10",
            hover: "hover:bg-red-200",
            selected: "bg-red-600 text-white ring-red-600/10"
        },
        {
            name: "Home",
            base: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
            hover: "hover:bg-yellow-200",
            selected: "bg-yellow-500 text-white ring-yellow-600/20"
        },
        {
            name: "Work",
            base: "bg-green-50 text-green-700 ring-green-600/20",
            hover: "hover:bg-green-200",
            selected: "bg-green-500 text-white ring-green-600/20"
        },
        {
            name: "Other",
            base: "bg-blue-50 text-blue-700 ring-blue-700/10",
            hover: "hover:bg-blue-200",
            selected: "bg-blue-600 text-white ring-blue-700/10"
        },
    ];

    const handleCategoryClick = (categoryName) => {
        setSelected(prev =>
            prev.includes(categoryName)
                ? prev.filter(item => item !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userID = localStorage.getItem("token");
        const url = userID.startsWith("guest") ? "/api/guest/" : "/api/";

        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                _id: `task-${uuidv4()}`,
                name: isName,
                categories: isSelected.length > 0 ? isSelected : ["Other"],
                process: isProcess
            }), 
        });

        if (!response.ok) throw new Error("Failed to add task");
        onTaskAdded();
        setName("");
        setSelected([]);
        setProcess("Todo");
        document.getElementById("name").value = "";
    }

    return (
        <div className="flex justify-center items-center">
            <form className="flex flex-col gap-4 bg-white w-full max-w-lg p-6 rounded-xl" encType="application/x-www-form-urlencoded" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="grid grid-cols-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                    placeholder="Enter a task"
                    onChange={e => setName(e.target.value)}
                    required
                />

                <div className="grid grid-cols-4 gap-2 w-full">
                    {categories.map(({ name, base, hover, selected }) => (
                        <div key={name}>
                            <input
                                type="checkbox"
                                name="category"
                                id={`${name}-checkbox`}
                                value={name}
                                className="hidden"
                                checked={isSelected.includes(name)}
                                onChange={() => handleCategoryClick(name)}
                            />
                            <button
                                type="button"
                                onClick={() => handleCategoryClick(name)}
                                className={`w-full py-2 text-sm font-medium rounded-md cursor-pointer ring-1 ring-inset transition ${isSelected.includes(name)
                                    ? selected
                                    : `${base} ${hover}`
                                    }`}
                            >
                                {name}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                    <select
                        name="process"
                        id="process"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none"
                        onChange={e => setProcess(e.target.value)}
                    >
                        <option value="Todo">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full py-2 border-1 border-gray-300  text-gray-500 rounded-lg cursor-pointer transition hover:bg-gray-800 active:scale-105 hover:text-white"
                    >
                        Add Task
                    </button>
                </div>
            </form >
        </div >
    );
}
