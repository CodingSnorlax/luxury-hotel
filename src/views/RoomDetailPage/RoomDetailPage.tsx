import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom"

export const RoomDetailPage: React.FC = () => {
    const routerParams = useParams();
    let navigate = useNavigate();
    console.log(routerParams.roomTypeId)

    return (
        <>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            <h1>這是房型詳細頁面 {routerParams.roomTypeId}</h1>
            {/* 點選按鈕 發 request 到後端，跳轉到預定房型頁面 */}
            <button className="btn btn-primary" onClick={() => navigate("/reservation")}>確認訂房</button>
        </>
    )
}