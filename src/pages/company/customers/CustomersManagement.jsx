import React, { useState } from 'react';
import {
  Plus, Search, Filter, Download, Printer, MoreVertical,
  Eye, Edit, Trash2, Users, UserPlus, Mail, Phone,
  MapPin, Calendar, Star, Award, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, DollarSign, MessageSquare,
  BarChart3, Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, FileText, Send, Bell, Settings, AlertTriangle,
  CreditCard, ShoppingBag, Gift, Heart, ThumbsUp, ThumbsDown,
  UserCheck, UserX, UserMinus, UserPlus as UserPlusIcon,
  AtSign, Globe, Briefcase, Cake, Home, LogOut, Copy, QrCode,
  List,
  ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock customers data
const mockCustomers = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'Mwangi',
    email: 'james.mwangi@email.com',
    phone: '+254 712 345 678',
    alternativePhone: '+254 722 345 678',
    address: {
      street: '123 Kimathi Street',
      city: 'Nairobi',
      state: 'Nairobi',
      zipCode: '00100',
      country: 'Kenya'
    },
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    occupation: 'Software Engineer',
    company: 'Tech Solutions Ltd',
    status: 'active',
    customerSince: '2023-01-15',
    lastActive: '2024-03-14',
    totalOrders: 45,
    totalSpent: 125750,
    averageOrderValue: 2794,
    loyaltyPoints: 1250,
    loyaltyTier: 'Gold',
    tags: ['premium', 'tech-savvy', 'frequent-buyer'],
    notes: 'Prefers email communication. Interested in new tech products.',
    communicationPreference: 'email',
    marketingOptIn: true,
    emailVerified: true,
    phoneVerified: true,
    recentOrders: [
      { id: 1001, date: '2024-03-10', total: 12500, status: 'delivered' },
      { id: 1002, date: '2024-03-05', total: 3400, status: 'delivered' },
      { id: 1003, date: '2024-02-28', total: 8900, status: 'delivered' }
    ],
    paymentMethods: [
      { type: 'M-Pesa', lastFour: '****', isDefault: true },
      { type: 'Card', lastFour: '1234', isDefault: false }
    ],
    wishlist: [1, 3, 5],
    reviews: [
      { productId: 1, rating: 5, comment: 'Excellent product!', date: '2024-02-15' },
      { productId: 2, rating: 4, comment: 'Good quality', date: '2024-01-20' }
    ],
    supportTickets: [
      { id: 101, status: 'resolved', subject: 'Order delay', date: '2024-02-01' }
    ]
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Wanjiku',
    email: 'sarah.wanjiku@email.com',
    phone: '+254 722 456 789',
    alternativePhone: '',
    address: {
      street: '45 Moi Avenue',
      city: 'Mombasa',
      state: 'Mombasa',
      zipCode: '80100',
      country: 'Kenya'
    },
    dateOfBirth: '1990-03-22',
    gender: 'Female',
    occupation: 'Marketing Manager',
    company: 'BrandWorks Agency',
    status: 'active',
    customerSince: '2023-03-20',
    lastActive: '2024-03-13',
    totalOrders: 28,
    totalSpent: 68450,
    averageOrderValue: 2445,
    loyaltyPoints: 680,
    loyaltyTier: 'Silver',
    tags: ['social-media', 'regular', 'promo-sensitive'],
    notes: 'Responds well to SMS promotions.',
    communicationPreference: 'sms',
    marketingOptIn: true,
    emailVerified: true,
    phoneVerified: true,
    recentOrders: [
      { id: 1004, date: '2024-03-12', total: 5600, status: 'delivered' },
      { id: 1005, date: '2024-03-08', total: 2300, status: 'shipped' }
    ],
    paymentMethods: [
      { type: 'M-Pesa', lastFour: '****', isDefault: true }
    ],
    wishlist: [2, 4],
    reviews: [
      { productId: 3, rating: 5, comment: 'Love the tea!', date: '2024-02-10' }
    ],
    supportTickets: []
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Omondi',
    email: 'peter.omondi@email.com',
    phone: '+254 733 567 890',
    alternativePhone: '+254 744 567 890',
    address: {
      street: '78 Kenyatta Avenue',
      city: 'Kisumu',
      state: 'Kisumu',
      zipCode: '40100',
      country: 'Kenya'
    },
    dateOfBirth: '1978-11-10',
    gender: 'Male',
    occupation: 'Business Owner',
    company: 'Omondi Enterprises',
    status: 'inactive',
    customerSince: '2022-06-10',
    lastActive: '2024-02-20',
    totalOrders: 12,
    totalSpent: 89200,
    averageOrderValue: 7433,
    loyaltyPoints: 420,
    loyaltyTier: 'Bronze',
    tags: ['wholesale', 'bulk-buyer', 'business'],
    notes: 'Occasional bulk purchases.',
    communicationPreference: 'email',
    marketingOptIn: false,
    emailVerified: true,
    phoneVerified: false,
    recentOrders: [
      { id: 1006, date: '2024-02-15', total: 15600, status: 'delivered' }
    ],
    paymentMethods: [
      { type: 'Bank Transfer', lastFour: '****', isDefault: true }
    ],
    wishlist: [],
    reviews: [],
    supportTickets: [
      { id: 102, status: 'open', subject: 'Return request', date: '2024-03-01' }
    ]
  },
  {
    id: 4,
    firstName: 'Mary',
    lastName: 'Akinyi',
    email: 'mary.akinyi@email.com',
    phone: '+254 744 678 901',
    alternativePhone: '',
    address: {
      street: '12 Uhuru Highway',
      city: 'Nakuru',
      state: 'Nakuru',
      zipCode: '20100',
      country: 'Kenya'
    },
    dateOfBirth: '1995-08-05',
    gender: 'Female',
    occupation: 'Teacher',
    company: 'Greenwood School',
    status: 'active',
    customerSince: '2023-08-01',
    lastActive: '2024-03-12',
    totalOrders: 18,
    totalSpent: 23450,
    averageOrderValue: 1303,
    loyaltyPoints: 320,
    loyaltyTier: 'Bronze',
    tags: ['teacher', 'budget-conscious', 'first-time'],
    notes: 'Prefers educational products.',
    communicationPreference: 'email',
    marketingOptIn: true,
    emailVerified: true,
    phoneVerified: true,
    recentOrders: [
      { id: 1007, date: '2024-03-11', total: 1200, status: 'pending' },
      { id: 1008, date: '2024-03-05', total: 890, status: 'delivered' }
    ],
    paymentMethods: [
      { type: 'M-Pesa', lastFour: '****', isDefault: true }
    ],
    wishlist: [6, 7],
    reviews: [],
    supportTickets: []
  },
  {
    id: 5,
    firstName: 'John',
    lastName: 'Kamau',
    email: 'john.kamau@email.com',
    phone: '+254 755 789 012',
    alternativePhone: '+254 766 789 012',
    address: {
      street: '34 Langata Road',
      city: 'Nairobi',
      state: 'Nairobi',
      zipCode: '00505',
      country: 'Kenya'
    },
    dateOfBirth: '1982-12-25',
    gender: 'Male',
    occupation: 'Doctor',
    company: 'Nairobi Hospital',
    status: 'active',
    customerSince: '2023-10-15',
    lastActive: '2024-03-14',
    totalOrders: 32,
    totalSpent: 98750,
    averageOrderValue: 3086,
    loyaltyPoints: 980,
    loyaltyTier: 'Gold',
    tags: ['premium', 'health-conscious', 'frequent'],
    notes: 'Interested in health supplements and equipment.',
    communicationPreference: 'email',
    marketingOptIn: true,
    emailVerified: true,
    phoneVerified: true,
    recentOrders: [
      { id: 1009, date: '2024-03-09', total: 4500, status: 'delivered' },
      { id: 1010, date: '2024-03-02', total: 12500, status: 'delivered' }
    ],
    paymentMethods: [
      { type: 'Card', lastFour: '5678', isDefault: true },
      { type: 'M-Pesa', lastFour: '****', isDefault: false }
    ],
    wishlist: [8, 9, 10],
    reviews: [
      { productId: 4, rating: 5, comment: 'Excellent chair!', date: '2024-02-25' }
    ],
    supportTickets: []
  },
  {
    id: 6,
    firstName: 'Lucy',
    lastName: 'Nduta',
    email: 'lucy.nduta@email.com',
    phone: '+254 766 890 123',
    alternativePhone: '',
    address: {
      street: '56 Riverside Drive',
      city: 'Nairobi',
      state: 'Nairobi',
      zipCode: '00100',
      country: 'Kenya'
    },
    dateOfBirth: '1988-04-18',
    gender: 'Female',
    occupation: 'Lawyer',
    company: 'Nduta & Associates',
    status: 'active',
    customerSince: '2023-12-01',
    lastActive: '2024-03-11',
    totalOrders: 8,
    totalSpent: 45800,
    averageOrderValue: 5725,
    loyaltyPoints: 320,
    loyaltyTier: 'Silver',
    tags: ['premium', 'new-customer', 'high-value'],
    notes: 'New premium customer. Good potential.',
    communicationPreference: 'email',
    marketingOptIn: true,
    emailVerified: true,
    phoneVerified: true,
    recentOrders: [
      { id: 1011, date: '2024-03-07', total: 18900, status: 'delivered' }
    ],
    paymentMethods: [
      { type: 'Card', lastFour: '9012', isDefault: true }
    ],
    wishlist: [11, 12],
    reviews: [],
    supportTickets: []
  }
];

const CustomersManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // list or grid
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('totalSpent');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(null);
  const itemsPerPage = 12;

  // Filter customers
  const filteredCustomers = mockCustomers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.phone.includes(searchQuery) ||
                          customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesTier = tierFilter === 'all' || customer.loyaltyTier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  // Sorting
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalCustomers: mockCustomers.length,
    activeCustomers: mockCustomers.filter(c => c.status === 'active').length,
    inactiveCustomers: mockCustomers.filter(c => c.status === 'inactive').length,
    newCustomers: mockCustomers.filter(c => {
      const customerSince = new Date(c.customerSince);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return customerSince >= threeMonthsAgo;
    }).length,
    totalRevenue: mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: (mockCustomers.reduce((sum, c) => sum + c.averageOrderValue, 0) / mockCustomers.length).toFixed(0),
    totalOrders: mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0),
    loyaltyPointsTotal: mockCustomers.reduce((sum, c) => sum + c.loyaltyPoints, 0),
    goldCustomers: mockCustomers.filter(c => c.loyaltyTier === 'Gold').length,
    silverCustomers: mockCustomers.filter(c => c.loyaltyTier === 'Silver').length,
    bronzeCustomers: mockCustomers.filter(c => c.loyaltyTier === 'Bronze').length
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to desc for spending metrics
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Customer data refreshed');
    }, 1000);
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map(c => c.id));
    }
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(cid => cid !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedCustomers.length === 0) {
      toast.error('No customers selected');
      return;
    }
    toast.success(`${selectedCustomers.length} customers ${action}`);
    setSelectedCustomers([]);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: UserCheck, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: UserX, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      suspended: { icon: UserMinus, text: 'Suspended', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getLoyaltyBadge = (tier) => {
    const config = {
      Gold: { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Award },
      Silver: { className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400', icon: Star },
      Bronze: { className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: Award }
    };
    const { className, icon: Icon } = config[tier] || config.Bronze;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {tier}
      </span>
    );
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return <ArrowUpDown className={`w-3 h-3 ml-1 ${sortDirection === 'asc' ? '' : 'rotate-180'}`} />;
  };

  const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage customer profiles, track loyalty, and view purchase history
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
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Import
          </button>
          <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            <UserPlus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Active: {stats.activeCustomers}</span>
            <span className="text-gray-500">Inactive: {stats.inactiveCustomers}</span>
            <span className="text-blue-600">New: {stats.newCustomers}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total Orders: {stats.totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.averageOrderValue)}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Loyalty Points: {stats.loyaltyPointsTotal.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Loyalty Tiers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.goldCustomers + stats.silverCustomers + stats.bronzeCustomers}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-yellow-600">Gold: {stats.goldCustomers}</span>
            <span className="text-gray-600">Silver: {stats.silverCustomers}</span>
            <span className="text-amber-600">Bronze: {stats.bronzeCustomers}</span>
          </div>
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
                  placeholder="Search customers..."
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
              </select>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Tiers</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
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
                  className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600' : 'text-gray-400'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing {paginatedCustomers.length} of {filteredCustomers.length} customers
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCustomers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCustomers.length} customer(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('emailed')}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs rounded-lg transition flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> Email
                </button>
                <button
                  onClick={() => handleBulkAction('exported')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Export
                </button>
                <button
                  onClick={() => handleBulkAction('activated')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('deactivated')}
                  className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction('deleted')}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customers Display - Grid View */}
        {viewMode === 'grid' && (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${selectedCustomers.includes(customer.id) ? 'ring-2 ring-brand-500' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="p-1 text-gray-400 hover:text-brand-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowEmailModal(customer)}
                          className="p-1 text-gray-400 hover:text-green-600 transition"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                        {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{customer.address.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Since {formatDate(customer.customerSince)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      {getStatusBadge(customer.status)}
                      {getLoyaltyBadge(customer.loyaltyTier)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500">Total Spent</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(customer.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Orders</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.totalOrders}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Display - List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === paginatedCustomers.length && paginatedCustomers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('firstName')}>
                    <div className="flex items-center">Customer <SortIcon field="firstName" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalSpent')}>
                    <div className="flex items-center">Total Spent <SortIcon field="totalSpent" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalOrders')}>
                    <div className="flex items-center">Orders <SortIcon field="totalOrders" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${selectedCustomers.includes(customer.id) ? 'bg-brand-50 dark:bg-brand-900/20' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{customer.firstName} {customer.lastName}</div>
                          <div className="text-xs text-gray-500">{customer.company || 'Individual'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(customer.totalSpent)}</div>
                      <div className="text-xs text-gray-500">Avg: {formatCurrency(customer.averageOrderValue)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 dark:text-white">{customer.totalOrders}</span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-4 py-3">
                      {getLoyaltyBadge(customer.loyaltyTier)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{formatDate(customer.lastActive)}</div>
                      <div className="text-xs text-gray-500">Since {formatDate(customer.customerSince)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="p-1.5 text-gray-400 hover:text-brand-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowEmailModal(customer)}
                          className="p-1.5 text-gray-400 hover:text-green-600 transition"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 transition" title="Delete">
                          <Trash2 className="w-4 h-4" />
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

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                  {selectedCustomer.firstName.charAt(0)}{selectedCustomer.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedCustomer.firstName} {selectedCustomer.lastName}</h3>
                  <p className="text-sm text-gray-500">Customer since {formatDate(selectedCustomer.customerSince)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {/* Tabs would go here for a more detailed view */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-brand-500" />
                      Personal Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Full Name:</span><span>{selectedCustomer.firstName} {selectedCustomer.lastName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Email:</span><span>{selectedCustomer.email}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span>{selectedCustomer.phone}</span></div>
                      {selectedCustomer.alternativePhone && (
                        <div className="flex justify-between"><span className="text-gray-500">Alt Phone:</span><span>{selectedCustomer.alternativePhone}</span></div>
                      )}
                      <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span><span>{formatDate(selectedCustomer.dateOfBirth)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Gender:</span><span>{selectedCustomer.gender}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Occupation:</span><span>{selectedCustomer.occupation}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Company:</span><span>{selectedCustomer.company}</span></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-500" />
                      Address
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>{selectedCustomer.address.street}</p>
                      <p>{selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zipCode}</p>
                      <p>{selectedCustomer.address.country}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-500" />
                      Tags & Notes
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedCustomer.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCustomer.notes}</p>
                  </div>
                </div>

                {/* Purchase & Loyalty */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-brand-500" />
                      Purchase Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Total Spent</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedCustomer.totalSpent)}</p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomer.totalOrders}</p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Avg. Order Value</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedCustomer.averageOrderValue)}</p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-500">Loyalty Points</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomer.loyaltyPoints}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-brand-500" />
                      Recent Orders
                    </h4>
                    <div className="space-y-2">
                      {selectedCustomer.recentOrders.map((order, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">#{order.id}</span>
                            <span className="text-gray-500 ml-2">{formatDate(order.date)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{formatCurrency(order.total)}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-brand-500" />
                      Preferences
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Communication:</span><span className="capitalize">{selectedCustomer.communicationPreference}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Marketing Opt-in:</span><span>{selectedCustomer.marketingOptIn ? 'Yes' : 'No'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Email Verified:</span><span>{selectedCustomer.emailVerified ? '✓' : '✗'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Phone Verified:</span><span>{selectedCustomer.phoneVerified ? '✓' : '✗'}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  Edit Customer
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View All Orders
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Adjust Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEmailModal(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Send Email to {showEmailModal.firstName} {showEmailModal.lastName}
              </h3>
              <button onClick={() => setShowEmailModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Email subject"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    toast.success(`Email sent to ${showEmailModal.email}`);
                    setShowEmailModal(null);
                  }}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Send Email
                </button>
                <button
                  onClick={() => setShowEmailModal(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Import Customers</h3>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <p className="text-xs text-gray-500">Supported formats: .csv, .xlsx</p>
                <button className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm">
                  Select File
                </button>
              </div>
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Required columns:</strong> firstName, lastName, email, phone
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <a href="#" className="text-brand-600">Download sample template</a>
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.success('Customers imported successfully');
                    setShowImportModal(false);
                  }}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Import
                </button>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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

export default CustomersManagement;