import React from "react";
import { Link } from "react-router-dom"

export const LoginPage: React.FC = () => {
    return (
        <>
            <h1>這是登入頁面</h1>
            <Link to="/home">回到首頁</Link>
        </>
    )
}