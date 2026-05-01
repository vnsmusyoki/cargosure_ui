import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Download, Printer, MoreVertical, 
  Eye, Edit, Trash2, Package, Truck, Clock, CheckCircle, 
  AlertCircle, X, ChevronLeft, ChevronRight, RefreshCw,
  DollarSign, User, MapPin, Phone, Mail, Calendar, 
  Star, MessageSquare, Send, FileText, Copy, Printer as PrintIcon,
  Filter as FilterIcon, Download as DownloadIcon, Settings,
  Warehouse, Building, Boxes, Users, Activity, BarChart3,
  TrendingUp, TrendingDown, Navigation, Grid3x3, List,
  ClipboardList, Shield, Zap, AlertTriangle, CheckSquare,
  Thermometer, Snowflake, Flame, Wifi, Power, Camera,
  BarChart, PieChart, Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock warehouse data
const mockWarehouses = [
  {
    id: 'WH-001',
    name: 'Nairobi Main Hub',
    code: 'NBO-MAIN',
    location: {
      address: 'Industrial Area, Nairobi',
      city: 'Nairobi',
      country: 'Kenya',
      coordinates: { lat: -1.2921, lng: 36.8219 },
      region: 'Nairobi Region'
    },
    status: 'active',
    capacity: {
      total: 50000,
      used: 32450,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 12500,
      totalOrders: 2340,
      categories: ['Electronics', 'Groceries', 'Clothing', 'Medical', 'Books']
    },
    staff: {
      total: 45,
      managers: 5,
      supervisors: 8,
      workers: 32
    },
    performance: {
      efficiency: 94,
      accuracy: 98.5,
      onTimeDispatch: 96
    },
    facilities: {
      hasColdStorage: true,
      hasHazardousStorage: false,
      hasAutomation: true,
      securityLevel: 'high',
      loadingDocks: 8,
      parkingSpaces: 25
    },
    contact: {
      phone: '+254 700 111 222',
      email: 'nairobi@warehouse.co.ke',
      manager: 'John Kimani'
    },
    createdAt: '2023-01-15T08:00:00',
    lastUpdated: '2024-03-15T10:30:00',
    upcomingShipments: 45,
    outgoingShipments: 32,
    pendingTasks: 12
  },
  {
    id: 'WH-002',
    name: 'Mombasa Port Warehouse',
    code: 'MBA-PORT',
    location: {
      address: 'Port Area, Mombasa',
      city: 'Mombasa',
      country: 'Kenya',
      coordinates: { lat: -4.0435, lng: 39.6682 },
      region: 'Coastal Region'
    },
    status: 'active',
    capacity: {
      total: 75000,
      used: 45890,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 18750,
      totalOrders: 3100,
      categories: ['Electronics', 'Appliances', 'Furniture', 'Auto Parts']
    },
    staff: {
      total: 62,
      managers: 7,
      supervisors: 10,
      workers: 45
    },
    performance: {
      efficiency: 92,
      accuracy: 97.8,
      onTimeDispatch: 94
    },
    facilities: {
      hasColdStorage: true,
      hasHazardousStorage: true,
      hasAutomation: false,
      securityLevel: 'high',
      loadingDocks: 12,
      parkingSpaces: 40
    },
    contact: {
      phone: '+254 711 333 444',
      email: 'mombasa@warehouse.co.ke',
      manager: 'Fatima Hassan'
    },
    createdAt: '2023-03-20T10:00:00',
    lastUpdated: '2024-03-15T09:15:00',
    upcomingShipments: 67,
    outgoingShipments: 48,
    pendingTasks: 18
  },
  {
    id: 'WH-003',
    name: 'Kisumu Regional Hub',
    code: 'KSM-REG',
    location: {
      address: 'Industrial Area, Kisumu',
      city: 'Kisumu',
      country: 'Kenya',
      coordinates: { lat: -0.0917, lng: 34.7680 },
      region: 'Lake Region'
    },
    status: 'active',
    capacity: {
      total: 35000,
      used: 18900,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 8450,
      totalOrders: 1560,
      categories: ['Groceries', 'Medical', 'Books', 'Stationery']
    },
    staff: {
      total: 28,
      managers: 3,
      supervisors: 5,
      workers: 20
    },
    performance: {
      efficiency: 96,
      accuracy: 99.1,
      onTimeDispatch: 97
    },
    facilities: {
      hasColdStorage: false,
      hasHazardousStorage: false,
      hasAutomation: false,
      securityLevel: 'medium',
      loadingDocks: 4,
      parkingSpaces: 15
    },
    contact: {
      phone: '+254 722 555 666',
      email: 'kisumu@warehouse.co.ke',
      manager: 'Peter Otieno'
    },
    createdAt: '2023-06-10T14:30:00',
    lastUpdated: '2024-03-15T08:45:00',
    upcomingShipments: 28,
    outgoingShipments: 19,
    pendingTasks: 8
  },
  {
    id: 'WH-004',
    name: 'Nakuru Logistics Center',
    code: 'NKR-LOG',
    location: {
      address: 'Milimani, Nakuru',
      city: 'Nakuru',
      country: 'Kenya',
      coordinates: { lat: -0.3031, lng: 36.0800 },
      region: 'Rift Valley'
    },
    status: 'maintenance',
    capacity: {
      total: 28000,
      used: 12340,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 5670,
      totalOrders: 890,
      categories: ['Electronics', 'Clothing', 'Sports Equipment']
    },
    staff: {
      total: 22,
      managers: 2,
      supervisors: 4,
      workers: 16
    },
    performance: {
      efficiency: 85,
      accuracy: 94.2,
      onTimeDispatch: 88
    },
    facilities: {
      hasColdStorage: false,
      hasHazardousStorage: false,
      hasAutomation: false,
      securityLevel: 'medium',
      loadingDocks: 3,
      parkingSpaces: 12
    },
    contact: {
      phone: '+254 733 777 888',
      email: 'nakuru@warehouse.co.ke',
      manager: 'Grace Muthoni'
    },
    createdAt: '2023-09-05T11:15:00',
    lastUpdated: '2024-03-14T16:20:00',
    upcomingShipments: 15,
    outgoingShipments: 8,
    pendingTasks: 24
  },
  {
    id: 'WH-005',
    name: 'Eldoret Distribution Hub',
    code: 'ELD-DIST',
    location: {
      address: 'Industrial Area, Eldoret',
      city: 'Eldoret',
      country: 'Kenya',
      coordinates: { lat: 0.5143, lng: 35.2698 },
      region: 'North Rift'
    },
    status: 'active',
    capacity: {
      total: 32000,
      used: 21560,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 9820,
      totalOrders: 1750,
      categories: ['Groceries', 'Appliances', 'Furniture']
    },
    staff: {
      total: 35,
      managers: 4,
      supervisors: 6,
      workers: 25
    },
    performance: {
      efficiency: 91,
      accuracy: 96.5,
      onTimeDispatch: 93
    },
    facilities: {
      hasColdStorage: true,
      hasHazardousStorage: false,
      hasAutomation: true,
      securityLevel: 'high',
      loadingDocks: 5,
      parkingSpaces: 20
    },
    contact: {
      phone: '+254 744 999 000',
      email: 'eldoret@warehouse.co.ke',
      manager: 'David Kipchoge'
    },
    createdAt: '2023-11-12T09:45:00',
    lastUpdated: '2024-03-15T11:00:00',
    upcomingShipments: 34,
    outgoingShipments: 26,
    pendingTasks: 10
  },
  {
    id: 'WH-006',
    name: 'Thika Manufacturing Warehouse',
    code: 'THK-MFG',
    location: {
      address: 'Garissa Road, Thika',
      city: 'Thika',
      country: 'Kenya',
      coordinates: { lat: -1.0388, lng: 37.0833 },
      region: 'Central Region'
    },
    status: 'active',
    capacity: {
      total: 45000,
      used: 38750,
      unit: 'sq ft'
    },
    inventory: {
      totalItems: 15600,
      totalOrders: 2850,
      categories: ['Raw Materials', 'Manufactured Goods', 'Packaging']
    },
    staff: {
      total: 78,
      managers: 8,
      supervisors: 12,
      workers: 58
    },
    performance: {
      efficiency: 93,
      accuracy: 97.2,
      onTimeDispatch: 95
    },
    facilities: {
      hasColdStorage: false,
      hasHazardousStorage: true,
      hasAutomation: true,
      securityLevel: 'high',
      loadingDocks: 10,
      parkingSpaces: 35
    },
    contact: {
      phone: '+254 755 111 222',
      email: 'thika@warehouse.co.ke',
      manager: 'James Njoroge'
    },
    createdAt: '2023-02-28T13:20:00',
    lastUpdated: '2024-03-15T07:30:00',
    upcomingShipments: 52,
    outgoingShipments: 41,
    pendingTasks: 15
  }
];

const WareHousesManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  // Removed selectedWarehouse state and modal logic
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 8;

  // Get unique regions for filter
  const regions = [...new Set(mockWarehouses.map(w => w.location.region))];

  // Filter warehouses
  const filteredWarehouses = mockWarehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          warehouse.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          warehouse.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || warehouse.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || warehouse.location.region === regionFilter;
    
    let matchesCapacity = true;
    if (capacityFilter === 'high') matchesCapacity = warehouse.capacity.used / warehouse.capacity.total > 0.7;
    if (capacityFilter === 'medium') matchesCapacity = warehouse.capacity.used / warehouse.capacity.total <= 0.7 && warehouse.capacity.used / warehouse.capacity.total > 0.3;
    if (capacityFilter === 'low') matchesCapacity = warehouse.capacity.used / warehouse.capacity.total <= 0.3;
    
    return matchesSearch && matchesStatus && matchesRegion && matchesCapacity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredWarehouses.length / itemsPerPage);
  const paginatedWarehouses = filteredWarehouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: mockWarehouses.length,
    active: mockWarehouses.filter(w => w.status === 'active').length,
    maintenance: mockWarehouses.filter(w => w.status === 'maintenance').length,
    totalCapacity: mockWarehouses.reduce((sum, w) => sum + w.capacity.total, 0),
    usedCapacity: mockWarehouses.reduce((sum, w) => sum + w.capacity.used, 0),
    totalStaff: mockWarehouses.reduce((sum, w) => sum + w.staff.total, 0),
    totalInventory: mockWarehouses.reduce((sum, w) => sum + w.inventory.totalItems, 0),
    avgEfficiency: Math.round(mockWarehouses.reduce((sum, w) => sum + w.performance.efficiency, 0) / mockWarehouses.length),
    totalOrders: mockWarehouses.reduce((sum, w) => sum + w.inventory.totalOrders, 0)
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Warehouses data refreshed');
    }, 1000);
  };

  const handleDeleteWarehouse = (warehouse) => {
    toast.success(`Warehouse ${warehouse.name} deleted successfully`);
    setShowDeleteModal(null);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      maintenance: { icon: AlertCircle, text: 'Maintenance', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getCapacityBar = (used, total) => {
    const percentage = (used / total) * 100;
    let colorClass = 'bg-green-500';
    if (percentage > 80) colorClass = 'bg-red-500';
    else if (percentage > 60) colorClass = 'bg-yellow-500';
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}%</span>
          <span className="text-gray-600 dark:text-gray-400">{used.toLocaleString()} / {total.toLocaleString()} {total.unit}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className={`${colorClass} h-2 rounded-full transition-all duration-300`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  };

  const WarehouseCard = ({ warehouse }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
              <Warehouse className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{warehouse.name}</h3>
              <p className="text-xs text-gray-500">{warehouse.code}</p>
            </div>
          </div>
          {getStatusBadge(warehouse.status)}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="text-gray-600 dark:text-gray-400">
              <p>{warehouse.location.address}</p>
              <p className="text-xs">{warehouse.location.city}, {warehouse.location.country}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{warehouse.staff.total} Staff Members</span>
          </div>
        </div>

        {getCapacityBar(warehouse.capacity.used, warehouse.capacity.total)}

        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500">Efficiency</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{warehouse.performance.efficiency}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Accuracy</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{warehouse.performance.accuracy}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">On-Time</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{warehouse.performance.onTimeDispatch}%</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/inventory/warehouses/view/${warehouse.id}`)}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-1.5 rounded-lg text-xs font-medium transition"
          >
            View Details
          </button>
          <button
            onClick={() => navigate(`/inventory/warehouses/edit/${warehouse.id}`)}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Warehouse Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor all warehouse facilities, inventory, and operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/inventory/warehouses/create')}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Warehouse
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Warehouses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Building className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="text-green-600">{stats.active} Active</span> | <span className="text-orange-600">{stats.maintenance} Maintenance</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats.totalCapacity / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Used: {(stats.usedCapacity / 1000).toFixed(0)}K sq ft
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStaff}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Across all warehouses
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Inventory</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats.totalInventory / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Items in stock
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgEfficiency}%</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            +5% from last month
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, code, city..."
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
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="all">All Capacity</option>
              <option value="high">High (&gt;70%)</option>
              <option value="medium">Medium (30-70%)</option>
              <option value="low">Low (&lt;30%)</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600' : 'text-gray-400'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition">
              <DownloadIcon className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Warehouses View */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Warehouse</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Staff</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedWarehouses.map((warehouse) => (
                  <tr key={warehouse.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer" onClick={() => navigate(`/inventory/warehouses/view/${warehouse.id}`)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
                          <Warehouse className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{warehouse.name}</div>
                          <div className="text-xs text-gray-500">{warehouse.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 dark:text-white">{warehouse.location.city}</div>
                      <div className="text-xs text-gray-500">{warehouse.location.region}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="min-w-[150px]">
                        {getCapacityBar(warehouse.capacity.used, warehouse.capacity.total)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 dark:text-white">{warehouse.staff.total}</div>
                      <div className="text-xs text-gray-500">{warehouse.staff.managers} managers</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{warehouse.performance.efficiency}%</div>
                      <div className="text-xs text-gray-500">Accuracy: {warehouse.performance.accuracy}%</div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(warehouse.status)}</td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/inventory/warehouses/view/${warehouse.id}`)}
                          className="p-1.5 text-gray-400 hover:text-brand-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/warehouses-management/edit/${warehouse.id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(warehouse)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredWarehouses.length)} of {filteredWarehouses.length} warehouses
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedWarehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          ))}
        </div>
      )}

      {/* Warehouse Details Modal removed. Viewing is now handled by navigation. */}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Delete Warehouse</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete warehouse <span className="font-semibold">{showDeleteModal.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDeleteWarehouse(showDeleteModal)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
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

export default WareHousesManagement;