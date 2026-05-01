import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {
  ArrowLeft, Save, X, MapPin, Navigation, Clock, Calendar,
  Package, Users, Phone, Mail, Truck, AlertCircle, CheckCircle,
  Plus, Minus, Map, Building2, Store, Warehouse, ShoppingBag,
  Home, Globe, Lock, Key, Info, ChevronDown, ChevronUp,
  Clock as ClockIcon, Calendar as CalendarIcon, Phone as PhoneIcon,
  Mail as MailIcon, User, Car, Bike, Anchor, AlertTriangle,
  FileText, Image, Upload, RefreshCw, Eye, Edit, Trash2,
  Shield, Award, Target, TrendingUp, Percent, DollarSign,
  Crosshair, MapPin as MapPinIcon, Layers, Maximize2,
  ArrowRight,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const buildSelectStyles = (hasError = false) => {
  const dark = document.documentElement.classList.contains('dark');
  const border = hasError ? '#EF4444' : dark ? '#4B5563' : '#D1D5DB';
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: dark ? '#374151' : 'white',
      borderColor: hasError ? '#EF4444' : state.isFocused ? '#6366f1' : border,
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99,102,241,0.2)' : 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      minHeight: '38px',
      '&:hover': { borderColor: hasError ? '#EF4444' : '#6366f1' },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: dark ? '#374151' : 'white',
      border: `1px solid ${dark ? '#4B5563' : '#E5E7EB'}`,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.15)',
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#6366f1'
        : state.isFocused
        ? dark ? '#4B5563' : '#EEF2FF'
        : 'transparent',
      color: state.isSelected ? 'white' : dark ? '#D1D5DB' : '#374151',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:active': { backgroundColor: '#6366f1' },
    }),
    singleValue: (base) => ({ ...base, color: dark ? '#D1D5DB' : '#374151' }),
    placeholder: (base) => ({ ...base, color: '#9CA3AF' }),
    input: (base) => ({ ...base, color: dark ? '#D1D5DB' : '#374151' }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: dark ? '#3730A3' : '#EEF2FF',
      borderRadius: '9999px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: dark ? '#C7D2FE' : '#4338CA',
      fontSize: '0.75rem',
      paddingLeft: '8px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: dark ? '#C7D2FE' : '#4338CA',
      borderRadius: '0 9999px 9999px 0',
      '&:hover': { backgroundColor: '#EF4444', color: 'white' },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: dark ? '#4B5563' : '#E5E7EB',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#9CA3AF',
      '&:hover': { color: '#6366f1' },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#9CA3AF',
      '&:hover': { color: '#EF4444' },
    }),
    valueContainer: (base) => ({ ...base, padding: '2px 8px' }),
  };
};

// OpenStreetMap Component
const LocationPicker = ({ onLocationSelect, initialLat, initialLng, address, onAddressUpdate }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [searchQuery, setSearchQuery] = useState(address || '');
  const [isSearching, setIsSearching] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: -1.2921, lng: 36.8219 }); // Nairobi default
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Check if Leaflet is already loaded
      if (window.L) {
        initMap();
        return;
      }

      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      const L = window.L;
      
      // Set initial view
      const initialView = (initialLat && initialLng) 
        ? [parseFloat(initialLat), parseFloat(initialLng)]
        : [currentLocation.lat, currentLocation.lng];

      map.current = L.map(mapContainer.current).setView(initialView, 15);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Add marker
      marker.current = L.marker(initialView, { draggable: true }).addTo(map.current);
      
      marker.current.on('dragend', (e) => {
        const position = e.target.getLatLng();
        const lat = position.lat.toFixed(6);
        const lng = position.lng.toFixed(6);
        onLocationSelect(lat, lng);
        reverseGeocode(lat, lng);
      });

      map.current.on('click', (e) => {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        marker.current.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
        reverseGeocode(lat, lng);
      });

      setMapLoaded(true);
    };

    loadLeaflet();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map view when initial coordinates change
  useEffect(() => {
    if (map.current && initialLat && initialLng) {
      const newView = [parseFloat(initialLat), parseFloat(initialLng)];
      map.current.setView(newView, 15);
      if (marker.current) {
        marker.current.setLatLng(newView);
      }
    }
  }, [initialLat, initialLng]);

  // Reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        onAddressUpdate(data.display_name);
        setSearchQuery(data.display_name);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  // Forward geocoding function
  const searchLocation = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter an address to search');
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat).toFixed(6);
        const lng = parseFloat(data[0].lon).toFixed(6);
        
        map.current.setView([lat, lng], 18);
        marker.current.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
        
        toast.success('Location found on map');
      } else {
        toast.error('Location not found. Please try a different address');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Error searching for location');
    } finally {
      setIsSearching(false);
    }
  };

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        
        setCurrentLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        map.current.setView([lat, lng], 18);
        marker.current.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
        reverseGeocode(lat, lng);
        
        toast.success('Current location captured');
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Please allow location access to use this feature');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information is unavailable');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out');
            break;
          default:
            toast.error('An error occurred while getting location');
        }
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            placeholder="Search for an address or place..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="button"
            onClick={searchLocation}
            disabled={isSearching}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition flex items-center gap-2"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </button>
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        >
          {isGettingLocation ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
          My Location
        </button>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100"
        style={{ minHeight: '384px' }}
      />

      {/* Instructions */}
      <div className="text-xs text-gray-500 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> Click map to place marker</span>
          <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Drag marker for precise location</span>
        </div>
        <span className="text-brand-600">Powered by OpenStreetMap</span>
      </div>
    </div>
  );
};

export default function AddStore() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [stepErrors, setStepErrors] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [formData, setFormData] = useState({
    // Core Identity
    name: '',
    code: '',
    type: '',
    status: 'active',
    priority: 'medium',
    
    // Location
    address: '',
    latitude: '',
    longitude: '',
    plusCode: '',
    what3words: '',
    mapVerified: false,
    locationMethod: '', // 'coordinates', 'map', 'current'
    
    // Operating Hours
    operatingHours: {
      monday: { open: '08:00', close: '20:00', closed: false },
      tuesday: { open: '08:00', close: '20:00', closed: false },
      wednesday: { open: '08:00', close: '20:00', closed: false },
      thursday: { open: '08:00', close: '20:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: true }
    },
    holidaySchedule: [],
    pickupCutoffTime: '14:00',
    sameDayCutoffTime: '12:00',
    daysOfOperation: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    
    // Operational Capacity
    maxOrdersPerDay: '',
    maxVehiclesAtTime: '',
    storageCapacity: '',
    storageCapacityUnit: 'sqft',
    handlingCapabilities: [],
    
    // Contact & Handover Details
    primaryContact: '',
    primaryPhone: '',
    secondaryPhone: '',
    primaryEmail: '',
    secondaryEmail: '',
    emergencyContact: '',
    emergencyPhone: '',
    handoverInstructions: '',
    specialAccessNotes: '',
    gateCode: '',
    parkingRestrictions: '',
    securityClearance: '',
    
    // Logistics Constraints
    supportedVehicleTypes: [],
    hasLoadingDock: false,
    loadingDockCount: 0,
    loadingDockType: '',
    averageLoadingTime: 15,
    averageUnloadingTime: 15,
    parkingSituation: '',
    accessibilityNotes: '',
    
    // Store Performance Metrics
    averageOrderValue: '',
    monthlyOrders: '',
    onTimeDeliveryRate: '',
    returnRate: '',
    rating: '',
    
    // Relationships & Coverage
    serviceZones: [],
    coverageRadius: '',
    linkedWarehouses: [],
    parentChain: '',
    preferredDeliveryTime: '',
    peakHours: [],
    
    // Documents & Attachments
    storePhotos: [],
    documents: [],
    floorPlan: [],
    loadingBayPhoto: [],
    
    generalNotes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [holidayInput, setHolidayInput] = useState({ date: '', name: '' });
  const [peakHourInput, setPeakHourInput] = useState({ start: '', end: '' });

  // Form Options
  const storeTypes = [
    { value: 'warehouse', label: 'Warehouse', icon: Warehouse },
    { value: 'retail_store', label: 'Retail Store', icon: Store },
    { value: 'dark_store', label: 'Dark Store', icon: Building2 },
    { value: 'collection_point', label: 'Collection Point', icon: Package },
    { value: 'distribution_hub', label: 'Distribution Hub', icon: Home }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const handlingOptions = [
    { value: 'fragile', label: 'Fragile Items' },
    { value: 'frozen', label: 'Frozen Goods' },
    { value: 'oversized', label: 'Oversized Items' },
    { value: 'hazardous', label: 'Hazardous Materials' },
    { value: 'perishable', label: 'Perishable Goods' },
    { value: 'high_value', label: 'High Value Items' }
  ];

  const vehicleTypes = [
    { value: 'bicycle', label: 'Bicycle', icon: Bike },
    { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
    { value: 'van', label: 'Van', icon: Truck },
    { value: 'truck_small', label: 'Small Truck (3-5 tons)', icon: Truck },
    { value: 'truck_large', label: 'Large Truck (5-10 tons)', icon: Truck },
    { value: 'refrigerated', label: 'Refrigerated Vehicle', icon: Truck }
  ];

  const loadingDockTypes = [
    { value: 'ground', label: 'Ground Level' },
    { value: 'raised', label: 'Raised Dock' },
    { value: 'drive_in', label: 'Drive-In' },
    { value: 'leveler', label: 'Dock Leveler' }
  ];

  const parkingOptions = [
    { value: 'ample', label: 'Ample parking available' },
    { value: 'limited', label: 'Limited parking' },
    { value: 'street_only', label: 'Street parking only' },
    { value: 'paid', label: 'Paid parking required' },
    { value: 'no_parking', label: 'No parking available' }
  ];

  const storageCapacityUnits = [
    { value: 'sqft', label: 'Square Feet (sq ft)' },
    { value: 'sqm', label: 'Square Meters (m²)' },
    { value: 'cubic_ft', label: 'Cubic Feet (ft³)' },
    { value: 'cubic_m', label: 'Cubic Meters (m³)' }
  ];

  const serviceZoneOptions = [
    'Nairobi CBD', 'Westlands', 'Karen', 'Langata', 'Kilimani',
    'Eastlands', 'South B', 'South C', 'Industrial Area', 'Thika Road',
    'Kiambu Road', 'Ngong Road', 'Juja Road', 'Mombasa Road', 'Waiyaki Way'
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const steps = [
    { number: 1, title: 'Core Identity', icon: Building2 },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Operating Hours', icon: Clock },
    { number: 4, title: 'Capacity & Handling', icon: Package },
    { number: 5, title: 'Contact & Access', icon: Users },
    { number: 6, title: 'Logistics', icon: Truck },
    { number: 7, title: 'Performance', icon: Target },
    { number: 8, title: 'Relationships', icon: Globe },
    { number: 9, title: 'Documents', icon: FileText },
    { number: 10, title: 'Review', icon: CheckCircle }
  ];

  const sel = (opts, val) => opts.find(o => o.value === val) || null;
  const getIcon = (value, options) => {
    const option = options.find(o => o.value === value);
    return option?.icon;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : '' }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleMultiSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.map(s => s.value) : [] }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: { ...prev.operatingHours[day], [field]: value }
      }
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      daysOfOperation: prev.daysOfOperation.includes(day)
        ? prev.daysOfOperation.filter(d => d !== day)
        : [...prev.daysOfOperation, day]
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const addHoliday = () => {
    if (holidayInput.date && holidayInput.name) {
      const holiday = `${holidayInput.date} - ${holidayInput.name}`;
      if (!formData.holidaySchedule.includes(holiday)) {
        setFormData(prev => ({ ...prev, holidaySchedule: [...prev.holidaySchedule, holiday] }));
        setHolidayInput({ date: '', name: '' });
        toast.success('Holiday added');
      } else {
        toast.error('This holiday already exists');
      }
    } else {
      toast.error('Please enter both date and holiday name');
    }
  };

  const removeHoliday = (holiday) => {
    setFormData(prev => ({ ...prev, holidaySchedule: prev.holidaySchedule.filter(h => h !== holiday) }));
  };

  const addPeakHour = () => {
    if (peakHourInput.start && peakHourInput.end) {
      const peakHour = `${peakHourInput.start} - ${peakHourInput.end}`;
      if (!formData.peakHours.includes(peakHour)) {
        setFormData(prev => ({ ...prev, peakHours: [...prev.peakHours, peakHour] }));
        setPeakHourInput({ start: '', end: '' });
        toast.success('Peak hour added');
      } else {
        toast.error('This peak hour already exists');
      }
    } else {
      toast.error('Please enter both start and end times');
    }
  };

  const removePeakHour = (peakHour) => {
    setFormData(prev => ({ ...prev, peakHours: prev.peakHours.filter(ph => ph !== peakHour) }));
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      mapVerified: true,
      locationMethod: 'map'
    }));
  };

  const handleAddressUpdate = (address) => {
    setFormData(prev => ({
      ...prev,
      address: address
    }));
  };

  const validateStep = () => {
    const errors = {};
    
    if (currentStep === 1) {
      if (!formData.name) errors.name = 'Store name is required';
      if (!formData.code) errors.code = 'Store code is required';
      if (!formData.type) errors.type = 'Store type is required';
    }
    
    if (currentStep === 2) {
      if (!formData.address) errors.address = 'Physical address is required';
      if (!formData.latitude || !formData.longitude) {
        errors.location = 'Please select location using map, coordinates, or current location';
      }
    }
    
    if (currentStep === 3) {
      if (!formData.pickupCutoffTime) errors.pickupCutoffTime = 'Pickup cutoff time is required';
    }
    
    if (currentStep === 5) {
      if (!formData.primaryContact) errors.primaryContact = 'Primary contact person is required';
      if (!formData.primaryPhone) errors.primaryPhone = 'Primary phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStepErrors([]);
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const errorMessages = Object.values(formErrors);
      setStepErrors(errorMessages);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStepErrors([]);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      const errorMessages = Object.values(formErrors);
      setStepErrors(errorMessages);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setStepErrors([]);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Store added successfully!');
      navigate('/fleet/stores-management');
    } catch (err) {
      setStepErrors([err.message || 'An error occurred. Please try again.']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // File upload handlers
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
      setFormData(prev => ({ ...prev, [type]: [...prev[type], ...validFiles] }));
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  };

  const removeFile = (type, index) => {
    setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const FileUploadField = ({ label, type, icon, multiple = false, accept = "image/*,application/pdf" }) => {
    const FieldIcon = icon;
    return (
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-brand-500 transition">
        <label className="cursor-pointer block">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FieldIcon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
              <p className="text-xs text-gray-500">
                {formData[type]?.length > 0
                  ? `${formData[type].length} file(s) uploaded`
                  : `Click to upload (${multiple ? 'multiple' : 'single'} file, max 5MB each)`}
              </p>
            </div>
            <input type="file" className="hidden" accept={accept} multiple={multiple} onChange={(e) => handleFileUpload(e, type)} />
          </div>
        </label>
        {formData[type]?.length > 0 && (
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Store</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register a new store or pickup location to the fleet management system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/fleet/stores-management')}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
          >
            <Eye className="w-4 h-4 mr-1 inline" />
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted ? 'bg-green-500 text-white'
                      : isCurrent ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-900/30'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium ${isCurrent ? 'text-brand-600' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 h-0.5 rounded-full mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="p-6">
          {/* Error Card */}
          {stepErrors.length > 0 && (
            <div className="mb-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
                    Please fix the following errors before continuing:
                  </p>
                  <ul className="space-y-1">
                    {stepErrors.map((err, i) => (
                      <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setStepErrors([])}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-300 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Core Identity */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Building2 className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Core Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Store/Branch Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g., Sarit Centre Branch"
                  />
                  {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Store Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 font-mono ${
                      formErrors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g., STR-001"
                  />
                  {formErrors.code && <p className="text-xs text-red-500 mt-1">{formErrors.code}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Store Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={storeTypes}
                    value={sel(storeTypes, formData.type)}
                    onChange={handleSelectChange('type')}
                    placeholder="Select store type"
                    styles={buildSelectStyles(!!formErrors.type)}
                  />
                  {formErrors.type && <p className="text-xs text-red-500 mt-1">{formErrors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <Select
                    options={statusOptions}
                    value={sel(statusOptions, formData.status)}
                    onChange={handleSelectChange('status')}
                    styles={buildSelectStyles()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority Level
                  </label>
                  <Select
                    options={priorityOptions}
                    value={sel(priorityOptions, formData.priority)}
                    onChange={handleSelectChange('priority')}
                    styles={buildSelectStyles()}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location with Map Integration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <MapPin className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h2>
              </div>

              <div className="space-y-4">
                {/* Location Input Methods */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Physical Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                        formErrors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Street, city, region, postal code, country"
                    />
                    {formErrors.address && <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>}
                  </div>

                  {/* Coordinates Input */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Latitude
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                        placeholder="-1.2921"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Longitude
                      </label>
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                        placeholder="36.8219"
                      />
                    </div>
                  </div>

                  {/* OpenStreetMap Picker */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      className="flex items-center gap-2 text-brand-600 hover:text-brand-700 text-sm font-medium"
                    >
                      <Map className="w-4 h-4" />
                      {showLocationPicker ? 'Hide Map Picker' : 'Show Map Picker'}
                    </button>
                    
                    {showLocationPicker && (
                      <div className="mt-3">
                        <LocationPicker
                          onLocationSelect={handleLocationSelect}
                          onAddressUpdate={handleAddressUpdate}
                          initialLat={formData.latitude}
                          initialLng={formData.longitude}
                          address={formData.address}
                        />
                      </div>
                    )}
                  </div>

                  {/* Map Verification Status */}
                  {formData.mapVerified && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 dark:text-green-400">
                        Location verified on map - {formData.locationMethod === 'current' ? 'Current location' : formData.locationMethod === 'map' ? 'Map selection' : 'Coordinates entered'}
                      </span>
                    </div>
                  )}

                  {/* Plus Code & What3Words */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Plus Code
                      </label>
                      <input
                        type="text"
                        name="plusCode"
                        value={formData.plusCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 font-mono text-sm"
                        placeholder="5G4X+5J Nairobi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        What3Words
                      </label>
                      <input
                        type="text"
                        name="what3words"
                        value={formData.what3words}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 font-mono text-sm"
                        placeholder="///example.address.here"
                      />
                    </div>
                  </div>

                  {/* Important Note */}
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Important Note</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">
                          Coordinates should be manually verified on the map to ensure accuracy. Use the map picker above to confirm the exact location.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Operating Hours */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Clock className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Operating Hours</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Days of Operation
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = formData.daysOfOperation.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => handleDayToggle(day.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                            isSelected
                              ? 'bg-brand-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Operating Hours</h3>
                  {daysOfWeek.map((day) => (
                    <div key={day.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <div className="w-24">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{day.label}</span>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!formData.operatingHours[day.id].closed}
                            onChange={(e) => handleOperatingHoursChange(day.id, 'closed', !e.target.checked)}
                            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Open</span>
                        </label>
                        {!formData.operatingHours[day.id].closed && (
                          <>
                            <input
                              type="time"
                              value={formData.operatingHours[day.id].open}
                              onChange={(e) => handleOperatingHoursChange(day.id, 'open', e.target.value)}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={formData.operatingHours[day.id].close}
                              onChange={(e) => handleOperatingHoursChange(day.id, 'close', e.target.value)}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pickup Cutoff Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="pickupCutoffTime"
                      value={formData.pickupCutoffTime}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 ${
                        formErrors.pickupCutoffTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    <p className="text-xs text-gray-500 mt-1">Latest time for same-day order pickup</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Same-Day Dispatch Cutoff
                    </label>
                    <input
                      type="time"
                      name="sameDayCutoffTime"
                      value={formData.sameDayCutoffTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    />
                  </div>
                </div>

                {/* Holiday Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Holiday Schedule (Exceptions)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.holidaySchedule.map((holiday, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm"
                      >
                        {holiday}
                        <button onClick={() => removeHoliday(holiday)} className="hover:text-red-500 ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={holidayInput.date}
                      onChange={(e) => setHolidayInput(prev => ({ ...prev, date: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      value={holidayInput.name}
                      onChange={(e) => setHolidayInput(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Holiday name"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    />
                    <button
                      onClick={addHoliday}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Capacity & Handling */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Package className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Capacity & Handling</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Orders Per Day
                  </label>
                  <input
                    type="number"
                    name="maxOrdersPerDay"
                    value={formData.maxOrdersPerDay}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., 200"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum daily order processing capacity</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Vehicles At One Time
                  </label>
                  <input
                    type="number"
                    name="maxVehiclesAtTime"
                    value={formData.maxVehiclesAtTime}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., 10"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum concurrent vehicles the location can handle</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Storage Capacity
                  </label>
                  <input
                    type="number"
                    name="storageCapacity"
                    value={formData.storageCapacity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Storage Capacity Unit
                  </label>
                  <Select
                    options={storageCapacityUnits}
                    value={sel(storageCapacityUnits, formData.storageCapacityUnit)}
                    onChange={handleSelectChange('storageCapacityUnit')}
                    styles={buildSelectStyles()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Handling Capabilities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {handlingOptions.map((option) => {
                    const isSelected = formData.handlingCapabilities.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleArrayToggle('handlingCapabilities', option.value)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition ${
                          isSelected
                            ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500 text-brand-700 dark:text-brand-400'
                            : 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-brand-400'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-brand-500 bg-brand-500' : 'border-gray-400'
                        }`}>
                          {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Contact & Access */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Users className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact & Access</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="primaryContact"
                    value={formData.primaryContact}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.primaryContact ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Full name"
                  />
                  {formErrors.primaryContact && <p className="text-xs text-red-500 mt-1">{formErrors.primaryContact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 ${
                      formErrors.primaryPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="+254 700 000 000"
                  />
                  {formErrors.primaryPhone && <p className="text-xs text-red-500 mt-1">{formErrors.primaryPhone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="tel"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="+254 700 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="contact@store.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="backup@store.com"
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="Emergency contact person"
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="+254 700 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gate / Access Code
                  </label>
                  <input
                    type="text"
                    name="gateCode"
                    value={formData.gateCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 font-mono"
                    placeholder="e.g., 1234#"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Handover Instructions
                </label>
                <textarea
                  name="handoverInstructions"
                  value={formData.handoverInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  placeholder="Instructions for drivers on how to hand over/collect orders..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Access Notes
                </label>
                <textarea
                  name="specialAccessNotes"
                  value={formData.specialAccessNotes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  placeholder="Any special access requirements, security procedures..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Parking Restrictions
                  </label>
                  <input
                    type="text"
                    name="parkingRestrictions"
                    value={formData.parkingRestrictions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., No parking between 8am-10am"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Security Clearance Required
                  </label>
                  <input
                    type="text"
                    name="securityClearance"
                    value={formData.securityClearance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., Government-issued ID required"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Logistics */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Truck className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Logistics Constraints</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Supported Vehicle Types
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicleTypes.map((vehicle) => {
                    const VehicleIcon = vehicle.icon;
                    const isSelected = formData.supportedVehicleTypes.includes(vehicle.value);
                    return (
                      <button
                        key={vehicle.value}
                        type="button"
                        onClick={() => handleArrayToggle('supportedVehicleTypes', vehicle.value)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition ${
                          isSelected
                            ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500 text-brand-700 dark:text-brand-400'
                            : 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-brand-400'
                        }`}
                      >
                        <VehicleIcon className="w-4 h-4 flex-shrink-0" />
                        {vehicle.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <input
                    type="checkbox"
                    id="hasLoadingDock"
                    name="hasLoadingDock"
                    checked={formData.hasLoadingDock}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="hasLoadingDock" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    Has Loading Dock
                  </label>
                </div>

                {formData.hasLoadingDock && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Loading Docks
                      </label>
                      <input
                        type="number"
                        name="loadingDockCount"
                        value={formData.loadingDockCount}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loading Dock Type
                      </label>
                      <Select
                        options={loadingDockTypes}
                        value={sel(loadingDockTypes, formData.loadingDockType)}
                        onChange={handleSelectChange('loadingDockType')}
                        styles={buildSelectStyles()}
                        placeholder="Select dock type"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Average Loading Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="averageLoadingTime"
                    value={formData.averageLoadingTime}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Average Unloading Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="averageUnloadingTime"
                    value={formData.averageUnloadingTime}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Parking Situation
                  </label>
                  <Select
                    options={parkingOptions}
                    value={sel(parkingOptions, formData.parkingSituation)}
                    onChange={handleSelectChange('parkingSituation')}
                    styles={buildSelectStyles()}
                    placeholder="Select parking situation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Accessibility Notes
                </label>
                <textarea
                  name="accessibilityNotes"
                  value={formData.accessibilityNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  placeholder="Any accessibility constraints for drivers, e.g. height restrictions, narrow roads..."
                />
              </div>
            </div>
          )}

          {/* Step 7: Performance */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Target className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h2>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    These metrics help us optimize routing and delivery planning. Leave blank if not yet known.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Average Order Value (KES)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="averageOrderValue"
                      value={formData.averageOrderValue}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      placeholder="e.g., 2500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Monthly Orders
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="monthlyOrders"
                      value={formData.monthlyOrders}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      placeholder="e.g., 1200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    On-Time Delivery Rate (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="onTimeDeliveryRate"
                      value={formData.onTimeDeliveryRate}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      placeholder="e.g., 95"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Return Rate (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="returnRate"
                      value={formData.returnRate}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Store Rating (1-5)
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                      placeholder="e.g., 4.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Relationships & Coverage */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Globe className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Relationships & Coverage</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Service Zones
                  </label>
                  <Select
                    isMulti
                    options={serviceZoneOptions.map(z => ({ value: z, label: z }))}
                    value={formData.serviceZones.map(z => ({ value: z, label: z }))}
                    onChange={handleMultiSelectChange('serviceZones')}
                    styles={buildSelectStyles()}
                    placeholder="Select service zones..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Areas this store can serve or receive deliveries from</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coverage Radius (km)
                  </label>
                  <input
                    type="number"
                    name="coverageRadius"
                    value={formData.coverageRadius}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., 15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Parent Chain / Brand
                  </label>
                  <input
                    type="text"
                    name="parentChain"
                    value={formData.parentChain}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                    placeholder="e.g., Naivas, Carrefour"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Delivery Time
                  </label>
                  <input
                    type="time"
                    name="preferredDeliveryTime"
                    value={formData.preferredDeliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peak Hours
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.peakHours.map((ph, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                    >
                      {ph}
                      <button onClick={() => removePeakHour(ph)} className="hover:text-red-500 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={peakHourInput.start}
                    onChange={(e) => setPeakHourInput(prev => ({ ...prev, start: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  />
                  <span className="flex items-center text-gray-500 text-sm">to</span>
                  <input
                    type="time"
                    value={peakHourInput.end}
                    onChange={(e) => setPeakHourInput(prev => ({ ...prev, end: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  />
                  <button
                    onClick={addPeakHour}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 9: Documents */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <FileText className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents & Attachments</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FileUploadField label="Store Photos" type="storePhotos" icon={Image} multiple accept="image/*" />
                <FileUploadField label="Documents (Licenses, Permits)" type="documents" icon={FileText} multiple accept="image/*,application/pdf" />
                <FileUploadField label="Floor Plan" type="floorPlan" icon={Layers} accept="image/*,application/pdf" />
                <FileUploadField label="Loading Bay Photo" type="loadingBayPhoto" icon={Upload} accept="image/*" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  General Notes
                </label>
                <textarea
                  name="generalNotes"
                  value={formData.generalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                  placeholder="Any additional notes about this store..."
                />
              </div>
            </div>
          )}

          {/* Step 10: Review */}
          {currentStep === 10 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <CheckCircle className="w-6 h-6 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review & Submit</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-600" /> Core Identity
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Name:</span> <span className="text-gray-900 dark:text-white">{formData.name || '—'}</span></div>
                    <div><span className="text-gray-500">Code:</span> <span className="text-gray-900 dark:text-white font-mono">{formData.code || '—'}</span></div>
                    <div><span className="text-gray-500">Type:</span> <span className="text-gray-900 dark:text-white">{formData.type || '—'}</span></div>
                    <div><span className="text-gray-500">Status:</span> <span className="text-gray-900 dark:text-white capitalize">{formData.status}</span></div>
                    <div><span className="text-gray-500">Priority:</span> <span className="text-gray-900 dark:text-white capitalize">{formData.priority}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-600" /> Location
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Address:</span> <span className="text-gray-900 dark:text-white">{formData.address || '—'}</span></div>
                    <div><span className="text-gray-500">Coordinates:</span> <span className="text-gray-900 dark:text-white">{formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : '—'}</span></div>
                    <div><span className="text-gray-500">Map Verified:</span> <span className={formData.mapVerified ? 'text-green-600' : 'text-gray-500'}>{formData.mapVerified ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Package className="w-4 h-4 text-brand-600" /> Capacity & Handling
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Max Orders/Day:</span> <span className="text-gray-900 dark:text-white">{formData.maxOrdersPerDay || '—'}</span></div>
                    <div><span className="text-gray-500">Max Vehicles:</span> <span className="text-gray-900 dark:text-white">{formData.maxVehiclesAtTime || '—'}</span></div>
                    <div><span className="text-gray-500">Storage:</span> <span className="text-gray-900 dark:text-white">{formData.storageCapacity ? `${formData.storageCapacity} ${formData.storageCapacityUnit}` : '—'}</span></div>
                    <div><span className="text-gray-500">Capabilities:</span> <span className="text-gray-900 dark:text-white">{formData.handlingCapabilities.length > 0 ? formData.handlingCapabilities.join(', ') : '—'}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-600" /> Contact
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Contact:</span> <span className="text-gray-900 dark:text-white">{formData.primaryContact || '—'}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <span className="text-gray-900 dark:text-white">{formData.primaryPhone || '—'}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="text-gray-900 dark:text-white">{formData.primaryEmail || '—'}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-600" /> Logistics
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Vehicles:</span> <span className="text-gray-900 dark:text-white">{formData.supportedVehicleTypes.length > 0 ? formData.supportedVehicleTypes.join(', ') : '—'}</span></div>
                    <div><span className="text-gray-500">Loading Dock:</span> <span className="text-gray-900 dark:text-white">{formData.hasLoadingDock ? `Yes (${formData.loadingDockCount} docks)` : 'No'}</span></div>
                    <div><span className="text-gray-500">Parking:</span> <span className="text-gray-900 dark:text-white">{formData.parkingSituation || '—'}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-brand-600" /> Coverage
                  </h3>
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Service Zones:</span> <span className="text-gray-900 dark:text-white">{formData.serviceZones.length > 0 ? formData.serviceZones.join(', ') : '—'}</span></div>
                    <div><span className="text-gray-500">Coverage Radius:</span> <span className="text-gray-900 dark:text-white">{formData.coverageRadius ? `${formData.coverageRadius} km` : '—'}</span></div>
                    <div><span className="text-gray-500">Parent Chain:</span> <span className="text-gray-900 dark:text-white">{formData.parentChain || '—'}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-400">Ready to Submit</p>
                    <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                      Review the information above and click "Add Store" to complete the registration.
                    </p>
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

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition flex items-center gap-2"
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
                <><RefreshCw className="w-4 h-4 animate-spin" /> Adding Store...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Add Store</>
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
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Store Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Store Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Name:</span> {formData.name || 'Not set'}</div>
                    <div><span className="text-gray-500">Code:</span> {formData.code || 'Not set'}</div>
                    <div><span className="text-gray-500">Type:</span> {formData.type || 'Not set'}</div>
                    <div><span className="text-gray-500">Status:</span> {formData.status || 'Not set'}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                  <div className="text-sm">
                    <div><span className="text-gray-500">Address:</span> {formData.address || 'Not set'}</div>
                    <div><span className="text-gray-500">Coordinates:</span> {formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : 'Not set'}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h4>
                  <div className="text-sm">
                    <div><span className="text-gray-500">Primary Contact:</span> {formData.primaryContact || 'Not set'}</div>
                    <div><span className="text-gray-500">Phone:</span> {formData.primaryPhone || 'Not set'}</div>
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