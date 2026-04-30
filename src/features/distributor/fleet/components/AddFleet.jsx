import React, { useState } from 'react';
import {
  Truck, Car, Bike, Package, Scale, Box, Thermometer, Building,
  User, MapPin, FileText, Shield, Calendar, Gauge, Wrench,
  Activity, CreditCard, Navigation, Camera, X, CheckCircle,
  AlertCircle, ArrowRight, ArrowLeft, RefreshCw, Upload,
  HelpCircle, Plus, Trash2, Save, Eye, EyeOff, Clock,
  Award, IdCard, Fuel, Zap, Droplet, Settings, Image, Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useVehicleTypes from '../hooks/useVehicletypes';
import useFuelTypes from '../hooks/useFuelTypes';

export default function AddFleet() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { data: vehicleTypes = [], isLoading: vehicleTypesLoading } = useVehicleTypes();
  const { data: fuelTypes = [], isLoading: fuelTypesLoading } = useFuelTypes();

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Vehicle Information
    registrationNumber: '',
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    color: '',
    chassisNumber: '',
    engineNumber: '',
    fuelType: '',
    
    // Capacity & Dimensions
    maxLoadCapacity: '',
    loadCapacityUnit: 'kg',
    volumeCapacity: '',
    palletCapacity: '',
    hasRefrigeration: false,
    refrigerationTempMin: '',
    refrigerationTempMax: '',
    refrigerationTempUnit: 'celsius',
    
    // Ownership & Assignment
    ownerType: '',
    assignedDepot: '',
    primaryDriver: '',
    backupDriver: '',
    assignedRoute: '',
    assignedZones: [],
    
    // Compliance & Documentation
    insurancePolicyNo: '',
    insuranceExpiry: '',
    roadTaxCertNo: '',
    roadTaxExpiry: '',
    fitnessCertNo: '',
    fitnessExpiry: '',
    speedGovernorCertNo: '',
    speedGovernorExpiry: '',
    trackerDeviceId: '',
    policeClearanceNo: '',
    policeClearanceExpiry: '',
    
    // Maintenance & Condition
    currentMileage: '',
    mileageUnit: 'km',
    lastServiceDate: '',
    lastServiceMileage: '',
    nextServiceDue: '',
    nextServiceMileage: '',
    tyreCondition: '',
    tyreLastReplacement: '',
    tyreReplacementMileage: '',
    vehicleCondition: '',
    conditionNotes: '',
    
    // Operational Settings
    status: 'active',
    availabilitySchedule: [],
    fuelCardNumber: '',
    trackingProvider: '',
    
    // Attachments
    vehiclePhotos: [],
    documents: [],
    generalNotes: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [assignedZonesInput, setAssignedZonesInput] = useState('');
  const [availabilityScheduleInput, setAvailabilityScheduleInput] = useState({
    day: '',
    shift: ''
  });
  
  // Available zones
  const availableZones = [
    'Westlands', 'Kilimani', 'CBD', 'Parklands', 'Karen', 
    'Ngong', 'Upper Hill', 'Industrial Area', 'Eastlands', 
    'South B', 'South C', 'Langata'
  ];
  
  // Available drivers (mock data - would come from API)
  const availableDrivers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Otieno' },
    { id: 4, name: 'Sarah Wanjiku' }
  ];
  
  // Available depots (mock data)
  const availableDepots = [
    'Nairobi Main Depot', 'Mombasa Depot', 'Kisumu Depot', 
    'Nakuru Depot', 'Eldoret Depot'
  ];
  
  // Available routes (mock data)
  const availableRoutes = [
    'Nairobi - Mombasa', 'Nairobi - Kisumu', 'Nairobi - Nakuru',
    'Nairobi - Eldoret', 'Mombasa - Nairobi'
  ];
  
  // Shift options
  const shiftOptions = [
    'Morning (6AM - 2PM)',
    'Afternoon (2PM - 10PM)',
    'Night (10PM - 6AM)',
    'Full Day'
  ];
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle array fields
  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  
  // Add availability schedule
  const addAvailabilitySchedule = () => {
    if (availabilityScheduleInput.day && availabilityScheduleInput.shift) {
      const schedule = `${availabilityScheduleInput.day} - ${availabilityScheduleInput.shift}`;
      if (!formData.availabilitySchedule.includes(schedule)) {
        setFormData(prev => ({
          ...prev,
          availabilitySchedule: [...prev.availabilitySchedule, schedule]
        }));
        setAvailabilityScheduleInput({ day: '', shift: '' });
      } else {
        toast.error('This schedule already exists');
      }
    } else {
      toast.error('Please select both day and shift');
    }
  };
  
  // Remove availability schedule
  const removeAvailabilitySchedule = (schedule) => {
    setFormData(prev => ({
      ...prev,
      availabilitySchedule: prev.availabilitySchedule.filter(s => s !== schedule)
    }));
  };
  
  // Handle file upload
  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    
    for (const file of files) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid file type`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 5MB`);
        continue;
      }
      validFiles.push(file);
    }
    
    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], ...validFiles]
      }));
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  };
  
  // Remove uploaded file
  const removeFile = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };
  
  // Validate current step
  const validateStep = () => {
    const errors = {};
    
    if (currentStep === 1) {
      if (!formData.registrationNumber) errors.registrationNumber = 'Registration number is required';
      if (!formData.vehicleType) errors.vehicleType = 'Vehicle type is required';
      if (!formData.make) errors.make = 'Vehicle make is required';
      if (!formData.model) errors.model = 'Vehicle model is required';
      if (!formData.year) errors.year = 'Year of manufacture is required';
      if (!formData.chassisNumber) errors.chassisNumber = 'Chassis number (VIN) is required';
      if (!formData.engineNumber) errors.engineNumber = 'Engine number is required';
      if (!formData.fuelType) errors.fuelType = 'Fuel type is required';
    }
    
    if (currentStep === 2) {
      if (!formData.maxLoadCapacity) errors.maxLoadCapacity = 'Maximum load capacity is required';
      if (formData.hasRefrigeration && (!formData.refrigerationTempMin || !formData.refrigerationTempMax)) {
        errors.refrigeration = 'Temperature range is required for refrigerated vehicles';
      }
    }
    
    if (currentStep === 3) {
      if (!formData.ownerType) errors.ownerType = 'Owner type is required';
      if (!formData.assignedDepot) errors.assignedDepot = 'Assigned depot is required';
    }
    
    if (currentStep === 4) {
      if (!formData.insurancePolicyNo) errors.insurancePolicyNo = 'Insurance policy number is required';
      if (!formData.insuranceExpiry) errors.insuranceExpiry = 'Insurance expiry date is required';
      if (!formData.fitnessCertNo) errors.fitnessCertNo = 'Fitness certificate number is required';
      if (!formData.fitnessExpiry) errors.fitnessExpiry = 'Fitness certificate expiry date is required';
    }
    
    if (currentStep === 5) {
      if (!formData.currentMileage) errors.currentMileage = 'Current mileage is required';
      if (!formData.lastServiceDate) errors.lastServiceDate = 'Last service date is required';
      if (!formData.vehicleCondition) errors.vehicleCondition = 'Vehicle condition is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
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
        toast.success('Fleet vehicle added successfully!');
        // Reset form or redirect
        setCurrentStep(1);
        // Reset form data here if needed
      }, 2000);
    } else {
      toast.error('Please complete all required fields');
    }
  };
  
  // Steps configuration
  const steps = [
    { number: 1, title: 'Basic Info', icon: Truck },
    { number: 2, title: 'Capacity', icon: Scale },
    { number: 3, title: 'Ownership', icon: Building },
    { number: 4, title: 'Compliance', icon: Shield },
    { number: 5, title: 'Maintenance', icon: Wrench },
    { number: 6, title: 'Operations', icon: Settings },
    { number: 7, title: 'Documents', icon: FileText },
    { number: 8, title: 'Review', icon: CheckCircle },
  ];
  
  // File upload component
  const FileUploadField = ({ label, type, icon: Icon, multiple = false, accept = "image/*,application/pdf" }) => (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-indigo-500 transition">
      <label className="cursor-pointer block">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
            <p className="text-xs text-gray-500">
              {formData[type].length > 0 
                ? `${formData[type].length} file(s) uploaded` 
                : `Click to upload (${multiple ? 'multiple' : 'single'} file, max 5MB each)`}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileUpload(e, type)}
          />
        </div>
      </label>
      {formData[type].length > 0 && (
        <div className="mt-3 space-y-1">
          {formData[type].map((file, index) => (
            <div key={index} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <span className="truncate flex-1">{file.name}</span>
              <button onClick={() => removeFile(type, index)} className="text-red-500 hover:text-red-700 ml-2">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Fleet Vehicle</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register a new vehicle to the fleet. Complete all steps to add the vehicle to inventory.
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm overflow-x-auto">
        <div className="flex items-center min-w-max">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2">
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
                  <div className={`w-16 h-0.5 rounded-full mx-2 ${
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
          {/* Step 1: Basic Vehicle Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Truck className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Vehicle Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Registration/Plate Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.registrationNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="KCA 123A"
                  />
                  {formErrors.registrationNumber && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.registrationNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    disabled={vehicleTypesLoading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 disabled:opacity-50"
                  >
                    <option value="">{vehicleTypesLoading ? 'Loading...' : 'Select vehicle type'}</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Make <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Toyota, Isuzu, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Hilux, Dyna, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="2020"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="White, Black, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Chassis Number (VIN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="chassisNumber"
                    value={formData.chassisNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Enter VIN"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Engine Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="engineNumber"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Enter engine number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    disabled={fuelTypesLoading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 disabled:opacity-50"
                  >
                    <option value="">{fuelTypesLoading ? 'Loading...' : 'Select fuel type'}</option>
                    {fuelTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Capacity & Dimensions */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Scale className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Capacity & Dimensions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Load Capacity <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="maxLoadCapacity"
                      value={formData.maxLoadCapacity}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="Enter capacity"
                    />
                    <select
                      name="loadCapacityUnit"
                      value={formData.loadCapacityUnit}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    >
                      <option value="kg">kg</option>
                      <option value="tonnes">Tonnes</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Volume Capacity (cubic metres)
                  </label>
                  <input
                    type="number"
                    name="volumeCapacity"
                    value={formData.volumeCapacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="e.g., 15 m³"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Number of Pallets
                  </label>
                  <input
                    type="number"
                    name="palletCapacity"
                    value={formData.palletCapacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Number of pallets"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasRefrigeration"
                      checked={formData.hasRefrigeration}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Has Refrigeration Capability
                    </span>
                  </label>
                </div>
                
                {formData.hasRefrigeration && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Minimum Temperature
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="refrigerationTempMin"
                          value={formData.refrigerationTempMin}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          placeholder="Min temp"
                        />
                        <select
                          name="refrigerationTempUnit"
                          value={formData.refrigerationTempUnit}
                          onChange={handleInputChange}
                          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        >
                          <option value="celsius">°C</option>
                          <option value="fahrenheit">°F</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Maximum Temperature
                      </label>
                      <input
                        type="number"
                        name="refrigerationTempMax"
                        value={formData.refrigerationTempMax}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        placeholder="Max temp"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Ownership & Assignment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Building className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ownership & Assignment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Owner Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="ownerType"
                    value={formData.ownerType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select owner type</option>
                    <option value="company">Company-Owned</option>
                    <option value="leased">Leased</option>
                    <option value="owner-driver">Owner-Driver</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assigned Distributor/Depot <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignedDepot"
                    value={formData.assignedDepot}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select depot</option>
                    {availableDepots.map(depot => (
                      <option key={depot} value={depot}>{depot}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Driver
                  </label>
                  <select
                    name="primaryDriver"
                    value={formData.primaryDriver}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select primary driver</option>
                    {availableDrivers.map(driver => (
                      <option key={driver.id} value={driver.name}>{driver.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Backup Driver
                  </label>
                  <select
                    name="backupDriver"
                    value={formData.backupDriver}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select backup driver</option>
                    {availableDrivers.map(driver => (
                      <option key={driver.id} value={driver.name}>{driver.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assigned Route/Zone
                  </label>
                  <select
                    name="assignedRoute"
                    value={formData.assignedRoute}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select route</option>
                    {availableRoutes.map(route => (
                      <option key={route} value={route}>{route}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Assigned Zones */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assigned Delivery Zones
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
              </div>
            </div>
          )}
          
          {/* Step 4: Compliance & Documentation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance & Documentation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Policy Number <span className="text-red-500">*</span>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Road Tax Certificate Number
                  </label>
                  <input                    type="text"
                    name="roadTaxCertNo"
                    value={formData.roadTaxCertNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Certificate number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Road Tax Expiry Date
                  </label>
                  <input
                    type="date"
                    name="roadTaxExpiry"
                    value={formData.roadTaxExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fitness Certificate Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fitnessCertNo"
                    value={formData.fitnessCertNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Certificate number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fitness Certificate Expiry <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="fitnessExpiry"
                    value={formData.fitnessExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Speed Governor Certificate Number
                  </label>
                  <input
                    type="text"
                    name="speedGovernorCertNo"
                    value={formData.speedGovernorCertNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Certificate number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Speed Governor Expiry
                  </label>
                  <input
                    type="date"
                    name="speedGovernorExpiry"
                    value={formData.speedGovernorExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tracker/GPS Device ID
                  </label>
                  <input
                    type="text"
                    name="trackerDeviceId"
                    value={formData.trackerDeviceId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Device ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Police Clearance Number
                  </label>
                  <input
                    type="text"
                    name="policeClearanceNo"
                    value={formData.policeClearanceNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Clearance number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Police Clearance Expiry
                  </label>
                  <input
                    type="date"
                    name="policeClearanceExpiry"
                    value={formData.policeClearanceExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: Maintenance & Condition */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Wrench className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance & Condition</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Mileage/Odometer <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="currentMileage"
                      value={formData.currentMileage}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="Enter mileage"
                    />
                    <select
                      name="mileageUnit"
                      value={formData.mileageUnit}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    >
                      <option value="km">km</option>
                      <option value="miles">miles</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Service Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="lastServiceDate"
                    value={formData.lastServiceDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Service Mileage
                  </label>
                  <input
                    type="number"
                    name="lastServiceMileage"
                    value={formData.lastServiceMileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Mileage at last service"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Next Service Due Date
                  </label>
                  <input
                    type="date"
                    name="nextServiceDue"
                    value={formData.nextServiceDue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Next Service Mileage
                  </label>
                  <input
                    type="number"
                    name="nextServiceMileage"
                    value={formData.nextServiceMileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Mileage for next service"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tyre Condition
                  </label>
                  <select
                    name="tyreCondition"
                    value={formData.tyreCondition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select condition</option>
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tyre Last Replacement Date
                  </label>
                  <input
                    type="date"
                    name="tyreLastReplacement"
                    value={formData.tyreLastReplacement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tyre Replacement Mileage
                  </label>
                  <input
                    type="number"
                    name="tyreReplacementMileage"
                    value={formData.tyreReplacementMileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Mileage at replacement"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleCondition"
                    value={formData.vehicleCondition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Condition Notes
                  </label>
                  <textarea
                    name="conditionNotes"
                    value={formData.conditionNotes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Any additional notes about vehicle condition"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 6: Operational Settings */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Settings className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Operational Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tracking Provider
                  </label>
                  <select
                    name="trackingProvider"
                    value={formData.trackingProvider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select provider</option>
                    <option value="ctrack">Ctrack</option>
                    <option value="mix">MiX Telematics</option>
                    <option value="cartrack">Cartrack</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fuel Card Number
                  </label>
                  <input
                    type="text"
                    name="fuelCardNumber"
                    value={formData.fuelCardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="Fuel card number"
                  />
                </div>
              </div>
              
              {/* Availability Schedule */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Availability Schedule
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.availabilitySchedule.map((schedule, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                    >
                      {schedule}
                      <button
                        onClick={() => removeAvailabilitySchedule(schedule)}
                        className="hover:text-red-500 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={availabilityScheduleInput.day}
                    onChange={(e) => setAvailabilityScheduleInput({ ...availabilityScheduleInput, day: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  
                  <select
                    value={availabilityScheduleInput.shift}
                    onChange={(e) => setAvailabilityScheduleInput({ ...availabilityScheduleInput, shift: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select shift</option>
                    {shiftOptions.map(shift => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={addAvailabilitySchedule}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 7: Documents */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notes & Attachments</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  label="Vehicle Photos (Front, Back, Sides)"
                  type="vehiclePhotos"
                  icon={Camera}
                  multiple={true}
                  accept="image/*"
                />
                
                <FileUploadField
                  label="Documents (Insurance, Road Tax, etc.)"
                  type="documents"
                  icon={FileText}
                  multiple={true}
                  accept="application/pdf,image/*"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  General Notes/Remarks
                </label>
                <textarea
                  name="generalNotes"
                  value={formData.generalNotes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  placeholder="Any additional notes about the vehicle..."
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Document Requirements:</p>
                    <ul className="text-xs text-blue-700 dark:text-blue-400 mt-1 space-y-1 list-disc list-inside">
                      <li>All documents must be clear and readable</li>
                      <li>Accepted formats: JPG, PNG, PDF</li>
                      <li>Maximum file size: 5MB per document</li>
                      <li>Please ensure all photos show the vehicle from all angles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 8: Review */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review & Confirm</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Registration:</span> {formData.registrationNumber}</div>
                    <div><span className="text-gray-500">Type:</span> {formData.vehicleType}</div>
                    <div><span className="text-gray-500">Make/Model:</span> {formData.make} {formData.model}</div>
                    <div><span className="text-gray-500">Year:</span> {formData.year}</div>
                    <div><span className="text-gray-500">Chassis:</span> {formData.chassisNumber}</div>
                    <div><span className="text-gray-500">Engine:</span> {formData.engineNumber}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Capacity</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Load Capacity:</span> {formData.maxLoadCapacity} {formData.loadCapacityUnit}</div>
                    <div><span className="text-gray-500">Volume:</span> {formData.volumeCapacity} m³</div>
                    <div><span className="text-gray-500">Pallets:</span> {formData.palletCapacity}</div>
                    <div><span className="text-gray-500">Refrigeration:</span> {formData.hasRefrigeration ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Compliance</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Insurance:</span> {formData.insurancePolicyNo}</div>
                    <div><span className="text-gray-500">Insurance Expiry:</span> {formData.insuranceExpiry}</div>
                    <div><span className="text-gray-500">Fitness Cert:</span> {formData.fitnessCertNo}</div>
                    <div><span className="text-gray-500">Fitness Expiry:</span> {formData.fitnessExpiry}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Assigned Zones</h3>
                  <div className="flex flex-wrap gap-1">
                    {formData.assignedZones.map(zone => (
                      <span key={zone} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{zone}</span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Attachments</h3>
                  <div className="text-sm">
                    <div>Vehicle Photos: {formData.vehiclePhotos.length} file(s)</div>
                    <div>Documents: {formData.documents.length} file(s)</div>
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
          
          {currentStep < 8 ? (
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
                  Adding Vehicle...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Add Vehicle to Fleet
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
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Vehicle Registration Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Registration:</span> {formData.registrationNumber}</div>
                    <div><span className="text-gray-500">Vehicle Type:</span> {formData.vehicleType}</div>
                    <div><span className="text-gray-500">Make/Model:</span> {formData.make} {formData.model}</div>
                    <div><span className="text-gray-500">Year:</span> {formData.year}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Assignment</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Depot:</span> {formData.assignedDepot}</div>
                    <div><span className="text-gray-500">Primary Driver:</span> {formData.primaryDriver || 'Not assigned'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Status</h4>
                  <div className="text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      formData.status === 'active' ? 'bg-green-100 text-green-700' :
                      formData.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {formData.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}