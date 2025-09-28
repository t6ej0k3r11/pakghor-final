import "../App.css";

function About() {
  return (
    <div>
      <main
        className="page-container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h1>About Us</h1>
        <p
          style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: "1.6" }}
        >
          Welcome to Pakghor! We are dedicated to providing delicious food and
          great service. Our passion is to make every meal a memorable
          experience.
        </p>
        <p
          style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: "1.6" }}
        >
          Explore our menu, enjoy our specialties, and let us make your day a
          little brighter with tasty bites.
        </p>
      </main>
    </div>
  );
}

export default About;
