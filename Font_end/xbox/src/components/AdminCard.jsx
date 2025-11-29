// components/AdminCard.jsx
import { useNavigate } from "react-router-dom";

export default function AdminCard({ id, name, subtitle, avatar }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 bg-[#8fa3c9] rounded-lg p-4 shadow-md mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div className="flex flex-col">
        <p className="text-lg font-semibold">Admin</p>
        <p className="text-sm text-black/80">{name}</p>

        <button
          onClick={() => navigate(`/admin/${id}`)}
          className="flex items-center gap-2 bg-green-200 text-green-800 px-3 py-1 rounded-full mt-1"
        >
          Contact
          <i className="fa fa-envelope"></i>
        </button>
      </div>
    </div>
  );
}
