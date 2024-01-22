import { useEffect, useState } from "react";
import "./RoomTypePage.scss";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Icon as Iconify } from "@iconify/react";
import Icon from "@mdi/react";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiArrowRight,
  mdiBedKing,
  mdiAccount,
} from "@mdi/js";

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
  layoutInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  facilityInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  amenityInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

export const RoomTypePage = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const getRooms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/room`
      );
      setRoomList(res.data.result);
    } catch (err) {}
  };
  const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    getRooms();
  }, []);
  return (
    <>
      <div className="banner">
        <div className="banner-title-wrap">
          <div className="row w-100 h-100 justify-content-center align-items-center">
            <div className="col-6">
              <div className=" d-flex flex-column flex-lg-row justify-content-center align-items-center justify-content-lg-between">
                <div className="banner-title w-100 text-primary pb-5 pb-lg-10 text-center text-lg-start">
                  <h2 className="display-6">享樂酒店</h2>
                  <h5 className="h5">Enjoyment Luxury Hotel</h5>
                </div>
                <div className="divider d-lg-none mb-10"></div>
                <div className="d-flex justify-content-end align-items-center ms-lg-20">
                  <h2 className="display-5 text-white text-nowrap">客房旅宿</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content bg-bg py-10 py-lg-30">
        <div className="row justify-content-center g-0 px-3 px-lg-0">
          <div className="col-12 col-md-10 col-lg-8">
            <h6 className="h5 mb-2 mb-lg-4">房型選擇</h6>
            <h2 className="display-5 text-primary mb-10 mb-lg-20">
              各種房型，任您挑選
            </h2>
            {roomList.map((item) => {
              return (
                <div
                  className="roomCard rounded-4 mb-12 overflow-hidden"
                  key={item._id}
                >
                  <div className="row h-lg-100 g-0">
                    <div className="col-12 col-lg-7 h-lg-100">
                      <Swiper
                        loop={true}
                        pagination={true}
                        navigation={{
                          prevEl: ".swiper-button-prev",
                          nextEl: ".swiper-button-next",
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper h-lg-100"
                      >
                        {item.imageUrlList.map((imgUrl, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <img className="swiperImg" src={imgUrl} alt="" />
                            </SwiperSlide>
                          );
                        })}
                        <div className="swiper-button-prev">
                          <Icon path={mdiChevronLeft} size={2} />
                        </div>
                        <div className="swiper-button-next fs-1">
                          <Icon path={mdiChevronRight} size={2} />
                        </div>
                      </Swiper>
                    </div>
                    <div className="col-12 col-lg-5 d-flex flex-column justify-content-center h-lg-100 bg-light px-4 px-lg-10 py-10">
                      <>
                        <div className="card-desc-wrap border-bottom pb-6 pb-lg-10 mb-10">
                          <h3 className="display-6 mb-2">{item.name}</h3>
                          <p className="mb-6 mb-lg-10">{item.description}</p>
                          <div className="d-flex">
                            <div className="feature d-flex flex-column justify-content-center px-4 me-4 border rounded-2">
                              <Iconify
                                icon="fluent:slide-size-24-filled"
                                className="fs-4 text-primary"
                              />
                              <p className="fw-bold">{item.areaInfo}</p>
                            </div>
                            <div className="feature d-flex flex-column justify-content-center px-4 me-4 border rounded-2">
                              <Icon
                                path={mdiBedKing}
                                size={1}
                                className="text-primary"
                              />
                              <p className="fw-bold">{item.bedInfo.type}</p>
                            </div>
                            <div className="feature d-flex flex-column justify-content-center px-4 me-4 border rounded-2">
                              <Icon
                                path={mdiAccount}
                                size={1}
                                className="text-primary"
                              />
                              <p className="fw-bold">
                                {item.minPeople}-{item.maxPeople} 人
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h4 className="fw-bold text-primary">
                            NT$ {formatNumberWithCommas(item.price)}
                          </h4>
                          <button className="btn text-primary p-0 ps-16">
                            <Icon path={mdiArrowRight} size={1} />
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
