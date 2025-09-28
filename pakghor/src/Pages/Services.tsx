import "../App.css";

function Services() {
  const services = [
    {
      title: "Home Delivery",
      description:
        "Get your favorite meals delivered to your doorstep quickly.",
      icon: "🚚",
    },
    {
      title: "Dine In",
      description:
        "Enjoy a cozy and comfortable dining experience at our place.",
      icon: "🍽️",
    },
    {
      title: "Catering",
      description: "Professional catering services for parties and events.",
      icon: "🎉",
    },
    {
      title: "Custom Orders",
      description: "We create special dishes as per your taste and preference.",
      icon: "🍔",
    },
  ];

  return (
    <div>
      <section
        style={{
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700" }}>Our Services</h1>
        <p
          style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: "1.6" }}
        >
          Explore the variety of services we offer to make your experience
          delightful.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              backgroundColor: "#f8f8f8",
              borderRadius: "1rem",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.25s, box-shadow 0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-8px)";
              target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              {service.icon}
            </div>
            <h3 style={{ marginBottom: "0.5rem" }}>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
