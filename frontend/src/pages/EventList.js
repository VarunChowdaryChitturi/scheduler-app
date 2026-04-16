import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://scheduler-app-yov2.onrender.com")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

return (
  <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <h2>Book a Meeting</h2>
    <h2 style={{ marginBottom: "20px" }}>Event Types</h2>
  
    {events.map(event => (
      <div 
        key={event.id} 
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "15px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <h3>{event.title}</h3>
        <p style={{ color: "#555" }}>{event.description}</p>

        <button 
          onClick={() => navigate(`/book/${event.id}`)}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Book Now
        </button>
      </div>
    ))}
  </div>
);
}

export default EventList;