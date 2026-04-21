import React, { useState } from 'react';
import { 
  User, Truck, FileText, CheckCircle, AlertCircle, ArrowRight, 
  ArrowLeft, Upload, X, Camera, CreditCard, Phone, Mail, MapPin,
  Calendar, IdCard, Car, Fuel, Wrench, Shield, Award, Clock,
  Users, Building, Map, Navigation, Smartphone, Globe, Lock,
  Eye, EyeOff, Check, AlertTriangle, File, Image, Download,
  Plus, Trash2, Save, Send, RefreshCw, HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const DriverOnboardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternativePhone: '',
    dateOfBirth: '',
    nationalId: '',
    gender: '',
    address: '',
    city: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Driver License
    licenseNumber: '',
    licenseClass: '',
    licenseExpiry: '',
    licenseIssuedDate: '',
    licenseIssuingAuthority: '',
    
    // Vehicle Information
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    vehicleColor: '',
    vehicleCapacity: '',
    fuelType: '',
    insuranceProvider: '',
    insurancePolicyNo: '',
    insuranceExpiry: '',
    
    // Banking Information
    bankName: '',
    accountName: '',
    accountNumber: '',
    bankCode: '',
    mpesaNumber: '',
    
    // Employment Details
    employmentType: '',
    startDate: '',
    shiftPreference: '',
    baseLocation: '',
    assignedZones: [],
    weeklyTarget: '',
    
    // Documents
    profilePhoto: null,
    licensePhoto: null,
    insuranceDoc: null,
    nationalIdPhoto: null,
    goodConduct: null,
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [assignedZonesInput, setAssignedZonesInput] = useState('');
  
  // Available zones
  const availableZones = [
    'Westlands', 'Kilimani', 'CBD', 'Parklands', 'Karen', 
    'Ngong', 'Upper Hill', 'Industrial Area', 'Eastlands', 
    'South B', 'South C', 'Langata'
  ];
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid image or PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      toast.success(`${fieldName} uploaded successfully`);
    }
  };
  
  // Add zone to assigned zones
  const addZone = (zone) => {
    if (!formData.assignedZones.includes(zone)) {
      setFormData(prev => ({
        ...prev,
        assignedZones: [...prev.assignedZones, zone]
      }));
    }
  };
  
  // Remove zone
  const removeZone = (zone) => {
    setFormData(prev => ({
      ...prev,
      assignedZones: prev.assignedZones.filter(z => z !== zone)
    }));
  };
  
  // Validate current step
  const validateStep = () => {
    const errors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.email) errors.email = 'Email is required';
      if (!formData.phone) errors.phone = 'Phone number is required';
      if (!formData.nationalId) errors.nationalId = 'National ID is required';
      if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    }
    
    if (currentStep === 2) {
      if (!formData.licenseNumber) errors.licenseNumber = 'License number is required';
      if (!formData.licenseClass) errors.licenseClass = 'License class is required';
      if (!formData.licenseExpiry) errors.licenseExpiry = 'License expiry date is required';
    }
    
    if (currentStep === 3) {
      if (!formData.vehicleType) errors.vehicleType = 'Vehicle type is required';
      if (!formData.licensePlate) errors.licensePlate = 'License plate is required';
      if (!formData.insuranceExpiry) errors.insuranceExpiry = 'Insurance expiry date is required';
    }
    
    if (currentStep === 4) {
      if (!formData.bankName && !formData.mpesaNumber) {
        errors.payment = 'At least one payment method is required';
      }
    }
    
    if (currentStep === 5) {
      if (formData.assignedZones.length === 0) {
        errors.assignedZones = 'At least one zone must be assigned';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };
  
  // Previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Submit form
  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('Driver onboarded successfully!');
        // Reset form or redirect
        setCurrentStep(1);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', alternativePhone: '',
          dateOfBirth: '', nationalId: '', gender: '', address: '', city: '',
          emergencyContact: '', emergencyPhone: '', licenseNumber: '', licenseClass: '',
          licenseExpiry: '', licenseIssuedDate: '', licenseIssuingAuthority: '',
          vehicleType: '', vehicleMake: '', vehicleModel: '', vehicleYear: '',
          licensePlate: '', vehicleColor: '', vehicleCapacity: '', fuelType: '',
          insuranceProvider: '', insurancePolicyNo: '', insuranceExpiry: '',
          bankName: '', accountName: '', accountNumber: '', bankCode: '', mpesaNumber: '',
          employmentType: '', startDate: '', shiftPreference: '', baseLocation: '',
          assignedZones: [], weeklyTarget: '', profilePhoto: null, licensePhoto: null,
          insuranceDoc: null, nationalIdPhoto: null, goodConduct: null,
        });
      }, 2000);
    } else {
      toast.error('Please complete all required fields');
    }
  };
  
  // Steps configuration
  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'License Details', icon: IdCard },
    { number: 3, title: 'Vehicle Info', icon: Car },
    { number: 4, title: 'Bank Details', icon: CreditCard },
    { number: 5, title: 'Work Setup', icon: MapPin },
    { number: 6, title: 'Documents', icon: FileText },
  ];
  
  // File upload component
  const FileUploadField = ({ label, fieldName, icon: Icon, accept = "image/*,application/pdf" }) => (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-indigo-500 transition">
      <label className="cursor-pointer block">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {formData[fieldName] ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Icon className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
            <p className="text-xs text-gray-500">
              {formData[fieldName] ? formData[fieldName].name : 'Click to upload (JPG, PNG, PDF, max 5MB)'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={(e) => handleFileUpload(e, fieldName)}
          />
        </div>
      </label>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Onboarding</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register a new driver to the fleet. Complete all steps to activate the driver account.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Save Draft
          </button>
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
          >
            Preview
          </button>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/30'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium ${isCurrent ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <User className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="driver@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Alternative Phone
                  </label>
                  <input
                    type="tel"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Optional"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    National ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Enter national ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Street address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Nairobi"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: License Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <IdCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Driver License Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Enter license number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="licenseClass"
                    value={formData.licenseClass}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select class</option>
                    <option value="A">Class A - Motorcycle</option>
                    <option value="B">Class B - Light Vehicle</option>
                    <option value="C">Class C - Heavy Vehicle</option>
                    <option value="D">Class D - PSV</option>
                    <option value="E">Class E - Trailer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License Issue Date
                  </label>
                  <input
                    type="date"
                    name="licenseIssuedDate"
                    value={formData.licenseIssuedDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issuing Authority
                  </label>
                  <input
                    type="text"
                    name="licenseIssuingAuthority"
                    value={formData.licenseIssuingAuthority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="NTSA"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Vehicle Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Car className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Vehicle Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select type</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Tuk Tuk">Tuk Tuk</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Bicycle">Bicycle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License Plate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="KCA 123A"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Make
                  </label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Toyota, Honda, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Probox, Fit, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Year
                  </label>
                  <input
                    type="number"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="2020"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Color
                  </label>
                  <input
                    type="text"
                    name="vehicleColor"
                    value={formData.vehicleColor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="White, Black, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Capacity (kg/liters)
                  </label>
                  <input
                    type="text"
                    name="vehicleCapacity"
                    value={formData.vehicleCapacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="500kg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Insurance company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Policy Number
                  </label>
                  <input
                    type="text"
                    name="insurancePolicyNo"
                    value={formData.insurancePolicyNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Policy number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="insuranceExpiry"
                    value={formData.insuranceExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Banking Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Banking & Payment Details</h2>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      Please provide at least one payment method (Bank Account or M-Pesa) for driver salary disbursement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Bank Account Details</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Equity, KCB, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Full name as per bank"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Bank account number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bank Code (Branch Code)
                  </label>
                  <input
                    type="text"
                    name="bankCode"
                    value={formData.bankCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Optional"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">M-Pesa Details</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    M-Pesa Number
                  </label>
                  <input
                    type="tel"
                    name="mpesaNumber"
                    value={formData.mpesaNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              </div>
              
              {formErrors.payment && (
                <p className="text-sm text-red-500 mt-2">{formErrors.payment}</p>
              )}
            </div>
          )}
          
          {/* Step 5: Work Setup */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Work Setup & Zones</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employment Type
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select type</option>
                    <option value="fulltime">Full Time</option>
                    <option value="parttime">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shift Preference
                  </label>
                  <select
                    name="shiftPreference"
                    value={formData.shiftPreference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select shift</option>
                    <option value="Morning">Morning (6AM - 2PM)</option>
                    <option value="Afternoon">Afternoon (2PM - 10PM)</option>
                    <option value="Night">Night (10PM - 6AM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Base Location
                  </label>
                  <input
                    type="text"
                    name="baseLocation"
                    value={formData.baseLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Starting point / depot"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weekly Delivery Target
                  </label>
                  <input
                    type="number"
                    name="weeklyTarget"
                    value={formData.weeklyTarget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Number of deliveries per week"
                  />
                </div>
              </div>
              
              {/* Assigned Zones */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assigned Delivery Zones <span className="text-red-500">*</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.assignedZones.map((zone) => (
                    <span
                      key={zone}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm"
                    >
                      {zone}
                      <button
                        onClick={() => removeZone(zone)}
                        className="hover:text-red-500 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={assignedZonesInput}
                    onChange={(e) => setAssignedZonesInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select a zone to add</option>
                    {availableZones.filter(z => !formData.assignedZones.includes(z)).map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (assignedZonesInput) {
                        addZone(assignedZonesInput);
                        setAssignedZonesInput('');
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    Add Zone
                  </button>
                </div>
                
                {formErrors.assignedZones && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.assignedZones}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 6: Documents */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Required Documents</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  label="Profile Photo"
                  fieldName="profilePhoto"
                  icon={Camera}
                  accept="image/*"
                />
                
                <FileUploadField
                  label="Driver License Photo"
                  fieldName="licensePhoto"
                  icon={IdCard}
                  accept="image/*,application/pdf"
                />
                
                <FileUploadField
                  label="National ID Photo"
                  fieldName="nationalIdPhoto"
                  icon={User}
                  accept="image/*"
                />
                
                <FileUploadField
                  label="Insurance Document"
                  fieldName="insuranceDoc"
                  icon={Shield}
                  accept="application/pdf,image/*"
                />
                
                <FileUploadField
                  label="Certificate of Good Conduct"
                  fieldName="goodConduct"
                  icon={Award}
                  accept="application/pdf,image/*"
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Document Requirements:</p>
                    <ul className="text-xs text-blue-700 dark:text-blue-400 mt-1 space-y-1 list-disc list-inside">
                      <li>All documents must be clear and readable</li>
                      <li>Accepted formats: JPG, PNG, PDF</li>
                      <li>Maximum file size: 5MB per document</li>
                      <li>Documents will be verified within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          {currentStep < 6 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete Onboarding
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Driver Onboarding Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Preview content - summary of entered data */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}</div>
                    <div><span className="text-gray-500">Email:</span> {formData.email}</div>
                    <div><span className="text-gray-500">Phone:</span> {formData.phone}</div>
                    <div><span className="text-gray-500">National ID:</span> {formData.nationalId}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">License Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">License Number:</span> {formData.licenseNumber}</div>
                    <div><span className="text-gray-500">License Class:</span> {formData.licenseClass}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Vehicle Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Vehicle Type:</span> {formData.vehicleType}</div>
                    <div><span className="text-gray-500">License Plate:</span> {formData.licensePlate}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Assigned Zones</h4>
                  <div className="flex flex-wrap gap-1">
                    {formData.assignedZones.map(zone => (
                      <span key={zone} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{zone}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverOnboardPage;