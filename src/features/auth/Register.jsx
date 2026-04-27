import React, { useState } from 'react';
import {
  Truck, User, Mail, Lock, Eye, EyeOff, ArrowRight,
  Smartphone, Shield, CheckCircle, AlertCircle,
  Building2, Phone, BadgeCheck, Loader,
  ChevronRight, ChevronLeft, Briefcase, Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRegister } from './useRegister';

// Static class maps
const COLOR_CLASSES = {
  blue: {
    selectedCard: 'bg-blue-50 dark:bg-blue-950 border-blue-600',
    icon: 'bg-blue-600 text-blue-100',
    label: 'text-blue-700 dark:text-blue-400',
  },
  purple: {
    selectedCard: 'bg-purple-50 dark:bg-purple-950 border-purple-600',
    icon: 'bg-purple-600 text-purple-100',
    label: 'text-purple-700 dark:text-purple-400',
  },
};

function getPasswordStrength(password) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  const levels = [
    { label: 'Very Weak', color: 'bg-red-500',    textColor: 'text-red-500',    width: '20%'  },
    { label: 'Weak',      color: 'bg-red-400',    textColor: 'text-red-400',    width: '40%'  },
    { label: 'Fair',      color: 'bg-orange-400', textColor: 'text-orange-400', width: '60%'  },
    { label: 'Good',      color: 'bg-blue-500',   textColor: 'text-blue-500',   width: '80%'  },
    { label: 'Strong',    color: 'bg-green-500',  textColor: 'text-green-500',  width: '100%' },
  ];
  return levels[Math.min(score, 4)];
}

// Shared input class strings
const INPUT_BASE = 'block w-full px-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition';
const INPUT_ICON_L = 'block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition';
const INPUT_ICON_LR = 'block w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition';

function Register() {
  const [step, setStep] = useState(1); // Step 1: Account type & company details, Step 2: Manager profile
  const [accountType, setAccountType] = useState(null); // 'distributor' or 'company'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [companyData, setCompanyData] = useState({
    // Common fields
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya',
    
    // Distributor specific
    taxId: '',
    fleetSize: '',
    warehouseLocations: '',
    
    // Company specific
    registrationNumber: '',
    industry: '',
    employeeCount: '',
    website: '',
  });

  const [managerData, setManagerData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    loading,
    error,
    success,
    clearError,
    validateCompanyStep,
    validateManagerStep
  } = useRegister();

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanyPhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (digits.length > 0 && digits[0] !== '0') return;
    if (digits.length > 10) return;
    setCompanyData(prev => ({ ...prev, phone: digits }));
  };

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    clearError();
  };

  const handleNextToManager = () => {
    const validation = validateCompanyStep(accountType, companyData);
    if (!validation.isValid) {
      toast.error('Please correct the following errors');
      return;
    }
    clearError();
    setStep(2);
  };

  const handleBackToCompany = () => {
    setStep(1);
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateManagerStep(managerData, agreedToTerms);
    if (!validation.isValid) {
      toast.error('Please correct the following errors');
      return;
    }

    // Prepare registration data
    const registrationData = {
      accountType,
      company: companyData,
      manager: managerData,
      termsAccepted: agreedToTerms,
    };

    const result = await register(registrationData);
    if (result.success) {
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  };

  const accountTypes = [
    {
      id: 'distributor',
      label: 'Distributor',
      icon: Building2,
      color: 'blue',
      description: 'Manage fleet, drivers, and delivery operations',
      features: ['Fleet management', 'Driver tracking', 'Analytics dashboard', 'Customer notifications'],
    },
    {
      id: 'company',
      label: 'Company',
      icon: Briefcase,
      color: 'purple',
      description: 'Receive deliveries and manage supply chain',
      features: ['Order tracking', 'Delivery scheduling', 'Inventory management', 'Supplier integration'],
    },
  ];

  const selectedAccountType = accountTypes.find(at => at.id === accountType);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Registration Successful!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your account has been created. A confirmation email has been sent to {managerData.email}.
              You will be redirected to the login page.
            </p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-4">
              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-full" />
            </div>
            <a href="/login" className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Go to Login <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Brand/Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>

        <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <Truck className="w-8 h-8" />
            </div>
            <span className="font-bold text-2xl">DeliverTrack</span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Join the future of
              <span className="block text-blue-200">Delivery Management</span>
            </h2>
            <p className="text-blue-100 mt-4 text-lg leading-relaxed">
              Create your account and start managing deliveries efficiently. 
              Whether you're a distributor or a company, we've got you covered.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Real-time GPS tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Automated WhatsApp notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Advanced analytics dashboard</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-blue-200">
            <p>© {new Date().getFullYear()} DeliverTrack. Secure & Reliable.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                Deliver<span className="text-blue-600">Track</span>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'}`}>
                Company Details
              </span>
              <span className={`text-xs font-medium ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'}`}>
                Manager Profile
              </span>
            </div>
            <div className="flex gap-1">
              <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`} />
              <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`} />
            </div>
          </div>

          {/* Step 1: Account Type & Company Details */}
          {step === 1 && (
            <div className="animate-fadeIn">
              {!accountType ? (
                // Account Type Selection
                <div>
                  <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Create your account
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 mt-2">
                      Choose how you want to use DeliverTrack
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {accountTypes.map((type) => {
                      const Icon = type.icon;
                      const colors = COLOR_CLASSES[type.color];

                      return (
                        <button
                          key={type.id}
                          onClick={() => handleAccountTypeSelect(type.id)}
                          className="w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {type.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-slate-400">
                              {type.description}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Company Details Form
                <div>
                  <button
                    onClick={() => setAccountType(null)}
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-4 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to account types
                  </button>

                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        {selectedAccountType && <selectedAccountType.icon className="w-8 h-8 text-blue-600" />}
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {accountType === 'distributor' ? 'Distributor Details' : 'Company Details'}
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 mt-2">
                      Tell us about your {accountType === 'distributor' ? 'distribution business' : 'organization'}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={(e) => { e.preventDefault(); handleNextToManager(); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        {accountType === 'distributor' ? 'Company Name' : 'Organization Name'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                        </div>
                        <input
                          type="text"
                          name="companyName"
                          value={companyData.companyName}
                          onChange={handleCompanyChange}
                          className={INPUT_ICON_L}
                          placeholder={accountType === 'distributor' ? "Your Distribution Company" : "Your Organization Name"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={companyData.email}
                          onChange={handleCompanyChange}
                          className={INPUT_ICON_L}
                          placeholder="contact@yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={companyData.phone}
                          onChange={handleCompanyPhoneChange}
                          className={INPUT_ICON_L}
                          placeholder="0712345678"
                          maxLength={10}
                        />
                      </div>
                      <p className={`text-xs mt-1 ${companyData.phone.length === 10 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'}`}>
                        {companyData.phone.length === 10
                          ? 'Phone number complete'
                          : `${10 - companyData.phone.length} digit${10 - companyData.phone.length !== 1 ? 's' : ''} remaining`}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={companyData.address}
                        onChange={handleCompanyChange}
                        className={INPUT_BASE}
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={companyData.city}
                          onChange={handleCompanyChange}
                          className={INPUT_BASE}
                          placeholder="Nairobi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          value={companyData.country}
                          onChange={handleCompanyChange}
                          className={INPUT_BASE}
                        >
                          <option value="Kenya">Kenya</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Rwanda">Rwanda</option>
                        </select>
                      </div>
                    </div>

                    {accountType === 'distributor' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Tax ID / PIN <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="taxId"
                            value={companyData.taxId}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                            placeholder="A123456789Z"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Fleet Size <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="fleetSize"
                            value={companyData.fleetSize}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                          >
                            <option value="">Select fleet size</option>
                            <option value="1-5">1-5 vehicles</option>
                            <option value="6-20">6-20 vehicles</option>
                            <option value="21-50">21-50 vehicles</option>
                            <option value="50-100">50-100 vehicles</option>
                            <option value="100+">100+ vehicles</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Warehouse Locations
                          </label>
                          <input
                            type="text"
                            name="warehouseLocations"
                            value={companyData.warehouseLocations}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                            placeholder="Nairobi, Mombasa, Kisumu"
                          />
                        </div>
                      </>
                    )}

                    {accountType === 'company' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Registration Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="registrationNumber"
                            value={companyData.registrationNumber}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                            placeholder="CP/2024/12345"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Industry <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="industry"
                            value={companyData.industry}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                          >
                            <option value="">Select industry</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="wholesale">Wholesale</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="logistics">Logistics</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Employee Count
                          </label>
                          <select
                            name="employeeCount"
                            value={companyData.employeeCount}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                          >
                            <option value="">Select employee count</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201-500">201-500</option>
                            <option value="500+">500+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={companyData.website}
                            onChange={handleCompanyChange}
                            className={INPUT_BASE}
                            placeholder="https://www.yourcompany.com"
                          />
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition duration-200 mt-6"
                    >
                      Continue to Manager Profile <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Manager Profile */}
          {step === 2 && selectedAccountType && (
            <div className="animate-fadeIn">
              <button
                onClick={handleBackToCompany}
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-4 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to company details
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Manager Profile
                </h1>
                <p className="text-gray-500 dark:text-slate-400 mt-2">
                  Set up the account manager who will oversee this {accountType}
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={managerData.firstName}
                        onChange={handleManagerChange}
                        className={INPUT_ICON_L}
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={managerData.lastName}
                      onChange={handleManagerChange}
                      className={INPUT_BASE}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BadgeCheck className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      value={managerData.userName}
                      onChange={handleManagerChange}
                      className={INPUT_ICON_L}
                      placeholder="john_doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={managerData.email}
                      onChange={handleManagerChange}
                      className={INPUT_ICON_L}
                      placeholder="john.doe@yourcompany.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={managerData.password}
                      onChange={handleManagerChange}
                      className={INPUT_ICON_LR}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword
                        ? <EyeOff className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                        : <Eye className="h-5 w-5 text-gray-400 dark:text-slate-500" />}
                    </button>
                  </div>
                  {managerData.password && (() => {
                    const strength = getPasswordStrength(managerData.password);
                    return (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
                            style={{ width: strength.width }}
                          />
                        </div>
                        <p className={`text-xs mt-1 font-medium ${strength.textColor}`}>{strength.label}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={managerData.confirmPassword}
                      onChange={handleManagerChange}
                      className={INPUT_ICON_LR}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword
                        ? <EyeOff className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                        : <Eye className="h-5 w-5 text-gray-400 dark:text-slate-500" />}
                    </button>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-900 dark:text-white mb-2">What you'll get:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAccountType?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 dark:border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-slate-400">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</a>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackToCompany}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-lg font-semibold transition duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition duration-200 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading
                      ? <><Loader className="w-5 h-5 animate-spin" /> Creating account...</>
                      : <>Complete Registration <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Register;