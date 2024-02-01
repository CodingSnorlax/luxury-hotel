import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../../assets/icon/arrowLeft.svg";
// components
import { CheckListComponent } from "../../components/CheckListComponent";
import RoomInfo from "../../components/RoomInfo/RoomInfo";
// store
import useReservationStore from "../../store/ReservationStore";
import useLoginStore from "../../store/LoginStore";
// tools
import { formatDate } from "../../units/time";
import { formatNumberWithCommas } from "../../units/format";
import {
  countyList as cityList,
  cityListByCounty as getDistrictsListByCity,
} from "../../units/zipcodes";
// APIs
import { apiGetUser } from "../../apis/userApis";
import { apiGetRoomDetail } from "../../apis/roomApis";
import { apiPostReservationData } from "../../apis/reservationApis";
// types
import {
  ReservationPostData,
  BookingInfoData,
} from "../../interface/Reservation";

export const ReservationPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const reservationStore = useReservationStore((state) => state);
  const loginStore = useLoginStore((state) => state);

  const { arrivalDate, departureDate, quantity, roomName } =
    reservationStore.bookingInfo;
  const { guestCount, totalPrice, userId } = reservationStore;

  console.log("params", params);
  console.log("reservationStore", reservationStore);
  console.log("loginStore", loginStore);

  type CheckListItem = {
    title: string;
    isProvide: boolean;
  };

  /** 取會員資料 */
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    detail: "",
  });

  const getUserInfo = async () => {
    try {
      const res = await apiGetUser();
      if (res && res.status) {
        const {
          name,
          phone,
          email,
          address: { detail },
        } = res.data.result;
        setUserInfo({
          name,
          phone,
          email,
          detail,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  /** 取會員資料 */

  /** 取縣市下拉選單資料 */
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //下拉選單選到的城市value
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);

    //透過城市找到區域
    const filteredDistricts = getDistrictsListByCity(selectedCity);
    setDistricts([...filteredDistricts]);
  };
  /** 取縣市下拉選單資料 */

  /** 取 checklist 所需資料 */
  const [roomSettingArr, setRoomSettingArr] = useState<string[]>([]); //房間格局
  const [facilityArr, setFacilityArr] = useState<string[]>([]); //房內設施
  const [sparePartsArr, setSparePartsArr] = useState<string[]>([]); //備品
  const [roomInfo, setRoomInfo] = useState({
    //房間基本資訊
    minPeople: "",
    maxPeople: "",
    bedInfoType: "",
    areaInfo: "",
    imageUrl: "",
  });

  const getRoomDetail = async () => {
    try {
      if (params.roomTypeId) {
        const res = await apiGetRoomDetail(params.roomTypeId);

        if (res?.status) {
          const {
            minPeople,
            maxPeople,
            areaInfo,
            bedInfo,
            layoutInfo,
            facilityInfo,
            amenityInfo,
            imageUrl,
          } = res.data.result;

          setRoomInfo({
            minPeople,
            maxPeople,
            bedInfoType: bedInfo.type,
            areaInfo: areaInfo,
            imageUrl,
          });

          const tempLayout: string[] = [];
          const tempFacility: string[] = [];
          const tempAmenity: string[] = [];

          layoutInfo.forEach((item: CheckListItem) => {
            tempLayout.push(item.title);
          });

          facilityInfo.forEach((item: CheckListItem) => {
            tempFacility.push(item.title);
          });

          amenityInfo.forEach((item: CheckListItem) => {
            tempAmenity.push(item.title);
          });

          setRoomSettingArr([...tempLayout]);
          setFacilityArr([...tempFacility]);
          setSparePartsArr([...tempAmenity]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoomDetail();
  }, []);
  /** 取 checklist 所需資料 */

  /** 算出日期之間橫跨的天數 */
  function calculateDaysDifference(
    startDate: Date | string,
    endDate: Date | string
  ) {
    let daysDifference;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end.getTime() - start.getTime();
      // 轉為天數
      daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    } else {
      daysDifference = 1;
    }

    return daysDifference;
  }

  const [bookingDays, setBookingDays] = useState(0);

  useEffect(() => {
    const cacuBookingDays = calculateDaysDifference(arrivalDate, departureDate);
    setBookingDays(cacuBookingDays);
  }, [arrivalDate, departureDate]);
  /** 算出日期之間橫跨的天數 */

  /** 送出確認訂房資料 */
  const postReservationData = async () => {
    const postData: ReservationPostData = {
      userId: "",
      bookingInfo: [],
      guestCount: 0,
      totalPrice: 0,
      notes: "",
    };

    const bookingDetailInfo: BookingInfoData = {
      roomTypeId: "",
      quantity: 0,
      arrivalDate: new Date(),
      departureDate: new Date(),
    };

    if (userId) {
      postData.userId = userId;
      postData.guestCount = guestCount;
      postData.totalPrice = totalPrice * bookingDays;
      bookingDetailInfo.roomTypeId = params.roomTypeId ?? "";
      bookingDetailInfo.quantity = quantity;
      bookingDetailInfo.arrivalDate = arrivalDate;
      bookingDetailInfo.departureDate = departureDate;
      postData.bookingInfo.push(bookingDetailInfo);
    } else {
      alert("請確認已登入會員，再進行訂房作業");
    }

    console.log("postData", postData);
    console.log("bookingDetailInfo", bookingDetailInfo);
    try {
      const res = await apiPostReservationData(postData);
      console.log("送出資料的res!", res);
      if(res?.data.status){
        navigate(`/success`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /** 送出確認訂房資料 */

  return (
    <div className="bg-primary-40">
      <div className="container mt-30 py-12">
        {/* 確認訂房資訊按鈕 */}
        <div className="back-to-room-detail-page mb-8">
          <h3>
            <Link
              className="text-dark text-decoration-none"
              to={`/roomDetail/${params.roomTypeId}`}
            >
              <img src={arrowLeft} alt="" /> 確認訂房資訊
            </Link>
          </h3>
        </div>
        <main>
          <div className="row mb-8">
            <div className="col-md-8">
              {/* 訂房資訊 */}
              <ul className="list-unstyled mb-16 pb-8 border-bottom border-secondary">
                <h4 className="mb-8">訂房資訊</h4>
                {/* 選擇房型 */}
                <li className="d-flex justify-content-between align-items-center mb-4">
                  <div className="reservation-info">
                    <div className="border-5 border-start border-primary mb-1">
                      <span className="ms-2">選擇房型</span>
                    </div>
                    <p>{roomName}</p>
                  </div>

                  <Link
                    className="text-dark"
                    to={`/roomDetail/${params.roomTypeId}`}
                  >
                    編輯
                  </Link>
                </li>
                {/* 訂房日期 */}
                <li className="d-flex justify-content-between align-items-center mb-4">
                  <div className="reservation-info">
                    <div className="border-5 border-start border-primary mb-1">
                      <span className="ms-2">訂房日期</span>
                    </div>
                    <p>
                      入住：
                      {arrivalDate ? formatDate(arrivalDate) : ""}
                    </p>
                    <p>
                      退房：
                      {departureDate ? formatDate(departureDate) : ""}
                    </p>
                  </div>
                  <Link
                    className="text-dark"
                    to={`/roomDetail/${params.roomTypeId}`}
                  >
                    編輯
                  </Link>
                </li>
                {/* 房客人數 */}
                <li className="d-flex justify-content-between align-items-center">
                  <div className="reservation-info">
                    <div className="border-5 border-start border-primary mb-1">
                      <span className="ms-2">房客人數</span>
                    </div>
                    <p>{guestCount} 人</p>
                  </div>
                  <Link
                    className="text-dark"
                    to={`/roomDetail/${params.roomTypeId}`}
                  >
                    編輯
                  </Link>
                </li>
              </ul>
              {/* 訂房人資訊 */}
              <ul className="list-unstyled mb-16 pb-8 border-bottom border-secondary">
                <div className="header-wrap d-flex align-items-center justify-content-between">
                  <h4 className="mb-8">訂房人資訊</h4>
                  <a
                    className="text-primary border-bottom"
                    style={{ cursor: "pointer" }}
                    onClick={getUserInfo}
                  >
                    套用會員資料
                  </a>
                </div>
                <li className="mb-4">
                  <label htmlFor="customerName" className="form-label">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    placeholder="請輸入姓名"
                    value={userInfo.name}
                  />
                </li>
                <li className="mb-4">
                  <label htmlFor="mobilePhone" className="form-label">
                    手機號碼
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobilePhone"
                    placeholder="請輸入手機號碼"
                    value={userInfo.phone}
                  />
                </li>
                <li className="mb-4">
                  <label htmlFor="email" className="form-label">
                    電子信箱
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="請輸入電子信箱"
                    value={userInfo.email}
                  />
                </li>
                <li>
                  <label htmlFor="address" className="form-label">
                    地址
                  </label>
                  <div className="select-group d-flex mb-2">
                    <select
                      className="form-select me-2"
                      aria-label="city"
                      defaultValue="請選擇縣市"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      {cityList.map((city, index) => {
                        return (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        );
                      })}
                    </select>
                    <select className="form-select" aria-label="city">
                      <option selected>請選擇區域</option>
                      {districts.map((district, index) => {
                        return (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    id="detailAddress"
                    placeholder="請輸入詳細地址"
                    value={userInfo.detail}
                  />
                </li>
              </ul>
              {/* 房間資訊 */}
              <ul className="list-unstyled mb-0 mb-md-16 pb-8 border-secondary">
                <h4 className="mb-12">房間資訊</h4>
                {/* 房型基本資訊 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">房型基本資訊</h5>
                  </div>
                  <RoomInfo
                    areaInfo={roomInfo.areaInfo}
                    bedInfoType={roomInfo.bedInfoType}
                    minPeople={Number(roomInfo.minPeople)}
                    maxPeople={Number(roomInfo.maxPeople)}
                    border={false}
                  />
                </li>

                {/* 房間格局 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">房間格局</h5>
                  </div>
                  <CheckListComponent checkListArr={roomSettingArr} />
                </li>

                {/* 房內設備 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">房內設備</h5>
                  </div>
                  <CheckListComponent checkListArr={facilityArr} />
                </li>

                {/* 備品提供 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">備品提供</h5>
                  </div>
                  <CheckListComponent checkListArr={sparePartsArr} />
                </li>
              </ul>
            </div>
            {/* 卡片區 */}
            <div className="col-md-4">
              <div className="card p-10 ms-0 ms-md-8 sticky-top">
                <img src={roomInfo.imageUrl} className="card-img-top mb-8" />
                <div className="card-bod p-0">
                  <h4 className="card-title mb-8">價格詳情</h4>
                  <ul className="list-unstyled mb-12">
                    <li className="d-flex justify-content-between">
                      <span>
                        NT$ {formatNumberWithCommas(totalPrice)} x {bookingDays}{" "}
                        晚
                      </span>
                      <span>
                        NT$ {formatNumberWithCommas(totalPrice * bookingDays)}
                      </span>
                    </li>
                    {/* <li className="d-flex justify-content-between pb-4  border-bottom border-gray">
                      <span>住宿折扣</span>
                      <span className="text-primary">-NT$ 1,000</span>
                    </li> */}
                    <li className="mt-4 d-flex justify-content-between">
                      <span>總價</span>
                      <span className="">
                        {" "}
                        NT$ {formatNumberWithCommas(totalPrice * bookingDays)}
                      </span>
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary text-light w-100 mb-0"
                    onClick={postReservationData}
                  >
                    確認訂房
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
