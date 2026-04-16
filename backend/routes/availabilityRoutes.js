const express = require("express");
const router = express.Router();
const db = require("../db");

// SET AVAILABILITY
router.post("/set", (req, res) => {
  const { day_of_week, start_time, end_time, timezone } = req.body;

  const query = `
    INSERT INTO availability (day_of_week, start_time, end_time, timezone)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [day_of_week, start_time, end_time, timezone], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Availability set");
  });
});

// GET AVAILABILITY
router.get("/", (req, res) => {
  const query = "SELECT * FROM availability";

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;