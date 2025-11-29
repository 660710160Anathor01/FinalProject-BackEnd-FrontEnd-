import React, { useState } from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, SearchIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar_admin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setAuth } = useAuth(); // ✅
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: "" }); // ✅ เปลี่ยนสถานะ auth
    navigate("/"); // ✅ กลับหน้าแรกหรือ login
  };

  return (
    <nav className="bg-green-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/admin/games" 
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              Edit Game
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/admin" >
            <button className="p-2 text-white hover:text-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
              <UserIcon className="h-6 w-6" />
            </button>
            </NavLink>
            <NavLink
                to="#"
                onClick={handleLogout}
                className={({ isActive }) =>
                `text-white hover:text-gray-200 transition-colors font-medium ${
                isActive ? "border-b-2 border-white" : ""
                    }`
                  }
                >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_admin;