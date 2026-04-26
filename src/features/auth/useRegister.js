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
  
  const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(companyData.phone)) return "Please enter a valid phone number";
  
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
  if (!managerData.fullName?.trim()) return "Manager full name is required";
  if (!managerData.email?.trim()) return "Manager email address is required";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(managerData.email)) return "Please enter a valid email address for the manager";
  
  if (!managerData.phone?.trim()) return "Manager phone number is required";
  
  const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(managerData.phone)) return "Please enter a valid phone number for the manager";
  
  if (!managerData.position?.trim()) return "Manager position is required";
  if (!managerData.password) return "Password is required";
  if (managerData.password.length < 8) return "Password must be at least 8 characters long";
  
  const hasNumber = /\d/.test(managerData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(managerData.password);
  if (!hasNumber || !hasSpecialChar) return "Password must contain at least 1 number and 1 special character";
  
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
      // Format data for API (common for both types)
      const basePayload = {
        company: {
          name: registrationData.company.companyName,
          email: registrationData.company.email,
          phone: registrationData.company.phone,
          address: registrationData.company.address,
          city: registrationData.company.city,
          country: registrationData.company.country,
        },
        manager: {
          fullName: registrationData.manager.fullName,
          email: registrationData.manager.email,
          phone: registrationData.manager.phone,
          position: registrationData.manager.position,
          password: registrationData.manager.password,
        },
        termsAccepted: registrationData.termsAccepted,
      };

      // Add type-specific fields
      let payload;
      let response;

      if (registrationData.accountType === "company") {
        payload = {
          ...basePayload,
          company: {
            ...basePayload.company,
            registrationNumber: registrationData.company.registrationNumber,
            industry: registrationData.company.industry,
            employeeCount: registrationData.company.employeeCount,
            website: registrationData.company.website,
          }
        };
        // Call company registration API
        response = await authService.registerCompany(payload);
      } 
      else if (registrationData.accountType === "distributor") {
        payload = {
          ...basePayload,
          company: {
            ...basePayload.company,
            taxId: registrationData.company.taxId,
            fleetSize: registrationData.company.fleetSize,
            warehouseLocations: registrationData.company.warehouseLocations,
          }
        };
        // Call distributor registration API
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
    resetSuccess
  };
}