import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Login from "@/auth/Login";
import ForgotPassword from "@/auth/ForgotPassword";
import SetNewPassword from "@/auth/SetNewPassword";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="set-new-password" element={<SetNewPassword />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
