import { useLocation } from "react-router-dom";

function Confirmation() {
  const { state } = useLocation();

  if (!state) {
    return <h2>No booking data</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Booking Confirmed 🎉</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>
        <p><b>Name:</b> {state.name}</p>
        <p><b>Email:</b> {state.email}</p>
        <p><b>Date:</b> {state.date}</p>
        <p><b>Time:</b> {state.start} - {state.end}</p>
      </div>
    </div>
  );
}

export default Confirmation;