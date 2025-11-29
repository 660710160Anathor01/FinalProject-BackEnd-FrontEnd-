import React, { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';

const Profile_Page = () => {
  const { auth } = useAuth(); // auth ของ user ปัจจุบัน
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/v1/users`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const users = await res.json();

        // หา user ที่ email ตรงกับ auth.email
        const matchedUser = users.find(user => user.email === auth.email);
        if (!matchedUser) throw new Error("Unauthorized: Email not found");

        if (mounted) {
          setUserData({
            user_name: matchedUser.user_name || "ไม่ทราบชื่อ",
            email: matchedUser.email || "ไม่ระบุอีเมล",
            phone: matchedUser.phone || "ไม่ระบุเบอร์",
            payment_date: matchedUser.payment_date || "ไม่มีข้อมูล",
            avatar: matchedUser.avatar || "/images/xbox/profile.png",
          });
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, [auth.email]);

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Error: {error}</p>;
  if (!userData) return <p className="text-center mt-20 text-gray-600">No data available.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2b3250] text-white">
      <div className="bg-white w-80 rounded-2xl shadow-lg overflow-hidden">
        {/* ส่วนหัว */}
        <div className="bg-green-600 h-32 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
        </div>

        {/* ข้อมูลผู้ใช้ */}
        <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{userData.user_name}</h2>

          <div className="bg-gray-50 rounded-xl p-4 text-left shadow-sm space-y-2">
            <div>
              <p className="text-purple-600 text-sm font-semibold">Email</p>
              <p className="text-gray-800 font-medium">{userData.email}</p>
            </div>
            <div>
              <p className="text-purple-600 text-sm font-semibold">Phone</p>
              <p className="text-gray-800 font-medium">{userData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Page;
