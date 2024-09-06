import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LinkPage from "./pages/LinkPage";
import FavoritePage from "./pages/FavoritePage";
import ModalSamplePage from "./pages/ModalSamplePage";
import { FullLayout, LandingLayout } from "./components/layout/Layout";
function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route index element={<HomePage />} />
            <Route path="link" element={<LinkPage />} />
            <Route path="favorite" element={<FavoritePage />} />
            <Route path="modal" element={<ModalSamplePage />} />
          </Route>
          <Route element={<FullLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
