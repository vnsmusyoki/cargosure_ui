import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Car, User, MapPin, Navigation, Clock, Battery,
  Gauge, Thermometer, Wifi, WifiOff, AlertTriangle, CheckCircle,
  Calendar, Phone, Mail, Star, Route, Activity, Zap, Shield,
  Fuel, TrendingUp, TrendingDown, BarChart3, Download,
  RefreshCw, Share2, Bell, Edit, Trash2, MoreVertical,
  Truck, Bike, Smartphone, Signal, Volume2, VolumeX, Wrench
} from 'lucide-react';  
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Mock vehicle data (would come from API in real app)
const mockVehicleData = {
  id: 1,
  registration: 'KCA 123A',
  type: 'Motorcycle',
  make: 'Honda',
  model: 'CB150',
  year: 2022,
  color: 'Red',
  status: 'active',
  vin: 'JH2PC400XK100123',
  engineNumber: 'PC40E-1234567',
  
  // Driver Information
  driver: {
    id: 1,
    name: 'James Mwangi',
    phone: '+254 712 345 678',
    email: 'james.mwangi@example.com',
    licenseNumber: 'B1234567',
    licenseExpiry: '2025-06-30',
    rating: 4.8,
    totalTrips: 342,
    joinedDate: '2023-01-15',
    avatar: null,
    emergencyContact: '+254 722 123 456',
    address: '123 Westlands, Nairobi',
    status: 'active'
  },
  
  // Tracker Information
  tracker: {
    deviceId: 'GT06-12345678',
    imei: '123456789012345',
    simNumber: '254712345678',
    lastSeen: '2024-03-15T14:30:00',
    batteryLevel: 85,
    signalStrength: 'good', // good, fair, poor
    online: true,
    firmwareVersion: 'v2.1.4',
    lastUpdate: '2 seconds ago',
    ignition: true,
    speed: 45, // km/h
    heading: 90, // degrees
    altitude: 1680, // meters
    satellites: 12
  },
  
  // Current Location
  currentLocation: {
    lat: -1.286389, // Nairobi coordinates
    lng: 36.817223,
    address: 'Mombasa Road, Nairobi, Kenya',
    timestamp: '2024-03-15T14:30:00',
    accuracy: 5, // meters
    speed: 45,
    heading: 90
  },
  
  // Assigned Routes
  assignedRoutes: [
    {
      id: 1,
      name: 'Morning Delivery Route',
      startPoint: { lat: -1.286389, lng: 36.817223, name: 'Warehouse - Industrial Area' },
      endPoint: { lat: -1.283333, lng: 36.816667, name: 'CBD - Kencom Bus Stop' },
      waypoints: [
        { lat: -1.284167, lng: 36.818333, name: 'Total Petrol Station' },
        { lat: -1.2825, lng: 36.8175, name: 'Hilton Hotel' }
      ],
      distance: 12.5, // km
      estimatedDuration: 45, // minutes
      status: 'active',
      startTime: '08:00 AM',
      endTime: '12:00 PM',
    
    },
    {
      id: 2,
      name: 'Afternoon Pickup Route',
      startPoint: { lat: -1.283333, lng: 36.816667, name: 'CBD - Kencom Bus Stop' },
      endPoint: { lat: -1.286389, lng: 36.817223, name: 'Warehouse - Industrial Area' },
      distance: 11.8,
      estimatedDuration: 40,
      status: 'pending',
      startTime: '02:00 PM',
      endTime: '06:00 PM'
    }
  ],
  
  // Current active route with progress
  currentRoute: {
    id: 1,
    name: 'Morning Delivery Route',
    progress: 65, // percentage
    currentWaypoint: 'Total Petrol Station',
    estimatedArrival: '10:45 AM',
    distanceRemaining: 4.2,
    timeRemaining: 15, // minutes
    polyline: [
      [-1.286389, 36.817223], // Start
      [-1.285556, 36.817778],
      [-1.284722, 36.818056],
      [-1.284167, 36.818333], // Waypoint
      [-1.283611, 36.8175],
      [-1.283333, 36.816667]  // End
    ]
  },
  
  // Vehicle Stats
  stats: {
    totalDistance: 12450,
    avgSpeed: 38,
    maxSpeed: 85,
    totalEngineHours: 342,
    fuelConsumed: 480,
    avgFuelEfficiency: 35,
    co2Emission: 1120,
    idleTime: 42,
    maintenanceCount: 3
  },
  
  // Recent Alerts
  recentAlerts: [
    { id: 1, type: 'speeding', message: 'Vehicle exceeded speed limit (85 km/h)', timestamp: '2024-03-15 10:30 AM', severity: 'warning' },
    { id: 2, type: 'idle', message: 'Vehicle idle for 15 minutes', timestamp: '2024-03-15 09:45 AM', severity: 'info' },
    { id: 3, type: 'geofence', message: 'Vehicle entered geofence zone', timestamp: '2024-03-15 08:30 AM', severity: 'info' }
  ],
  
  // Vehicle Specifications
  specifications: {
    fuelType: 'Petrol',
    fuelCapacity: 13.5,
    transmission: 'Manual',
    engineCC: 150,
    power: '12.4 HP @ 8500 rpm',
    torque: '12.8 Nm @ 6000 rpm',
    tires: '80/100-18 (Front), 100/90-18 (Rear)',
    brakes: 'Disc (Front & Rear)'
  },
  
  // Maintenance Records
  maintenanceHistory: [
    { date: '2024-02-15', type: 'Oil Change', cost: 'KES 2,500', mechanic: 'AutoCare', odometer: 12450 },
    { date: '2024-01-10', type: 'Tire Replacement', cost: 'KES 4,000', mechanic: 'QuickFix', odometer: 11900 }
  ],
  
  upcomingMaintenance: [
    { type: 'Oil Change', dueDate: '2024-03-15', daysRemaining: 0, odometerRemaining: 500 },
    { type: 'Brake Inspection', dueDate: '2024-03-20', daysRemaining: 5, odometerRemaining: 800 }
  ],
  
  // Geofences
  geofences: [
    { id: 1, name: 'Warehouse Zone', type: 'active', status: 'inside' },
    { id: 2, name: 'CBD Restricted Zone', type: 'restricted', status: 'outside' }
  ]
};

export default function VehicleDetails() {
  const [vehicle, setVehicle] = useState(mockVehicleData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tracking');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Leaflet map refs (DOM-based map similar to LiveTracking)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);
  const geofenceRefs = useRef([]);

  const updateMap = () => {
    if (!mapRef.current || !window.L) return;
    const L = window.L;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const v = vehicle;
    // Marker HTML
    const iconHtml = `
      <div class="relative">
        <div class="w-8 h-8 rounded-full ${v.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center shadow-lg border-2 border-white">
          ${v.type === 'Motorcycle' ? '🏍️' : v.type === 'Van' ? '🚐' : '🚚'}
        </div>
      </div>
    `;

    const customIcon = L.divIcon({ html: iconHtml, className: 'custom-marker', iconSize: [32, 32], popupAnchor: [0, -16] });

    const marker = L.marker([v.currentLocation.lat, v.currentLocation.lng], { icon: customIcon })
      .addTo(mapRef.current)
      .bindPopup(`<div class="p-2"><div class="font-bold">${v.registration}</div><div class="text-sm">Speed: ${v.currentLocation.speed} km/h</div><div class="text-sm">${v.currentLocation.address}</div></div>`);

    markersRef.current[v.id] = marker;

    // Polyline (route)
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }
    if (v.currentRoute && v.currentRoute.polyline && v.currentRoute.polyline.length) {
      polylineRef.current = L.polyline(v.currentRoute.polyline, { color: '#4F46E5', weight: 4, opacity: 0.8 }).addTo(mapRef.current);
      try {
        mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
      } catch (err) {
        mapRef.current.setView([v.currentLocation.lat, v.currentLocation.lng], 14);
      }
    } else {
      mapRef.current.setView([v.currentLocation.lat, v.currentLocation.lng], 14);
    }

    // Geofences
    geofenceRefs.current.forEach((g) => g.remove());
    geofenceRefs.current = [];
    (v.geofences || []).forEach((g) => {
      const circle = L.circle([v.currentLocation.lat - 0.002, v.currentLocation.lng - 0.001], {
        radius: 200,
        color: g.type === 'restricted' ? '#EF4444' : '#10B981',
        fillColor: g.type === 'restricted' ? '#EF4444' : '#10B981',
        fillOpacity: 0.1,
      }).addTo(mapRef.current);
      circle.bindPopup(g.name);
      geofenceRefs.current.push(circle);
    });
  };

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Uncomment for real-time simulation
      // updateVehicleLocation();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize Leaflet map (DOM based) once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = window.L;
      mapRef.current = L.map(mapContainerRef.current).setView([vehicle.currentLocation.lat, vehicle.currentLocation.lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      updateMap();
    };
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map whenever vehicle changes
  useEffect(() => {
    updateMap();
  }, [vehicle]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Vehicle data refreshed');
    }, 1000);
  };

  const shareLocation = () => {
    setShowShareModal(false);
    toast.success('Location shared successfully');
  };

  const sendCommand = (command) => {
    toast.success(`Command sent: ${command}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'idle': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSignalIcon = () => {
    switch(vehicle.tracker.signalStrength) {
      case 'good': return <Signal className="w-4 h-4 text-green-500" />;
      case 'fair': return <Signal className="w-4 h-4 text-yellow-500" />;
      case 'poor': return <WifiOff className="w-4 h-4 text-red-500" />;
      default: return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatSpeed = (speed) => `${speed} km/h`;
  const formatDistance = (distance) => `${distance.toLocaleString()} km`;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {vehicle.registration}
              </h1>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                <Activity className="w-3 h-3" />
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {vehicle.make} {vehicle.model} ({vehicle.year}) • {vehicle.color}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition">
            <Edit className="w-4 h-4" />
            Edit Vehicle
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current Speed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.currentLocation.speed} km/h</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tracker Status</p>
              <div className="flex items-center gap-2 mt-1">
                {vehicle.tracker.online ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">Offline</span>
                  </>
                )}
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              {getSignalIcon()}
              Signal: {vehicle.tracker.signalStrength}
            </span>
            <span className="flex items-center gap-1">
              <Battery className="w-3 h-3" />
              {vehicle.tracker.batteryLevel}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Today's Distance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">48 km</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <Navigation className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total: {formatDistance(vehicle.stats.totalDistance)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Engine Status</p>
              <div className="flex items-center gap-2 mt-1">
                {vehicle.tracker.ignition ? (
                  <>
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Running</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Off</span>
                  </>
                )}
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedTab('tracking')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'tracking'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Live Tracking
        </button>
        <button
          onClick={() => setSelectedTab('routes')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'routes'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Route className="w-4 h-4" />
          Routes
        </button>
        <button
          onClick={() => setSelectedTab('driver')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'driver'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <User className="w-4 h-4" />
          Driver Info
        </button>
        <button
          onClick={() => setSelectedTab('stats')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'stats'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics
        </button>
        <button
          onClick={() => setSelectedTab('maintenance')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'maintenance'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Maintenance
        </button>
        <button
          onClick={() => setSelectedTab('alerts')}
          className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
            selectedTab === 'alerts'
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          Alerts
          {vehicle.recentAlerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {vehicle.recentAlerts.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Live Tracking Tab */}
        {selectedTab === 'tracking' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Location</h3>
                <p className="text-xs text-gray-500 mt-1">Last updated: {vehicle.tracker.lastUpdate}</p>
              </div>
              <div className="h-[400px] w-full">
                <div id="map-container" ref={mapContainerRef} className="h-full w-full rounded-b" />
              </div>
            </div>

            {/* Tracker Details */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Tracker Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Device ID:</span>
                    <span className="font-mono text-gray-900 dark:text-white">{vehicle.tracker.deviceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IMEI:</span>
                    <span className="font-mono text-gray-900 dark:text-white">{vehicle.tracker.imei}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">SIM Number:</span>
                    <span className="text-gray-900 dark:text-white">{vehicle.tracker.simNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Firmware:</span>
                    <span className="text-gray-900 dark:text-white">{vehicle.tracker.firmwareVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">GPS Satellites:</span>
                    <span className="text-gray-900 dark:text-white">{vehicle.tracker.satellites}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Altitude:</span>
                    <span className="text-gray-900 dark:text-white">{vehicle.tracker.altitude} m</span>
                  </div>
                </div>
              </div>

              {/* Current Location Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Current Location
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{vehicle.currentLocation.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coordinates:</span>
                    <span className="font-mono text-gray-900 dark:text-white">
                      {vehicle.currentLocation.lat.toFixed(6)}, {vehicle.currentLocation.lng.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heading:</span>
                    <span className="text-gray-900 dark:text-white">{vehicle.currentLocation.heading}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Accuracy:</span>
                    <span className="text-gray-900 dark:text-white">±{vehicle.currentLocation.accuracy} m</span>
                  </div>
                </div>
              </div>

              {/* Quick Commands */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Commands</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => sendCommand('Engine Stop')}
                    className="px-3 py-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition"
                  >
                    Engine Stop
                  </button>
                  <button 
                    onClick={() => sendCommand('Engine Start')}
                    className="px-3 py-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 transition"
                  >
                    Engine Start
                  </button>
                  <button 
                    onClick={() => sendCommand('Get Location')}
                    className="px-3 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition"
                  >
                    Get Location
                  </button>
                  <button 
                    onClick={() => sendCommand('Reboot Tracker')}
                    className="px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 transition"
                  >
                    Reboot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {selectedTab === 'routes' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Route */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Current Active Route</h3>
              </div>
              {vehicle.currentRoute && (
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{vehicle.currentRoute.name}</h4>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-900 dark:text-white">{vehicle.currentRoute.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-600 rounded-full" style={{ width: `${vehicle.currentRoute.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Waypoint:</span>
                      <span className="text-gray-900 dark:text-white">{vehicle.currentRoute.currentWaypoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated Arrival:</span>
                      <span className="text-gray-900 dark:text-white">{vehicle.currentRoute.estimatedArrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Distance Remaining:</span>
                      <span className="text-gray-900 dark:text-white">{vehicle.currentRoute.distanceRemaining} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Remaining:</span>
                      <span className="text-gray-900 dark:text-white">{vehicle.currentRoute.timeRemaining} min</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Assigned Routes List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Assigned Routes</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {vehicle.assignedRoutes.map((route) => (
                  <div key={route.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{route.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{route.distance} km • {route.estimatedDuration} min</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
                      <div>From: {route.startPoint.name}</div>
                      <div>To: {route.endPoint.name}</div>
                      <div>Time: {route.startTime} - {route.endTime}</div>
                    </div>
                    <button className="mt-3 text-xs text-brand-600 dark:text-brand-400 hover:underline">
                      View Route Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Driver Info Tab */}
        {selectedTab === 'driver' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Driver Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 text-center shadow-sm">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {vehicle.driver.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{vehicle.driver.name}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(vehicle.driver.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({vehicle.driver.rating})</span>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    {vehicle.driver.phone}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    {vehicle.driver.email}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                    Contact Driver
                  </button>
                </div>
              </div>
            </div>

            {/* Driver Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">License Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">License Number:</span>
                    <p className="text-gray-900 dark:text-white font-medium">{vehicle.driver.licenseNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">License Expiry:</span>
                    <p className={`font-medium ${new Date(vehicle.driver.licenseExpiry) < new Date() ? 'text-red-600' : 'text-green-600'}`}>
                      {vehicle.driver.licenseExpiry}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Trips:</span>
                    <p className="text-gray-900 dark:text-white font-medium">{vehicle.driver.totalTrips}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Joined Date:</span>
                    <p className="text-gray-900 dark:text-white font-medium">{vehicle.driver.joinedDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Emergency Contact:</span>
                    <p className="text-gray-900 dark:text-white">{vehicle.driver.emergencyContact}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>
                    <p className="text-gray-900 dark:text-white">{vehicle.driver.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">On-time Delivery</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.9</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Safety Score</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">342</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Trips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Distance</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.stats.totalDistance.toLocaleString()} km</p>
                  </div>
                  <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
                    <Navigation className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Avg Fuel Efficiency</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.stats.avgFuelEfficiency} km/L</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                    <Fuel className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +5% improvement
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total CO₂ Emission</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.stats.co2Emission} kg</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                    <Activity className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                  <TrendingDown className="w-3 h-3" />
                  -8% reduction
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Idle Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.stats.idleTime} hrs</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-orange-600">
                  <TrendingDown className="w-3 h-3" />
                  -3% from last month
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Speed Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">0-30 km/h</span>
                      <span className="text-gray-900 dark:text-white">45%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">30-60 km/h</span>
                      <span className="text-gray-900 dark:text-white">35%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">60+ km/h</span>
                      <span className="text-gray-900 dark:text-white">20%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Engine Hours</h3>
                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">
                    {vehicle.stats.totalEngineHours}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Total Engine Hours</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white">42.5 hrs</div>
                      <div className="text-xs text-gray-500">This Month</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white">38.2 hrs</div>
                      <div className="text-xs text-gray-500">Last Month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {selectedTab === 'maintenance' && (
          <div className="space-y-6">
            {/* Upcoming Maintenance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Maintenance</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {vehicle.upcomingMaintenance.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.type}</div>
                      <div className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${item.daysRemaining === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {item.daysRemaining === 0 ? 'Due Today' : `${item.daysRemaining} days`}
                      </div>
                      <div className="text-xs text-gray-500">{item.odometerRemaining.toLocaleString()} km remaining</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Maintenance History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Mechanic</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {vehicle.maintenanceHistory.map((record, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{record.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{record.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{record.mechanic}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">{record.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {selectedTab === 'alerts' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Alerts</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {vehicle.recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                     onClick={() => {
                       setSelectedAlert(alert);
                       setShowAlertModal(true);
                     }}>
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {alert.severity === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{alert.timestamp}</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Location Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Share Location</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Share real-time location of {vehicle.registration}
              </p>
              <div className="space-y-3">
                <button
                  onClick={shareLocation}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <User className="w-5 h-5 text-brand-600" />
                  <span className="text-sm">Share with Driver</span>
                </button>
                <button
                  onClick={shareLocation}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <Mail className="w-5 h-5 text-brand-600" />
                  <span className="text-sm">Share via Email</span>
                </button>
                <button
                  onClick={shareLocation}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <Share2 className="w-5 h-5 text-brand-600" />
                  <span className="text-sm">Copy Shareable Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAlertModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Alert Details</h3>
              <button onClick={() => setShowAlertModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${
                  selectedAlert.severity === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  {selectedAlert.severity === 'warning' ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Bell className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{selectedAlert.message}</div>
                  <div className="text-xs text-gray-500">{selectedAlert.timestamp}</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Alert Type:</span>
                  <span className="text-gray-900 dark:text-white capitalize">{selectedAlert.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Severity:</span>
                  <span className={`capitalize ${selectedAlert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {selectedAlert.severity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle:</span>
                  <span className="text-gray-900 dark:text-white">{vehicle.registration}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}