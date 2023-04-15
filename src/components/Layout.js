import React from "react"
import logo from "../assets/logo.png"
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGithub
} from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const redirectTo = (to) => {
    navigate(to)
  }
  return (
    <div className="layout-container">
      <div className="navbar-container">
        <img src={logo} alt="Logo" height={60} width={120} onClick={()=> navigate('/')} />
        <div className="navbar-list-container">
          <p onClick={()=> navigate('/')} >Home</p>
          <p>About</p>
        </div>
        <div>
          <AiOutlineUser size={25} className="navbar-icons" />
          <AiOutlineShoppingCart
            size={25}
            className="navbar-icons"
            onClick={() => redirectTo("/cart")}
          />
        </div>
      </div>
      {children}
      <footer className="footer-container">
        <img src={logo} height={60} width={120} alt="logo" onClick={()=> navigate('/')} />
        <p>Made with 💓 by Prasang</p>
        <div>
          <AiOutlineInstagram color="#fff" size="25px" />
          <AiOutlineFacebook color="#fff" size="25px" />
          <AiOutlineGithub color="#fff" size="25px" />
        </div>
      </footer>
    </div>
  )
}

export default Layout
