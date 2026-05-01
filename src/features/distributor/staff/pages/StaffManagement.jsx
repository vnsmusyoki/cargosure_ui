import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreVertical, 
  Eye, Edit, Trash2, User, Users, Calendar, Clock,
  Phone, Mail, MapPin, Briefcase, Award, Shield,
  ChevronLeft, ChevronRight, RefreshCw, Check, X,
  AlertCircle, CheckCircle, Loader, Upload, Image,
  DollarSign, Star, TrendingUp, TrendingDown, Activity,
  BarChart3, Zap, Target, Truck, Bike, Car, Navigation,
  Clock as ClockIcon, Calendar as CalendarIcon, UserCheck,
  UserPlus, UserMinus, Lock, Unlock, FileText, CreditCard,
  Building, Globe, MessageCircle, Send, Filter as FilterIcon,
  Wrench
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mock staff data
const mockStaff = [
  { 
    id: 1,
    staffId: 'DRV-001',
    name: 'James Mwangi',
    email: 'james.mwangi@fleet.com',
    phone: '+254 712 345 678',
    alternativePhone: '+254 723 456 789',
    role: 'Driver',
    roleType: 'driver',
    department: 'Delivery',
    status: 'active',
    employmentType: 'fulltime',
    joinDate: '2023-01-15',
    shift: 'Morning (6AM - 2PM)',
    assignedVehicle: 'KCA 123A',
    assignedRoutes: ['Westlands Delivery Route', 'Kiambu Road Long Route'],
    licenseNumber: 'DL-2023-001234',
    licenseExpiry: '2025-12-31',
    licenseClass: 'B, C1',
    rating: 4.8,
    totalDeliveries: 1245,
    onTimeRate: 96.5,
    incidents: 2,
    address: '123 Westlands, Nairobi',
    emergencyContact: 'Mary Mwangi',
    emergencyPhone: '+254 734 567 890',
    dateOfBirth: '1985-05-15',
    idNumber: '12345678',
    kraPin: 'A123456789Z',
    nhifNumber: 'NHIF-12345',
    nssfNumber: 'NSSF-67890',
    bankName: 'Equity Bank',
    bankAccount: '0123456789',
    bankBranch: 'Westlands',
    skills: ['Forklift Certified', 'Defensive Driving'],
    languages: ['English', 'Swahili', 'Kikuyu'],
    certificates: ['Defensive Driving Cert', 'First Aid Cert'],
    lastTraining: '2024-01-20',
    nextTraining: '2024-07-20',
    performanceScore: 92,
    attendanceRate: 98.5,
    avatar: null,
    documents: []
  },
  { 
    id: 2,
    staffId: 'DRV-002',
    name: 'Sarah Wanjiku',
    email: 'sarah.wanjiku@fleet.com',
    phone: '+254 723 456 789',
    alternativePhone: '+254 745 678 901',
    role: 'Senior Driver',
    roleType: 'driver',
    department: 'Delivery',
    status: 'active',
    employmentType: 'fulltime',
    joinDate: '2023-03-20',
    shift: 'Morning (6AM - 2PM)',
    assignedVehicle: 'KCD 456B',
    assignedRoutes: ['Industrial Area Cargo Route'],
    licenseNumber: 'DL-2023-004567',
    licenseExpiry: '2026-03-15',
    licenseClass: 'B, C1, D',
    rating: 4.9,
    totalDeliveries: 892,
    onTimeRate: 97.8,
    incidents: 0,
    address: '456 Karen, Nairobi',
    emergencyContact: 'John Wanjiku',
    emergencyPhone: '+254 756 789 012',
    dateOfBirth: '1988-08-22',
    idNumber: '87654321',
    kraPin: 'B987654321Z',
    nhifNumber: 'NHIF-67890',
    nssfNumber: 'NSSF-12345',
    bankName: 'KCB Bank',
    bankAccount: '9876543210',
    bankBranch: 'Karen',
    skills: ['Hazardous Materials', 'Long Distance', 'Night Driving'],
    languages: ['English', 'Swahili'],
    certificates: ['Hazardous Materials Cert', 'Advanced Driving'],
    lastTraining: '2024-02-10',
    nextTraining: '2024-08-10',
    performanceScore: 95,
    attendanceRate: 99.2,
    avatar: null,
    documents: []
  },
  { 
    id: 3,
    staffId: 'DSP-001',
    name: 'John Kamau',
    email: 'john.kamau@fleet.com',
    phone: '+254 734 567 890',
    alternativePhone: '+254 767 890 123',
    role: 'Dispatcher',
    roleType: 'dispatcher',
    department: 'Operations',
    status: 'active',
    employmentType: 'fulltime',
    joinDate: '2023-02-01',
    shift: 'Rotating',
    assignedVehicle: null,
    assignedRoutes: ['Westlands Delivery Route', 'Kiambu Road Long Route', 'Industrial Area Cargo Route'],
    licenseNumber: null,
    licenseExpiry: null,
    licenseClass: null,
    rating: 4.7,
    totalDeliveries: 0,
    onTimeRate: 94.2,
    incidents: 0,
    address: '789 Parklands, Nairobi',
    emergencyContact: 'Jane Kamau',
    emergencyPhone: '+254 778 901 234',
    dateOfBirth: '1990-11-10',
    idNumber: '11223344',
    kraPin: 'C112233445Z',
    nhifNumber: 'NHIF-54321',
    nssfNumber: 'NSSF-98765',
    bankName: 'Cooperative Bank',
    bankAccount: '5544332211',
    bankBranch: 'Parklands',
    skills: ['Route Planning', 'Fleet Management', 'Customer Service'],
    languages: ['English', 'Swahili'],
    certificates: ['Dispatch Certification', 'Customer Service Excellence'],
    lastTraining: '2024-01-05',
    nextTraining: '2024-07-05',
    performanceScore: 88,
    attendanceRate: 97.8,
    avatar: null,
    documents: []
  },
  { 
    id: 4,
    staffId: 'MGR-001',
    name: 'Peter Omondi',
    email: 'peter.omondi@fleet.com',
    phone: '+254 745 678 901',
    alternativePhone: '+254 789 012 345',
    role: 'Fleet Manager',
    roleType: 'manager',
    department: 'Management',
    status: 'inactive',
    employmentType: 'fulltime',
    joinDate: '2022-06-01',
    shift: 'Business Hours (9AM - 5PM)',
    assignedVehicle: null,
    assignedRoutes: [],
    licenseNumber: null,
    licenseExpiry: null,
    licenseClass: null,
    rating: 4.5,
    totalDeliveries: 0,
    onTimeRate: 0,
    incidents: 0,
    address: '321 Kilimani, Nairobi',
    emergencyContact: 'Alice Omondi',
    emergencyPhone: '+254 790 123 456',
    dateOfBirth: '1978-03-25',
    idNumber: '99887766',
    kraPin: 'D998877665Z',
    nhifNumber: 'NHIF-13579',
    nssfNumber: 'NSSF-24680',
    bankName: 'Standard Chartered',
    bankAccount: '7788990011',
    bankBranch: 'Kilimani',
    skills: ['Strategic Planning', 'Budgeting', 'Team Leadership'],
    languages: ['English', 'Swahili', 'Luo'],
    certificates: ['MBA Logistics', 'PMP Certification'],
    lastTraining: '2023-12-10',
    nextTraining: '2024-06-10',
    performanceScore: 85,
    attendanceRate: 95.5,
    avatar: null,
    documents: []
  },
  { 
    id: 5,
    staffId: 'DRV-003',
    name: 'Mary Akinyi',
    email: 'mary.akinyi@fleet.com',
    phone: '+254 756 789 012',
    alternativePhone: '+254 701 234 567',
    role: 'Driver',
    roleType: 'driver',
    department: 'Delivery',
    status: 'on_leave',
    employmentType: 'fulltime',
    joinDate: '2023-07-15',
    shift: 'Night (10PM - 6AM)',
    assignedVehicle: 'KCF 012D',
    assignedRoutes: ['Green Routes - Bicycle Delivery'],
    licenseNumber: 'DL-2023-008901',
    licenseExpiry: '2025-07-14',
    licenseClass: 'A, B',
    rating: 4.6,
    totalDeliveries: 345,
    onTimeRate: 93.2,
    incidents: 1,
    address: '567 Eastlands, Nairobi',
    emergencyContact: 'Tom Akinyi',
    emergencyPhone: '+254 712 345 678',
    dateOfBirth: '1992-09-18',
    idNumber: '44556677',
    kraPin: 'E445566778Z',
    nhifNumber: 'NHIF-97531',
    nssfNumber: 'NSSF-86420',
    bankName: 'Family Bank',
    bankAccount: '2233445566',
    bankBranch: 'Eastlands',
    skills: ['Bicycle Maintenance', 'Eco-driving'],
    languages: ['English', 'Swahili', 'Luo'],
    certificates: ['Bicycle Safety Cert', 'First Aid'],
    lastTraining: '2024-01-25',
    nextTraining: '2024-07-25',
    performanceScore: 86,
    attendanceRate: 94.8,
    avatar: null,
    documents: []
  },
  { 
    id: 6,
    staffId: 'MNT-001',
    name: 'David Maina',
    email: 'david.maina@fleet.com',
    phone: '+254 767 890 123',
    alternativePhone: '+254 723 456 789',
    role: 'Mechanic',
    roleType: 'mechanic',
    department: 'Maintenance',
    status: 'active',
    employmentType: 'contract',
    joinDate: '2023-09-01',
    shift: 'Morning (6AM - 2PM)',
    assignedVehicle: null,
    assignedRoutes: [],
    licenseNumber: 'MC-2023-00123',
    licenseExpiry: '2024-09-01',
    licenseClass: 'Mechanic License',
    rating: 4.9,
    totalDeliveries: 0,
    onTimeRate: 0,
    incidents: 0,
    address: '890 Industrial Area, Nairobi',
    emergencyContact: 'Grace Maina',
    emergencyPhone: '+254 745 678 901',
    dateOfBirth: '1987-07-30',
    idNumber: '55443322',
    kraPin: 'F554433221Z',
    nhifNumber: 'NHIF-24680',
    nssfNumber: 'NSSF-13579',
    bankName: 'ABSA Bank',
    bankAccount: '6677889900',
    bankBranch: 'Industrial Area',
    skills: ['Engine Repair', 'Electrical Systems', 'Diagnostics'],
    languages: ['English', 'Swahili', 'Kikuyu'],
    certificates: ['ASE Certification', 'Engine Specialist'],
    lastTraining: '2024-02-15',
    nextTraining: '2024-08-15',
    performanceScore: 94,
    attendanceRate: 99.5,
    avatar: null,
    documents: []
  }
];

// Mock performance data
const performanceTrends = [
  { month: 'Jan', deliveries: 1245, onTime: 94.5, rating: 4.7 },
  { month: 'Feb', deliveries: 1389, onTime: 95.2, rating: 4.8 },
  { month: 'Mar', deliveries: 1523, onTime: 96.1, rating: 4.8 },
  { month: 'Apr', deliveries: 1487, onTime: 95.8, rating: 4.7 },
  { month: 'May', deliveries: 1654, onTime: 96.5, rating: 4.9 },
  { month: 'Jun', deliveries: 1782, onTime: 97.2, rating: 4.9 }
];

const StaffManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedStaffForSchedule, setSelectedStaffForSchedule] = useState(null);
  const itemsPerPage = 10;

  // Toggle row expansion
  const toggleRow = (staffId) => {
    setExpandedRows(prev => ({
      ...prev,
      [staffId]: !prev[staffId]
    }));
  };

  // Filter staff
  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || staff.roleType === roleFilter;
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    totalStaff: mockStaff.length,
    activeStaff: mockStaff.filter(s => s.status === 'active').length,
    drivers: mockStaff.filter(s => s.roleType === 'driver').length,
    avgRating: (mockStaff.reduce((sum, s) => sum + s.rating, 0) / mockStaff.length).toFixed(1),
    avgOnTime: (mockStaff.filter(s => s.onTimeRate > 0).reduce((sum, s) => sum + s.onTimeRate, 0) / mockStaff.filter(s => s.onTimeRate > 0).length).toFixed(1),
    totalDeliveries: mockStaff.reduce((sum, s) => sum + s.totalDeliveries, 0)
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Staff data refreshed');
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      on_leave: { icon: Clock, text: 'On Leave', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const config = {
      driver: { icon: Truck, text: 'Driver', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      dispatcher: { icon: MessageCircle, text: 'Dispatcher', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      manager: { icon: Briefcase, text: 'Manager', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      mechanic: { icon: Wrench, text: 'Mechanic', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
    };
    const { icon: Icon, text, className } = config[role] || config.driver;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const formatRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage drivers, dispatchers, mechanics and other fleet personnel
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
            onClick={() => navigate('/fleet/staff-management/add')}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStaff}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Active: {stats.activeStaff} staff</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Drivers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.drivers}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">On road fleet</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Performance Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 0.3 from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">On-Time Delivery Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgOnTime}%</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 2.5% from last month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'all' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Users className="w-4 h-4" />
          All Staff
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockStaff.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'drivers' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Truck className="w-4 h-4" />
          Drivers
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockStaff.filter(s => s.roleType === 'driver').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('dispatchers')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'dispatchers' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          Dispatchers
        </button>
        <button
          onClick={() => setActiveTab('mechanics')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'mechanics' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Mechanics
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'performance' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Performance Analytics
        </button>
      </div>

      {/* Staff Table */}
      {activeTab !== 'performance' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Roles</option>
                <option value="driver">Driver</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="manager">Manager</option>
                <option value="mechanic">Mechanic</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedStaff.length} of {filteredStaff.length} staff
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="w-10 px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Info</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedStaff.map((staff) => {
                  return (
                    <React.Fragment key={staff.id}>
                      {/* Main Row */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition group">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleRow(staff.id)}
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                          >
                            <ChevronRight 
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                expandedRows[staff.id] ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>
                        </td>
                        
                        {/* Staff Info */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-sm">
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{staff.name}</p>
                              <p className="text-xs text-gray-500">{staff.staffId}</p>
                            </div>
                          </div>
                        </td>
                        
                        {/* Contact */}
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Phone className="w-3 h-3" />
                              {staff.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail className="w-3 h-3" />
                              {staff.email}
                            </div>
                          </div>
                        </td>
                        
                        {/* Role & Status */}
                        <td className="px-4 py-3">
                          <div className="space-y-2">
                            {getRoleBadge(staff.roleType)}
                            {getStatusBadge(staff.status)}
                          </div>
                        </td>
                        
                        {/* Performance */}
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {formatRating(staff.rating)}
                              <span className="text-xs text-gray-500">({staff.totalDeliveries} deliveries)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium">{staff.onTimeRate}% on-time</span>
                            </div>
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-green-500 h-1 rounded-full"
                                style={{ width: `${staff.onTimeRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        
                        {/* Assignment */}
                        <td className="px-4 py-3">
                          {staff.assignedVehicle ? (
                            <div className="text-sm">
                              <span className="font-mono text-gray-900 dark:text-white">{staff.assignedVehicle}</span>
                              <p className="text-xs text-gray-500 mt-1">{staff.shift}</p>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No vehicle assigned</span>
                          )}
                        </td>
                        
                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedStaff(staff)}
                              className="p-1.5 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="Edit Staff"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStaffForSchedule(staff);
                                setShowScheduleModal(true);
                              }}
                              className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="View Schedule"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details Row */}
                      {expandedRows[staff.id] && (
                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                          <td colSpan="7" className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              {/* Personal Information */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <User className="w-3 h-3" />
                                  Personal Information
                                </h4>
                                <div className="space-y-1.5">
                                  <p className="text-sm">
                                    <span className="text-gray-500">DOB:</span> {staff.dateOfBirth}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">ID Number:</span> {staff.idNumber}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">KRA PIN:</span> {staff.kraPin}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">Address:</span> {staff.address}
                                  </p>
                                </div>
                              </div>
                              
                              {/* License & Certifications */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <Award className="w-3 h-3" />
                                  License & Certifications
                                </h4>
                                <div className="space-y-1.5">
                                  {staff.licenseNumber ? (
                                    <>
                                      <p className="text-sm">
                                        <span className="text-gray-500">License:</span> {staff.licenseNumber}
                                      </p>
                                      <p className="text-sm">
                                        <span className="text-gray-500">Class:</span> {staff.licenseClass}
                                      </p>
                                      <p className="text-sm">
                                        <span className="text-gray-500">Expires:</span> {staff.licenseExpiry}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-sm text-gray-400">No license required for this role</p>
                                  )}
                                  {staff.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {staff.skills.map((skill, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Emergency Contact */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <Shield className="w-3 h-3" />
                                  Emergency Contact
                                </h4>
                                <div className="space-y-1.5">
                                  <p className="text-sm">
                                    <span className="text-gray-500">Name:</span> {staff.emergencyContact}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">Phone:</span> {staff.emergencyPhone}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Banking Information */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                  <CreditCard className="w-3 h-3" />
                                  Banking Information
                                </h4>
                                <div className="space-y-1.5">
                                  <p className="text-sm">
                                    <span className="text-gray-500">Bank:</span> {staff.bankName}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">Account:</span> {staff.bankAccount}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-gray-500">Branch:</span> {staff.bankBranch}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Training Schedule */}
                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Last Training:</span>
                                    <span className="ml-2 font-medium">{staff.lastTraining}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Next Training:</span>
                                    <span className="ml-2 font-medium">{staff.nextTraining}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Attendance Rate:</span>
                                    <span className="ml-2 font-medium text-green-600">{staff.attendanceRate}%</span>
                                  </div>
                                </div>
                                <button className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Schedule Training
                                </button>
                              </div>
                            </div>
                           </td>
                         </tr>
                      )}
                    </React.Fragment>
                  );
                })}
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

      {/* Performance Analytics Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Overall Performance</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.avgRating}/5.0</p>
              <p className="text-sm text-brand-100">Average staff rating</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900 dark:text-white">On-Time Delivery</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgOnTime}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 2.5% improvement</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Total Deliveries</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDeliveries.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Trends</h3>
            <div className="space-y-4">
              {performanceTrends.map((trend, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{trend.month}</span>
                    <div className="flex gap-4">
                      <span className="text-gray-900 dark:text-white font-medium">{trend.deliveries} deliveries</span>
                      <span className="text-green-600">{trend.onTime}% on-time</span>
                      <span className="text-yellow-600">⭐ {trend.rating}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(trend.deliveries / 1800) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Performing Staff
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockStaff.filter(s => s.rating >= 4.7).map((staff) => (
                <div key={staff.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{staff.name}</p>
                        <p className="text-xs text-gray-500">{staff.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold">{staff.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{staff.onTimeRate}% on-time</p>
                      </div>
                      <button className="text-brand-600 hover:text-brand-700 text-sm">View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Training Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Defensive Driving Course</p>
                  <p className="text-xs text-gray-500">Recommended for 2 drivers with recent incidents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Customer Service Excellence</p>
                  <p className="text-xs text-gray-500">For dispatchers to improve communication</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Advanced Diagnostics</p>
                  <p className="text-xs text-gray-500">For mechanics on new vehicle models</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Route Optimization</p>
                  <p className="text-xs text-gray-500">For drivers using new navigation system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Details Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStaff(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-lg">
                  {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedStaff.name}</h3>
                  <p className="text-sm text-gray-500">{selectedStaff.staffId} • {selectedStaff.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStaff(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Staff Details Content - Similar to expanded view but more comprehensive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedStaff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedStaff.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedStaff.address}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Employment Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Joined: {selectedStaff.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Shift: {selectedStaff.shift}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>{selectedStaff.employmentType}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* More details sections... */}
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Edit Staff
              </button>
              <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedStaffForSchedule && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Staff Schedule</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedStaffForSchedule.name}</p>
                <p className="text-xs text-gray-500">{selectedStaffForSchedule.role}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600">Shift:</span>
                  <span className="text-sm font-medium">{selectedStaffForSchedule.shift}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(selectedStaffForSchedule.status)}
                </div>
                {selectedStaffForSchedule.assignedVehicle && (
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600">Assigned Vehicle:</span>
                    <span className="text-sm font-mono">{selectedStaffForSchedule.assignedVehicle}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Next Day Off:</span>
                  <span className="text-sm">Sunday</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Request Schedule Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;