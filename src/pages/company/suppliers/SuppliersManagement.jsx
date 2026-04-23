import React, { useState } from 'react';
import {
  Plus, Search, Filter, Download, Printer, MoreVertical,
  Eye, Edit, Trash2, Truck, Package, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, DollarSign, Star,
  BarChart3, Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, Tag, ShoppingBag, Calendar, Users,
  Percent, Copy, ExternalLink, Archive, Globe, Smartphone,
  Coffee, Home, Box, Grid, List, Info, Building2, Phone,
  Mail, MapPin, CreditCard, FileText, Award, Clock as ClockIcon,
  MessageCircle, Link, Save, Upload, Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock suppliers data
const mockSuppliers = [
  {
    id: 1,
    name: 'TechImport Ltd',
    code: 'SUP-001',
    contactPerson: 'John Mwangi',
    email: 'john@techimport.co.ke',
    phone: '+254 712 345 678',
    alternatePhone: '+254 722 123 456',
    address: 'Industrial Area, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00100',
    website: 'www.techimport.co.ke',
    taxId: 'P051234567Z',
    paymentTerms: 'Net 30',
    leadTime: '7-14 days',
    minOrderValue: 50000,
    shippingMethod: 'Courier',
    status: 'active',
    rating: 4.8,
    totalOrders: 156,
    totalSpent: 8750000,
    lastOrderDate: '2024-03-10',
    joinDate: '2023-01-15',
    categories: ['Electronics', 'Computer Accessories'],
    productsSupplied: 234,
    performance: {
      onTimeDelivery: 94,
      qualityRating: 4.7,
      responseTime: 2.5,
      returnRate: 3.2
    },
    bankDetails: {
      bankName: 'KCB Bank',
      accountName: 'TechImport Ltd',
      accountNumber: '1234567890',
      branchCode: '001'
    },
    notes: 'Preferred supplier for electronics. Good quality products.',
    documents: ['contract.pdf', 'tax_compliance.pdf']
  },
  {
    id: 2,
    name: 'OrganicFoods Kenya',
    code: 'SUP-002',
    contactPerson: 'Grace Wanjiku',
    email: 'grace@organicfoods.ke',
    phone: '+254 723 456 789',
    alternatePhone: null,
    address: 'Karen, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00509',
    website: 'www.organicfoods.co.ke',
    taxId: 'P051234568Z',
    paymentTerms: 'Net 15',
    leadTime: '3-5 days',
    minOrderValue: 25000,
    shippingMethod: 'Refrigerated Truck',
    status: 'active',
    rating: 4.9,
    totalOrders: 342,
    totalSpent: 12500000,
    lastOrderDate: '2024-03-12',
    joinDate: '2023-03-20',
    categories: ['Food & Beverage', 'Organic Products'],
    productsSupplied: 89,
    performance: {
      onTimeDelivery: 98,
      qualityRating: 4.9,
      responseTime: 1.2,
      returnRate: 1.5
    },
    bankDetails: {
      bankName: 'Equity Bank',
      accountName: 'OrganicFoods Kenya',
      accountNumber: '9876543210',
      branchCode: '045'
    },
    notes: 'Certified organic supplier. Excellent quality.',
    documents: ['organic_cert.pdf', 'supply_agreement.pdf']
  },
  {
    id: 3,
    name: 'ComfortSeat Furniture',
    code: 'SUP-003',
    contactPerson: 'Peter Omondi',
    email: 'peter@comfortseat.co.ke',
    phone: '+254 734 567 890',
    alternatePhone: '+254 712 987 654',
    address: 'Mombasa Road, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00200',
    website: 'www.comfortseat.co.ke',
    taxId: 'P051234569Z',
    paymentTerms: 'Net 45',
    leadTime: '14-21 days',
    minOrderValue: 100000,
    shippingMethod: 'Freight',
    status: 'active',
    rating: 4.6,
    totalOrders: 89,
    totalSpent: 4500000,
    lastOrderDate: '2024-03-05',
    joinDate: '2023-06-10',
    categories: ['Furniture', 'Office Chairs'],
    productsSupplied: 45,
    performance: {
      onTimeDelivery: 87,
      qualityRating: 4.5,
      responseTime: 3.8,
      returnRate: 5.2
    },
    bankDetails: {
      bankName: 'Standard Chartered',
      accountName: 'ComfortSeat Furniture',
      accountNumber: '5544332211',
      branchCode: '012'
    },
    notes: 'Good quality office furniture. Slight delays sometimes.',
    documents: ['catalog.pdf', 'warranty.pdf']
  },
  {
    id: 4,
    name: 'EcoProducts KE',
    code: 'SUP-004',
    contactPerson: 'Sarah Kimani',
    email: 'sarah@ecoproducts.co.ke',
    phone: '+254 745 678 901',
    alternatePhone: null,
    address: 'Westlands, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00800',
    website: 'www.ecoproducts.co.ke',
    taxId: 'P051234570Z',
    paymentTerms: 'Net 30',
    leadTime: '5-7 days',
    minOrderValue: 15000,
    shippingMethod: 'Eco-friendly Courier',
    status: 'active',
    rating: 4.7,
    totalOrders: 567,
    totalSpent: 3200000,
    lastOrderDate: '2024-03-14',
    joinDate: '2023-02-01',
    categories: ['Home & Living', 'Sustainable Products'],
    productsSupplied: 67,
    performance: {
      onTimeDelivery: 96,
      qualityRating: 4.8,
      responseTime: 1.8,
      returnRate: 2.1
    },
    bankDetails: {
      bankName: 'Cooperative Bank',
      accountName: 'EcoProducts KE',
      accountNumber: '6677889900',
      branchCode: '067'
    },
    notes: 'Eco-friendly packaging. Great customer service.',
    documents: ['eco_cert.pdf', 'msds.pdf']
  },
  {
    id: 5,
    name: 'SportsGear Ltd',
    code: 'SUP-005',
    contactPerson: 'James Otieno',
    email: 'james@sportsgear.co.ke',
    phone: '+254 756 789 012',
    alternatePhone: '+254 733 456 789',
    address: 'Kisumu Road, Kisumu, Kenya',
    city: 'Kisumu',
    country: 'Kenya',
    postalCode: '40100',
    website: 'www.sportsgear.co.ke',
    taxId: 'P051234571Z',
    paymentTerms: 'Net 30',
    leadTime: '7-10 days',
    minOrderValue: 30000,
    shippingMethod: 'Standard Courier',
    status: 'inactive',
    rating: 4.2,
    totalOrders: 45,
    totalSpent: 890000,
    lastOrderDate: '2024-02-28',
    joinDate: '2023-08-15',
    categories: ['Sports & Outdoors', 'Fitness'],
    productsSupplied: 34,
    performance: {
      onTimeDelivery: 82,
      qualityRating: 4.1,
      responseTime: 4.5,
      returnRate: 7.8
    },
    bankDetails: {
      bankName: 'Absa Bank',
      accountName: 'SportsGear Ltd',
      accountNumber: '1122334455',
      branchCode: '089'
    },
    notes: 'Temporarily inactive due to quality issues.',
    documents: ['license.pdf']
  },
  {
    id: 6,
    name: 'WearableTech Co',
    code: 'SUP-006',
    contactPerson: 'Michael Kipchoge',
    email: 'michael@wearabletech.co.ke',
    phone: '+254 767 890 123',
    alternatePhone: null,
    address: 'Two Rivers, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00900',
    website: 'www.wearabletech.co.ke',
    taxId: 'P051234572Z',
    paymentTerms: 'Net 30',
    leadTime: '10-14 days',
    minOrderValue: 75000,
    shippingMethod: 'Air Freight',
    status: 'active',
    rating: 4.8,
    totalOrders: 78,
    totalSpent: 5200000,
    lastOrderDate: '2024-03-08',
    joinDate: '2023-04-22',
    categories: ['Electronics', 'Wearables'],
    productsSupplied: 56,
    performance: {
      onTimeDelivery: 92,
      qualityRating: 4.7,
      responseTime: 2.2,
      returnRate: 3.5
    },
    bankDetails: {
      bankName: 'NCBA Bank',
      accountName: 'WearableTech Co',
      accountNumber: '9988776655',
      branchCode: '034'
    },
    notes: 'Innovative products. Good partnership.',
    documents: ['tech_specs.pdf', 'quality_cert.pdf']
  },
  {
    id: 7,
    name: 'HomeEssentials Ltd',
    code: 'SUP-007',
    contactPerson: 'Lucy Wambui',
    email: 'lucy@homeessentials.co.ke',
    phone: '+254 778 901 234',
    alternatePhone: '+254 711 222 333',
    address: 'Thika Road, Nairobi, Kenya',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '00600',
    website: 'www.homeessentials.co.ke',
    taxId: 'P051234573Z',
    paymentTerms: 'Net 15',
    leadTime: '3-5 days',
    minOrderValue: 10000,
    shippingMethod: 'Same-day Delivery',
    status: 'active',
    rating: 4.5,
    totalOrders: 423,
    totalSpent: 2850000,
    lastOrderDate: '2024-03-13',
    joinDate: '2023-01-30',
    categories: ['Home & Living', 'Lighting', 'Kitchenware'],
    productsSupplied: 145,
    performance: {
      onTimeDelivery: 95,
      qualityRating: 4.4,
      responseTime: 2.0,
      returnRate: 4.1
    },
    bankDetails: {
      bankName: 'KCB Bank',
      accountName: 'HomeEssentials Ltd',
      accountNumber: '4433221100',
      branchCode: '001'
    },
    notes: 'Reliable supplier for home products.',
    documents: ['catalog_2024.pdf', 'price_list.pdf']
  }
];

const SuppliersManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const itemsPerPage = 12;

  // Filter suppliers
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          supplier.phone.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || supplier.categories.includes(categoryFilter);
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedSuppliers.length / itemsPerPage);
  const paginatedSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalSuppliers: mockSuppliers.length,
    activeSuppliers: mockSuppliers.filter(s => s.status === 'active').length,
    inactiveSuppliers: mockSuppliers.filter(s => s.status === 'inactive').length,
    totalSpent: mockSuppliers.reduce((sum, s) => sum + s.totalSpent, 0),
    totalOrders: mockSuppliers.reduce((sum, s) => sum + s.totalOrders, 0),
    avgRating: (mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length).toFixed(1),
    avgLeadTime: '8.5 days',
    topSupplier: mockSuppliers.reduce((best, current) => current.rating > best.rating ? current : best, mockSuppliers[0])
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Suppliers data refreshed');
    }, 1000);
  };

  const handleSelectSupplier = (id) => {
    if (selectedSuppliers.includes(id)) {
      setSelectedSuppliers(selectedSuppliers.filter(sid => sid !== id));
    } else {
      setSelectedSuppliers([...selectedSuppliers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === paginatedSuppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(paginatedSuppliers.map(s => s.id));
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedSuppliers.length} suppliers deleted successfully`);
    setSelectedSuppliers([]);
  };

  const handleBulkStatusUpdate = (status) => {
    toast.success(`${selectedSuppliers.length} suppliers marked as ${status}`);
    setSelectedSuppliers([]);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      pending: { icon: Clock, text: 'Pending', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < fullStars ? 'text-yellow-500 fill-yellow-500' : i === fullStars && hasHalfStar ? 'text-yellow-500 fill-yellow-500 opacity-50' : 'text-gray-300 dark:text-gray-600'}`}
          />
        ))}
        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{rating}</span>
      </div>
    );
  };

  const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return <ArrowUpDown className={`w-3 h-3 ml-1 ${sortDirection === 'asc' ? '' : 'rotate-180'}`} />;
  };

  // Get unique categories for filter
  const allCategories = ['all', ...new Set(mockSuppliers.flatMap(s => s.categories))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Suppliers Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your supplier relationships, track performance, and handle procurement
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
            onClick={() => {
              setEditingSupplier(null);
              setIsFormModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSuppliers}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Active: {stats.activeSuppliers}</span>
            <span className="text-gray-500">Inactive: {stats.inactiveSuppliers}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalSpent)}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across {stats.totalOrders} orders</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Supplier Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating} ★</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Top: {stats.topSupplier.name}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Lead Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgLeadTime}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">On-time delivery: 92%</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
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
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing {paginatedSuppliers.length} of {filteredSuppliers.length} suppliers
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedSuppliers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedSuppliers.length} supplier(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusUpdate('active')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('inactive')}
                  className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition"
                >
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Suppliers Display - Grid View */}
        {viewMode === 'grid' && (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${selectedSuppliers.includes(supplier.id) ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  {/* Checkbox for selection */}
                  <div className="p-3 pb-0">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSelectSupplier(supplier.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {supplier.name}
                          </h3>
                          <p className="text-xs text-gray-500">{supplier.code}</p>
                        </div>
                      </div>
                      {getStatusBadge(supplier.status)}
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{supplier.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400 text-xs truncate">{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{supplier.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {supplier.categories.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                          {cat}
                        </span>
                      ))}
                      {supplier.categories.length > 2 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                          +{supplier.categories.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                        <p className="text-gray-500">Products</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{supplier.productsSupplied}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                        <p className="text-gray-500">Orders</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{supplier.totalOrders}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      {getRatingStars(supplier.rating)}
                      <span className="text-xs text-gray-500">Lead: {supplier.leadTime}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSupplier(supplier)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-xs font-medium transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setEditingSupplier(supplier);
                          setIsFormModalOpen(true);
                        }}
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suppliers Display - List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.length === paginatedSuppliers.length && paginatedSuppliers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Supplier <SortIcon field="name" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('code')}>
                    <div className="flex items-center">Code <SortIcon field="code" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categories</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalOrders')}>
                    <div className="flex items-center">Orders <SortIcon field="totalOrders" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('rating')}>
                    <div className="flex items-center">Rating <SortIcon field="rating" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedSuppliers.map((supplier) => (
                  <tr key={supplier.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${selectedSuppliers.includes(supplier.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSuppliers.includes(supplier.id)}
                        onChange={() => handleSelectSupplier(supplier.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{supplier.name}</div>
                          <div className="text-xs text-gray-500">{supplier.contactPerson}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                      {supplier.code}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{supplier.email}</div>
                      <div className="text-xs text-gray-500">{supplier.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {supplier.categories.slice(0, 2).map((cat, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                            {cat}
                          </span>
                        ))}
                        {supplier.categories.length > 2 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                            +{supplier.categories.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{supplier.totalOrders}</div>
                      <div className="text-xs text-gray-500">{formatCurrency(supplier.totalSpent)}</div>
                    </td>
                    <td className="px-4 py-3">
                      {getRatingStars(supplier.rating)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(supplier.status)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedSupplier(supplier)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSupplier(supplier);
                            setIsFormModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toast.success(`Supplier "${supplier.name}" duplicated`);
                          }}
                          className="p-1.5 text-gray-400 hover:text-green-600 transition"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toast.success(`Purchase order sent to ${supplier.name}`);
                          }}
                          className="p-1.5 text-gray-400 hover:text-purple-600 transition"
                          title="Create PO"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
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

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedSupplier(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedSupplier.name}</h3>
                  <p className="text-sm text-gray-500">{selectedSupplier.code}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSupplier(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Basic Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Contact Person:</span> {selectedSupplier.contactPerson}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedSupplier.email}</div>
                  <div><span className="text-gray-500">Phone:</span> {selectedSupplier.phone}</div>
                  <div><span className="text-gray-500">Alternate Phone:</span> {selectedSupplier.alternatePhone || '—'}</div>
                  <div><span className="text-gray-500">Address:</span> {selectedSupplier.address}</div>
                  <div><span className="text-gray-500">City/Country:</span> {selectedSupplier.city}, {selectedSupplier.country}</div>
                  <div><span className="text-gray-500">Website:</span> {selectedSupplier.website}</div>
                  <div><span className="text-gray-500">Tax ID:</span> {selectedSupplier.taxId}</div>
                </div>
              </div>

              {/* Business Terms */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Business Terms
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Payment Terms:</span> {selectedSupplier.paymentTerms}</div>
                  <div><span className="text-gray-500">Lead Time:</span> {selectedSupplier.leadTime}</div>
                  <div><span className="text-gray-500">Min Order Value:</span> {formatCurrency(selectedSupplier.minOrderValue)}</div>
                  <div><span className="text-gray-500">Shipping Method:</span> {selectedSupplier.shippingMethod}</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Performance Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">On-time Delivery</p>
                    <p className="text-xl font-bold text-green-600">{selectedSupplier.performance.onTimeDelivery}%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Quality Rating</p>
                    <p className="text-xl font-bold text-blue-600">{selectedSupplier.performance.qualityRating}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Response Time</p>
                    <p className="text-xl font-bold text-yellow-600">{selectedSupplier.performance.responseTime} days</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Return Rate</p>
                    <p className="text-xl font-bold text-red-600">{selectedSupplier.performance.returnRate}%</p>
                  </div>
                </div>
              </div>

              {/* Banking Details */}
              {selectedSupplier.bankDetails && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Banking Details
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">Bank Name:</span> {selectedSupplier.bankDetails.bankName}</div>
                      <div><span className="text-gray-500">Account Name:</span> {selectedSupplier.bankDetails.accountName}</div>
                      <div><span className="text-gray-500">Account Number:</span> {selectedSupplier.bankDetails.accountNumber}</div>
                      <div><span className="text-gray-500">Branch Code:</span> {selectedSupplier.bankDetails.branchCode}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedSupplier.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Notes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">{selectedSupplier.notes}</p>
                </div>
              )}

              {/* Documents */}
              {selectedSupplier.documents && selectedSupplier.documents.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Link className="w-4 h-4" /> Documents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.documents.map((doc, idx) => (
                      <a key={idx} href="#" className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition flex items-center gap-2">
                        <FileText className="w-3 h-3" /> {doc}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button
                  onClick={() => {
                    setEditingSupplier(selectedSupplier);
                    setIsFormModalOpen(true);
                    setSelectedSupplier(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit Supplier
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Create Purchase Order
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View Order History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setIsFormModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {editingSupplier?.id ? 'Edit Supplier' : 'Add New Supplier'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier Name *</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.name || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier Code</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.code || `SUP-${String(mockSuppliers.length + 1).padStart(3, '0')}`}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.contactPerson || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    defaultValue={editingSupplier?.email || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    defaultValue={editingSupplier?.phone || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alternate Phone</label>
                  <input
                    type="tel"
                    defaultValue={editingSupplier?.alternatePhone || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.address || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.city || 'Nairobi'}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.country || 'Kenya'}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.website || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="www.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tax ID</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.taxId || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Terms</label>
                  <select
                    defaultValue={editingSupplier?.paymentTerms || 'Net 30'}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option>Net 60</option>
                    <option>COD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lead Time</label>
                  <input
                    type="text"
                    defaultValue={editingSupplier?.leadTime || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., 7-14 days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Order Value (KES)</label>
                  <input
                    type="number"
                    defaultValue={editingSupplier?.minOrderValue || ''}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    defaultValue={editingSupplier?.status || 'active'}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categories</label>
                <select
                  multiple
                  defaultValue={editingSupplier?.categories || []}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  size={4}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Computer Accessories">Computer Accessories</option>
                  <option value="Organic Products">Organic Products</option>
                  <option value="Sustainable Products">Sustainable Products</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  rows={3}
                  defaultValue={editingSupplier?.notes || ''}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Additional notes about the supplier..."
                />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success(editingSupplier?.id ? 'Supplier updated' : 'Supplier created');
                  setIsFormModalOpen(false);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {editingSupplier?.id ? 'Update Supplier' : 'Create Supplier'}
              </button>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ArrowUpDown component for sorting
const ArrowUpDown = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

export default SuppliersManagement;