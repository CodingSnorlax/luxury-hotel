import React, { useState } from "react";
import { CheckListComponent } from "../../components/CheckListComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon as Iconify } from "@iconify/react";

export const ReservationSuccessPage: React.FC = () => {
  const [facilityArr, setFacilityArr] = useState(["吹風機", "吸塵器"]);
  const [sparePartsArr, setSparePartsArr] = useState(["吹風機", "吸塵器"]);
  return (
    <div className="bg-dark pt-30">
      <div className="container text-light mt-20">
        <div className="row">
          <div className="col-7">
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
                  恭喜，AA(api 人名)！
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
                  <p>Jessica Ｗang</p>
                </li>
                <li className="list-unstyled mb-4">
                  <p>手機號碼</p>
                  <p>+886 912 345 678</p>
                </li>
                <li className="list-unstyled mb-4">
                  <p>電子信箱</p>
                  <p>jessica@sample.com</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-5">
            {/* 房間資訊卡片 */}
            <div className="me-md-12 me-none card p-8">
              <p className="text-gray mb-4">預訂參考編號： HH2302183151222</p>
              <h3 className="mb-8">即將來的行程</h3>
              <img className="mb-8" src="..." alt="" />
              <h6 className="mb-8">尊爵雙人房，1 晚 | 住宿人數：2 位</h6>
              <ul className="ps-0 mb-16">
                <li className="list-unstyled mb-2">
                  入住：6 月 10 日星期二，15:00 可入住
                </li>
                <li className="list-unstyled mb-4">
                  退房：6 月 11 日星期三，12:00 前退房
                </li>
                <li className="list-unstyled">NT$ 10,000</li>
              </ul>
              <div className="room-facility mb-16">
                <div className="border-5 border-start border-primary mb-8">
                  <h5 className="ms-2">房內設施</h5>
                </div>
                <div className="facility-card border border-gray p-2">
                  <CheckListComponent checkListArr={facilityArr} />
                </div>
              </div>
              <div className="spare-parts">
                <div className="border-5 border-start border-primary mb-8">
                  <h5 className="ms-2">備品提供</h5>
                </div>
                <div className="facility-card border border-gray p-2">
                  <CheckListComponent checkListArr={sparePartsArr} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
