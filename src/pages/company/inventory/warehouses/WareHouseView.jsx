import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Edit, Trash2, MoreVertical, Download, Printer,
  Warehouse, MapPin, Users, Package, Activity, Shield, Phone,
  Mail, User, Building, Layers, Thermometer, Snowflake, Flame,
  Wifi, Power, Camera, Truck, Clock, AlertCircle, CheckCircle,
  TrendingUp, TrendingDown, BarChart3, PieChart, Calendar,
  DollarSign, Box, Grid, List, Eye, Navigation, Globe,
  RefreshCw, Send, FileText, Copy, Settings, Star,
  ChevronLeft, ChevronRight, ChevronDown, Plus, X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

const WareHouseView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newOrderSearch, setNewOrderSearch] = useState('');
  const [currentNewOrderPage, setCurrentNewOrderPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Mock warehouse data (in real app, fetch based on id)
  const warehouse = {
    id: 'WH-001',
    name: 'Nairobi Main Hub',
    code: 'NBO-MAIN',
    type: 'distribution',
    status: 'active',
    location: {
      address: 'Industrial Area, Mombasa Road',
      city: 'Nairobi',
      state: 'Nairobi County',
      country: 'Kenya',
      postalCode: '00100',
      region: 'Nairobi Region',
      coordinates: { lat: -1.2921, lng: 36.8219 },
      nearbyLandmarks: ['Jomo Kenyatta International Airport', 'Mombasa Road Highway']
    },
    capacity: {
      total: 50000,
      used: 32450,
      unit: 'sq ft',
      utilization: 64.9,
      shelves: 500,
      racks: 200,
      bays: 50
    },
    inventory: {
      totalItems: 12500,
      totalOrders: 2340,
      pendingOrders: 45,
      inTransitOrders: 32,
      categories: [
        { name: 'Electronics', count: 4500, percentage: 36 },
        { name: 'Groceries', count: 3200, percentage: 25.6 },
        { name: 'Clothing', count: 2100, percentage: 16.8 },
        { name: 'Medical', count: 1500, percentage: 12 },
        { name: 'Books', count: 1200, percentage: 9.6 }
      ],
      topProducts: [
        { name: 'Smartphone X', sku: 'ELEC-001', quantity: 500, value: 25000000 },
        { name: 'Laptop Pro', sku: 'ELEC-002', quantity: 200, value: 40000000 },
        { name: 'Organic Rice', sku: 'GROC-001', quantity: 1000, value: 1500000 }
      ]
    },
    staff: {
      total: 45,
      managers: 5,
      supervisors: 8,
      workers: 32,
      onDuty: 28,
      attendance: 94,
      departments: [
        { name: 'Operations', count: 15 },
        { name: 'Inventory', count: 12 },
        { name: 'Shipping', count: 10 },
        { name: 'Receiving', count: 8 }
      ]
    },
    performance: {
      efficiency: 94,
      accuracy: 98.5,
      onTimeDispatch: 96,
      dailyThroughput: 1250,
      weeklyTrend: [
        { day: 'Mon', orders: 320, delivered: 310 },
        { day: 'Tue', orders: 345, delivered: 338 },
        { day: 'Wed', orders: 330, delivered: 325 },
        { day: 'Thu', orders: 360, delivered: 352 },
        { day: 'Fri', orders: 380, delivered: 370 },
        { day: 'Sat', orders: 290, delivered: 285 },
        { day: 'Sun', orders: 210, delivered: 208 }
      ],
      monthlyMetrics: [
        { month: 'Jan', efficiency: 92, accuracy: 97.5 },
        { month: 'Feb', efficiency: 93, accuracy: 98.0 },
        { month: 'Mar', efficiency: 94, accuracy: 98.5 }
      ]
    },
    facilities: {
      hasColdStorage: true,
      coldStorageCapacity: '5000 sq ft',
      coldStorageTemp: '-20°C to 4°C',
      hasHazardousStorage: false,
      hasAutomation: true,
      automationType: 'Conveyor belts, Automated sorting',
      securityLevel: 'high',
      hasCCTV: true,
      cameraCount: 48,
      hasFireSuppression: true,
      hasBackupPower: true,
      loadingDocks: 8,
      parkingSpaces: 25,
      hasRailAccess: false,
      hasAirAccess: true,
      amenities: ['Cafeteria', 'First Aid', 'Rest Areas', 'WiFi']
    },
    contact: {
      phone: '+254 700 111 222',
      email: 'nairobi@warehouse.co.ke',
      website: 'https://nairobi.warehouse.co.ke',
      manager: {
        name: 'John Kimani',
        phone: '+254 711 222 333',
        email: 'john.kimani@warehouse.co.ke',
        since: '2023-01-15'
      }
    },
    financials: {
      monthlyOperatingCost: 1250000,
      annualRevenue: 45000000,
      costPerSqFt: 25,
      revenuePerOrder: 1250,
      topCustomers: [
        { name: 'TechZone Solutions', orders: 450, revenue: 5625000 },
        { name: 'Fresh Grocers Ltd', orders: 380, revenue: 3120000 },
        { name: 'Electronics Plus', orders: 290, revenue: 4350000 }
      ]
    },
    documents: {
      licenseNumber: 'WHS-2023-001',
      taxId: 'P0012345678',
      insurancePolicy: 'INS-WH-2024-001',
      insuranceExpiry: '2025-03-31',
      certifications: ['ISO 9001:2021', 'ISO 22000', 'GMP Certified']
    },
    createdAt: '2023-01-15T08:00:00',
    lastUpdated: '2024-03-15T10:30:00',
    upcomingShipments: 45,
    outgoingShipments: 32,
    pendingTasks: 12
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Warehouse data refreshed');
    }, 1000);
  };

  const handleDelete = () => {
    toast.success(`Warehouse ${warehouse.name} deleted successfully`);
    setShowDeleteModal(false);
    navigate('/warehouses-management');
  };

  const handleExport = () => {
    toast.success('Warehouse report exported successfully');
  };

  const handleDownloadOrder = (order) => {
    toast.success(`Order ${order.orderId} downloaded`);
  };

  const handleMarkDispatched = (order) => {
    toast.success(`Order ${order.orderId} marked as dispatched`);
  };

  const handleViewOrderItems = (order) => {
    toast.success(`Viewing items for ${order.orderId}`);
  };

  // Mock new orders data
  const newOrders = [
    {
      orderId: 'ORD-1001',
      customer: 'TechZone Solutions',
      date: '2026-04-20',
      status: 'Pending',
      items: 12,
      value: 250000,
      priority: 'High',
      assignedTo: 'Peter Otieno',
      notes: 'Urgent delivery required'
    },
    {
      orderId: 'ORD-1002',
      customer: 'Fresh Grocers Ltd',
      date: '2026-04-21',
      status: 'Pending',
      items: 8,
      value: 120000,
      priority: 'Medium',
      assignedTo: 'Grace Muthoni',
      notes: ''
    },
    {
      orderId: 'ORD-1003',
      customer: 'Electronics Plus',
      date: '2026-04-21',
      status: 'Pending',
      items: 20,
      value: 400000,
      priority: 'High',
      assignedTo: 'John Kimani',
      notes: 'Handle with care'
    },
    {
      orderId: 'ORD-1004',
      customer: 'Book Haven',
      date: '2026-04-22',
      status: 'Pending',
      items: 5,
      value: 35000,
      priority: 'Low',
      assignedTo: 'Fatima Hassan',
      notes: ''
    }
  ];

  const newOrdersPerPage = 4;

  const filteredNewOrders = newOrders.filter((order) => {
    const search = newOrderSearch.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(search) ||
      order.customer.toLowerCase().includes(search) ||
      order.assignedTo.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search)
    );
  });

  const totalNewOrderPages = Math.max(1, Math.ceil(filteredNewOrders.length / newOrdersPerPage));
  const currentNewOrderPageIndex = Math.min(currentNewOrderPage, totalNewOrderPages);
  const paginatedNewOrders = filteredNewOrders.slice(
    (currentNewOrderPageIndex - 1) * newOrdersPerPage,
    currentNewOrderPageIndex * newOrdersPerPage
  );

  useEffect(() => {
    if (currentNewOrderPage > totalNewOrderPages) {
      setCurrentNewOrderPage(totalNewOrderPages);
    }
  }, [currentNewOrderPage, totalNewOrderPages]);

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      maintenance: { icon: AlertCircle, text: 'Maintenance', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' }
    };
    const { icon: Icon, text, className } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Warehouse },
    { id: 'newOrders', label: 'New Orders', icon: List },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/warehouses-management')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.name}</h1>
              {getStatusBadge(warehouse.status)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {warehouse.code} • {warehouse.type.charAt(0).toUpperCase() + warehouse.type.slice(1)} Center
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExport}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <Download className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => navigate(`/warehouses-management/edit/${id}`)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* New Orders Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">New Orders (Pending)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{newOrders.length}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <List className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total Value: KES {newOrders.reduce((sum, o) => sum + o.value, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Capacity Utilization</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.capacity.utilization}%</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${warehouse.capacity.utilization}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Inventory</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.inventory.totalItems.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{warehouse.inventory.totalOrders.toLocaleString()} orders processed</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Staff on Duty</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.staff.onDuty}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Attendance: {warehouse.staff.attendance}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overall Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.performance.efficiency}%</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Accuracy: {warehouse.performance.accuracy}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium transition whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* New Orders Tab */}
          {activeTab === 'newOrders' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-yellow-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Orders Waiting to be Processed</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      {filteredNewOrders.length} Matched
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      KES {filteredNewOrders.reduce((sum, o) => sum + o.value, 0).toLocaleString()} Total Value
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={newOrderSearch}
                      onChange={(e) => {
                        setNewOrderSearch(e.target.value);
                        setCurrentNewOrderPage(1);
                      }}
                      className="w-full pl-3 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>Page</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{currentNewOrderPageIndex}</span>
                    <span>of</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{totalNewOrderPages}</span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {paginatedNewOrders.map((order) => (
                      <React.Fragment key={order.orderId}>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button
                              onClick={() => setExpandedOrderId(expandedOrderId === order.orderId ? null : order.orderId)}
                              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              aria-label="Toggle order details"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${expandedOrderId === order.orderId ? 'rotate-180' : ''}`} />
                            </button>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-indigo-600 dark:text-indigo-400">{order.orderId}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white truncate max-w-[160px]">{order.customer}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">{order.items}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-gray-900 dark:text-white">KES {order.value.toLocaleString()}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold ${order.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : order.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                              {order.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm space-x-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDownloadOrder(order); }}
                              className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleMarkDispatched(order); }}
                              className="inline-flex items-center justify-center p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                              title="Mark as Dispatched"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleViewOrderItems(order); }}
                              className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
                              title="View Items"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        {expandedOrderId === order.orderId && (
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td colSpan={8} className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-900 dark:text-white">Assigned To</div>
                                  <div>{order.assignedTo}</div>
                                </div>
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-900 dark:text-white">Order Notes</div>
                                  <div>{order.notes || 'No notes available'}</div>
                                </div>
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-900 dark:text-white">Status</div>
                                  <div>{order.status}</div>
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

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  Showing {Math.min((currentNewOrderPageIndex - 1) * newOrdersPerPage + 1, filteredNewOrders.length)} to {Math.min(currentNewOrderPageIndex * newOrdersPerPage, filteredNewOrders.length)} of {filteredNewOrders.length} orders
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentNewOrderPage((page) => Math.max(1, page - 1))}
                    disabled={currentNewOrderPageIndex === 1}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentNewOrderPage((page) => Math.min(totalNewOrderPages, page + 1))}
                    disabled={currentNewOrderPageIndex === totalNewOrderPages}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Location Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    Location Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Address:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{warehouse.location.address}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">City:</span>
                      <span className="font-medium">{warehouse.location.city}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Region:</span>
                      <span className="font-medium">{warehouse.location.region}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Country:</span>
                      <span className="font-medium">{warehouse.location.country}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Coordinates:</span>
                      <span className="font-mono text-xs">{warehouse.location.coordinates.lat}, {warehouse.location.coordinates.lng}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Operational Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Established:</span>
                      <span className="font-medium">{new Date(warehouse.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                      <span className="font-medium">{new Date(warehouse.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Upcoming Shipments:</span>
                      <span className="font-medium text-orange-600">{warehouse.upcomingShipments}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Outgoing Shipments:</span>
                      <span className="font-medium text-blue-600">{warehouse.outgoingShipments}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Pending Tasks:</span>
                      <span className="font-medium text-red-600">{warehouse.pendingTasks}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Capacity Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-indigo-600">{warehouse.capacity.utilization}%</div>
                      <div className="text-sm text-gray-500">Utilization Rate</div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Used Capacity</span>
                          <span>{warehouse.capacity.used.toLocaleString()} {warehouse.capacity.unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${warehouse.capacity.utilization}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Available Capacity</span>
                          <span>{(warehouse.capacity.total - warehouse.capacity.used).toLocaleString()} {warehouse.capacity.unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${100 - warehouse.capacity.utilization}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.capacity.shelves.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Shelves</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.capacity.racks.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Racks</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.capacity.bays.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Bays</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{warehouse.facilities.loadingDocks}</div>
                      <div className="text-xs text-gray-500">Loading Docks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Weekly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={warehouse.performance.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#6366f1" name="Orders Processed" />
                    <Line type="monotone" dataKey="delivered" stroke="#10b981" name="Delivered" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Inventory by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={warehouse.inventory.categories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {warehouse.inventory.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Inventory Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-bold">{warehouse.inventory.totalItems.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-gray-600">Total Orders</span>
                      <span className="font-bold">{warehouse.inventory.totalOrders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-gray-600">Pending Orders</span>
                      <span className="font-bold text-orange-600">{warehouse.inventory.pendingOrders}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-gray-600">In Transit</span>
                      <span className="font-bold text-blue-600">{warehouse.inventory.inTransitOrders}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Top Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium">Product Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium">SKU</th>
                        <th className="px-4 py-2 text-right text-xs font-medium">Quantity</th>
                        <th className="px-4 py-2 text-right text-xs font-medium">Total Value (KES)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {warehouse.inventory.topProducts.map((product, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm">{product.name}</td>
                          <td className="px-4 py-2 text-sm font-mono">{product.sku}</td>
                          <td className="px-4 py-2 text-sm text-right">{product.quantity.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm text-right">{product.value.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold">{warehouse.performance.efficiency}%</div>
                  <div className="text-sm opacity-90">Overall Efficiency</div>
                  <TrendingUp className="w-8 h-8 mt-2 opacity-75" />
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold">{warehouse.performance.accuracy}%</div>
                  <div className="text-sm opacity-90">Order Accuracy</div>
                  <CheckCircle className="w-8 h-8 mt-2 opacity-75" />
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold">{warehouse.performance.onTimeDispatch}%</div>
                  <div className="text-sm opacity-90">On-Time Dispatch</div>
                  <Clock className="w-8 h-8 mt-2 opacity-75" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Daily Throughput</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-indigo-600">{warehouse.performance.dailyThroughput}</div>
                  <div className="text-sm text-gray-500">Average Orders Per Day</div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={warehouse.performance.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#6366f1" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Monthly Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={warehouse.performance.monthlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#6366f1" name="Efficiency %" />
                    <Line type="monotone" dataKey="accuracy" stroke="#10b981" name="Accuracy %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    Climate Control
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1">
                      <span>Cold Storage:</span>
                      <span className="font-medium">{warehouse.facilities.hasColdStorage ? 'Yes' : 'No'}</span>
                    </div>
                    {warehouse.facilities.hasColdStorage && (
                      <>
                        <div className="flex justify-between py-1">
                          <span>Cold Storage Capacity:</span>
                          <span>{warehouse.facilities.coldStorageCapacity}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Temperature Range:</span>
                          <span>{warehouse.facilities.coldStorageTemp}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between py-1">
                      <span>Hazardous Storage:</span>
                      <span>{warehouse.facilities.hasHazardousStorage ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Systems
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1">
                      <span>Security Level:</span>
                      <span className="font-medium uppercase">{warehouse.facilities.securityLevel}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>CCTV:</span>
                      <span>{warehouse.facilities.hasCCTV ? `Yes (${warehouse.facilities.cameraCount} cameras)` : 'No'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Fire Suppression:</span>
                      <span>{warehouse.facilities.hasFireSuppression ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Backup Power:</span>
                      <span>{warehouse.facilities.hasBackupPower ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Logistics Infrastructure
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1">
                      <span>Loading Docks:</span>
                      <span>{warehouse.facilities.loadingDocks}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Parking Spaces:</span>
                      <span>{warehouse.facilities.parkingSpaces}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Rail Access:</span>
                      <span>{warehouse.facilities.hasRailAccess ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Air Cargo Access:</span>
                      <span>{warehouse.facilities.hasAirAccess ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5" />
                    Automation & Amenities
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1">
                      <span>Automation:</span>
                      <span>{warehouse.facilities.hasAutomation ? 'Yes' : 'No'}</span>
                    </div>
                    {warehouse.facilities.hasAutomation && (
                      <div className="py-1">
                        <span className="text-gray-600">Type:</span>
                        <p className="text-sm mt-1">{warehouse.facilities.automationType}</p>
                      </div>
                    )}
                    <div className="py-1">
                      <span className="text-gray-600">Amenities:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {warehouse.facilities.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">{amenity}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                  <div className="text-3xl font-bold">{warehouse.staff.total}</div>
                  <div className="text-sm">Total Staff</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                  <div className="text-3xl font-bold">{warehouse.staff.managers}</div>
                  <div className="text-sm">Managers</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                  <div className="text-3xl font-bold">{warehouse.staff.supervisors}</div>
                  <div className="text-sm">Supervisors</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                  <div className="text-3xl font-bold">{warehouse.staff.workers}</div>
                  <div className="text-sm">Workers</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Staff by Department</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={warehouse.staff.departments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {warehouse.staff.departments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Staff Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance Rate</span>
                        <span>{warehouse.staff.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${warehouse.staff.attendance}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Productivity Rate</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Training Completion</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Warehouse Manager</p>
                    <p className="font-medium">{warehouse.contact.manager.name}</p>
                    <p className="text-sm">{warehouse.contact.manager.phone}</p>
                    <p className="text-sm">{warehouse.contact.manager.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Since: {new Date(warehouse.contact.manager.since).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">HR Contact</p>
                    <p className="font-medium">Sarah Wanjiku</p>
                    <p className="text-sm">+254 722 123 456</p>
                    <p className="text-sm">hr.nairobi@warehouse.co.ke</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financials Tab */}
          {activeTab === 'financials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Monthly Operating Cost</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">KES {(warehouse.financials.monthlyOperatingCost / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="text-2xl font-bold text-green-600">KES {(warehouse.financials.annualRevenue / 1000000).toFixed(0)}M</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Cost per Sq Ft</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">KES {warehouse.financials.costPerSqFt}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Revenue per Order</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">KES {warehouse.financials.revenuePerOrder}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Top Customers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium">Customer Name</th>
                        <th className="px-4 py-2 text-right text-xs font-medium">Orders</th>
                        <th className="px-4 py-2 text-right text-xs font-medium">Revenue (KES)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {warehouse.financials.topCustomers.map((customer, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm">{customer.name}</td>
                          <td className="px-4 py-2 text-sm text-right">{customer.orders}</td>
                          <td className="px-4 py-2 text-sm text-right">{customer.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Licenses & Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-600">
                      <span>License Number:</span>
                      <span className="font-mono text-sm">{warehouse.documents.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-600">
                      <span>Tax ID:</span>
                      <span className="font-mono text-sm">{warehouse.documents.taxId}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-600">
                      <span>Insurance Policy:</span>
                      <span>{warehouse.documents.insurancePolicy}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Insurance Expiry:</span>
                      <span className="text-orange-600">{new Date(warehouse.documents.insuranceExpiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {warehouse.documents.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Uploaded Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium">Warehouse Lease Agreement.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded: Jan 15, 2023 • 2.5 MB</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium">Insurance Certificate.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded: Mar 10, 2024 • 1.2 MB</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium">Safety Compliance Report.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded: Feb 20, 2024 • 3.1 MB</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Delete Warehouse</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete warehouse <span className="font-semibold">{warehouse.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
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

export default WareHouseView;