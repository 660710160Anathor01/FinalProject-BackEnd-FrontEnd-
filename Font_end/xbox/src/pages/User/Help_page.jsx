import { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import { fetchAdmins } from "../../data/admins";

export default function Help() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/admins");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (mounted) {
          setAdmins(data);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAdmins();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-5">
      <h1 className="text-3xl font-bold mb-4">HELP</h1>

      {admins.map(admin => (
        <AdminCard
          key={admin.admin_id}
          id={admin.admin_id}
          name={admin.admin_name}
          avatar="/images/xbox/profile.png"
        />
      ))}
    </div>
  );
}
