import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Bell,
  Search,
  Truck,
  MapPin,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  MoreVertical,
  ChevronRight,
  Navigation,
  UserCheck,
  AlertTriangle,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Home,
  Settings,
  LogOut,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Grid3x3,
  Layers,
  FileText,
  MessageSquare,
  ShoppingBag,
  Award,
  Target,
  Zap,
  Sun,
  Moon,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Printer,
  Share2,
  Bookmark,
  Flag,
  Gift,
  CreditCard,
  Wallet,
  ArrowUp,
  ArrowDown,
  UserPlus,
  CalendarDays,
  Clock8,
  Radio,
  Wifi,
  Battery,
  Signal,
  Globe,
  Shield,
  BadgeCheck,
  CircleDot,
  LocateFixed
} from 'lucide-react';

// Mock data generators
const generateChartData = () => [65, 78, 82, 70, 85, 90, 88, 92, 85, 78, 82, 86, 89, 91, 87, 84, 88, 92, 95, 93, 90, 88, 86, 84];
const generateWeeklyData = () => [42, 38, 45, 52, 48, 58, 62];
const generateDriverDistribution = () => [45, 30, 15, 10];

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
  { id: 'ORD-2347', customer: 'Bookstore Kenya', customerPhone: '+254 766 333 444', address: 'Ngong Road, Nairobi', status: 'pending', time: '3:00 PM', scheduledTime: '3:00 PM', driver: null, amount: 'KES 3,200', items: 4, type: 'Books', priority: 'normal', rating: null },
];

const mockActivityFeed = [
  { id: 1, action: 'Order ORD-2341 delivered successfully', user: 'James Mwangi', time: '10:35 AM', type: 'success', icon: CheckCircle },
  { id: 2, action: 'Driver Sarah Wanjiku started delivery ORD-2342', user: 'System', time: '10:28 AM', type: 'info', icon: Truck },
  { id: 3, action: 'New order ORD-2345 assigned to John Kamau', user: 'Admin', time: '9:45 AM', type: 'info', icon: Package },
  { id: 4, action: 'Order ORD-2339 failed - wrong address provided', user: 'Peter Omondi', time: '9:15 AM', type: 'warning', icon: AlertCircle },
  { id: 5, action: 'Customer rated delivery ORD-2341 5 stars', user: 'TechZone Solutions', time: '9:00 AM', type: 'success', icon: Star },
  { id: 6, action: 'Driver John Kamau completed 4 deliveries', user: 'System', time: '8:45 AM', type: 'info', icon: Award },
];

const mockNotifications = [
  { id: 1, title: 'New order assigned', message: 'Order ORD-2347 has been assigned to you', time: '2 min ago', read: false, type: 'order' },
  { id: 2, title: 'Payment received', message: 'KES 12,500 received from TechZone', time: '15 min ago', read: false, type: 'payment' },
  { id: 3, title: 'Driver check-in', message: 'James Mwangi has completed his shift', time: '1 hour ago', read: true, type: 'driver' },
];

export default function Dashboard() {
  // State Management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [dateRange, setDateRange] = useState('today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fullscreenMap, setFullscreenMap] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  // Filter states
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Get status styling
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
      delivered: { icon: CheckCircle, text: 'Delivered', className: 'bg-green-100 text-green-700' },
      'in-transit': { icon: Truck, text: 'In Transit', className: 'bg-blue-100 text-blue-700' },
      pending: { icon: Clock, text: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
      failed: { icon: AlertCircle, text: 'Failed', className: 'bg-red-100 text-red-700' }
    };
    const { icon: Icon, text, className } = config[status] || config.pending;
    return <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}><Icon className="w-3 h-3" />{text}</span>;
  };

  const getPriorityBadge = (priority) => {
    const config = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      normal: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config[priority]}`}>{priority}</span>;
  };

  // Stats data
  const stats = [
    { label: 'Total Deliveries', value: '1,248', change: '+12.5%', trend: 'up', icon: Package, color: 'bg-indigo-500' },
    { label: 'Active Drivers', value: '8', change: '+2', trend: 'up', icon: Users, color: 'bg-green-500' },
    { label: 'Completion Rate', value: '94.2%', change: '+5.1%', trend: 'up', icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Revenue', value: 'KES 284,900', change: '+18.3%', trend: 'up', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Customer Rating', value: '4.8', change: '+0.3', trend: 'up', icon: Star, color: 'bg-yellow-500' },
    { label: 'On-Time Rate', value: '89%', change: '-2%', trend: 'down', icon: Clock, color: 'bg-red-500' },
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#', badge: null },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin, href: '#', badge: '3' },
    { id: 'orders', label: 'Orders', icon: Package, href: '#', badge: '4' },
    { id: 'drivers', label: 'Drivers', icon: Truck, href: '#', badge: null },
    { id: 'customers', label: 'Customers', icon: Users, href: '#', badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '#', badge: null },
    { id: 'reports', label: 'Reports', icon: FileText, href: '#', badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '#', badge: '2' },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '#' },
  ];

  // Filtered deliveries based on search and filters
  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          delivery.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || delivery.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || delivery.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Filtered drivers based on sidebar search
  const filteredDrivers = mockDrivers.filter(driver =>
    driver.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-30 h-full transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r shadow-sm`}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className={`flex items-center ${sidebarOpen ? 'justify-between px-5' : 'justify-center'} py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="bg-indigo-600 rounded-xl p-1.5 shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  DeliverTrack
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`text-gray-400 hover:text-gray-600 transition ${!sidebarOpen && 'hidden'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Search */}
          {sidebarOpen && (
            <div className="p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drivers, orders..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNavItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNavItem(item.id)}
                    className={`w-full flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} px-3 py-2.5 rounded-lg transition group ${isActive ? (darkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </div>
                    {sidebarOpen && item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-200 text-gray-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className={`my-4 mx-3 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

            {/* Secondary Navigation */}
            <div className="px-3 space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile Section in Sidebar */}
          {sidebarOpen && (
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
                  JK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Kamau</p>
                  <p className="text-xs text-gray-500 truncate">Admin · Enterprise</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100">
                  <LogOut className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Topbar */}
        <header className={`sticky top-0 z-20 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm px-6 py-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Page Title */}
              <div>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, John! Here's what's happening with your deliveries today.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className={`absolute right-0 top-12 w-80 rounded-xl shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-50`}>
                    <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button className="text-xs text-indigo-600">Mark all read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notif) => (
                        <div key={notif.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notif.read && 'bg-indigo-50'}`}>
                          <p className="text-sm font-medium">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-sm text-indigo-600">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">John Kamau</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
                  JK
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border p-4 shadow-sm hover:shadow-md transition`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold mt-1">{stat.value}</p>
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
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            {['overview', 'tracking', 'orders', 'drivers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Live Map & Driver Status */}
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Map Section */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold">Live Tracking Map</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Radio className="w-3 h-3 text-green-500 animate-pulse" /> 3 active drivers</span>
                      <button onClick={() => setFullscreenMap(!fullscreenMap)} className="p-1 hover:bg-gray-100 rounded">
                        <Maximize2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-100 h-80 relative flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Interactive Map View</p>
                      <p className="text-xs text-gray-400">3 active drivers shown with live location tracking</p>
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
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold">Driver Status</h3>
                    <button className="text-indigo-600 text-sm">View all</button>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {filteredDrivers.map((driver) => (
                      <div key={driver.id} className="p-3 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedDriver(driver)}>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                              {driver.avatar}
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getStatusColor(driver.status)} border-2 border-white`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{driver.name}</div>
                            <div className="text-xs text-gray-500">{driver.vehicle} • {driver.deliveries} deliveries</div>
                          </div>
                          {driver.status === 'active' && driver.eta && (
                            <div className="text-right">
                              <div className="text-xs font-medium text-green-600">ETA {driver.eta}</div>
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
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2">
                    <h3 className="font-semibold">Recent Deliveries</h3>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>This Week</option>
                      </select>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600"><Download className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600"><Printer className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3 text-left">Order ID</th>
                          <th className="px-4 py-3 text-left">Customer</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Priority</th>
                          <th className="px-4 py-3 text-left">Amount</th>
                          <th className="px-4 py-3 text-left"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {mockDeliveries.slice(0, 5).map((delivery) => (
                          <tr key={delivery.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedDelivery(delivery)}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{delivery.customer}</td>
                            <td className="px-4 py-3">{getStatusBadge(delivery.status)}</td>
                            <td className="px-4 py-3">{getPriorityBadge(delivery.priority)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.amount}</td>
                            <td className="px-4 py-3">
                              <button className="text-indigo-600 text-sm flex items-center gap-1">Track <Eye className="w-3 h-3" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-gray-100 text-center">
                    <button className="text-indigo-600 text-sm font-medium">View All Deliveries <ChevronRight className="inline w-4 h-4" /></button>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Activity Feed</h3>
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
                            <p className="text-sm text-gray-700">{activity.action}</p>
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
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Delivery Performance</h3>
                    <select className="text-sm border border-gray-200 rounded-lg px-2 py-1">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                    </select>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {generateWeeklyData().map((value, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-indigo-100 rounded-t" style={{ height: `${(value / 70) * 120}px` }}>
                          <div className="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600" style={{ height: `${(value / 70) * 120}px`, width: '100%' }}></div>
                        </div>
                        <span className="text-xs text-gray-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Driver Performance</h3>
                    <button className="text-indigo-600 text-sm">View details</button>
                  </div>
                  <div className="space-y-4">
                    {mockDrivers.filter(d => d.status !== 'offline').slice(0, 3).map((driver) => (
                      <div key={driver.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{driver.name}</span>
                          <span className="text-gray-500">{driver.deliveries} deliveries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(driver.deliveries / 5) * 100}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-400">{Math.round((driver.deliveries / 5) * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {driver.rating}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {driver.acceptance}% acceptance</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
                <h3 className="font-semibold">All Orders</h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64"
                    />
                  </div>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2">
                    <option value="all">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                  </select>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Plus className="w-4 h-4" /> New Order
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Address</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Priority</th>
                      <th className="px-4 py-3 text-left">Driver</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDeliveries.map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{delivery.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{delivery.address}</td>
                        <td className="px-4 py-3">{getStatusBadge(delivery.status)}</td>
                        <td className="px-4 py-3">{getPriorityBadge(delivery.priority)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{delivery.driver || 'Unassigned'}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{delivery.amount}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-indigo-600"><Eye className="w-4 h-4" /></button>
                            <button className="p-1 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                            <button className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Driver Details</h3>
              <button onClick={() => setSelectedDriver(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-xl font-semibold text-white shadow-md">
                  {selectedDriver.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{selectedDriver.name}</h4>
                  <p className="text-sm text-gray-500">{selectedDriver.vehicle} • {selectedDriver.type}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{selectedDriver.rating}</span>
                    <span className="text-xs text-gray-400 ml-2">{selectedDriver.acceptance}% acceptance</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Today's Earnings</p>
                  <p className="font-semibold">{selectedDriver.earnings}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Distance Today</p>
                  <p className="font-semibold">{selectedDriver.distance}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" />{selectedDriver.phone}</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{selectedDriver.email}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" />Last active: {selectedDriver.lastActive}</div>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">Send Message</button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium">View Route</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDelivery(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Order Details</h3>
              <button onClick={() => setSelectedDelivery(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-bold text-lg">{selectedDelivery.id}</p>
                </div>
                {getStatusBadge(selectedDelivery.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-medium">{selectedDelivery.customer}</p>
                  <p className="text-sm text-gray-500">{selectedDelivery.customerPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-medium text-lg text-indigo-600">{selectedDelivery.amount}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-500">Delivery Address</p>
                <p className="text-sm">{selectedDelivery.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Driver</p>
                  <p className="font-medium">{selectedDelivery.driver || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Scheduled Time</p>
                  <p className="font-medium">{selectedDelivery.scheduledTime}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">Track Delivery</button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium">Contact Driver</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}