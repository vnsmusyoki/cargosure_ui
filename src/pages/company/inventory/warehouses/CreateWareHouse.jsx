import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Save, X, Warehouse, MapPin, Users, Package,
  Activity, Shield, Phone, Mail, User, Building, Layers,
  Thermometer, Snowflake, Flame, Wifi, Power, Camera,
  Truck, ParkingCircle, Clock, AlertCircle, CheckCircle,
  ChevronRight, ChevronLeft, Plus, Trash2, Upload,
  FileText, DollarSign, Ruler, Home, Globe, Navigation
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreateWareHouse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    code: '',
    type: 'distribution',
    
    // Location Information
    address: '',
    city: '',
    state: '',
    country: 'Kenya',
    postalCode: '',
    region: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    
    // Capacity Information
    totalCapacity: '',
    capacityUnit: 'sq ft',
    numberOfShelves: '',
    numberOfRacks: '',
    numberOfBays: '',
    
    // Contact Information
    phone: '',
    email: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    
    // Staff Information
    totalStaff: '',
    managers: '',
    supervisors: '',
    workers: '',
    
    // Facilities
    facilities: {
      hasColdStorage: false,
      coldStorageCapacity: '',
      coldStorageTemp: '',
      hasHazardousStorage: false,
      hasAutomation: false,
      automationType: '',
      securityLevel: 'medium',
      hasCCTV: true,
      hasFireSuppression: true,
      hasBackupPower: false,
      loadingDocks: '',
      parkingSpaces: '',
      hasRailAccess: false,
      hasAirAccess: false
    },
    
    // Operational Details
    operatingHours: {
      monday: { open: '08:00', close: '17:00', closed: false },
      tuesday: { open: '08:00', close: '17:00', closed: false },
      wednesday: { open: '08:00', close: '17:00', closed: false },
      thursday: { open: '08:00', close: '17:00', closed: false },
      friday: { open: '08:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '13:00', closed: false },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    
    // Services
    services: {
      sameDayDelivery: false,
      nextDayDelivery: true,
      internationalShipping: false,
      fragileHandling: true,
      temperatureControlled: false,
      hazardousMaterials: false,
      assembly: false,
      packaging: true,
      labeling: true,
      qualityControl: true
    },
    
    // Documents
    documents: {
      licenseNumber: '',
      taxId: '',
      insurancePolicy: '',
      insuranceExpiry: '',
      certifications: []
    },
    
    // Additional Info
    description: '',
    notes: '',
    website: '',
    yearEstablished: ''
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Warehouse name is required';
    if (!formData.code.trim()) newErrors.code = 'Warehouse code is required';
    if (!formData.type) newErrors.type = 'Warehouse type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.region) newErrors.region = 'Region is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.totalCapacity) newErrors.totalCapacity = 'Total capacity is required';
    if (formData.totalCapacity && parseFloat(formData.totalCapacity) <= 0) {
      newErrors.totalCapacity = 'Capacity must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.managerName.trim()) newErrors.managerName = 'Manager name is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFacilitiesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    const isValid = validateStep1() && validateStep2() && validateStep3() && validateStep4();
    
    if (!isValid) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Warehouse Data:', formData);
      toast.success('Warehouse created successfully!');
      setIsSubmitting(false);
      navigate('/warehouses-management');
    }, 1500);
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Warehouse },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Capacity', icon: Layers },
    { number: 4, title: 'Contact', icon: Phone },
    { number: 5, title: 'Facilities', icon: Building },
    { number: 6, title: 'Operations', icon: Clock }
  ];

  return (
    <div className="w-full  mx-auto px-4 py-2">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Warehouses
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Warehouse</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add a new warehouse facility to your logistics network
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/warehouses-management')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Warehouse
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white ring-4 ring-brand-200 dark:ring-brand-900'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${
                    isCurrent ? 'text-brand-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Warehouse Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi Main Hub"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Warehouse Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., WH-001"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Warehouse Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  >
                    <option value="distribution">Distribution Center</option>
                    <option value="fulfillment">Fulfillment Center</option>
                    <option value="coldstorage">Cold Storage</option>
                    <option value="manufacturing">Manufacturing Warehouse</option>
                    <option value="retail">Retail Warehouse</option>
                    <option value="crossdock">Cross-Dock Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year Established
                  </label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    placeholder="e.g., 2020"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe the warehouse facility, its purpose, and key features..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Location Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g., Industrial Area, Mombasa Road"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi County"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Ethiopia">Ethiopia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 00100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region *
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.region ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select Region</option>
                    <option value="Nairobi Region">Nairobi Region</option>
                    <option value="Coastal Region">Coastal Region</option>
                    <option value="Lake Region">Lake Region</option>
                    <option value="Rift Valley">Rift Valley</option>
                    <option value="Central Region">Central Region</option>
                    <option value="North Rift">North Rift</option>
                    <option value="Eastern Region">Eastern Region</option>
                    <option value="North Eastern">North Eastern</option>
                  </select>
                  {errors.region && <p className="mt-1 text-xs text-red-500">{errors.region}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPS Latitude
                  </label>
                  <input
                    type="text"
                    name="lat"
                    value={formData.coordinates.lat}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lat: e.target.value }
                    }))}
                    placeholder="e.g., -1.2921"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPS Longitude
                  </label>
                  <input
                    type="text"
                    name="lng"
                    value={formData.coordinates.lng}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lng: e.target.value }
                    }))}
                    placeholder="e.g., 36.8219"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Capacity */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Capacity & Infrastructure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Capacity *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="totalCapacity"
                      value={formData.totalCapacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 50000"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.totalCapacity ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    <select
                      name="capacityUnit"
                      value={formData.capacityUnit}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    >
                      <option value="sq ft">sq ft</option>
                      <option value="sq m">sq m</option>
                      <option value="cubic ft">cubic ft</option>
                      <option value="sq meters">sq meters</option>
                    </select>
                  </div>
                  {errors.totalCapacity && <p className="mt-1 text-xs text-red-500">{errors.totalCapacity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Shelves
                  </label>
                  <input
                    type="number"
                    name="numberOfShelves"
                    value={formData.numberOfShelves}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Racks
                  </label>
                  <input
                    type="number"
                    name="numberOfRacks"
                    value={formData.numberOfRacks}
                    onChange={handleInputChange}
                    placeholder="e.g., 200"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Bays
                  </label>
                  <input
                    type="number"
                    name="numberOfBays"
                    value={formData.numberOfBays}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +254 700 111 222"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., warehouse@company.com"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2 border-t pt-4 mt-2">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Warehouse Manager</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manager Name *
                  </label>
                  <input
                    type="text"
                    name="managerName"
                    value={formData.managerName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.managerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.managerName && <p className="mt-1 text-xs text-red-500">{errors.managerName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manager Phone
                  </label>
                  <input
                    type="tel"
                    name="managerPhone"
                    value={formData.managerPhone}
                    onChange={handleInputChange}
                    placeholder="e.g., +254 711 222 333"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manager Email
                  </label>
                  <input
                    type="email"
                    name="managerEmail"
                    value={formData.managerEmail}
                    onChange={handleInputChange}
                    placeholder="manager@company.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Facilities */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Facilities & Amenities</h2>
              
              <div className="space-y-6">
                {/* Storage Facilities */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Storage Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasColdStorage"
                        checked={formData.facilities.hasColdStorage}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Cold Storage</span>
                    </label>
                    
                    {formData.facilities.hasColdStorage && (
                      <>
                        <div>
                          <input
                            type="text"
                            name="coldStorageCapacity"
                            value={formData.facilities.coldStorageCapacity}
                            onChange={handleFacilitiesChange}
                            placeholder="Cold storage capacity (sq ft)"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="coldStorageTemp"
                            value={formData.facilities.coldStorageTemp}
                            onChange={handleFacilitiesChange}
                            placeholder="Temperature range (e.g., -20°C to 4°C)"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                        </div>
                      </>
                    )}

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasHazardousStorage"
                        checked={formData.facilities.hasHazardousStorage}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Hazardous Materials Storage</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasAutomation"
                        checked={formData.facilities.hasAutomation}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Automated Systems</span>
                    </label>

                    {formData.facilities.hasAutomation && (
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          name="automationType"
                          value={formData.facilities.automationType}
                          onChange={handleFacilitiesChange}
                          placeholder="Type of automation (e.g., conveyor belts, robotic picking)"
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Security Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Security Level
                      </label>
                      <select
                        name="securityLevel"
                        value={formData.facilities.securityLevel}
                        onChange={handleFacilitiesChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="maximum">Maximum</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasCCTV"
                        checked={formData.facilities.hasCCTV}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">CCTV Surveillance</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasFireSuppression"
                        checked={formData.facilities.hasFireSuppression}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Fire Suppression System</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasBackupPower"
                        checked={formData.facilities.hasBackupPower}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Backup Power Generator</span>
                    </label>
                  </div>
                </div>

                {/* Loading & Parking */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Loading & Parking</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Loading Docks
                      </label>
                      <input
                        type="number"
                        name="loadingDocks"
                        value={formData.facilities.loadingDocks}
                        onChange={handleFacilitiesChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Parking Spaces
                      </label>
                      <input
                        type="number"
                        name="parkingSpaces"
                        value={formData.facilities.parkingSpaces}
                        onChange={handleFacilitiesChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasRailAccess"
                        checked={formData.facilities.hasRailAccess}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Rail Access</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasAirAccess"
                        checked={formData.facilities.hasAirAccess}
                        onChange={handleFacilitiesChange}
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Air Cargo Access</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Operations */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Operational Settings</h2>
              
              <div className="space-y-6">
                {/* Services Offered */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Services Offered</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(formData.services).map(service => (
                      <label key={service} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.services[service]}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-brand-600 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Operating Hours</h3>
                  <div className="space-y-3">
                    {Object.entries(formData.operatingHours).map(([day, hours]) => (
                      <div key={day} className="grid grid-cols-3 gap-3 items-center">
                        <div className="font-medium text-sm capitalize">{day}</div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!hours.closed}
                            onChange={(e) => handleOperatingHoursChange(day, 'closed', !e.target.checked)}
                            className="w-4 h-4 text-brand-600 rounded"
                          />
                          <span className="text-sm">Open</span>
                        </label>
                        {!hours.closed && (
                          <>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any additional information about the warehouse..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            className={`px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4 inline mr-1" />
            Previous
          </button>
          
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition"
            >
              Next
              <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Warehouse'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateWareHouse;