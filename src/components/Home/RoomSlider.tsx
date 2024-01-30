import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// Assuming you have the 'rooms' data array

// Import Swiper styles
import "swiper/css";

const RoomSlider = ({ rooms }) => {
  return (
    <div className="container-fluid d-flex flex-column flex-md-row">
      <ImageSlider rooms={rooms} />
      <TextSlider rooms={rooms} />
    </div>
  );
};

const ImageSlider = ({ rooms }) => {
  return (
    <div className="col-12 col-md-6">
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
  return (
    <div className="col-12 col-md-6 p-0 p-lg-4 d-flex justify-content-end align-items-end">
      <Swiper
        loop={true}
        className="mySwiperRooms"
        controller={{ control: null }}
      >
        {rooms.map((room, index) => (
          <SwiperSlide key={index}>
            <div className="d-flex flex-column justify-content-end">
              <h4 className="fs-2 text-light mb-4">{room.name}</h4>
              <p className="mb-4 text-light">{room.description}</p>
              <h5 className="fs-2 text-light mb-4">NT$ {room.price}</h5>
              <Link
                className="btn btn-light col-12 d-flex justify-content-end align-item-center fw-bold fs-4 d-flex mt-10 p-10"
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
  );
};

export default RoomSlider;
