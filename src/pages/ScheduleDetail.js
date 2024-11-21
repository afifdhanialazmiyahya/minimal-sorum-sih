import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mapping gambar berdasarkan judul theater
  const theaterCovers = {
    "Ingin Bertemu": "/cover/aitakata.jpg",
    "Cara Meminum Ramune": "/cover/cmr.jpg",
    "Pajama Drive": "/cover/pajadora.jpg",
    "Aturan Anti Cinta": "/cover/rkj.jpg",
    "Tunas Dibalik Seragam": "/cover/tdbs.png",
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("https://jkt48-showroom-api-tubes.vercel.app/api/rooms/theater-schedule");
        const selectedSchedule = response.data.find((item) => item.paid_live_id.toString() === scheduleId);
        if (!selectedSchedule) {
          navigate("/not-found"); // Redirect jika tidak ditemukan
          return;
        }
        setSchedule(selectedSchedule);
      } catch (error) {
        console.error("Error:", error);
        navigate("/error"); // Redirect jika terjadi error
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId, navigate]);

  if (loading) return <LoadingSpinner />;
  if (!schedule) return <div className="text-center text-red-500">Schedule not found</div>;

  // Ambil cover dari mapping berdasarkan judul
  const coverImage = Object.keys(theaterCovers).find((key) => schedule.title.includes(key))
    ? theaterCovers[Object.keys(theaterCovers).find((key) => schedule.title.includes(key))]
    : schedule.image; // Fallback ke gambar dari API jika tidak ada match

  return (
    <div className="p-4 pb-32 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{schedule.title}</h1>
      <div className="shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Gambar Cover */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src={coverImage} alt={schedule.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <p className="text-lg">
            <strong>Date & Time:</strong> {new Date(schedule.start_at * 1000).toLocaleString()}
          </p>
          <button
            onClick={() => {
              if (schedule.is_onlive) {
                window.open(schedule.room_url, "_blank");
              } else {
                window.open(schedule.entrance_url, "_blank");
              }
            }}
            className={`mt-4 px-4 py-2 rounded-lg text-white font-bold w-full ${schedule.is_onlive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            {schedule.is_onlive ? "LIVE - Watch Now!" : "Not LIVE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
