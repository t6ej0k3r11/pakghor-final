import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import { Layout } from "./Layout";
import Burger from "./Pages/burger";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AddCard from "./Pages/Addcard";
import AdminPanel from "./Pages/AdminPanel";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/app" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="burger" element={<Burger />} />
            <Route path="addcard" element={<AddCard />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
