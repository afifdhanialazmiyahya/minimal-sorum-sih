// src/pages/About.js
import React, { useState, useEffect } from "react";

// Loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-2 border-blue-600 border-l-transparent border-r-transparent w-16 h-16"></div>
    </div>
  );
};

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set delay sesuai kebutuhan, contoh 1 detik

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center p-4 mb-20 min-h-screen">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold mb-6">About</h1>

        {/* About App Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About App</h2>
          <p>
            Aplikasi ini menampilkan informasi mengenai JKT48, termasuk jadwal, profil member, dan live streaming member. Aplikasi ini juga dibuat sebagai Tugas Besar Praktikum
            Pemrograman Perangkat Bergerak tahun 2024. Aplikasi ini mengambil data dengan memanfaatkan API{" "}
            <a href="https://github.com/ikhbaldwiyan/jkt48-showroom-api" target="_blank" rel="noopener noreferrer" className="text-black font-bold no-underline">
              jkt48-showroom-api
            </a>
            .
          </p>
        </div>

        {/* About Developer Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About Developer</h2>

          {/* Profile Image */}
          <img
            src={`${process.env.PUBLIC_URL}/PP.png`} // Menggunakan path relatif setelah memindahkan gambar ke folder public
            alt="Developer Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />

          <p>
            Dikembangkan oleh{" "}
            <a href="https://www.instagram.com/azmidhanial_/" target="_blank" rel="noopener noreferrer" className="text-black font-bold no-underline">
              Afif Dhanial Azmiyahya
            </a>{" "}
            (21120122120023), Mahasiswa Teknik Komputer Angkatan 2022 yang juga merupakan praktikan Praktikum Pemrograman Perangkat Bergerak, serta seorang penggemar JKT48 yang
            berdedikasi untuk menyediakan informasi terkini bagi komunitas penggemar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
