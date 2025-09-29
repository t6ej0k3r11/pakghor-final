import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./Checkout.module.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Beef Burger", price: 250, qty: 2 },
    { id: 2, name: "Chicken Sandwich", price: 180, qty: 1 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Increase quantity
  const increaseQty = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCart(updatedCart);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order placed:", { cart, formData });
    alert("✅ Order placed successfully!");
    navigate("/");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <section className={styles.checkoutWrapper}>
      <h2 className={styles.pageTitle}>Checkout</h2>

      {/* Cart Summary */}
      <div className={styles.cart}>
        <h3>Your Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <span>{item.name}</span>
              <div className={styles.qtyControl}>
                <button
                  type="button"
                  onClick={() => decreaseQty(item.id)}
                  className={styles.qtyBtn}
                >
                  -
                </button>
                <span className={styles.qtyNumber}>{item.qty}</span>
                <button
                  type="button"
                  onClick={() => increaseQty(item.id)}
                  className={styles.qtyBtn}
                >
                  +
                </button>
              </div>
              <span>{item.price * item.qty}৳</span>
            </li>
          ))}
        </ul>
        <strong>Total: {total}৳</strong>
      </div>

      {/* Checkout Form */}
      <div className={styles.formWrapper}>
        <h3>Shipping Information</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
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

          <h3>Payment Method</h3>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>

          <Button text="Confirm Order" type="primary" filled={true} to="#" />
        </form>
      </div>
    </section>
  );
};

export default Checkout;
