import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export function LandingLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function FullLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
