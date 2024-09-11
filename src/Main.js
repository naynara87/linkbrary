import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import LinkPage from "./pages/Link/LinkPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import { ModalProvider } from "./contexts/ModalProvider"; // Named import
import Modal from "./components/ui/Modal";
import { FullLayout, LandingLayout } from "./components/layout/Layout";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <ModalProvider>
          <Routes>
            <Route element={<LandingLayout />}>
              <Route index element={<HomePage />} />
              <Route path="link" element={<LinkPage />} />
              <Route path="favorite" element={<FavoritePage />} />
            </Route>

            <Route element={<FullLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Routes>
          <Modal />
        </ModalProvider>
      </App>
    </BrowserRouter>
  );
}

export default Main;
