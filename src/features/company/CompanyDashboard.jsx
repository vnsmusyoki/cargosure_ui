import React, { useState } from 'react';
import { 
  ArrowUp, ArrowDown, Star, Clock, Truck, MapPin, Package, 
  CheckCircle, AlertCircle, Users, DollarSign, BarChart3, 
  Eye, Download, Printer, ChevronRight, Plus, RefreshCw, X, 
  Phone, Mail, Radio, Maximize2, Award, TrendingUp, Calendar,
  Filter, MoreVertical, Navigation, MessageSquare, ThumbsUp
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data generators
const generateWeeklyData = () => [42, 38, 45, 52, 48, 58, 62];
const generateMonthlyData = () => [65, 78, 82, 70, 85, 90, 88, 92, 85, 78, 82, 86];

const mockDrivers = [
  { id: 1, name: 'James Mwangi', status: 'active', vehicle: 'KCA 123A', plate: 'KCA 123A', type: 'Motorcycle', deliveries: 5, completed: 5, rating: 4.8, location: { lat: -1.2864, lng: 36.8172 }, eta: '8 min', phone: '+254 700 123 456', email: 'james.mwangi@deliver.com', avatar: 'JM', lastActive: '2 min ago', earnings: 'KES 2,450', acceptance: 98, distance: '24 km' },
  { id: 2, name: 'Sarah Wanjiku', status: 'active', vehicle: 'KCD 456B', plate: 'KCD 456B', type: 'Van', deliveries: 3, completed: 3, rating: 4.9, location: { lat: -1.2921, lng: 36.8219 }, eta: '15 min', phone: '+254 711 234 567', email: 'sarah.wanjiku@deliver.com', avatar: 'SW', lastActive: '5 min ago', earnings: 'KES 1,850', acceptance: 96, distance: '18 km' },
  { id: 3, name: 'Peter Omondi', status: 'idle', vehicle: 'KCE 789C', plate: 'KCE 789C', type: 'Tuk Tuk', deliveries: 2, completed: 1, rating: 4.7, location: { lat: -1.2833, lng: 36.8167 }, eta: '2 min', phone: '+254 722 345 678', email: 'peter.omondi@deliver.com', avatar: 'PO', lastActive: '10 min ago', earnings: 'KES 850', acceptance: 92, distance: '12 km' },
  { id: 4, name: 'Mary Akinyi', status: 'offline', vehicle: 'KCF 012D', plate: 'KCF 012D', type: 'Bicycle', deliveries: 0, completed: 0, rating: 4.9, location: null, eta: null, phone: '+254 733 456 789', email: 'mary.akinyi@deliver.com', avatar: 'MA', lastActive: '2 hours ago', earnings: 'KES 0', acceptance: 95, distance: '0 km' },
  { id: 5, name: 'John Kamau', status: 'active', vehicle: 'KCG 345E', plate: 'KCG 345E', type: 'Motorcycle', deliveries: 4, completed: 4, rating: 4.9, location: { lat: -1.2789, lng: 36.8254 }, eta: '12 min', phone: '+254 744 567 890', email: 'john.kamau@deliver.com', avatar: 'JK', lastActive: '1 min ago', earnings: 'KES 2,100', acceptance: 99, distance: '20 km' },
];

const mockDeliveries = [
  { id: 'ORD-2341', customer: 'TechZone Solutions', customerPhone: '+254 700 111 222', address: 'Westlands, Nairobi', status: 'delivered', time: '10:32 AM', scheduledTime: '10:00 AM', driver: 'James Mwangi', amount: 'KES 12,500', items: 3, type: 'Electronics', priority: 'normal', rating: 5 },
  { id: 'ORD-2342', customer: 'Fresh Grocers Ltd', customerPhone: '+254 711 333 444', address: 'Kilimani, Nairobi', status: 'in-transit', time: '11:15 AM', scheduledTime: '11:00 AM', driver: 'Sarah Wanjiku', amount: 'KES 8,200', items: 8, type: 'Groceries', priority: 'high', rating: null },
  { id: 'ORD-2343', customer: 'Home Appliances', customerPhone: '+254 722 555 666', address: 'CBD, Nairobi', status: 'pending', time: '1:00 PM', scheduledTime: '1:00 PM', driver: 'Peter Omondi', amount: 'KES 23,400', items: 2, type: 'Appliances', priority: 'normal', rating: null },
  { id: 'ORD-2344', customer: 'Fashion Hub', customerPhone: '+254 733 777 888', address: 'Karen, Nairobi', status: 'in-transit', time: '10:45 AM', scheduledTime: '10:30 AM', driver: 'James Mwangi', amount: 'KES 5,600', items: 5, type: 'Clothing', priority: 'low', rating: null },
  { id: 'ORD-2345', customer: 'Electronics Plus', customerPhone: '+254 744 999 000', address: 'Parklands, Nairobi', status: 'delivered', time: '9:30 AM', scheduledTime: '9:00 AM', driver: 'John Kamau', amount: 'KES 15,200', items: 1, type: 'Electronics', priority: 'high', rating: 5 },
  { id: 'ORD-2346', customer: 'Pharma Health', customerPhone: '+254 755 111 222', address: 'Upper Hill, Nairobi', status: 'pending', time: '2:30 PM', scheduledTime: '2:00 PM', driver: 'Sarah Wanjiku', amount: 'KES 9,800', items: 12, type: 'Medical', priority: 'urgent', rating: null },
];

const mockActivityFeed = [
  { id: 1, action: 'Order ORD-2341 delivered successfully', user: 'James Mwangi', time: '10:35 AM', type: 'success', icon: CheckCircle },
  { id: 2, action: 'Driver Sarah Wanjiku started delivery ORD-2342', user: 'System', time: '10:28 AM', type: 'info', icon: Truck },
  { id: 3, action: 'New order ORD-2345 assigned to John Kamau', user: 'Admin', time: '9:45 AM', type: 'info', icon: Package },
  { id: 4, action: 'Order ORD-2339 failed - wrong address provided', user: 'Peter Omondi', time: '9:15 AM', type: 'warning', icon: AlertCircle },
  { id: 5, action: 'Customer rated delivery ORD-2341 5 stars', user: 'TechZone Solutions', time: '9:00 AM', type: 'success', icon: Star },
];

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [fullscreenMap, setFullscreenMap] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('today');
  const [chartPeriod, setChartPeriod] = useState('week');

  // Status and priority badge helpers
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      idle: 'bg-yellow-500',
      offline: 'bg-gray-400',
      'in-transit': 'bg-blue-500',
      delivered: 'bg-green-500',
      pending: 'bg-yellow-500',
      failed: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusBadge = (status) => {
    const config = {
      delivered: { icon: CheckCircle, text: 'Delivered', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      'in-transit': { icon: Truck, text: 'In Transit', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      pending: { icon: Clock, text: 'Pending', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      failed: { icon: AlertCircle, text: 'Failed', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
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

  // Stats data
  const stats = [
    { label: 'Total Deliveries', value: '1,248', change: '+12.5%', trend: 'up', icon: Package, color: 'bg-brand-500' },
    { label: 'Active Drivers', value: '8', change: '+2', trend: 'up', icon: Users, color: 'bg-green-500' },
    { label: 'Completion Rate', value: '94.2%', change: '+5.1%', trend: 'up', icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Revenue', value: 'KES 284.9K', change: '+18.3%', trend: 'up', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Customer Rating', value: '4.8', change: '+0.3', trend: 'up', icon: Star, color: 'bg-yellow-500' },
    { label: 'On-Time Rate', value: '89%', change: '-2%', trend: 'down', icon: Clock, color: 'bg-red-500' },
  ];

  // Filtered deliveries
  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          delivery.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || delivery.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || delivery.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Active drivers count
  const activeDrivers = mockDrivers.filter(d => d.status === 'active').length;

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Dashboard refreshed');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your deliveries today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-xs mt-2 flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-2 rounded-xl`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        {['overview', 'tracking', 'orders', 'drivers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition capitalize ${
              activeTab === tab 
                ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Live Map & Driver Status */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Tracking Map</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-green-500 animate-pulse" />
                    {activeDrivers} active drivers
                  </span>
                  <button onClick={() => setFullscreenMap(!fullscreenMap)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Maximize2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 h-80 relative flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Interactive Map View</p>
                  <p className="text-xs text-gray-400">{activeDrivers} active drivers shown with live location tracking</p>
                </div>
                {/* Simulated driver markers */}
                <div className="absolute top-1/4 left-1/3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                  </div>
                </div>
                <div className="absolute top-2/3 left-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-2/3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Driver Status List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Driver Status</h3>
                <button className="text-brand-600 dark:text-brand-400 text-sm hover:underline">View all</button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
                {mockDrivers.map((driver) => (
                  <div key={driver.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition" onClick={() => setSelectedDriver(driver)}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                          {driver.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getStatusColor(driver.status)} border-2 border-white dark:border-gray-800`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 dark:text-white">{driver.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{driver.vehicle} • {driver.deliveries} deliveries</div>
                      </div>
                      {driver.status === 'active' && driver.eta && (
                        <div className="text-right">
                          <div className="text-xs font-medium text-green-600 dark:text-green-400">ETA {driver.eta}</div>
                          <div className="text-xs text-gray-400">{driver.distance}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Deliveries & Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Deliveries Table */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Recent Deliveries</h3>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>This Week</option>
                  </select>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Download className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Printer className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Priority</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {mockDeliveries.slice(0, 5).map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition" onClick={() => setSelectedDelivery(delivery)}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{delivery.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{delivery.customer}</td>
                        <td className="px-4 py-3">{getStatusBadge(delivery.status)}</td>
                        <td className="px-4 py-3">{getPriorityBadge(delivery.priority)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{delivery.amount}</td>
                        <td className="px-4 py-3">
                          <button className="text-brand-600 dark:text-brand-400 text-sm flex items-center gap-1 hover:underline">
                            <Eye className="w-3 h-3" /> Track
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
                <button className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline inline-flex items-center gap-1">
                  View All Deliveries <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Activity Feed</h3>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {mockActivityFeed.map((activity) => {
                  const Icon = activity.icon;
                  const typeColors = {
                    success: 'bg-green-500',
                    warning: 'bg-yellow-500',
                    info: 'bg-blue-500'
                  };
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full ${typeColors[activity.type]} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{activity.user}</span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivery Performance Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Delivery Performance</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setChartPeriod('week')}
                    className={`text-xs px-2 py-1 rounded ${chartPeriod === 'week' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'text-gray-500'}`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setChartPeriod('month')}
                    className={`text-xs px-2 py-1 rounded ${chartPeriod === 'month' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'text-gray-500'}`}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-2">
                {(chartPeriod === 'week' ? generateWeeklyData() : generateMonthlyData().slice(0, 7)).map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-brand-500 rounded-t transition-all hover:bg-brand-600 cursor-pointer"
                        style={{ height: `${(value / 70) * 120}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {value} deliveries
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {chartPeriod === 'week' 
                        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]
                        : `W${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Top Performers</h3>
                <button className="text-brand-600 dark:text-brand-400 text-sm hover:underline">View details</button>
              </div>
              <div className="space-y-4">
                {mockDrivers.filter(d => d.status !== 'offline').slice(0, 3).map((driver) => (
                  <div key={driver.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{driver.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{driver.deliveries} deliveries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${(driver.deliveries / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400">{Math.round((driver.deliveries / 5) * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {driver.rating}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {driver.acceptance}% acceptance</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center flex-wrap gap-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">All Orders</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
              <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Driver</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => setSelectedDelivery(delivery)}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{delivery.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{delivery.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{delivery.address}</td>
                    <td className="px-4 py-3">{getStatusBadge(delivery.status)}</td>
                    <td className="px-4 py-3">{getPriorityBadge(delivery.priority)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{delivery.driver || 'Unassigned'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{delivery.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDrivers.map((driver) => (
            <div key={driver.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {driver.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ${getStatusColor(driver.status)} border-2 border-white dark:border-gray-800`}></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{driver.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{driver.vehicle} • {driver.type}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{driver.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today's Earnings</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{driver.earnings}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Distance Today</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{driver.distance}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedDriver(driver)}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
                  >
                    View Details
                  </button>
                  <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Fleet Tracking</h3>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 h-96 relative flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Interactive fleet tracking map</p>
              <p className="text-sm text-gray-400 mt-1">{activeDrivers} drivers currently active</p>
            </div>
            {/* Simulated driver markers */}
            {mockDrivers.filter(d => d.status === 'active').map((driver, idx) => (
              <div key={driver.id} className="absolute" style={{
                top: `${20 + idx * 25}%`,
                left: `${15 + idx * 30}%`
              }}>
                <div className="relative group cursor-pointer">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                    {driver.name} - ETA {driver.eta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Driver Details</h3>
              <button onClick={() => setSelectedDriver(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-xl font-semibold text-white shadow-md">
                  {selectedDriver.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{selectedDriver.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedDriver.vehicle} • {selectedDriver.type}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{selectedDriver.rating}</span>
                    <span className="text-xs text-gray-400 ml-2">{selectedDriver.acceptance}% acceptance</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Today's Earnings</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedDriver.earnings}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Distance Today</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedDriver.distance}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Phone className="w-4 h-4" />{selectedDriver.phone}</div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Mail className="w-4 h-4" />{selectedDriver.email}</div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Clock className="w-4 h-4" />Last active: {selectedDriver.lastActive}</div>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">Send Message</button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">View Route</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDelivery(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Order Details</h3>
              <button onClick={() => setSelectedDelivery(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{selectedDelivery.id}</p>
                </div>
                {getStatusBadge(selectedDelivery.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedDelivery.customer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedDelivery.customerPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="font-medium text-lg text-brand-600 dark:text-brand-400">{selectedDelivery.amount}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">Delivery Address</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedDelivery.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Driver</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedDelivery.driver || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Scheduled Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedDelivery.scheduledTime}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">Track Delivery</button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Contact Driver</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}