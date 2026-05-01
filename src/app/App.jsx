import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import ProtectedRoute from "@/shared/ProtectedRoute";
import RoleGuard from "@/shared/RoleGuard";
import { ROLES } from "@/constants/roles";

import HomePage from "../pages/HomePage";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/authLayout";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/features/auth/Login";
import ForgotPassword from "@/features/auth/ForgotPassword";
import SetNewPassword from "@/features/auth/SetNewPassword";
import Register from "../features/auth/Register";
import Dashboard from "../features/dashboard/Dashboard";

import DriversManagement from "@/pages/company/drivers/DriversManagement";
import DriverOnboardPage from "@/pages/company/drivers/DriverOnboardPage"; 
import LiveTracking from "@/pages/company/tracking/LiveTracking";
import OrderManagement from "@/pages/company/orders/OrderManagement";
import OrderManagementCreate from "@/pages/company/orders/OrderManagementCreate";
import WarehousesManagement from "@/pages/company/inventory/warehouses/WareHousesManagement";
import CreateWareHouse from "@/pages/company/inventory/warehouses/CreateWareHouse";
import WareHouseView from "@/pages/company/inventory/warehouses/WarehouseView";
import StockManagement from "@/pages/company/inventory/stock/StockManagement";
import ProductsManagement from "@/pages/company/products/ProductsManagement";
import CreateProduct from "@/pages/company/products/CreateProduct";
import CategoriesManagement from "../pages/company/categories/CategoriesManagement";
import CustomersManagement from "../pages/company/customers/CustomersManagement";
import SuppliersManagement from "../pages/company/suppliers/SuppliersManagement";
import PosManagement from "@/pages/company/sales/PosManagement";
import PosLayout from "@/layouts/PosLayout";
import BusinessSettings from "@/pages/company/settings/BusinessSettings";


import FuelManagement from "../features/distributor/fleet/FuelManagement";
import AddFleet from "../features/distributor/fleet/components/AddFleet";
import FleetManagement from "../features/distributor/fleet/FleetManagement";
import VehicleDetails from "../features/distributor/fleet/components/VehicleDetails";
import RoutesManagement from "../features/distributor/fleet/components/RoutesManagement";



import UnauthenticatedPage from "@/pages/errors/UnauthenticatedPage";
import UnauthorizedPage from "@/pages/errors/UnauthorizedPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import AddRoute from "../features/distributor/fleet/components/AddRoute";
import StoresManagement from "../features/distributor/fleet/pages/StoresManagement";
import AddStore from "../features/distributor/fleet/pages/AddStore";
import RolesManagement from "../features/distributor/staff/pages/RolesManagement";
import StaffManagement from "../features/distributor/staff/pages/StaffManagement";

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <BrowserRouter>
        <Routes>
          {/* Public auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="set-new-password" element={<SetNewPassword />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Error pages — public so the interceptor can land here without auth */}
          <Route path="/unauthenticated" element={<UnauthenticatedPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Authenticated — any valid user */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Authenticated — Company or Distributor */}
          <Route element={<ProtectedRoute requiredRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
            <Route element={<AppLayout />}>

              {/* Fleet & logistics */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
                <Route path="/drivers-management" element={<DriversManagement />} />
                <Route path="/drivers-management/onboard" element={<DriverOnboardPage />} />
                <Route path="/orders-management" element={<OrderManagement />} />
                <Route path="/orders-management/create" element={<OrderManagementCreate />} />
                <Route path="/fleet-management" element={<FleetManagement />} />
                <Route path="/fleet-management/add" element={<AddFleet />} />
                <Route path="/fleet/fuel-management" element={<FuelManagement />} />
                <Route path="/fleet/vehicle-details/:id" element={<VehicleDetails />} />
                <Route path="/fleet/routes-management" element={<RoutesManagement />} />
                <Route path="/fleet/routes-management/add" element={<AddRoute />} />
                <Route path="/live-tracking" element={<LiveTracking />} />


                <Route path="/fleet/stores-management" element={<StoresManagement />} />
                <Route path="/fleet/stores-management/add" element={<AddStore />} />
              </Route>

              {/* Inventory */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
                <Route path="/inventory/warehouses" element={<WarehousesManagement />} />
                <Route path="/inventory/warehouses/create" element={<CreateWareHouse />} />
                <Route path="/inventory/warehouses/view/:id" element={<WareHouseView />} />
                <Route path="/inventory/stock" element={<StockManagement />} />
              </Route>

              {/* Products & catalogue */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
                <Route path="/products" element={<ProductsManagement />} />
                <Route path="/products/create" element={<CreateProduct />} />
                <Route path="/products/categories" element={<CategoriesManagement />} />
              </Route>

              {/* Customers & suppliers */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
                <Route path="/customers-management" element={<CustomersManagement />} />
                <Route path="/suppliers-management" element={<SuppliersManagement />} />
              </Route>

              {/* Settings — Company only */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY]} />}>
                <Route path="/settings/business" element={<BusinessSettings />} />
              </Route>

              {/* Settings — Company only */}
              <Route element={<RoleGuard allowedRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
                <Route path="/staff-management" element={<StaffManagement />} />
                <Route path="/roles-management" element={<RolesManagement />} />
              </Route>

            </Route>
          </Route>

          {/* POS — Company or Distributor */}
          <Route element={<ProtectedRoute requiredRoles={[ROLES.COMPANY, ROLES.DISTRIBUTOR]} />}>
            <Route element={<PosLayout />}>
              <Route path="/sales/pos" element={<PosManagement />} />
            </Route>
          </Route>

          {/* 404 catch-all — must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
