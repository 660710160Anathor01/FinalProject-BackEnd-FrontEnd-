import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';

const AddGame = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    game_id: '',
    game_name: '',
    game_type: '',
    icon: '',
    company_id: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ตรวจสอบ Login
  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) navigate('/login');
  }, [navigate]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // validate ข้อมูลก่อนส่ง
  const validateForm = () => {
    const newErrors = {};

    if (!formData.game_id.trim()) newErrors.game_id = "กรุณากรอก Game ID";
    if (!formData.game_name.trim()) newErrors.game_name = "กรุณากรอกชื่อเกม";
    if (!formData.game_type.trim()) newErrors.game_type = "กรุณากรอกประเภทเกม";
    if (!formData.icon.trim()) newErrors.icon = "กรุณากรอกลิงก์ไอคอน";
    if (!formData.company_id.trim()) newErrors.company_id = "กรุณากรอกบริษัท";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const res = await fetch("/api/v1/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: formData.game_id.trim(),
          game_name: formData.game_name.trim(),
          game_type: formData.game_type.trim(),
          icon: formData.icon.trim(),
          company_id: formData.company_id.trim()
        })
      });

      if (!res.ok) throw new Error("เพิ่มเกมไม่สำเร็จ");

      setSuccessMessage("เพิ่มเกมสำเร็จ!");

      // เคลียร์ฟอร์ม
      setFormData({
        game_id: '',
        game_name: '',
        game_type: '',
        icon: '',
        company_id: ''
      });

    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Game Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
          >
            ออกจากระบบ
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold mb-6">เพิ่มเกมใหม่</h2>

          {successMessage && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-1">Game ID</label>
              <input
                type="text"
                name="game_id"
                value={formData.game_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.game_id && <p className="text-red-500 text-sm">{errors.game_id}</p>}
            </div>

            <div>
              <label className="block mb-1">ชื่อเกม</label>
              <input
                type="text"
                name="game_name"
                value={formData.game_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.game_name && <p className="text-red-500 text-sm">{errors.game_name}</p>}
            </div>

            <div>
              <label className="block mb-1">ประเภทเกม</label>
              <input
                type="text"
                name="game_type"
                value={formData.game_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.game_type && <p className="text-red-500 text-sm">{errors.game_type}</p>}
            </div>

            <div>
              <label className="block mb-1">ไอคอน (URL)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
            </div>

            <div>
              <label className="block mb-1">บริษัท (ID)</label>
              <input
                type="text"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.company_id && <p className="text-red-500 text-sm">{errors.company_id}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-green-600 text-white rounded-lg"
            >
              {isSubmitting ? "กำลังบันทึก..." : "เพิ่มเกม"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGame;
