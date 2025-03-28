import React from 'react';

export default function Header() {
  const isGuest = localStorage.getItem("token").startsWith("guest");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }
  return (
    <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="flex justify-between items-center w-full mx-auto px-4 sm:px-6 lg:px-10">
        <p
          className="text-2xl font-extrabold font-stretch-expanded text-black bg-clip-text"
        >
          Todo App
        </p>
        <button
          onClick={isGuest ? () => window.location.href = "/auth" : logOut}
          className="text-lg text-gray-600 hover:text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition duration-300 font-medium"
        >
          {isGuest ? "Log In" : "Log Out"}
        </button>
      </div>
    </nav>
  );
}