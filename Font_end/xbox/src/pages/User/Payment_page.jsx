import { useEffect, useState } from "react";
import { NavLink  } from 'react-router-dom';
import BillTemplate from "./bill";

async function fetchPaymentData() {
  // const res = await fetch("/api/payment");
  // return await res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 231546,
        date: "11-03-2025",
        productName: "Qbox's Game Pass",
        duration: "1 เดือน",
        price: 140,
        qrImage: "https://play-lh.googleusercontent.com/Byl6BHzEv7tWDGa5QUgztneq8C8TGYelu8ywVMTTRUH2e9keboyLqL4YhmzaU3vjgA",
      });
    }, 300);
  });
}

export default function Payment() {
  const [payment, setPayment] = useState(null);
  const [openBill, setOpenBill] = useState(false);

  // ================================
  // 📌 โหลดข้อมูลจาก database ตอนเปิดหน้า
  // ================================
  useEffect(() => {
    fetchPaymentData().then((data) => setPayment(data));
  }, []);

  if (!payment) return <div className="text-center py-20">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="min-h-screen bg-green-200 flex justify-center items-center p-6">
      {/* Payment Box */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        {/* QR Code */}
        <div className="flex justify-center mb-3">
          <img
            src={payment.qrImage}
            alt="QR Code"
            className="w-48 h-48 rounded-lg border"
          />
        </div>

        <p className="text-xl font-semibold mb-4">{payment.price} บาท</p>

        {/* Buttons */}
        <div className="space-y-3">
          <NavLink
            to="/user/bill"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
              }`
            }
          >
            <button
              className="w-full bg-green-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              ยืนยันการสั่งซื้อ
            </button>
          </NavLink>

          <NavLink
            to="/user/gamepass"
            className={({ isActive }) =>
              `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
              }`
            }
          >
            <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg">
              ยกเลิก
            </button>
          </NavLink>

        </div>
      </div>

    </div>
  );
}
