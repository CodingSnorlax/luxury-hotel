import { useParams, useNavigate } from "react-router-dom";
import "./RoomDetailPage.scss";
import { useState, useEffect, useMemo } from "react";
import { Room } from "../../interface/Room";
import { formatNumberWithCommas } from "../../units/format";
import RoomInfo from "../../components/RoomInfo/RoomInfo";
import { CheckListComponent } from "../../components/CheckListComponent";
import { formatInfoTitleList } from "../../units/format";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { zhTW } from "date-fns/locale";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { Modal } from "bootstrap";
import { apiGetRoomDetail } from "../../apis/roomApis";
//取訂房資訊
import useReservationStore from "../../store/ReservationStore";

interface Props {
  navbarHeight: number;
}

export const RoomDetailPage = ({ navbarHeight }: Props) => {
  const navigate = useNavigate();
  const pageParams = useParams();
  const [vw, setVw] = useState(0);
  const [room, setRoom] = useState<Room | null>(null);
  const getRoom = async () => {
    try {
      const res = await apiGetRoomDetail(pageParams.roomTypeId as string);
      if (!res) return;
      setRoom(res.data.result);
    } catch (err) {}
  };

  // datepicker
  interface DatePickerData {
    startDate: Date;
    endDate: Date;
    key: string;
  }
  const [dateRange, setDateRange] = useState<[DatePickerData]>([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: "selection",
    },
  ]);
  const nights = useMemo(() => {
    return dayjs(dateRange[0].endDate).diff(
      dayjs(dateRange[0].startDate),
      "day"
    );
  }, [dateRange]);
  const changeDatePicker = (item: { selection: DatePickerData }) => {
    setDateRange([item.selection]);
  };
  const resetDate = () => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        key: "selection",
      },
    ]);
  };

  // modal
  const [datePickerModal, setDatePickerModal] = useState<Modal>();
  const [modalProgress, setModalProgress] = useState(1);
  const [isSave, setIsSave] = useState(false);

  // 人數
  const [peopleCount, setPeopleCount] = useState(2);

  // 取得本頁面所有資料，加入狀態管理層
  const store = useReservationStore((state) => state);

  const handleSubmit = () => {
    //取使用者目前登入情形
    //const [userLoginState, setUserLoginState] = useState(false);

    if (true) {
      //假設已登入 就跳轉到下一頁
      navigate(`/reservation/${room?._id}`);
      //帶資料回去
      store.setReservationData({
        userId: "karen", //temp
        bookingInfo: {
          roomTypeId: pageParams.roomTypeId,
          quantity: 2,
          arrivalDate: dateRange[0].startDate.toLocaleString(),
          departureDate: dateRange[0].endDate.toLocaleString(),
        },
        guestCount: peopleCount,
        totalPrice: room?.price ?? 0,
        notes: "temp",
      });
    } else {
      //未登入就先回去登入頁
      alert("請先登入再進行預約訂房！");
      navigate(`/login`);
    }
  };

  useEffect(() => {
    const modal = new Modal("#datePickerModal");
    setDatePickerModal(modal);
    document
      .getElementById("datePickerModal")
      ?.addEventListener("hidden.bs.modal", () => setModalProgress(1));
    setVw(window.innerWidth);
    getRoom();
  }, []);
  return (
    <div className="bg-bg" style={{ paddingTop: `${navbarHeight}px` }}>
      <div
        className="modal fade"
        id="datePickerModal"
        aria-labelledby="datePickerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content w-100">
            <div className="modal-body">
              <button
                className="btn d-lg-none p-0 mb-4"
                onClick={() => datePickerModal?.hide()}
              >
                <Icon path={mdiClose} size={1} />
              </button>

              <div className="d-flex justify-content-between">
                <div className="d-flex flex-lg-column">
                  <h5 className="h4 mb-2 mb-lg-0 me-4">{nights} 晚</h5>
                  {dayjs(dateRange[0].startDate).format(
                    "YYYY / MM / DD"
                  )} - {dayjs(dateRange[0].endDate).format("YYYY / MM / DD")}
                </div>
                <div className="d-none d-lg-flex">
                  <div className="border border-dark rounded p-4 pe-20 me-2">
                    <p className="dateLabel">入住</p>
                    <p>
                      {dayjs(dateRange[0].startDate).format("YYYY / MM / DD")}
                    </p>
                  </div>
                  <div className="border border-dark rounded p-4 pe-20">
                    <p className="dateLabel">退房</p>
                    <p>
                      {dayjs(dateRange[0].endDate).format("YYYY / MM / DD")}
                    </p>
                  </div>
                </div>
              </div>
              {modalProgress === 1 && (
                <>
                  <DateRangePicker
                    locale={zhTW}
                    onChange={(item: any) => changeDatePicker(item)}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={dateRange}
                    direction={vw >= 992 ? "horizontal" : "vertical"}
                    showPreview={false}
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                  />
                  <div className="btn-wrap d-flex justify-content-end pt-3">
                    <button
                      className="btn fw-bold me-4"
                      onClick={() => resetDate()}
                    >
                      清除日期
                    </button>
                    <button
                      className="btn btn-primary text-white fw-bold"
                      disabled={nights === 0}
                      onClick={() => {
                        vw >= 992
                          ? datePickerModal?.hide()
                          : setModalProgress(2);
                      }}
                    >
                      確定日期
                    </button>
                  </div>
                </>
              )}
              {modalProgress === 2 && (
                <>
                  <div className="p-6">
                    <h6 className="mb-1">選擇人數</h6>
                    <p className="mb-4">
                      此房型最多供 4 人居住，不接受寵物入住。
                    </p>
                    <div className="d-flex align-items-center">
                      <button
                        className="countBtn bg-white border rounded-circle d-flex justify-content-center align-items-center h4"
                        disabled={peopleCount <= 0}
                        onClick={() => setPeopleCount(peopleCount - 1)}
                      >
                        -
                      </button>
                      <span className="h4 mx-4">{peopleCount}</span>
                      <button
                        className="countBtn bg-white border rounded-circle d-flex justify-content-center align-items-center h4"
                        onClick={() => setPeopleCount(peopleCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="btn-wrap d-flex justify-content-end pt-3">
                    <button
                      className="btn fw-bold text-nowrap me-4"
                      onClick={() => setModalProgress(1)}
                    >
                      重新選擇日期
                    </button>
                    <button
                      className="btn btn-primary text-white fw-bold"
                      disabled={peopleCount <= 0}
                      onClick={() => {
                        setIsSave(true);
                        datePickerModal?.hide();
                      }}
                    >
                      儲存
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {room && (
        <>
          <section className="d-lg-none position-relative">
            <Swiper
              loop={true}
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {[room.imageUrl, ...room.imageUrlList].map((imgUrl, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img className="swiperImg" src={imgUrl} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="btn text-primary fw-bold border border-primary bg-bg seeMoreBtn">
              看更多
            </button>
          </section>
          <section className="img-wrap rounded-5 overflow-hidden m-3 m-lg-20 d-none d-lg-block">
            <div className="d-flex h-100">
              <img className="mainImg" src={room.imageUrl} alt="" />
              <div className="subImg-wrap pb-2">
                {room.imageUrlList.map((item, index) => {
                  return (
                    <img
                      className="subImg ps-2 mb-2"
                      src={item}
                      alt=""
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <button className="btn text-primary fw-bold border border-primary bg-bg seeMoreBtn">
              看更多
            </button>
          </section>
          <section className="content py-10 py-lg-30">
            <div className="row justify-content-center g-0">
              <div className="col-12 col-lg-10 col-xl-9 px-3 px-lg-0">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    <h1 className="display-5 mb-4">{room.name}</h1>
                    <p className="mb-6 mb-lg-20">{room.description}</p>
                    <div className="mb-6 mb-lg-20">
                      <h4 className="border-start border-primary border-4 ps-3 mb-4 mb-lg-6">
                        房型基本資訊
                      </h4>
                      <RoomInfo
                        areaInfo={room.areaInfo}
                        bedInfoType={room.bedInfo.type}
                        minPeople={room.minPeople}
                        maxPeople={room.maxPeople}
                        border={false}
                      />
                    </div>
                    <div className="mb-6 mb-lg-20">
                      <h4 className="border-start border-primary border-4 ps-3 mb-4 mb-lg-6">
                        房間格局
                      </h4>
                      <CheckListComponent
                        checkListArr={formatInfoTitleList(room.layoutInfo)}
                      />
                    </div>
                    <div className="mb-6 mb-lg-20">
                      <h4 className="border-start border-primary border-4 ps-3 mb-4 mb-lg-6">
                        房內設備
                      </h4>
                      <CheckListComponent
                        checkListArr={formatInfoTitleList(room.facilityInfo)}
                      />
                    </div>
                    <div className="mb-6 mb-lg-20">
                      <h4 className="border-start border-primary border-4 ps-3 mb-4 mb-lg-6">
                        備品提供
                      </h4>
                      <CheckListComponent
                        checkListArr={formatInfoTitleList(room.amenityInfo)}
                      />
                    </div>
                    <div>
                      <h4 className="border-start border-primary border-4 ps-3 mb-4 mb-lg-6">
                        訂房須知
                      </h4>
                      <ol>
                        <li>入住時間為下午3點，退房時間為上午12點。</li>
                        <li>
                          如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。
                        </li>
                        <li>
                          請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。
                        </li>
                        <li>
                          若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。
                        </li>
                        <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
                        <li>
                          如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。
                        </li>
                        <li>
                          我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。
                        </li>
                        <li>
                          請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。
                        </li>
                        <li>
                          我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。
                        </li>
                        <li>
                          為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-4 d-none d-lg-block">
                    <div
                      className="roomInfo bg-light rounded-5 p-10 sticky-top"
                      style={{ top: `${navbarHeight + 40}px` }}
                    >
                      <h4 className="border-bottom pb-4 mb-10">預訂房型</h4>
                      <h2 className="h1 mb-2">{room.name}</h2>
                      <p className="mb-10">{room.description}</p>
                      <div
                        className="date-wrap d-flex mb-4"
                        onClick={() => datePickerModal?.show()}
                      >
                        <div className="border border-dark rounded p-4 me-2 w-50">
                          <p className="dateLabel">入住</p>
                          <p>
                            {dayjs(dateRange[0].startDate).format(
                              "YYYY / MM / DD"
                            )}
                          </p>
                        </div>
                        <div className="border border-dark rounded p-4 w-50">
                          <p className="dateLabel">退房</p>
                          <p>
                            {dayjs(dateRange[0].endDate).format(
                              "YYYY / MM / DD"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-10">
                        <p className="fw-bold">人數</p>
                        <div className="d-flex align-items-center">
                          <button
                            className="countBtn bg-light border rounded-circle d-flex justify-content-center align-items-center h4"
                            disabled={peopleCount <= 0}
                            onClick={() => setPeopleCount(peopleCount - 1)}
                          >
                            -
                          </button>
                          <span className="h4 mx-lg-4 mx-xl-8">
                            {peopleCount}
                          </span>
                          <button
                            className="countBtn bg-light border rounded-circle d-flex justify-content-center align-items-center h4"
                            onClick={() => setPeopleCount(peopleCount + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="h4 text-primary mb-10">
                        NT$ {formatNumberWithCommas(room.price)}
                      </p>
                      <button
                        className="btn btn-primary text-light fw-bold w-100"
                        disabled={nights === 0 || peopleCount <= 0}
                        onClick={handleSubmit}
                      >
                        立即預訂
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed-bottom bg-light d-flex d-lg-none justify-content-between align-items-center p-3">
              {isSave ? (
                <>
                  <div>
                    <p>
                      NT$ {room.price} / {nights} 晚 / {peopleCount}人
                    </p>
                    <p className="dateLabel">{`${dayjs(
                      dateRange[0].startDate
                    ).format("MM / DD")} - ${dayjs(dateRange[0].endDate).format(
                      "MM / DD"
                    )}`}</p>
                  </div>
                  <button
                    className="btn btn-primary text-white fw-bold"
                    onClick={handleSubmit}
                  >
                    立即預定
                  </button>
                </>
              ) : (
                <>
                  <span>NT$ {room.price} / 晚</span>
                  <button
                    className="btn btn-primary text-white fw-bold"
                    onClick={() => datePickerModal?.show()}
                  >
                    查看可訂日期
                  </button>
                </>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
