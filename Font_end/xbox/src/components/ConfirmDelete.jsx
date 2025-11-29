import React from "react";

export default function ConfirmDelete({ open, game, onClose, onDeleted }) {
  if (!open || !game) return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/v1/game/${game.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete game");

      onDeleted(game.id);  // แจ้ง parent
      onClose();           // ปิด modal
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure to delete   
          <span className="font-bold"> "{game.game_name}" </span>
          ?
        </h2>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            CONFIRM
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
