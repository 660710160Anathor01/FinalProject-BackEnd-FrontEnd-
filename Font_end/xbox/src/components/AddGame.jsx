import React, { useState } from 'react';

const AddGame = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
      game_id: "",
      game_name: "",
      game_type: "",
      icon: "",
      company_id: "",
    });

  
  const [gameName, setGameName] = useState('');
  const [type, setType] = useState('Upcoming');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');

  // ฟังก์ชันที่เรียกใช้เมื่อผู้ใช้กด "Create Game"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const appUserRes = await fetch("http://localhost:8080/api/v1/game", {
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

    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาดในการสมัคร");
    } finally {
    }
  };

  if (!isOpen) return null; // ถ้า modal ไม่เปิดให้ไม่แสดงอะไร

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Create New Game</h2>
        <form onSubmit={handleSubmit}>
          <label>Game Name:</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="e.g. Holiday Secret Santa 2024"
            required
          />

          <label>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>

          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Winter Wonderland"
            required
          />

          <label>Contact:</label>
          <input
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Company email"
            required
          />

          <label>Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Add details about the game..."
          ></textarea>

          <button type="submit">Create Game</button>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
