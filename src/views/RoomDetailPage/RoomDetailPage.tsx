import React from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom"

export const RoomDetailPage: React.FC = () => {
    const routerParams = useParams();
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
        </>
    )
}