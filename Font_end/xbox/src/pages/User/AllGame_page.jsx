import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import { fetchGames } from "../../data/games";

export default function AllGame() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGames().then((data) => setGames(data));
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#2b3250] text-white p-6">

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
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

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
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
