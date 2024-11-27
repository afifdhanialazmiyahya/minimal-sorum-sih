// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header"; // Import Header jika ingin menampilkan header tetap di atas
import OnLive from "./pages/OnLive";
import RoomList from "./pages/RoomList";
import MemberDetail from "./pages/MemberDetail";
import TheaterSchedule from "./pages/TheaterSchedule";
import About from "./pages/About";
import Room from "./pages/Room";
import ScheduleDetail from "./pages/ScheduleDetail";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="pt-16">
        <Navbar />
        <Routes>
          <Route path="/" element={<OnLive />} />
          <Route path="/room-list" element={<RoomList />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/theater-schedule" element={<TheaterSchedule />} />
          <Route path="/schedule/:scheduleId" element={<ScheduleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
