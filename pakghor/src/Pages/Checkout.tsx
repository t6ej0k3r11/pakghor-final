import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();

  // Mock cart data (later can come from context or API)
  const cart = [
    { id: 1, name: "Beef Burger", price: 250, qty: 2 },
    { id: 2, name: "Chicken Sandwich", price: 180, qty: 1 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod", // default: Cash on Delivery
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normally send to backend
    console.log("Order placed:", { cart, formData });

    alert("✅ Order placed successfully!");
    navigate("/"); // redirect home
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <section className={styles.checkout}>
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <div className={styles.cart}>
        <h3>Your Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} × {item.qty} — {item.price * item.qty}৳
            </li>
          ))}
        </ul>
        <strong>Total: {total}৳</strong>
      </div>

      {/* Checkout Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Shipping Info</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <h3>Payment</h3>
        <select name="payment" value={formData.payment} onChange={handleChange}>
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>

        <button type="submit">Confirm Order</button>
      </form>
    </section>
  );
};

export default Checkout;
