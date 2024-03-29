import { useState, forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogoImg from "../../assets/img/logoWhite.svg";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../../store/LoginStore";
import { Icon as Iconify } from "@iconify/react";

export const NavbarComponent = forwardRef<HTMLDivElement>((_, ref) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const navigate = useNavigate();

  // 設定 Navbar 背景透明
  const [isTransparent, setIsTransparent] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    // 需要透明的路由加在這裏
    if (currentPath === "/roomTypes" || currentPath === "/") {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  }, [currentPath]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newOpacity = Math.min(currentScrollY / 300, 1);
      setNavbarOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //直接取目前使用者登入狀態
  const isLogin = useLoginStore((state) => state.getLoginData().loginStatus);
  const userName = useLoginStore((state) => state.getLoginData().user.name);

  //切換到客房旅宿/立即訂房頁面 & 選單關閉
  const switchToRoomDetailPage = () => {
    navigate("/roomTypes");
    handleToggleOffcanvas();
  };

  //切換登入頁面 & 選單關閉
  const switchToLoginPage = () => {
    navigate("/login");
    handleToggleOffcanvas();
  };

  //切換會員頁面 & 選單關閉
  const switchToUserPage = () => {
    navigate("/user");
    handleToggleOffcanvas();
  };

  return (
    <>
      <nav
        className={`navbar py-6 fixed-top`}
        style={{
          backgroundColor: isTransparent
            ? `rgba(0, 0, 0, ${navbarOpacity})`
            : "#000",
        }}
        ref={ref}
      >
        <div className="container justify-content-between">
          <Link to="/">
            <img src={LogoImg} alt="享樂酒店" />
          </Link>
          {/* 手機版 出現漢堡選單按鈕, md 以上消失 */}
          <button
            className="navbar-toggler d-block d-md-none"
            type="button"
            onClick={handleToggleOffcanvas}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* md 以上出現 */}
          <ul className="d-flex align-items-center d-none d-md-flex list-unstyled">
            <li className="me-3">
              <Link
                className="px-4 text-light text-decoration-none"
                to="/roomTypes"
              >
                客房旅宿
              </Link>
            </li>
            <li className="me-3">
              {isLogin ? (
                <Link
                  className="px-4 text-light text-decoration-none"
                  to="/user"
                >
                  <Iconify icon="gg:profile" className="me-2 fs-4 text-light" />
                  {userName}
                </Link>
              ) : (
                <Link
                  className="px-4 text-light text-decoration-none"
                  to="/login"
                >
                  會員登入
                </Link>
              )}
            </li>
            <li className="me-3">
              <Link className="btn btn-primary w-100" to="/roomTypes">
                立即訂房
              </Link>
            </li>
          </ul>

          {/* 手機版 跟漢堡選單按鈕一起出現 */}
          <div
            className={`offcanvas offcanvas-end w-100 bg-dark ${
              showOffcanvas ? "show" : ""
            }`}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header d-flex justify-content-end">
              <Iconify
                icon="maki:cross"
                className="me-2 fs-4 text-light"
                onClick={() => setShowOffcanvas(false)}
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <button
                    className="nav-link active text-light text-center text-decoration-none w-100"
                    onClick={switchToRoomDetailPage}
                  >
                    客房旅宿
                  </button>
                </li>
                <li className="nav-item">
                  {isLogin ? (
                    <button
                      className="px-4 text-light text-decoration-none"
                      onClick={switchToUserPage}
                    >
                      <Iconify
                        icon="gg:profile"
                        className="me-2 fs-4 text-light"
                      />
                      {userName}
                    </button>
                  ) : (
                    <button
                      className="nav-link active text-light text-center text-decoration-none w-100"
                      onClick={switchToLoginPage}
                    >
                      會員登入
                    </button>
                  )}
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link active text-light text-center text-decoration-none w-100"
                    onClick={switchToRoomDetailPage}
                  >
                    立即訂房
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
