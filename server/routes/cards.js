const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// CREATE card
router.post("/cards", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all cards
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ single card by id
router.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE card
router.put("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE card
router.delete("/cards/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
