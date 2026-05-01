import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreVertical, 
  Eye, Edit, Trash2, MapPin, Navigation, Clock, 
  Calendar, DollarSign, TrendingUp, TrendingDown, 
  BarChart3, Activity, Zap, X, ChevronLeft, ChevronRight,
  RefreshCw, Check, Users, Package, AlertTriangle,
  Store, ShoppingBag, Phone, Mail, Building2,
  Star, Truck, Clock as ClockIcon, CheckCircle, Loader,
  AlertCircle, Percent, CreditCard, Map, Home,
  Circle, Navigation as NavigationIcon, Globe, MessageCircle,
  Target,
  Pause
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Mock stores data
const mockStores = [
  { 
    id: 1, 
    name: 'Sarit Centre', 
    code: 'STR-001',
    type: 'Mall',
    status: 'active',
    priority: 'high',
    location: 'Westlands, Nairobi',
    coordinates: { lat: -1.2632, lng: 36.8002 },
    address: 'Sarit Centre, Westlands Road, Nairobi',
    contactPerson: 'John Mwangi',
    phone: '+254 712 345 678',
    email: 'sarit@example.com',
    operatingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    deliveryInstructions: 'Loading bay at basement level 2, entrance from Ring Road',
    averageOrderValue: 12500,
    monthlyOrders: 342,
    onTimeDeliveryRate: 94.5,
    distanceFromWarehouse: 8.5,
    routeId: 1,
    assignedVehicles: ['KCA 123A'],
    createdAt: '2024-01-15',
    lastDelivery: '2024-03-14',
    peakHours: ['11:00-14:00', '17:00-19:00'],
    specialRequirements: ['Fragile items', 'Refrigerated goods'],
    rating: 4.5,
    totalDeliveries: 2847,
    returnRate: 2.3,
    preferredDeliveryTime: '09:00-12:00'
  },
  { 
    id: 2, 
    name: 'The Hub Karen', 
    code: 'STR-002',
    type: 'Mall',
    status: 'active',
    priority: 'high',
    location: 'Karen, Nairobi',
    coordinates: { lat: -1.3167, lng: 36.7167 },
    address: 'The Hub, Karen Road, Nairobi',
    contactPerson: 'Sarah Wanjiku',
    phone: '+254 723 456 789',
    email: 'hub@example.com',
    operatingHours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '10:00 AM - 7:00 PM'
    },
    deliveryInstructions: 'Use service road behind Tuskys, loading zone B',
    averageOrderValue: 15800,
    monthlyOrders: 287,
    onTimeDeliveryRate: 91.2,
    distanceFromWarehouse: 12.3,
    routeId: 1,
    assignedVehicles: ['KCG 345E'],
    createdAt: '2024-01-20',
    lastDelivery: '2024-03-14',
    peakHours: ['10:00-13:00', '16:00-19:00'],
    specialRequirements: ['Heavy items', 'Pallet jack required'],
    rating: 4.3,
    totalDeliveries: 2156,
    returnRate: 1.8,
    preferredDeliveryTime: '10:00-13:00'
  },
  { 
    id: 3, 
    name: 'T-Mall Embakasi', 
    code: 'STR-003',
    type: 'Supermarket',
    status: 'active',
    priority: 'medium',
    location: 'Embakasi, Nairobi',
    coordinates: { lat: -1.3091, lng: 36.8936 },
    address: 'T-Mall, Airport North Road, Nairobi',
    contactPerson: 'Peter Omondi',
    phone: '+254 734 567 890',
    email: 'tmall@example.com',
    operatingHours: {
      monday: '7:00 AM - 10:00 PM',
      tuesday: '7:00 AM - 10:00 PM',
      wednesday: '7:00 AM - 10:00 PM',
      thursday: '7:00 AM - 10:00 PM',
      friday: '7:00 AM - 10:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '7:00 AM - 10:00 PM'
    },
    deliveryInstructions: 'Main entrance loading zone, security clearance required',
    averageOrderValue: 8900,
    monthlyOrders: 523,
    onTimeDeliveryRate: 88.5,
    distanceFromWarehouse: 14.8,
    routeId: 3,
    assignedVehicles: ['KCE 789C'],
    createdAt: '2024-01-25',
    lastDelivery: '2024-03-13',
    peakHours: ['08:00-10:00', '17:00-20:00'],
    specialRequirements: ['Express delivery'],
    rating: 4.0,
    totalDeliveries: 3890,
    returnRate: 3.2,
    preferredDeliveryTime: '07:00-10:00'
  },
  { 
    id: 4, 
    name: 'Yaya Centre', 
    code: 'STR-004',
    type: 'Mall',
    status: 'active',
    priority: 'medium',
    location: 'Kilimani, Nairobi',
    coordinates: { lat: -1.2833, lng: 36.7833 },
    address: 'Yaya Centre, Argwings Kodhek Road, Nairobi',
    contactPerson: 'Mary Akinyi',
    phone: '+254 745 678 901',
    email: 'yaya@example.com',
    operatingHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '10:00 AM - 7:00 PM'
    },
    deliveryInstructions: 'Underground parking, lift access available',
    averageOrderValue: 11200,
    monthlyOrders: 312,
    onTimeDeliveryRate: 92.8,
    distanceFromWarehouse: 6.7,
    routeId: 4,
    assignedVehicles: ['KCF 012D'],
    createdAt: '2024-02-01',
    lastDelivery: '2024-03-14',
    peakHours: ['12:00-15:00', '18:00-20:00'],
    specialRequirements: ['Time-sensitive'],
    rating: 4.6,
    totalDeliveries: 2345,
    returnRate: 1.5,
    preferredDeliveryTime: '09:30-12:30'
  },
  { 
    id: 5, 
    name: 'Garden City Mall', 
    code: 'STR-005',
    type: 'Mall',
    status: 'active',
    priority: 'high',
    location: 'Thika Road, Nairobi',
    coordinates: { lat: -1.2209, lng: 36.8742 },
    address: 'Garden City, Thika Road, Nairobi',
    contactPerson: 'James Kariuki',
    phone: '+254 756 789 012',
    email: 'gardencity@example.com',
    operatingHours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '10:00 AM - 8:00 PM'
    },
    deliveryInstructions: 'Loading dock at west wing, height restriction 4.5m',
    averageOrderValue: 18900,
    monthlyOrders: 278,
    onTimeDeliveryRate: 95.2,
    distanceFromWarehouse: 16.2,
    routeId: 5,
    assignedVehicles: ['KCA 123A'],
    createdAt: '2024-02-10',
    lastDelivery: '2024-03-14',
    peakHours: ['11:00-14:00', '16:00-19:00'],
    specialRequirements: ['Forklift required'],
    rating: 4.7,
    totalDeliveries: 1987,
    returnRate: 1.2,
    preferredDeliveryTime: '08:00-11:00'
  },
  { 
    id: 6, 
    name: 'Quickmart Langata', 
    code: 'STR-006',
    type: 'Supermarket',
    status: 'inactive',
    priority: 'low',
    location: 'Langata, Nairobi',
    coordinates: { lat: -1.3667, lng: 36.7333 },
    address: 'Quickmart, Langata Road, Nairobi',
    contactPerson: 'Lucy Njeri',
    phone: '+254 767 890 123',
    email: 'quickmart@example.com',
    operatingHours: {
      monday: '7:00 AM - 9:00 PM',
      tuesday: '7:00 AM - 9:00 PM',
      wednesday: '7:00 AM - 9:00 PM',
      thursday: '7:00 AM - 9:00 PM',
      friday: '7:00 AM - 9:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 8:00 PM'
    },
    deliveryInstructions: 'Rear entrance, ring bell for assistance',
    averageOrderValue: 5600,
    monthlyOrders: 189,
    onTimeDeliveryRate: 82.5,
    distanceFromWarehouse: 11.5,
    routeId: null,
    assignedVehicles: [],
    createdAt: '2024-02-15',
    lastDelivery: '2024-03-10',
    peakHours: ['09:00-11:00', '16:00-19:00'],
    specialRequirements: ['None'],
    rating: 3.8,
    totalDeliveries: 1234,
    returnRate: 4.5,
    preferredDeliveryTime: '10:00-14:00'
  },
  { 
    id: 7, 
    name: 'Two Rivers Mall', 
    code: 'STR-007',
    type: 'Mall',
    status: 'draft',
    priority: 'high',
    location: 'Limuru Road, Nairobi',
    coordinates: { lat: -1.2119, lng: 36.8249 },
    address: 'Two Rivers Mall, Limuru Road, Nairobi',
    contactPerson: 'David Maina',
    phone: '+254 778 901 234',
    email: 'tworivers@example.com',
    operatingHours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    deliveryInstructions: 'Dedicated delivery hub at lower ground level',
    averageOrderValue: 22400,
    monthlyOrders: 0,
    onTimeDeliveryRate: 0,
    distanceFromWarehouse: 18.7,
    routeId: null,
    assignedVehicles: [],
    createdAt: '2024-03-01',
    lastDelivery: null,
    peakHours: [],
    specialRequirements: ['Pallet jack required', 'Morning delivery only'],
    rating: 0,
    totalDeliveries: 0,
    returnRate: 0,
    preferredDeliveryTime: '07:00-10:00'
  },
  { 
    id: 8, 
    name: 'Naivas CBD', 
    code: 'STR-008',
    type: 'Supermarket',
    status: 'active',
    priority: 'high',
    location: 'CBD, Nairobi',
    coordinates: { lat: -1.2833, lng: 36.8199 },
    address: 'Naivas, Moi Avenue, Nairobi',
    contactPerson: 'Grace Wanjiku',
    phone: '+254 789 012 345',
    email: 'naivas@example.com',
    operatingHours: {
      monday: '8:00 AM - 9:00 PM',
      tuesday: '8:00 AM - 9:00 PM',
      wednesday: '8:00 AM - 9:00 PM',
      thursday: '8:00 AM - 9:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '8:00 AM - 9:00 PM',
      sunday: '9:00 AM - 8:00 PM'
    },
    deliveryInstructions: 'Loading bay on Mfangano Street side',
    averageOrderValue: 14700,
    monthlyOrders: 456,
    onTimeDeliveryRate: 89.7,
    distanceFromWarehouse: 3.2,
    routeId: 2,
    assignedVehicles: ['KCD 456B'],
    createdAt: '2024-02-05',
    lastDelivery: '2024-03-14',
    peakHours: ['10:00-12:00', '15:00-18:00'],
    specialRequirements: ['Express delivery'],
    rating: 4.2,
    totalDeliveries: 3120,
    returnRate: 2.8,
    preferredDeliveryTime: '06:00-09:00'
  }
];

const mockPerformanceStats = [
  { month: 'Jan', deliveries: 245, onTimeRate: 91.2, value: 2.45 },
  { month: 'Feb', deliveries: 278, onTimeRate: 92.5, value: 2.89 },
  { month: 'Mar', deliveries: 312, onTimeRate: 94.1, value: 3.34 },
  { month: 'Apr', deliveries: 289, onTimeRate: 93.2, value: 3.12 },
  { month: 'May', deliveries: 301, onTimeRate: 93.8, value: 3.28 },
  { month: 'Jun', deliveries: 334, onTimeRate: 94.5, value: 3.67 }
];

const StoresManagement = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedStore, setSelectedStore] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAssignRouteModal, setShowAssignRouteModal] = useState(false);
  const [selectedStoreForRoute, setSelectedStoreForRoute] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Toggle row expansion
  const toggleRow = (storeId) => {
    setExpandedRows(prev => ({
      ...prev,
      [storeId]: !prev[storeId]
    }));
  };

  // Filter stores
  const filteredStores = mockStores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    const matchesType = typeFilter === 'all' || store.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || store.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalStores: mockStores.length,
    activeStores: mockStores.filter(s => s.status === 'active').length,
    totalMonthlyOrders: mockStores.reduce((sum, s) => sum + s.monthlyOrders, 0),
    avgOnTimeRate: (mockStores.filter(s => s.onTimeDeliveryRate > 0).reduce((sum, s) => sum + s.onTimeDeliveryRate, 0) / mockStores.filter(s => s.onTimeDeliveryRate > 0).length).toFixed(1),
    totalMonthlyValue: mockStores.reduce((sum, s) => sum + (s.averageOrderValue * s.monthlyOrders), 0),
    avgDistance: (mockStores.reduce((sum, s) => sum + s.distanceFromWarehouse, 0) / mockStores.length).toFixed(1),
    avgRating: (mockStores.filter(s => s.rating > 0).reduce((sum, s) => sum + s.rating, 0) / mockStores.filter(s => s.rating > 0).length).toFixed(1),
    totalStoresWithIssues: mockStores.filter(s => s.onTimeDeliveryRate < 85 && s.onTimeDeliveryRate > 0).length
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Store data refreshed');
    }, 1000);
  };

  const handleAssignRoute = (store) => {
    setSelectedStoreForRoute(store);
    setShowAssignRouteModal(true);
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

  const getStoreTypeIcon = (type) => {
    switch(type) {
      case 'Mall': return <Building2 className="w-4 h-4" />;
      case 'Supermarket': return <ShoppingBag className="w-4 h-4" />;
      default: return <Store className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount);
  };

  const getPerformanceIndicator = (onTimeRate) => {
    if (onTimeRate >= 90) return { icon: TrendingUp, color: 'text-green-600', label: 'Excellent' };
    if (onTimeRate >= 75) return { icon: Activity, color: 'text-yellow-600', label: 'Good' };
    return { icon: TrendingDown, color: 'text-red-600', label: 'Needs Improvement' };
  };

  const getStarRating = (rating) => {
    if (rating === 0) return <span className="text-xs text-gray-400">No ratings</span>;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stores Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage store locations, track performance, and optimize delivery routes
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
            onClick={() => navigate('/fleet/stores-management/add')}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Store
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Stores</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStores}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Store className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Active: {stats.activeStores} stores</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMonthlyOrders.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 12.5% from last month</p>
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
          <p className="text-xs text-green-600 mt-2">↑ 2.3% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalMonthlyValue)}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">From {stats.totalStoresWithIssues} stores need attention</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('stores')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'stores' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Store className="w-4 h-4" />
          All Stores
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockStores.length}
          </span>
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
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'map' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Map className="w-4 h-4" />
          Store Mapping
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'insights' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          Insights & Recommendations
        </button>
      </div>

      {/* Tab 1: All Stores - Table View */}
      {activeTab === 'stores' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores by name, code, or location..."
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
                <option value="all">All Types</option>
                <option value="Mall">Mall</option>
                <option value="Supermarket">Supermarket</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedStores.length} of {filteredStores.length} stores
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="w-10 px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Info</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders & Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedStores.map((store) => {
                  const performance = getPerformanceIndicator(store.onTimeDeliveryRate);
                  const PerformanceIcon = performance.icon;
                  
                  return (
                    <React.Fragment key={store.id}>
                      {/* Main Row */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition group">
                        {/* Expand/Collapse Button */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleRow(store.id)}
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                          >
                            <ChevronRight 
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                expandedRows[store.id] ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>
                        </td>
                        
                        {/* Store Info */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                              {getStoreTypeIcon(store.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900 dark:text-white">{store.name}</p>
                                {getStatusBadge(store.status)}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">{store.code}</p>
                            </div>
                          </div>
                        </td>
                        
                        {/* Location */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{store.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <NavigationIcon className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{store.distanceFromWarehouse} km from warehouse</span>
                          </div>
                         </td>
                        
                        {/* Performance */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <PerformanceIcon className={`w-4 h-4 ${performance.color}`} />
                            <span className="text-sm font-semibold">{store.onTimeDeliveryRate}%</span>
                            <span className="text-xs text-gray-500">on-time</span>
                          </div>
                          <div className="mt-1">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  store.onTimeDeliveryRate >= 90 ? 'bg-green-500' :
                                  store.onTimeDeliveryRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${store.onTimeDeliveryRate}%` }}
                              />
                            </div>
                          </div>
                         </td>
                        
                        {/* Orders & Value */}
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {store.monthlyOrders} orders
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(store.averageOrderValue)} avg
                          </div>
                          <div className="text-xs text-green-600 font-medium mt-1">
                            {formatCurrency(store.averageOrderValue * store.monthlyOrders)} total
                          </div>
                         </td>
                        
                        {/* Rating */}
                        <td className="px-4 py-3">
                          {getStarRating(store.rating)}
                          <div className="text-xs text-gray-500 mt-1">
                            Return rate: {store.returnRate}%
                          </div>
                         </td>
                        
                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedStore(store)}
                              className="p-1.5 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="Edit Store"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAssignRoute(store)}
                              className="px-3 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs rounded-lg hover:bg-brand-100 transition font-medium"
                            >
                              {store.routeId ? 'View Route' : 'Assign Route'}
                            </button>
                          </div>
                         </td>
                       </tr>
                      
                      {/* Expanded Details Row */}
                      {expandedRows[store.id] && (
                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                          <td colSpan="7" className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {/* Contact Information */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <Users className="w-3 h-3" />
                                  Contact Information
                                </h4>
                                <div className="space-y-1.5">
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-medium">Contact Person:</span> {store.contactPerson}
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-gray-400" />
                                    {store.phone}
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-gray-400" />
                                    {store.email}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Delivery Details */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <Truck className="w-3 h-3" />
                                  Delivery Details
                                </h4>
                                <div className="space-y-1.5">
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Preferred Time:</span> {store.preferredDeliveryTime}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Peak Hours:</span> {store.peakHours.join(', ')}
                                  </p>
                                  {store.specialRequirements.length > 0 && (
                                    <div className="mt-2">
                                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requirements:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {store.specialRequirements.map((req, idx) => (
                                          <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                            {req}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Operating Hours Summary */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <Clock className="w-3 h-3" />
                                  Operating Hours
                                </h4>
                                <div className="space-y-1">
                                  {Object.entries(store.operatingHours).slice(0, 5).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between text-xs">
                                      <span className="capitalize text-gray-600 dark:text-gray-400">{day}:</span>
                                      <span className="text-gray-700 dark:text-gray-300">{hours}</span>
                                    </div>
                                  ))}
                                  <button className="text-xs text-brand-600 hover:text-brand-700 mt-1">
                                    View full schedule →
                                  </button>
                                </div>
                              </div>
                              
                              {/* Delivery Instructions */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <AlertCircle className="w-3 h-3" />
                                  Delivery Instructions
                                </h4>
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {store.deliveryInstructions}
                                  </p>
                                </div>
                                {store.assignedVehicles.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Assigned Vehicles:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {store.assignedVehicles.map((vehicle, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 text-xs rounded">
                                          {vehicle}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Action Buttons in Expanded View */}
                            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <button className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                View Delivery History
                              </button>
                              <button className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                                <BarChart3 className="w-4 h-4" />
                                View Performance Reports
                              </button>
                              <button className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                Contact Store
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
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

      {/* Tab 2: Performance Analytics */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Average Rating</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.avgRating}</p>
              <p className="text-sm text-green-100">/5.0 from all stores</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Total Deliveries</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStores.reduce((sum, s) => sum + s.totalDeliveries, 0).toLocaleString()}</p>
              <p className="text-xs text-green-600">+18.3% growth</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Return Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{((mockStores.reduce((sum, s) => sum + s.returnRate, 0) / mockStores.length)).toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Industry avg: 2.5%</p>
            </div>
          </div>

          {/* Store Performance Scorecard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Store Performance Scorecard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Store Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">On-Time Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Monthly Orders</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Avg Order Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Return Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {mockStores.filter(s => s.onTimeDeliveryRate > 0).map((store) => {
                    const performance = getPerformanceIndicator(store.onTimeDeliveryRate);
                    const PerformanceIcon = performance.icon;
                    return (
                      <tr key={store.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 dark:text-white">{store.name}</div>
                          <div className="text-xs text-gray-500">{store.location}</div>
                         </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <PerformanceIcon className={`w-4 h-4 ${performance.color}`} />
                            <span className="font-semibold">{store.onTimeDeliveryRate}%</span>
                          </div>
                         </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{store.monthlyOrders}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(store.averageOrderValue)}</td>
                        <td className="px-4 py-3">{getStarRating(store.rating)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{store.returnRate}%</td>
                        <td className="px-4 py-3">
                          {store.onTimeDeliveryRate >= 90 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : store.onTimeDeliveryRate >= 75 ? (
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

          {/* Monthly Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Performance Trend</h3>
            <div className="space-y-4">
              {mockPerformanceStats.map((stat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{stat.month}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{stat.deliveries} deliveries</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.deliveries / 350) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">On-Time: {stat.onTimeRate}%</span>
                    <span className="text-gray-500">Value: {formatCurrency(stat.value * 1000000)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Store Mapping */}
      {activeTab === 'map' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Store Location Map</h3>
                <p className="text-sm text-gray-500 mt-1">Geographic distribution of all store locations</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Show All
                </button>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Satellite View
                </button>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700">
                {/* Grid pattern to simulate map */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Store pins */}
              {mockStores.map((store) => (
                <div
                  key={store.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${((store.coordinates.lng + 36.8) / 0.8) * 100}%`,
                    top: `${((store.coordinates.lat + 1.4) / 0.4) * 100}%`
                  }}
                >
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse ${
                      store.status === 'active' ? 'bg-green-500' : store.status === 'inactive' ? 'bg-gray-500' : 'bg-yellow-500'
                    }`} />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap z-10">
                      <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg text-xs">
                        <p className="font-medium">{store.name}</p>
                        <p className="text-gray-500">{store.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="relative z-10 text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Interactive Map View</p>
                <p className="text-sm text-gray-400">{mockStores.length} stores located across Nairobi</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Active Stores ({mockStores.filter(s => s.status === 'active').length})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Inactive Stores ({mockStores.filter(s => s.status === 'inactive').length})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">Draft Stores ({mockStores.filter(s => s.status === 'draft').length})</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <NavigationIcon className="w-3 h-3 text-brand-600" />
                <span className="text-gray-600 dark:text-gray-400">Warehouse Location</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Insights & Recommendations */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Top Performing Stores */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top Performing Stores
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockStores.filter(s => s.onTimeDeliveryRate > 0).sort((a, b) => b.rating - a.rating).slice(0, 3).map((store) => (
                <div key={store.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{store.name}</span>
                        {getStarRating(store.rating)}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>⭐ {store.rating}/5.0</span>
                        <span>📦 {store.monthlyOrders} orders/mo</span>
                        <span>✅ {store.onTimeDeliveryRate}% on-time</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{formatCurrency(store.averageOrderValue * store.monthlyOrders)}</p>
                      <p className="text-xs text-gray-400">monthly revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Opportunities */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-5 border border-orange-100 dark:border-orange-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Improvement Opportunities
            </h3>
            <div className="space-y-3">
              {mockStores.filter(s => s.onTimeDeliveryRate < 85 && s.onTimeDeliveryRate > 0).map((store) => (
                <div key={store.id} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{store.name}</p>
                    <p className="text-xs text-gray-500">On-time rate: {store.onTimeDeliveryRate}% - Below target of 90%</p>
                    <p className="text-xs text-orange-600 mt-1">Recommendation: Optimize delivery schedule and increase frequency</p>
                  </div>
                  <button className="text-xs text-brand-600 hover:text-brand-700">Review</button>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Strategic Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New Store Location Suggestion</p>
                  <p className="text-xs text-gray-500">High demand area identified in Kilimani. Potential for 300+ monthly orders.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Extend Operating Hours</p>
                  <p className="text-xs text-gray-500">6 stores could benefit from late-night delivery slots (8-10 PM)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Route Consolidation</p>
                  <p className="text-xs text-gray-500">Combine deliveries to nearby stores to reduce trips by 15%</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Volume Discount Program</p>
                  <p className="text-xs text-gray-500">Implement tiered pricing for high-volume stores to increase loyalty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Store Details Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStore(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedStore.name}</h3>
                <p className="text-xs text-gray-500">{selectedStore.code}</p>
              </div>
              <button onClick={() => setSelectedStore(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Store Summary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <MapPin className="w-4 h-4" />
                    {selectedStore.location}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Distance from Warehouse</p>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <NavigationIcon className="w-4 h-4" />
                    {selectedStore.distanceFromWarehouse} km
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{selectedStore.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedStore.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedStore.email}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Instructions</p>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-sm text-gray-600">
                  {selectedStore.deliveryInstructions}
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operating Hours</p>
                <div className="space-y-1 text-sm">
                  {Object.entries(selectedStore.operatingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{day}</span>
                      <span className="text-gray-900 dark:text-white">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-gray-500">On-Time Rate</p>
                  <p className="text-lg font-bold text-green-600">{selectedStore.onTimeDeliveryRate}%</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-gray-500">Monthly Orders</p>
                  <p className="text-lg font-bold text-blue-600">{selectedStore.monthlyOrders}</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-xs text-gray-500">Avg Order Value</p>
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(selectedStore.averageOrderValue)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  Edit Store
                </button>
                <button 
                  onClick={() => {
                    handleAssignRoute(selectedStore);
                    setSelectedStore(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <NavigationIcon className="w-4 h-4" />
                  {selectedStore.routeId ? 'View Route' : 'Assign Route'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Route Modal */}
      {showAssignRouteModal && selectedStoreForRoute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAssignRouteModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Assign Route</h3>
              <button onClick={() => setShowAssignRouteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Store: <span className="font-medium text-gray-900 dark:text-white">{selectedStoreForRoute.name}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Location: <span className="text-gray-900 dark:text-white">{selectedStoreForRoute.location}</span></p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Route</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Choose a route...</option>
                    <option value="1">Westlands Delivery Route ({selectedStoreForRoute.distanceFromWarehouse} km away)</option>
                    <option value="2">Industrial Area Cargo Route</option>
                    <option value="3">Eastlands Express</option>
                    <option value="5">Kiambu Road Long Route</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success(`Route assigned to ${selectedStoreForRoute.name} successfully!`);
                  setShowAssignRouteModal(false);
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Assign Route
              </button>
              <button onClick={() => setShowAssignRouteModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresManagement;