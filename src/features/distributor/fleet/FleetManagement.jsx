import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Download, MoreVertical,
  Eye, Edit, Car, Truck, Bike, AlertCircle,
  CheckCircle, Clock, Wrench, Calendar,
  BarChart3, Activity, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, Gauge, Settings, AlertTriangle, Loader2,
  Thermometer, Navigation, Package, Users, TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useFleetVehicles from './hooks/useFleetVehicles';

const STATUS_NORM = {
  Active: 'active',
  Inactive: 'inactive',
  UnderMaintenance: 'maintenance',
  Retired: 'retired',
};

const TYPE_COLOR_POOL = [
  'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-500',
];

const formatDate = (iso) => {
  if (!iso) return null;
  return iso.split('T')[0];
};

const FleetManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showScheduleMaintenance, setShowScheduleMaintenance] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const { data: rawVehicles = [], isLoading, isError, refetch, isRefetching } = useFleetVehicles();

  // Normalize API shape into a consistent UI-friendly shape
  const vehicles = useMemo(() => rawVehicles.map(v => ({
    id: v.id,
    registration: v.plateNumber,
    type: v.vehicleType,
    make: v.make,
    model: v.model,
    year: v.year,
    color: v.colour,
    status: STATUS_NORM[v.status] || 'inactive',
    driver: v.primaryDriverName || null,
    backupDriver: v.backupDriverName || null,
    fuelType: v.fuelType,
    mileage: v.currentMileage || 0,
    capacity: `${v.maxLoadKg}kg`,
    maxLoadKg: Number(v.maxLoadKg) || 0,
    volumeCubicMeters: Number(v.volumeCubicMeters) || 0,
    palletCapacity: v.palletCapacity || 0,
    hasRefrigeration: v.hasRefrigeration,
    minTemperature: v.minTemperature,
    maxTemperature: v.maxTemperature,
    condition: v.vehicleCondition,
    tyreCondition: v.tyreCondition,
    ownerType: v.ownerType,
    trackingProvider: v.trackingProvider,
    gpsDeviceId: v.gpsDeviceId,
    fuelCardNumber: v.fuelCardNumber,
    assignedDepotName: v.assignedDepotName,
    assignedRoute: v.assignedRoute,
    assignedZones: v.assignedZones || [],
    lastService: formatDate(v.lastServiceDate),
    nextService: formatDate(v.nextServiceDueDate),
    lastServiceMileage: v.lastServiceMileage,
    nextServiceMileage: v.nextServiceMileage,
    insurancePolicyNumber: v.insurancePolicyNumber,
    insuranceExpiry: formatDate(v.insuranceExpiryDate),
    fitnessCertNumber: v.fitnessCertificateNumber,
    fitnessCertExpiry: formatDate(v.fitnessCertificateExpiryDate),
    roadTaxNumber: v.roadTaxCertificateNumber,
    roadTaxExpiry: formatDate(v.roadTaxExpiryDate),
    speedGovernorCert: v.speedGovernorCertificate,
    speedGovernorExpiry: formatDate(v.speedGovernorExpiryDate),
    policeClearance: v.policeClearance,
    conditionNotes: v.conditionNotes,
    notes: v.notes,
    createdOn: v.createdOn,
  })), [rawVehicles]);

  // Aggregate analytics
  const stats = useMemo(() => {
    const total = vehicles.length;
    if (total === 0) return {
      total: 0, active: 0, maintenance: 0, inactive: 0, retired: 0,
      totalMileage: 0, serviceDue: 0, expiringInsurance: 0,
      withGps: 0, gpsPercent: 0, refrigerated: 0,
      companyOwned: 0, leased: 0, ownerDriver: 0,
      condExcellent: 0, condGood: 0, condFair: 0, condPoor: 0,
      validInsurance: 0, validFitness: 0, complianceScore: 0,
      totalCapacityTons: '0.0', typeDistribution: {},
    };

    const today = new Date();
    const in7 = (d) => { if (!d) return false; const diff = Math.ceil((new Date(d) - today) / 86400000); return diff >= 0 && diff <= 7; };
    const in30 = (d) => { if (!d) return false; const diff = Math.ceil((new Date(d) - today) / 86400000); return diff >= 0 && diff <= 30; };
    const future = (d) => d && new Date(d) > today;

    const active = vehicles.filter(v => v.status === 'active').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
    const inactive = vehicles.filter(v => v.status === 'inactive').length;
    const retired = vehicles.filter(v => v.status === 'retired').length;
    const totalMileage = vehicles.reduce((s, v) => s + v.mileage, 0);
    const serviceDue = vehicles.filter(v => in7(v.nextService)).length;
    const expiringInsurance = vehicles.filter(v => in30(v.insuranceExpiry)).length;
    const withGps = vehicles.filter(v => v.gpsDeviceId || v.trackingProvider).length;
    const refrigerated = vehicles.filter(v => v.hasRefrigeration).length;
    const companyOwned = vehicles.filter(v => v.ownerType === 'CompanyOwned').length;
    const leased = vehicles.filter(v => v.ownerType === 'Leased').length;
    const ownerDriver = vehicles.filter(v => v.ownerType === 'OwnerDriver').length;
    const condExcellent = vehicles.filter(v => v.condition === 'Excellent').length;
    const condGood = vehicles.filter(v => v.condition === 'Good').length;
    const condFair = vehicles.filter(v => v.condition === 'Fair').length;
    const condPoor = vehicles.filter(v => v.condition === 'Poor').length;
    const validInsurance = vehicles.filter(v => future(v.insuranceExpiry)).length;
    const validFitness = vehicles.filter(v => future(v.fitnessCertExpiry)).length;
    const complianceScore = Math.round(((validInsurance + validFitness) / (total * 2)) * 100);
    const totalCapacityTons = (vehicles.reduce((s, v) => s + v.maxLoadKg, 0) / 1000).toFixed(1);

    const typeDistribution = {};
    vehicles.forEach(v => { typeDistribution[v.type] = (typeDistribution[v.type] || 0) + 1; });

    return {
      total, active, maintenance, inactive, retired, totalMileage,
      serviceDue, expiringInsurance, withGps,
      gpsPercent: Math.round((withGps / total) * 100),
      refrigerated, companyOwned, leased, ownerDriver,
      condExcellent, condGood, condFair, condPoor,
      validInsurance, validFitness, complianceScore, totalCapacityTons,
      typeDistribution,
    };
  }, [vehicles]);

  // Upcoming compliance renewals (all document types, next 60 days)
  const upcomingRenewals = useMemo(() => {
    const today = new Date();
    const result = [];
    vehicles.forEach(v => {
      [
        { label: 'Insurance', expiry: v.insuranceExpiry },
        { label: 'Fitness Cert', expiry: v.fitnessCertExpiry },
        { label: 'Road Tax', expiry: v.roadTaxExpiry },
        { label: 'Speed Governor', expiry: v.speedGovernorExpiry },
      ].forEach(({ label, expiry }) => {
        if (!expiry) return;
        const days = Math.ceil((new Date(expiry) - today) / 86400000);
        if (days <= 60) result.push({ vehicle: v, documentType: label, expiry, daysLeft: days });
      });
    });
    return result.sort((a, b) => a.daysLeft - b.daysLeft);
  }, [vehicles]);

  // Unique vehicle types for filter dropdown
  const uniqueTypes = useMemo(() =>
    [...new Set(vehicles.map(v => v.type))].filter(Boolean).sort()
  , [vehicles]);

  const filteredVehicles = useMemo(() => vehicles.filter(v => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || v.registration.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) ||
      (v.driver && v.driver.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchType = typeFilter === 'all' || v.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  }), [vehicles, searchQuery, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRowExpand = (id) => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const handleRefresh = () => {
    refetch().then(() => toast.success('Fleet data refreshed'));
  };

  const getStatusBadge = (status) => {
    const cfg = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      maintenance: { icon: Wrench, text: 'Maintenance', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
      inactive: { icon: Clock, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      retired: { icon: X, text: 'Retired', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    };
    const { icon: Icon, text, className } = cfg[status] || cfg.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getVehicleIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('motor') || t.includes('bike')) return <Bike className="w-4 h-4" />;
    if (t.includes('truck') || t.includes('van') || t.includes('trailer')) return <Truck className="w-4 h-4" />;
    if (t.includes('bicycle')) return <Bike className="w-4 h-4" />;
    return <Car className="w-4 h-4" />;
  };

  const getDaysUntil = (dateStr) => {
    if (!dateStr) return 'N/A';
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Today';
    return `${diff} days`;
  };

  const getDaysColor = (dateStr) => {
    if (!dateStr) return 'text-gray-400';
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
    if (diff < 0) return 'text-red-600';
    if (diff <= 3) return 'text-orange-600';
    if (diff <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getDocuments = (v) => {
    const docs = [];
    if (v.insurancePolicyNumber) docs.push('Insurance');
    if (v.fitnessCertNumber) docs.push('Fitness Cert');
    if (v.roadTaxNumber) docs.push('Road Tax');
    if (v.speedGovernorCert) docs.push('Speed Governor');
    if (v.gpsDeviceId) docs.push('GPS Device');
    if (v.policeClearance) docs.push('Police Clearance');
    return docs;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-sm">Loading fleet data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Failed to load fleet data</p>
          <button onClick={() => refetch()} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your vehicle fleet, track maintenance, and monitor compliance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefetching ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/fleet-management/add')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Car className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="text-green-600">Active: {stats.active}</span>
            <span className="text-yellow-600">Maint: {stats.maintenance}</span>
            <span className="text-gray-500">Inactive: {stats.inactive}</span>
            {stats.retired > 0 && <span className="text-red-500">Retired: {stats.retired}</span>}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Mileage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMileage.toLocaleString()} km</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Avg: {stats.total > 0 ? Math.round(stats.totalMileage / stats.total).toLocaleString() : 0} km/vehicle
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Service Due</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.serviceDue}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Wrench className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">Vehicles due in next 7 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Insurance Expiring</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.expiringInsurance}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2">Expiring in next 30 days</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'overview', icon: BarChart3, label: 'Fleet Overview' },
          { key: 'vehicles', icon: Car, label: 'Vehicles List', badge: vehicles.length },
          { key: 'maintenance', icon: Wrench, label: 'Maintenance Schedule' },
        ].map(({ key, icon: TabIcon, label, badge }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
              activeTab === key
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            {label}
            {badge !== undefined && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Fleet Overview ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {vehicles.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-12 text-center shadow-sm">
              <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-700 dark:text-gray-300">No vehicles registered yet</p>
              <p className="text-sm text-gray-500 mt-1 mb-4">Add your first vehicle to see fleet analytics here</p>
              <button onClick={() => navigate('/fleet-management/add')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Add First Vehicle
              </button>
            </div>
          ) : (
            <>
              {/* Row 1: Type Distribution | Status + Insights */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Vehicle Distribution by Type</h3>
                  {Object.keys(stats.typeDistribution).length === 0 ? (
                    <p className="text-sm text-gray-400">No data</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(stats.typeDistribution).map(([type, count], idx) => {
                        const pct = Math.round((count / stats.total) * 100);
                        return (
                          <div key={type}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-700 dark:text-gray-300">{type}</span>
                              <span className="text-gray-500 text-xs">{count} ({pct}%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full ${TYPE_COLOR_POOL[idx % TYPE_COLOR_POOL.length]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Status Overview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Status Overview</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { label: 'Active', count: stats.active, bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600' },
                        { label: 'Maint.', count: stats.maintenance, bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600' },
                        { label: 'Inactive', count: stats.inactive, bg: 'bg-gray-50 dark:bg-gray-700/50', text: 'text-gray-600 dark:text-gray-400' },
                        { label: 'Retired', count: stats.retired, bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600' },
                      ].map(({ label, count, bg, text }) => (
                        <div key={label} className={`p-3 ${bg} rounded-lg`}>
                          <div className={`text-xl font-bold ${text}`}>{count}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fleet Insights KPIs */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Fleet Insights</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Navigation, label: 'GPS Tracked', value: `${stats.gpsPercent}%`, sub: `${stats.withGps}/${stats.total} vehicles`, color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' },
                        { icon: Thermometer, label: 'Refrigerated', value: stats.refrigerated, sub: 'cold chain units', color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600' },
                        { icon: Package, label: 'Total Capacity', value: `${stats.totalCapacityTons}t`, sub: 'fleet load capacity', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' },
                        { icon: Shield, label: 'Compliance', value: `${stats.complianceScore}%`, sub: 'insurance + fitness', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' },
                      ].map(({ label, value, sub, color }) => (
                        <div key={label} className={`p-3 rounded-lg ${color.split(' ').slice(0, 2).join(' ')}`}>
                          <div className={`text-xl font-bold ${color.split(' ').slice(2).join(' ')}`}>{value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{label}</div>
                          <div className="text-xs text-gray-400">{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Condition Breakdown | Ownership Structure */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Vehicle Condition</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Excellent', count: stats.condExcellent, color: 'bg-green-500' },
                      { label: 'Good', count: stats.condGood, color: 'bg-blue-500' },
                      { label: 'Fair', count: stats.condFair, color: 'bg-yellow-500' },
                      { label: 'Poor', count: stats.condPoor, color: 'bg-red-500' },
                    ].map(({ label, count, color }) => {
                      const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                      return (
                        <div key={label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 dark:text-gray-300">{label}</span>
                            <span className="text-gray-500 text-xs">{count} ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ownership Structure</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Company Owned', count: stats.companyOwned, color: 'bg-indigo-500' },
                      { label: 'Leased', count: stats.leased, color: 'bg-blue-500' },
                      { label: 'Owner Driver', count: stats.ownerDriver, color: 'bg-teal-500' },
                    ].map(({ label, count, color }) => {
                      const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                      return (
                        <div key={label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 dark:text-gray-300">{label}</span>
                            <span className="text-gray-500 text-xs">{count} ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Top mileage vehicles */}
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Highest Mileage</p>
                    <div className="space-y-2">
                      {[...vehicles].sort((a, b) => b.mileage - a.mileage).slice(0, 3).map(v => (
                        <div key={v.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{v.registration}</span>
                          <span className="text-xs text-gray-500">{v.mileage.toLocaleString()} km</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Upcoming Maintenance */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Maintenance</h3>
                  <span className="text-xs text-gray-500">(next 14 days)</span>
                </div>
                {vehicles.filter(v => {
                  if (!v.nextService) return false;
                  const diff = Math.ceil((new Date(v.nextService) - new Date()) / 86400000);
                  return diff >= 0 && diff <= 14;
                }).length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-400">No maintenance due in the next 14 days</div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {vehicles.filter(v => {
                      if (!v.nextService) return false;
                      const diff = Math.ceil((new Date(v.nextService) - new Date()) / 86400000);
                      return diff >= 0 && diff <= 14;
                    }).map(v => (
                      <div key={v.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            {getVehicleIcon(v.type)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{v.registration}</div>
                            <div className="text-xs text-gray-500">{v.make} {v.model} • {v.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getDaysColor(v.nextService)}`}>{getDaysUntil(v.nextService)}</div>
                          <div className="text-xs text-gray-500">Due: {v.nextService}</div>
                          {v.nextServiceMileage && <div className="text-xs text-gray-400">@ {v.nextServiceMileage.toLocaleString()} km</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 4: Compliance Renewals */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Compliance Renewals</h3>
                  <span className="text-xs text-gray-500">(next 60 days — all document types)</span>
                </div>
                {upcomingRenewals.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    All compliance documents are up to date
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {upcomingRenewals.map((item, idx) => (
                      <div key={idx} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.daysLeft < 0 ? 'bg-red-500' : item.daysLeft <= 7 ? 'bg-orange-500' : item.daysLeft <= 30 ? 'bg-yellow-500' : 'bg-blue-400'}`} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{item.vehicle.registration}</div>
                            <div className="text-xs text-gray-500">{item.documentType} • {item.vehicle.make} {item.vehicle.model}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getDaysColor(item.expiry)}`}>{getDaysUntil(item.expiry)}</div>
                          <div className="text-xs text-gray-500">Expires: {item.expiry}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Tab 2: Vehicles List ── */}
      {activeTab === 'vehicles' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plate, make, driver..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
                <option value="retired">Retired</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles
            </div>
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Car className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No vehicles match your filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      {['Vehicle', 'Registration', 'Driver', 'Status', 'Mileage', 'Next Service', 'Actions'].map(h => (
                        <th key={h} className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {paginatedVehicles.map(v => (
                      <React.Fragment key={v.id}>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                          <td className="px-4 py-3" onClick={() => toggleRowExpand(v.id)}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                {getVehicleIcon(v.type)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{v.make} {v.model}</div>
                                <div className="text-xs text-gray-500">{v.year} • {v.color} • {v.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-sm text-gray-900 dark:text-white" onClick={() => toggleRowExpand(v.id)}>
                            {v.registration}
                          </td>
                          <td className="px-4 py-3" onClick={() => toggleRowExpand(v.id)}>
                            {v.driver ? (
                              <div>
                                <div className="text-sm text-gray-900 dark:text-white">{v.driver}</div>
                                {v.assignedDepotName && <div className="text-xs text-gray-500">{v.assignedDepotName}</div>}
                              </div>
                            ) : <span className="text-sm text-gray-400">Unassigned</span>}
                          </td>
                          <td className="px-4 py-3" onClick={() => toggleRowExpand(v.id)}>
                            {getStatusBadge(v.status)}
                          </td>
                          <td className="px-4 py-3" onClick={() => toggleRowExpand(v.id)}>
                            <div className="text-sm text-gray-900 dark:text-white">{v.mileage.toLocaleString()} km</div>
                            <div className="text-xs text-gray-500">{v.fuelType}</div>
                          </td>
                          <td className="px-4 py-3" onClick={() => toggleRowExpand(v.id)}>
                            {v.nextService ? (
                              <>
                                <div className={`text-sm font-medium ${getDaysColor(v.nextService)}`}>{getDaysUntil(v.nextService)}</div>
                                <div className="text-xs text-gray-500">{v.nextService}</div>
                              </>
                            ) : <span className="text-xs text-gray-400">Not set</span>}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link to={`/fleet/vehicle-details/${v.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 transition" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 transition" title="Edit"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => setShowScheduleMaintenance(v)} className="p-1.5 text-gray-400 hover:text-yellow-600 transition" title="Schedule Maintenance"><Wrench className="w-4 h-4" /></button>
                              <button onClick={() => toggleRowExpand(v.id)} className="p-1.5 text-gray-400 hover:text-gray-600 transition" title="More Info"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>

                        {expandedRows[v.id] && (
                          <tr className="bg-gray-50 dark:bg-gray-700/30">
                            <td colSpan="7" className="px-4 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-2 font-medium">Vehicle Specs</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-500">Load:</span><span>{v.capacity}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Volume:</span><span>{v.volumeCubicMeters} m³</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Fuel:</span><span>{v.fuelType}</span></div>
                                    {v.hasRefrigeration && <div className="flex justify-between"><span className="text-gray-500">Temp:</span><span>{v.minTemperature}°C to {v.maxTemperature}°C</span></div>}
                                    <div className="flex justify-between"><span className="text-gray-500">Tyres:</span><span>{v.tyreCondition}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Condition:</span><span>{v.condition}</span></div>
                                  </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-2 font-medium">Compliance</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-500">Insurance:</span><span className={getDaysColor(v.insuranceExpiry)}>{getDaysUntil(v.insuranceExpiry)}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Fitness Cert:</span><span className={getDaysColor(v.fitnessCertExpiry)}>{getDaysUntil(v.fitnessCertExpiry)}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Road Tax:</span><span className={getDaysColor(v.roadTaxExpiry)}>{getDaysUntil(v.roadTaxExpiry)}</span></div>
                                    {v.gpsDeviceId && <div className="flex justify-between"><span className="text-gray-500">GPS ID:</span><span className="text-xs font-mono">{v.gpsDeviceId}</span></div>}
                                    {v.trackingProvider && <div className="flex justify-between"><span className="text-gray-500">Tracker:</span><span>{v.trackingProvider}</span></div>}
                                  </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-2 font-medium">Documents</div>
                                  <div className="flex flex-wrap gap-1">
                                    {getDocuments(v).map((doc, i) => (
                                      <span key={i} className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">{doc}</span>
                                    ))}
                                    {getDocuments(v).length === 0 && <span className="text-xs text-gray-400">None recorded</span>}
                                  </div>
                                  {v.ownerType && (
                                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                      <div className="text-xs text-gray-500">Owner Type: <span className="text-gray-700 dark:text-gray-300">{v.ownerType}</span></div>
                                    </div>
                                  )}
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-2 font-medium">Quick Actions</div>
                                  <div className="flex flex-col gap-2">
                                    <Link to={`/fleet/vehicle-details/${v.id}`} className="flex-1 bg-indigo-600 text-white text-xs py-1.5 rounded-lg text-center hover:bg-indigo-700 transition">View Details</Link>
                                    <button onClick={() => setShowScheduleMaintenance(v)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">Schedule Service</button>
                                  </div>
                                  {v.notes && <p className="text-xs text-gray-500 mt-2 italic">{v.notes}</p>}
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

              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="text-sm text-gray-500">Page {currentPage} of {totalPages}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) page = i + 1;
                        else if (currentPage <= 3) page = i + 1;
                        else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                        else page = currentPage - 2 + i;
                        return (
                          <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-sm font-medium transition ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Tab 3: Maintenance Schedule ── */}
      {activeTab === 'maintenance' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Maintenance Schedule</h3>
          </div>
          {vehicles.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No vehicles registered</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    {['Vehicle', 'Last Service', 'Current Mileage', 'Next Service', 'Condition', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {vehicles.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {getVehicleIcon(v.type)}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{v.registration}</div>
                            <div className="text-xs text-gray-500">{v.make} {v.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{v.lastService || 'N/A'}</div>
                        {v.lastServiceMileage && <div className="text-xs text-gray-400">@ {v.lastServiceMileage.toLocaleString()} km</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{v.mileage.toLocaleString()} km</td>
                      <td className="px-4 py-3">
                        {v.nextService ? (
                          <>
                            <div className={`text-sm font-medium ${getDaysColor(v.nextService)}`}>{getDaysUntil(v.nextService)}</div>
                            <div className="text-xs text-gray-500">{v.nextService}</div>
                            {v.nextServiceMileage && <div className="text-xs text-gray-400">@ {v.nextServiceMileage.toLocaleString()} km</div>}
                          </>
                        ) : <span className="text-xs text-gray-400">Not scheduled</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          v.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                          v.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                          v.condition === 'Fair' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{v.condition}</span>
                        {v.tyreCondition && <div className="text-xs text-gray-500 mt-1">Tyres: {v.tyreCondition}</div>}
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(v.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => setShowScheduleMaintenance(v)} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition">
                          Schedule Service
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showScheduleMaintenance && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleMaintenance(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Schedule Maintenance</h3>
              <button onClick={() => setShowScheduleMaintenance(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Vehicle: <span className="font-semibold text-gray-900 dark:text-white">{showScheduleMaintenance.registration}</span>
                {' '}— {showScheduleMaintenance.make} {showScheduleMaintenance.model}
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Service Date', type: 'date' },
                  { label: 'Service Type', type: 'select', options: ['Oil Change', 'General Service', 'Tyre Replacement', 'Brake Check', 'Engine Tune-up', 'Inspection'] },
                  { label: 'Mechanic / Service Center', type: 'text', placeholder: 'Service center name' },
                  { label: 'Estimated Cost', type: 'text', placeholder: 'KES 0.00' },
                ].map(({ label, type, options, placeholder }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                    {type === 'select' ? (
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                        {options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={type} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { toast.success('Maintenance scheduled successfully'); setShowScheduleMaintenance(null); }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">Schedule</button>
                <button onClick={() => setShowScheduleMaintenance(null)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;
