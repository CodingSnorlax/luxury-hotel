import React, { useEffect, useState } from "react";
import arrowLeft from "../../assets/icon/arrowLeft.svg";
import { CheckListComponent } from "../../components/CheckListComponent";
import axios from "axios";
// import RoomInfo from "../../components/RoomInfo/RoomInfo";
import { useParams } from "react-router-dom";
import useReservationStore from "../../store/ReservationStore";
import useLoginStore from "../../store/LoginStore";

export const ReservationPage: React.FC = () => {
  const params = useParams();
  const reservationStore = useReservationStore((state) => state);
  const loginStore = useLoginStore((state) => state);

  const [order, setOrder] = useState("");

  const getReservationOrder = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/order/${params.orderId}`
      );
      // setOrder(res?.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReservationOrder();
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
            <img src={arrowLeft} alt="" /> 確認訂房資訊
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
                    <p>尊爵雙人房</p>
                  </div>
                  <a className="text-dark">編輯</a>
                </li>
                {/* 訂房日期 */}
                <li className="d-flex justify-content-between align-items-center mb-4">
                  <div className="reservation-info">
                    <div className="border-5 border-start border-primary mb-1">
                      <span className="ms-2">訂房日期</span>
                    </div>
                    <p>
                      入住：{reservationStore.bookingInfo.arrivalDate} 星期二
                    </p>
                    <p>
                      退房：{reservationStore.bookingInfo.arrivalDate} 星期三
                    </p>
                  </div>
                  <a className="text-dark">編輯</a>
                </li>
                {/* 房客人數 */}
                <li className="d-flex justify-content-between align-items-center">
                  <div className="reservation-info">
                    <div className="border-5 border-start border-primary mb-1">
                      <span className="ms-2">房客人數</span>
                    </div>
                    <p>2 人</p>
                  </div>
                  <a className="text-dark">編輯</a>
                </li>
              </ul>
              {/* 訂房人資訊 */}
              <ul className="list-unstyled mb-16 pb-8 border-bottom border-secondary">
                <div className="header-wrap d-flex align-items-center justify-content-between">
                  <h4 className="mb-8">訂房人資訊</h4>
                  <a href="#">套用會員資料</a>
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
                  />
                </li>
                <li>
                  <label htmlFor="address" className="form-label">
                    地址
                  </label>
                  <div className="select-group d-flex mb-2">
                    <select className="form-select me-2" aria-label="city">
                      <option selected>請選擇縣市</option>
                      <option value="taipei">台北市</option>
                      <option value="newTaipei">新北市</option>
                      <option value="kaohsiung">高雄市</option>
                    </select>
                    <select className="form-select" aria-label="city">
                      <option selected>請選擇區域</option>
                      <option value="aa">AA區</option>
                      <option value="bb">BB區</option>
                      <option value="cc">CC區</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    id="detailAddress"
                    placeholder="請輸入詳細地址"
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
                      <span> NT$ 10,000 x 2 晚</span>
                      <span>NT$ 20,000</span>
                    </li>
                    <li className="d-flex justify-content-between pb-4  border-bottom border-gray">
                      <span>住宿折扣</span>
                      <span className="text-primary">-NT$ 1,000</span>
                    </li>
                    <li className="mt-4">
                      <span>總價</span>
                      <span className="">NT$ 19,000</span>
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
