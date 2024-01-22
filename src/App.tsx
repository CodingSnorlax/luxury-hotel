import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage/HomePage";
import { LoginPage } from "./views/LoginPage/LoginPage";
import { SignUpPage } from "./views/SignUpPage/SignUpPage";
import { RoomTypePage } from "./views/RoomTypePage/RoomTypePage";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPage";
import { NavbarComponent } from "./components/NavbarComponent";
import { FooterComponent } from "./components/FooterComponent";

export const App: React.FC = () => {
  const [navbarMargin, setNavbarMargin] = useState({
    marginTop: "",
  });
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setNavbarMargin({
      marginTop: `${navbarRef.current?.clientHeight}px`,
    });
  }, [navbarRef]);
  return (
    <>
      <div className="App">
        <NavbarComponent ref={navbarRef} />
        {/* 註冊路由表 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage navbarMargin={navbarMargin} />}
          />
          <Route
            path="/signUp"
            element={<SignUpPage navbarMargin={navbarMargin} />}
          />
          <Route path="/roomType" element={<RoomTypePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FooterComponent />
      </div>
    </>
  );
};
