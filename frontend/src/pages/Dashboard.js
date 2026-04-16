import { useEffect, useState } from "react";
import axios from "axios";
function Dashboard() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  const fetchBookings = () => {
    axios.get("http://localhost:5000/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking
  const cancelBooking = (id) => {
    axios.delete(`http://localhost:5000/api/bookings/delete/${id}`)
      .then(() => {
        alert("Cancelled");
        fetchBookings();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {bookings.map(b => (
        <div key={b.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <p><b>{b.name}</b> ({b.email})</p>
          <p>{b.booking_date} | {b.start_time} - {b.end_time}</p>

          <button onClick={() => cancelBooking(b.id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;