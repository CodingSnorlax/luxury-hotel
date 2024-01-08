import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { HomePage } from './views/HomePage/HomePage'
import { LoginPage } from './views/LoginPage/LoginPage'
import { NotFoundPage } from './views/NotFoundPage/NotFoundPage'
import { NavbarComponent } from './components/NavbarComponent'
import { FooterComponent } from './components/FooterComponent'

export const App: React.FC = () => {

  return (
    <>
      <div className='App'>
        <NavbarComponent />
          {/* 註冊路由表 */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        <FooterComponent />
      </div>
    </>
  )
}


