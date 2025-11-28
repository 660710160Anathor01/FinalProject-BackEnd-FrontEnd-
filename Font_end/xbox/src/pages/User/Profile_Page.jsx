import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FaUser, FaCircle } from "react-icons/fa";

const Profile_Page = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const email = auth.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/applicants/profile?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const hrRes = await res.json();

        const firstName = hrRes?.applicant?.first_name || "";
        const lastName = hrRes?.applicant?.last_name || "";
        const fullName = (firstName + " " + lastName).trim() || "ไม่ทราบชื่อ";

        setUserData({
          fullname: fullName,
          phone: hrRes?.applicant?.phone || "",
          email: hrRes?.applicant?.email || "",
          position: hrRes?.application?.position || "ไม่ระบุตำแหน่ง",
          status: hrRes?.application?.stage || "รอการพิจารณา",
          avatar: hrRes?.applicant?.avatar || "/images/carwash/profile.png",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-600">Error: {error}</p>;
  if (!userData)
    return <p className="text-center mt-20 text-gray-600">No data available.</p>;

  return (
    <div className="flex min-h-screen bg-gray-200">

      {/* ---------------------- SIDEBAR ---------------------- */}
      <div className="w-52 bg-purple-700 text-white flex flex-col py-6">
        <h1 className="text-center text-2xl font-bold mb-6">MENU</h1>

        <button className="text-left px-6 py-3 hover:bg-purple-600">
          Home
        </button>
        <button className="text-left px-6 py-3 hover:bg-purple-600">
          Library
        </button>
        <button className="text-left px-6 py-3 hover:bg-purple-600">
          All User
        </button>
        <button className="text-left px-6 py-3 hover:bg-purple-600 bg-purple-900">
          Profile
        </button>
      </div>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div className="flex-1 relative bg-gray-100">

        {/* ----- Top Header (ม่วง) ----- */}
        <div className="w-full bg-purple-800 h-16 flex items-center px-6 justify-between">

          <h1 className="text-white text-xl font-semibold">Profile</h1>

          {/* SERVER STATUS */}
          <div className="flex items-center space-x-3 text-white">

            <div className="text-sm">
              <p className="text-right">Server : 123456</p>
            </div>

            <div className="flex items-center bg-gray-900 px-3 py-1 rounded-xl">
              <FaUser className="mr-2" />
              <FaCircle className="text-green-400 text-xs mr-1" />
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* ----- Profile Card ----- */}
        <div className="p-6 flex justify-center">
          <div className="bg-white w-full max-w-md shadow-lg rounded-2xl overflow-hidden">

            {/* Banner */}
            <div className="bg-purple-700 h-32 relative">
              <img
                src={userData.avatar}
                className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                alt="avatar"
              />
            </div>

            <div className="px-6 pt-16 pb-6">

              <h2 className="text-center text-xl font-bold mb-4">
                {userData.fullname}
              </h2>

              {/* DETAILS */}
              <div className="bg-gray-50 rounded-xl p-4 shadow">

                <p className="text-purple-600 text-sm font-semibold">Email</p>
                <p className="mb-3 font-medium">{userData.email}</p>

                <p className="text-purple-600 text-sm font-semibold">Phone</p>
                <p className="mb-3 font-medium">{userData.phone}</p>

                <p className="text-purple-600 text-sm font-semibold">ตำแหน่งที่สมัคร</p>
                <p className="font-medium">{userData.position}</p>
              </div>

              {/* STATUS */}
              <div className="text-center mt-4">
                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                    userData.status === "ผ่านสัมภาษณ์" ||
                    userData.status === "รับเข้าทำงาน"
                      ? "bg-green-500"
                      : userData.status === "นัดสัมภาษณ์" ||
                        userData.status === "สมัครแล้ว"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {userData.status}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Page;
