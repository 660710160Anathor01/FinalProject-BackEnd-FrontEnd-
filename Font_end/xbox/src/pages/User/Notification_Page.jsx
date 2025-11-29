import React, { useState } from "react";
import NotificationItem from "../../components/NotificationItem";


  const NotificationPage = () => {

    const [notifications, setNotifications] = useState([
      {
        id: 1,
        title: "Xbox Game Pass is Active",
        message:
          'You’ve already subscribed to Xbox Game Pass! 🎮 Enjoy your favorite games right away.'
      },
    ]);
  
    // 🔸 ฟังก์ชันลบแจ้งเตือน
    const handleDelete = (id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };
  
    return (
      <div className="min-h-screen bg-[#2b3250] text-white flex flex-col items-center p-6 text-black">
        <h1 className="text-3xl font-bold mb-6">การแจ้งเตือน</h1>
  
        <div className="w-full max-w-2xl space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <NotificationItem
                key={n.id}
                id={n.id}
                title={n.title}
                message={n.message}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-gray-200">
              🎉 ไม่มีการแจ้งเตือนที่ค้างอยู่
            </p>
          )}
        </div>
      </div>
    );
  };
  

export default NotificationPage;