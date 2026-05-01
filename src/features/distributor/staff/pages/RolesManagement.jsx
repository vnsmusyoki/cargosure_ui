import React, { useState } from 'react';
import {
  Plus, Search, MoreVertical, Edit, Trash2, CheckCircle, XCircle,
  Shield, Users, UserCheck, Clock, AlertCircle, Filter, Download,
  ChevronLeft, ChevronRight, RefreshCw, Eye, Copy, Lock, Unlock,
  Key, Globe, Database, Settings, Server, Layers, Zap, Star,
  UserPlus, UserMinus, Briefcase, Crown, Sparkles, Activity,
  Check, X, MessageSquare, Calendar, BarChart3, Home, Grid3x3,
  MapPin,
  Truck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// Mock roles data
const mockRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions and user management capabilities',
    type: 'system',
    status: 'active',
    usersCount: 2,
    createdAt: '2024-01-01',
    lastModified: '2024-03-15',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      routes: ['create', 'read', 'update', 'delete'],
      vehicles: ['create', 'read', 'update', 'delete'],
      reports: ['create', 'read', 'update', 'delete'],
      settings: ['create', 'read', 'update', 'delete'],
    },
    isSystemRole: true,
  },
  {
    id: 2,
    name: 'Fleet Manager',
    description: 'Manages fleet operations, vehicles, drivers, and route planning',
    type: 'custom',
    status: 'active',
    usersCount: 5,
    createdAt: '2024-01-05',
    lastModified: '2024-03-10',
    permissions: {
      users: ['read'],
      roles: ['read'],
      routes: ['create', 'read', 'update', 'delete'],
      vehicles: ['create', 'read', 'update', 'delete'],
      reports: ['create', 'read'],
      settings: [],
    },
    isSystemRole: false,
  },
  {
    id: 3,
    name: 'Route Planner',
    description: 'Creates and optimizes delivery routes, analyzes route performance',
    type: 'custom',
    status: 'active',
    usersCount: 8,
    createdAt: '2024-01-10',
    lastModified: '2024-03-08',
    permissions: {
      users: ['read'],
      roles: ['read'],
      routes: ['create', 'read', 'update'],
      vehicles: ['read'],
      reports: ['read'],
      settings: [],
    },
    isSystemRole: false,
  },
  {
    id: 4,
    name: 'Driver',
    description: 'Access to assigned routes, navigation, and delivery updates',
    type: 'custom',
    status: 'active',
    usersCount: 24,
    createdAt: '2024-01-12',
    lastModified: '2024-03-05',
    permissions: {
      users: [],
      roles: [],
      routes: ['read'],
      vehicles: ['read'],
      reports: [],
      settings: [],
    },
    isSystemRole: false,
  },
  {
    id: 5,
    name: 'Dispatcher',
    description: 'Real-time route monitoring, order assignment, and communication',
    type: 'custom',
    status: 'active',
    usersCount: 6,
    createdAt: '2024-01-08',
    lastModified: '2024-03-12',
    permissions: {
      users: ['read'],
      roles: [],
      routes: ['read', 'update'],
      vehicles: ['read', 'update'],
      reports: [],
      settings: [],
    },
    isSystemRole: false,
  },
  {
    id: 6,
    name: 'Analytics Viewer',
    description: 'View-only access to analytics, reports, and dashboards',
    type: 'custom',
    status: 'inactive',
    usersCount: 3,
    createdAt: '2024-02-01',
    lastModified: '2024-02-28',
    permissions: {
      users: [],
      roles: [],
      routes: ['read'],
      vehicles: ['read'],
      reports: ['read'],
      settings: [],
    },
    isSystemRole: false,
  },
  {
    id: 7,
    name: 'Customer Support',
    description: 'Handles customer inquiries, order tracking, and issue resolution',
    type: 'custom',
    status: 'active',
    usersCount: 12,
    createdAt: '2024-02-15',
    lastModified: '2024-03-14',
    permissions: {
      users: ['read'],
      roles: [],
      routes: ['read'],
      vehicles: ['read'],
      reports: [],
      settings: [],
    },
    isSystemRole: false,
  },
];

// Available permissions structure
const permissionModules = [
  { id: 'users', label: 'User Management', icon: Users, color: 'blue' },
  { id: 'roles', label: 'Role Management', icon: Shield, color: 'purple' },
  { id: 'routes', label: 'Route Management', icon: MapPin, color: 'green' },
  { id: 'vehicles', label: 'Fleet Management', icon: Truck, color: 'orange' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, color: 'red' },
  { id: 'settings', label: 'System Settings', icon: Settings, color: 'gray' },
];

const permissionActions = [
  { id: 'create', label: 'Create', icon: Plus },
  { id: 'read', label: 'View', icon: Eye },
  { id: 'update', label: 'Edit', icon: Edit },
  { id: 'delete', label: 'Delete', icon: Trash2 },
];

const RolesManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: {
      users: [],
      roles: [],
      routes: [],
      vehicles: [],
      reports: [],
      settings: [],
    },
  });

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Filter roles
  const filteredRoles = mockRoles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    totalRoles: mockRoles.length,
    activeRoles: mockRoles.filter(r => r.status === 'active').length,
    totalUsersAssigned: mockRoles.reduce((sum, r) => sum + r.usersCount, 0),
    systemRoles: mockRoles.filter(r => r.isSystemRole).length,
    customRoles: mockRoles.filter(r => !r.isSystemRole).length,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Role data refreshed');
    }, 1000);
  };

  const handleCreateRole = () => {
    setIsCreating(true);
    setRoleForm({
      name: '',
      description: '',
      permissions: {
        users: [],
        roles: [],
        routes: [],
        vehicles: [],
        reports: [],
        settings: [],
      },
    });
    setShowRoleModal(true);
  };

  const handleEditRole = (role) => {
    setIsCreating(false);
    setRoleForm({
      name: role.name,
      description: role.description,
      permissions: { ...role.permissions },
    });
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const handleSaveRole = () => {
    if (!roleForm.name.trim()) {
      toast.error('Role name is required');
      return;
    }
    
    toast.success(isCreating ? 'Role created successfully' : 'Role updated successfully');
    setShowRoleModal(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId) => {
    toast.success('Role deleted successfully');
    setShowDeleteConfirm(null);
  };

  const handleTogglePermission = (module, action) => {
    setRoleForm(prev => {
      const currentPermissions = prev.permissions[module];
      const newPermissions = currentPermissions.includes(action)
        ? currentPermissions.filter(a => a !== action)
        : [...currentPermissions, action];
      
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: newPermissions,
        },
      };
    });
  };

  const getStatusBadge = (status, isSystemRole) => {
    if (isSystemRole) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          <Crown className="w-3 h-3" />
          System
        </span>
      );
    }
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3" />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <XCircle className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  const getModuleIcon = (moduleId) => {
    const module = permissionModules.find(m => m.id === moduleId);
    if (!module) return <Settings className="w-4 h-4" />;
    const IconComponent = module.icon;
    return <IconComponent className={`w-4 h-4 text-${module.color}-500`} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create and manage user roles, assign permissions, and control system access
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
            onClick={handleCreateRole}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRoles}</p>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Active: {stats.activeRoles} roles</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Users Assigned</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsersAssigned}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across all roles</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">System Roles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.systemRoles}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-2">Protected roles</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Custom Roles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.customRoles}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+2 this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Permission Modules</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{permissionModules.length}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Layers className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">24 permission actions</p>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles by name or description..."
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
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Download className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Showing {paginatedRoles.length} of {filteredRoles.length} roles
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Users</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Last Modified</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{role.name}</div>
                        <div className="text-xs text-gray-500">{role.type === 'system' ? 'System Role' : 'Custom Role'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">{role.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{role.usersCount}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(role.status, role.isSystemRole)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(role.lastModified).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                        title="Edit Role"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition"
                        title="Copy Role"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {!role.isSystemRole && (
                        <button
                          onClick={() => setShowDeleteConfirm(role.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          title="Delete Role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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

      {/* Permission Modules Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-600" />
          Permission Modules
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {permissionModules.map((module) => {
            const IconComponent = module.icon;
            const colorMap = {
              blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
              orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
              red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
              gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
            };
            return (
              <div key={module.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                <div className={`w-8 h-8 rounded-lg ${colorMap[module.color]} flex items-center justify-center`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{module.label}</p>
                  <p className="text-xs text-gray-500">4 actions</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-brand-100 dark:border-brand-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Role Management Best Practices</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Follow the principle of least privilege — assign only the permissions necessary for each role to perform their job functions. Regularly audit roles and remove unused permissions.
            </p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="w-3 h-3 text-green-600" />
                Review roles quarterly
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="w-3 h-3 text-green-600" />
                Document permission changes
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="w-3 h-3 text-green-600" />
                Test roles before assigning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRoleModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {isCreating ? 'Create New Role' : 'Edit Role'}
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={roleForm.name}
                    onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                    placeholder="e.g., Fleet Manager, Dispatcher"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={roleForm.description}
                    onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                    rows={3}
                    placeholder="Describe the responsibilities and access level of this role..."
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Permissions
                </label>
                <div className="space-y-4">
                  {permissionModules.map((module) => {
                    const currentPermissions = roleForm.permissions[module.id] || [];
                    const IconComponent = module.icon;
                    const colorMap = {
                      blue: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20',
                      purple: 'border-purple-200 bg-purple-50 dark:bg-purple-900/20',
                      green: 'border-green-200 bg-green-50 dark:bg-green-900/20',
                      orange: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20',
                      red: 'border-red-200 bg-red-50 dark:bg-red-900/20',
                      gray: 'border-gray-200 bg-gray-50 dark:bg-gray-700/30',
                    };
                    return (
                      <div key={module.id} className={`border rounded-lg p-4 ${colorMap[module.color]}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <IconComponent className={`w-4 h-4 text-${module.color}-600`} />
                          <span className="font-medium text-gray-900 dark:text-white">{module.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {permissionActions.map((action) => {
                            const ActionIcon = action.icon;
                            const isActive = currentPermissions.includes(action.id);
                            return (
                              <button
                                key={action.id}
                                type="button"
                                onClick={() => handleTogglePermission(module.id, action.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                  isActive
                                    ? 'bg-brand-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                <ActionIcon className="w-3.5 h-3.5" />
                                {action.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={handleSaveRole}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {isCreating ? 'Create Role' : 'Save Changes'}
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Delete Role</h3>
              <button onClick={() => setShowDeleteConfirm(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Are you sure?</p>
                  <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deleting this role will remove access from all users currently assigned to it.
                You may want to reassign these users to another role first.
              </p>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => handleDeleteRole(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Delete Role
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
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

export default RolesManagement;