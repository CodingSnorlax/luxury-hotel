import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import useAppleStore from "../../store/appleStore";
//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
//img
import imgHero from "../../assets/img/imgHero.png";
import bgDot from "../../assets/img/bgDot.svg";
import bgAbout from "../../assets/img/bgAbout.png";
import bgLineFill from "../../assets/img/bgLineFill.svg";
import bgGradient from "../../assets/img/bgGradient.svg";
import imgMap from "../../assets/img/imgMap.png";
//icon
import imgCar from "../../assets/icon/car.svg";
import imgTrain from "../../assets/icon/train.svg";
import imgLuxurycar from "../../assets/icon/luxurycar.svg";
//bg
import bgLineLeft from "../../assets/img/bgLineLeft.svg";
import bgLineLeft2 from "../../assets/img/bgLineLeft2.svg";

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
      {/* banner */}
      <section className="carousel slide">
        <div
          id="carouselExampleCaptions"
          className="carousel slide banner-box"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active banner-img">
              <img src={imgHero} className="d-block w-100 h-100vh" alt="img" />
            </div>
            {/* <div className="carousel-item h-100">
              <img src={imgHero} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div> */}
          </div>
          <div className="carousel-style position-absolute container-fluid container justify-content-between">
            <div className="d-flex justify-content-between flex-column flex-lg-row  banner-text">
              <div className="col-12 col-lg-5 text-primary d-flex align-items-center">
                <div className="text-start w-100">
                  <h4 className="fs-1">享樂酒店</h4>
                  <p className="fs-4">Enjoyment Luxury Hotel</p>
                  <p className="gradient-underline mt-10"></p>
                </div>
              </div>
              <div className="col-12 col-lg-6 text-light d-flex align-items-center border-top border-end rounded-5 banner-right">
                <div className="col-12 text-start ml-50">
                  <h3 className="fs-100">高雄</h3>
                  <h3 className="fs-100">豪華住宿之選</h3>
                  <p className="fs-2">
                    我們致力於為您提供無與倫比的奢華體驗與優質服務
                  </p>
                  <button className="btn btn-light col-12 d-flex justify-content-end align-item-center fw-bold fs-4 d-flex mt-10 p-10">
                    立即訂房
                    <span
                      className="ms-4 solid-underline-dark align-self-center"
                      style={{ width: "150px" }}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button> */}
        </div>
      </section>
      {/* news */}
      <section className="bg-brown">
        <div className="container p-120">
          {news.map((news, index) => (
            <div className="row container-fluid" key={index}>
              <div className="col-12 col-md-2 text-primary d-flex align-items-center">
                {index === 0 && (
                  <div className="text-start">
                    <h4 className="fs-1">最新</h4>
                    <h4 className="fs-1">消息</h4>
                    <p className="gradient-underline mt-10"></p>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-10 position-relative text-light d-flex align-items-center mb-4">
                <div
                  className="card mb-3 border border-0"
                  style={{ maxWidth: "100%", height: "294px" }}
                >
                  <div className="row g-0 bg-brown">
                    <div className="col-md-6">
                      <img
                        src={news.image}
                        className="img-fluid border border-0 rounded-3 w-100 object-fit-cover"
                        alt="Card"
                        style={{ height: "294px" }}
                      />
                    </div>
                    <div className="col-md-6 d-flex align-self-center">
                      <div className="card-body">
                        <h5 className="card-title fs-3 fw-bold mb-6">
                          {news.title}
                        </h5>
                        <p className="card-text fs-6">{news.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* bg */}
                <div className="position-absolute translate-middle overflow-hidden">
                  {index === 0 && <img src={bgDot} alt="bgDot" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* about us */}
      <section className="bg-dark p-120 pb-240">
        <div
          className=" bg-dark position-relative"
          style={{
            backgroundImage: `url(${bgAbout})`,
            minHeight: "672px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img
            className="w-100"
            src={bgAbout}
            alt="bg About"
            style={{
              backgroundImage: `url(${bgAbout})`,
            }}
          /> */}
          {/* <div className="position-absolute top-50 start-100 translate-middle"> */}
          <div className="container">
            <div className="row position-relative" style={{ bottom: "-80px" }}>
              <div className="col-2"></div>
              <div className="col-10 bg-primary brown-box">
                <div className="brown-box-info">
                  <div className="d-flex justify-content-start align-item-center mb-80">
                    <h4 className="fs-2 text-light">
                      關於<br></br>我們
                    </h4>
                    <span
                      className="ms-4 solid-underline-light align-self-center"
                      style={{ width: "150px" }}
                    ></span>
                  </div>
                  <p className="fs-6 text-light mb-2 mt-4 ">
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。{" "}
                  </p>
                  <p className="fs-6 text-light mb-2 mt-4">
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。{" "}
                  </p>
                  <p className="fs-6 text-light mb-2 mt-4">
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。{" "}
                  </p>
                  <p className="fs-6 text-light mb-2 mt-4">
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
      {/* rooms */}
      <section className="px-0 z-n1 bg-dark p-120 container-fluid position-relative">
        <Swiper
          loop={true}
          pagination={true}
          modules={[Pagination]}
          className="mySwiperRooms"
        >
          {rooms.map((room, index) => (
            <SwiperSlide key={index}>
              <div className="row m-0">
                <div className="col-6">
                  <img
                    className="z-3 w-100 object-fit-cover border-start rounded-end-2"
                    src={room.imageUrl}
                    alt={`Room ${index + 1}`}
                    style={{
                      backgroundImage: `url(${room.imageUrl})`,
                      minHeight: "900px",
                    }}
                  />
                </div>
                <div className="col-6 d-flex flex-column justify-content-end">
                  <h4 className="fs-2 text-light mb-4">{room.name}</h4>
                  <p className="mb-4 text-light">{room.description}</p>
                  <h5 className="fs-2 text-light mb-4">NT$ {room.price}</h5>
                  <button className="btn btn-light col-12 d-flex justify-content-end align-item-center fw-bold fs-4 d-flex mt-10 p-10">
                    查看更多
                    <span
                      className="ms-4 solid-underline-dark align-self-center"
                      style={{ width: "150px" }}
                    ></span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="z-0 w-100 position-absolute top-50 start-50 translate-middle">
          <img src={bgLineFill} alt="bgLineFill" className="w-100" />
          <img src={bgGradient} alt="bgGradient" className="w-100" />
        </div>
      </section>
      {/* food */}
      <section className="p-120">
        <div className="position-relative container text-primary d-flex align-items-center">
          <div className=" col-12 text-primary d-flex align-items-center">
            <div className="d-flex justify-content-start align-item-center mb-80">
              <h4 className="fs-1">
                佳餚<br></br>美饌
              </h4>
              <span
                className="ms-4 gradient-underline align-self-center"
                style={{ width: "150px" }}
              ></span>
            </div>
          </div>
        </div>
        <div className="text-primary d-flex align-items-center">
          <div className="container">
            <Swiper
              loop={true}
              pagination={true}
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              centeredSlides={true}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              // modules={[Pagination]}
              className="mySwiperFood"
            >
              {culinaries.map((culinary, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card mb-3 border border-0"
                    style={{ maxWidth: "100%", height: "600px" }}
                  >
                    <div className="row g-0 bg-brown">
                      <div className="col-md-12 position-relative">
                        <img
                          src={culinary.image}
                          className="img-fluid border border-0 rounded-3 w-100 object-fit-cover"
                          alt="Card"
                          style={{ width: "416px", height: "600px" }}
                        />
                      </div>
                      <div className="bg-blur col-md-12 d-flex align-self-center position-absolute bottom-0">
                        <div className="card-body text-white">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title fs-4 fw-bold mb-6">
                              {culinary.title}
                            </h5>
                            <p className="card-text fs-6">
                              {culinary.diningTime}
                            </p>
                          </div>
                          <p className="card-text fs-6">
                            {culinary.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div>
          <img
            src={bgLineLeft}
            alt="bgLineLeft"
            className="position-absolute start-0 bottom-0 z-n1"
          />
        </div>
      </section>

      {/* transportation */}
      <section className="bg-dark p-120">
        <div className="container">
          <div className="col-12 text-primary d-flex align-items-center">
            <div className="d-flex justify-content-start align-item-center mb-80">
              <h4 className="fs-1">
                交通<br></br>方式
              </h4>
              <span
                className="ms-4 gradient-underline align-self-center"
                style={{ width: "150px" }}
              ></span>
            </div>
          </div>
          <div className="col-12 text-primary">
            <p className="fs-6 text-light mb-2 mt-4">
              台灣高雄市新興區六角路123號
            </p>
            <img className="img-fluid mb-10" src={imgMap} alt="imgMap" />
          </div>

          <ul className="list-unstyled row text-light">
            <li className="col-12 col-lg-4">
              <img src={imgCar} alt="car" className="text-primary" />
              <p className="fs-5 text-light">自行開車</p>
              <p>
                如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
              </p>
            </li>
            <li className="col-12 col-lg-4">
              <img src={imgTrain} alt="train" className="text-primary" />
              <p className="fs-5 text-light">高鐵/火車</p>
              <p>
                如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。
              </p>
            </li>
            <li className="col-12 col-lg-4">
              <img
                src={imgLuxurycar}
                alt="Luxurycar"
                className="fs-2 text-primary"
              />
              <p className="fs-5 text-light">禮賓車服務</p>
              <p>
                酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
              </p>
            </li>
          </ul>
        </div>
      </section>
      <div className="bg-dark">
        <img src={bgLineLeft2} alt="bgLineLeft2" className="w-100" />
      </div>
      {/* <h1>
        我在首頁也可以拿到蘋果的價格:{price} 跟蘋果的數量: {amount}{" "}
      </h1> */}
      {/* <img src={imgUrl} /> */}
      {/* <Link to="/login">跳到登入頁</Link> */}
    </>
  );
};
