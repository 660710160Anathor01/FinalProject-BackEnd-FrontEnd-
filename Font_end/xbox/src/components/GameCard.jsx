// src/components/GameCard.jsx
import { Link } from "react-router-dom";

export default function GameCard({ id, title, image, updated }) {
  return (
    <Link to={`games/${id}`}>
      <div className="bg-[#323b63] rounded-xl overflow-hidden shadow-md hover:scale-105 transition cursor-pointer">
        <img src={image} alt={title} className="w-full h-32 object-cover" />
        <div className="p-3">
        
          <h3 className="text-white text-sm font-semibold">{title}</h3>
          <p className="text-gray-300 text-xs mt-1">Updated</p>
        </div>
      </div>
    </Link>
  );
}
