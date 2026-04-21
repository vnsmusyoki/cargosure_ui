import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Printer, MoreVertical, 
  Eye, Edit, Trash2, Car, Truck, Bike, AlertCircle, 
  CheckCircle, Clock, Wrench, Fuel, Calendar, MapPin,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, FileText, Send, MessageSquare, Bell,
  Gauge, Navigation, Battery, Thermometer, Settings,
  AlertTriangle, Check, User, Phone, Mail, Star
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock vehicle data
const mockVehicles = [
  { 
    id: 1, 
    registration: 'KCA 123A', 
    type: 'Motorcycle', 
    make: 'Honda', 
    model: 'CB150', 
    year: 2022,
    status: 'active', 
    driver: 'James Mwangi',
    driverId: 1,
    fuelType: 'Petrol',
    fuelEfficiency: '35 km/L',
    mileage: 12450,
    lastService: '2024-02-15',
    nextService: '2024-03-15',
    insuranceExpiry: '2024-12-31',
    insuranceProvider: 'Jubilee Insurance',
    color: 'Red',
    capacity: '150kg',
    maintenanceHistory: [
      { date: '2024-02-15', type: 'Oil Change', cost: 'KES 2,500', mechanic: 'AutoCare' },
      { date: '2024-01-10', type: 'Tire Replacement', cost: 'KES 4,000', mechanic: 'QuickFix' }
    ],
    incidents: [],
    documents: ['Insurance', 'Logbook', 'Inspection'],
    lastActive: '2 min ago',
    image: null
  },
  { 
    id: 2, 
    registration: 'KCD 456B', 
    type: 'Van', 
    make: 'Toyota', 
    model: 'Probox', 
    year: 2021,
    status: 'active', 
    driver: 'Sarah Wanjiku',
    driverId: 2,
    fuelType: 'Petrol',
    fuelEfficiency: '12 km/L',
    mileage: 45890,
    lastService: '2024-02-20',
    nextService: '2024-03-20',
    insuranceExpiry: '2024-11-30',
    insuranceProvider: 'APA Insurance',
    color: 'White',
    capacity: '800kg',
    maintenanceHistory: [
      { date: '2024-02-20', type: 'General Service', cost: 'KES 8,000', mechanic: 'Toyota Kenya' }
    ],
    incidents: [],
    documents: ['Insurance', 'Logbook', 'Inspection'],
    lastActive: '5 min ago',
    image: null
  },
  { 
    id: 3, 
    registration: 'KCE 789C', 
    type: 'Tuk Tuk', 
    make: 'Bajaj', 
    model: 'RE', 
    year: 2023,
    status: 'maintenance', 
    driver: 'Peter Omondi',
    driverId: 3,
    fuelType: 'Petrol',
    fuelEfficiency: '25 km/L',
    mileage: 8750,
    lastService: '2024-03-01',
    nextService: '2024-04-01',
    insuranceExpiry: '2024-10-15',
    insuranceProvider: 'Heritage',
    color: 'Green',
    capacity: '400kg',
    maintenanceHistory: [
      { date: '2024-03-01', type: 'Engine Repair', cost: 'KES 12,000', mechanic: 'Bajaj Service' }
    ],
    incidents: [{ date: '2024-02-28', type: 'Minor Accident', description: 'Front bumper damage' }],
    documents: ['Insurance', 'Logbook'],
    lastActive: '1 hour ago',
    image: null
  },
  { 
    id: 4, 
    registration: 'KCF 012D', 
    type: 'Bicycle', 
    make: 'Gazelle', 
    model: 'Urban', 
    year: 2024,
    status: 'idle', 
    driver: 'Mary Akinyi',
    driverId: 4,
    fuelType: 'N/A',
    fuelEfficiency: 'N/A',
    mileage: 1250,
    lastService: '2024-02-10',
    nextService: '2024-03-10',
    insuranceExpiry: '2024-09-30',
    insuranceProvider: 'Britam',
    color: 'Blue',
    capacity: '50kg',
    maintenanceHistory: [
      { date: '2024-02-10', type: 'Brake Check', cost: 'KES 1,500', mechanic: 'CycleWorld' }
    ],
    incidents: [],
    documents: ['Insurance'],
    lastActive: '2 hours ago',
    image: null
  },
  { 
    id: 5, 
    registration: 'KCG 345E', 
    type: 'Motorcycle', 
    make: 'Yamaha', 
    model: 'FZ', 
    year: 2022,
    status: 'active', 
    driver: 'John Kamau',
    driverId: 5,
    fuelType: 'Petrol',
    fuelEfficiency: '40 km/L',
    mileage: 15670,
    lastService: '2024-02-25',
    nextService: '2024-03-25',
    insuranceExpiry: '2025-01-15',
    insuranceProvider: 'Jubilee Insurance',
    color: 'Black',
    capacity: '150kg',
    maintenanceHistory: [
      { date: '2024-02-25', type: 'Oil Change', cost: 'KES 2,500', mechanic: 'Yamaha Service' }
    ],
    incidents: [],
    documents: ['Insurance', 'Logbook', 'Inspection'],
    lastActive: '1 min ago',
    image: null
  }
];

const FleetManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showScheduleMaintenance, setShowScheduleMaintenance] = useState(null);
  const itemsPerPage = 10;

  // Filter vehicles
  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (vehicle.driver && vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesType = typeFilter === 'all' || vehicle.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalVehicles: mockVehicles.length,
    activeVehicles: mockVehicles.filter(v => v.status === 'active').length,
    maintenanceVehicles: mockVehicles.filter(v => v.status === 'maintenance').length,
    idleVehicles: mockVehicles.filter(v => v.status === 'idle').length,
    totalMileage: mockVehicles.reduce((sum, v) => sum + v.mileage, 0),
    avgFuelEfficiency: (mockVehicles.filter(v => v.fuelEfficiency !== 'N/A').reduce((sum, v) => {
      const efficiency = parseFloat(v.fuelEfficiency.split(' ')[0]);
      return sum + (isNaN(efficiency) ? 0 : efficiency);
    }, 0) / mockVehicles.filter(v => v.fuelEfficiency !== 'N/A').length).toFixed(1),
    vehiclesDueService: mockVehicles.filter(v => {
      const nextService = new Date(v.nextService);
      const today = new Date();
      const diffDays = Math.ceil((nextService - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length,
    vehiclesExpiringInsurance: mockVehicles.filter(v => {
      const insuranceExpiry = new Date(v.insuranceExpiry);
      const today = new Date();
      const diffDays = Math.ceil((insuranceExpiry - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays >= 0;
    }).length
  };

  const toggleRowExpand = (vehicleId) => {
    setExpandedRows(prev => ({ ...prev, [vehicleId]: !prev[vehicleId] }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Fleet data refreshed');
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      maintenance: { icon: Wrench, text: 'Maintenance', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      idle: { icon: Clock, text: 'Idle', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.idle;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getVehicleIcon = (type) => {
    switch(type) {
      case 'Motorcycle': return <Bike className="w-4 h-4" />;
      case 'Van': return <Truck className="w-4 h-4" />;
      case 'Tuk Tuk': return <Car className="w-4 h-4" />;
      case 'Bicycle': return <Bike className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  // Calculate days until next service
  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    return `${diffDays} days`;
  };

  const getDaysUntilColor = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 3) return 'text-orange-600';
    if (diffDays <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your vehicle fleet, track maintenance, and optimize performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setShowAddVehicle(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVehicles}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Car className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Active: {stats.activeVehicles}</span>
            <span className="text-yellow-600">Maintenance: {stats.maintenanceVehicles}</span>
            <span className="text-gray-500">Idle: {stats.idleVehicles}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Mileage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMileage.toLocaleString()} km</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Avg. Fuel: {stats.avgFuelEfficiency} km/L</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Service Due</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.vehiclesDueService}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Wrench className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">Vehicles due in next 7 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Insurance Expiring</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.vehiclesExpiringInsurance}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2">Expiring in next 30 days</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'overview' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Fleet Overview
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'vehicles' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Car className="w-4 h-4" />
          Vehicles List
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockVehicles.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'maintenance' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Maintenance Schedule
        </button>
      </div>

      {/* Tab 1: Fleet Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Vehicle Distribution Chart */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Vehicle Distribution by Type</h3>
              <div className="space-y-3">
                {[
                  { type: 'Motorcycle', count: 2, percentage: 40, color: 'bg-blue-500' },
                  { type: 'Van', count: 1, percentage: 20, color: 'bg-green-500' },
                  { type: 'Tuk Tuk', count: 1, percentage: 20, color: 'bg-yellow-500' },
                  { type: 'Bicycle', count: 1, percentage: 20, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.type}</span>
                      <span className="text-gray-500 text-xs">{item.count} vehicles ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status Overview</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.activeVehicles}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.maintenanceVehicles}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Maintenance</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{stats.idleVehicles}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Idle</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Maintenance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Maintenance</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockVehicles.filter(v => {
                const nextService = new Date(v.nextService);
                const today = new Date();
                const diffDays = Math.ceil((nextService - today) / (1000 * 60 * 60 * 24));
                return diffDays <= 14 && diffDays >= 0;
              }).map((vehicle) => (
                <div key={vehicle.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {getVehicleIcon(vehicle.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                      <div className="text-xs text-gray-500">{vehicle.make} {vehicle.model} • {vehicle.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getDaysUntilColor(vehicle.nextService)}`}>
                      {getDaysUntil(vehicle.nextService)}
                    </div>
                    <div className="text-xs text-gray-500">Next service: {vehicle.nextService}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Expiry Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Insurance Expiry Alerts
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockVehicles.filter(v => {
                const insuranceExpiry = new Date(v.insuranceExpiry);
                const today = new Date();
                const diffDays = Math.ceil((insuranceExpiry - today) / (1000 * 60 * 60 * 24));
                return diffDays <= 30 && diffDays >= 0;
              }).map((vehicle) => (
                <div key={vehicle.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                    <div className="text-xs text-gray-500">{vehicle.insuranceProvider}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getDaysUntilColor(vehicle.insuranceExpiry)}`}>
                      {getDaysUntil(vehicle.insuranceExpiry)}
                    </div>
                    <div className="text-xs text-gray-500">Expires: {vehicle.insuranceExpiry}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vehicles List */}
      {activeTab === 'vehicles' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="idle">Idle</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Types</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Van">Van</option>
                <option value="Tuk Tuk">Tuk Tuk</option>
                <option value="Bicycle">Bicycle</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles
            </div>
          </div>

          {/* Vehicles Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mileage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Next Service</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedVehicles.map((vehicle) => (
                  <React.Fragment key={vehicle.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(vehicle.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            {getVehicleIcon(vehicle.type)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{vehicle.make} {vehicle.model}</div>
                            <div className="text-xs text-gray-500">{vehicle.year} • {vehicle.color}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-900 dark:text-white" onClick={() => toggleRowExpand(vehicle.id)}>
                        {vehicle.registration}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(vehicle.id)}>
                        {vehicle.driver ? (
                          <div>
                            <div className="text-sm text-gray-900 dark:text-white">{vehicle.driver}</div>
                            <div className="text-xs text-gray-500">ID: {vehicle.driverId}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(vehicle.id)}>
                        {getStatusBadge(vehicle.status)}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(vehicle.id)}>
                        <div className="text-sm text-gray-900 dark:text-white">{vehicle.mileage.toLocaleString()} km</div>
                        <div className="text-xs text-gray-500">{vehicle.fuelEfficiency}</div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(vehicle.id)}>
                        <div className={`text-sm font-medium ${getDaysUntilColor(vehicle.nextService)}`}>
                          {getDaysUntil(vehicle.nextService)}
                        </div>
                        <div className="text-xs text-gray-500">{vehicle.nextService}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowScheduleMaintenance(vehicle)}
                            className="p-1.5 text-gray-400 hover:text-yellow-600 transition"
                            title="Schedule Maintenance"
                          >
                            <Wrench className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleRowExpand(vehicle.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition"
                            title="More Info"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Row */}
                    {expandedRows[vehicle.id] && (
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td colSpan="7" className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Vehicle Specs</div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Capacity:</span><span>{vehicle.capacity}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Fuel Type:</span><span>{vehicle.fuelType}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Insurance:</span><span>{vehicle.insuranceProvider}</span></div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Maintenance History</div>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {vehicle.maintenanceHistory.slice(0, 2).map((m, idx) => (
                                  <div key={idx} className="text-xs">
                                    <div className="font-medium">{m.date}</div>
                                    <div className="text-gray-500">{m.type} - {m.cost}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Documents</div>
                              <div className="flex flex-wrap gap-1">
                                {vehicle.documents.map((doc, idx) => (
                                  <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
                              <div className="flex gap-2">
                                <button className="flex-1 bg-indigo-600 text-white text-xs py-1.5 rounded-lg">Assign Driver</button>
                                <button className="flex-1 border border-gray-300 text-gray-700 text-xs py-1.5 rounded-lg">Log Incident</button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500">Page {currentPage} of {totalPages}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Maintenance Schedule */}
      {activeTab === 'maintenance' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Maintenance Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Last Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Next Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Last Cost</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockVehicles.map((vehicle) => {
                  const lastMaintenance = vehicle.maintenanceHistory[vehicle.maintenanceHistory.length - 1];
                  return (
                    <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {getVehicleIcon(vehicle.type)}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                            <div className="text-xs text-gray-500">{vehicle.make} {vehicle.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{vehicle.lastService}</td>
                      <td className="px-4 py-3">
                        <div className={`text-sm font-medium ${getDaysUntilColor(vehicle.nextService)}`}>
                          {getDaysUntil(vehicle.nextService)}
                        </div>
                        <div className="text-xs text-gray-500">{vehicle.nextService}</div>
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(vehicle.status)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {lastMaintenance?.cost || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => setShowScheduleMaintenance(vehicle)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition"
                        >
                          Schedule Service
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVehicle(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Vehicle Details</h3>
              <button onClick={() => setSelectedVehicle(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {getVehicleIcon(selectedVehicle.type)}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{selectedVehicle.registration}</h4>
                  <p className="text-sm text-gray-500">{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})</p>
                  {getStatusBadge(selectedVehicle.status)}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Vehicle Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Type:</span><span>{selectedVehicle.type}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Color:</span><span>{selectedVehicle.color}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Capacity:</span><span>{selectedVehicle.capacity}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Fuel Type:</span><span>{selectedVehicle.fuelType}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Fuel Efficiency:</span><span>{selectedVehicle.fuelEfficiency}</span></div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Driver Assignment</h5>
                    {selectedVehicle.driver ? (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                          {selectedVehicle.driver.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{selectedVehicle.driver}</div>
                          <div className="text-xs text-gray-500">Driver ID: {selectedVehicle.driverId}</div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No driver assigned</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Service & Insurance</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Last Service:</span><span>{selectedVehicle.lastService}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Next Service:</span><span className={getDaysUntilColor(selectedVehicle.nextService)}>{selectedVehicle.nextService}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Insurance Provider:</span><span>{selectedVehicle.insuranceProvider}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Insurance Expiry:</span><span className={getDaysUntilColor(selectedVehicle.insuranceExpiry)}>{selectedVehicle.insuranceExpiry}</span></div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Total Mileage:</span><span>{selectedVehicle.mileage.toLocaleString()} km</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Last Active:</span><span>{selectedVehicle.lastActive}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  Edit Vehicle
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View Maintenance Log
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showScheduleMaintenance && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleMaintenance(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Schedule Maintenance</h3>
              <button onClick={() => setShowScheduleMaintenance(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vehicle: <span className="font-semibold">{showScheduleMaintenance.registration}</span>
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Service Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Service Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                    <option>Oil Change</option>
                    <option>General Service</option>
                    <option>Tire Replacement</option>
                    <option>Brake Check</option>
                    <option>Engine Tune-up</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mechanic/Service Center
                  </label>
                  <input
                    type="text"
                    placeholder="Enter service center name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Cost
                  </label>
                  <input
                    type="text"
                    placeholder="KES 0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Maintenance scheduled successfully');
                    setShowScheduleMaintenance(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Schedule
                </button>
                <button
                  onClick={() => setShowScheduleMaintenance(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddVehicle(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Add New Vehicle</h3>
              <button onClick={() => setShowAddVehicle(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                      <option>Motorcycle</option>
                      <option>Van</option>
                      <option>Tuk Tuk</option>
                      <option>Bicycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registration No.</label>
                    <input type="text" placeholder="KCA 123A" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Make</label>
                    <input type="text" placeholder="Toyota" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
                    <input type="text" placeholder="Probox" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                    <input type="number" placeholder="2022" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                    <input type="text" placeholder="White" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign Driver (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                    <option>Select driver</option>
                    <option>James Mwangi</option>
                    <option>Sarah Wanjiku</option>
                    <option>Peter Omondi</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Vehicle added successfully');
                    setShowAddVehicle(false);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Add Vehicle
                </button>
                <button
                  onClick={() => setShowAddVehicle(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;