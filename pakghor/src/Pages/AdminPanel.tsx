import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

const AdminPanel: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    image: "",
    indicator: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/api/cards");
    const data = await res.json();
    setCards(data);
  };

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/cards/${editingId}`
      : "http://localhost:5000/api/cards";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", subtitle: "", body: "", image: "", indicator: "" });
    setEditingId(null);
    fetchCards();
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/cards/${id}`, { method: "DELETE" });
    setCards(cards.filter((c) => c._id !== id));
  };

  const handleEdit = (card: any) => {
    setForm(card);
    setEditingId(card._id);
  };

  return (
    <div className="admin-panel-wrapper">
      <h1 className="admin-panel-title">🛠 Admin Panel</h1>

      {/* Card Preview */}
      {form.title || form.subtitle || form.body ? (
        <section className="admin-section preview-section">
          <h2 className="section-title">Live Preview</h2>
          <div className="card-preview">
            {form.image && (
              <img src={form.image} alt={form.title} className="preview-img" />
            )}
            <div className="preview-text">
              <h3>{form.title || "Title"}</h3>
              {form.subtitle && <small>{form.subtitle}</small>}
              <p>{form.body || "Card description will appear here."}</p>
              {form.indicator && (
                <span className="preview-indicator">{form.indicator}</span>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Add / Update Card Section */}
      <section className="admin-section">
        <h2 className="section-title">
          {editingId ? "Update Card" : "Add New Card"}
        </h2>
        <div className="admin-form">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
          <textarea
            placeholder="Body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            placeholder="Price / Indicator"
            value={form.indicator}
            onChange={(e) => setForm({ ...form, indicator: e.target.value })}
          />
          <button className="submit-btn" onClick={handleSubmit}>
            {editingId ? "Update Card" : "Create Card"}
          </button>
        </div>
      </section>

      {/* Cards Table Section */}
      <section className="admin-section">
        <h2 className="section-title">All Cards</h2>
        <div className="table-wrapper">
          <table className="cards-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card._id}>
                  <td>
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="card-thumb"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{card.title}</td>
                  <td>{card.subtitle}</td>
                  <td>{card.indicator}</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(card)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(card._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
