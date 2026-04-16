import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);

  const BASE_URL = "https://scheduler-app-yov2.onrender.com";

  useEffect(() => {
    console.log("NEW BUILD LOADED 🔥");

    axios.get(`${BASE_URL}/api/events`)
      .then(res => {
        console.log("API Response:", res.data);

        // 🔥 ALWAYS FORCE ARRAY (THIS IS KEY FIX)
        const data = Array.isArray(res.data) ? res.data : [];

        setEvents(data);
      })
      .catch(err => {
        console.log("API ERROR:", err);
        setEvents([]);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Event Types</h2>

      {/* 🔥 SAFE CHECK (NO CRASH EVER) */}
      {!Array.isArray(events) || events.length === 0 ? (
        <p>No events available</p>
      ) : (
        events.map(event => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0"
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>

            <Link to={`/book/${event.id}`}>
              <button>Book Now</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;