import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./Checkout.module.css";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order placed:", { cart, formData });
    alert("✅ Order placed successfully!");
    navigate("/");
  };

  return (
    <section className={styles.checkoutWrapper}>
      <h2 className={styles.pageTitle}>Checkout</h2>

      <div className={styles.checkoutContainer}>
        {/* Cart Summary */}
        <div className={styles.cart}>
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty 😔</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>
                      {item.price * item.qty}৳
                    </span>
                  </div>
                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      type="button"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className={styles.qtyNumber}>{item.qty}</span>
                    <button
                      className={styles.qtyBtn}
                      type="button"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                    <button
                      className={styles.removeBtn}
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.totalWrapper}>
            <strong className={styles.total}>Total: {total}৳</strong>
          </div>
        </div>

        {/* Shipping & Payment Form */}
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

            <Button text="Confirm Order" type="primary" filled to="#" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
