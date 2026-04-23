import React, { useState, useEffect, useRef } from 'react';
import {
  Search, ShoppingCart, Trash2, Plus, Minus, X, CreditCard,
  Smartphone, Printer, Receipt, User, Users, Tag, Percent,
  DollarSign, Package, AlertCircle, CheckCircle, Clock,
  ChevronLeft, ChevronRight, RefreshCw, Settings, QrCode,
  Scan, Coffee, Home, Grid, List, ArrowUp, ArrowDown,
  TrendingUp, TrendingDown, BarChart3, Zap, Shield,
  Gift, Ticket, Truck, Calendar, MessageCircle, Phone,
  Mail, MapPin, Save, FileText, Download, ExternalLink,
  Eye, Edit, Trash, Copy, Archive, Globe, Smartphone as MobileIcon,
  Laptop, Watch, Headphones, Shirt, Camera
} from 'lucide-react';
import toast from 'react-hot-toast'; 

// Mock products data for POS
const mockPOSProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', sku: 'ELEC-001', price: 2999, cost: 1800, stock: 45, category: 'Electronics', barcode: '890123456789', image: null, weight: '250g', brand: 'SoundMax' },
  { id: 2, name: 'Smart Fitness Watch', sku: 'ELEC-002', price: 5499, cost: 3200, stock: 28, category: 'Electronics', barcode: '890123456790', image: null, weight: '45g', brand: 'FitTech' },
  { id: 3, name: 'Organic Green Tea (50 bags)', sku: 'FOOD-001', price: 450, cost: 280, stock: 320, category: 'Food & Beverage', barcode: '890123456791', image: null, brand: 'PureLeaf' },
  { id: 4, name: 'Ergonomic Office Chair', sku: 'FURN-001', price: 18999, cost: 12500, stock: 12, category: 'Furniture', barcode: '890123456792', image: null, brand: 'ComfortSeat' },
  { id: 5, name: 'Stainless Steel Water Bottle', sku: 'HOME-001', price: 899, cost: 450, stock: 0, category: 'Home & Living', barcode: '890123456793', image: null, brand: 'EcoLife' },
  { id: 6, name: 'Wireless Mouse', sku: 'ELEC-003', price: 1299, cost: 750, stock: 156, category: 'Electronics', barcode: '890123456794', image: null, brand: 'ClickPro' },
  { id: 7, name: 'Yoga Mat', sku: 'SPRT-001', price: 1599, cost: 980, stock: 78, category: 'Sports', barcode: '890123456795', image: null, brand: 'FlexFit' },
  { id: 8, name: 'LED Desk Lamp', sku: 'HOME-002', price: 2499, cost: 1500, stock: 34, category: 'Home & Living', barcode: '890123456796', image: null, brand: 'BrightHome' },
  { id: 9, name: 'Mechanical Keyboard', sku: 'ELEC-004', price: 4599, cost: 2800, stock: 23, category: 'Electronics', barcode: '890123456797', image: null, brand: 'KeyMaster' },
  { id: 10, name: 'Running Shoes', sku: 'SPRT-002', price: 3999, cost: 2200, stock: 45, category: 'Sports', barcode: '890123456798', image: null, brand: 'RunFast' },
  { id: 11, name: 'Coffee Maker', sku: 'HOME-003', price: 8999, cost: 5000, stock: 15, category: 'Home & Living', barcode: '890123456799', image: null, brand: 'BrewMaster' },
  { id: 12, name: 'Backpack', sku: 'BAG-001', price: 2499, cost: 1500, stock: 67, category: 'Accessories', barcode: '890123456800', image: null, brand: 'TravelGear' },
];

// Mock customers
const mockCustomers = [
  { id: 1, name: 'Walk-in Customer', email: '', phone: '', loyaltyPoints: 0, isWalkin: true },
  { id: 2, name: 'John Mwangi', email: 'john@example.com', phone: '+254 712 345 678', loyaltyPoints: 1250 },
  { id: 3, name: 'Sarah Kimani', email: 'sarah@example.com', phone: '+254 723 456 789', loyaltyPoints: 3450 },
  { id: 4, name: 'Peter Omondi', email: 'peter@example.com', phone: '+254 734 567 890', loyaltyPoints: 890 },
  { id: 5, name: 'Grace Wanjiku', email: 'grace@example.com', phone: '+254 745 678 901', loyaltyPoints: 2100 },
];

// Cart item shape (JSX) — no TypeScript interface in this file

const PosManagement = () => {
  // State
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState(mockPOSProducts);
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [cartDiscount, setCartDiscount] = useState(0);
  const [cartDiscountValue, setCartDiscountValue] = useState(0);
  const [note, setNote] = useState('');
  const [receiptNumber, setReceiptNumber] = useState(`INV-${Date.now().toString().slice(-8)}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [barcodeInput, setBarcodeInput] = useState('');
  const barcodeRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.barcode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const hasStock = product.stock > 0;
    return matchesSearch && matchesCategory && hasStock;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemDiscountTotal = cart.reduce((sum, item) => {
    if (item.discountType === 'percentage') {
      return sum + (item.price * item.quantity * item.discount / 100);
    } else {
      return sum + (item.discount * item.quantity);
    }
  }, 0);
  const cartDiscountAmount = discountType === 'percentage' 
    ? (subtotal - itemDiscountTotal) * cartDiscount / 100 
    : cartDiscount;
  const totalDiscount = itemDiscountTotal + cartDiscountAmount;
  const taxableAmount = subtotal - totalDiscount;
  const tax = taxableAmount * 0.16; // 16% VAT
  const total = taxableAmount + tax;

  // Calculate loyalty points earned (1 point per 100 KES)
  const loyaltyPointsEarned = Math.floor(total / 100);

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
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        discount: 0,
        discountType: 'percentage',
        subtotal: product.price
      }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  // Update cart item quantity
  const updateQuantity = (id, newQuantity) => {
    const product = products.find(p => p.id === id);
    if (product && newQuantity > product.stock) {
      toast.error(`Only ${product.stock} units available`);
      return;
    }
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
        : item
    ));
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  // Update item discount
  const updateItemDiscount = (id, discount, type) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, discount, discountType: type }
        : item
    ));
  };

  // Clear cart
  const clearCart = () => {
    if (cart.length > 0) {
      if (window.confirm('Are you sure you want to clear the entire cart?')) {
        setCart([]);
        setCartDiscount(0);
        setCartDiscountValue(0);
        setNote('');
        toast.success('Cart cleared');
      }
    }
  };

  // Process payment
  const processPayment = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty. Add items before checkout.');
      return;
    }

    const received = parseFloat(amountReceived);
    if (paymentMethod === 'cash' && (isNaN(received) || received < total)) {
      toast.error(`Amount received must be at least ${formatCurrency(total)}`);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const change = paymentMethod === 'cash' ? received - total : 0;
      
      // Create order object
      const order = {
        id: receiptNumber,
        customer: selectedCustomer,
        items: cart,
        subtotal,
        totalDiscount,
        tax,
        total,
        paymentMethod,
        amountReceived: paymentMethod === 'cash' ? received : total,
        change,
        note,
        date: new Date().toISOString(),
        loyaltyPointsEarned: selectedCustomer.id !== 1 ? loyaltyPointsEarned : 0
      };

      // Save to localStorage for receipt printing
      localStorage.setItem('lastReceipt', JSON.stringify(order));
      
      toast.success(`Payment successful! Change: ${formatCurrency(change)}`);
      
      // Reset cart and state
      setCart([]);
      setCartDiscount(0);
      setCartDiscountValue(0);
      setNote('');
      setAmountReceived('');
      setShowPaymentModal(false);
      setReceiptNumber(`INV-${Date.now().toString().slice(-8)}`);
      
      // Print receipt
      setTimeout(() => {
        window.open('/receipt', '_blank');
      }, 500);
      
      setIsProcessing(false);
    }, 1500);
  };

  // Apply discount to cart
  const applyCartDiscount = () => {
    if (discountType === 'percentage' && cartDiscount > 100) {
      toast.error('Percentage discount cannot exceed 100%');
      return;
    }
    if (discountType === 'fixed' && cartDiscount > subtotal - itemDiscountTotal) {
      toast.error('Fixed discount cannot exceed cart subtotal after item discounts');
      return;
    }
    setCartDiscountValue(cartDiscount);
    toast.success(`Discount of ${discountType === 'percentage' ? cartDiscount + '%' : formatCurrency(cartDiscount)} applied`);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // Handle barcode scanner input
  const handleBarcodeScan = (e) => {
    if (e.key === 'Enter' && barcodeInput) {
      const product = products.find(p => p.barcode === barcodeInput);
      if (product && product.stock > 0) {
        addToCart(product);
        setBarcodeInput('');
      } else if (product && product.stock === 0) {
        toast.error(`${product.name} is out of stock`);
      } else {
        toast.error('Product not found');
      }
    }
  };

  // Search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        p.stock > 0
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  // Auto-focus barcode input
  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, []);

  // Categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Point of Sale</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Complete transactions quickly and efficiently</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Receipt #</p>
              <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{receiptNumber}</p>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-right">
              <p className="text-xs text-gray-500">Cashier</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full flex gap-4">
          {/* Left Panel - Product Selection */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name, SKU, or barcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  {/* Search Suggestions */}
                  {suggestions.length > 0 && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                      {suggestions.map(product => (
                        <button
                          key={product.id}
                          onClick={() => {
                            addToCart(product);
                            setSearchQuery('');
                            setSuggestions([]);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.sku}</p>
                          </div>
                          <p className="text-sm font-semibold text-indigo-600">{formatCurrency(product.price)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={barcodeRef}
                    type="text"
                    placeholder="Scan barcode"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={handleBarcodeScan}
                    className="w-48 pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {paginatedProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl p-3 text-left transition border border-transparent hover:border-indigo-300 dark:hover:border-indigo-700"
                  >
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-2">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(product.price)}</p>
                      <p className="text-xs text-green-600">Stock: {product.stock}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Shopping Cart */}
          <div className="w-96 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
            {/* Customer Section */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer</p>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Users className="w-3 h-3" /> Change
                </button>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.name}</p>
                  {selectedCustomer.phone && (
                    <p className="text-xs text-gray-500">{selectedCustomer.phone}</p>
                  )}
                </div>
                {selectedCustomer.loyaltyPoints > 0 && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Points</p>
                    <p className="text-sm font-semibold text-yellow-600">{selectedCustomer.loyaltyPoints}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Select products to add to cart</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
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
                            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
                          <p className="text-xs text-gray-500">{formatCurrency(item.price)} each</p>
                        </div>
                      </div>
                      {/* Item Discount */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateItemDiscount(item.id, 0, 'percentage')}
                          className={`text-xs px-2 py-0.5 rounded ${item.discount === 0 ? 'bg-gray-200 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'}`}
                        >
                          None
                        </button>
                        <button
                          onClick={() => updateItemDiscount(item.id, 10, 'percentage')}
                          className={`text-xs px-2 py-0.5 rounded ${item.discount === 10 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-700'}`}
                        >
                          10%
                        </button>
                        <button
                          onClick={() => updateItemDiscount(item.id, 20, 'percentage')}
                          className={`text-xs px-2 py-0.5 rounded ${item.discount === 20 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-700'}`}
                        >
                          20%
                        </button>
                        {item.discount > 0 && (
                          <span className="text-xs text-green-600 ml-auto">
                            -{item.discountType === 'percentage' ? `${item.discount}%` : formatCurrency(item.discount)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                {/* Cart Level Discount */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex gap-2">
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">KES</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Discount"
                      value={cartDiscount}
                      onChange={(e) => setCartDiscount(parseFloat(e.target.value) || 0)}
                      className="flex-1 text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800"
                    />
                    <button
                      onClick={applyCartDiscount}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  {itemDiscountTotal > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Item Discounts</span>
                      <span>-{formatCurrency(itemDiscountTotal)}</span>
                    </div>
                  )}
                  {cartDiscountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Cart Discount</span>
                      <span>-{formatCurrency(cartDiscountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (16% VAT)</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-xl text-indigo-600">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCustomerModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">Select Customer</h3>
              <button onClick={() => setShowCustomerModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {mockCustomers.filter(c => 
                  c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                  (c.phone && c.phone.includes(customerSearch))
                ).map(customer => (
                  <button
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerModal(false);
                      toast.success(`Customer changed to ${customer.name}`);
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                    {customer.phone && <p className="text-xs text-gray-500">{customer.phone}</p>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">Process Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Total Discount</span>
                  <span>-{formatCurrency(totalDiscount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (16%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-xl text-indigo-600">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'cash'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'mobile'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </button>
                </div>
              </div>

              {/* Amount Received for Cash */}
              {paymentMethod === 'cash' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount Received</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="w-full px-3 py-2 text-lg border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    autoFocus
                  />
                  {parseFloat(amountReceived) >= total && (
                    <p className="text-sm text-green-600 mt-2">
                      Change: {formatCurrency(parseFloat(amountReceived) - total)}
                    </p>
                  )}
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Note (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Add a note to this transaction..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Loyalty Points */}
              {selectedCustomer.id !== 1 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    🎉 This purchase will earn {loyaltyPointsEarned} loyalty points!
                  </p>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Complete Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default PosManagement;