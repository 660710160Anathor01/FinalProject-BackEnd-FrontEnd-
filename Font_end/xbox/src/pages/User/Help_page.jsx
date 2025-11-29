import { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import { fetchAdmins } from "../../data/admins";

export default function Help() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins().then(data => setAdmins(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-5">
      <h1 className="text-3xl font-bold mb-4">HELP</h1>

      {admins.map(admin => (
        <AdminCard
          key={admin.id}
          id={admin.id}
          name={admin.name}
          subtitle={admin.subtitle}
          avatar={admin.avatar}
        />
      ))}
    </div>
  );
}
