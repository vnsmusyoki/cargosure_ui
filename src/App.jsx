
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
import DriverOnboardPage from "@/pages/company/drivers/DriverOnboardPage";
import FleetManagement from "@/pages/company/fleet/FleetManagement";
import LiveTracking from "@/pages/company/tracking/LiveTracking";
import OrderManagement from "@/pages/company/orders/OrderManagement";
import OrderManagementCreate from "@/pages/company/orders/OrderManagementCreate";
import WarehousesManagement from "./pages/company/inventory/warehouses/WareHousesManagement";
import CreateWareHouse from "./pages/company/inventory/warehouses/CreateWareHouse";
import WareHouseView from "./pages/company/inventory/warehouses/WarehouseView";

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
          <Route path="/drivers-management" element={<DriversManagement />} />
          <Route path="/drivers-management/onboard" element={<DriverOnboardPage />} />

          <Route path="/orders-management" element={<OrderManagement />} />
          <Route path="/orders-management/create" element={<OrderManagementCreate />} />

          <Route path="/fleet-management" element={<FleetManagement />} />
          <Route path="/live-tracking" element={<LiveTracking />} />

          <Route path="/inventory/warehouses" element={<WarehousesManagement />} />
          <Route path="/inventory/warehouses/create" element={<CreateWareHouse />} />
          <Route path="/inventory/warehouses/view/:id" element={<WareHouseView />} />

          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
