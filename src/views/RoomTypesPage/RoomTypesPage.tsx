import React from "react";
import { Link } from "react-router-dom"

export const RoomTypesPage: React.FC = () => {
    return (
        <>
            <h1>這是客房旅宿頁面</h1>
            <h1>這是客房旅宿頁面</h1>
            <h1>這是客房旅宿頁面</h1>
            <h1>這是客房旅宿頁面</h1>
            <h1>這是客房旅宿頁面</h1>
            <h1>這是客房旅宿頁面</h1>
            <ul>
                <li ><Link to="/roomDetail/A">房型A</Link></li>
                <li ><Link to="/roomDetail/B">房型B</Link></li>
                <li ><Link to="/roomDetail/C">房型C</Link></li>
                <li ><Link to="/roomDetail/D">房型D</Link></li>
            </ul>
        </>
    )
}