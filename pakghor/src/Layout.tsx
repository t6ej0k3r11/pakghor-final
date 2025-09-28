import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // 👈 import the footer
import { Outlet } from "react-router-dom";
import imagePath from "./assets/logo.png";

export function Layout() {
  const items = ["Home", "About", "Services", "Contact"];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar brandName="Pakghor" logoSrc={imagePath} navItems={items} />

      <main className="container mt-4 flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
