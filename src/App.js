import "./App.css"
// import "./styles/bucket.css"
// import "./styles/card.css"
import "./styles/footer.css"
import { Routes, Route } from "react-router-dom"
import Home from "./screens/Home"
// import History from "./screens/History"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/history" element={<History />} /> */}
      </Routes>
    </div>
  );
}

export default App;
