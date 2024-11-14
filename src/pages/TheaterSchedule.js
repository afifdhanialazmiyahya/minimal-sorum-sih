import React, { useEffect, useState } from "react";
import axios from "axios";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const TheaterSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("https://jkt48-sr-api-tubes.vercel.app/api/rooms/theater-schedule");
        setSchedules(response.data); // Mengatur data jadwal
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading ke false setelah selesai mengambil data
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Tampilkan spinner saat loading
  }

  return (
    <div className="p-4 pb-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Theater Schedule</h1>
      <div className="grid grid-cols-1 gap-6">
        {schedules.map((schedule) => (
          <a
            href={schedule.entrance_url}
            key={schedule.paid_live_id}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div>
              {schedule.image && <img src={schedule.image} alt={schedule.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{schedule.title}</h2>
                <p className="text-gray-600">Room: {schedule.room_name}</p>
                <p className="text-gray-600">Date: {new Date(schedule.start_at * 1000).toLocaleString()}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TheaterSchedule;
