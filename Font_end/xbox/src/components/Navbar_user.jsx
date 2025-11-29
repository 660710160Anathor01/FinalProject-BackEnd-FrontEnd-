import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar_user = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ เรียกบนสุดของฟังก์ชัน

  // Fetch user id
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/v1/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();

        const matchedUser = users.find(u => u.email === auth.email);
        if (!matchedUser) throw new Error("User not found");

        setUserId(matchedUser.user_id || matchedUser.id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserId();
  }, [auth.email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: "" });
    navigate("/");
  };

  return (
    <nav className="bg-green-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/user/games"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              All Game
            </NavLink>

            <NavLink
              to={`/user/library/${userId}`} // ✅ ใช้ userId ตรงนี้
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Library
            </NavLink>

            <NavLink
              to="/user/notification"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Notifications
            </NavLink>

            <NavLink
              to="/user/help"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Help
            </NavLink>

            <NavLink
              to="/user/gamepass"
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Gamepass
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/user/profile">
              <button
                className="p-2 text-white hover:text-gray-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon className="h-6 w-6" />
              </button>
            </NavLink>

            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_user;
