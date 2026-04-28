import { useState } from "react";
import * as authService from "./authService";
import { useAuthStore } from "@/store/authStore";

// Seeded country GUIDs (must match ApplicationDbContext seed data)
const COUNTRY_DIAL_CODES = {
  'a1b2c3d4-0001-0000-0000-000000000000': '254', // Kenya
  'a1b2c3d4-0002-0000-0000-000000000000': '256', // Uganda
  'a1b2c3d4-0003-0000-0000-000000000000': '255', // Tanzania
};

// Converts local format (0XXXXXXXXX) to international (254XXXXXXXXX).
// Distributor phone validator requires E.164-style: ^\+?[1-9]\d{1,14}$
function toInternationalPhone(phone, countryId) {
  if (!phone) return phone;
  const clean = phone.replace(/\D/g, '');
  if (!clean.startsWith('0')) return clean;
  const dialCode = COUNTRY_DIAL_CODES[countryId] ?? '254';
  return dialCode + clean.slice(1);
}

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
  if (!companyData.countryId) return "Country is required";
  if (!companyData.registrationNumber?.trim()) return "Registration number is required";
  if (!companyData.industryId) return "Industry is required";
  if (!companyData.employeeCount?.trim()) return "Employee count is required";
  if (!/^\d+$/.test(companyData.employeeCount.trim())) return "Employee count must be a whole number";

  if (accountType === "distributor") {
    if (!companyData.warehouseLocations?.trim()) return "Warehouse locations are required";
  }

  return null;
}

function validateManagerStep(managerData, agreedToTerms, accountType) {
  if (!managerData.userName?.trim()) return "Username is required";
  if (managerData.userName.trim().length < 3) return "Username must be at least 3 characters";
  if (!/^[a-zA-Z0-9_.-]+$/.test(managerData.userName.trim()))
    return "Username can only contain letters, numbers, underscores, dots and hyphens";

  if (!managerData.email?.trim()) return "Email address is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(managerData.email)) return "Please enter a valid email address";

  if (accountType === "distributor") {
    if (!managerData.phone?.trim()) return "Manager phone number is required";
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(managerData.phone)) return "Manager phone must be 10 digits starting with 0";
  }

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
    const companyValidationError = validateCompanyStep(
      registrationData.accountType,
      registrationData.company
    );
    if (companyValidationError) {
      setError(companyValidationError);
      return null;
    }

    const managerValidationError = validateManagerStep(
      registrationData.manager,
      registrationData.termsAccepted,
      registrationData.accountType
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
      let response;

      if (registrationData.accountType === "distributor") {
        const payload = {
          OrganizationName: company.companyName,
          DistributorEmailAddress: company.email,
          DistributorPhoneNumber: toInternationalPhone(company.phone, company.countryId),
          Address: company.address,
          City: company.city,
          CountryId: company.countryId,
          RegistrationNumber: company.registrationNumber,
          WarehouseLocations: company.warehouseLocations,
          IndustryId: company.industryId,
          EmployeeCount: company.employeeCount.trim(),
          UserName: manager.userName,
          PhoneNumber: toInternationalPhone(manager.phone, company.countryId),
          Email: manager.email,
          Password: manager.password,
          ConfirmPassword: manager.confirmPassword,
          ...(manager.firstName?.trim() && { FirstName: manager.firstName.trim() }),
          ...(manager.lastName?.trim() && { LastName: manager.lastName.trim() }),
        };
        response = await authService.registerDistributor(payload);
      } else if (registrationData.accountType === "company") {
        const payload = {
          OrganizationName: company.companyName,
          CompanyEmailAddress: company.email,
          CompanyPhoneNumber: company.phone,
          Address: company.address,
          City: company.city,
          CountryId: company.countryId,
          RegistrationNumber: company.registrationNumber,
          IndustryId: company.industryId,
          EmployeeCount: company.employeeCount.trim(),
          UserName: manager.userName,
          Email: manager.email,
          Password: manager.password,
          ConfirmPassword: manager.confirmPassword,
          ...(manager.firstName?.trim() && { FirstName: manager.firstName.trim() }),
          ...(manager.lastName?.trim() && { LastName: manager.lastName.trim() }),
        };
        response = await authService.registerCompany(payload);
      } else {
        throw new Error("Invalid account type");
      }

      // Reaching here means 2xx — success
      setSuccess(true);
      if (response?.user) setUser(response.user);
      return { success: true, data: response };
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";

      // The axios interceptor in api.js normalizes errors to { errors[], message }
      if (Array.isArray(err.errors) && err.errors.length > 0) {
        errorMessage = err.errors.join(" ");
      } else if (err.message) {
        errorMessage = err.message;
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
    validateManagerStep: (managerData, agreedToTerms, accountType) => {
      const err = validateManagerStep(managerData, agreedToTerms, accountType);
      if (err) setError(err);
      return { isValid: !err };
    },
  };
}
