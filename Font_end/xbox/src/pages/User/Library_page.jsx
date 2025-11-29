import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "../../components/GameCard";

export default function Library() {
  const { id } = useParams();   // <-- ดึง userId จาก URL
  const userId = id;

  const [games, setGames] = useState([]);
  const [library, setLibrary] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // ดึง library
  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/v1/library/${userId}`)
      .then((res) => res.json())
      .then((data) => setLibrary(data))
      .catch((err) => console.error("Error fetching library:", err));
  }, [userId]);

  // ดึงเกมทั้งหมด
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/v1/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  if (!library || games.length === 0) return <p>Loading...</p>;

  // แปลงข้อมูล library
  const ownedIds = (library.game_id || "").split("-");
  const downloadedIds = (library.downloaded || "").split("-");

  const gamesWithStatus = games.map((game) => ({
    id: game.game_id,
    title: game.game_name,
    icon: game.icon,
    updated: game.updated_at,
    owned: ownedIds.includes(String(game.game_id)),
    installed: downloadedIds.includes(String(game.game_id)),
    inGamePass: false,
  }));

  // แสดงเฉพาะเกมที่มี
  const ownedGames = gamesWithStatus.filter((g) => g.owned);

  const filteredGames = ownedGames
    .filter((g) => {
      if (filterType === "Installed") return g.installed;
      if (filterType === "Owned") return g.owned;
      if (filterType === "InGamePass") return g.inGamePass;
      return true;
    })
    .filter((g) =>
      (g.title || "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#2b3250] text-white p-6">
      <h1 className="text-5xl font-bold mb-6">Library</h1>

      {/* Search */}
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

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-6">
        {["All", "Installed"].map((type) => (
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

      {/* Game grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            image={game.icon}
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
