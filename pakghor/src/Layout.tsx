import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import imagePath from "./assets/logo.png";

export function Layout() {
  const items = ["Home", "About", "Services", "Contact"];

  return (
    <>
      {/* NavBar always visible */}
      <NavBar brandName="Pakghor" logoSrc={imagePath} navItems={items} />

      {/* Child routes render here */}
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}
