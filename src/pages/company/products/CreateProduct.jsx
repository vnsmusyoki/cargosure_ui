import React, { useState } from 'react';
import {
  ArrowLeft, Save, X, Plus, Trash2, Upload, Image as ImageIcon,
  Package, Tag, DollarSign, Box, Truck, Scale, Calendar,
  AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp,
  Layers, ShoppingBag, Building, MapPin, Phone, Mail,
  FileText, QrCode, Barcode, Camera, PlusCircle, MinusCircle,
  Globe, Sparkles, ClipboardList, Settings, HelpCircle,
  Clock,
  Archive,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    sku: '',
    barcode: '',
    brand: '',
    category: '',
    subcategory: '',
    tags: [],
    tagInput: '',
    description: '',
    shortDescription: '',
    
    // Pricing
    costPrice: '',
    sellingPrice: '',
    comparePrice: '',
    taxRate: '16',
    isTaxable: true,
    
    // Inventory
    stockQuantity: '',
    lowStockThreshold: '10',
    unit: 'piece',
    weight: '',
    weightUnit: 'kg',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    
    // Images & Media
    mainImage: null,
    galleryImages: [],
    
    // Supplier Information
    supplierId: '',
    supplierName: '',
    supplierSku: '',
    leadTime: '',
    reorderPoint: '',
    
    // SEO & Listing
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    
    // Status
    status: 'draft',
    featured: false,
    publishedAt: null,
    
    // Additional
    warranty: '',
    returnPolicy: '',
    shippingWeight: '',
    shippingDimensions: {
      length: '',
      width: '',
      height: ''
    },
    hazardClass: '',
    storageConditions: ''
  });

  // Mock categories data
  const categories = [
    { id: 1, name: 'Electronics', subcategories: ['Audio', 'Wearables', 'Computer Accessories', 'Mobile Phones', 'TV & Video'] },
    { id: 2, name: 'Food & Beverage', subcategories: ['Beverages', 'Snacks', 'Pantry Staples', 'Fresh Produce', 'Frozen Foods'] },
    { id: 3, name: 'Home & Living', subcategories: ['Kitchenware', 'Lighting', 'Furniture', 'Decor', 'Storage'] },
    { id: 4, name: 'Sports & Outdoors', subcategories: ['Fitness', 'Outdoor Gear', 'Team Sports', 'Cycling', 'Swimming'] },
    { id: 5, name: 'Health & Beauty', subcategories: ['Skincare', 'Hair Care', 'Personal Care', 'Vitamins', 'Fragrances'] },
    { id: 6, name: 'Baby & Kids', subcategories: ['Toys', 'Clothing', 'Nursery', 'Feeding', 'Diapering'] },
    { id: 7, name: 'Automotive', subcategories: ['Car Care', 'Tools', 'Accessories', 'Parts', 'Tires'] }
  ];

  const suppliers = [
    { id: 1, name: 'TechImport Ltd', contact: 'John Doe', phone: '+254 712 345 678', email: 'sales@techimport.co.ke' },
    { id: 2, name: 'OrganicFoods Kenya', contact: 'Mary Wanjiku', phone: '+254 722 456 789', email: 'orders@organicfoods.ke' },
    { id: 3, name: 'OfficeFurniture Ltd', contact: 'Peter Omondi', phone: '+254 733 567 890', email: 'info@officefurniture.com' },
    { id: 4, name: 'EcoProducts KE', contact: 'Sarah Muthoni', phone: '+254 744 678 901', email: 'sales@ecoproducts.ke' }
  ];

  const units = ['piece', 'box', 'pack', 'set', 'kg', 'g', 'liter', 'ml', 'meter', 'roll'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (e) => {
    const { name, value } = e.target;
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], value.trim()],
        [`${name}Input`]: ''
      }));
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleVariantAdd = (variant) => {
    setVariants([...variants, { ...variant, id: Date.now() }]);
    setShowVariantModal(false);
    setCurrentVariant(null);
    toast.success('Variant added successfully');
  };

  const handleVariantRemove = (id) => {
    setVariants(variants.filter(v => v.id !== id));
    toast.success('Variant removed');
  };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'main') {
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, mainImage: reader.result }));
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      const newImages = files.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return { id: Date.now() + Math.random(), file, preview: URL.createObjectURL(file), isUploading: true };
      });
      setImages([...images, ...newImages]);
      // Simulate upload
      setTimeout(() => {
        setImages(prev => prev.map(img => 
          newImages.includes(img) ? { ...img, isUploading: false } : img
        ));
      }, 1000);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.name || !formData.sku || !formData.category || !formData.sellingPrice) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Product created successfully!');
      // Redirect would go here
    }, 1500);
  };

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PRD';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, sku: `${prefix}-${random}` }));
    toast.success('SKU generated');
  };

  const generateBarcode = () => {
    const barcode = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    setFormData(prev => ({ ...prev, barcode }));
    toast.success('Barcode generated');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <a
                href="/products"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </a>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create a new product listing in your catalog</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Publish Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                {[
                  { id: 'basic', label: 'Basic Info', icon: Package },
                  { id: 'pricing', label: 'Pricing & Stock', icon: DollarSign },
                  { id: 'variants', label: 'Variants', icon: Layers },
                  { id: 'shipping', label: 'Shipping', icon: Truck },
                  { id: 'seo', label: 'SEO', icon: Globe }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition ${
                      activeTab === tab.id
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Premium Wireless Headphones"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          SKU <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleInputChange}
                            placeholder="Product identifier"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          />
                          <button
                            type="button"
                            onClick={generateSKU}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
                            title="Generate SKU"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Barcode
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleInputChange}
                            placeholder="UPC/EAN"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          />
                          <button
                            type="button"
                            onClick={generateBarcode}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
                          >
                            <Barcode className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        >
                          <option value="">Select category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Subcategory
                        </label>
                        <select
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          disabled={!formData.category}
                        >
                          <option value="">Select subcategory</option>
                          {formData.category && categories
                            .find(c => c.name === formData.category)
                            ?.subcategories.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Product brand"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            {tag}
                            <button onClick={() => removeTag(idx)} className="hover:text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        name="tagInput"
                        value={formData.tagInput}
                        onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                        onKeyDown={handleArrayInput}
                        placeholder="Type tag and press Enter"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Short Description
                      </label>
                      <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Brief product description for listings"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Detailed product description with features and specifications"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                )}

                {/* Pricing & Stock Tab */}
                {activeTab === 'pricing' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cost Price (KES)
                        </label>
                        <input
                          type="number"
                          name="costPrice"
                          value={formData.costPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Selling Price (KES) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="sellingPrice"
                          value={formData.sellingPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Compare at Price (Optional)
                      </label>
                      <input
                        type="number"
                        name="comparePrice"
                        value={formData.comparePrice}
                        onChange={handleInputChange}
                        placeholder="Original price to show discount"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                      {formData.comparePrice && parseFloat(formData.comparePrice) > parseFloat(formData.sellingPrice) && (
                        <p className="text-xs text-green-600 mt-1">
                          Customers save KES {(parseFloat(formData.comparePrice) - parseFloat(formData.sellingPrice)).toFixed(2)} ({Math.round((1 - parseFloat(formData.sellingPrice) / parseFloat(formData.comparePrice)) * 100)}% off)
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tax Rate (%)
                        </label>
                        <select
                          name="taxRate"
                          value={formData.taxRate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        >
                          <option value="0">0% - Zero Rated</option>
                          <option value="8">8% - Reduced Rate</option>
                          <option value="16">16% - Standard Rate (VAT)</option>
                        </select>
                      </div>
                      <div className="flex items-center pt-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="isTaxable"
                            checked={formData.isTaxable}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">This product is taxable</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Inventory Management</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Stock Quantity <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Unit
                          </label>
                          <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          >
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Low Stock Threshold
                          </label>
                          <input
                            type="number"
                            name="lowStockThreshold"
                            value={formData.lowStockThreshold}
                            onChange={handleInputChange}
                            placeholder="10"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Reorder Point
                          </label>
                          <input
                            type="number"
                            name="reorderPoint"
                            value={formData.reorderPoint}
                            onChange={handleInputChange}
                            placeholder="When to reorder"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                        <select
                          name="weightUnit"
                          value={formData.weightUnit}
                          onChange={handleInputChange}
                          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        >
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="lb">lb</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Variants Tab */}
                {activeTab === 'variants' && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Product Variants</h4>
                        <p className="text-sm text-gray-500">Add size, color, or other variants</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentVariant(null);
                          setShowVariantModal(true);
                        }}
                        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Variant
                      </button>
                    </div>

                    {variants.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No variants added yet</p>
                        <p className="text-sm text-gray-400">Add size, color, or other product variations</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {variants.map(variant => (
                          <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{variant.name}</div>
                              <div className="text-sm text-gray-500">
                                SKU: {variant.sku} | Price: KES {variant.price} | Stock: {variant.stock}
                              </div>
                            </div>
                            <button
                              onClick={() => handleVariantRemove(variant.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping Tab */}
                {activeTab === 'shipping' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Shipping Weight
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="shippingWeight"
                          value={formData.shippingWeight}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                        <select className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
                          <option>kg</option>
                          <option>g</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Shipping Dimensions (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          placeholder="Length"
                          value={formData.shippingDimensions.length}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shippingDimensions: { ...prev.shippingDimensions, length: e.target.value }
                          }))}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                        <input
                          type="number"
                          placeholder="Width"
                          value={formData.shippingDimensions.width}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shippingDimensions: { ...prev.shippingDimensions, width: e.target.value }
                          }))}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                        <input
                          type="number"
                          placeholder="Height"
                          value={formData.shippingDimensions.height}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shippingDimensions: { ...prev.shippingDimensions, height: e.target.value }
                          }))}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hazard Class (if applicable)
                      </label>
                      <input
                        type="text"
                        name="hazardClass"
                        value={formData.hazardClass}
                        onChange={handleInputChange}
                        placeholder="e.g., Flammable, Toxic"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Storage Conditions
                      </label>
                      <textarea
                        name="storageConditions"
                        value={formData.storageConditions}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="e.g., Keep in cool dry place, refrigerate after opening"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleInputChange}
                        placeholder={formData.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SEO Description
                      </label>
                      <textarea
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Brief description for search engines"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        name="seoKeywords"
                        value={formData.seoKeywords}
                        onChange={handleInputChange}
                        placeholder="keyword1, keyword2, keyword3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      />
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800 dark:text-amber-300">
                          <p className="font-medium">SEO Preview</p>
                          <p className="text-blue-600 dark:text-blue-400 mt-1">{formData.seoTitle || formData.name || 'Product Title'}</p>
                          <p className="text-green-600 dark:text-green-400 text-xs">{window.location.href}/product/{formData.sku || 'product-slug'}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{formData.seoDescription || formData.shortDescription || 'Product description will appear here...'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Images</h3>
              
              {/* Main Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Image</label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    {formData.mainImage ? (
                      <img src={formData.mainImage} alt="Main" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'main')} />
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gallery Images</label>
                <div className="flex flex-wrap gap-3">
                  {images.map((img, idx) => (
                    <div key={img.id} className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img src={img.preview} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      {img.isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
                    <Plus className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'gallery')} />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">Upload up to 10 images. First image will be the thumbnail.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Status</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Published</div>
                      <div className="text-xs text-gray-500">Visible to customers</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === 'published'}
                    onChange={handleInputChange}
                    className="text-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Draft</div>
                      <div className="text-xs text-gray-500">Not visible to customers</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={handleInputChange}
                    className="text-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Archive className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Archived</div>
                      <div className="text-xs text-gray-500">Hidden from catalog</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value="archived"
                    checked={formData.status === 'archived'}
                    onChange={handleInputChange}
                    className="text-indigo-600"
                  />
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feature this product</span>
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              </div>
            </div>

            {/* Supplier Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Supplier Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supplier
                  </label>
                  <select
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={(e) => {
                      const supplier = suppliers.find(s => s.id === parseInt(e.target.value));
                      setFormData(prev => ({
                        ...prev,
                        supplierId: e.target.value,
                        supplierName: supplier?.name || ''
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  >
                    <option value="">Select supplier</option>
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supplier SKU
                  </label>
                  <input
                    type="text"
                    name="supplierSku"
                    value={formData.supplierSku}
                    onChange={handleInputChange}
                    placeholder="Supplier's reference"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lead Time (days)
                  </label>
                  <input
                    type="number"
                    name="leadTime"
                    value={formData.leadTime}
                    onChange={handleInputChange}
                    placeholder="Days from order to delivery"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Warranty & Returns */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Warranty & Returns</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Warranty Information
                  </label>
                  <textarea
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g., 1 year manufacturer warranty"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Return Policy
                  </label>
                  <textarea
                    name="returnPolicy"
                    value={formData.returnPolicy}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g., 30 days return policy"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variant Modal */}
      {showVariantModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowVariantModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Add Product Variant</h3>
              <button onClick={() => setShowVariantModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <AddVariantForm onSave={handleVariantAdd} onCancel={() => setShowVariantModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Variant Form Component
const AddVariantForm = ({ onSave, onCancel }) => {
  const [variant, setVariant] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    attributes: [{ key: '', value: '' }]
  });

  const addAttribute = () => {
    setVariant(prev => ({
      ...prev,
      attributes: [...prev.attributes, { key: '', value: '' }]
    }));
  };

  const removeAttribute = (index) => {
    setVariant(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  const updateAttribute = (index, field, value) => {
    setVariant(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!variant.name || !variant.price) {
      toast.error('Please fill variant name and price');
      return;
    }
    onSave(variant);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Variant Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={variant.name}
          onChange={(e) => setVariant(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Large, Red, 1kg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Variant SKU
        </label>
        <input
          type="text"
          value={variant.sku}
          onChange={(e) => setVariant(prev => ({ ...prev, sku: e.target.value }))}
          placeholder="Unique identifier"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price (KES) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={variant.price}
            onChange={(e) => setVariant(prev => ({ ...prev, price: e.target.value }))}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            value={variant.stock}
            onChange={(e) => setVariant(prev => ({ ...prev, stock: e.target.value }))}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Attributes (Optional)
        </label>
        {variant.attributes.map((attr, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Attribute (e.g., Color)"
              value={attr.key}
              onChange={(e) => updateAttribute(idx, 'key', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-sm"
            />
            <input
              type="text"
              placeholder="Value (e.g., Red)"
              value={attr.value}
              onChange={(e) => updateAttribute(idx, 'value', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-sm"
            />
            {variant.attributes.length > 1 && (
              <button
                type="button"
                onClick={() => removeAttribute(idx)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAttribute}
          className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          Add Attribute
        </button>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium">
          Add Variant
        </button>
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;