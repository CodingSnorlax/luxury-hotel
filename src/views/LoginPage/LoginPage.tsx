import "./LoginPage.scss";
import { Link } from "react-router-dom";
interface Props {
  navbarMargin: {
    marginTop: string;
  };
}
export const LoginPage = ({ navbarMargin }: Props) => {
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
            <h2 className="display-5 mb-4">立即開始旅程</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  電子信箱
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  密碼
                </label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="d-flex justify-content-between mb-10">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberAccount"
                  />
                  <label
                    className="form-check-label fw-bold"
                    htmlFor="rememberAccount"
                  >
                    記住帳號
                  </label>
                </div>
                <Link className="text-primary" to="/">
                  忘記密碼？
                </Link>
              </div>
              <button type="submit" className="btn btn-light w-100 mb-10">
                會員登入
              </button>
              <p className="d-inline me-2">沒有會員嗎？</p>
              <Link className="text-primary" to="/signup">
                前往註冊
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
