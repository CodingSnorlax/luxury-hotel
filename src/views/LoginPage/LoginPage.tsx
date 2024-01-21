import React from "react";
import { Link } from "react-router-dom"

export const LoginPage: React.FC = () => {
    return (
        <>
            <h1>這是登入頁面</h1>
            <h1>這是登入頁面</h1>
            <h1>這是登入頁面</h1>
            <h1>這是登入頁面</h1>
            <h1>這是登入頁面</h1>
            <h1>這是登入頁面</h1>
            <p>沒有會員嗎？ <Link className="text-primary" to="/signUp">前往註冊</Link></p>
        </>
    )
}