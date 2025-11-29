// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGames } from "../../data/games";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchGameById() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/v1/game/${id}`);
        if (!res.ok) throw new Error("Failed to fetch game");
        const data = await res.json();
        if (mounted) {
          setGame(data || null);
          setLoading(false);
        }
        
        
          // const companyRes = await fetch(`http://127.0.0.1:8080/api/v1/company/${data.company_id}`);
          // if (!companyRes.ok) throw new Error("Failed to fetch company");
          // const companyData = await companyRes.json();
          // if (mounted) {
          //   setCompany(companyData || null);
          //   setLoading(false);
          // }


      } catch (error) {
        console.error(error);
        if (mounted) {
          setGame(null);
          setLoading(false);
        }
      }
    }

    fetchGameById();

    return () => {
      mounted = false;
    };
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
          <img src={game.icon} alt={game.game_name} className="w-full rounded-lg object-cover" />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{game.game_name}</h2>

          <div className="text-gray-300 mb-4">
            <p><strong>Developer:</strong> {game.company_name}</p>
            <p><strong>Category:</strong> {game.game_type}</p>
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
