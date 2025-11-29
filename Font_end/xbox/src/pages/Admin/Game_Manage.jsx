import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AddGame from "../../components/AddGame";
import ConfirmDelete from "../../components/ConfirmDelete"; // ⭐ เพิ่มตรงนี้

export default function Game_Manage() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteGame, setDeleteGame] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchGamesData() {
      try {
        const gameRes = await fetch(`http://127.0.0.1:8080/api/v1/games`);
        const gameData = await gameRes.json();

        const formattedGames = await Promise.all(
          gameData.map(async (game) => {
            const companyRes = await fetch(
              `http://127.0.0.1:8080/api/v1/company/${game.company_id}`
            );
            const company = await companyRes.json();

            return {
              id: game.game_id,
              game_name: game.game_name,
              game_type: game.game_type,
              created: game.created_at,
              email: company.email,
              company: company.company_name,
            };
          })
        );

        setGames(formattedGames);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGamesData();
  }, []);

  // ⭐ แก้ search ให้ถูกต้อง
  const filteredGames = games.filter((game) =>
    (game.game_name || "").toLowerCase().includes(search.toLowerCase())
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

      {/* Add Game Button */}
      <div className="px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          className="px-4 py-2 bg-green-400 text-viridian-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          onClick={openModal}
        >
          Add
        </button>

        {/* Modal Add Game */}
        <AddGame isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Game Table */}
      <div className="bg-white text-black rounded-xl shadow-2xl overflow-hidden">
        <table className="w-full border-collapse mb-4 divide-y divide-gray-400">
          <thead className="bg-green-300 text-gray-900">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Company</th>
              <th>Company_Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredGames.map((game) => (
              <tr key={game.id} className="divide-y divide-gray-400">
                <td className="px-4 py-4 whitespace-nowrap">{game.game_name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{new Date(game.created).toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap">{game.game_type}</td>
                <td className="px-4 py-4 whitespace-nowrap">{game.company}</td>
                <td className="px-4 py-4 whitespace-nowrap">{game.email}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline"><NavLink to ={`/admin/edit/${game.id}`}>Edit</NavLink></button></td>
                <td className="px-4 py-4 whitespace-nowrap">
                
                  <button className="text-red-600 hover:underline"
                                      onClick={() => {
                      setDeleteGame(game);
                      setIsDeleteOpen(true);
                    }}>Delete</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Delete (⭐ ConfirmDelete Component) */}
      <ConfirmDelete
        open={isDeleteOpen}
        game={deleteGame}
        onClose={() => setIsDeleteOpen(false)}
        onDeleted={(id) => {
          setGames((prev) => prev.filter((g) => g.id !== id));
        }}
      />

      {filteredGames.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          No games found...
        </p>
      )}
    </div>
  );
}
