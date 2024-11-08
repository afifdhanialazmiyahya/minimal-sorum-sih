// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MemberDetail = () => {
//   const { id } = useParams(); // Mengambil id dari URL
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/rooms/${id}`); // Memanggil API dengan id
//         if (response.data) {
//           setProfile(response.data); // Mengatur data profil
//         } else {
//           console.error("Profile data not found");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!profile) {
//     return <p>Profile data not available...</p>;
//   }

//   // Fungsi untuk memformat deskripsi
//   const formatDescription = (description) => {
//     const lines = description.split("\r\n"); // Pisahkan deskripsi berdasarkan baris baru
//     const info = {}; // Objek untuk menyimpan informasi yang diekstrak

//     lines.forEach((line) => {
//       const [key, value] = line.split(":"); // Pisahkan kunci dan nilai berdasarkan ':'
//       if (key && value) {
//         info[key.trim()] = value.trim(); // Simpan dalam objek dengan trimming
//       }
//     });

//     return info; // Kembalikan objek informasi
//   };

//   const memberInfo = formatDescription(profile.description); // Format deskripsi

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
//       {/* Tampilkan nama anggota di bagian atas */}
//       <h1 className="text-xl font-bold mt-4 mb-2">{memberInfo["Name"] || profile.name}</h1>
//       {profile.image_url && <img src={profile.image_url} alt={profile.name} className="w-full h-64 object-cover rounded-md mx-auto" />}
//       <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>

//       {/* Tampilkan informasi anggota yang diformat */}
//       {memberInfo && (
//         <div className="mt-4 text-gray-600">
//           <p>
//             <strong>Birthday:</strong> {memberInfo["Birthday"]}
//           </p>
//           <p>
//             <strong>Birthplace:</strong> {memberInfo["Birthplace"]}
//           </p>
//           <p>
//             <strong>Blood Type:</strong> {memberInfo["Blood type"]}
//           </p>
//           <p>
//             <strong>Zodiac Signs:</strong> {memberInfo["Zodiac signs"]}
//           </p>
//           <p>
//             <strong>Hobby:</strong> {memberInfo["Hobby"]}
//           </p>
//         </div>
//       )}
//     </div>

//     // buat bagian fanletter disini
//   );
// };

// export default MemberDetail;

// src/pages/MemberDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const MemberDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [fanLetters, setFanLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rooms/${id}`);
        if (response.data) {
          setProfile(response.data);
        } else {
          console.error("Profile data not found");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFanLetters = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rooms/fan-letters/${id}`);
        if (response.data) {
          setFanLetters(response.data);
        }
      } catch (error) {
        console.error("Error fetching fan letters:", error);
      }
    };

    fetchProfile();
    fetchFanLetters();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return <p>Data profil tidak tersedia...</p>;
  }

  const formatDescription = (description) => {
    const lines = description.split("\r\n");
    const info = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":");
      if (key && value) {
        info[key.trim()] = value.trim();
      }
    });

    return info;
  };

  const memberInfo = formatDescription(profile.description);

  return (
    <div className="px-4 py-4 mb-28 mt-10 mx-4 lg:mb-16 sm:mx-auto lg:mx-auto max-w-md lg:max-w-lg bg-white rounded-lg shadow-md text-center items-center">
      {/* Foto profil berbentuk lingkaran di atas nama member */}
      {profile.image_square && (
        <img src={profile.image_square} alt={profile.name} className="w-32 h-32 border-4 border-gray-200 shadow-lg rounded-full object-cover mx-auto mt-4" />
      )}

      <h1 className="text-xl font-bold mt-4 mb-2">{memberInfo["Name"] || profile.name}</h1>

      <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>

      {/* Informasi Anggota */}
      {memberInfo && (
        <div className="mt-4 text-gray-600">
          <p>
            <strong>Birthday:</strong> {memberInfo["Birthday"]}
          </p>
          <p>
            <strong>Birthplace:</strong> {memberInfo["Birthplace"]}
          </p>
          <p>
            <strong>Blood Type:</strong> {memberInfo["Blood type"]}
          </p>
          <p>
            <strong>Zodiac Signs:</strong> {memberInfo["Zodiac signs"]}
          </p>
          <p>
            <strong>Hobby:</strong> {memberInfo["Hobby"]}
          </p>
        </div>
      )}

      {/* Fan Letters */}
      <h3 className="text-lg font-bold mt-2">Fan Letters</h3>
      <div className="mt-2 overflow-y-scroll max-h-lvh lg:max-h-96">
        {fanLetters.length > 0 ? (
          <ul>
            {fanLetters.map((letter, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <div className="flex items-center">
                  <img src={letter.user.image} alt={letter.user.name} className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-semibold">{letter.user.name}</span>
                </div>
                <p>{letter.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada fan letter.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDetail;
