//add component Food
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
//img
import bgLineLeft from "../../assets/img/bgLineLeft.svg";

const Culinary = ({ culinaries }) => {
  return (
    <section className="p-120">
      {/* bg */}
      <div>
        <img
          src={bgLineLeft}
          alt="bgLineLeft"
          className="d-none d-xxl-block position-absolute start-0"
        />
      </div>
      <div className="position-relative container text-primary d-flex align-items-center">
        <div className="col-12 text-primary d-flex align-items-center">
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
        <div className="container-fluid">
          <Swiper
            loop={true}
            pagination={true}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
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
                    <div className="bg-blur col-md-12 d-flex align-self-center position-absolute bottom-0 h-50">
                      <div className="card-body text-white">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title fs-4 fw-bold mb-6">
                            {culinary.title}
                          </h5>
                          <p className="card-text fs-6">
                            {culinary.diningTime}
                          </p>
                        </div>
                        <p className="card-text fs-6">{culinary.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Culinary;
