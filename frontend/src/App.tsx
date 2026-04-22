import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { CompanyPage } from "./pages/dashboard/CompanyPage";
import { DashboardHomePage } from "./pages/dashboard/DashboardHomePage";
import { ProductsPage } from "./pages/dashboard/ProductsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CompanyPublicPage } from "./pages/public/CompanyPublicPage";
import { LandingPage } from "./pages/public/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/empresa/:slug" element={<CompanyPublicPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<DashboardHomePage />} />
          <Route path="/app/empresa" element={<CompanyPage />} />
          <Route path="/app/produtos" element={<ProductsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
