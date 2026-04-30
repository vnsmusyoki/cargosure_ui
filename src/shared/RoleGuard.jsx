import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

/**
 * Inner route guard — use this INSIDE a ProtectedRoute group.
 *
 * allowedRoles        → system-level roles  (e.g. ["company", "distributor"])
 * allowedCompanyRoles → company role slugs  (e.g. ["manager", "dispatcher"])
 *
 * Both checks are AND-ed when both are provided (role must satisfy both).
 * Case-insensitive for system roles; exact match for company role slugs.
 */
export default function RoleGuard({
  allowedRoles = [],
  allowedCompanyRoles = [],
}) {
  const { role, employeeData } = useAuthStore()

  if (allowedRoles.length > 0) {
    const normalizedRole = role?.toLowerCase()
    const allowed = allowedRoles.some((r) => r.toLowerCase() === normalizedRole)
    if (!allowed) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  if (allowedCompanyRoles.length > 0) {
    const companyRole = employeeData?.company_role?.role_slug
    if (!companyRole || !allowedCompanyRoles.includes(companyRole)) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <Outlet />
}
