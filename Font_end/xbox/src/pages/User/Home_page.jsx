import { useEffect, useState } from "react";
import GameItem from "../../components/GameItem";
import { fetchGames } from "../../data/games";
import CategoryFilter from "../../components/CategoryDropdown";

export default function Home() {
  const [games, setGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/v1/games")
      .then((res) => res.json())
      .then((data) => {
        const formattedGames = data.map((game) => ({
          id: game.game_id,
          game_name: game.game_name,
          game_type: game.game_type,
          icon: game.icon,
          updated: game.updated_at,
        }));
        setGames(formattedGames);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  // Filter logic
  const filteredByCategory =
    selectedCategory === "All"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const filteredGames = filteredByCategory.filter((game) =>
    (game.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#2b3250] text-white p-6">
      {/* Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
        <img
          src="/images/xbox/xboxgamepage1.jpg"
          className="w-full h-full object-cover"
          alt="banner"
        />
        <h2 className="absolute bottom-4 left-4 text-3xl font-bold">Welcome</h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end items-center mb-4">
        <div className="bg-white rounded-full flex items-center px-4 py-2 w-1/3 text-black">
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

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Game List */}
      <div>
        {filteredGames.map((game) => (
          <GameItem
            key={game.id}
            title={game.game_name}
            category={game.game_type}
            image={game.icon}
            rating={game.rating}
          />
        ))}

        {filteredGames.length === 0 && (
          <p className="text-gray-300 text-center mt-6">ไม่พบเกมที่คุณต้องการ</p>
        )}
      </div>
    </div>
  );
}
