import express from "express";
import Card from "../models/Card.js";

const router = express.Router();

router.post("/cards", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json(
      cards.map((card) => ({
        ...card.toObject(),
        image: `${baseUrl}/api/images/${card._id}`,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json({
      ...card.toObject(),
      image: `${baseUrl}/api/images/${card._id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    const imageBuffer = Buffer.from(card.image.split(",")[1], "base64");
    res.set("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/cards/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
