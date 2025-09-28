import React, { useState } from "react";
import "./AddCard.css";

const AddCard: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    image: "",
    indicator: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // await fetch("http://localhost:5000/api/cards", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      await fetch("https://pakghor-final-658f.vercel.app/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Card added successfully!");
      setForm({ title: "", subtitle: "", body: "", image: "", indicator: "" });
    } catch (err) {
      alert("❌ Error adding card");
    }
  };

  return (
    <div className="addcard-container">
      <div className="addcard-box">
        <h2>Add New Card</h2>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />
        <input
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <input
          name="indicator"
          placeholder="Price / Indicator"
          value={form.indicator}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Create Card</button>
      </div>
    </div>
  );
};

export default AddCard;
