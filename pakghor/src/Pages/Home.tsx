import Card from "../components/Card";
import "../App.css";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import burgerImage from "../assets/burger.jpg";
import { useEffect, useState } from "react";
import "./Home.css"; // new CSS file

function Home() {
  const [cards, setCards] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // fetch("http://localhost:5000/api/cards");

    // fetch("https://pakghor-final-658f.vercel.app/api/cards")
    fetch(`${apiUrl}/cards`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Welcome to <span>PakGhor</span>
        </h1>
        <p className="hero-subtitle">
          Fresh, delicious and crafted with love. Explore our latest specials
          and signature dishes.
        </p>
      </section>

      {/* Cards Section */}
      <section className="cards-grid">
        <Card
          body="Flame-grilled beef patty with melted cheddar & mozzarella, fresh veggies, caramelized onion, smoky house sauce, and a garlic-butter brioche bun."
          title="Juicy Burger"
          image={burgerImage}
          badge={{
            text: "Upcoming",
            filled: true,
          }}
          indicator="180tk"
          subtitle="Double cheese • Flame-grilled perfection "
          link="/burger"
          btn={{
            text: "Order Now",
            to: "#",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
          }}
        />

        {cards.map((card, index) => (
          <Card
            key={index}
            body={card.body}
            title={card.title}
            image={card.image}
            badge={card.badge}
            indicator={card.indicator}
            subtitle={card.subtitle}
            link={`/product/${card._id}`}
            btn={{
              text: "Order Now",
              to: `/product/${card._id}`,
              type: "primary",
              filled: true,
              icon: <PaperAirplaneIcon />,
            }}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
