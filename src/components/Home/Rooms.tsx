// Rooms.jsx
import React from "react";
import RoomSlider from "../../components/Home//RoomSlider";
//img
import bgLineFill from "../../assets/img/bgLineFill.svg";
import bgGradient from "../../assets/img/bgGradient.svg";

const Rooms = ({ rooms }) => {
  return (
    <section className="px-0 z-n2 bg-dark p-120 container-fluid position-relative">
      <RoomSlider rooms={rooms} />
      <div className="z-0 w-100 position-absolute top-50 start-50 translate-middle">
        <img src={bgLineFill} alt="bgLineFill" className="w-100" />
        <img src={bgGradient} alt="bgGradient" className="w-100" />
      </div>
    </section>
  );
};

export default Rooms;
