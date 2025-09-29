import "../App.css";
import "./Services.css";

interface Service {
  title: string;
  description: string;
  icon: string;
}

function Services() {
  const services: Service[] = [
    {
      title: "Home Delivery",
      description:
        "Get your favorite meals delivered to your doorstep quickly and safely.",
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
      description:
        "Professional catering services for birthdays, weddings and corporate events.",
      icon: "🎉",
    },
    {
      title: "Custom Orders",
      description:
        "We create special dishes as per your taste, preference and occasions.",
      icon: "🍔",
    },
  ];

  return (
    <div className="services-wrapper">
      {/* Hero Section */}
      <section className="services-hero">
        <h1 className="services-title">
          Discover <span>Our Services</span>
        </h1>
        <p className="services-subtitle">
          From doorstep delivery to customized meals, we’re here to make every
          food experience memorable.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-wrapper">
              <span className="service-icon">{service.icon}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
