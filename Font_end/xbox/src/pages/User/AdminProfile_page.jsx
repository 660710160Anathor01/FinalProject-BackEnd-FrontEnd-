import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdmins } from "../../data/admins";

export default function AdminProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchAdmins().then((admins) => {
      if (!mounted) return;
      const found = admins.find((a) => String(a.id) === String(id));
      setAdmin(found || null);
      setLoading(false);
    });

    return () => { mounted = false };
  }, [id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;

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
          src={admin.avatar}
          alt={admin.name}
          className="w-20 h-20 rounded-full object-cover border mb-3"
        />

        <p className="text-xl mb-2">{admin.name}</p>

        <p className="mb-1">
          <span className="font-semibold">Admin ID:</span> 00{admin.id}
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
