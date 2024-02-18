import "./LoginPage.scss";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { PWData } from "../../interface/Form";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../store/LoginStore";
import useToastStore from "../../store/ToastsStore";
import { apiLogin } from "../../apis/userApis";

interface Props {
  navbarHeight: number;
}
export const LoginPage = ({ navbarHeight }: Props) => {
  const navigate = useNavigate();
  // 取得本頁面所有資料，加入狀態管理層
  const loginStore = useLoginStore((state) => state);
  const toastStore = useToastStore((state) => state);

  const handleLogin = async (PWData: PWData) => {
    try {
      const res = await apiLogin(PWData);
      if (!res) return;
      document.cookie = `token=${res.data.token}`;

      const {
        status,
        token,
        user: { birthday, createdAt, email, name, phone, updatedAt, _id },
      } = res.data;

      if (status) {
        //登入成功就帶資料回去
        loginStore.setLoginData({
          loginStatus: status,
          token: token,
          user: {
            birthday,
            createdAt,
            email,
            name,
            phone,
            updatedAt,
            _id,
          },
        });
        toastStore.setToastData({
          show: true,
          toastMessage: "登入成功",
        });
        //轉回首頁
        navigate("/");
      }
    } catch (err: any) {
      //登入失敗就清空資料
      loginStore.setLoginData({
        loginStatus: null,
        token: "",
        user: {
          birthday: "",
          createdAt: "",
          email: "",
          name: "",
          phone: "",
          updatedAt: "",
          _id: "",
        },
      });
      toastStore.setToastData({
        show: true,
        toastMessage: err.response.data.message,
      });
    }
  };
  return (
    <div className="row g-0">
      <div className="col-6 d-none d-lg-block">
        <img
          className="mainImg w-100 h-100"
          src="/src/assets/img/Login_BG.png"
          alt=""
        />
      </div>
      <div
        className="col-12 col-lg-6 bg-dark text-white"
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <div className="bg-line h-100 d-flex justify-content-center align-items-center">
          <div className="content-wrap px-5 px-lg-0">
            <p className="text-primary fw-bold mb-2">享樂酒店，誠摯歡迎</p>
            <h2 className="display-5 mb-4">立即開始旅程</h2>
            <LoginForm handleLogin={handleLogin} />
            <p className="d-inline me-2">沒有會員嗎？</p>
            <Link className="text-primary" to="/signup">
              前往註冊
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
