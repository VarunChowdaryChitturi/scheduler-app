import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookingPage() {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔥 Backend URL (CHANGE ONLY HERE if needed later)
  const BASE_URL = "https://scheduler-app-yov2.onrender.com";

  // 🔥 Fetch slots
  const fetchSlots = () => {
    console.log("Clicked");
    console.log("Date:", date);

    if (!date) {
      alert("Please select a date first");
      return;
    }

    axios
      .get(`${BASE_URL}/api/bookings/slots?date=${date}&eventId=${id}`)
      .then((res) => {
        console.log("Slots:", res.data);

        if (res.data.length === 0) {
          alert("No slots available for this day");
        }

        setSlots(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching slots");
      });
  };

  // 🔥 Book slot
  const bookSlot = () => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    if (!name || !email) {
      alert("Please enter all details");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email (example: name@gmail.com)");
      return;
    }

    axios
      .post(`${BASE_URL}/api/bookings/create`, {
        event_type_id: id,
        name,
        email,
        booking_date: date,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
      })
      .then(() => {
        alert("Booking confirmed");
      })
      .catch((err) => {
        console.log(err);
        alert("Error booking");
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Schedule Your Meeting</h2>
      <h2>Book Your Slot</h2>

      {/* DATE INPUT */}
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      {/* CHECK SLOTS BUTTON */}
      <button onClick={fetchSlots} style={{ padding: "10px" }}>
        Check Slots
      </button>

      {/* SLOT LIST */}
      <div style={{ marginTop: "20px" }}>
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(slot)}
            style={{
              margin: "5px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {slot.start} - {slot.end}
          </button>
        ))}
      </div>

      {/* BOOKING FORM */}
      {selectedSlot && (
        <div style={{ marginTop: "20px" }}>
          <h3>Enter Details</h3>

          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
            }}
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
            }}
          />

          <button
            onClick={bookSlot}
            style={{
              backgroundColor: "green",
              color: "#fff",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingPage;