// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGames } from "../../data/games";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchGames().then((games) => {
      if (!mounted) return;
      const found = games.find((g) => String(g.id) === String(id));
      setGame(found || null);
      setLoading(false);
    });
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!game)
    return (
      <div className="p-8 text-white">
        <p>Game not found.</p>
        <Link to="/" className="text-blue-400 underline">Back to list</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2b3250] text-white p-6">
      

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img src={game.image} alt={game.title} className="w-full rounded-lg object-cover" />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{game.title}</h2>

          <div className="text-gray-300 mb-4">
            <p><strong>Developer:</strong> {game.developer}</p>
            <p><strong>Category:</strong> {game.category}</p>
            <p><strong>Updated:</strong> {game.updated}</p>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 bg-green-600 rounded mr-3">Play</button>
            <button className="px-4 py-2 bg-gray-700 rounded">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
