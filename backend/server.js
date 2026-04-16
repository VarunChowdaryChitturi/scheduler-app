const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES
const eventRoutes = require("./routes/eventRoutes");

// ✅ CONNECT ROUTES
app.use("/api/events", eventRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
});


const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

const availabilityRoutes = require("./routes/availabilityRoutes");
app.use("/api/availability", availabilityRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});