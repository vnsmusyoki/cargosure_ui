import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ShoppingCart, Search, Plus, Minus, X, Trash2, CreditCard,
  Smartphone, Wallet, User, Users, Ticket, Percent,
  Printer, Receipt, DollarSign, ArrowLeft, ArrowRight,
  CheckCircle, AlertCircle, Package, Tag, Coffee,
  Box, Layers, Grid, List, Filter, Scan,
  QrCode, Calculator, Save, Send, Phone, Mail,
  MapPin, Clock, Calendar, UserPlus, Gift, Star,
  Settings, HelpCircle, FileText, Download, Share2,
  TrendingUp, TrendingDown, Zap, Shield, Award,
  ChevronLeft, ChevronRight, RefreshCw, Moon, Sun,
  CircleDot, Clock as ClockIcon, Heart, BadgeCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock Products Data
const mockProducts = [
  { id: 1, name: 'Fresh Milk 1L', sku: 'GRO-001', price: 120, cost: 95, category: 'Dairy', stock: 45, image: null, barcode: '123456789012', tax: 16 },
  { id: 2, name: 'White Bread 400g', sku: 'GRO-002', price: 65, cost: 45, category: 'Bakery', stock: 32, image: null, barcode: '123456789013', tax: 16 },
  { id: 3, name: 'Cooking Oil 2L', sku: 'GRO-003', price: 450, cost: 380, category: 'Pantry', stock: 28, image: null, barcode: '123456789014', tax: 16 },
  { id: 4, name: 'Premium Rice 5kg', sku: 'GRO-004', price: 850, cost: 720, category: 'Grains', stock: 56, image: null, barcode: '123456789015', tax: 16 },
  { id: 5, name: 'Sugar 2kg', sku: 'GRO-005', price: 250, cost: 210, category: 'Pantry', stock: 40, image: null, barcode: '123456789016', tax: 16 },
  { id: 6, name: 'Tea Bags 100pc', sku: 'BEV-001', price: 180, cost: 140, category: 'Beverages', stock: 63, image: null, barcode: '123456789017', tax: 16 },
  { id: 7, name: 'Instant Coffee 200g', sku: 'BEV-002', price: 450, cost: 380, category: 'Beverages', stock: 27, image: null, barcode: '123456789018', tax: 16 },
  { id: 8, name: 'Orange Juice 1L', sku: 'BEV-003', price: 220, cost: 175, category: 'Beverages', stock: 38, image: null, barcode: '123456789019', tax: 16 },
  { id: 9, name: 'Fresh Eggs 6pcs', sku: 'GRO-006', price: 90, cost: 70, category: 'Dairy', stock: 85, image: null, barcode: '123456789020', tax: 16 },
  { id: 10, name: 'Butter 250g', sku: 'GRO-007', price: 280, cost: 230, category: 'Dairy', stock: 23, image: null, barcode: '123456789021', tax: 16 },
  { id: 11, name: 'Tomato Sauce 500g', sku: 'GRO-008', price: 150, cost: 110, category: 'Condiments', stock: 41, image: null, barcode: '123456789022', tax: 16 },
  { id: 12, name: 'Pasta 500g', sku: 'GRO-009', price: 120, cost: 90, category: 'Grains', stock: 34, image: null, barcode: '123456789023', tax: 16 },
  { id: 13, name: 'Fine Salt 1kg', sku: 'GRO-010', price: 55, cost: 35, category: 'Pantry', stock: 72, image: null, barcode: '123456789024', tax: 16 },
  { id: 14, name: 'Chocolate Biscuits 200g', sku: 'SNK-001', price: 120, cost: 85, category: 'Snacks', stock: 58, image: null, barcode: '123456789025', tax: 16 },
  { id: 15, name: 'Soda 500ml', sku: 'BEV-004', price: 100, cost: 75, category: 'Beverages', stock: 120, image: null, barcode: '123456789026', tax: 16 },
  { id: 16, name: 'Toothpaste 100g', sku: 'HBC-001', price: 180, cost: 130, category: 'Health', stock: 44, image: null, barcode: '123456789027', tax: 16 },
  { id: 17, name: 'Dish Soap 500ml', sku: 'HOM-001', price: 140, cost: 100, category: 'Home', stock: 37, image: null, barcode: '123456789028', tax: 16 },
  { id: 18, name: 'Toilet Paper 4rolls', sku: 'HOM-002', price: 250, cost: 190, category: 'Home', stock: 29, image: null, barcode: '123456789029', tax: 16 },
  { id: 19, name: 'Laundry Detergent 1kg', sku: 'HOM-003', price: 350, cost: 270, category: 'Home', stock: 31, image: null, barcode: '123456789030', tax: 16 },
  { id: 20, name: 'Mineral Water 1.5L', sku: 'BEV-005', price: 80, cost: 55, category: 'Beverages', stock: 95, image: null, barcode: '123456789031', tax: 16 }
];

// Mock Customers
const mockCustomers = [
  { id: 1, name: 'Walk-in Customer', phone: '', email: '', points: 0, tier: 'Regular' },
  { id: 2, name: 'John Mwangi', phone: '+254 712 345 678', email: 'john@email.com', points: 1250, tier: 'Gold' },
  { id: 3, name: 'Sarah Wanjiku', phone: '+254 722 456 789', email: 'sarah@email.com', points: 680, tier: 'Silver' },
  { id: 4, name: 'Peter Omondi', phone: '+254 733 567 890', email: 'peter@email.com', points: 320, tier: 'Bronze' }
];

// Cart item shape (JSX) — no TypeScript interface

const PosManagement = () => {
  // State
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const searchInputRef = useRef(null);

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalTax = cart.reduce((sum, item) => sum + ((item.price * item.quantity) * (item.tax / 100)), 0);
  
  let discountAmount = 0;
  if (discountValue > 0) {
    if (discountType === 'percentage') {
      discountAmount = (subtotal + totalTax) * (discountValue / 100);
    } else {
      discountAmount = discountValue;
    }
  }
  
  const total = (subtotal + totalTax) - discountAmount;
  const change = paymentAmount - total;

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique categories
  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  // Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity + 1 > product.stock) {
        toast.error(`Only ${product.stock} units available in stock`);
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { 
              ...item, 
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price,
              taxableTotal: (item.quantity + 1) * item.price
            }
          : item
      ));
    } else {
      if (product.stock < 1) {
        toast.error('Product out of stock');
        return;
      }
      setCart([...cart, {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        tax: product.tax,
        discount: 0,
        total: product.price,
        taxableTotal: product.price
      }]);
    }
    toast.success(`${product.name} added to cart`);
    // Focus search after adding
    searchInputRef.current?.focus();
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    if (newQuantity > item.stock) {
      toast.error(`Only ${item.stock} units available`);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { 
            ...item, 
            quantity: newQuantity,
            total: newQuantity * item.price,
            taxableTotal: newQuantity * item.price
          }
        : item
    ));
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  // Clear cart
  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      setDiscountValue(0);
      toast.success('Cart cleared');
    }
  };

  // Handle payment
  const handlePayment = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    if (paymentAmount < total) {
      toast.error(`Amount is less than total KES ${total.toFixed(2)}`);
      return;
    }
    
    // Process order
    const order = {
      id: Date.now(),
      customer: selectedCustomer,
      items: cart,
      subtotal,
      tax: totalTax,
      discount: discountAmount,
      total,
      paymentMethod,
      paymentAmount,
      change: paymentAmount - total,
      date: new Date().toISOString()
    };
    
    // Update customer points (10 points per 100 KES spent)
    if (selectedCustomer.id !== 1) {
      const pointsEarned = Math.floor(total / 10);
      toast.success(`Earned ${pointsEarned} loyalty points!`);
    }
    
    // Here you would save the order to backend
    console.log('Order processed:', order);
    
    toast.success(`Payment successful! Change: KES ${change.toFixed(2)}`);
    
    // Reset cart and payment
    setCart([]);
    setDiscountValue(0);
    setPaymentAmount(0);
    setShowPaymentModal(false);
    
    // Print receipt (simulated)
    toast.success('Receipt ready for printing');
  };

  // Save current cart as draft (localStorage mock)
  const saveDraft = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    const draft = {
      id: `draft-${Date.now()}`,
      customer: selectedCustomer,
      items: cart,
      subtotal,
      tax: totalTax,
      discount: discountAmount,
      total,
      date: new Date().toISOString()
    };
    const drafts = JSON.parse(localStorage.getItem('pos_drafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('pos_drafts', JSON.stringify(drafts));
    toast.success('Order saved as draft');
    // clear for a new sale
    setCart([]);
    setDiscountValue(0);
  };

  // Record a sale on credit (no immediate payment)
  const sellOnCredit = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (selectedCustomer.id === 1) {
      toast.error('Select a customer before selling on credit');
      setShowCustomerModal(true);
      return;
    }
    const order = {
      id: `credit-${Date.now()}`,
      customer: selectedCustomer,
      items: cart,
      subtotal,
      tax: totalTax,
      discount: discountAmount,
      total,
      paymentMethod: 'credit',
      paymentAmount: 0,
      status: 'credit',
      date: new Date().toISOString()
    };
    // In a real app, save to backend. Using localStorage for demo.
    const credits = JSON.parse(localStorage.getItem('pos_credits') || '[]');
    credits.push(order);
    localStorage.setItem('pos_credits', JSON.stringify(credits));
    toast.success('Order recorded on credit');
    setCart([]);
    setDiscountValue(0);
  };

  // Calculator handlers
  const handleCalcPress = (val) => setCalcInput(prev => `${prev}${val}`);
  const handleCalcClear = () => setCalcInput('');
  const handleCalcEval = () => {
    try {
      // evaluate simple arithmetic expression
      // eslint-disable-next-line no-new-func
      const result = Function('return (' + calcInput + ')')();
      setCalcInput(String(result));
    } catch (e) {
      toast.error('Invalid expression');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // F1 for search focus
      if (e.key === 'F1') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // F2 for payment
      if (e.key === 'F2') {
        e.preventDefault();
        if (cart.length > 0) setShowPaymentModal(true);
      }
      // F3 for new sale
      if (e.key === 'F3') {
        e.preventDefault();
        clearCart();
      }
      // Ctrl + D for dark mode
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cart, isDarkMode]);

  // Dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Container */}
      <div className="flex h-screen overflow-hidden">
        {/* Left Panel - Product Catalog */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Point of Sale</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Process customer transactions quickly</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, SKU, or scan barcode... (F1)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
              <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 overflow-y-auto p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {paginatedProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-left hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                  >
                    <div className="w-full h-24 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:from-brand-200 group-hover:to-purple-200 transition">
                      <Package className="w-10 h-10 text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.sku}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-600 dark:text-brand-400">KES {product.price}</span>
                      <span className={`text-xs ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock} left
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">SKU</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Category</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Price</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Stock</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {paginatedProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{product.sku}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">KES {product.price}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-sm ${product.stock < 10 ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white text-sm rounded-lg transition"
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Shopping Cart */}
        <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-xl">
          {/* Cart Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-brand-600" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Current Sale</h2>
              </div>
              <span className="text-xs text-gray-500">{cart.length} items</span>
            </div>
            {/* Quick actions: Back, Draft, Credit, Calculator (responsive wrap) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => window.history.back()}
                className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={saveDraft}
                className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-100 transition text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={sellOnCredit}
                disabled={cart.length === 0}
                className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 transition text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Sell on Credit
              </button>
              <button
                onClick={() => setShowCalculatorModal(true)}
                className="md:ml-auto ml-0 flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculator
              </button>
            </div>
            
            {/* Customer Selection */}
            <button
              onClick={() => setShowCustomerModal(true)}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                <User className="w-5 h-5 text-brand-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.name}</p>
              </div>
              <div className="text-right">
                {selectedCustomer.tier !== 'Regular' && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCustomer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    selectedCustomer.tier === 'Silver' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {selectedCustomer.tier}
                  </span>
                )}
                <p className="text-xs text-gray-500 mt-1">{selectedCustomer.points} pts</p>
              </div>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Scan or search products to add</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.sku}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">KES {item.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">@ KES {item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount Section */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Discount</span>
              </div>
              <div className="flex gap-2">
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-sm"
                >
                  <option value="percentage">% Percentage</option>
                  <option value="fixed">KES Fixed</option>
                </select>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-right"
                />
                {discountValue > 0 && (
                  <button
                    onClick={() => setDiscountValue(0)}
                    className="px-3 py-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Cart Totals */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">KES {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax (VAT 16%)</span>
                <span className="text-gray-900 dark:text-white">KES {totalTax.toFixed(2)}</span>
              </div>
              {discountValue > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({discountType === 'percentage' ? `${discountValue}%` : `KES ${discountValue}`})</span>
                  <span>- KES {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-brand-600 dark:text-brand-400">KES {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                Clear
              </button>
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={cart.length === 0}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pay (F2)
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-400 mt-3">
              F1: Search | F2: Pay | F3: New Sale | Ctrl+D: Dark Mode
            </p>
          </div>
        </div>
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCustomerModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Select Customer</h3>
              <button onClick={() => setShowCustomerModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {mockCustomers.map(customer => (
                  <button
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerModal(false);
                      toast.success(`Customer changed to ${customer.name}`);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                      <User className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.phone || 'No phone'}</p>
                    </div>
                    {customer.tier !== 'Regular' && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                        customer.tier === 'Silver' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {customer.tier}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-dashed border-brand-300 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-50 transition flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add New Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Process Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="text-2xl font-bold text-brand-600">KES {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`py-2 rounded-lg border flex items-center justify-center gap-2 transition ${
                        paymentMethod === 'cash'
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      Cash
                    </button>
                    <button
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`py-2 rounded-lg border flex items-center justify-center gap-2 transition ${
                        paymentMethod === 'mpesa'
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      M-Pesa
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 rounded-lg border flex items-center justify-center gap-2 transition ${
                        paymentMethod === 'card'
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Card
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount Received
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 text-right"
                  />
                </div>

                {paymentAmount >= total && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-green-600 dark:text-green-400">Change</span>
                      <span className="text-xl font-bold text-green-600 dark:text-green-400">KES {change.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePayment}
                  disabled={paymentAmount < total}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Payment
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCalculatorModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Calculator</h3>
              <button onClick={() => setShowCalculatorModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <input type="text" value={calcInput} readOnly className="w-full px-3 py-2 text-right text-2xl rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      if (b === 'C') return handleCalcClear();
                      if (b === '=') return handleCalcEval();
                      handleCalcPress(b);
                    }}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-lg"
                  >
                    {b}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <button onClick={() => { navigator.clipboard?.writeText(calcInput); toast.success('Copied'); }} className="w-full py-2 bg-brand-600 text-white rounded-lg">Copy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icons
const Grids = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const Lists = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default PosManagement;