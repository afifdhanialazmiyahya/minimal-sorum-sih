// // src/pages/OnLive.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const LoadingSpinner = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
//     </div>
//   );
// };

// const OnLive = () => {
//   const [liveStreams, setLiveStreams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLiveStreams = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/rooms/");

//         console.log("Respons API:", response.data); // Memeriksa struktur respons

//         // Filter hanya room yang sedang live
//         const liveRooms = response.data.filter((room) => room.is_live);
//         setLiveStreams(liveRooms);
//       } catch (error) {
//         console.error("Error:", error.response ? error.response.data : error.message);
//         setError("Gagal memuat data live streams.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLiveStreams();
//   }, []);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   return (
//     <div className="p-4 pb-20">
//       <h1 className="text-3xl font-bold text-center mb-6">ON LIVE</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {liveStreams.length > 0 ? (
//           liveStreams.map((stream) => (
//             <Link to={`/rooms/${stream.id}`} key={stream.id}>
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
//                 {stream.image_url && <img src={stream.image_url} alt={stream.name} className="w-full h-48 object-cover" />}
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold">{stream.name}</h2>
//                   <div className="flex items-center justify-between bg-green-500 p-2 rounded-lg mt-2">
//                     <span className="text-white font-bold">Live</span>
//                     <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M5.98959 4.92865C6.28249 5.22155 6.28249 5.69642 5.98959 5.98931C2.67014 9.30877 2.67014 14.6907 5.98959 18.0101C6.28249 18.303 6.28249 18.7779 5.98959 19.0708C5.6967 19.3637 5.22183 19.3637 4.92893 19.0708C1.02369 15.1655 1.02369 8.8339 4.92893 4.92865C5.22183 4.63576 5.6967 4.63576 5.98959 4.92865ZM19.0711 4.92865C22.9763 8.8339 22.9763 15.1655 19.0711 19.0708C18.7782 19.3637 18.3033 19.3637 18.0104 19.0708C17.7175 18.7779 17.7175 18.303 18.0104 18.0101C21.3299 14.6907 21.3299 9.30877 18.0104 5.98931C17.7175 5.69642 17.7175 5.22155 18.0104 4.92865C18.3033 4.63576 18.7782 4.63576 19.0711 4.92865ZM8.81802 7.75708C9.11091 8.04997 9.11091 8.52485 8.81802 8.81774C7.06066 10.5751 7.06066 13.4243 8.81802 15.1817C9.11091 15.4746 9.11091 15.9495 8.81802 16.2424C8.52513 16.5353 8.05025 16.5353 7.75736 16.2424C5.41421 13.8992 5.41421 10.1002 7.75736 7.75708C8.05025 7.46419 8.52513 7.46419 8.81802 7.75708ZM16.2426 7.75708C18.5858 10.1002 18.5858 13.8992 16.2426 16.2424C15.9497 16.5353 15.4749 16.5353 15.182 16.2424C14.8891 15.9495 14.8891 15.4746 15.182 15.1817C16.9393 13.4243 16.9393 10.5751 15.182 8.81774C14.8891 8.52485 14.8891 8.04997 15.182 7.75708C15.4749 7.46419 15.9497 7.46419 16.2426 7.75708ZM12 10.4997C12.8284 10.4997 13.5 11.1713 13.5 11.9997C13.5 12.8281 12.8284 13.4997 12 13.4997C11.1716 13.4997 10.5 12.8281 10.5 11.9997C10.5 11.1713 11.1716 10.4997 12 10.4997Z"
//                         fill="#212121"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center w-full h-screen">
//             <p className="mt-4 text-lg text-center">Tidak ada room yang sedang live saat ini.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OnLive;

// src/pages/OnLive.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const OnLive = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [shareUrls, setShareUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        // Mengambil data dari kedua API secara bersamaan
        const [roomsResponse, academyResponse] = await Promise.all([
          axios.get("https://jkt48-showroom-api-tubes.vercel.app/api/rooms"),
          axios.get("https://jkt48-showroom-api-tubes.vercel.app/api/rooms/academy"),
        ]);

        // Menggabungkan data dari API rooms dan academy dengan menyesuaikan properti
        const combinedLiveStreams = [
          ...roomsResponse.data.filter((room) => room.is_live),
          ...academyResponse.data
            .filter((academy) => academy.is_onlive)
            .map((academy) => ({
              id: academy.room_id,
              name: academy.room_name,
              image_url: academy.image,
              is_live: academy.is_onlive,
            })),
        ];

        setLiveStreams(combinedLiveStreams);

        // Mengambil share_url_live untuk setiap item
        const urls = {};
        for (const item of combinedLiveStreams) {
          const itemData = await axios.get(`https://jkt48-showroom-api-tubes.vercel.app/api/rooms/${item.id}`);
          urls[item.id] = itemData.data.share_url_live;
        }
        setShareUrls(urls);
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        setError("Gagal memuat data live streams.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStreams();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="pt-6 px-4 sm:px-14 lg:px-16 mb-16">
      <h1 className="text-3xl font-bold text-center mb-6">ON LIVE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveStreams.length > 0 ? (
          liveStreams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => {
                const liveUrl = shareUrls[stream.id];
                if (liveUrl) {
                  window.open(liveUrl, "_blank"); // Buka link live di tab baru
                }
              }}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              {stream.image_url && <img src={stream.image_url} alt={stream.name} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{stream.name}</h2>
                <div className="flex items-center justify-between bg-green-500 p-2 rounded-lg mt-2">
                  <span className="text-white font-bold">Live</span>
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.98959 4.92865C6.28249 5.22155 6.28249 5.69642 5.98959 5.98931C2.67014 9.30877 2.67014 14.6907 5.98959 18.0101C6.28249 18.303 6.28249 18.7779 5.98959 19.0708C5.6967 19.3637 5.22183 19.3637 4.92893 19.0708C1.02369 15.1655 1.02369 8.8339 4.92893 4.92865C5.22183 4.63576 5.6967 4.63576 5.98959 4.92865ZM19.0711 4.92865C22.9763 8.8339 22.9763 15.1655 19.0711 19.0708C18.7782 19.3637 18.3033 19.3637 18.0104 19.0708C17.7175 18.7779 17.7175 18.303 18.0104 18.0101C21.3299 14.6907 21.3299 9.30877 18.0104 5.98931C17.7175 5.69642 17.7175 5.22155 18.0104 4.92865C18.3033 4.63576 18.7782 4.63576 19.0711 4.92865ZM8.81802 7.75708C9.11091 8.04997 9.11091 8.52485 8.81802 8.81774C7.06066 10.5751 7.06066 13.4243 8.81802 15.1817C9.11091 15.4746 9.11091 15.9495 8.81802 16.2424C8.52513 16.5353 8.05025 16.5353 7.75736 16.2424C5.41421 13.8992 5.41421 10.1002 7.75736 7.75708C8.05025 7.46419 8.52513 7.46419 8.81802 7.75708ZM16.2426 7.75708C18.5858 10.1002 18.5858 13.8992 16.2426 16.2424C15.9497 16.5353 15.4749 16.5353 15.182 16.2424C14.8891 15.9495 14.8891 15.4746 15.182 15.1817C16.9393 13.4243 16.9393 10.5751 15.182 8.81774C14.8891 8.52485 14.8891 8.04997 15.182 7.75708C15.4749 7.46419 15.9497 7.46419 16.2426 7.75708ZM12 10.4997C12.8284 10.4997 13.5 11.1713 13.5 11.9997C13.5 12.8281 12.8284 13.4997 12 13.4997C11.1716 13.4997 10.5 12.8281 10.5 11.9997C10.5 11.1713 11.1716 10.4997 12 10.4997Z"
                      fill="#212121"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            {/* Icon and text when no live streams */}
            <p className="mt-4 text-lg text-center">Tidak ada room yang sedang live saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnLive;
