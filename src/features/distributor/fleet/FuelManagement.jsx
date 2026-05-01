import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Printer, MoreVertical, 
  Eye, Edit, Trash2, Fuel, TrendingUp, TrendingDown, 
  BarChart3, Activity, Zap, X, ChevronLeft, ChevronRight,
  RefreshCw, AlertTriangle, Check, Calendar, MapPin, DollarSign,
  Gauge, Clock, Truck, Bike, Car, Users, Percent, Award,
  Upload, FileText, Droplet, Flame, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock fuel data
const mockFuelRecords = [
  { id: 1, vehicleId: 1, registration: 'KCA 123A', vehicleType: 'Motorcycle', date: '2024-03-15', liters: 12.5, cost: 2500, mileage: 12450, odometer: 12450, fuelType: 'Petrol', station: 'TotalEnergies - Westlands', attendant: 'John M.', status: 'completed', efficiency: 35.2, costPerLiter: 200 },
  { id: 2, vehicleId: 1, registration: 'KCA 123A', vehicleType: 'Motorcycle', date: '2024-03-08', liters: 11.8, cost: 2360, mileage: 12030, odometer: 12030, fuelType: 'Petrol', station: 'Shell - CBD', attendant: 'Peter K.', status: 'completed', efficiency: 36.1, costPerLiter: 200 },
  { id: 3, vehicleId: 2, registration: 'KCD 456B', vehicleType: 'Van', date: '2024-03-14', liters: 45.0, cost: 9000, mileage: 45890, odometer: 45890, fuelType: 'Petrol', station: 'Rubis - Industrial Area', attendant: 'Mary W.', status: 'completed', efficiency: 12.5, costPerLiter: 200 },
  { id: 4, vehicleId: 2, registration: 'KCD 456B', vehicleType: 'Van', date: '2024-03-07', liters: 42.5, cost: 8500, mileage: 45350, odometer: 45350, fuelType: 'Petrol', station: 'TotalEnergies - Mombasa Road', attendant: 'Sarah K.', status: 'completed', efficiency: 12.8, costPerLiter: 200 },
  { id: 5, vehicleId: 3, registration: 'KCE 789C', vehicleType: 'Tuk Tuk', date: '2024-03-13', liters: 8.0, cost: 1600, mileage: 8750, odometer: 8750, fuelType: 'Petrol', station: 'Shell - Eastlands', attendant: 'Omondi P.', status: 'completed', efficiency: 24.5, costPerLiter: 200 },
  { id: 6, vehicleId: 3, registration: 'KCE 789C', vehicleType: 'Tuk Tuk', date: '2024-03-06', liters: 7.5, cost: 1500, mileage: 8560, odometer: 8560, fuelType: 'Petrol', station: 'TotalEnergies - Thika Road', attendant: 'James M.', status: 'completed', efficiency: 25.3, costPerLiter: 200 },
  { id: 7, vehicleId: 4, registration: 'KCF 012D', vehicleType: 'Bicycle', date: '2024-03-12', liters: 0, cost: 0, mileage: 1250, odometer: 1250, fuelType: 'N/A', station: 'N/A', attendant: 'N/A', status: 'pending', efficiency: 0, costPerLiter: 0 },
  { id: 8, vehicleId: 5, registration: 'KCG 345E', vehicleType: 'Motorcycle', date: '2024-03-14', liters: 13.0, cost: 2600, mileage: 15670, odometer: 15670, fuelType: 'Petrol', station: 'Rubis - Westlands', attendant: 'Kamau J.', status: 'completed', efficiency: 38.2, costPerLiter: 200 },
  { id: 9, vehicleId: 5, registration: 'KCG 345E', vehicleType: 'Motorcycle', date: '2024-03-07', liters: 12.0, cost: 2400, mileage: 15200, odometer: 15200, fuelType: 'Petrol', station: 'Shell - Langata', attendant: 'Wanjiku S.', status: 'completed', efficiency: 39.1, costPerLiter: 200 },
  { id: 10, vehicleId: 1, registration: 'KCA 123A', vehicleType: 'Motorcycle', date: '2024-03-01', liters: 11.5, cost: 2300, mileage: 11650, odometer: 11650, fuelType: 'Petrol', station: 'TotalEnergies - Karen', attendant: 'Otieno R.', status: 'completed', efficiency: 34.8, costPerLiter: 200 },
];

const mockVehiclesForFuel = [
  { id: 1, registration: 'KCA 123A', type: 'Motorcycle', driver: 'James Mwangi' },
  { id: 2, registration: 'KCD 456B', type: 'Van', driver: 'Sarah Wanjiku' },
  { id: 3, registration: 'KCE 789C', type: 'Tuk Tuk', driver: 'Peter Omondi' },
  { id: 4, registration: 'KCF 012D', type: 'Bicycle', driver: 'Mary Akinyi' },
  { id: 5, registration: 'KCG 345E', type: 'Motorcycle', driver: 'John Kamau' },
];

const FuelManagement = () => {
  const [activeTab, setActiveTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const itemsPerPage = 10;

  // Filter fuel records
  const filteredRecords = mockFuelRecords.filter(record => {
    const matchesSearch = record.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.attendant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVehicle = vehicleFilter === 'all' || record.vehicleId.toString() === vehicleFilter;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const recordDate = new Date(record.date);
      const today = new Date();
      if (dateRange === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        matchesDate = recordDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        matchesDate = recordDate >= monthAgo;
      }
    }
    
    return matchesSearch && matchesVehicle && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics calculations
  const analytics = {
    totalFuelLiters: mockFuelRecords.filter(r => r.fuelType !== 'N/A').reduce((sum, r) => sum + r.liters, 0),
    totalFuelCost: mockFuelRecords.filter(r => r.fuelType !== 'N/A').reduce((sum, r) => sum + r.cost, 0),
    averageFuelEfficiency: (mockFuelRecords.filter(r => r.efficiency > 0).reduce((sum, r) => sum + r.efficiency, 0) / 
                           mockFuelRecords.filter(r => r.efficiency > 0).length).toFixed(1),
    totalRefuels: mockFuelRecords.filter(r => r.fuelType !== 'N/A').length,
    highestEfficiency: Math.max(...mockFuelRecords.map(r => r.efficiency).filter(e => e > 0), 0),
    lowestEfficiency: Math.min(...mockFuelRecords.map(r => r.efficiency).filter(e => e > 0), Infinity),
    monthlyTrend: [
      { month: 'Jan', consumption: 120, cost: 24000 },
      { month: 'Feb', consumption: 135, cost: 27000 },
      { month: 'Mar', consumption: 148, cost: 29600 },
    ],
  };

  // Vehicle specific analytics
  const vehicleEfficiencyStats = mockVehiclesForFuel.map(vehicle => {
    const records = mockFuelRecords.filter(r => r.vehicleId === vehicle.id && r.efficiency > 0);
    const avgEfficiency = records.length > 0 
      ? records.reduce((sum, r) => sum + r.efficiency, 0) / records.length 
      : 0;
    const lastRefuel = records[0];
    return {
      ...vehicle,
      avgEfficiency: avgEfficiency.toFixed(1),
      lastRefuelDate: lastRefuel?.date || 'Never',
      totalFuelUsed: records.reduce((sum, r) => sum + r.liters, 0).toFixed(1),
    };
  }).sort((a, b) => parseFloat(b.avgEfficiency) - parseFloat(a.avgEfficiency));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Fuel data refreshed');
    }, 1000);
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"><Check className="w-3 h-3" /> Completed</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"><Clock className="w-3 h-3" /> Pending</span>;
  };

  const getVehicleIcon = (type) => {
    switch(type) {
      case 'Motorcycle': return <Bike className="w-4 h-4" />;
      case 'Van': return <Truck className="w-4 h-4" />;
      case 'Tuk Tuk': return <Car className="w-4 h-4" />;
      case 'Bicycle': return <Bike className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fuel Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track fuel consumption, manage refueling logs, and optimize fleet efficiency
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
            onClick={() => setShowBulkUpload(true)}
            className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button 
            onClick={() => setShowAddRecord(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Refuel Record
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Fuel Consumed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalFuelLiters.toLocaleString()} L</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Last 30 days: 148 L</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Fuel Cost</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(analytics.totalFuelCost)}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Avg. per refuel: {formatCurrency(analytics.totalFuelCost / analytics.totalRefuels)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Fuel Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.averageFuelEfficiency} km/L</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Gauge className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 2.3% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Refuels</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalRefuels}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              <Fuel className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">This month: 9 refuels</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'logs' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Fuel className="w-4 h-4" />
          Fuel Logs
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
            {mockFuelRecords.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'analytics' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics & Insights
        </button>
        <button
          onClick={() => setActiveTab('efficiency')}
          className={`px-4 py-2 text-sm font-medium transition capitalize flex items-center gap-2 ${
            activeTab === 'efficiency' 
              ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Efficiency Rankings
        </button>
      </div>

      {/* Tab 1: Fuel Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by registration or station..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Vehicles</option>
                {mockVehiclesForFuel.map(v => (
                  <option key={v.id} value={v.id}>{v.registration}</option>
                ))}
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Time</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {paginatedRecords.length} of {filteredRecords.length} records
            </div>
          </div>

          {/* Fuel Logs Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Liters</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Efficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Station</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{record.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getVehicleIcon(record.vehicleType)}
                        <span className="font-mono text-sm text-gray-900 dark:text-white">{record.registration}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{record.liters} L</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{formatCurrency(record.cost)}</td>
                    <td className="px-4 py-3">
                      {record.efficiency > 0 ? (
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">{record.efficiency} km/L</span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{record.station}</td>
                    <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedRecord(record)}
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
      )}

      {/* Tab 2: Analytics & Insights */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Trend Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Fuel Consumption Trend</h3>
            <div className="h-64 flex items-end gap-8">
              {analytics.monthlyTrend.map((month, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div 
                      className="w-12 bg-brand-500 rounded-t-lg transition-all hover:bg-brand-600"
                      style={{ height: `${(month.consumption / 200) * 150}px` }}
                    ></div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{month.consumption} L</div>
                  </div>
                  <div className="text-xs text-gray-500">{month.month}</div>
                  <div className="text-xs text-green-600">{formatCurrency(month.cost)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Efficiency Distribution by Vehicle Type</h3>
              <div className="space-y-4">
                {[
                  { type: 'Motorcycle', efficiency: 37.5, color: 'bg-blue-500', count: 2 },
                  { type: 'Tuk Tuk', efficiency: 24.9, color: 'bg-yellow-500', count: 1 },
                  { type: 'Van', efficiency: 12.6, color: 'bg-green-500', count: 1 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.type}</span>
                      <span className="text-gray-500 text-xs">{item.count} vehicles</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.efficiency / 50) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.efficiency} km/L</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Best Efficiency</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Motorcycles have the highest average fuel efficiency at <strong>37.5 km/L</strong>
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Optimization Opportunity</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Vans show 25% lower efficiency than fleet average. Consider driver training or vehicle maintenance.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Cost Saving Potential</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Optimizing routes and driver behavior could reduce fuel costs by up to 15% (~KES 12,000/month)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fuel Cost Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Fuel Cost Breakdown by Vehicle</h3>
            <div className="space-y-3">
              {vehicleEfficiencyStats.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getVehicleIcon(vehicle.type)}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                      <div className="text-xs text-gray-500">{vehicle.driver}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{vehicle.totalFuelUsed} L</div>
                    <div className="text-xs text-gray-500">{vehicle.avgEfficiency} km/L avg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Efficiency Rankings */}
      {activeTab === 'efficiency' && (
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-brand-50 to-transparent dark:from-brand-900/20">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                Fuel Efficiency Leaderboard
              </h3>
              <p className="text-xs text-gray-500 mt-1">Ranked by average fuel efficiency (km/L)</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {vehicleEfficiencyStats.map((vehicle, idx) => (
                <div key={vehicle.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${idx === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                        idx === 1 ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                        idx === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}
                    `}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{vehicle.registration}</div>
                      <div className="text-xs text-gray-500">{vehicle.type} • Driver: {vehicle.driver}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">{vehicle.avgEfficiency} <span className="text-sm font-normal text-gray-500">km/L</span></div>
                    <div className="text-xs text-gray-500">Last refuel: {vehicle.lastRefuelDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Tips */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Gauge className="w-5 h-5" />
                <h4 className="font-semibold">Improve Efficiency</h4>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Maintain proper tire pressure</li>
                <li>Reduce unnecessary idling</li>
                <li>Smooth acceleration and braking</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Calendar className="w-5 h-5" />
                <h4 className="font-semibold">Maintenance Schedule</h4>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Regular oil changes</li>
                <li>Air filter replacements</li>
                <li>Fuel system cleaning</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <MapPin className="w-5 h-5" />
                <h4 className="font-semibold">Route Optimization</h4>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Plan efficient routes</li>
                <li>Avoid peak traffic hours</li>
                <li>Use GPS fleet tracking</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRecord(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Fuel Record Details</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Registration</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.registration}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Date & Time</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.date}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Fuel Type</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.fuelType}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Liters</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.liters} L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Total Cost</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedRecord.cost)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Cost per Liter</span>
                <span className="font-medium text-gray-900 dark:text-white">KES {selectedRecord.costPerLiter}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Odometer Reading</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.odometer.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Fuel Efficiency</span>
                <span className="font-medium text-green-600">{selectedRecord.efficiency} km/L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Station</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.station}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Attendant</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.attendant}</span>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Edit Record
              </button>
              <button onClick={() => setSelectedRecord(null)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddRecord(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Add Refuel Record</h3>
              <button onClick={() => setShowAddRecord(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700">
                  {mockVehiclesForFuel.map(v => (
                    <option key={v.id} value={v.id}>{v.registration} ({v.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Liters</label>
                <input type="number" step="0.1" placeholder="0.0" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost per Liter (KES)</label>
                <input type="number" placeholder="200" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Odometer Reading (km)</label>
                <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Station</label>
                <input type="text" placeholder="Fuel station name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700" />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success('Fuel record added successfully');
                  setShowAddRecord(false);
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Add Record
              </button>
              <button onClick={() => setShowAddRecord(false)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowBulkUpload(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Bulk Upload Fuel Records</h3>
              <button onClick={() => setShowBulkUpload(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Upload CSV or Excel file</p>
                <p className="text-xs text-gray-500">Download template for correct format</p>
                <button className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                  Choose File
                </button>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400">Required columns: date, registration, liters, cost, odometer, station</p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success('File uploaded successfully');
                  setShowBulkUpload(false);
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Upload
              </button>
              <button onClick={() => setShowBulkUpload(false)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelManagement;