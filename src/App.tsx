import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage/HomePage";
import { LoginPage } from "./views/LoginPage/LoginPage";
import { SignUpPage } from "./views/SignUpPage/SignUpPage";
import { UserPage } from "./views/UserPage/UserPage";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPage";
import { NavbarComponent } from "./components/Layout/NavbarComponent";
import { FooterComponent } from "./components/Layout/FooterComponent";
import { RoomTypesPage } from "./views/RoomTypesPage/RoomTypesPage";
import { RoomDetailPage } from "./views/RoomDetailPage/RoomDetailPage";
import { ReservationPage } from "./views/ReservationPage/ReservationPage";
import { ReservationSuccessPage } from "./views/ReservationSuccessPage/ReservationSuccessPage";
import Toasts from "./components/Toasts";
import useToastStore from "./store/ToastsStore";

export const App: React.FC = () => {
  const [navbarHeight, setnavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setnavbarHeight(navbarRef.current?.clientHeight as number);
  }, [navbarRef]);

  const toastStore = useToastStore((state) => state);
  return (
    <>
      <div className="App">
        <NavbarComponent ref={navbarRef} />
        {/* 註冊路由表 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage navbarHeight={navbarHeight} />}
          />
          <Route
            path="/signUp"
            element={<SignUpPage navbarHeight={navbarHeight} />}
          />
          <Route path="/user" element={<UserPage />} />
          <Route path="/roomTypes" element={<RoomTypesPage />} />
          <Route
            path="/roomDetail/:roomTypeId"
            element={<RoomDetailPage navbarHeight={navbarHeight} />}
          />
          <Route
            path="/reservation/:roomTypeId"
            element={<ReservationPage />}
          />
          <Route path="/success" element={<ReservationSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FooterComponent />
        <Toasts isVisible={toastStore.show} message={toastStore.toastMessage} />
      </div>
    </>
  );
};
