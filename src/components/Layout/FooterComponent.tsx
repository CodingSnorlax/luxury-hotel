// import { useState } from 'react'
import LogoImg from "../../assets/img/logoWhite.svg";
import lineSvg from "../../assets/icon/line.svg";
import InstagramSvg from "../../assets/icon/instagram.svg";
import "./Layout.scss";
// import { Routes, Route, Link } from 'react-router-dom'

export const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-20">
        {/* footer 主要區塊 */}
        <div className="info-wrap d-md-flex justify-content-md-between w-100 mb-20">
          {/* logo 及按鈕區塊 */}
          <div className="logo-area mb-10  mb-md-none">
            <img className="logo mb-8" src={LogoImg} />
            <div className="social-media-button d-flex">
              <div className="circle-10 rounded-circle border border-light d-flex justify-content-center align-items-center me-4">
                <img src={lineSvg} className="" alt="" />
              </div>
              <div className="circle-10 rounded-circle border border-light d-flex justify-content-center align-items-center">
                <img src={InstagramSvg} className="" alt="" />
              </div>
            </div>
          </div>

          {/* 地址 */}
          <div className="tel-info-area d-md-flex">
            <ul className="me-20 list-unstyled">
              <li className="mb-2 mb-md-10">
                <p className="mb-2">TEL</p>
                <p>+886-7-1234567</p>
              </li>
              <li>
                <p className="mb-2 mb-md-none">FAX</p>
                <p>+886-7-1234567</p>
              </li>
            </ul>
            <ul className="me-20 list-unstyled">
              <li className="mb-2 mb-md-10">
                <p className="mb-2">MAIL</p>
                <p>elh@hexschool.com</p>
              </li>
              <li>
                <p className="mb-2 mb-md-none">WEB</p>
                <p>www.elhhexschool.com.tw</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="address-area row justify-content-between">
          <div className="col-md-6">
            <p className="address-info mb-4 mb-md-none">806023 台灣高雄市新興區六角路123號</p>
          </div>
          <div className="col-md-6">
            <p className="copy-right text-start text-md-end">
              © 享樂酒店 2024 All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
