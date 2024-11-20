// src/pages/Room.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Room = () => {
  const { roomId } = useParams();
  const [shareUrlLive, setShareUrlLive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`https://jkt48-showroom-api-tubes.vercel.app/api/rooms/${roomId}`);
=======
        const response = await axios.get(`https://jkt48-sr-api-tubes.vercel.app/api/rooms/${roomId}`);
>>>>>>> 648420afa68b18f3ea8f4e58c0f093502299722e
        setShareUrlLive(response.data.share_url_live);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Gagal memuat data room.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) return <p>Loading stream...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Live Streaming Room Preview</h1>
      {shareUrlLive ? (
        <iframe
          src={shareUrlLive}
          title="Live Stream Preview"
          className="w-full h-96" // Mengatur tinggi 96 agar hanya menampilkan preview
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-center">Tidak ada siaran langsung untuk saat ini.</p>
      )}
    </div>
  );
};

export default Room;
