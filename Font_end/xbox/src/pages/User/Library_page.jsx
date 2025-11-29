import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import { fetchGames } from "../../data/games";

export default function Library() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  // สร้าง state เก็บ filter ประเภทเกม
  const [filterType, setFilterType] = useState("All"); // All / Installed / Owned / InGamePass

  useEffect(() => {
    fetchGames().then((data) => setGames(data));
  }, []);

  // กรองเกมตาม filterType และ search
  const filteredGames = games
    .filter((game) => {
      if (filterType === "All") return true;
      if (filterType === "Installed") return game.installed;
      if (filterType === "Owned") return game.owned;
      if (filterType === "InGamePass") return game.inGamePass;
      return true;
    })
    .filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#2b3250] text-white p-6">
     <h1 className="text-5xl font-bold text-white mb-6">
     Library
     </h1>
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="bg-white rounded-full flex items-center px-4 py-2 w-1/2 text-black shadow-md">
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-6">
        {["All", "Installed", "Owned", "InGamePass"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1 rounded-full transition ${
              filterType === type ? "bg-white text-black" : "bg-gray-500"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredGames.map((game) => (
          <GameCard
            id={game.id}
            title={game.title}
            image={game.image}
            updated={game.updated}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          No games found...
        </p>
      )}
    </div>
  );
}
