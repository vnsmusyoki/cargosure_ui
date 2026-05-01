import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreVertical, 
  Eye, Edit, Trash2, MapPin, Navigation, Clock, 
  Calendar, DollarSign, TrendingUp, TrendingDown, 
  BarChart3, Activity, Zap, X, ChevronLeft, ChevronRight,
  RefreshCw, Check, Users, Package, AlertTriangle,
  Route, Target, Star, Truck, Bike, Car, StopCircle,
  Play, Pause, Flag, CheckCircle, Loader, AlertCircle,
  Fuel
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock routes data
const mockRoutes = [
  { 
    id: 1, 
    name: 'Westlands Delivery Route', 
    description: 'Daily delivery route covering Westlands, Parklands, and surrounding areas',
    status: 'active',
    vehicleType: 'Motorcycle',
    priority: 'high',
    startPoint: 'Nairobi CBD - Hilton Hotel',
    endPoint: 'Westlands - Sarit Centre',
    waypoints: ['Museum Hill', 'Hurlingham', 'Kilimani', 'Adams Arcade'],
    distance: 24.5,
    estimatedDuration: 95,
    actualDuration: 88,
    frequency: 'daily',
    assignedVehicles: ['KCA 123A', 'KCG 345E'],
    assignedDrivers: ['James Mwangi', 'John Kamau'],
    createdAt: '2024-01-15',
    lastOptimized: '2024-03-10',
    totalDeliveries: 342,
    onTimeRate: 94.5,
    fuelConsumption: 68.5,
    costPerTrip: 1250,
    stops: [
      { order: 1, location: 'Hilton Hotel', time: '08:00', duration: 15, status: 'completed' },
      { order: 2, location: 'Museum Hill', time: '08:30', duration: 10, status: 'completed' },
      { order: 3, location: 'Hurlingham', time: '09:00', duration: 12, status: 'completed' },
      { order: 4, location: 'Kilimani', time: '09:30', duration: 10, status: 'completed' },
      { order: 5, location: 'Adams Arcade', time: '10:00', duration: 8, status: 'completed' },
      { order: 6, location: 'Sarit Centre', time: '10:30', duration: 0, status: 'completed' }
    ]
  },
  { 
    id: 2, 
    name: 'Industrial Area Cargo Route', 
    description: 'Heavy cargo delivery route for industrial area businesses',
    status: 'active',
    vehicleType: 'Van',
    priority: 'medium',
    startPoint: 'Industrial Area - Export Processing Zone',
    endPoint: 'CBD - Ambassador Hotel',
    waypoints: ['South B', 'South C', 'Upper Hill', 'Community'],
    distance: 18.2,
    estimatedDuration: 65,
    actualDuration: 70,
    frequency: 'twice_daily',
    assignedVehicles: ['KCD 456B'],
    assignedDrivers: ['Sarah Wanjiku'],
    createdAt: '2024-02-01',
    lastOptimized: '2024-03-12',
    totalDeliveries: 156,
    onTimeRate: 88.2,
    fuelConsumption: 52.3,
    costPerTrip: 1850,
    stops: [
      { order: 1, location: 'EPZ Gate', time: '07:00', duration: 20, status: 'completed' },
      { order: 2, location: 'South B', time: '07:45', duration: 15, status: 'completed' },
      { order: 3, location: 'South C', time: '08:30', duration: 12, status: 'completed' },
      { order: 4, location: 'Upper Hill', time: '09:15', duration: 10, status: 'completed' },
      { order: 5, location: 'Community', time: '09:45', duration: 8, status: 'completed' },
      { order: 6, location: 'Ambassador Hotel', time: '10:15', duration: 0, status: 'completed' }
    ]
  },
  { 
    id: 3, 
    name: 'Eastlands Express', 
    title: 'Fast delivery route for Eastlands area',
    status: 'inactive',
    vehicleType: 'Tuk Tuk',
    priority: 'low',
    startPoint: 'Eastlands - T-Mall',
    endPoint: 'CBD - Kencom Bus Stop',
    waypoints: ['Buruburu', 'Donholm', 'Jogoo Road', 'Racecourse Road'],
    distance: 14.8,
    estimatedDuration: 50,
    actualDuration: 55,
    frequency: 'daily',
    assignedVehicles: ['KCE 789C'],
    assignedDrivers: ['Peter Omondi'],
    createdAt: '2024-01-20',
    lastOptimized: '2024-02-28',
    totalDeliveries: 98,
    onTimeRate: 82.0,
    fuelConsumption: 22.5,
    costPerTrip: 480,
    stops: [
      { order: 1, location: 'T-Mall', time: '09:00', duration: 15, status: 'completed' },
      { order: 2, location: 'Buruburu', time: '09:30', duration: 10, status: 'completed' },
      { order: 3, location: 'Donholm', time: '10:00', duration: 8, status: 'completed' },
      { order: 4, location: 'Jogoo Road', time: '10:25', duration: 10, status: 'completed' },
      { order: 5, location: 'Racecourse Road', time: '10:50', duration: 5, status: 'completed' },
      { order: 6, location: 'Kencom', time: '11:10', duration: 0, status: 'completed' }
    ]
  },
  { 
    id: 4, 
    name: 'Green Routes - Bicycle Delivery', 
    status: 'draft',
    vehicleType: 'Bicycle',
    priority: 'low',
    startPoint: 'CBD - Hilton Hotel',
    endPoint: 'Kilimani - Yaya Centre',
    waypoints: ['Upper Hill', 'Ngong Road Junction'],
    distance: 5.5,
    estimatedDuration: 25,
    actualDuration: 0,
    frequency: 'daily',
    assignedVehicles: ['KCF 012D'],
    assignedDrivers: ['Mary Akinyi'],
    createdAt: '2024-03-01',
    lastOptimized: '2024-03-01',
    totalDeliveries: 24,
    onTimeRate: 96.0,
    fuelConsumption: 0,
    costPerTrip: 0,
    stops: [
      { order: 1, location: 'Hilton Hotel', time: '08:00', duration: 10, status: 'completed' },
      { order: 2, location: 'Upper Hill', time: '08:25', duration: 8, status: 'completed' },
      { order: 3, location: 'Ngong Road', time: '08:45', duration: 0, status: 'pending' }
    ]
  },
  { 
    id: 5, 
    name: 'Kiambu Road Long Route', 
    status: 'active',
    vehicleType: 'Motorcycle',
    priority: 'high',
    startPoint: 'CBD - Nation Centre',
    endPoint: 'Kiambu - Kiambu Town',
    waypoints: ['Westlands', 'GSU', 'Ruiru', 'Kabete'],
    distance: 32.8,
    estimatedDuration: 110,
    actualDuration: 105,
    frequency: 'twice_daily',
    assignedVehicles: ['KCA 123A'],
    assignedDrivers: ['James Mwangi'],
    createdAt: '2024-01-10',
    lastOptimized: '2024-03-08',
    totalDeliveries: 215,
    onTimeRate: 91.3,
    fuelConsumption: 42.5,
    costPerTrip: 1850,
    stops: [
      { order: 1, location: 'Nation Centre', time: '06:00', duration: 20, status: 'completed' },
      { order: 2, location: 'Westlands', time: '06:45', duration: 15, status: 'completed' },
      { order: 3, location: 'GSU', time: '07:30', duration: 12, status: 'completed' },
      { order: 4, location: 'Ruiru', time: '08:15', duration: 10, status: 'completed' },
      { order: 5, location: 'Kabete', time: '09:00', duration: 8, status: 'completed' },
      { order: 6, location: 'Kiambu Town', time: '09:40', duration: 0, status: 'completed' }
    ]
  }
];

const mockOptimizationSuggestions = [
  { id: 1, routeId: 2, suggestion: 'Reorder stops to reduce backtracking', impact: 'Save ~5 min & 1.2 km', priority: 'high' },
  { id: 2, routeId: 3, suggestion: 'Combine with Eastlands morning route', impact: 'Save 2 trips/week', priority: 'medium' },
  { id: 3, routeId: 1, suggestion: 'Add alternative route for peak hours', impact: 'Reduce delays by 15%', priority: 'high' },
];

const RoutesManagement = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [optimizingRouteId, setOptimizingRouteId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateRoute, setShowCreateRoute] = useState(false);
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const itemsPerPage = 10;

  // Filter routes
  const filteredRoutes = mockRoutes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          route.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          route.endPoint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
    const matchesType = typeFilter === 'all' || route.vehicleType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const paginatedRoutes = filteredRoutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalRoutes: mockRoutes.length,
    activeRoutes: mockRoutes.filter(r => r.status === 'active').length,
    totalDistance: mockRoutes.reduce((sum, r) => sum + r.distance, 0),
    avgOnTimeRate: (mockRoutes.reduce((sum, r) => sum + r.onTimeRate, 0) / mockRoutes.length).toFixed(1),
    totalDeliveries: mockRoutes.reduce((sum, r) => sum + r.totalDeliveries, 0),
    avgFuelEfficiency: 28.5,
    optimizationPotential: 12.5,
    activeOptimizations: mockOptimizationSuggestions.length
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Route data refreshed');
    }, 1000);
  };

  const handleOptimizeRoute = (routeId) => {
    setOptimizingRouteId(routeId);
    setTimeout(() => {
      toast.success(`Route optimized successfully! Estimated savings: 15% time reduction`);
      setOptimizingRouteId(null);
      setShowOptimizationModal(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: Pause, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      draft: { icon: Edit, text: 'Draft', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { icon: AlertCircle, text: 'High', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      medium: { icon: Clock, text: 'Medium', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      low: { icon: Check, text: 'Low', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
    };
    const { icon: Icon, text, className } = config[priority] || config.low;
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

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes} min`;
  };

  const getPerformanceIndicator = (onTimeRate) => {
    if (onTimeRate >= 90) return { icon: TrendingUp, color: 'text-green-600', label: 'Excellent' };
    if (onTimeRate >= 75) return { icon: Activity, color: 'text-yellow-600', label: 'Good' };
    return { icon: TrendingDown, color: 'text-red-600', label: 'Needs Improvement' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Routes Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create and manage delivery routes, optimize paths, and track route performance
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
            onClick={() => setShowCreateRoute(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Create Route
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRoutes}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Route className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Active: {stats.activeRoutes} routes</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDistance} km</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Daily avg: 95 km</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">On-Time Delivery Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgOnTimeRate}%</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 2.1% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Optimization Potential</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.optimizationPotential}%</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">{stats.activeOptimizations} optimizations available</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'routes' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Route className="w-4 h-4" />
          All Routes
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockRoutes.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('optimization')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'optimization' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Zap className="w-4 h-4" />
          Route Optimization
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'performance' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Performance Analytics
        </button>
      </div>

      {/* Tab 1: All Routes */}
      {activeTab === 'routes' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes by name or location..."
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
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Vehicle Types</option>
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
              Showing {paginatedRoutes.length} of {filteredRoutes.length} routes
            </div>
          </div>

          {/* Routes Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {paginatedRoutes.map((route) => {
              const performance = getPerformanceIndicator(route.onTimeRate);
              const PerformanceIcon = performance.icon;
              return (
                <div key={route.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition bg-white dark:bg-gray-800/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{route.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{route.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedRoute(route)} className="p-1 text-gray-400 hover:text-brand-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {getStatusBadge(route.status)}
                    {getPriorityBadge(route.priority)}
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      {getVehicleIcon(route.vehicleType)}
                      {route.vehicleType}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{route.startPoint}</span>
                      <Navigation className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{route.endPoint}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Distance: <strong>{route.distance} km</strong></span>
                      <span className="text-gray-500">Duration: <strong>{formatDuration(route.estimatedDuration)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                      <PerformanceIcon className={`w-4 h-4 ${performance.color}`} />
                      <span className="text-sm font-medium">{route.onTimeRate}%</span>
                      <span className="text-xs text-gray-500">on-time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{route.totalDeliveries} deliveries</span>
                      <button 
                        onClick={() => setShowOptimizationModal(true)}
                        className="px-2 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs rounded-lg hover:bg-brand-100 transition"
                      >
                        Optimize
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                            ? 'bg-brand-600 text-white'
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

      {/* Tab 2: Route Optimization */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          {/* Optimization Impact */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Potential Savings</span>
              </div>
              <p className="text-3xl font-bold mb-1">12.5%</p>
              <p className="text-sm text-brand-100">Estimated time reduction</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Cost Savings</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">KES 8,450</p>
              <p className="text-xs text-green-600">Monthly projected</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Fuel Reduction</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">~45 L/month</p>
              <p className="text-xs text-gray-500">15% reduction potential</p>
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600" />
                AI-Powered Optimization Suggestions
              </h3>
              <p className="text-xs text-gray-500 mt-1">Based on historical data and traffic patterns</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockOptimizationSuggestions.map((suggestion) => {
                const route = mockRoutes.find(r => r.id === suggestion.routeId);
                return (
                  <div key={suggestion.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{route?.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {suggestion.priority} impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.suggestion}</p>
                        <p className="text-xs text-green-600 mt-1">Impact: {suggestion.impact}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleOptimizeRoute(route?.id);
                        }}
                        disabled={optimizingRouteId === route?.id}
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm rounded-lg transition flex items-center gap-1"
                      >
                        {optimizingRouteId === route?.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Zap className="w-4 h-4" />
                        )}
                        Apply Optimization
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Route Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Before vs After Optimization</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Current Performance</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Avg. Duration:</span><span>95 min</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Distance:</span><span>24.5 km</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Fuel Used:</span><span>3.2 L</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Cost/Trip:</span><span>KES 1,250</span></div>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Optimized Projection</span>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">-12.5%</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Avg. Duration:</span><span>83 min <span className="text-green-600 text-xs">(-12 min)</span></span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Distance:</span><span>21.8 km <span className="text-green-600 text-xs">(-2.7 km)</span></span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Fuel Used:</span><span>2.8 L <span className="text-green-600 text-xs">(-0.4 L)</span></span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Cost/Trip:</span><span>KES 1,094 <span className="text-green-600 text-xs">(-KES 156)</span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Performance Analytics */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Route Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Route Performance Scorecard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Route Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">On-Time Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Deliveries</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Avg. Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Fuel/Trip</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Cost/Trip</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {mockRoutes.map((route) => {
                    const performance = getPerformanceIndicator(route.onTimeRate);
                    const PerformanceIcon = performance.icon;
                    return (
                      <tr key={route.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 dark:text-white">{route.name}</div>
                          <div className="text-xs text-gray-500">{route.startPoint} → {route.endPoint}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <PerformanceIcon className={`w-4 h-4 ${performance.color}`} />
                            <span className="font-semibold">{route.onTimeRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{route.totalDeliveries}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDuration(route.actualDuration)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{route.fuelConsumption} L</td>
                        <td className="px-4 py-3 text-sm text-gray-600">KES {route.costPerTrip}</td>
                        <td className="px-4 py-3">
                          {route.onTimeRate >= 90 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : route.onTimeRate >= 75 ? (
                            <Activity className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-brand-50 dark:from-blue-900/20 dark:to-brand-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Route Optimization Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Re-sequence stops for Eastlands route</p>
                  <p className="text-xs text-gray-500">Optimizing stop order could save 15 min per trip</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Adjust departure times for morning peak</p>
                  <p className="text-xs text-gray-500">Shift by 30 min to avoid traffic congestion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Consolidate low-volume routes</p>
                  <p className="text-xs text-gray-500">Combine with adjacent routes to reduce trips</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Use alternative route for Industrial Area</p>
                  <p className="text-xs text-gray-500">Alternative path reduces distance by 2.5 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Route Details Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRoute(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedRoute.name}</h3>
              <button onClick={() => setSelectedRoute(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Route Summary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Start Point</p>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <MapPin className="w-4 h-4" />
                    {selectedRoute.startPoint}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">End Point</p>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Flag className="w-4 h-4" />
                    {selectedRoute.endPoint}
                  </div>
                </div>
              </div>

              {/* Waypoints */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Waypoints</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoute.waypoints.map((wp, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                      {wp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stops Schedule */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stop Schedule</p>
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs font-medium">
                        {stop.order}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{stop.location}</div>
                        <div className="text-xs text-gray-500">Duration: {stop.duration} min</div>
                      </div>
                      <div className="text-sm text-gray-600">{stop.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle & Driver Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Assigned Vehicles</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoute.assignedVehicles.map((v, idx) => (
                      <span key={idx} className="text-sm font-mono text-gray-900 dark:text-white">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Assigned Drivers</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoute.assignedDrivers.map((d, idx) => (
                      <span key={idx} className="text-sm text-gray-900 dark:text-white">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  Edit Route
                </button>
                <button 
                  onClick={() => {
                    setShowOptimizationModal(true);
                    setSelectedRoute(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Optimize Route
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Route Modal */}
      {showCreateRoute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateRoute(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Create New Route</h3>
              <button onClick={() => setShowCreateRoute(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Route Name</label>
                <input type="text" placeholder="e.g., Westlands Delivery Route" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Point</label>
                  <input type="text" placeholder="Starting location" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Point</label>
                  <input type="text" placeholder="Ending location" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waypoints (comma separated)</label>
                <input type="text" placeholder="Location1, Location2, Location3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500">
                    <option>Motorcycle</option>
                    <option>Van</option>
                    <option>Tuk Tuk</option>
                    <option>Bicycle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success('Route created successfully');
                  setShowCreateRoute(false);
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Create Route
              </button>
              <button onClick={() => setShowCreateRoute(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Modal */}
      {showOptimizationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowOptimizationModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Optimize Route</h3>
              <button onClick={() => setShowOptimizationModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">AI Optimization</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our AI will analyze this route and suggest improvements to reduce time, distance, and fuel consumption.</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Current Distance:</span><span>24.5 km</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Current Duration:</span><span>95 min</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Projected Savings:</span><span className="text-green-600">~12% time & distance</span></div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  handleOptimizeRoute(1);
                  setShowOptimizationModal(false);
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Run Optimization
              </button>
              <button onClick={() => setShowOptimizationModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesManagement;