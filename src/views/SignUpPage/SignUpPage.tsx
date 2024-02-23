import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";
import SignUpPWForm from "../../components/SignUpPWForm";
import SignUpUserForm from "../../components/SignUpUserForm";
import { UserData } from "../../interface/Form";
import { useNavigate } from "react-router-dom";
import { zipCodeByCountryAndCity } from "../../units/zipcodes";
import { apiSignup } from "../../apis/userApis";
import LoginBg from "../../assets/img/Login_BG.png";

interface Props {
  navbarHeight: number;
}
export const SignUpPage = ({ navbarHeight }: Props) => {
  // 目前進度
  const [progressNum, setProgressNum] = useState(1);

  // formData
  const [PWData, setPWData] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const navigate = useNavigate();
  const handleComplete = async (userData: UserData) => {
    const { email, password } = PWData;
    const { name, phone, year, month, day, county, city, detail } = userData;
    const data = {
      email,
      password,
      name,
      phone,
      birthday: `${year}-${month}-${day}`,
      address: {
        zipcode: zipCodeByCountryAndCity(county, city) as number,
        detail: `${county}${city}${detail}`,
      },
    };
    try {
      await apiSignup(data);
      navigate("/login");
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="row g-0">
      <div className="col-6 d-none d-lg-block">
        <img className="mainImg w-100 h-100" src={LoginBg} alt="" />
      </div>
      <div
        className="col-12 col-lg-6 bg-dark text-white"
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <div className="bg-line h-100 d-flex justify-content-center align-items-center">
          <div className="content-wrap px-5 px-lg-0">
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
            {progressNum === 1 && (
              <SignUpPWForm
                setPWData={setPWData}
                setProgressNum={setProgressNum}
              />
            )}
            {progressNum === 2 && (
              <SignUpUserForm handleComplete={handleComplete} />
            )}
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
