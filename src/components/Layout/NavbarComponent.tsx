import { useState, forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogoImg from "../../assets/img/logoWhite.svg";
import { Link } from "react-router-dom";
import useAppleStore from "../../store/appleStore";

export const NavbarComponent = forwardRef<HTMLDivElement>((_, ref) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  const price = useAppleStore((state) => state.price);
  const amount = useAppleStore((state) => state.amount);

  // 設定 Navbar 背景透明
  const [isTransparent, setIsTransparent] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    // 需要透明的路由加在這裏
    if (currentPath === "/roomTypes") {
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
              <Link
                className="px-4 text-light text-decoration-none"
                to="/login"
              >
                會員登入
              </Link>
            </li>
            <li className="me-3">
              <button className="btn btn-primary text-light">立即訂房</button>
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
              <button
                type="button"
                className="bg-dark text-light"
                onClick={() => setShowOffcanvas(false)}
              >
                X
              </button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light text-center text-decoration-none"
                    to="/roomTypes"
                  >
                    客房旅宿
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light text-center text-decoration-none"
                    to="/login"
                  >
                    會員登入
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button className="btn btn-primary w-100">立即訂房</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
