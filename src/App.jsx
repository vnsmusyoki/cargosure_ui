
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/auth/Login";
import ForgotPassword from "@/auth/ForgotPassword";
import SetNewPassword from "@/auth/SetNewPassword";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";
import DriversManagement from "@/pages/company/drivers/DriversManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/Auth routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-new-password" element={<SetNewPassword />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Protected routes with AppLayout */}
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="drivers" element={<DriversManagement />} />
          {/* Add more protected routes here, e.g. customers, orders, analytics, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
