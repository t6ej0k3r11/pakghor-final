import "../App.css";

function Contact() {
  return (
    <div>
      <section
        style={{
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700" }}>Contact Us</h1>
        <p
          style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: "1.6" }}
        >
          Have questions or want to place an order? Send us a message and we'll
          get back to you as soon as possible.
        </p>
      </section>
      <section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#f8f8f8",
          borderRadius: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <form>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="message"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={5}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#ff7e5f",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
