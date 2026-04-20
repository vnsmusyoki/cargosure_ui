import React, { useState } from 'react';
import {
  Truck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  MapPin,
  Smartphone,
  Shield,
  CheckCircle,
  AlertCircle,
  Building2,
  IdCard,
  Phone,
  Store,
  Package,
  Navigation,
  Car,
  BadgeCheck,
  FileText,
  Calendar,
  CreditCard,
  Moon,
  Sun,
  Loader
} from 'lucide-react';

function Register() {
  const [isDark, setIsDark] = useState(true);
  const [userType, setUserType] = useState('distributor');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    
    // Distributor fields
    companyName: '',
    businessRegNumber: '',
    fleetSize: '',
    
    // Driver fields
    driverLicenseNumber: '',
    vehicleRegistration: '',
    vehicleType: '',
    experienceYears: '',
    
    // Customer fields
    deliveryAddress: '',
    companyName_customer: '',
    preferredDeliveryTime: '',
  });

  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    bgCard: isDark ? 'bg-slate-900' : 'bg-white',
    bgSecondary: isDark ? 'bg-slate-800' : 'bg-slate-100',
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    input: isDark
      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-blue-600 focus:border-blue-600'
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-600 focus:border-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Common validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }

    // Role-specific validation
    if (userType === 'distributor' && !formData.companyName) {
      setError('Please enter your company name');
      return;
    }

    if (userType === 'driver' && !formData.driverLicenseNumber) {
      setError('Please enter your driver\'s license number');
      return;
    }

    if (userType === 'customer' && !formData.deliveryAddress) {
      setError('Please enter your delivery address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 1500);
  };

  const userTypes = [
    {
      id: 'distributor',
      label: 'Distributor',
      icon: Building2,
      description: 'Business owner / fleet manager',
      color: 'blue',
      features: ['Manage fleet & drivers', 'Real-time tracking dashboard', 'Customer notifications', 'Analytics & reports']
    },
    {
      id: 'driver',
      label: 'Driver',
      icon: Car,
      description: 'Delivery driver / rider',
      color: 'amber',
      features: ['Daily delivery manifest', 'GPS navigation', 'Proof of delivery', 'Performance tracking']
    },
    {
      id: 'customer',
      label: 'Customer',
      icon: Package,
      description: 'Receive deliveries',
      color: 'green',
      features: ['Live order tracking', 'WhatsApp notifications', 'Delivery history', 'Rate drivers']
    }
  ];

  const selectedUserType = userTypes.find(t => t.id === userType);

  // Success Modal
  if (success) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-6 transition-colors duration-300`}>
        <div className="max-w-md w-full">
          <div className={`${theme.bgCard} rounded-2xl shadow-xl p-8 text-center border ${theme.border}`}>
            <div className={`w-20 h-20 ${isDark ? 'bg-green-950' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Registration Successful!</h2>
            <p className={theme.textSecondary + ' mb-6'}>
              Your account has been created. You will be redirected to the login page.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
              <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-600'} h-1.5 rounded-full animate-pulse`} style={{ width: '100%' }}></div>
            </div>
            <a
              href="/login"
              className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium`}
            >
              Go to Login <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main Registration Form
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
      {/* Navigation */}
      <nav className={`border-b ${theme.border} backdrop-blur-md ${isDark ? 'bg-slate-900/50' : 'bg-white/50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-lg ${theme.text}`}>
              Deliver<span className="text-blue-600">Track</span>
            </span>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg ${theme.bgSecondary} transition-colors`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl md:text-3xl font-bold ${theme.text}`}>Create your account</h1>
          <p className={theme.textSecondary + ' mt-2'}>Choose your account type and get started</p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = userType === type.id;
            const colorClasses = {
              blue: {
                bg: isDark ? 'bg-blue-950' : 'bg-blue-50',
                border: 'border-blue-600',
                icon: 'bg-blue-600 text-blue-100',
                text: 'text-blue-700'
              },
              amber: {
                bg: isDark ? 'bg-amber-950' : 'bg-amber-50',
                border: 'border-amber-600',
                icon: 'bg-amber-600 text-amber-100',
                text: 'text-amber-700'
              },
              green: {
                bg: isDark ? 'bg-green-950' : 'bg-green-50',
                border: 'border-green-600',
                icon: 'bg-green-600 text-green-100',
                text: 'text-green-700'
              }
            };

            const colors = colorClasses[type.color];

            return (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? `${colors.bg} border-${type.color}-600 ${colors.border}`
                    : `${theme.bgCard} border-${theme.border} hover:border-slate-400`
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isSelected ? colors.icon : `${isDark ? 'bg-slate-800' : 'bg-slate-200'} text-slate-500`
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`font-semibold ${isSelected ? colors.text : theme.text}`}>
                  {type.label}
                </div>
                <div className={`text-xs ${theme.textSecondary} mt-1`}>{type.description}</div>
              </button>
            );
          })}
        </div>

        {/* Registration Form */}
        <div className={`${theme.bgCard} rounded-2xl shadow-xl border ${theme.border} max-w-3xl mx-auto overflow-hidden`}>
          {/* Form Header */}
          <div className={`${isDark ? 'bg-blue-950/30' : 'bg-blue-50'} px-6 py-4 border-b ${theme.border}`}>
            <div className="flex items-center gap-3">
              {selectedUserType && <selectedUserType.icon className="w-6 h-6 text-blue-600" />}
              <div>
                <h2 className={`font-semibold ${theme.text}`}>
                  {userType === 'distributor' && 'Distributor Registration'}
                  {userType === 'driver' && 'Driver Registration'}
                  {userType === 'customer' && 'Customer Registration'}
                </h2>
                <p className={`text-sm ${theme.textSecondary} mt-0.5`}>
                  {userType === 'distributor' && 'Register your business to start managing deliveries'}
                  {userType === 'driver' && 'Join our network of delivery professionals'}
                  {userType === 'customer' && 'Create an account to track your deliveries'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Alert */}
            {error && (
              <div className={`${isDark ? 'bg-red-950/30 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Common Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-4 w-4 ${theme.textSecondary}`} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-4 w-4 ${theme.textSecondary}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className={`h-4 w-4 ${theme.textSecondary}`} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    placeholder="+254 700 123 456"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${theme.textSecondary}`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-10 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${theme.textSecondary}`}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${theme.textSecondary}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-10 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${theme.textSecondary}`}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Distributor Specific Fields */}
            {userType === 'distributor' && (
              <div className={`space-y-4 border-t ${theme.border} pt-4`}>
                <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      name="businessRegNumber"
                      value={formData.businessRegNumber}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="REG/2024/12345"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Fleet Size
                    </label>
                    <select
                      name="fleetSize"
                      value={formData.fleetSize}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    >
                      <option value="">Select fleet size</option>
                      <option value="1-5">1-5 vehicles</option>
                      <option value="6-20">6-20 vehicles</option>
                      <option value="21-50">21-50 vehicles</option>
                      <option value="50+">50+ vehicles</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="Nairobi, Kenya"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Driver Specific Fields */}
            {userType === 'driver' && (
              <div className={`space-y-4 border-t ${theme.border} pt-4`}>
                <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                  <IdCard className="w-4 h-4 text-amber-600" />
                  Driver Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Driver's License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="driverLicenseNumber"
                      value={formData.driverLicenseNumber}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="DL123456789"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Vehicle Registration
                    </label>
                    <input
                      type="text"
                      name="vehicleRegistration"
                      value={formData.vehicleRegistration}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="KCA 123A"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Vehicle Type
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    >
                      <option value="">Select vehicle type</option>
                      <option value="boda">Boda Boda (Motorcycle)</option>
                      <option value="tuk-tuk">Tuk Tuk</option>
                      <option value="van">Delivery Van</option>
                      <option value="truck">Light Truck</option>
                      <option value="bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Years of Experience
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Specific Fields */}
            {userType === 'customer' && (
              <div className={`space-y-4 border-t ${theme.border} pt-4`}>
                <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                  <Package className="w-4 h-4 text-green-600" />
                  Delivery Preferences
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Default Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="123 Kenyatta Ave, Nairobi"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName_customer"
                      value={formData.companyName_customer}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-1`}>
                      Preferred Delivery Time
                    </label>
                    <select
                      name="preferredDeliveryTime"
                      value={formData.preferredDeliveryTime}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.input}`}
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 8PM)</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Features Preview */}
            <div className={`${theme.bgSecondary} rounded-lg p-4`}>
              <p className={`text-xs font-medium ${theme.text} mb-2`}>What you'll get:</p>
              <div className="grid md:grid-cols-2 gap-2">
                {selectedUserType?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span className={`text-xs ${theme.textSecondary}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className={`text-sm ${theme.textSecondary}`}>
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a> and
                {' '}<a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 ${theme.button} py-3 rounded-lg font-semibold transition duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className={`${theme.bgSecondary} px-6 py-4 border-t ${theme.border} text-center`}>
            <p className={`text-sm ${theme.textSecondary}`}>
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <span className={`flex items-center gap-1 text-xs ${theme.textSecondary}`}>
            <Shield className="w-3 h-3" /> SSL Secure
          </span>
          <span className={`flex items-center gap-1 text-xs ${theme.textSecondary}`}>
            <Smartphone className="w-3 h-3" /> Data encrypted
          </span>
          <span className={`flex items-center gap-1 text-xs ${theme.textSecondary}`}>
            <BadgeCheck className="w-3 h-3" /> Verified accounts
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;