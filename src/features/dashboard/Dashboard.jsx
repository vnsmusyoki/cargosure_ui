import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { ROLES } from "@/constants/roles"
import CompanyDashboard from "@/features/company/CompanyDashboard"
import DistributorDashboard from "@/features/distributor/DistributorDashboard"

function PlaceholderDashboard({ role }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-3">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{role} Dashboard</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon</p>
    </div>
  )
}

export default function Dashboard() {
  const { user, role, loading, hasFetchedUser } = useAuthStore()

  useEffect(() => {
    if (hasFetchedUser) {
      console.log("🔐 Logged-in User:", user)
      console.log("🪪 Role:", role)
    }
  }, [user, role, hasFetchedUser])

  if (loading || !hasFetchedUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No active session. Please log in again.</p>
      </div>
    )
  }

  switch (role) {
    case ROLES.SUPER_ADMIN:
      return <PlaceholderDashboard role="Super Admin" />

    case ROLES.COMPANY:
      return <CompanyDashboard />

    case ROLES.DISTRIBUTOR:
      return <DistributorDashboard />

    case ROLES.STORE_MANAGER:
      return <PlaceholderDashboard role="Store Manager" />

    case ROLES.DRIVER:
      return <PlaceholderDashboard role="Driver" />

    case ROLES.FUEL_ATTENDANT:
      return <PlaceholderDashboard role="Fuel Attendant" />

    default:
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">
            Unknown role: <span className="font-semibold">{role}</span>
          </p>
        </div>
      )
  }
}
