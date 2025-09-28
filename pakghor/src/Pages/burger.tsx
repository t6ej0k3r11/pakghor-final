import "../App.css";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import burgerImage from "../assets/burger.jpg";
function Burger() {
  return (
    <div>
      <section
        className="card-details-container"
        style={{
          padding: "2rem",
          maxWidth: "600px",
          margin: "2rem auto",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>Juicy Burger</h1>
        <h4 style={{ color: "#666" }}>Taste in every bite</h4>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#ffea5f",
            padding: "0.3rem 0.8rem",
            borderRadius: "0.5rem",
            margin: "0.5rem 0",
            fontWeight: "600",
          }}
        >
          Upcoming
        </span>
        <small
          style={{ display: "block", marginBottom: "1rem", color: "#ff7e5f" }}
        >
          150 bdt
        </small>
        <img
          src={burgerImage}
          style={{ width: "100%", borderRadius: "1rem", margin: "1rem 0" }}
        />
        <p style={{ lineHeight: "1.6", marginBottom: "1.5rem" }}>
          Delicious and mouth-watering burger made with fresh ingredients.
        </p>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#ff7e5f",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: "0 auto",
          }}
        >
          <PaperAirplaneIcon style={{ width: "20px", height: "20px" }} />
          Order Now
        </button>
      </section>
    </div>
  );
}

export default Burger;
