import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const { auth } = useAuth(); // auth อาจยัง undefined ตอน render แรก

  // โหลดข้อมูลเกมและบริษัท
  useEffect(() => {
    let mounted = true;

    async function fetchGameById() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/v1/game/${id}`);
        if (!res.ok) throw new Error("Failed to fetch game");
        const data = await res.json();
        if (mounted) setGame(data || null);

        const companyRes = await fetch(`http://127.0.0.1:8080/api/v1/company/${data.company_id}`);
        if (!companyRes.ok) throw new Error("Failed to fetch company");
        const companyData = await companyRes.json();
        if (mounted) setCompany(companyData || null);

        setLoading(false);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setGame(null);
          setLoading(false);
        }
      }
    }

    fetchGameById();
    return () => { mounted = false; };
  }, [id]);

  // โหลด userId จาก auth.email
  useEffect(() => {
    if (!auth || !auth.email) return; // ถ้า auth ยังไม่ ready, skip

    const fetchUserId = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/v1/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();

        const matchedUser = users.find(u => u.email === auth.email);
        if (!matchedUser) throw new Error("User not found");

        setUserId(matchedUser.user_id || matchedUser.id);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchUserId();
  }, [auth]);

  const handlePlay = async () => {
    if (!userId) {
      alert("Cannot determine user ID yet. Please try again.");
      return;
    }

    try {
      const libRes = await fetch(`http://127.0.0.1:8080/api/v1/library/${userId}`);
      if (!libRes.ok) throw new Error("Failed to fetch library");
      const library = await libRes.json();

      let { game_id, downloaded } = library;
      let gameIds = game_id ? game_id.split("-") : [];
      let downloadedIds = downloaded ? downloaded.split("-") : [];

      const gameIdStr = String(game.game_id);

      if (gameIds.includes(gameIdStr)) {
        if (!downloadedIds.includes(gameIdStr)) downloadedIds.push(gameIdStr);
      } else {
        gameIds.push(gameIdStr);
      }

      const updatedLibrary = {
        game_id: gameIds.join("-"),
        downloaded: downloadedIds.join("-")
      };

      console.log("Updating library with:", updatedLibrary);

      const updateRes = await fetch(
        `http://127.0.0.1:8080/api/v1/library/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedLibrary)
        }
      );

      if (!updateRes.ok) throw new Error("Failed to update library");
      alert("Game added to your library!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
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
            <p><strong>Developer:</strong> {company?.company_name || "-"}</p>
            <p><strong>Category:</strong> {game.game_type}</p>
            <p><strong>Updated:</strong> {new Date(game.updated_at).toLocaleString()}</p>
          </div>
          <div className="mt-6">
            <button
              className="px-4 py-2 bg-green-600 rounded mr-3"
              onClick={handlePlay}
            >
              Play
            </button>
            <button className="px-4 py-2 bg-gray-700 rounded">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
