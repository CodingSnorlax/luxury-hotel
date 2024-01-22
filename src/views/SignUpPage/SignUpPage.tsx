import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";
interface Props {
  navbarMargin: {
    marginTop: string;
  };
}
export const SignUpPage = ({ navbarMargin }: Props) => {
  // 目前進度
  const [progressNum, setProgressNum] = useState(1);

  // 日期選擇
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");

  const yearOptions = Array.from(
    { length: 100 },
    (_, index) => `${new Date().getFullYear() - index} 年`
  );

  const monthOptions = Array.from(
    { length: 12 },
    (_, index) => `${index + 1} 月`
  );

  const getDaysInMonth = (year: string, month: string) => {
    return new Date(Number(year), Number(month), 0).getDate();
  };
  const dayOptions = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, index) => `${index + 1} 日`
  );

  return (
    <div className="row g-0">
      <div className="col-6">
        <img
          className="mainImg w-100 h-100"
          src="/src/assets/img/Login_BG.png"
          alt=""
        />
      </div>
      <div className="col-6 bg-dark text-white" style={navbarMargin}>
        <div className="bg-line h-100 d-flex justify-content-center align-items-center">
          <div className="content-wrap">
            <p className="text-primary fw-bold mb-2">享樂酒店，誠摯歡迎</p>
            <h2 className="display-5 mb-4">立即註冊</h2>
            <div className="d-flex w-100 justify-content-between py-4 mb-10">
              <div className="d-flex flex-column align-items-center">
                <div className="num-wrap d-flex justify-content-center align-items-center border border-primary rounded-circle bg-primary fw-bold mb-1">
                  1
                </div>
                <p className="text-nowrap fw-bold">輸入信箱及密碼</p>
              </div>
              <div className="d-flex align-items-center w-100">
                <div
                  className={`border-top border-2 border-secondary w-100 mx-2 ${
                    progressNum === 2 ? "border-light" : ""
                  }`}
                ></div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div
                  className={`num-wrap d-flex justify-content-center align-items-center border border-secondary rounded-circle text-secondary fw-bold mb-1 ${
                    progressNum === 2
                      ? "border-primary bg-primary text-white"
                      : ""
                  }`}
                >
                  2
                </div>
                <p
                  className={`text-nowrap text-secondary fw-bold ${
                    progressNum === 2 ? "text-white" : ""
                  }`}
                >
                  填寫基本資料
                </p>
              </div>
            </div>
            <form>
              <div>
                {progressNum === 1 ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        電子信箱
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="hello@exsample.com"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        密碼
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="請輸入密碼"
                      />
                    </div>
                    <div className="mb-10">
                      <label htmlFor="confirmPassword" className="form-label">
                        確認密碼
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="comfirmPassword"
                        placeholder="請再輸入一次密碼"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-light w-100 mb-4"
                      onClick={() => setProgressNum(2)}
                    >
                      下一步
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        姓名
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="請輸入姓名"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="cellphone" className="form-label">
                        手機號碼
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="cellphone"
                        placeholder="請輸入手機號碼"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="birthdayYear" className="form-label">
                        生日
                      </label>
                      <div className="d-flex">
                        <select
                          id="birthdayYear"
                          className="form-select me-2"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {yearOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <select
                          id="birthdayMonth"
                          className="form-select me-2"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {monthOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          id="birthday"
                          className="form-select"
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                        >
                          {dayOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="addressCity" className="form-label">
                        地址
                      </label>
                      <div className="d-flex mb-4">
                        <select
                          className="form-select me-2"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {yearOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <select
                          className="form-select"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {monthOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="請輸入詳細地址"
                      />
                    </div>
                    <div className="mb-10 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isReaded"
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="isReaded"
                      >
                        我已閱讀並同意本網站個資使用規範
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-4"
                    >
                      完成註冊
                    </button>
                  </>
                )}
              </div>
            </form>
            <p className="d-inline me-2">已經有會員了嗎？</p>
            <Link className="text-primary" to="/login">
              立即登入
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
