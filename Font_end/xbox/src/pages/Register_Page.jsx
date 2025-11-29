import React, { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';


const Register_Page = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      form.user_name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.password.trim() !== "" &&
      form.confirmPassword.trim() !== "" &&
      form.password === form.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      
      const appUserRes = await fetch("http://localhost:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          user_name: form.user_name,
          phone: form.phone,
          email: form.email,
        }),
      });

      if (!appUserRes.ok) {
        throw new Error("สมัครสมาชิกไม่สำเร็จ");
      }

      const appUserData = await appUserRes.json();
      
      alert("สมัครสมาชิกสำเร็จ!");
      navigate("/"); // ไปหน้า login

    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาดในการสมัคร");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-green-200 flex flex-col items-center p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-10">Qbox's Game Pass</h1>

      <div className="flex w-full max-w-5xl justify-between items-center">
        {/* Left Panel */}
        <div
          className=" w-full max-w-xl mx-auto rounded-3xl p-10 text-center text-white bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://enjoytoread.com/wp-content/uploads/2022/06/Game-to-play-2022.jpg')"
          }}
        >
          <img
            className="w-40 h-20 object-cover rounded-xl mx-auto mb-6 opacity-0"
          />

          <h2 className="text-xl font-bold mb-2">YOU WANNA PLAY?</h2>
          <h1 className="text-4xl font-extrabold">LET'S PLAY!!!</h1>

          <img
            className="w-40 h-20 object-cover rounded-xl mx-auto mb-6 opacity-0"
          />
        </div>


        {/* Right Panel */}
        <div className="w-1/2 pl-10">
          <h1 className="text-4xl font-extrabold mb-6">WELCOME!</h1>

          <div className="flex flex-col space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4"></form>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* first_name */}
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Username"
                  value={form.user_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "👁️‍🗨️" : "🙈"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-2.5 rounded-md text-white font-semibold transition ${isFormValid() && !isSubmitting
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {isSubmitting ? "SIGN UP..." : "SIGN UP"}
              </button>

              <div className="text-center mt-6 text-gray-600 text-sm">
              Already have account?{" "}
                <Link
                  to="/login"
                  className="text-purple-500 hover:text-purple-600 font-medium transition"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_Page;
