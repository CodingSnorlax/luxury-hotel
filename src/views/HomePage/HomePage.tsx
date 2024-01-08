import React from "react"
import { Link } from "react-router-dom"

export const HomePage: React.FC = () => {
    return (
        <>
        <h1>這是首頁</h1>
        <h1>這是首頁</h1>
        <h1>這是首頁</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, magnam blanditiis labore reprehenderit repellendus porro debitis? Deleniti illum vitae cum sequi obcaecati ratione quia. Animi a ad explicabo illum totam.</p>
        <br />
        <Link to="/login">跳到登入頁</Link>
        </>
    )    
}
