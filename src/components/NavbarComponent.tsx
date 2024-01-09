import { useState } from 'react'
import LogoImg from '../assets/img/logoWhite.svg'
import { Link } from 'react-router-dom'

export const NavbarComponent: React.FC = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

    return (
        <nav className="navbar bg-dark px-20 py-6 fixed-top">
        <div className="container-fluid justify-content-between">
          <Link to="/">
            <img src={LogoImg} alt="享樂酒店" />
          </Link>
          {/* 手機版 出現漢堡選單按鈕, md 以上消失 */}
          <button className="navbar-toggler d-block d-md-none" type="button" onClick={handleToggleOffcanvas}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* md 以上出現 */}
          <ul className='d-flex align-items-center d-none d-md-flex list-unstyled'>
            <li className='me-3'>
              <Link className='text-light text-decoration-none' to="/">客房旅宿</Link>
            </li>
            <li className='me-3'>
              <Link className='text-light text-decoration-none' to="/">會員登入</Link>
            </li>
            <li className='me-3'>
              <button className='btn btn-primary text-light'>立即訂房</button>
            </li>
          </ul>

          {/* 手機版 跟漢堡選單按鈕一起出現 */}
        <div className={`offcanvas offcanvas-end w-100 bg-dark ${showOffcanvas ? 'show' : ''}`} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header d-flex justify-content-end">
            <button type="button" className="bg-dark text-light" onClick={() => setShowOffcanvas(false)}>X</button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active text-light text-center" aria-current="page" href="#">客房旅宿</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light text-center" href="#">會員登入</a>
              </li>
              <li className="nav-item dropdown">
                <button className="btn btn-primary w-100">立即訂房</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    )
}