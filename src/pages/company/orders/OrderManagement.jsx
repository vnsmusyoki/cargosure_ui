import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Download, Printer, MoreVertical, 
  Eye, Edit, Trash2, Package, Truck, Clock, CheckCircle, 
  AlertCircle, X, ChevronLeft, ChevronRight, RefreshCw,
  DollarSign, User, MapPin, Phone, Mail, Calendar, 
  Star, MessageSquare, Send, FileText, Copy, Printer as PrintIcon,
  Filter as FilterIcon, Download as DownloadIcon, Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock order data
const mockOrders = [
  { 
    id: 'ORD-2341', 
    customer: 'TechZone Solutions', 
    customerPhone: '+254 700 111 222',
    customerEmail: 'info@techzone.co.ke',
    address: 'Westlands, Nairobi',
    status: 'delivered', 
    time: '10:32 AM', 
    scheduledTime: '10:00 AM', 
    driver: 'James Mwangi',
    driverId: 1,
    amount: 12500,
    items: 3,
    type: 'Electronics',
    priority: 'normal',
    rating: 5,
    createdAt: '2024-03-15T08:30:00',
    deliveredAt: '2024-03-15T10:32:00',
    notes: 'Call customer before delivery',
    tracking: 'https://tracking.delivertrack.com/ORD-2341'
  },
  { 
    id: 'ORD-2342', 
    customer: 'Fresh Grocers Ltd', 
    customerPhone: '+254 711 333 444',
    customerEmail: 'orders@freshgrocers.com',
    address: 'Kilimani, Nairobi',
    status: 'in-transit', 
    time: '11:15 AM', 
    scheduledTime: '11:00 AM', 
    driver: 'Sarah Wanjiku',
    driverId: 2,
    amount: 8200,
    items: 8,
    type: 'Groceries',
    priority: 'high',
    rating: null,
    createdAt: '2024-03-15T09:15:00',
    deliveredAt: null,
    notes: 'Handle with care - fragile items',
    tracking: 'https://tracking.delivertrack.com/ORD-2342'
  },
  { 
    id: 'ORD-2343', 
    customer: 'Home Appliances', 
    customerPhone: '+254 722 555 666',
    customerEmail: 'sales@homeappliances.co.ke',
    address: 'CBD, Nairobi',
    status: 'pending', 
    time: '1:00 PM', 
    scheduledTime: '1:00 PM', 
    driver: 'Peter Omondi',
    driverId: 3,
    amount: 23400,
    items: 2,
    type: 'Appliances',
    priority: 'normal',
    rating: null,
    createdAt: '2024-03-15T10:00:00',
    deliveredAt: null,
    notes: 'Delivery to 3rd floor',
    tracking: 'https://tracking.delivertrack.com/ORD-2343'
  },
  { 
    id: 'ORD-2344', 
    customer: 'Fashion Hub', 
    customerPhone: '+254 733 777 888',
    customerEmail: 'support@fashionhub.com',
    address: 'Karen, Nairobi',
    status: 'in-transit', 
    time: '10:45 AM', 
    scheduledTime: '10:30 AM', 
    driver: 'James Mwangi',
    driverId: 1,
    amount: 5600,
    items: 5,
    type: 'Clothing',
    priority: 'low',
    rating: null,
    createdAt: '2024-03-15T08:00:00',
    deliveredAt: null,
    notes: '',
    tracking: 'https://tracking.delivertrack.com/ORD-2344'
  },
  { 
    id: 'ORD-2345', 
    customer: 'Electronics Plus', 
    customerPhone: '+254 744 999 000',
    customerEmail: 'info@electronicsplus.co.ke',
    address: 'Parklands, Nairobi',
    status: 'delivered', 
    time: '9:30 AM', 
    scheduledTime: '9:00 AM', 
    driver: 'John Kamau',
    driverId: 5,
    amount: 15200,
    items: 1,
    type: 'Electronics',
    priority: 'high',
    rating: 5,
    createdAt: '2024-03-15T07:00:00',
    deliveredAt: '2024-03-15T09:30:00',
    notes: 'Signature required',
    tracking: 'https://tracking.delivertrack.com/ORD-2345'
  },
  { 
    id: 'ORD-2346', 
    customer: 'Pharma Health', 
    customerPhone: '+254 755 111 222',
    customerEmail: 'orders@pharmahealth.co.ke',
    address: 'Upper Hill, Nairobi',
    status: 'pending', 
    time: '2:30 PM', 
    scheduledTime: '2:00 PM', 
    driver: 'Sarah Wanjiku',
    driverId: 2,
    amount: 9800,
    items: 12,
    type: 'Medical',
    priority: 'urgent',
    rating: null,
    createdAt: '2024-03-15T11:30:00',
    deliveredAt: null,
    notes: 'Temperature sensitive - handle with care',
    tracking: 'https://tracking.delivertrack.com/ORD-2346'
  },
  { 
    id: 'ORD-2347', 
    customer: 'Bookstore Kenya', 
    customerPhone: '+254 766 333 444',
    customerEmail: 'orders@bookstorekenya.com',
    address: 'Ngong Road, Nairobi',
    status: 'pending', 
    time: '3:00 PM', 
    scheduledTime: '3:00 PM', 
    driver: null,
    driverId: null,
    amount: 3200,
    items: 4,
    type: 'Books',
    priority: 'normal',
    rating: null,
    createdAt: '2024-03-15T12:00:00',
    deliveredAt: null,
    notes: 'Leave at reception',
    tracking: 'https://tracking.delivertrack.com/ORD-2347'
  }
];

const OrderManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('today');
  const itemsPerPage = 10;

  // Filter orders
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customerPhone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    inTransit: mockOrders.filter(o => o.status === 'in-transit').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    totalRevenue: mockOrders.reduce((sum, o) => sum + o.amount, 0),
    avgOrderValue: Math.round(mockOrders.reduce((sum, o) => sum + o.amount, 0) / mockOrders.length),
    onTimeRate: 92
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Orders refreshed');
    }, 1000);
  };

  const handleDeleteOrder = (order) => {
    toast.success(`Order ${order.id} deleted successfully`);
    setShowDeleteModal(null);
  };

  const handleDuplicateOrder = (order) => {
    toast.success(`Order ${order.id} duplicated successfully`);
  };

  const getStatusBadge = (status) => {
    const config = {
      delivered: { icon: CheckCircle, text: 'Delivered', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      'in-transit': { icon: Truck, text: 'In Transit', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      pending: { icon: Clock, text: 'Pending', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config[priority] || config.normal}`}>{priority}</span>;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Electronics': return '📱';
      case 'Groceries': return '🥬';
      case 'Appliances': return '🔧';
      case 'Clothing': return '👕';
      case 'Medical': return '💊';
      case 'Books': return '📚';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all delivery orders from creation to completion
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
            onClick={() => navigate('/orders-management/create')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inTransit}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">KES {(stats.totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
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
                placeholder="Search by ID, customer, phone..."
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
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="all">All Types</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Appliances">Appliances</option>
              <option value="Clothing">Clothing</option>
              <option value="Medical">Medical</option>
              <option value="Books">Books</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition">
              <DownloadIcon className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Printer className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 transition">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-4 py-3">
                    <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">{order.id}</div>
                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.address}</td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3">{getPriorityBadge(order.priority)}</td>
                  <td className="px-4 py-3">
                    {order.driver ? (
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">{order.driver}</div>
                        <div className="text-xs text-gray-500">ID: {order.driverId}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">KES {order.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{order.items} items</div>
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/order-management/edit/${order.id}`)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateOrder(order)}
                        className="p-1.5 text-gray-400 hover:text-green-600 transition"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(order)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
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
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Order Details</h3>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(selectedOrder.type)}</span>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{selectedOrder.type}</div>
                    <div className="text-xs text-gray-500">Order Type</div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(selectedOrder.status)}
                  <div className="text-xs text-gray-500 mt-1">Created: {new Date(selectedOrder.createdAt).toLocaleString()}</div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Name:</span> {selectedOrder.customer}</div>
                  <div><span className="text-gray-500">Phone:</span> {selectedOrder.customerPhone}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedOrder.customerEmail}</div>
                  <div><span className="text-gray-500">Address:</span> {selectedOrder.address}</div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Delivery Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Scheduled Time:</span> {selectedOrder.scheduledTime}</div>
                  <div><span className="text-gray-500">Driver:</span> {selectedOrder.driver || 'Unassigned'}</div>
                  {selectedOrder.deliveredAt && (
                    <div><span className="text-gray-500">Delivered At:</span> {new Date(selectedOrder.deliveredAt).toLocaleString()}</div>
                  )}
                  {selectedOrder.rating && (
                    <div><span className="text-gray-500">Rating:</span> {'⭐'.repeat(selectedOrder.rating)}</div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>Total Items</span>
                    <span className="font-medium">{selectedOrder.items}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">KES {selectedOrder.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-indigo-600">KES {selectedOrder.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <span className="font-semibold">Note:</span> {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    window.open(selectedOrder.tracking, '_blank');
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Track Order
                </button>
                <button
                  onClick={() => {
                    toast.success(`SMS sent to ${selectedOrder.customer}`);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Send SMS
                </button>
                <button
                  onClick={() => {
                    navigate(`/order-management/edit/${selectedOrder.id}`);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Edit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Delete Order</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete order <span className="font-semibold">{showDeleteModal.id}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDeleteOrder(showDeleteModal)}
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

export default OrderManagement;