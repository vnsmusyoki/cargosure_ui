import React, { useState } from 'react';
import {
  Plus, Search, Filter, Download, Printer, MoreVertical,
  Eye, Edit, Trash2, Package, Layers, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, DollarSign, Star,
  BarChart3, Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, Tag, ShoppingBag, Truck, Calendar, Users,
  Percent, Copy, ExternalLink, Archive, Globe, Smartphone,
  Coffee, Home, Box, Grid, List, Info, ShoppingCart,
  ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    sku: 'ELEC-001',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 2999,
    comparePrice: 3999,
    costPrice: 1800,
    stock: 45,
    status: 'active',
    featured: true,
    rating: 4.5,
    reviews: 128,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    salesCount: 342,
    revenue: 1025658,
    image: null,
    tags: ['wireless', 'bluetooth', 'headphones', 'premium'],
    brand: 'SoundMax',
    weight: '250g',
    dimensions: '18 x 15 x 8 cm',
    supplier: 'TechImport Ltd',
    variants: ['Black', 'White', 'Blue']
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    sku: 'ELEC-002',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 5499,
    comparePrice: 6999,
    costPrice: 3200,
    stock: 28,
    status: 'active',
    featured: true,
    rating: 4.7,
    reviews: 89,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-12',
    salesCount: 187,
    revenue: 1028313,
    image: null,
    tags: ['smartwatch', 'fitness', 'health', 'tracker'],
    brand: 'FitTech',
    weight: '45g',
    dimensions: '4 x 3.5 x 1 cm',
    supplier: 'WearableTech Co',
    variants: ['Black', 'Silver', 'Rose Gold']
  },
  {
    id: 3,
    name: 'Organic Green Tea (50 bags)',
    sku: 'FOOD-001',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 450,
    comparePrice: 599,
    costPrice: 280,
    stock: 320,
    status: 'active',
    featured: false,
    rating: 4.8,
    reviews: 245,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-08',
    salesCount: 1256,
    revenue: 565200,
    image: null,
    tags: ['organic', 'tea', 'beverage', 'healthy'],
    brand: 'PureLeaf',
    weight: '150g',
    dimensions: '12 x 8 x 5 cm',
    supplier: 'OrganicFoods Kenya',
    variants: ['Original', 'Lemon', 'Mint']
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    sku: 'FURN-001',
    category: 'Furniture',
    subcategory: 'Office Chairs',
    price: 18999,
    comparePrice: 24999,
    costPrice: 12500,
    stock: 12,
    status: 'active',
    featured: true,
    rating: 4.9,
    reviews: 67,
    createdAt: '2024-01-05',
    updatedAt: '2024-03-14',
    salesCount: 89,
    revenue: 1690911,
    image: null,
    tags: ['ergonomic', 'office', 'chair', 'comfortable'],
    brand: 'ComfortSeat',
    weight: '15kg',
    dimensions: '68 x 68 x 120 cm',
    supplier: 'OfficeFurniture Ltd',
    variants: ['Black', 'Grey', 'Blue']
  },
  {
    id: 5,
    name: 'Stainless Steel Water Bottle',
    sku: 'HOME-001',
    category: 'Home & Living',
    subcategory: 'Kitchenware',
    price: 899,
    comparePrice: 1299,
    costPrice: 450,
    stock: 0,
    status: 'inactive',
    featured: false,
    rating: 4.3,
    reviews: 312,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-01',
    salesCount: 2341,
    revenue: 2104559,
    image: null,
    tags: ['bottle', 'water', 'stainless', 'eco-friendly'],
    brand: 'EcoLife',
    weight: '300g',
    dimensions: '25 x 7 x 7 cm',
    supplier: 'EcoProducts KE',
    variants: ['500ml', '750ml', '1L']
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    sku: 'ELEC-003',
    category: 'Electronics',
    subcategory: 'Computer Accessories',
    price: 1299,
    comparePrice: 1799,
    costPrice: 750,
    stock: 156,
    status: 'active',
    featured: false,
    rating: 4.4,
    reviews: 456,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-13',
    salesCount: 1876,
    revenue: 2436924,
    image: null,
    tags: ['wireless', 'mouse', 'computer', 'accessory'],
    brand: 'ClickPro',
    weight: '80g',
    dimensions: '11 x 6 x 4 cm',
    supplier: 'TechImport Ltd',
    variants: ['Black', 'White', 'Red']
  },
  {
    id: 7,
    name: 'Yoga Mat',
    sku: 'SPRT-001',
    category: 'Sports & Outdoors',
    subcategory: 'Fitness',
    price: 1599,
    comparePrice: 2299,
    costPrice: 980,
    stock: 78,
    status: 'active',
    featured: true,
    rating: 4.6,
    reviews: 189,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-11',
    salesCount: 543,
    revenue: 868257,
    image: null,
    tags: ['yoga', 'fitness', 'exercise', 'mat'],
    brand: 'FlexFit',
    weight: '1.2kg',
    dimensions: '183 x 61 x 1 cm',
    supplier: 'SportsGear Ltd',
    variants: ['Purple', 'Blue', 'Green']
  },
  {
    id: 8,
    name: 'LED Desk Lamp',
    sku: 'HOME-002',
    category: 'Home & Living',
    subcategory: 'Lighting',
    price: 2499,
    comparePrice: 3499,
    costPrice: 1500,
    stock: 34,
    status: 'active',
    featured: false,
    rating: 4.2,
    reviews: 98,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-09',
    salesCount: 234,
    revenue: 584766,
    image: null,
    tags: ['lamp', 'led', 'desk', 'lighting'],
    brand: 'BrightHome',
    weight: '800g',
    dimensions: '40 x 15 x 10 cm',
    supplier: 'HomeEssentials Ltd',
    variants: ['Black', 'White', 'Silver']
  }
];

const ProductsManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const itemsPerPage = 12;

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const stats = {
    totalProducts: mockProducts.length,
    activeProducts: mockProducts.filter(p => p.status === 'active').length,
    inactiveProducts: mockProducts.filter(p => p.status === 'inactive').length,
    featuredProducts: mockProducts.filter(p => p.featured).length,
    totalStock: mockProducts.reduce((sum, p) => sum + p.stock, 0),
    totalValue: mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0),
    totalRevenue: mockProducts.reduce((sum, p) => sum + p.revenue, 0),
    avgRating: (mockProducts.reduce((sum, p) => sum + p.rating, 0) / mockProducts.length).toFixed(1),
    lowStockItems: mockProducts.filter(p => p.stock > 0 && p.stock < 20).length
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Products data refreshed');
    }, 1000);
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedProducts.length} products deleted successfully`);
    setSelectedProducts([]);
  };

  const handleBulkStatusUpdate = (status) => {
    toast.success(`${selectedProducts.length} products marked as ${status}`);
    setSelectedProducts([]);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      draft: { icon: Clock, text: 'Draft', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const formatPrice = (price) => {
    return `KES ${price.toLocaleString()}`;
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return <ArrowUpDown className={`w-3 h-3 ml-1 ${sortDirection === 'asc' ? '' : 'rotate-180'}`} />;
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your product catalog, track inventory, and monitor performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="/products/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </a>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Active: {stats.activeProducts}</span>
            <span className="text-gray-500">Inactive: {stats.inactiveProducts}</span>
            <span className="text-yellow-600">Featured: {stats.featuredProducts}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(stats.totalValue)}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total Stock: {stats.totalStock} units</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Lifetime sales revenue</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating} ★</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">{stats.lowStockItems} products low on stock</p>
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
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
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
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedProducts.length} product(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusUpdate('active')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('inactive')}
                  className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition"
                >
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Display - Grid View */}
        {viewMode === 'grid' && (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${selectedProducts.includes(product.id) ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  {/* Checkbox for selection */}
                  <div className="p-3 pb-0">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Product Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 m-3 rounded-lg flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                      {product.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {product.category}
                      </span>
                      {getStatusBadge(product.status)}
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span>{product.rating}</span>
                        <span className="text-gray-400">({product.reviews})</span>
                      </div>
                      <div className={`flex items-center gap-1 ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                        <Box className="w-3 h-3" />
                        <span>{product.stock} in stock</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`/products/${product.id}`}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-xs font-medium transition text-center"
                      >
                        View Details
                      </a>
                      <a
                        href={`/products/${product.id}/edit`}
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition text-center"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Display - List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Product <SortIcon field="name" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('sku')}>
                    <div className="flex items-center">SKU <SortIcon field="sku" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                    <div className="flex items-center">Price <SortIcon field="price" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('stock')}>
                    <div className="flex items-center">Stock <SortIcon field="stock" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${selectedProducts.includes(product.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {product.category}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{product.subcategory}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{formatPrice(product.price)}</div>
                      {product.comparePrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`text-sm font-medium ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock} units
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/products/${product.id}`}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <a
                          href={`/products/${product.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            toast.success(`Product "${product.name}" duplicated`);
                          }}
                          className="p-1.5 text-gray-400 hover:text-green-600 transition"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toast.success(`Product "${product.name}" archived`);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
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
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Product Details</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Package className="w-10 h-10 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedProduct.status)}
                    {selectedProduct.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{formatPrice(selectedProduct.price)}</div>
                  {selectedProduct.comparePrice > selectedProduct.price && (
                    <div className="text-xs text-gray-400 line-through">{formatPrice(selectedProduct.comparePrice)}</div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Category:</span><span>{selectedProduct.category} / {selectedProduct.subcategory}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Brand:</span><span>{selectedProduct.brand}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Weight:</span><span>{selectedProduct.weight}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Dimensions:</span><span>{selectedProduct.dimensions}</span></div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedProduct.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Inventory & Pricing</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Stock:</span><span className={selectedProduct.stock < 20 ? 'text-red-600 font-medium' : ''}>{selectedProduct.stock} units</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Cost Price:</span><span>{formatPrice(selectedProduct.costPrice)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Margin:</span><span className="text-green-600">{((selectedProduct.price - selectedProduct.costPrice) / selectedProduct.price * 100).toFixed(0)}%</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Supplier:</span><span>{selectedProduct.supplier}</span></div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Total Sales:</span><span>{selectedProduct.salesCount} units</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Revenue:</span><span>{formatPrice(selectedProduct.revenue)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Avg. Rating:</span><span>{selectedProduct.rating} ★ ({selectedProduct.reviews} reviews)</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <a
                  href={`/products/${selectedProduct.id}/edit`}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition text-center"
                >
                  Edit Product
                </a>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View Sales History
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Manage Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;