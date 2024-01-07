import React from "react"
import { Link } from "react-router-dom"

export const HomePage: React.FC = () => {
    return (
        <>
        <h1>這是首頁</h1>
        <br />
        <Link to="/login">跳到登入頁</Link>
        </>
    )    
}
