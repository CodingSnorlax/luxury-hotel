import "./UserPage.scss";
import { useEffect, useState } from "react";
import UpdatePWForm from "../../components/UpdatePWForm";
import UpdateUserForm from "../../components/UpdateUserForm";
import {
  apiGetUser,
  apiGetUserOrder,
  apiDeleteUser,
} from "../../apis/userApis";
import { IUser } from "../../interface/User";
import { dateDiff, formatDate } from "../../units/time";

export const UserPage: React.FC = () => {
  const [resetPW, setResetPW] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [recentOrder, setRecentOrder] = useState();
  const [recentOrderBookingInfo, setRecentOrderBookingInfo] = useState();
  const [historyOrder, setHistoryOrder] = useState();

  const getUser = async () => {
    const res = await apiGetUser();
    if (res && res.status) {
      setUser(res.data.result);
    }
  };
  const getUserOrder = async () => {
    const res = await apiGetUserOrder();
    res.data.result.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (res && res.status) {
      const recentOrderResult = res.data.result.filter(
        (order: any) => order.status === 0 && order.isPay === false
      );
      setRecentOrder(recentOrderResult[0]);
      if (recentOrderResult[0]) {
        const { bookingInfo } = recentOrderResult[0];
        bookingInfo.sort((a: any, b: any) => {
          return (
            new Date(a.arrivalDate).getTime() -
            new Date(b.arrivalDate).getTime()
          );
        });
        setRecentOrderBookingInfo(bookingInfo[0]);
      }
      const historyOrder = res.data.result.filter(
        (order: any) => order.status === 1 && order.isPay === true
      );
      setHistoryOrder(historyOrder);
    }
  };

  const cancelOrder = async (orderId: string) => {
    const res = await apiDeleteUser(orderId);
    if (res && res.status) {
      getUserOrder();
    }
  };

  useEffect(() => {
    getUser();
    getUserOrder();
  }, []);

  useEffect(() => {
    // console.log(recentOrder);
    console.log(historyOrder);
  }, [historyOrder]);
  return (
    <div>
      {/* banner */}
      <figure className="banner__editUser d-flex align-items-center pt-30">
        <div className="container">
          <p className="fs-1">Hello{user?.name ? `，${user.name}` : ""}</p>
        </div>
      </figure>
      <div className="container">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              個人資料
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              我的訂單
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="d-flex row">
              <div className="col-sm-12 col-md-5 p-10">
                <p className="fs-4 mb-10">修改密碼</p>
                <div className="mb-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    電子信箱
                  </label>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <label htmlFor="PW" className="form-label">
                    密碼
                  </label>
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="password"
                      value="xxxxxxxx"
                      className="form-control bg-white border-0 ps-0 w-50"
                      id="PW"
                      disabled
                    />
                    <input
                      type="button"
                      value="重設"
                      onClick={() => setResetPW(!resetPW)}
                      className="btn btn-sm btn-outline-secondary border"
                    />
                  </div>
                  {/* 更新密碼表單 */}
                  {/* resetPW === true 顯示 Form  */}
                  {resetPW && <UpdatePWForm />}
                </div>
              </div>
              <div className="col-sm-12 col-md-7 p-10">
                <p className="fs-4 mb-10">基本資料</p>
                <UpdateUserForm />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="d-flex row">
              {/* 即將來的行程 */}
              <div className="col-sm-12 col-md-7 p-10">
                {/* recentOrder length 為 0  */}
                {!recentOrder && <p>您還沒有預約行程喔～</p>}
                {recentOrder && (
                  <div>
                    <span className="mb-4">
                      預訂參考編號： {recentOrder?.merchantOrderNo}
                    </span>
                    <p className="fs-4 mb-10">即將來的行程</p>
                    <img
                      className="img-fluid w-100 mb-10 rounded"
                      style={{ height: "434px", objectFit: "cover" }}
                      src={recentOrderBookingInfo?.roomTypeId.imageUrl}
                    ></img>
                    <p className="fs-5 mb-6">
                      {recentOrderBookingInfo?.roomTypeId.name}，
                      {dateDiff(
                        recentOrderBookingInfo?.departureDate,
                        recentOrderBookingInfo?.arrivalDate
                      )}{" "}
                      晚 | 住宿人數：
                      {recentOrder?.guestCount} 位
                    </p>
                    <p className="quote quote-primary mb-2">
                      入住：{formatDate(recentOrderBookingInfo?.arrivalDate)}
                      ，15:00 可入住
                    </p>
                    <p className="quote quote-secondary mb-6">
                      退房：{formatDate(recentOrderBookingInfo?.departureDate)}
                      ，12:00 前退房
                    </p>
                    <p>NT$ {recentOrderBookingInfo?.roomTypeId.price}</p>
                    <hr className="my-10" />
                    <p className="quote mb-6">房內設備</p>
                    <ul className="list-unstyled grid p-6 border border-gray rounded">
                      {recentOrderBookingInfo?.roomTypeId.facilityInfo.map(
                        (layout: any) => {
                          return (
                            layout.isProvide && (
                              <li
                                key={layout.title}
                                className="g-col-2 d-flex align-items-center"
                              >
                                <img
                                  className="me-2 block"
                                  src="../../src/assets/icon/check.svg"
                                ></img>
                                <span className="text-nowrap">
                                  {layout.title}
                                </span>
                              </li>
                            )
                          );
                        }
                      )}
                    </ul>
                    <p className="quote mb-6">備品提供</p>
                    <ul className="list-unstyled grid p-6 border border-gray rounded">
                      {recentOrderBookingInfo?.roomTypeId.amenityInfo.map(
                        (layout: any) => {
                          return (
                            layout.isProvide && (
                              <li
                                key={layout.title}
                                className="g-col-2 d-flex align-items-center"
                              >
                                <img
                                  className="me-2 block"
                                  src="../../src/assets/icon/check.svg"
                                ></img>
                                <span className="text-nowrap">
                                  {layout.title}
                                </span>
                              </li>
                            )
                          );
                        }
                      )}
                    </ul>
                    <div className="d-flex justify-content-between">
                      <input
                        type="button"
                        value="取消預訂"
                        className="btn btn-outline-primary w-100 me-4 border border-primary"
                        onClick={() => cancelOrder(recentOrder._id)}
                      />
                      <input
                        type="button"
                        value="查看詳情"
                        className="btn btn-primary text-light w-100"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* 歷史訂單 */}
              <div className="col-sm-12 col-md-5 p-10">
                <p className="fs-4 mb-10">歷史訂單</p>
                <div className="row">
                  {historyOrder?.map((order: any) => {
                    return (
                      <div className="col-12 mb-10 pb-10" key={order._id}>
                        <div className="d-flex justify-content-between">
                          <img
                            className="rounded-2"
                            style={{ height: "80px" }}
                            src={order?.bookingInfo[0]?.roomTypeId?.imageUrl}
                          ></img>
                          <div>
                            <p className="mb-4">
                              預訂參考編號： {order?.merchantOrderNo}
                            </p>
                            <p className="fs-5 mb-4">
                              {order?.bookingInfo[0]?.roomTypeId?.name}
                            </p>
                            <p className="mb-2">
                              住宿天數：
                              {dateDiff(
                                order?.bookingInfo[0]?.departureDate,
                                order?.bookingInfo[0]?.arrivalDate
                              )}{" "}
                              晚
                            </p>
                            <p className="mb-4">
                              住宿人數：{order.guestCount} 位
                            </p>
                            <p className="quote quote-primary mb-2">
                              入住：
                              {formatDate(order?.bookingInfo[0]?.arrivalDate)}
                            </p>
                            <p className="quote quote-secondary mb-4">
                              退房：
                              {formatDate(order?.bookingInfo[0]?.departureDate)}
                            </p>
                            <p>NT$ {order.totalPrice}</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
                {/* <input
                  type="button"
                  value="查看更多"
                  className="btn btn-outline-primary w-100"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
