import { useEffect, useState } from "react";
import "./RoomTypesPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { mdiChevronLeft, mdiChevronRight, mdiArrowRight } from "@mdi/js";
import { Room } from "../../interface/Room";
import { formatNumberWithCommas } from "../../units/format";
import RoomInfo from "../../components/RoomInfo/RoomInfo";
import { apiGetRooms } from "../../apis/roomApis";

export const RoomTypesPage = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const getRooms = async () => {
    try {
      const res = await apiGetRooms();
      if (!res) return;
      setRoomList(res.data.result);
    } catch (err) {}
  };

  const navigate = useNavigate();
  const goDetail = (id: string) => {
    navigate(`/roomDetail/${id}`);
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
                          <RoomInfo
                            areaInfo={item.areaInfo}
                            bedInfoType={item.bedInfo.type}
                            minPeople={item.minPeople}
                            maxPeople={item.maxPeople}
                            border={true}
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <h4 className="fw-bold text-primary">
                            NT$ {formatNumberWithCommas(item.price)}
                          </h4>
                          <button
                            className="btn text-primary p-0 ps-16"
                            onClick={() => goDetail(item._id)}
                          >
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
