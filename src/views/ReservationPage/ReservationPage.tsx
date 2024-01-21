import React from "react";
import arrowLeft from "../../assets/icon/arrowLeft.svg";

export const ReservationPage: React.FC = () => {
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
            <div className="col-6">
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
                    <p>入住：12 月 4 日星期二</p>
                    <p>退房：12 月 6 日星期三</p>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
