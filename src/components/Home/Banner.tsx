import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
//img
import imgHero from "../../assets/img/imgHero.png";

const slidesData = [
  {
    imgSrc: imgHero,
    title: "享樂酒店",
    subtitle: "Enjoyment Luxury Hotel",
    location: "高雄",
    description: "我們致力於為您提供無與倫比的奢華體驗與優質服務!",
    buttonLink: "/roomTypes",
    buttonText: "立即訂房",
  },
  {
    imgSrc: imgHero,
    title: "享樂酒店",
    subtitle: "Enjoyment Luxury Hotel",
    location: "高雄",
    description: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
    buttonLink: "/roomTypes",
    buttonText: "立即訂房",
  },
];

const Banner = () => {
  return (
    <section className="position-relative">
      <Swiper
        autoplay={{ delay: 5000 }}
        className="banner-box mySwiperBanner"
        pagination={true}
        modules={[Pagination]}
        slidesPerView={1}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.imgSrc}
              className="d-block w-100 h-100vh"
              alt="img"
            />
            <div className="carousel-style position-absolute container-fluid container justify-content-between">
              <div className="d-flex justify-content-between flex-column flex-lg-row  banner-text">
                <div className="col-12 col-lg-5 text-primary d-flex align-items-center">
                  <div className="position-relative text-center text-lg-start w-100 d-flex flex-column align-items-center mb-4">
                    <h4 className="fs-1">{slide.title}</h4>
                    <p className="fs-4">{slide.subtitle}</p>
                    <p className="gradient-underline-2 mt-10"></p>
                  </div>
                </div>
                <div className="col-12 col-lg-6 text-light d-flex align-items-center border-top border-end rounded-5 banner-right">
                  <div className="col-12 text-start ml-50">
                    <h3 className="fs-100">{slide.location}</h3>
                    <h3 className="fs-100">豪華住宿之選</h3>
                    <p className="fs-2">{slide.description}</p>
                    <Link
                      className="btn-brown btn btn-light col-12 d-flex justify-content-end align-item-center fw-bold fs-4 d-flex mt-10 p-2 p-xl-10"
                      to={slide.buttonLink}
                    >
                      {slide.buttonText}
                      <span
                        className="ms-4 solid-underline-dark align-self-center"
                        style={{ width: "150px" }}
                      ></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
