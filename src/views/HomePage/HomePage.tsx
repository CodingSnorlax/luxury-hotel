import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import useAppleStore from "../../store/appleStore";
import { Link } from "react-router-dom";
//
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
//img
// import imgHero from "../../assets/img/imgHero.png";
import bgDot from "../../assets/img/bgDot.svg";
// import bgAbout from "../../assets/img/bgAbout.png";
// import bgLineFill from "../../assets/img/bgLineFill.svg";
// import bgGradient from "../../assets/img/bgGradient.svg";
// import imgMap from "../../assets/img/imgMap.png";

//bg
import bgLineLeft from "../../assets/img/bgLineLeft.svg";
import bgLineLeft2 from "../../assets/img/bgLineLeft2.svg";

//components
import Banner from "../../components/Home/Banner";
import News from "../../components/Home/News";
import AboutUs from "../../components/Home/AboutUs";
import Rooms from "../../components/Home/Rooms";
import Culinary from "../../components/Home/Culinary";
import Trans from "../../components/Home/Trans";

import "./HomePage.scss";

interface News {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface Culinary {
  _id: string;
  title: string;
  description: string;
  diningTime: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface Room {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: {
    type: string;
    quantity: number;
  };
  maxPeople: number;
  minPeople: number;
  price: number;
  status: number;
}

export const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [culinaries, setCulinaries] = useState<Culinary[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/news`
        );
        const culinaryResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/culinary`
        );
        const roomResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/room`
        );

        setNews(newsResponse.data.result);
        setCulinaries(culinaryResponse.data.result);
        setRooms(roomResponse.data.result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Banner />
      {/* bg */}
      <div
        className="position-absolute end-0 translate-middle overflow-hidden"
        style={{ top: "-40px" }}
      >
        <img src={bgDot} alt="bgDot" />
      </div>
      <News news={news} />
      <AboutUs />
      <Rooms rooms={rooms} />
      <Culinary culinaries={culinaries} />
      <Trans />
      {/* bg */}
      <div className="bg-dark">
        <img src={bgLineLeft2} alt="bgLineLeft2" className="w-100" />
      </div>
    </>
  );
};
