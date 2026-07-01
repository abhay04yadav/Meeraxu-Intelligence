import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles";
import { Navbar } from "./components/Navbar";
import Home from "./pages/HomeV2";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { ProjectDetail } from "./pages/ProjectDetail";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminServices from "./admin/pages/Services";
import AdminProjects from "./admin/pages/Projects";
import AdminContactForms from "./admin/pages/ContactForms";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="scan-line" />
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <PublicLayout>
              <ProjectDetail />
            </PublicLayout>
          }
        />

        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="contact-forms" element={<AdminContactForms />} />
          </Route>
        </Route>
        <Route
          path="/superadmin"
          element={<Navigate to="/admin/login" replace />}
        />
        <Route
          path="/superadmin/login"
          element={<Navigate to="/admin/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
