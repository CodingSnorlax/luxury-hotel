import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
const RoomSlider = ({ rooms }) => {
  return (
    <div className="container-fluid row m-0">
      <ImageSlider rooms={rooms} />
      <TextSlider rooms={rooms} />
    </div>
  );
};

const ImageSlider = ({ rooms }) => {
  return (
    <div className="col-12 col-lg-6">
      <Swiper
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="mySwiperRooms"
      >
        {rooms.map((room, index) => (
          <SwiperSlide key={index}>
            <img
              className="z-3 w-100 object-fit-cover border-start rounded-end-2 mb-4"
              src={room.imageUrl}
              alt={`Room ${index + 1} - Image`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
const TextSlider = ({ rooms }) => {
  const [swiper, setSwiper] = React.useState(null);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const handleSwiper = (swiperInstance) => {
    if (!swiper && swiperInstance) {
      setSwiper(swiperInstance);
    }
  };

  const handlePrevClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <>
      <section className="col-12 col-lg-6 p-4 d-flex flex-column justify-content-end">
        <div className="d-flex justify-content-end align-items-end">
          <Swiper
            loop={true}
            className="mySwiperRooms"
            controller={{ control: null }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            modules={[Pagination, Navigation]}
            onSwiper={handleSwiper}
          >
            {rooms.map((room, index) => (
              <SwiperSlide key={index}>
                <div className="d-flex flex-column justify-content-end">
                  <h4 className="fs-2 text-light mb-4">{room.name}</h4>
                  <p className="mb-4 text-light">{room.description}</p>
                  <h5 className="fs-2 text-light mb-4">NT$ {room.price}</h5>
                  <Link
                    className="btn-brown btn btn-light col-12 d-flex justify-content-end align-item-center fw-bold fs-4 d-flex mt-10 p-4 p-xl-10"
                    to="/roomTypes"
                    style={{ zIndex: 9999 }}
                  >
                    查看更多
                    <span
                      className="ms-4 solid-underline-dark align-self-center"
                      style={{ width: "150px" }}
                    ></span>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className="d-flex justify-content-end mt-2"
          style={{ zIndex: 999 }}
        >
          {/* Add navigation arrows */}
          <div
            ref={navigationNextRef}
            style={{ cursor: "pointer" }}
            onClick={handleNextClick}
            className="navigation-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#BE9C7C"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div
            ref={navigationPrevRef}
            className="navigation-arrow me-4"
            style={{ cursor: "pointer" }}
            onClick={handlePrevClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#BE9C7C"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomSlider;
