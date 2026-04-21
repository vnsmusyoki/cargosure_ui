import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  LogOut,
  Loader2,
  AlertCircle,
  RefreshCw,
  Settings,
  BarChart3,
  BellRing,
  Check,
  Clock,
  User,
  Truck,
  Package,
  Users,
  MapPin,
  LayoutDashboard,
  FileText,
  CreditCard,
  Building2,
  Navigation,
  Camera,
  DollarSign,
  HelpCircle,
  Shield,
  Activity,
  Database,
  Wifi,
  Lock,
  Eye,
  TrendingUp,
  Award,
  Calendar,
  PlusCircle,
  ClipboardList,
  MessageSquare
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Theme management
const THEME_STORAGE_KEY = "theme";
const VALID_THEMES = ["light", "dark", "system"];

const getStoredThemePreference = () => {
  if (typeof window === "undefined") return "system";
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return VALID_THEMES.includes(storedTheme) ? storedTheme : "system";
};

// Dynamic icon loader component
const DynamicIcon = ({ iconName, size = 20, className = '' }) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) {
    return <BarChart3 size={size} className={className} />;
  }
  return <IconComponent size={size} className={className} />;
};

// Role-based menu configuration (hardcoded)
const roleMenus = {
  admin: {
    name: 'Administrator',
    modules: [
      {
        category: 'Main',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard', moduleNumber: 1 },
          { id: 'orders', label: 'Order Management', icon: 'Package', path: '/orders', moduleNumber: 2 },
          { id: 'drivers', label: 'Driver & Fleet', icon: 'Truck', path: '/drivers', moduleNumber: 3 },
          { id: 'tracking', label: 'Live Tracking', icon: 'MapPin', path: '/tracking', moduleNumber: 4 },
          { id: 'customers', label: 'Customers', icon: 'Users', path: '/customers', moduleNumber: 5 },
        ]
      },
      {
        category: 'Analytics',
        items: [
          { id: 'analytics', label: 'Analytics & Reports', icon: 'BarChart3', path: '/analytics', moduleNumber: 6 },
          { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications', moduleNumber: 7 },
        ]
      },
      {
        category: 'Finance',
        items: [
          { id: 'billing', label: 'Billing & Invoicing', icon: 'CreditCard', path: '/billing', moduleNumber: 8 },
        ]
      },
      {
        category: 'Enterprise',
        items: [
          { id: 'fleet-advanced', label: 'Advanced Fleet', icon: 'Building2', path: '/fleet-advanced', moduleNumber: 9 },
          { id: 'inventory', label: 'Inventory Integration', icon: 'Database', path: '/inventory', moduleNumber: 10 },
          { id: 'multi-branch', label: 'Multi-Branch', icon: 'Layers', path: '/multi-branch', moduleNumber: 11 },
          { id: 'api', label: 'API Integrations', icon: 'Cloud', path: '/api', moduleNumber: 12 },
        ]
      },
      {
        category: 'System',
        items: [
          { id: 'user-access', label: 'User Access', icon: 'Shield', path: '/user-access', moduleNumber: 13 },
          { id: 'monitoring', label: 'Monitoring', icon: 'Activity', path: '/monitoring', moduleNumber: 14 },
          { id: 'security', label: 'Security', icon: 'Lock', path: '/security', moduleNumber: 15 },
        ]
      }
    ]
  },
  company: {
    name: 'Company Admin',
    modules: [
      {
        category: 'Main',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard', moduleNumber: 1 },
          { id: 'orders', label: 'Order Management', icon: 'Package', path: '/orders', moduleNumber: 2 },
          { id: 'drivers', label: 'Driver Management', icon: 'Truck', path: '/drivers-management', moduleNumber: 3 },
          { id: 'fleet', label: 'Fleet Management', icon: 'Truck', path: '/fleet-management', moduleNumber: 4 },
          { id: 'tracking', label: 'Live Tracking', icon: 'MapPin', path: '/tracking', moduleNumber: 5 },
          { id: 'customers', label: 'Customers', icon: 'Users', path: '/customers', moduleNumber: 6 },
        ]
      },
      {
        category: 'Analytics',
        items: [
          { id: 'analytics', label: 'Analytics & Reports', icon: 'BarChart3', path: '/analytics', moduleNumber: 7 },
          { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications', moduleNumber: 8 },
        ]
      },
      {
        category: 'Finance',
        items: [
          { id: 'billing', label: 'Billing & Invoicing', icon: 'CreditCard', path: '/billing', moduleNumber: 9 },
        ]
      }
    ]
  },
  distributor: {
    name: 'Distributor',
    modules: [
      {
        category: 'Main',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard', moduleNumber: 1 },
          { id: 'orders', label: 'Orders', icon: 'Package', path: '/orders', moduleNumber: 2 },
          { id: 'drivers', label: 'Drivers', icon: 'Truck', path: '/drivers', moduleNumber: 3 },
          { id: 'tracking', label: 'Live Tracking', icon: 'MapPin', path: '/tracking', moduleNumber: 4 },
          { id: 'customers', label: 'Customers', icon: 'Users', path: '/customers', moduleNumber: 5 },
        ]
      },
      {
        category: 'Reports',
        items: [
          { id: 'reports', label: 'Reports', icon: 'FileText', path: '/reports', moduleNumber: 6 },
        ]
      }
    ]
  },
  dispatcher: {
    name: 'Dispatcher',
    modules: [
      {
        category: 'Operations',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard', moduleNumber: 1 },
          { id: 'orders', label: 'Orders', icon: 'Package', path: '/orders', moduleNumber: 2 },
          { id: 'drivers', label: 'Drivers', icon: 'Truck', path: '/drivers', moduleNumber: 3 },
          { id: 'tracking', label: 'Live Tracking', icon: 'MapPin', path: '/tracking', moduleNumber: 4 },
          { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications', moduleNumber: 5 },
        ]
      }
    ]
  },
  driver: {
    name: 'Driver',
    modules: [
      {
        category: 'My Work',
        items: [
          { id: 'driver-dashboard', label: 'My Dashboard', icon: 'LayoutDashboard', path: '/driver-dashboard', moduleNumber: 1 },
          { id: 'my-orders', label: 'My Orders', icon: 'Package', path: '/my-orders', moduleNumber: 2 },
          { id: 'navigation', label: 'Navigate', icon: 'Navigation', path: '/navigate', moduleNumber: 3 },
          { id: 'proof-delivery', label: 'Proof of Delivery', icon: 'Camera', path: '/proof-delivery', moduleNumber: 4 },
        ]
      },
      {
        category: 'Earnings',
        items: [
          { id: 'earnings', label: 'My Earnings', icon: 'DollarSign', path: '/earnings', moduleNumber: 5 },
        ]
      }
    ]
  },
  customer: {
    name: 'Customer',
    modules: [
      {
        category: 'Delivery',
        items: [
          { id: 'track-order', label: 'Track Order', icon: 'MapPin', path: '/track-order', moduleNumber: 1 },
          { id: 'my-deliveries', label: 'My Deliveries', icon: 'Package', path: '/my-deliveries', moduleNumber: 2 },
        ]
      },
      {
        category: 'Support',
        items: [
          { id: 'support', label: 'Support', icon: 'HelpCircle', path: '/support', moduleNumber: 3 },
        ]
      }
    ]
  }
};

// Quick actions based on role
const getQuickActions = (role, navigate) => {
  const actions = {
    admin: [
      { id: 'new-order', label: 'New Order', icon: 'PlusCircle', color: 'blue', path: '/orders/new' },
      { id: 'add-driver', label: 'Add Driver', icon: 'UserPlus', color: 'green', path: '/drivers/new' },
      { id: 'system-settings', label: 'Settings', icon: 'Settings', color: 'gray', path: '/settings' },
    ],
    company: [
      { id: 'new-order', label: 'New Order', icon: 'PlusCircle', color: 'blue', path: '/orders/new' },
      { id: 'add-driver', label: 'Add Driver', icon: 'UserPlus', color: 'green', path: '/drivers/new' },
      { id: 'generate-report', label: 'Report', icon: 'FileText', color: 'purple', path: '/reports' },
    ],
    distributor: [
      { id: 'new-order', label: 'New Order', icon: 'PlusCircle', color: 'blue', path: '/orders/new' },
      { id: 'view-orders', label: 'View Orders', icon: 'Package', color: 'green', path: '/orders' },
    ],
    dispatcher: [
      { id: 'assign-order', label: 'Assign Order', icon: 'ClipboardList', color: 'blue', path: '/orders/assign' },
      { id: 'view-drivers', label: 'View Drivers', icon: 'Truck', color: 'green', path: '/drivers' },
    ],
    driver: [
      { id: 'start-delivery', label: 'Start Delivery', icon: 'Navigation', color: 'blue', path: '/navigation' },
      { id: 'my-tasks', label: 'My Tasks', icon: 'ClipboardList', color: 'green', path: '/my-orders' },
    ],
    customer: [
      { id: 'track-order', label: 'Track Order', icon: 'MapPin', color: 'blue', path: '/track-order' },
      { id: 'contact-support', label: 'Support', icon: 'MessageSquare', color: 'gray', path: '/support' },
    ]
  };
  
  return (actions[role] || []).map(action => ({
    ...action,
    action: () => navigate(action.path)
  }));
};

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock auth - replace with your actual auth store
  const [user, setUser] = useState({
    id: '1',
    name: 'John Kamau',
    email: 'john.kamau@deliver.com',
    role: localStorage.getItem('role') || 'company',
    avatar: 'JK'
  });
  
  const logout = () => {
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };
  
  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuSearch, setMenuSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [theme, setTheme] = useState(getStoredThemePreference);
  
  // Refs
  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Get current role's menu
  const currentMenu = roleMenus[user.role] || roleMenus.customer;
  const modules = currentMenu.modules;
  
  // Filter modules based on search
  const filteredModules = useMemo(() => {
    if (!menuSearch.trim()) return modules;
    return modules
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.label.toLowerCase().includes(menuSearch.toLowerCase())
        )
      }))
      .filter(category => category.items.length > 0);
  }, [modules, menuSearch]);
  
  // Get active module from current path
  const activeModule = useMemo(() => {
    for (const category of modules) {
      const found = category.items.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
      if (found) return found;
    }
    return null;
  }, [location.pathname, modules]);
  
  // Breadcrumb fallback
  const routeFallback = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const section = segments[0] || "dashboard";
    let leaf = segments[segments.length - 1] || "dashboard";
    
    if (["new", "edit", "view", "details"].includes(leaf) && segments.length > 1) {
      leaf = `${segments[segments.length - 2]} ${leaf}`;
    }
    
    if (/^\d+$/.test(leaf) && segments.length > 1) {
      leaf = segments[segments.length - 2];
    }
    
    return {
      category: section.charAt(0).toUpperCase() + section.slice(1),
      title: leaf.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    };
  }, [location.pathname]);
  
  // Quick actions
  const quickActions = getQuickActions(user.role, navigate);
  
  // Theme management
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const applyTheme = (themePreference) => {
      const resolvedTheme = themePreference === "system"
        ? (mediaQuery.matches ? "dark" : "light")
        : themePreference;
      
      root.classList.toggle("dark", resolvedTheme === "dark");
    };
    
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    if (theme === "system") {
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);
  
  // Mock notifications loading
  useEffect(() => {
    // Simulate loading notifications
    setLoadingNotifications(true);
    setTimeout(() => {
      setNotifications([
        { id: 1, title: 'New Order', message: 'Order #ORD-2342 has been created', type: 'order', created_at: new Date().toISOString(), data: { order_id: 'ORD-2342' } },
        { id: 2, title: 'Delivery Completed', message: 'Order #ORD-2341 was delivered successfully', type: 'delivery', created_at: new Date(Date.now() - 3600000).toISOString(), data: { order_id: 'ORD-2341' } },
      ]);
      setLoadingNotifications(false);
    }, 1000);
  }, []);
  
  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.menu-button')) {
          setSidebarOpen(false);
        }
      }
      
      if (showNotifications && notificationsRef.current &&
        !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, showNotifications]);
  
  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      toast.success('Menu refreshed successfully');
      setRefreshing(false);
    }, 1000);
  };
  
  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success('Notification marked as read');
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications([]);
    toast.success('All notifications marked as read');
  };
  
  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  
  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'delivery': return '✅';
      default: return '🔔';
    }
  };
  
  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="space-y-6 px-4">
      {[1, 2, 3].map((idx) => (
        <div key={idx} className="animate-pulse">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
          <div className="space-y-2 pl-2">
            {[1, 2, 3].map((itemIdx) => (
              <div key={itemIdx} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  // Render modules
  const renderModules = () => {
    if (filteredModules.length === 0 && menuSearch) {
      return (
        <div className="text-center py-8 px-4">
          <Search className="mx-auto text-gray-400 mb-3" size={32} />
          <p className="text-sm text-gray-600 dark:text-gray-400">No menu items found for "{menuSearch}"</p>
          <button
            onClick={() => setMenuSearch('')}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Clear search
          </button>
        </div>
      );
    }
    
    if (filteredModules.length === 0) {
      return (
        <div className="text-center py-8 px-4">
          <Settings className="mx-auto text-gray-400 mb-3" size={32} />
          <p className="text-sm text-gray-600 dark:text-gray-400">No menu items available</p>
        </div>
      );
    }
    
    return (
      <nav className="px-4 space-y-6">
        {filteredModules.map((category, idx) => (
          <div key={idx} className={sidebarCollapsed ? 'hidden' : ''}>
            <div className="px-3 mb-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {category.category}
              </div>
            </div>
            <div className="space-y-1">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    activeModule?.id === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                  }`}
                  title={item.label}
                >
                  <div className="flex-shrink-0">
                    <DynamicIcon iconName={item.icon} size={20} />
                  </div>
                  {!sidebarCollapsed && (
                    <span className="font-medium text-sm truncate">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {/* Collapsed view */}
        {sidebarCollapsed && (
          <div className="space-y-2">
            {modules.flatMap(cat => cat.items).slice(0, 10).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                  activeModule?.id === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
                title={item.label}
              >
                <DynamicIcon iconName={item.icon} size={20} />
              </button>
            ))}
          </div>
        )}
      </nav>
    );
  };
  
  // Render notification dropdown
  const renderNotificationDropdown = () => {
    if (!showNotifications) return null;
    
    return (
      <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 max-h-[500px] overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-400 px-3 py-1.5 rounded-md font-medium transition"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {loadingNotifications ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => {
                    if (notification.data?.order_id) {
                      navigate(`/orders/${notification.data.order_id}`);
                    }
                    markAsRead(notification.id);
                    setShowNotifications(false);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatTime(notification.created_at)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium flex items-center"
                        >
                          <Check size={14} className="mr-1" />
                          Mark read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => navigate('/settings/notifications')}
            className="block w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium py-2"
          >
            Notification Settings
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-900 text-gray-700 dark:text-white rounded-lg shadow-lg menu-button"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          flex flex-col h-full
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed ? (
              <>
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">DeliverTrack</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase">
                      {currentMenu.name} PORTAL
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Menu Search */}
        {!sidebarCollapsed && modules.length > 0 && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-gray-900 dark:text-gray-100"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {renderModules()}
        </div>
        
        {/* Quick Actions */}
        {!sidebarCollapsed && modules.length > 0 && quickActions.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={`flex flex-col items-center p-2.5 rounded-xl border border-transparent transition-all duration-200 group ${
                    action.color === 'blue' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' :
                    action.color === 'green' ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400' :
                    action.color === 'purple' ? 'bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400' :
                    'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  <div className="mb-1.5 p-1 rounded-lg transition-transform duration-200 group-hover:scale-110">
                    <DynamicIcon iconName={action.icon} size={18} />
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-center truncate w-full">
                    {action.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                    title="Refresh Menu"
                  >
                    {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Refresh Menu"
                >
                  {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className={`
        min-h-screen transition-all duration-300
        ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
      `}>
        {/* Top Navigation */}
        <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Breadcrumb */}
            <div className="min-w-0">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Home size={16} />
                <span>/</span>
                <span className="truncate">{activeModule?.category || routeFallback.category}</span>
                <span>/</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                  {activeModule?.label || routeFallback.title}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                {activeModule?.label || routeFallback.title}
              </h1>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center justify-end space-x-3">
              {/* Global Search */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Theme Switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"}`}
                  title="Light Mode"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded-md transition-colors ${theme === "dark" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"}`}
                  title="Dark Mode"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-1.5 rounded-md transition-colors ${theme === "system" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"}`}
                  title="System Preference"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {notifications.length > 0 ? <BellRing size={20} /> : <Bell size={20} />}
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </button>
                {renderNotificationDropdown()}
              </div>
              
              {/* Mobile Theme Toggle */}
              <div className="sm:hidden flex items-center gap-1">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Logout Button Desktop */}
              <button
                onClick={logout}
                className="hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors items-center gap-2"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;