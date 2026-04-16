import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventList from "./pages/EventList";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Router>

      {/* 🔥 NAVBAR */}
      <div style={{
  padding: "12px",
  background: "#000",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between"
}}>

  {/* CUSTOMER SIDE */}
  <div>
    <Link to="/" style={{ marginRight: "15px", color: "#fff" }}>
      Book Meeting
    </Link>
  </div>

  {/* ADMIN SIDE */}
  <div>
    <span style={{ marginRight: "10px", fontWeight: "bold" }}>
      Admin Panel:
    </span>

    <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
      Dashboard
    </Link>

    <Link to="/availability" style={{ color: "#fff" }}>
      Availability
    </Link>
  </div>

</div>
      <div style={{ padding: "10px", background: "#000", color: "#fff" }}>
        <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>Dashboard</Link>
        <Link to="/availability" style={{ marginRight: "10px", color: "#fff" }}>Availability</Link>
      </div>

      {/* ✅ ALL ROUTES MUST BE INSIDE THIS */}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>

    </Router>
  );
}

export default App;