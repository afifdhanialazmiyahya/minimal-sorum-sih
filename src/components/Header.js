// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Jika scroll lebih dari 50px, set isScrolled ke true
    };

    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat komponen dilepas
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full shadow-lg z-50 transition duration-300 ${isScrolled ? "bg-[#efe5ff] bg-opacity-80" : "bg-[#efe5ff]"}`}>
      <div className="container mx-auto p-4 text-center">
        <Link to="/" className="text-black text-xl font-bold">
          {/* Logo untuk perangkat desktop */}
          <img src="/Logo_Desktop.svg" alt="Logo Desktop" className="hidden md:inline-block h-8 mr-2 align-middle" />
          {/* Logo untuk perangkat mobile */}
          <img src="/Logo_main.svg" alt="Logo Mobile" className="inline-block md:hidden h-8 mr-2 align-middle" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
