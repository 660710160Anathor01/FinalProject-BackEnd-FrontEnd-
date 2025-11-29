// components/CategoryFilter.jsx
import { useState } from "react";

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const categories = [
    "RPG",
    "Action",
    "Adventure",
    "Battle Royale",
    "Sandbox",
    "MOBA",
  ];

  return (
    <div className="relative flex items-center gap-2 mb-6">
      {/* Filter Button */}
      <button
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        className={`px-4 py-1 rounded-full transition 
          ${selectedCategory !== "All" ? "bg-white text-black" : "bg-gray-500"}`}
      >
        Filter ▼
      </button>

      {/* ALL Button */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setShowFilterMenu(false);
        }}
        className={`px-4 py-1 rounded-full transition
          ${selectedCategory === "All" ? "bg-white text-black" : "bg-gray-500"}`}
      >
        All
      </button>

      {/* Dropdown Menu */}
      {showFilterMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg p-2 w-40 z-10">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowFilterMenu(false);
              }}
              className={`cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 ${
                selectedCategory === category && "bg-gray-300 font-bold"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
