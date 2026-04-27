import { useState } from "react";
import * as authService from "./authService";
import { useAuthStore } from "@/store/authStore";

// Validation functions (keep as is)
function validateCompanyStep(accountType, companyData) {
  if (!accountType) return "Please select an account type";
  if (!companyData.companyName?.trim()) return "Company name is required";
  if (!companyData.email?.trim()) return "Email address is required";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(companyData.email)) return "Please enter a valid email address";
  
  if (!companyData.phone?.trim()) return "Phone number is required";

  const phoneRegex = /^0[0-9]{9}$/;
  if (!phoneRegex.test(companyData.phone)) return "Phone number must be 10 digits starting with 0";
  
  if (!companyData.address?.trim()) return "Address is required";
  if (!companyData.city?.trim()) return "City is required";

  if (accountType === "distributor") {
    if (!companyData.taxId?.trim()) return "Tax ID / PIN is required for distributors";
    if (!companyData.fleetSize) return "Fleet size is required for distributors";
  }

  if (accountType === "company") {
    if (!companyData.registrationNumber?.trim()) return "Registration number is required for companies";
    if (!companyData.industry) return "Industry is required for companies";
  }

  return null;
}

function validateManagerStep(managerData, agreedToTerms) {
  if (!managerData.userName?.trim()) return "Username is required";
  if (managerData.userName.trim().length < 3) return "Username must be at least 3 characters";
  if (!/^[a-zA-Z0-9_.-]+$/.test(managerData.userName.trim()))
    return "Username can only contain letters, numbers, underscores, dots and hyphens";

  if (!managerData.email?.trim()) return "Email address is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(managerData.email)) return "Please enter a valid email address";

  if (!managerData.password) return "Password is required";
  if (managerData.password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(managerData.password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(managerData.password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(managerData.password)) return "Password must contain at least one number";
  if (!/[^a-zA-Z0-9]/.test(managerData.password)) return "Password must contain at least one special character";

  if (managerData.password !== managerData.confirmPassword) return "Passwords do not match";
  if (!agreedToTerms) return "Please agree to the Terms of Service and Privacy Policy";

  return null;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const register = async (registrationData) => {
    // Validate company step
    const companyValidationError = validateCompanyStep(
      registrationData.accountType,
      registrationData.company
    );
    if (companyValidationError) {
      setError(companyValidationError);
      return null;
    }

    // Validate manager step
    const managerValidationError = validateManagerStep(
      registrationData.manager,
      registrationData.termsAccepted
    );
    if (managerValidationError) {
      setError(managerValidationError);
      return null;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { company, manager } = registrationData;
      let payload;
      let response;

      if (registrationData.accountType === "company") {
        payload = {
          OrganizationName: company.companyName,
          CompanyEmailAddress: company.email,
          CompanyPhoneNumber: company.phone,
          Address: company.address,
          City: company.city,
          CountryId: company.country,
          RegistrationNumber: company.registrationNumber,
          IndustryId: company.industry,
          EmployeeCount: company.employeeCount,
          UserName: manager.userName,
          Email: manager.email,
          Password: manager.password,
          ConfirmPassword: manager.confirmPassword,
          ...(manager.firstName?.trim() && { FirstName: manager.firstName.trim() }),
          ...(manager.lastName?.trim() && { LastName: manager.lastName.trim() }),
        };
        response = await authService.registerCompany(payload);
      }
      else if (registrationData.accountType === "distributor") {
        payload = {
          OrganizationName: company.companyName,
          CompanyEmailAddress: company.email,
          CompanyPhoneNumber: company.phone,
          Address: company.address,
          City: company.city,
          CountryId: company.country,
          TaxId: company.taxId,
          FleetSize: company.fleetSize,
          WarehouseLocations: company.warehouseLocations,
          UserName: manager.userName,
          Email: manager.email,
          Password: manager.password,
          ConfirmPassword: manager.confirmPassword,
          ...(manager.firstName?.trim() && { FirstName: manager.firstName.trim() }),
          ...(manager.lastName?.trim() && { LastName: manager.lastName.trim() }),
        };
        response = await authService.registerDistributor(payload);
      }
      else {
        throw new Error("Invalid account type");
      }
      
      // Handle response and update state
      if (response.success || response.data?.success) {
        setSuccess(true);
        // If registration returns user data, update auth store
        if (response.user || response.data?.user) {
          setUser(response.user || response.data.user);
        }
        return { success: true, data: response };
      } else {
        const errorMessage = response.message || response.data?.message || "Registration failed. Please try again.";
        setError(errorMessage);
        return null;
      }
    } catch (err) {
      // Error handling
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = "An account with this email already exists.";
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.message || "Invalid registration data. Please check your inputs.";
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");
  const resetSuccess = () => setSuccess(false);

  return {
    register,
    loading,
    error,
    success,
    clearError,
    resetSuccess,
    validateCompanyStep: (accountType, companyData) => {
      const err = validateCompanyStep(accountType, companyData);
      if (err) setError(err);
      return { isValid: !err };
    },
    validateManagerStep: (managerData, agreedToTerms) => {
      const err = validateManagerStep(managerData, agreedToTerms);
      if (err) setError(err);
      return { isValid: !err };
    },
  };
}