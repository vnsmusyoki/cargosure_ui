import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

export default function ProtectedRoute({
  requiredRoles = [],
  requiredCompanyRoles = [],
}) {
  const { user, role, employeeData, loading, hasFetchedUser, fetchUser } = useAuthStore()

  useEffect(() => {
    if (!hasFetchedUser) {
      fetchUser()
    }
  }, [hasFetchedUser, fetchUser])

  if (loading || !hasFetchedUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading session...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length > 0) {
    const normalizedRole = role?.toLowerCase()
    const allowed = requiredRoles.some((r) => r.toLowerCase() === normalizedRole)
    if (!allowed) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  if (requiredCompanyRoles.length > 0 && role?.toLowerCase() === "employee") {
    const companyRole = employeeData?.company_role?.role_slug
    if (!companyRole || !requiredCompanyRoles.includes(companyRole)) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <Outlet />
}
