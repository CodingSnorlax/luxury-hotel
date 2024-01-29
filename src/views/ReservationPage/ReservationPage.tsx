import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "../../assets/icon/arrowLeft.svg";
// components
import { CheckListComponent } from "../../components/CheckListComponent";
// import RoomInfo from "../../components/RoomInfo/RoomInfo";
// store
import useReservationStore from "../../store/ReservationStore";
import useLoginStore from "../../store/LoginStore";
// tools
import { formatDate } from "../../units/time";
import { formatNumberWithCommas } from "../../units/format";
import { countyList as cityList, cityListByCounty, zipCodeByCountryAndCity, countyAndCityByZipCode } from "../../units/zipcodes";
// APIs
import { apiGetUser } from "../../apis/userApis";


console.log('zipCodeByCountryAndCity', zipCodeByCountryAndCity)
console.log('countyAndCityByZipCode' , countyAndCityByZipCode)
console.log('cityListByCounty', cityListByCounty)

export const ReservationPage: React.FC = () => {
  const params = useParams();
  const reservationStore = useReservationStore((state) => state);
  const loginStore = useLoginStore((state) => state);

  const { arrivalDate, departureDate, quantity, roomName, roomTypeId } =
    reservationStore.bookingInfo;
  const { guestCount, totalPrice, userId } = reservationStore;

  console.log("params", params);
  console.log("reservationStore", reservationStore);
  console.log("loginStore", loginStore);

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
        console.log(res.data.result);
        // formatUserInfo(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState<string[]>([])

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);

    const filteredDistricts = cityListByCounty(selectedValue)
    setDistricts([...filteredDistricts])
  };

  // const getMemberInfo = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/api/v1/order/${params.orderId}`
  //     );

  //     // setOrder(res?.result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // getReservationOrder();
  }, []);

  const roomSettingData = ["市景", "獨立衛浴", "客廳", "書房", "樓層電梯"];
  const roomFacilitiyData = [
    "平面電視",
    "吹風機",
    "冰箱",
    "熱水壺",
    "檯燈",
    "衣櫃",
    "除濕機",
    "浴缸",
    "書桌",
    "音響",
  ];
  const sparePartsData = [
    "衛生紙",
    "拖鞋",
    "沐浴用品",
    "清潔用品",
    "刮鬍刀",
    "吊衣架",
    "浴巾",
    "刷牙用品",
  ];

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
                  <a className="text-primary border-bottom" style={{'cursor': 'pointer'}} onClick={getUserInfo}>套用會員資料</a>
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
                    <select className="form-select me-2" aria-label="city" defaultValue="請選擇縣市" value={selectedCity} onChange={handleCityChange}>
                      { cityList.map((city,index) => {
                        return <option key={index} value={city}>{city}</option>
                      })}
                    </select>
                    <select className="form-select" aria-label="city">
                      <option selected>請選擇區域</option>
                      { districts.map((district,index) => {
                        return <option key={index} value={district}>{district}</option>
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
                  {/* <RoomInfo
                            areaInfo={item.areaInfo}
                            bedInfoType={item.bedInfo.type}
                            minPeople={item.minPeople}
                            maxPeople={item.maxPeople}
                            border={true}
                          /> */}
                </li>

                {/* 房間格局 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">房間格局</h5>
                  </div>
                  <CheckListComponent checkListArr={roomSettingData} />
                </li>

                {/* 房內設備 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">房內設備</h5>
                  </div>
                  <CheckListComponent checkListArr={roomFacilitiyData} />
                </li>

                {/* 備品提供 */}
                <li className="mb-12">
                  <div className="border-5 border-start border-primary mb-8">
                    <h5 className="ms-2">備品提供</h5>
                  </div>
                  <CheckListComponent checkListArr={sparePartsData} />
                </li>
              </ul>
            </div>
            {/* 卡片區 */}
            <div className="col-md-4">
              <div className="card p-10 ms-0 ms-md-8 sticky-top">
                <img
                  src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img-top mb-8"
                />
                <div className="card-bod p-0">
                  <h4 className="card-title mb-8">價格詳情</h4>
                  <ul className="list-unstyled mb-12">
                    <li className="d-flex justify-content-between">
                      <span>
                        NT$ {formatNumberWithCommas(totalPrice)} x {quantity} 晚
                      </span>
                      <span>
                        NT$ {formatNumberWithCommas(totalPrice * quantity)}
                      </span>
                    </li>
                    {/* <li className="d-flex justify-content-between pb-4  border-bottom border-gray">
                      <span>住宿折扣</span>
                      <span className="text-primary">-NT$ 1,000</span>
                    </li> */}
                    <li className="mt-4">
                      <span>總價</span>
                      <span className="">
                        {" "}
                        NT$ {formatNumberWithCommas(totalPrice * quantity)}
                      </span>
                    </li>
                  </ul>
                  <button className="btn btn-primary text-light w-100 mb-0">
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
