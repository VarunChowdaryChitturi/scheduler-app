import { useState } from "react";
import axios from "axios";
function Availability() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Handle checkbox
  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Save availability
  const saveAvailability = async () => {
    if (selectedDays.length === 0 || !startTime || !endTime) {
      alert("Fill all fields");
      return;
    }

    try {
      for (let day of selectedDays) {
        await axios.post("http://localhost:5000/api/availability/set", {
          day_of_week: day,
          start_time: startTime + ":00",
          end_time: endTime + ":00",
          timezone: timezone
        });
      }

      alert("Availability saved");
    } catch (err) {
      console.log(err);
      alert("Error saving availability");
    }
  };

  return (
    
    <div style={{ padding: "20px" }}>
        <h2>Admin - Set Availability</h2>
      <h2>Set Availability</h2>

      {/* DAYS */}
      <div>
        <h4>Select Days</h4>
        {days.map(day => (
          <label key={day} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              onChange={() => handleDayChange(day)}
            />
            {day}
          </label>
        ))}
      </div>

      {/* TIME */}
      <div style={{ marginTop: "20px" }}>
        <h4>Time Range</h4>

        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
        />
        {"  to  "}
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {/* TIMEZONE */}
      <div style={{ marginTop: "20px" }}>
        <h4>Timezone</h4>

        <select onChange={(e) => setTimezone(e.target.value)}>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>

      {/* SAVE BUTTON */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={saveAvailability}>
          Save Availability
        </button>
      </div>
    </div>
  );
}

export default Availability;