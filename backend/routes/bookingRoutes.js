const express = require("express");
const router = express.Router();
const db = require("../db");
// GET AVAILABLE SLOTS
router.get("/slots", (req, res) => {
  const { date, eventId } = req.query;

  // Get day name (Monday, etc.)
  const day = new Date(date).toLocaleString("en-US", { weekday: "long" });

  // Step 1: Get availability
  const availQuery = "SELECT * FROM availability WHERE day_of_week = ?";
  
  db.query(availQuery, [day], (err, availability) => {
    if (err) return res.status(500).send(err);
    if (availability.length === 0) return res.json([]);

    const { start_time, end_time } = availability[0];

    // Step 2: Get event duration
    const eventQuery = "SELECT duration FROM event_types WHERE id = ?";
    
    db.query(eventQuery, [eventId], (err, event) => {
      if (err) return res.status(500).send(err);

      const duration = event[0].duration;

      // Step 3: Generate slots
      let slots = [];
      let start = new Date(`${date}T${start_time}`);
      let end = new Date(`${date}T${end_time}`);

      while (start < end) {
        let slotEnd = new Date(start.getTime() + duration * 60000);

        if (slotEnd > end) break;

        slots.push({
          start: start.toTimeString().slice(0, 5),
          end: slotEnd.toTimeString().slice(0, 5),
        });

        start = slotEnd;
      }

      // Step 4: Get booked slots
      const bookingQuery = "SELECT start_time FROM bookings WHERE booking_date = ?";
      
      db.query(bookingQuery, [date], (err, bookings) => {
        if (err) return res.status(500).send(err);

        const bookedTimes = bookings.map(b => b.start_time.slice(0,5));

        // Step 5: Filter available slots
        const availableSlots = slots.filter(slot => !bookedTimes.includes(slot.start));

        res.json(availableSlots);
      });
    });
  });
});


// CREATE BOOKING
router.post("/create", (req, res) => {
  const { event_type_id, name, email, booking_date, start_time, end_time } = req.body;

  // Check if already booked
  const checkQuery = `
    SELECT * FROM bookings 
    WHERE booking_date = ? AND start_time = ?
  `;

  db.query(checkQuery, [booking_date, start_time], (err, existing) => {
    if (err) return res.status(500).send(err);

    if (existing.length > 0) {
      return res.status(400).send("Slot already booked");
    }

    // Insert booking
    const insertQuery = `
      INSERT INTO bookings (event_type_id, name, email, booking_date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [event_type_id, name, email, booking_date, start_time, end_time], (err, result) => {
      if (err) return res.status(500).send(err);

res.send("Booking confirmed");
    });
  });
});
// GET ALL BOOKINGS
router.get("/", (req, res) => {
  const query = "SELECT * FROM bookings ORDER BY booking_date, start_time";

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
// CANCEL BOOKING
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM bookings WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Booking cancelled");
  });
});
module.exports = router;