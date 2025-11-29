import React, { NavLink, useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import { fetchGames } from "../../data/games";
import { data } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import AddGame from "../../components/AddGame";

export default function Game_Manage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
    let mounted = true;

    async function fetchGameById() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/v1/games`);
        if (!res.ok) throw new Error("Failed to fetch game");
        const data = await res.json();
        const formattedGames = await Promise.all(
        data.map(async (game) => {
            const companyRes = await fetch(`http://127.0.0.1:8080/api/v1/company/${game.company_id}`);
            if (!companyRes.ok) throw new Error("Failed to fetch company");
            const company = await companyRes.json();
            //console.log("here =>",company.email)
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

        if (mounted) {
          setGame(data || null);
          // setLoading(false);
        }
        
          const companyRes = await fetch(`http://127.0.0.1:8080/api/v1/company/${data.company_id}`);
          if (!companyRes.ok) throw new Error("Failed to fetch company");
          const companyData = await companyRes.json();
          if (mounted) {
            setCompany(companyData || null);
            setLoading(false);
          }

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

  const filteredGames = games.filter((game) =>
    (game.title || '').toLowerCase().includes(search.toLowerCase())
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
        <div className='px-6 py-4 whitespace-nowrap'>
      {/* ปุ่ม Add Game */}
      <button
        type="button" 
        className="px-4 py-2 bg-green-400 text-viridian-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors" 
        onClick={openModal}
      >
        Add
      </button>

      {/* Modal ที่แสดงเมื่อ isModalOpen เป็น true */}
      <AddGame isOpen={isModalOpen} onClose={closeModal} />
    </div>
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
            <tr className='divide-y divide-gray-400'>
                <td className='px-4 py-4 whitespqce-nowrap'>{game.game_name}</td>
                <td className='px-4 py-4 whitespqce-nowrap'>{game.created}</td>
                <td className='px-4 py-4 whitespqce-nowrap'>{game.game_type}</td>
                <td className='px-4 py-4 whitespqce-nowrap'>{game.company}</td>
                <td className='px-4 py-4 whitespqce-nowrap'>{game.email}</td>
                <td className='px-4 py-4 whitespqce-nowrap'><buttom>Edit</buttom></td>
                <td className='px-4 py-4 whitespqce-nowrap'><buttom>Delete</buttom></td>
{/*                 
                <td className='px-6 py-4 whitespqce-nowrap'><buttom><NavLink to = "/boks/edit">แก้ไข</NavLink></buttom></td>
                <td className='px-6 py-4 whitespqce-nowrap'><buttom><NavLink to = "/boks/delete">ลบ</NavLink></buttom></td> */}
            </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      {filteredGames.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          No games found...
        </p>
      )}
    </div>
  );
}
