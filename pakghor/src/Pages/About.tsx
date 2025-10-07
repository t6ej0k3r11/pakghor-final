import "../App.css";
import "./About.css";

interface AboutCard {
  title: string;
  description: string;
  icon: string;
}

const About: React.FC = () => {
  const aboutCards: AboutCard[] = [
    {
      title: "Our Mission",
      description:
        "To bring joy to every meal with fresh ingredients, carefully crafted recipes, and exceptional service.",
      icon: "🎯",
    },
    {
      title: "Our Vision",
      description:
        "To become the most loved local food brand that combines taste, quality, and happiness in every bite.",
      icon: "🌟",
    },
    {
      title: "Our Values",
      description:
        "Quality, Passion, Customer Satisfaction, and Continuous Improvement in everything we do.",
      icon: "💛",
    },
  ];

  return (
    <div className="about-wrapper">
      <section className="about-hero">
        <h1 className="about-title">
          About <span>Pakghor</span>
        </h1>
        <p className="about-subtitle">
          We are dedicated to providing delicious food and great service. Our
          passion is to make every meal a memorable experience.
        </p>
      </section>

      <section className="about-grid">
        {aboutCards.map((card, index) => (
          <div key={index} className="about-card">
            <div className="about-icon-wrapper">
              <span className="about-icon">{card.icon}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
