import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage/HomePage";
import { LoginPage } from "./views/LoginPage/LoginPage";
import { UserPage } from "./views/UserPage/UserPage";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPage";
import { NavbarComponent } from "./components/Layout/NavbarComponent";
import { FooterComponent } from "./components/Layout/FooterComponent";

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
            path="login"
            element={<LoginPage navbarMargin={navbarMargin} />}
          />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FooterComponent />
      </div>
    </>
  );
};
