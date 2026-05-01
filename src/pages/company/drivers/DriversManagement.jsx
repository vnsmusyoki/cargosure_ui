import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Printer, MoreVertical, 
  Eye, Edit, Trash2, UserCheck, UserX, Truck, Clock, 
  Star, TrendingUp, TrendingDown, DollarSign, Award, 
  Calendar, MapPin, Phone, Mail, AlertCircle, CheckCircle,
  BarChart3, PieChart, Users, Navigation, ThumbsUp, 
  Activity, Zap, Target, Shield, ChevronLeft, ChevronRight,
  X, UserPlus, RefreshCw, FileText, Send, MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Mock data for drivers
const mockDrivers = [
  { id: 1, name: 'James Mwangi', email: 'james.mwangi@deliver.com', phone: '+254 700 123 456', status: 'active', vehicle: 'KCA 123A', type: 'Motorcycle', deliveries: 145, completed: 142, rating: 4.8, earnings: 'KES 45,200', joinedDate: '2024-01-15', lastActive: '2 min ago', acceptance: 98, distance: '1,245 km', zones: ['Westlands', 'Kilimani'], shifts: 'Morning', avatar: 'JM', completedRate: 98, onTime: 96 },
  { id: 2, name: 'Sarah Wanjiku', email: 'sarah.wanjiku@deliver.com', phone: '+254 711 234 567', status: 'active', vehicle: 'KCD 456B', type: 'Van', deliveries: 98, completed: 97, rating: 4.9, earnings: 'KES 52,800', joinedDate: '2024-02-10', lastActive: '5 min ago', acceptance: 96, distance: '1,890 km', zones: ['Kilimani', 'CBD'], shifts: 'Afternoon', avatar: 'SW', completedRate: 99, onTime: 97 },
  { id: 3, name: 'Peter Omondi', email: 'peter.omondi@deliver.com', phone: '+254 722 345 678', status: 'idle', vehicle: 'KCE 789C', type: 'Tuk Tuk', deliveries: 67, completed: 64, rating: 4.7, earnings: 'KES 32,400', joinedDate: '2024-01-20', lastActive: '10 min ago', acceptance: 92, distance: '890 km', zones: ['CBD', 'Parklands'], shifts: 'Morning', avatar: 'PO', completedRate: 95, onTime: 92 },
  { id: 4, name: 'Mary Akinyi', email: 'mary.akinyi@deliver.com', phone: '+254 733 456 789', status: 'offline', vehicle: 'KCF 012D', type: 'Bicycle', deliveries: 34, completed: 33, rating: 4.9, earnings: 'KES 18,500', joinedDate: '2024-03-01', lastActive: '2 hours ago', acceptance: 95, distance: '450 km', zones: ['Karen', 'Ngong'], shifts: 'Evening', avatar: 'MA', completedRate: 97, onTime: 98 },
  { id: 5, name: 'John Kamau', email: 'john.kamau@deliver.com', phone: '+254 744 567 890', status: 'active', vehicle: 'KCG 345E', type: 'Motorcycle', deliveries: 112, completed: 110, rating: 4.9, earnings: 'KES 48,600', joinedDate: '2024-01-05', lastActive: '1 min ago', acceptance: 99, distance: '1,560 km', zones: ['Westlands', 'Parklands'], shifts: 'Morning', avatar: 'JK', completedRate: 98, onTime: 99 },
  { id: 6, name: 'Grace Atieno', email: 'grace.atieno@deliver.com', phone: '+254 755 678 901', status: 'active', vehicle: 'KCH 456F', type: 'Motorcycle', deliveries: 89, completed: 87, rating: 4.8, earnings: 'KES 41,200', joinedDate: '2024-02-15', lastActive: '3 min ago', acceptance: 97, distance: '1,120 km', zones: ['Kilimani', 'CBD'], shifts: 'Afternoon', avatar: 'GA', completedRate: 98, onTime: 95 },
];

// Analytics data
const generateWeeklyDeliveries = () => [42, 38, 45, 52, 48, 58, 62];
const generateDriverPerformance = () => [45, 30, 15, 10];
const generateEarningsData = () => [12500, 15800, 14200, 16800, 15200, 18500, 19200];

const DriversManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  // Filter drivers
  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          driver.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats for overview
  const stats = {
    totalDrivers: mockDrivers.length,
    activeDrivers: mockDrivers.filter(d => d.status === 'active').length,
    idleDrivers: mockDrivers.filter(d => d.status === 'idle').length,
    offlineDrivers: mockDrivers.filter(d => d.status === 'offline').length,
    totalDeliveries: mockDrivers.reduce((sum, d) => sum + d.deliveries, 0),
    totalEarnings: mockDrivers.reduce((sum, d) => parseInt(d.earnings.replace(/[^0-9]/g, '')), 0),
    avgRating: (mockDrivers.reduce((sum, d) => sum + d.rating, 0) / mockDrivers.length).toFixed(1),
    avgAcceptance: Math.round(mockDrivers.reduce((sum, d) => sum + d.acceptance, 0) / mockDrivers.length),
  };

  const toggleRowExpand = (driverId) => {
    setExpandedRows(prev => ({ ...prev, [driverId]: !prev[driverId] }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Data refreshed');
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      idle: { icon: Clock, text: 'Idle', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      offline: { icon: UserX, text: 'Offline', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
    };
    const { icon: Icon, text, className } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Drivers Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your fleet drivers, track performance, and optimize delivery operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition" onClick={()=> navigate('/drivers-management/onboard')}>
            <UserPlus className="w-4 h-4" />
            Add New Driver
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'overview' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Overview & Analytics
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'drivers' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Users className="w-4 h-4" />
          Drivers List
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockDrivers.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Overview & Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Drivers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDrivers}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +2 this month
                    </span>
                  </div>
                </div>
                <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
              </div>
              <div className="mt-3 flex gap-2 text-xs">
                <span className="text-green-600">Active: {stats.activeDrivers}</span>
                <span className="text-yellow-600">Idle: {stats.idleDrivers}</span>
                <span className="text-gray-500">Offline: {stats.offlineDrivers}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Deliveries</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDeliveries}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.5% vs last month
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    KES {(stats.totalEarnings / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12.3% vs last month
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Driver Rating</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Excellent
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Deliveries Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Deliveries</h3>
                <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {generateWeeklyDeliveries().map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-brand-500 rounded-t transition-all hover:bg-brand-600 cursor-pointer"
                        style={{ height: `${(value / 70) * 180}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {value} deliveries
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Performance Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Driver Performance Distribution</h3>
                <button className="text-brand-600 text-sm">View Details</button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="space-y-3">
                    {[
                      { label: 'Top Performer', value: 45, color: 'bg-green-500', count: 3 },
                      { label: 'Good', value: 30, color: 'bg-blue-500', count: 2 },
                      { label: 'Average', value: 15, color: 'bg-yellow-500', count: 1 },
                      { label: 'Needs Improvement', value: 10, color: 'bg-red-500', count: 0 }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
                      <div className="text-xs text-gray-500">Avg Rating</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray={`${(96 / 100) * 251.2} 251.2`} />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Top Performers
              </h3>
              <div className="space-y-4">
                {mockDrivers.filter(d => d.status === 'active').slice(0, 3).map((driver, idx) => (
                  <div key={driver.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                      {driver.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.deliveries} deliveries • {driver.rating}★</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{driver.acceptance}%</div>
                      <div className="text-xs text-gray-400">acceptance</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Trend */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Earnings Trend (Last 7 Days)
              </h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {generateEarningsData().map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-green-500 rounded-t transition-all hover:bg-green-600"
                      style={{ height: `${(value / 20000) * 100}px` }}
                    />
                    <span className="text-[10px] text-gray-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total This Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">KES 112,200</span>
                </div>
              </div>
            </div>

            {/* Zone Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                Zone Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { zone: 'Westlands', count: 4, percentage: 30 },
                  { zone: 'Kilimani', count: 3, percentage: 25 },
                  { zone: 'CBD', count: 3, percentage: 25 },
                  { zone: 'Parklands', count: 2, percentage: 20 }
                ].map((zone, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{zone.zone}</span>
                      <span className="text-gray-500 text-xs">{zone.count} drivers</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${zone.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Driver Activity</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockDrivers.slice(0, 4).map((driver) => (
                <div key={driver.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold">
                      {driver.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.status === 'active' ? 'Currently delivering' : driver.status === 'idle' ? 'Waiting for orders' : 'Offline'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-700 dark:text-gray-300">{driver.lastActive}</div>
                    <div className="text-xs text-gray-400">{driver.shifts} shift</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Drivers List */}
      {activeTab === 'drivers' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters and Actions Bar */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drivers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="offline">Offline</option>
              </select>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedDrivers.length} of {filteredDrivers.length} drivers
            </div>
          </div>

          {/* Drivers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deliveries</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedDrivers.map((driver) => (
                  <React.Fragment key={driver.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            {driver.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{driver.name}</div>
                            <div className="text-xs text-gray-500">Joined {new Date(driver.joinedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{driver.phone}</div>
                        <div className="text-xs text-gray-400">{driver.email}</div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        {getStatusBadge(driver.status)}
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="text-sm text-gray-700 dark:text-gray-300">{driver.vehicle}</div>
                        <div className="text-xs text-gray-400">{driver.type}</div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{driver.deliveries}</div>
                        <div className="text-xs text-green-600">{driver.completedRate}% completed</div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{driver.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3" onClick={() => toggleRowExpand(driver.id)}>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{driver.earnings}</div>
                        <div className="text-xs text-gray-400">{driver.shifts} shift</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedDriver(driver)}
                            className="p-1.5 text-gray-400 hover:text-brand-600 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 transition" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleRowExpand(driver.id)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 transition"
                            title="More Info"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Row */}
                    {expandedRows[driver.id] && (
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td colSpan="8" className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-1">Performance Metrics</div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Acceptance Rate</span>
                                  <span className="font-semibold">{driver.acceptance}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>On-Time Rate</span>
                                  <span className="font-semibold">{driver.onTime}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Total Distance</span>
                                  <span className="font-semibold">{driver.distance}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-1">Assigned Zones</div>
                              <div className="flex flex-wrap gap-1">
                                {driver.zones.map((zone, idx) => (
                                  <span key={idx} className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2 py-1 rounded-full">
                                    {zone}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-1">Quick Actions</div>
                              <div className="flex gap-2">
                                <button className="flex-1 bg-brand-600 text-white text-xs py-1.5 rounded-lg">Message</button>
                                <button className="flex-1 border border-gray-300 text-gray-700 text-xs py-1.5 rounded-lg">Assign Task</button>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                              <div className="text-xs text-gray-500 mb-1">Last Active</div>
                              <div className="text-sm font-medium">{driver.lastActive}</div>
                              <div className="text-xs text-gray-400 mt-1">Current Shift: {driver.shifts}</div>
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
      )}

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Driver Details</h3>
              <button onClick={() => setSelectedDriver(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {selectedDriver.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{selectedDriver.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedDriver.status)}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{selectedDriver.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Driver since {new Date(selectedDriver.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" /> {selectedDriver.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" /> {selectedDriver.email}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Vehicle Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Truck className="w-4 h-4" /> {selectedDriver.vehicle} • {selectedDriver.type}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" /> Zones: {selectedDriver.zones.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance Metrics</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">Deliveries</div>
                        <div className="font-semibold text-lg">{selectedDriver.deliveries}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">Earnings</div>
                        <div className="font-semibold text-lg">{selectedDriver.earnings}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">Acceptance</div>
                        <div className="font-semibold text-lg">{selectedDriver.acceptance}%</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">On-Time</div>
                        <div className="font-semibold text-lg">{selectedDriver.onTime}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  Send Message
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View Performance
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversManagement;