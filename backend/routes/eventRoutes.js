const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE EVENT
router.post("/create", (req, res) => {
  const { title, description, duration, slug } = req.body;

  const query = "INSERT INTO event_types (title, description, duration, slug) VALUES (?, ?, ?, ?)";

  db.query(query, [title, description, duration, slug], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Event created successfully");
  });
});

// GET ALL EVENTS
router.get("/", (req, res) => {
  const query = "SELECT * FROM event_types";

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// UPDATE EVENT
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, duration, slug } = req.body;

  const query = "UPDATE event_types SET title=?, description=?, duration=?, slug=? WHERE id=?";

  db.query(query, [title, description, duration, slug, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Event updated");
  });
});

// DELETE EVENT
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM event_types WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Event deleted");
  });
});

module.exports = router;