import React, { useState } from 'react';
import {
  Plus, Search, Filter, Download, Printer, MoreVertical,
  Eye, Edit, Trash2, Layers, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, DollarSign, Star,
  BarChart3, Activity, Zap, Shield, X, ChevronLeft, ChevronRight,
  RefreshCw, Tag, ShoppingBag, Truck, Calendar, Users,
  Percent, Copy, ExternalLink, Archive, Globe, Smartphone,
  Coffee, Home, Box, Grid, List, Info, FolderTree, FolderOpen,
  Image, Move, GripVertical, ChevronDown, ChevronRight as ChevronRightIcon,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock categories data with hierarchy
const mockCategories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices, gadgets, and accessories',
    image: null,
    parentId: null,
    level: 0,
    order: 1,
    status: 'active',
    productCount: 156,
    featured: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-15',
    seoTitle: 'Electronics - Shop Latest Gadgets',
    seoDescription: 'Discover the latest electronics including headphones, smartwatches, and computer accessories.',
    children: [
      {
        id: 11,
        name: 'Audio',
        slug: 'audio',
        description: 'Headphones, speakers, and audio equipment',
        image: null,
        parentId: 1,
        level: 1,
        order: 1,
        status: 'active',
        productCount: 45,
        featured: true,
        createdAt: '2024-01-12',
        updatedAt: '2024-03-14',
        children: [
          { id: 111, name: 'Headphones', slug: 'headphones', description: 'Over-ear, on-ear, and earbuds', parentId: 11, level: 2, order: 1, status: 'active', productCount: 28, featured: false },
          { id: 112, name: 'Speakers', slug: 'speakers', description: 'Bluetooth and wired speakers', parentId: 11, level: 2, order: 2, status: 'active', productCount: 17, featured: false }
        ]
      },
      {
        id: 12,
        name: 'Wearables',
        slug: 'wearables',
        description: 'Smartwatches and fitness trackers',
        image: null,
        parentId: 1,
        level: 1,
        order: 2,
        status: 'active',
        productCount: 32,
        featured: true,
        createdAt: '2024-01-11',
        updatedAt: '2024-03-13',
        children: []
      },
      {
        id: 13,
        name: 'Computer Accessories',
        slug: 'computer-accessories',
        description: 'Mice, keyboards, and other peripherals',
        image: null,
        parentId: 1,
        level: 1,
        order: 3,
        status: 'active',
        productCount: 79,
        featured: false,
        createdAt: '2024-01-13',
        updatedAt: '2024-03-12',
        children: [
          { id: 131, name: 'Keyboards', slug: 'keyboards', description: 'Mechanical and membrane keyboards', parentId: 13, level: 2, order: 1, status: 'active', productCount: 34, featured: true },
          { id: 132, name: 'Mice', slug: 'mice', description: 'Wired and wireless mice', parentId: 13, level: 2, order: 2, status: 'active', productCount: 28, featured: false },
          { id: 133, name: 'Monitors', slug: 'monitors', description: 'Display screens', parentId: 13, level: 2, order: 3, status: 'inactive', productCount: 17, featured: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Food & Beverage',
    slug: 'food-beverage',
    description: 'Organic foods, beverages, and snacks',
    image: null,
    parentId: null,
    level: 0,
    order: 2,
    status: 'active',
    productCount: 234,
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    seoTitle: 'Organic Food & Beverages',
    seoDescription: 'Shop organic and healthy food products, teas, and snacks.',
    children: [
      {
        id: 21,
        name: 'Beverages',
        slug: 'beverages',
        description: 'Teas, coffees, and drinks',
        image: null,
        parentId: 2,
        level: 1,
        order: 1,
        status: 'active',
        productCount: 89,
        featured: true,
        createdAt: '2024-01-16',
        updatedAt: '2024-03-09',
        children: [
          { id: 211, name: 'Tea', slug: 'tea', description: 'Green, black, and herbal teas', parentId: 21, level: 2, order: 1, status: 'active', productCount: 45, featured: false },
          { id: 212, name: 'Coffee', slug: 'coffee', description: 'Ground and whole bean coffee', parentId: 21, level: 2, order: 2, status: 'active', productCount: 32, featured: true }
        ]
      },
      {
        id: 22,
        name: 'Snacks',
        slug: 'snacks',
        description: 'Healthy snacks and treats',
        image: null,
        parentId: 2,
        level: 1,
        order: 2,
        status: 'active',
        productCount: 145,
        featured: false,
        createdAt: '2024-01-17',
        updatedAt: '2024-03-08',
        children: []
      }
    ]
  },
  {
    id: 3,
    name: 'Furniture',
    slug: 'furniture',
    description: 'Home and office furniture',
    image: null,
    parentId: null,
    level: 0,
    order: 3,
    status: 'active',
    productCount: 67,
    featured: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-14',
    seoTitle: 'Furniture - Home & Office',
    seoDescription: 'Shop ergonomic chairs, desks, and home furniture.',
    children: [
      {
        id: 31,
        name: 'Office Chairs',
        slug: 'office-chairs',
        description: 'Ergonomic and executive chairs',
        image: null,
        parentId: 3,
        level: 1,
        order: 1,
        status: 'active',
        productCount: 23,
        featured: true,
        createdAt: '2024-01-21',
        updatedAt: '2024-03-13',
        children: []
      },
      {
        id: 32,
        name: 'Desks',
        slug: 'desks',
        description: 'Computer desks and tables',
        image: null,
        parentId: 3,
        level: 1,
        order: 2,
        status: 'active',
        productCount: 18,
        featured: false,
        createdAt: '2024-01-22',
        updatedAt: '2024-03-12',
        children: []
      },
      {
        id: 33,
        name: 'Storage',
        slug: 'storage',
        description: 'Cabinets and shelves',
        image: null,
        parentId: 3,
        level: 1,
        order: 3,
        status: 'inactive',
        productCount: 26,
        featured: false,
        createdAt: '2024-01-23',
        updatedAt: '2024-03-01',
        children: []
      }
    ]
  },
  {
    id: 4,
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Kitchenware, lighting, and home decor',
    image: null,
    parentId: null,
    level: 0,
    order: 4,
    status: 'active',
    productCount: 189,
    featured: false,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-11',
    children: [
      {
        id: 41,
        name: 'Kitchenware',
        slug: 'kitchenware',
        description: 'Utensils, cookware, and storage',
        image: null,
        parentId: 4,
        level: 1,
        order: 1,
        status: 'active',
        productCount: 98,
        featured: true,
        createdAt: '2024-01-26',
        updatedAt: '2024-03-10',
        children: []
      },
      {
        id: 42,
        name: 'Lighting',
        slug: 'lighting',
        description: 'Lamps and light fixtures',
        image: null,
        parentId: 4,
        level: 1,
        order: 2,
        status: 'active',
        productCount: 54,
        featured: false,
        createdAt: '2024-01-27',
        updatedAt: '2024-03-09',
        children: []
      },
      {
        id: 43,
        name: 'Decor',
        slug: 'decor',
        description: 'Home decoration items',
        image: null,
        parentId: 4,
        level: 1,
        order: 3,
        status: 'active',
        productCount: 37,
        featured: false,
        createdAt: '2024-01-28',
        updatedAt: '2024-03-08',
        children: []
      }
    ]
  },
  {
    id: 5,
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Fitness equipment and outdoor gear',
    image: null,
    parentId: null,
    level: 0,
    order: 5,
    status: 'active',
    productCount: 112,
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-07',
    children: [
      {
        id: 51,
        name: 'Fitness',
        slug: 'fitness',
        description: 'Yoga mats, weights, and exercise gear',
        image: null,
        parentId: 5,
        level: 1,
        order: 1,
        status: 'active',
        productCount: 67,
        featured: true,
        createdAt: '2024-02-02',
        updatedAt: '2024-03-06',
        children: []
      }
    ]
  }
];

// Flatten categories for list view
const flattenCategories = (categories, level = 0, parent = null) => {
  let result = [];
  for (const cat of categories) {
    result.push({ ...cat, level, parentName: parent?.name || null });
    if (cat.children && cat.children.length) {
      result = result.concat(flattenCategories(cat.children, level + 1, cat));
    }
  }
  return result;
};

const CategoriesManagement = () => {
  const [viewMode, setViewMode] = useState('tree'); // tree or list
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState(new Set([1, 2, 3])); // expanded category ids
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const itemsPerPage = 15;

  // Filter categories recursively
  const filterCategories = (categories, query, status) => {
    if (!query && status === 'all') return categories;
    
    return categories.filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(query.toLowerCase()) ||
                           (cat.description && cat.description.toLowerCase().includes(query.toLowerCase())) ||
                           cat.slug.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || cat.status === status;
      
      let childrenMatch = false;
      if (cat.children && cat.children.length) {
        cat.children = filterCategories(cat.children, query, status);
        childrenMatch = cat.children.length > 0;
      }
      
      return (matchesSearch || childrenMatch) && matchesStatus;
    }).map(cat => {
      if (cat.children) {
        return { ...cat, children: cat.children };
      }
      return cat;
    });
  };

  const filteredHierarchy = filterCategories([...mockCategories], searchQuery, statusFilter);
  const flattenedList = flattenCategories(filteredHierarchy);
  
  // Sort list view
  const sortedList = [...flattenedList].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination for list view
  const totalPages = Math.ceil(sortedList.length / itemsPerPage);
  const paginatedList = sortedList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics stats
  const allFlattened = flattenCategories(mockCategories);
  const stats = {
    totalCategories: mockCategories.length,
    totalSubcategories: allFlattened.filter(c => c.level > 0).length,
    activeCategories: allFlattened.filter(c => c.status === 'active').length,
    inactiveCategories: allFlattened.filter(c => c.status === 'inactive').length,
    featuredCategories: allFlattened.filter(c => c.featured).length,
    totalProducts: allFlattened.reduce((sum, c) => sum + c.productCount, 0),
    maxDepth: Math.max(...allFlattened.map(c => c.level)),
    emptyCategories: allFlattened.filter(c => c.productCount === 0).length
  };

  const toggleExpand = (id) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
      toast.success('Categories data refreshed');
    }, 1000);
  };

  const handleSelectCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(cid => cid !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === paginatedList.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(paginatedList.map(c => c.id));
    }
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedCategories.length} categories deleted successfully`);
    setSelectedCategories([]);
  };

  const handleBulkStatusUpdate = (status) => {
    toast.success(`${selectedCategories.length} categories marked as ${status}`);
    setSelectedCategories([]);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { icon: CheckCircle, text: 'Active', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      inactive: { icon: X, text: 'Inactive', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
    };
    const { icon: Icon, text, className } = config[status] || config.inactive;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        <Icon className="w-3 h-3" />
        {text}
      </span>
    );
  };

  const getLevelIndent = (level) => {
    return { paddingLeft: `${level * 24 + 12}px` };
  };

  const LevelIcon = ({ level }) => {
    if (level === 0) return <FolderTree className="w-4 h-4 text-indigo-500" />;
    if (level === 1) return <FolderOpen className="w-4 h-4 text-blue-500" />;
    return <Tag className="w-4 h-4 text-gray-500" />;
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return <ArrowUpDown className={`w-3 h-3 ml-1 ${sortDirection === 'asc' ? '' : 'rotate-180'}`} />;
  };

  // Render category tree recursively
  const renderCategoryTree = (categories, level = 0) => {
    return categories.map(category => (
      <React.Fragment key={category.id}>
        <div
          className={`group flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 ${
            selectedCategories.includes(category.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
          }`}
          style={getLevelIndent(level)}
        >
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleSelectCategory(category.id)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {category.children && category.children.length > 0 ? (
              <button
                onClick={() => toggleExpand(category.id)}
                className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                {expandedNodes.has(category.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>
            ) : (
              <div className="w-5" />
            )}
            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <LevelIcon level={level} />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
              <div className="text-xs text-gray-500">{category.slug}</div>
            </div>
            {category.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
              {category.productCount} products
            </div>
            <div className="hidden sm:block">
              {getStatusBadge(category.status)}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => {
                  setEditingCategory(category);
                  setIsFormModalOpen(true);
                }}
                className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setEditingCategory({ parentId: category.id, level: category.level + 1 });
                  setIsFormModalOpen(true);
                }}
                className="p-1.5 text-gray-400 hover:text-green-600 transition"
                title="Add Subcategory"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  toast.success(`Category "${category.name}" duplicated`);
                }}
                className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  toast.success(`Category "${category.name}" archived`);
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 transition"
                title="Archive"
              >
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {category.children && category.children.length > 0 && expandedNodes.has(category.id) && (
          <div className="ml-6 border-l border-gray-200 dark:border-gray-700">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize your products with hierarchical categories, manage SEO, and track performance
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
            onClick={() => {
              setEditingCategory(null);
              setIsFormModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCategories}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
              <FolderTree className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">Subcategories: {stats.totalSubcategories}</span>
            <span className="text-yellow-600">Depth: {stats.maxDepth}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Category Status</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeCategories}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Active: {stats.activeCategories} | Inactive: {stats.inactiveCategories}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">{stats.emptyCategories} empty categories</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Featured</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.featuredCategories}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Categories on homepage</p>
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
                  placeholder="Search categories..."
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
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('tree')}
                  className={`p-1.5 rounded transition ${viewMode === 'tree' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <FolderTree className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing {viewMode === 'tree' ? filteredHierarchy.length : paginatedList.length} categories
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCategories.length > 0 && viewMode === 'list' && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCategories.length} category(s) selected
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

        {/* Tree View */}
        {viewMode === 'tree' && (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredHierarchy.length > 0 ? (
              renderCategoryTree(filteredHierarchy)
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FolderTree className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No categories found</p>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === paginatedList.length && paginatedList.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Category Name <SortIcon field="name" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('slug')}>
                    <div className="flex items-center">Slug <SortIcon field="slug" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('parentName')}>
                    <div className="flex items-center">Parent <SortIcon field="parentName" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('productCount')}>
                    <div className="flex items-center">Products <SortIcon field="productCount" /></div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedList.map((category) => (
                  <tr key={category.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${selectedCategories.includes(category.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleSelectCategory(category.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center`} style={{ marginLeft: `${category.level * 16}px` }}>
                          <LevelIcon level={category.level} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                          {category.description && (
                            <div className="text-xs text-gray-500 line-clamp-1">{category.description}</div>
                          )}
                        </div>
                        {category.featured && (
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {category.parentName || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.productCount}</span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(category.status)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        category.level === 0 ? 'bg-purple-100 text-purple-700' :
                        category.level === 1 ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        Level {category.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setIsFormModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory({ parentId: category.id, level: category.level + 1 });
                            setIsFormModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-green-600 transition"
                          title="Add Subcategory"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toast.success(`Category "${category.name}" duplicated`);
                          }}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination for List View */}
        {viewMode === 'list' && totalPages > 1 && (
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

      {/* Category Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsFormModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {editingCategory?.id ? 'Edit Category' : editingCategory?.parentId ? 'Add Subcategory' : 'Add New Category'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={editingCategory?.name || ''}
                  placeholder="e.g., Electronics"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
                <input
                  type="text"
                  defaultValue={editingCategory?.slug || ''}
                  placeholder="e.g., electronics"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  defaultValue={editingCategory?.description || ''}
                  placeholder="Category description..."
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
                <select
                  defaultValue={editingCategory?.parentId || ''}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">None (Top Level)</option>
                  <option value="1">Electronics</option>
                  <option value="2">Food & Beverage</option>
                  <option value="3">Furniture</option>
                  <option value="4">Home & Living</option>
                  <option value="5">Sports & Outdoors</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingCategory?.status === 'active'} className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingCategory?.featured} className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  toast.success(editingCategory?.id ? 'Category updated' : 'Category created');
                  setIsFormModalOpen(false);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                {editingCategory?.id ? 'Update Category' : 'Create Category'}
              </button>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Category Details</h3>
              <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 flex items-center justify-center">
                  <FolderTree className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{selectedCategory.name}</h4>
                  <p className="text-sm text-gray-500">Slug: {selectedCategory.slug}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedCategory.status)}
                    {selectedCategory.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {selectedCategory.description && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCategory.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Total Products</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedCategory.productCount}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Subcategories</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedCategory.children?.length || 0}</p>
                </div>
              </div>

              {selectedCategory.seoTitle && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO Information</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Title:</span> {selectedCategory.seoTitle}</div>
                    <div><span className="text-gray-500">Description:</span> {selectedCategory.seoDescription}</div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button
                  onClick={() => {
                    setEditingCategory(selectedCategory);
                    setIsFormModalOpen(true);
                    setSelectedCategory(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit Category
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View Products
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  SEO Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ArrowUpDown component for sorting
const ArrowUpDown = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

export default CategoriesManagement;