import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Navigation, Truck, Car, Bike, Activity, Gauge, 
  Fuel, Battery, Thermometer, AlertTriangle, CheckCircle, 
  Clock, Wifi, WifiOff, RefreshCw, Maximize2, Minimize2,
  Power, PowerOff, Eye, EyeOff, Bell, BellOff, Settings,
  Radar, Compass, Zap, Shield, User, Phone,
  Calendar, FileText, History, Play, Pause, Volume2, VolumeX,
  X, ChevronLeft, ChevronRight, Plus, Minus, RotateCw
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock vehicle data with live tracking simulation
const mockVehicles = [
  { 
    id: 1, 
    registration: 'KCA 123A', 
    driver: 'James Mwangi',
    type: 'Motorcycle',
    status: 'active',
    lat: -1.2864, 
    lng: 36.8172,
    speed: 45,
    maxSpeed: 120,
    fuelLevel: 65,
    batteryLevel: 88,
    engineTemp: 92,
    tirePressure: 32,
    odometer: 12450,
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    ignition: true,
    connection: 'online',
    lastUpdate: new Date(),
    route: [],
    alerts: []
  },
  { 
    id: 2, 
    registration: 'KCD 456B', 
    driver: 'Sarah Wanjiku',
    type: 'Van',
    status: 'active',
    lat: -1.2921, 
    lng: 36.8219,
    speed: 32,
    maxSpeed: 140,
    fuelLevel: 42,
    batteryLevel: 76,
    engineTemp: 88,
    tirePressure: 35,
    odometer: 45890,
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-03-20',
    ignition: true,
    connection: 'online',
    lastUpdate: new Date(),
    route: [],
    alerts: []
  },
  { 
    id: 3, 
    registration: 'KCE 789C', 
    driver: 'Peter Omondi',
    type: 'Tuk Tuk',
    status: 'idle',
    lat: -1.2833, 
    lng: 36.8167,
    speed: 0,
    maxSpeed: 80,
    fuelLevel: 28,
    batteryLevel: 92,
    engineTemp: 75,
    tirePressure: 30,
    odometer: 8750,
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-04-01',
    ignition: false,
    connection: 'online',
    lastUpdate: new Date(),
    route: [],
    alerts: [{ type: 'low_fuel', message: 'Fuel level below 30%' }]
  },
  { 
    id: 4, 
    registration: 'KCF 012D', 
    driver: 'Mary Akinyi',
    type: 'Bicycle',
    status: 'offline',
    lat: -1.2789, 
    lng: 36.8254,
    speed: 0,
    maxSpeed: 30,
    fuelLevel: null,
    batteryLevel: 45,
    engineTemp: null,
    tirePressure: 40,
    odometer: 1250,
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-03-10',
    ignition: false,
    connection: 'offline',
    lastUpdate: new Date(),
    route: [],
    alerts: [{ type: 'offline', message: 'Vehicle offline' }]
  },
  { 
    id: 5, 
    registration: 'KCG 345E', 
    driver: 'John Kamau',
    type: 'Motorcycle',
    status: 'active',
    lat: -1.2789, 
    lng: 36.8254,
    speed: 68,
    maxSpeed: 120,
    fuelLevel: 55,
    batteryLevel: 82,
    engineTemp: 95,
    tirePressure: 31,
    odometer: 15670,
    lastMaintenance: '2024-02-25',
    nextMaintenance: '2024-03-25',
    ignition: true,
    connection: 'online',
    lastUpdate: new Date(),
    route: [],
    alerts: []
  }
];

const LiveTracking = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mapView, setMapView] = useState('all'); // 'all', 'single'
  const [showSidebar, setShowSidebar] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -1.2864, lng: 36.8172 });
  const [mapZoom, setMapZoom] = useState(13);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAlerts, setShowAlerts] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [historyMode, setHistoryMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const animationRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Load OpenStreetMap tiles
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = window.L;
      mapRef.current = L.map(mapContainerRef.current).setView([mapCenter.lat, mapCenter.lng], mapZoom);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapRef.current);
      
      // Add vehicle markers
      updateMarkers();
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

  // Update markers on map
  const updateMarkers = () => {
    if (!mapRef.current || !window.L) return;
    
    const L = window.L;
    const currentVehicles = mapView === 'single' && selectedVehicle 
      ? [selectedVehicle] 
      : vehicles.filter(v => v.status === 'active' || v.status === 'idle');
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Add new markers
    currentVehicles.forEach(vehicle => {
      const iconHtml = `
        <div class="relative">
          <div class="w-8 h-8 rounded-full ${vehicle.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} flex items-center justify-center shadow-lg border-2 border-white">
            ${vehicle.type === 'Motorcycle' ? '🏍️' : vehicle.type === 'Van' ? '🚐' : '🛺'}
          </div>
          ${vehicle.status === 'active' ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>' : ''}
        </div>
      `;
      
      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [32, 32],
        popupAnchor: [0, -16]
      });
      
      const marker = L.marker([vehicle.lat, vehicle.lng], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <div class="font-bold">${vehicle.registration}</div>
            <div class="text-sm">Driver: ${vehicle.driver}</div>
            <div class="text-sm">Speed: ${vehicle.speed} km/h</div>
            <div class="text-sm">Fuel: ${vehicle.fuelLevel || 'N/A'}%</div>
            <button onclick="window.selectVehicle(${vehicle.id})" class="mt-2 px-3 py-1 bg-brand-600 text-white text-xs rounded">View Details</button>
          </div>
        `);
      
      marker.on('click', () => selectVehicle(vehicle.id));
      markersRef.current[vehicle.id] = marker;
    });
  };

  // Simulate live vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => {
        if (vehicle.status !== 'active') return vehicle;
        
        // Random movement simulation
        const newLat = vehicle.lat + (Math.random() - 0.5) * 0.0005;
        const newLng = vehicle.lng + (Math.random() - 0.5) * 0.0005;
        const newSpeed = Math.max(0, vehicle.speed + (Math.random() - 0.5) * 5);
        
        // Update route history
        const newRoute = [...(vehicle.route || []), { lat: newLat, lng: newLng, time: new Date() }];
        if (newRoute.length > 100) newRoute.shift();
        
        // Random fuel consumption
        const newFuelLevel = Math.max(0, vehicle.fuelLevel - (Math.random() * 0.1));
        
        return {
          ...vehicle,
          lat: newLat,
          lng: newLng,
          speed: Math.max(0, Math.min(vehicle.maxSpeed, newSpeed)),
          fuelLevel: vehicle.fuelLevel ? newFuelLevel : null,
          lastUpdate: new Date(),
          route: newRoute,
          alerts: [
            ...(newFuelLevel < 30 ? [{ type: 'low_fuel', message: 'Fuel level below 30%' }] : []),
            ...(newSpeed > vehicle.maxSpeed * 0.9 ? [{ type: 'speeding', message: 'Vehicle approaching speed limit' }] : [])
          ].slice(0, 3)
        };
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Update markers when vehicles change
  useEffect(() => {
    updateMarkers();
    
    // Update selected vehicle if it exists
    if (selectedVehicle) {
      const updated = vehicles.find(v => v.id === selectedVehicle.id);
      if (updated) setSelectedVehicle(updated);
    }
  }, [vehicles, mapView, selectedVehicle]);

  const selectVehicle = (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    setSelectedVehicle(vehicle);
    setMapView('single');
    if (mapRef.current) {
      mapRef.current.setView([vehicle.lat, vehicle.lng], 15);
    }
  };

  const backToAllVehicles = () => {
    setSelectedVehicle(null);
    setMapView('all');
    if (mapRef.current) {
      mapRef.current.setView([mapCenter.lat, mapCenter.lng], 13);
    }
  };

  const centerOnVehicle = () => {
    if (selectedVehicle && mapRef.current) {
      mapRef.current.setView([selectedVehicle.lat, selectedVehicle.lng], 16);
      toast.success(`Centered on ${selectedVehicle.registration}`);
    }
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('map-container');
    if (!fullscreen) {
      element?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const remoteCommand = (command, vehicle) => {
    const targetVehicle = vehicle || selectedVehicle;
    if (!targetVehicle) return;
    
    toast.loading(`Sending ${command} command...`, { duration: 1500 });
    
    setTimeout(() => {
      if (command === 'engine_off') {
        setVehicles(prev => prev.map(v => 
          v.id === targetVehicle.id ? { ...v, ignition: false, status: 'idle' } : v
        ));
        toast.success(`Engine turned OFF for ${targetVehicle.registration}`);
      } else if (command === 'engine_on') {
        setVehicles(prev => prev.map(v => 
          v.id === targetVehicle.id ? { ...v, ignition: true, status: 'active' } : v
        ));
        toast.success(`Engine turned ON for ${targetVehicle.registration}`);
      } else if (command === 'speed_limit') {
        toast.success(`Speed limit alert set for ${targetVehicle.registration}`);
      } else if (command === 'geofence') {
        toast.success(`Geofence created around ${targetVehicle.registration}`);
      } else if (command === 'refresh') {
        toast.success(`Telemetry refreshed for ${targetVehicle.registration}`);
      }
      
      if (targetVehicle === selectedVehicle) {
        const updated = vehicles.find(v => v.id === targetVehicle.id);
        if (updated) setSelectedVehicle(updated);
      }
    }, 1500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Live tracking data refreshed');
      updateMarkers();
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-500';
      case 'idle': return 'text-yellow-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'low_fuel': return <Fuel className="w-4 h-4 text-yellow-500" />;
      case 'speeding': return <Gauge className="w-4 h-4 text-red-500" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-gray-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Vehicle Tracking</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Real-time GPS tracking and telematics monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            {showSidebar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content - Map and Sidebar */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Map Container */}
        <div 
          id="map-container"
          ref={mapContainerRef}
          className={`flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg relative ${fullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
          style={{ minHeight: '500px' }}
        >
          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => mapRef.current && mapRef.current.zoomIn()}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 transition"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => mapRef.current && mapRef.current.zoomOut()}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.setView([mapCenter.lat, mapCenter.lng], 13);
                }
              }}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 transition"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Vehicle Count Badge */}
          <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-sm">
            <span className="font-medium">{vehicles.filter(v => v.status === 'active').length} Active</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{vehicles.filter(v => v.status === 'idle').length} Idle</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{vehicles.filter(v => v.status === 'offline').length} Offline</span>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
            {/* Vehicle Selection */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Vehicles</h3>
                {mapView === 'single' && (
                  <button
                    onClick={backToAllVehicles}
                    className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to all
                  </button>
                )}
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {vehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    onClick={() => selectVehicle(vehicle.id)}
                    className={`p-3 rounded-lg cursor-pointer transition flex items-center justify-between ${
                      selectedVehicle?.id === vehicle.id
                        ? 'bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${vehicle.status === 'active' ? 'bg-green-500 animate-pulse' : vehicle.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                        <div className="text-xs text-gray-500">{vehicle.driver} • {vehicle.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{vehicle.speed} km/h</div>
                      <div className="text-xs text-gray-500">{vehicle.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Vehicle Details */}
            {selectedVehicle && (
              <div className="flex-1 overflow-y-auto">
                {/* Vehicle Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedVehicle.registration}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedVehicle.driver} • {selectedVehicle.type}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      selectedVehicle.status === 'active' ? 'bg-green-100 text-green-700' :
                      selectedVehicle.status === 'idle' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedVehicle.connection === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {selectedVehicle.status.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={centerOnVehicle}
                    className="mt-3 text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Navigation className="w-4 h-4" />
                    Center on map
                  </button>
                </div>

                {/* Telemetry Data */}
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Real-time Telemetry
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Gauge className="w-3 h-3" />
                          Speed
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedVehicle.speed} <span className="text-sm font-normal">km/h</span></div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(selectedVehicle.speed / selectedVehicle.maxSpeed) * 100}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Max: {selectedVehicle.maxSpeed} km/h</div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Fuel className="w-3 h-3" />
                          Fuel Level
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedVehicle.fuelLevel || 'N/A'}%</div>
                        {selectedVehicle.fuelLevel && (
                          <>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className={`h-1.5 rounded-full ${selectedVehicle.fuelLevel < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${selectedVehicle.fuelLevel}%` }}></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Est. range: ~{(selectedVehicle.fuelLevel * 3.5).toFixed(0)} km</div>
                          </>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Battery className="w-3 h-3" />
                          Battery
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedVehicle.batteryLevel}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${selectedVehicle.batteryLevel}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Thermometer className="w-3 h-3" />
                          Engine Temp
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedVehicle.engineTemp || 'N/A'}°C</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div className={`h-1.5 rounded-full ${selectedVehicle.engineTemp > 100 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${((selectedVehicle.engineTemp || 0) / 120) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Stats */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Vehicle Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Odometer</span>
                        <span className="font-medium">{selectedVehicle.odometer.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Tire Pressure</span>
                        <span className="font-medium">{selectedVehicle.tirePressure} PSI</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Last Service</span>
                        <span className="font-medium">{selectedVehicle.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500">Next Service</span>
                        <span className="font-medium text-orange-600">{selectedVehicle.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">Ignition</span>
                        <span className={`font-medium flex items-center gap-1 ${selectedVehicle.ignition ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedVehicle.ignition ? <CheckCircle className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                          {selectedVehicle.ignition ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {selectedVehicle.alerts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Active Alerts
                      </h4>
                      <div className="space-y-2">
                        {selectedVehicle.alerts.map((alert, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
                            {getAlertIcon(alert.type)}
                            <span className="text-yellow-800 dark:text-yellow-300">{alert.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remote Commands */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Remote Commands</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedVehicle.ignition ? (
                        <button
                          onClick={() => remoteCommand('engine_off', selectedVehicle)}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                          <PowerOff className="w-4 h-4" />
                          Engine OFF
                        </button>
                      ) : (
                        <button
                          onClick={() => remoteCommand('engine_on', selectedVehicle)}
                          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                          <Power className="w-4 h-4" />
                          Engine ON
                        </button>
                      )}
                      <button
                        onClick={() => remoteCommand('speed_limit', selectedVehicle)}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                      >
                        <Bell className="w-4 h-4" />
                        Speed Alert
                      </button>
                      <button
                        onClick={() => remoteCommand('geofence', selectedVehicle)}
                        className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                      >
                        <MapPin className="w-4 h-4" />
                        Geofence
                      </button>
                      <button
                        onClick={() => remoteCommand('refresh', selectedVehicle)}
                        className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                      </button>
                    </div>
                  </div>

                  {/* Last Update */}
                  <div className="text-center text-xs text-gray-400 pt-2">
                    Last update: {selectedVehicle.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )}

            {/* No Vehicle Selected */}
            {!selectedVehicle && (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Select a vehicle from the list to view detailed telemetry</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global selectVehicle function for map popups */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.selectVehicle = function(id) {
            const event = new CustomEvent('selectVehicle', { detail: id });
            window.dispatchEvent(event);
          };
        `
      }} />
      
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('selectVehicle', (e) => {
            // This will be handled by React via a ref, but for now we'll use a simple approach
            const buttons = document.querySelectorAll('[data-vehicle-select]');
            buttons.forEach(btn => {
              if (btn.getAttribute('data-vehicle-id') == e.detail) {
                btn.click();
              }
            });
          });
        `
      }} />
    </div>
  );
};

export default LiveTracking;