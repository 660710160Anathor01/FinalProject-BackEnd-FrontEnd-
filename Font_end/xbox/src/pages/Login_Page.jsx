import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return form.email.trim() !== "" && form.password.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/applicant/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      const data = await response.json();
      const role = data.role || "user"; // fallback role

      localStorage.setItem("userEmail", form.email);

      setAuth({
        isLoggedIn: true,
        role: role,
        email: form.email,
      });

      if (role === "hr") {
        navigate("/hr");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
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
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
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

      

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
              isFormValid()
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>

          <div className="text-center mt-6 text-gray-600 text-sm">
          Doesn’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-600 font-medium transition"
            >
              Sign Up
            </Link>
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>
  );

};

export default LoginPage;