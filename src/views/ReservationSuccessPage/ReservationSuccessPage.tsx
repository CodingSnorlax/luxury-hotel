import React from "react";
import { Link } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";
import useReservationSuccessStore from "../../store/ReservationSuccessStore";
// tools
import { formatDate } from "../../units/time";
import { formatNumberWithCommas } from "../../units/format";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";

export const ReservationSuccessPage: React.FC = () => {
  const successData = useReservationSuccessStore((state) =>
    state.getReservationSuccessData()
  );

  //客戶資訊
  const { customerName, cellPhoneNumber, email } = successData.customerInfo;

  //訂房資訊
  const {
    imgUrl,
    roomName,
    bookingDays,
    guestCount,
    arrivalDate,
    departureDate,
    totalPrice,
  } = successData.bookingInfo;

  //房間資訊
  const { facility, amenity } = successData.roomInfo;

  return (
    <div className="bg-dark pt-30">
      <div className="container text-light mt-20">
        <div className="row">
          <div className="col-md-7">
            {/* 成功通知區 */}
            <div className="success-msg-area pb-16 border-bottom border-light">
              <div className="d-flex align-items-center mb-8">
                <div className="success-icon me-6">
                  <Iconify
                    icon="clarity:success-standard-line"
                    className="fs-1 text-success"
                  />
                </div>
                <h3>
                  恭喜，{customerName}！
                  <br />
                  您已預訂成功
                </h3>
              </div>
              <p>
                我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
              </p>
            </div>
            {/* 查看訂單區 */}
            <div className="check-order-area py-16 border-bottom border-light">
              <h4 className="mb-8">立即查看您的訂單紀錄</h4>

              <Link className="btn btn-primary text-light px-12" to={"/user"}>
                前往我的訂單
              </Link>
            </div>
            {/* 訂房人資訊 */}
            <div className="customer-info-area py-16">
              <ul className="ps-0">
                <li className="list-unstyled mb-8">
                  <h4>訂房人資訊</h4>
                </li>
                <li className="list-unstyled mb-4">
                  <p>姓名</p>
                  <p>{customerName}</p>
                </li>
                <li className="list-unstyled mb-4">
                  <p>手機號碼</p>
                  <p>{cellPhoneNumber}</p>
                </li>
                <li className="list-unstyled mb-4">
                  <p>電子信箱</p>
                  <p>{email}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-5">
            {/* 房間資訊卡片 */}
            <div className="me-md-12 me-none card p-8">
              <p className="text-gray mb-4">
                預訂參考編號： {successData.orderId}
              </p>
              <h3 className="mb-8">即將來的行程</h3>
              <img className="mb-8" src={imgUrl} alt="" />
              <h6 className="mb-8">
                {roomName}，{bookingDays} 晚 | 住宿人數：{guestCount} 位
              </h6>
              <ul className="ps-0 mb-16">
                <li className="list-unstyled mb-2">
                  入住：{arrivalDate ? formatDate(arrivalDate) : ""}，15:00
                  可入住
                </li>
                <li className="list-unstyled mb-4">
                  退房：{departureDate ? formatDate(departureDate) : ""}，12:00
                  前退房
                </li>
                <li className="list-unstyled">
                  NT$ {formatNumberWithCommas(totalPrice)}
                </li>
              </ul>
              <div className="room-facility mb-16">
                <div className="border-5 border-start border-primary mb-8">
                  <h5 className="ms-2">房內設施</h5>
                </div>
                <div className="facility-card border border-gray p-2">
                  <ul className="list-unstyled bg-light rounded p-6 pb-4 row g-0">
                    {facility.map((item, index) => (
                      <li className="col-4 mb-2" key={index}>
                        <div className="d-flex align-items-center">
                          <Icon
                            path={mdiCheck}
                            size={1}
                            className="text-primary me-2"
                          />
                          <span>{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="spare-parts">
                <div className="border-5 border-start border-primary mb-8">
                  <h5 className="ms-2">備品提供</h5>
                </div>
                <div className="facility-card border border-gray p-2">
                  <ul className="list-unstyled bg-light rounded p-6 pb-4 row g-0">
                    {amenity.map((item, index) => (
                      <li className="col-4 mb-2" key={index}>
                        <div className="d-flex align-items-center">
                          <Icon
                            path={mdiCheck}
                            size={1}
                            className="text-primary me-2"
                          />
                          <span>{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
