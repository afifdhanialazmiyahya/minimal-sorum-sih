import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const RoomList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const [roomsResponse, academyResponse] = await Promise.all([
          axios.get("https://jkt48-showroom-api-tubes.vercel.app/api/rooms"),
          axios.get("https://jkt48-showroom-api-tubes.vercel.app/api/rooms/academy"),
        ]);

        const allMembers = [
          ...roomsResponse.data,
          ...academyResponse.data.map((academy) => ({
            id: academy.room_id,
            name: academy.room_name,
            image_url: academy.image,
            follower_num: academy.follower_num,
            is_live: academy.is_onlive,
          })),
        ];

        setMembers(allMembers);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="pt-6 px-4 sm:px-14 lg:px-16 mb-16">
      <h1 className="text-2xl font-bold text-center mb-4">JKT48 Member Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Link to={`/members/${member.id}`} key={member.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              {member.image_url && <img src={member.image_url} alt={member.name} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-gray-500">Followers: {member.follower_num}</p>

                {/* Status Live */}
                {member.is_live ? (
                  <div className="flex items-center justify-between bg-green-500 p-2 rounded-lg mt-2">
                    <span className="text-white font-bold">Live</span>
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.98959 4.92865C6.28249 5.22155 6.28249 5.69642 5.98959 5.98931C2.67014 9.30877 2.67014 14.6907 5.98959 18.0101C6.28249 18.303 6.28249 18.7779 5.98959 19.0708C5.6967 19.3637 5.22183 19.3637 4.92893 19.0708C1.02369 15.1655 1.02369 8.8339 4.92893 4.92865C5.22183 4.63576 5.6967 4.63576 5.98959 4.92865ZM19.0711 4.92865C22.9763 8.8339 22.9763 15.1655 19.0711 19.0708C18.7782 19.3637 18.3033 19.3637 18.0104 19.0708C17.7175 18.7779 17.7175 18.303 18.0104 18.0101C21.3299 14.6907 21.3299 9.30877 18.0104 5.98931C17.7175 5.69642 17.7175 5.22155 18.0104 4.92865C18.3033 4.63576 18.7782 4.63576 19.0711 4.92865ZM8.81802 7.75708C9.11091 8.04997 9.11091 8.52485 8.81802 8.81774C7.06066 10.5751 7.06066 13.4243 8.81802 15.1817C9.11091 15.4746 9.11091 15.9495 8.81802 16.2424C8.52513 16.5353 8.05025 16.5353 7.75736 16.2424C5.41421 13.8992 5.41421 10.1002 7.75736 7.75708C8.05025 7.46419 8.52513 7.46419 8.81802 7.75708ZM16.2426 7.75708C18.5858 10.1002 18.5858 13.8992 16.2426 16.2424C15.9497 16.5353 15.4749 16.5353 15.182 16.2424C14.8891 15.9495 14.8891 15.4746 15.182 15.1817C16.9393 13.4243 16.9393 10.5751 15.182 8.81774C14.8891 8.52485 14.8891 8.04997 15.182 7.75708C15.4749 7.46419 15.9497 7.46419 16.2426 7.75708ZM12 10.4997C12.8284 10.4997 13.5 11.1713 13.5 11.9997C13.5 12.8281 12.8284 13.4997 12 13.4997C11.1716 13.4997 10.5 12.8281 10.5 11.9997C10.5 11.1713 11.1716 10.4997 12 10.4997Z"
                        fill="#212121"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-red-500 p-2 rounded-lg mt-2">
                    <span className="text-white font-bold">Not Live</span>
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L4.41817 5.47888C1.03184 9.40762 1.20209 15.3442 4.92893 19.0711C5.22183 19.364 5.6967 19.364 5.98959 19.0711C6.28249 18.7782 6.28249 18.3033 5.98959 18.0104C2.84885 14.8697 2.67976 9.88259 5.48231 6.54304L7.25981 8.32057C5.42798 10.6744 5.59383 14.0791 7.75736 16.2426C8.05025 16.5355 8.52513 16.5355 8.81802 16.2426C9.11091 15.9498 9.11091 15.4749 8.81802 15.182C7.24137 13.6053 7.07924 11.1498 8.33164 9.39242L10.5508 11.6116C10.5177 11.7355 10.5 11.8657 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.1343 13.5 12.2645 13.4824 12.3884 13.4492L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968Z"
                        fill="#212121"
                      />
                      <path
                        d="M19.3885 16.2068L20.4822 17.3006C22.8997 13.4397 22.4293 8.28717 19.0711 4.92894C18.7782 4.63604 18.3033 4.63604 18.0104 4.92894C17.7175 5.22183 17.7175 5.6967 18.0104 5.9896C20.7791 8.75833 21.2385 12.9619 19.3885 16.2068Z"
                        fill="#212121"
                      />
                      <path
                        d="M16.3472 13.1655L17.5252 14.3434C18.4507 12.1592 18.0232 9.53793 16.2426 7.75737C15.9497 7.46447 15.4749 7.46447 15.182 7.75737C14.8891 8.05026 14.8891 8.52513 15.182 8.81803C16.3598 9.99585 16.7482 11.6642 16.3472 13.1655Z"
                        fill="#212121"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
