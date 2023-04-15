import "./App.css"
// import "./styles/bucket.css"
import "./styles/card.css"
import "./styles/footer.css"
import "./styles/home.css"
import "./styles/cartScreen.css"
import { Routes, Route } from "react-router-dom"
import Home from "./screens/Home"
import Cart from "./screens/Cart"
// import History from "./screens/History"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/history" element={<History />} /> */}
      </Routes>
    </div>
  )
}

export default App
