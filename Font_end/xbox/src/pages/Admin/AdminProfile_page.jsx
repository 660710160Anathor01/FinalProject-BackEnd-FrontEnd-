import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdmins } from "../../data/admins";

export default function AdminProfile() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    let mounted = true;

    const fetchAdminById = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/admin/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (mounted) {
          setAdmin(data || null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAdminById();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!admin) return <div>Admin not found</div>;

  if (!admin)
    return (
      <div className="p-8 text-white">
        <p>Admin not found.</p>
        <Link to="/" className="text-blue-400 underline">Back to list</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2f3b56] text-white p-5">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)}>
          <i className="fa fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-2xl font-bold">Admin Profile</h1>
      </div>

      <div className="bg-[#3c4763] p-5 rounded-xl shadow-lg">
        <img
          src="/images/xbox/profile.png"
          alt={admin.admin_name}
          className="w-20 h-20 rounded-full object-cover border mb-3"
        />

        <p className="text-xl mb-2">{admin.admin_name}</p>

        <p className="mb-1">
          <span className="font-semibold">Admin ID:</span> 00{admin.admin_id}
        </p>

        <p className="mb-1">
          <span className="font-semibold">Email:</span> {admin.email}
        </p>

        <p>
          <span className="font-semibold">Phone number:</span> {admin.phone}
        </p>
      </div>
    </div>
  );
}
