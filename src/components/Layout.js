import React from "react"

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        Navbar
      </div>
      {children}
      <footer className="footer-container">
        <div>
            logo
        </div>
        <h5>Made by Prasang</h5>
        <div>
            Socials
        </div>
      </footer>
    </div>
  )
}

export default Layout
