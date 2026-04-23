import React, { useState } from 'react';
import {
  Plus, Search, Filter, Download, Printer, MoreVertical,
  Eye, Edit, Trash2, Package, Box, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, Truck, DollarSign,
  BarChart3, Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, FileText, Send, MessageSquare, Bell,
  Settings, AlertTriangle, Check, User, Phone, Mail, Star,
  Layers, ShoppingCart, Warehouse, Archive, ArrowUpDown,
  MinusCircle, PlusCircle, Percent, Calendar, Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock stock data
const mockStockItems = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    sku: 'MED-001',
    category: 'Medications',
    subcategory: 'Pain Relief',
    quantity: 1250,
    minStock: 500,
    maxStock: 2000,
    unit: 'tablets',
    costPrice: 5.00,
    sellingPrice: 10.00,
    location: 'Aisle 1, Shelf B',
    supplier: 'Kenya Medical Supplies',
    status: 'in_stock',
    expiryDate: '2025-06-30',
    batchNumber: 'BATCH-001',
    lastRestocked: '2024-03-10',
    reorderPoint: 600,
    salesVelocity: 120, // units per week
    image: null,
    barcode: '123456789012'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    sku: 'MED-002',
    category: 'Medications',
    subcategory: 'Antibiotics',
    quantity: 850,
    minStock: 400,
    maxStock: 1500,
    unit: 'capsules',
    costPrice: 8.00,
    sellingPrice: 15.00,
    location: 'Aisle 1, Shelf C',
    supplier: 'PharmaKenya Ltd',
    status: 'in_stock',
    expiryDate: '2025-03-15',
    batchNumber: 'BATCH-002',
    lastRestocked: '2024-03-05',
    reorderPoint: 450,
    salesVelocity: 90,
    image: null,
    barcode: '123456789013'
  },
  {
    id: 3,
    name: 'Blood Pressure Monitor',
    sku: 'EQU-001',
    category: 'Equipment',
    subcategory: 'Monitoring',
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'units',
    costPrice: 2500.00,
    sellingPrice: 4200.00,
    location: 'Aisle 3, Shelf A',
    supplier: 'MediTech Solutions',
    status: 'low_stock',
    expiryDate: '2026-12-31',
    batchNumber: 'BATCH-003',
    lastRestocked: '2024-02-20',
    reorderPoint: 30,
    salesVelocity: 5,
    image: null,
    barcode: '123456789014'
  },
  {
    id: 4,
    name: 'Surgical Mask (Box)',
    sku: 'SUP-001',
    category: 'Supplies',
    subcategory: 'PPE',
    quantity: 3200,
    minStock: 1000,
    maxStock: 5000,
    unit: 'boxes',
    costPrice: 350.00,
    sellingPrice: 500.00,
    location: 'Aisle 4, Shelf D',
    supplier: 'SafeShield Kenya',
    status: 'in_stock',
    expiryDate: '2025-12-31',
    batchNumber: 'BATCH-004',
    lastRestocked: '2024-03-12',
    reorderPoint: 1200,
    salesVelocity: 400,
    image: null,
    barcode: '123456789015'
  },
  {
    id: 5,
    name: 'Vitamin C 100mg',
    sku: 'MED-003',
    category: 'Medications',
    subcategory: 'Vitamins',
    quantity: 150,
    minStock: 300,
    maxStock: 1000,
    unit: 'tablets',
    costPrice: 3.00,
    sellingPrice: 7.00,
    location: 'Aisle 2, Shelf A',
    supplier: 'VitaHealth Ltd',
    status: 'out_of_stock',
    expiryDate: '2025-09-30',
    batchNumber: 'BATCH-005',
    lastRestocked: '2024-02-01',
    reorderPoint: 350,
    salesVelocity: 80,
    image: null,
    barcode: '123456789016'
  },
  {
    id: 6,
    name: 'Gauze Roll (10m)',
    sku: 'SUP-002',
    category: 'Supplies',
    subcategory: 'Wound Care',
    quantity: 520,
    minStock: 200,
    maxStock: 800,
    unit: 'rolls',
    costPrice: 45.00,
    sellingPrice: 80.00,
    location: 'Aisle 4, Shelf B',
    supplier: 'Medical Essentials',
    status: 'in_stock',
    expiryDate: '2025-11-30',
    batchNumber: 'BATCH-006',
    lastRestocked: '2024-03-08',
    reorderPoint: 250,
    salesVelocity: 35,
    image: null,
    barcode: '123456789017'
  },
  {
    id: 7,
    name: 'Insulin Pen',
    sku: 'MED-004',
    category: 'Medications',
    subcategory: 'Diabetes Care',
    quantity: 180,
    minStock: 150,
    maxStock: 500,
    unit: 'pens',
    costPrice: 1200.00,
    sellingPrice: 1800.00,
    location: 'Aisle 1, Shelf D (Refrigerated)',
    supplier: 'DiabetesCare Kenya',
    status: 'critical_stock',
    expiryDate: '2024-08-15',
    batchNumber: 'BATCH-007',
    lastRestocked: '2024-02-28',
    reorderPoint: 200,
    salesVelocity: 25,
    image: null,
    barcode: '123456789018'
  },
  {
    id: 8,
    name: 'Stethoscope',
    sku: 'EQU-002',
    category: 'Equipment',
    subcategory: 'Diagnostic',
    quantity: 28,
    minStock: 15,
    maxStock: 60,
    unit: 'units',
    costPrice: 1800.00,
    sellingPrice: 3200.00,
    location: 'Aisle 3, Shelf B',
    supplier: 'MediTech Solutions',
    status: 'low_stock',
    expiryDate: '2026-12-31',
    batchNumber: 'BATCH-008',
    lastRestocked: '2024-02-15',
    reorderPoint: 20,
    salesVelocity: 3,
    image: null,
    barcode: '123456789019'
  }
];

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAdjustStock, setShowAdjustStock] = useState(null);
  const [showReorderModal, setShowReorderModal] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Filter stock items
  const filteredItems = mockStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalItems: mockStockItems.length,
    totalUnits: mockStockItems.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: mockStockItems.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0),
    lowStockItems: mockStockItems.filter(item => item.status === 'low_stock' || item.status === 'critical_stock').length,
    outOfStockItems: mockStockItems.filter(item => item.status === 'out_of_stock').length,
    totalCategories: [...new Set(mockStockItems.map(item => item.category))].length,
    avgTurnover: 85, // Mock percentage
    expiringSoon: mockStockItems.filter(item => {
      const expiry = new Date(item.expiryDate);
      const today = new Date();
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays >= 0 && item.expiryDate !== '2026-12-31';
    }).length
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowExpand = (itemId) => {
    setExpandedRows(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Stock data refreshed');
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const config = {
      in_stock: { icon: CheckCircle, text: 'In Stock', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      low_stock: { icon: AlertCircle, text: 'Low Stock', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      out_of_stock: { icon: X, text: 'Out of Stock', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      critical_stock: { icon: AlertTriangle, text: 'Critical', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.in_stock;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getStockLevelBar = (quantity, minStock, maxStock) => {
    const percentage = Math.min(100, (quantity / maxStock) * 100);
    let colorClass = 'bg-green-500';
    if (percentage < 30) colorClass = 'bg-red-500';
    else if (percentage < 60) colorClass = 'bg-yellow-500';
    return (
      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className={`${colorClass} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    );
  };

  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    return `${diffDays} days`;
  };

  const getExpiryColor = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 30) return 'text-orange-600';
    if (diffDays <= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return <ArrowUpDown className={`w-3 h-3 ml-1 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage inventory, track stock levels, and monitor product performance
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
            onClick={() => setShowAddItem(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Categories: {stats.totalCategories}</span>
            <span className="text-blue-600">Total SKUs: {stats.totalItems}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Stock Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">KES {stats.totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total Units: {stats.totalUnits.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Low/Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStockItems + stats.outOfStockItems}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2">Critical: {stats.lowStockItems} items need reorder</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.expiringSoon}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">Products expiring in 90 days</p>
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
          Overview
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'inventory' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Box className="w-4 h-4" />
          Inventory List
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockStockItems.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('reorder')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'reorder' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Reorder List
        </button>
        <button
          onClick={() => setActiveTab('expiring')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'expiring' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Expiring Soon
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Category Distribution and Status */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stock by Category</h3>
              <div className="space-y-3">
                {[
                  { category: 'Medications', items: 4, percentage: 50, color: 'bg-blue-500' },
                  { category: 'Equipment', items: 2, percentage: 25, color: 'bg-green-500' },
                  { category: 'Supplies', items: 2, percentage: 25, color: 'bg-yellow-500' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.category}</span>
                      <span className="text-gray-500 text-xs">{item.items} items ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stock Status Overview</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{mockStockItems.filter(i => i.status === 'in_stock').length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">In Stock</div>
                </div>
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600">{mockStockItems.filter(i => i.status === 'low_stock').length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Low Stock</div>
                </div>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">{mockStockItems.filter(i => i.status === 'critical_stock').length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Critical</div>
                </div>
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-xl font-bold text-red-600">{mockStockItems.filter(i => i.status === 'out_of_stock').length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Out of Stock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                Low Stock & Reorder Alerts
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockStockItems.filter(item => item.status === 'low_stock' || item.status === 'critical_stock' || item.quantity <= item.reorderPoint).map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.sku} • {item.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${item.quantity <= item.reorderPoint ? 'text-red-600' : 'text-yellow-600'}`}>
                      {item.quantity} {item.unit} left
                    </div>
                    <div className="text-xs text-gray-500">Reorder at: {item.reorderPoint} {item.unit}</div>
                  </div>
                  <button
                    onClick={() => setShowReorderModal(item)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition"
                  >
                    Reorder Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Top Selling Products (Weekly)</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockStockItems.sort((a, b) => b.salesVelocity - a.salesVelocity).slice(0, 5).map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500">Sold: {item.salesVelocity} units/week</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">KES {item.sellingPrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Margin: {((item.sellingPrice - item.costPrice) / item.sellingPrice * 100).toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory List */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Categories</option>
                <option value="Medications">Medications</option>
                <option value="Equipment">Equipment</option>
                <option value="Supplies">Supplies</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="critical_stock">Critical</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedItems.length} of {filteredItems.length} items
            </div>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Product <SortIcon field="name" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('sku')}>
                    <div className="flex items-center">SKU <SortIcon field="sku" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('quantity')}>
                    <div className="flex items-center">Stock Level <SortIcon field="quantity" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('sellingPrice')}>
                    <div className="flex items-center">Price <SortIcon field="sellingPrice" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expiry</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(item.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.category} / {item.subcategory}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-900 dark:text-white" onClick={() => toggleRowExpand(item.id)}>
                        {item.sku}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(item.id)}>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white">{item.quantity.toLocaleString()} {item.unit}</div>
                          {getStockLevelBar(item.quantity, item.minStock, item.maxStock)}
                          <div className="text-xs text-gray-500">Min: {item.minStock} | Max: {item.maxStock}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(item.id)}>
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(item.id)}>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">KES {item.sellingPrice.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Cost: KES {item.costPrice.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(item.id)}>
                        {item.expiryDate !== '2026-12-31' ? (
                          <>
                            <div className={`text-sm font-medium ${getExpiryColor(item.expiryDate)}`}>
                              {getDaysUntil(item.expiryDate)}
                            </div>
                            <div className="text-xs text-gray-500">{item.expiryDate}</div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No expiry</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowAdjustStock(item)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                            title="Adjust Stock"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowReorderModal(item)}
                            className="p-1.5 text-gray-400 hover:text-green-600 transition"
                            title="Reorder"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleRowExpand(item.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition"
                            title="More Info"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Row */}
                    {expandedRows[item.id] && (
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td colSpan="7" className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Product Details</div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Location:</span><span>{item.location}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Batch:</span><span>{item.batchNumber}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Barcode:</span><span>{item.barcode}</span></div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Supplier Info</div>
                              <div className="space-y-1 text-sm">
                                <div className="font-medium">{item.supplier}</div>
                                <div className="text-gray-500">Last Restocked: {item.lastRestocked}</div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Financials</div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Cost:</span><span>KES {item.costPrice}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Selling:</span><span>KES {item.sellingPrice}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Margin:</span><span className="text-green-600">{((item.sellingPrice - item.costPrice) / item.sellingPrice * 100).toFixed(0)}%</span></div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setShowAdjustStock(item)}
                                  className="flex-1 bg-indigo-600 text-white text-xs py-1.5 rounded-lg"
                                >
                                  Adjust Stock
                                </button>
                                <button className="flex-1 border border-gray-300 text-gray-700 text-xs py-1.5 rounded-lg">
                                  Update Price
                                </button>
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

      {/* Tab 3: Reorder List */}
      {activeTab === 'reorder' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Items Needing Reorder</h3>
            <p className="text-sm text-gray-500 mt-1">Products that have reached or are below reorder point</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Current Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Reorder Point</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Suggested Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Supplier</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockStockItems.filter(item => item.quantity <= item.reorderPoint).map((item) => {
                  const suggestedQty = item.maxStock - item.quantity;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.sku}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-red-600 font-medium">{item.quantity} {item.unit}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.reorderPoint} {item.unit}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{suggestedQty} {item.unit}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.supplier}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => setShowReorderModal(item)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition"
                        >
                          Generate PO
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

      {/* Tab 4: Expiring Soon */}
      {activeTab === 'expiring' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Products Expiring Within 90 Days</h3>
            <p className="text-sm text-gray-500 mt-1">Monitor and take action on expiring inventory</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Batch Number</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockStockItems.filter(item => {
                  const expiry = new Date(item.expiryDate);
                  const today = new Date();
                  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
                  return diffDays <= 90 && diffDays >= 0 && item.expiryDate !== '2026-12-31';
                }).map((item) => {
                  const expiry = new Date(item.expiryDate);
                  const today = new Date();
                  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
                  let statusClass = 'text-green-600';
                  let statusText = 'OK';
                  if (diffDays <= 30) { statusClass = 'text-red-600'; statusText = 'Critical'; }
                  else if (diffDays <= 60) { statusClass = 'text-orange-600'; statusText = 'Warning'; }
                  else if (diffDays <= 90) { statusClass = 'text-yellow-600'; statusText = 'Monitor'; }
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.sku}</div>
                        </div>
                       </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{item.batchNumber}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{item.quantity} {item.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${getExpiryColor(item.expiryDate)}`}>
                          {item.expiryDate} ({getDaysUntil(item.expiryDate)})
                        </span>
                       </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusClass === 'text-red-600' ? 'bg-red-100 text-red-700' : statusClass === 'text-orange-600' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {statusText}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition mr-2">
                          Mark for Disposal
                        </button>
                        <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg transition">
                          Add to Promotion
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

      {/* Product Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Product Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">{selectedItem.name}</h4>
                    <p className="text-sm text-gray-500">SKU: {selectedItem.sku} • Batch: {selectedItem.batchNumber}</p>
                    {getStatusBadge(selectedItem.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">KES {selectedItem.sellingPrice.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Cost: KES {selectedItem.costPrice.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Inventory Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Current Stock:</span><span className="font-medium">{selectedItem.quantity.toLocaleString()} {selectedItem.unit}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Min Stock Level:</span><span>{selectedItem.minStock} {selectedItem.unit}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Max Stock Level:</span><span>{selectedItem.maxStock} {selectedItem.unit}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Reorder Point:</span><span>{selectedItem.reorderPoint} {selectedItem.unit}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Location:</span><span>{selectedItem.location}</span></div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category Info</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Category:</span><span>{selectedItem.category}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Subcategory:</span><span>{selectedItem.subcategory}</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Supplier & Logistics</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Supplier:</span><span>{selectedItem.supplier}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Last Restocked:</span><span>{selectedItem.lastRestocked}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Weekly Sales:</span><span>{selectedItem.salesVelocity} {selectedItem.unit}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Barcode:</span><span className="font-mono">{selectedItem.barcode}</span></div>
                    </div>
                  </div>

                  {selectedItem.expiryDate !== '2026-12-31' && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expiry Information</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Expiry Date:</span><span className={getExpiryColor(selectedItem.expiryDate)}>{selectedItem.expiryDate} ({getDaysUntil(selectedItem.expiryDate)})</span></div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Financial Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Total Stock Value:</span><span>KES {(selectedItem.quantity * selectedItem.costPrice).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Potential Revenue:</span><span>KES {(selectedItem.quantity * selectedItem.sellingPrice).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Profit Margin:</span><span className="text-green-600">{((selectedItem.sellingPrice - selectedItem.costPrice) / selectedItem.sellingPrice * 100).toFixed(0)}%</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    setShowAdjustStock(selectedItem);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Adjust Stock
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Update Pricing
                </button>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    setShowReorderModal(selectedItem);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustStock && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAdjustStock(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Adjust Stock Level</h3>
              <button onClick={() => setShowAdjustStock(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Product: <span className="font-semibold">{showAdjustStock.name}</span>
                </p>
                <p className="text-sm text-gray-500">Current Stock: {showAdjustStock.quantity} {showAdjustStock.unit}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adjustment Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                    <option>Add Stock (+)</option>
                    <option>Remove Stock (-)</option>
                    <option>Set to Quantity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reason
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                    <option>Stock Received</option>
                    <option>Stock Returned</option>
                    <option>Damaged Goods</option>
                    <option>Inventory Count</option>
                    <option>Expired Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reference Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="PO number or invoice"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Stock adjusted successfully');
                    setShowAdjustStock(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Apply Adjustment
                </button>
                <button
                  onClick={() => setShowAdjustStock(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reorder Modal */}
      {showReorderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowReorderModal(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Generate Purchase Order</h3>
              <button onClick={() => setShowReorderModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Product: <span className="font-semibold">{showReorderModal.name}</span>
                </p>
                <p className="text-sm text-gray-500">Supplier: {showReorderModal.supplier}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Order Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue={showReorderModal.maxStock - showReorderModal.quantity}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">Suggested: {showReorderModal.maxStock - showReorderModal.quantity} {showReorderModal.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Unit Cost (KES)
                  </label>
                  <input
                    type="number"
                    defaultValue={showReorderModal.costPrice}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Additional instructions for supplier"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">KES {(showReorderModal.costPrice * (showReorderModal.maxStock - showReorderModal.quantity)).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Purchase order generated successfully');
                    setShowReorderModal(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Generate PO
                </button>
                <button
                  onClick={() => setShowReorderModal(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddItem(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Add New Product</h3>
              <button onClick={() => setShowAddItem(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                    <input type="text" placeholder="Enter product name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                    <input type="text" placeholder="Auto-generated or manual" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                      <option>Medications</option>
                      <option>Equipment</option>
                      <option>Supplies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategory</label>
                    <input type="text" placeholder="e.g., Pain Relief" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost Price (KES)</label>
                    <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selling Price (KES)</label>
                    <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Stock</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                      <option>units</option>
                      <option>tablets</option>
                      <option>capsules</option>
                      <option>boxes</option>
                      <option>rolls</option>
                      <option>pens</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                    <option>Kenya Medical Supplies</option>
                    <option>PharmaKenya Ltd</option>
                    <option>MediTech Solutions</option>
                    <option>SafeShield Kenya</option>
                    <option>VitaHealth Ltd</option>
                    <option>Medical Essentials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Storage Location</label>
                  <input type="text" placeholder="e.g., Aisle 1, Shelf A" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Product added successfully');
                    setShowAddItem(false);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddItem(false)}
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

export default StockManagement;