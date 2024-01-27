import "./UserPage.scss";
import { useEffect, useState } from "react";
import UpdatePWForm from "../../components/UpdatePWForm";
import UpdateUserForm from "../../components/UpdateUserForm";
import { apiGetUser } from "../../apis/userApis";
import { IUser } from "../../interface/User";

export const UserPage: React.FC = () => {
  const [resetPW, setResetPW] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const getUser = async () => {
      const res = await apiGetUser();
      if (res && res.status) {
        setUser(res.data.result);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      {/* banner */}
      <figure className="banner figure">
        <div className="container d-flex align-items-center h-100">
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
                <p className="mb-10">修改密碼</p>
                <div className="mb-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    電子信箱
                  </label>
                  <p>ex@example.com</p>
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
                <p>基本資料</p>
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
              <div className="col-sm-12 col-md-7 p-10">
                <span>預訂參考編號： HH2302183151222</span>
                <p className="mb-10">即將來的行程</p>
                <img
                  className="img-fluid w-100 mb-10"
                  style={{ height: "434px", objectFit: "cover" }}
                  src="https://fakeimg.pl/250x434/"
                ></img>
                <p className="mb-6">尊爵雙人房，1 晚 | 住宿人數：2 位</p>
                <p className="mb-2">| 入住：6 月 10 日星期二，15:00 可入住</p>
                <p className="mb-6">| 退房：6 月 11 日星期三，12:00 前退房</p>
                <p>NT$ 10,000</p>
                <hr className="my-10" />
                <p className="mb-6">| 房內設備</p>
                <p className="mb-6">| 備品提供</p>
                <div className="d-flex justify-content-between">
                  <input
                    type="button"
                    value="取消預訂"
                    className="btn btn-outline-primary w-100 me-4 border border-primary"
                  />
                  <input
                    type="button"
                    value="查看詳情"
                    className="btn btn-primary w-100"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-5 p-10">
                <p className="mb-10">歷史訂單</p>
                <div className="row">
                  <div className="col-12 mb-10 pb-10">
                    <div className="d-flex justify-content-between">
                      <img
                        className="rounded-2 h-100"
                        src="https://fakeimg.pl/120x80/"
                      ></img>
                      <div>
                        <span className="mb-4">
                          預訂參考編號： HH2302183151222
                        </span>
                        <p className="mb-4">尊爵雙人房</p>
                        <p className="mb-2">住宿天數： 1 晚</p>
                        <p className="mb-4">住宿人數： 2 位</p>
                        <p className="mb-2">| 入住：6 月 10 日星期二</p>
                        <p className="mb-4">| 退房：6 月 11 日星期三</p>
                        <p>NT$10,000</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                <input
                  type="button"
                  value="查看更多"
                  className="btn btn-outline-primary w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
