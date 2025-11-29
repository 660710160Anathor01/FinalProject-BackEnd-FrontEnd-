import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';

const EditGamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    game_id: '',
    game_name: '',
    game_type: '',
    icon: '',
    company_id: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // ตรวจสอบ login
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) navigate('/login');
  }, [navigate]);

  // โหลดข้อมูลเกม
  useEffect(() => {
    const loadGame = async () => {
      try {
        const res = await fetch(`/api/v1/game/${id}`);
        if (!res.ok) throw new Error("ไม่พบข้อมูลเกม");

        const data = await res.json();
        setFormData({
          game_id: data.game_id,
          game_name: data.game_name,
          game_type: data.game_type,
          icon: data.icon,
          company_id: data.company_id
        });

      } catch (e) {
        setErrors({ submit: e.message });
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.game_name.trim()) newErrors.game_name = "กรุณากรอกชื่อเกม";
    if (!formData.game_type.trim()) newErrors.game_type = "กรุณากรอกประเภทเกม";
    if (!formData.icon.trim()) newErrors.icon = "กรุณากรอก URL icon";
    if (!formData.company_id.trim()) newErrors.company_id = "กรุณากรอก company_id";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/v1/game/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: parseInt(formData.game_id),
          game_name: formData.game_name.trim(),
          game_type: formData.game_type.trim(),
          icon: formData.icon.trim(),
          company_id: parseInt(formData.company_id)
        })
      });

      if (!res.ok) throw new Error("แก้ไขข้อมูลเกมไม่สำเร็จ");

      setSuccessMessage("บันทึกข้อมูลสำเร็จ!");

      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center p-8 text-lg">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-gradient-to-r from-viridian-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">GameStore - BackOffice</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <LogoutIcon className="h-5 w-5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6 text-gray-900">แก้ไขข้อมูลเกม</h2>

          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block font-medium mb-1">ชื่อเกม</label>
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
              <label className="block font-medium mb-1">ประเภทเกม</label>
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
              <label className="block font-medium mb-1">Icon URL</label>
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
              <label className="block font-medium mb-1">Company ID</label>
              <input
                type="number"
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
              className="w-full py-3 bg-viridian-600 text-white rounded-lg"
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default EditGamePage;
