import React, { useState } from 'react';
import {
  Building2, Globe, Clock, DollarSign, CreditCard, Truck,
  Shield, Bell, Users, Mail, Phone, MapPin, Calendar,
  Package, ShoppingBag, Percent, FileText, Printer,
  Smartphone, Laptop, Settings, Save, X, Plus, Trash2,
  Edit, Eye, Copy, CheckCircle, AlertCircle, RefreshCw,
  Upload, Image, Link, Facebook, Twitter, Instagram,
  Linkedin, Youtube, Mail as MailIcon, Phone as PhoneIcon,
  Map, Flag, Award, Gift, Star, Heart, Zap, Coffee,
  Moon, Sun, ChevronDown, ChevronRight, ToggleLeft, ToggleRight,
  Database, Cloud, Wifi, WifiOff, Lock, Key, UserCheck,
  FileCheck, Receipt, BarChart3, TrendingUp, Users as UsersIcon,
  ShoppingCart, TruckIcon, Clock as ClockIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock business data
const initialBusinessInfo = {
  companyName: 'TechStore Kenya Ltd',
  legalName: 'TechStore Kenya Limited',
  registrationNumber: 'PVT-2024-12345',
  taxId: 'P051234567Z',
  vatNumber: 'VAT-123456789',
  industry: 'E-commerce',
  founded: '2020',
  employees: '25-50',
  website: 'www.techstore.co.ke',
  email: 'info@techstore.co.ke',
  phone: '+254 712 345 678',
  alternatePhone: '+254 722 123 456',
  address: '123 Kenyatta Avenue',
  city: 'Nairobi',
  state: 'Nairobi County',
  postalCode: '00100',
  country: 'Kenya',
  logo: null,
  favicon: null,
  coverImage: null,
  description: 'Leading e-commerce platform for electronics, furniture, and lifestyle products in Kenya. We provide quality products at competitive prices with fast delivery across the country.',
  mission: 'To provide quality products at affordable prices with excellent customer service.',
  vision: 'To become the leading e-commerce platform in East Africa.',
  values: ['Customer First', 'Integrity', 'Innovation', 'Sustainability', 'Team Work']
};

const initialOperatingHours = [
  { day: 'Monday', open: '09:00', close: '18:00', closed: false },
  { day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
  { day: 'Wednesday', open: '09:00', close: '18:00', closed: false },
  { day: 'Thursday', open: '09:00', close: '18:00', closed: false },
  { day: 'Friday', open: '09:00', close: '17:00', closed: false },
  { day: 'Saturday', open: '10:00', close: '16:00', closed: false },
  { day: 'Sunday', open: '00:00', close: '00:00', closed: true }
];

const initialTaxSettings = {
  vatRate: 16,
  enableVat: true,
  vatInclusive: true,
  enableProductTax: false,
  shippingTaxable: true,
  taxCalculationMethod: 'line_item',
  taxIdDisplay: true,
  taxRound: 'per_line'
};

const initialShippingSettings = {
  freeShippingThreshold: 5000,
  defaultWeight: 0.5,
  weightUnit: 'kg',
  dimensionsUnit: 'cm',
  shippingMethods: [
    { id: 1, name: 'Standard Delivery', cost: 250, estimatedDays: '3-5 days', enabled: true },
    { id: 2, name: 'Express Delivery', cost: 500, estimatedDays: '1-2 days', enabled: true },
    { id: 3, name: 'Same Day Delivery', cost: 800, estimatedDays: 'Same day', enabled: false },
    { id: 4, name: 'Pickup Station', cost: 0, estimatedDays: 'Pickup in 1-2 days', enabled: true }
  ]
};

const initialPaymentSettings = {
  currency: 'KES',
  currencySymbol: 'KES',
  currencyPosition: 'before',
  decimalPlaces: 0,
  thousandSeparator: ',',
  enableCashOnDelivery: true,
  enableMpesa: true,
  enableCardPayment: true,
  enableBankTransfer: false,
  mpesaPaybill: '123456',
  mpesaAccountNo: 'TechStore',
  cardProcessor: 'stripe',
  stripePublicKey: 'pk_test_xxxxxxxxxxxx',
  stripeSecretKey: 'sk_test_xxxxxxxxxxxx'
};

const initialNotificationSettings = {
  orderConfirmation: true,
  paymentReceived: true,
  orderShipped: true,
  orderDelivered: true,
  inventoryAlerts: true,
  lowStockThreshold: 10,
  dailySalesReport: true,
  weeklySummary: true,
  customerFeedback: true,
  newsletterOptIn: true,
  smsNotifications: false,
  smsApiKey: '',
  smsSenderId: 'TechStore'
};

const initialSecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 60,
  maxLoginAttempts: 5,
  passwordExpiryDays: 90,
  ipWhitelist: [],
  requireEmailVerification: true,
  requireAdminApproval: false,
  auditLogRetention: 90
};

const initialLocalizationSettings = {
  language: 'en',
  timezone: 'Africa/Nairobi',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24h',
  weekStart: 'Monday',
  weightUnit: 'kg',
  dimensionUnit: 'cm'
};

const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [operatingHours, setOperatingHours] = useState(initialOperatingHours);
  const [taxSettings, setTaxSettings] = useState(initialTaxSettings);
  const [shippingSettings, setShippingSettings] = useState(initialShippingSettings);
  const [paymentSettings, setPaymentSettings] = useState(initialPaymentSettings);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);
  const [securitySettings, setSecuritySettings] = useState(initialSecuritySettings);
  const [localizationSettings, setLocalizationSettings] = useState(initialLocalizationSettings);
  const [newShippingMethod, setNewShippingMethod] = useState({ name: '', cost: 0, estimatedDays: '', enabled: true });
  const [showAddShippingModal, setShowAddShippingModal] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'tax', label: 'Tax Settings', icon: Percent },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'localization', label: 'Localization', icon: Globe }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('All settings have been saved successfully!');
    setIsSaving(false);
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      setBusinessInfo(initialBusinessInfo);
      setOperatingHours(initialOperatingHours);
      setTaxSettings(initialTaxSettings);
      setShippingSettings(initialShippingSettings);
      setPaymentSettings(initialPaymentSettings);
      setNotificationSettings(initialNotificationSettings);
      setSecuritySettings(initialSecuritySettings);
      setLocalizationSettings(initialLocalizationSettings);
      toast.success('Settings reset to default');
    }
  };

  const updateOperatingHour = (index, field, value) => {
    const updated = [...operatingHours];
    updated[index] = { ...updated[index], [field]: value };
    setOperatingHours(updated);
  };

  const addShippingMethod = () => {
    if (newShippingMethod.name && newShippingMethod.cost > 0) {
      setShippingSettings({
        ...shippingSettings,
        shippingMethods: [
          ...shippingSettings.shippingMethods,
          { ...newShippingMethod, id: Date.now(), enabled: true }
        ]
      });
      setNewShippingMethod({ name: '', cost: 0, estimatedDays: '', enabled: true });
      setShowAddShippingModal(false);
      toast.success('Shipping method added');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const toggleShippingMethod = (id) => {
    setShippingSettings({
      ...shippingSettings,
      shippingMethods: shippingSettings.shippingMethods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    });
  };

  const deleteShippingMethod = (id) => {
    setShippingSettings({
      ...shippingSettings,
      shippingMethods: shippingSettings.shippingMethods.filter(method => method.id !== id)
    });
    toast.success('Shipping method removed');
  };

  const addIpToWhitelist = () => {
    if (ipAddress && /^(\d{1,3}\.){3}\d{1,3}$/.test(ipAddress)) {
      setSecuritySettings({
        ...securitySettings,
        ipWhitelist: [...securitySettings.ipWhitelist, ipAddress]
      });
      setIpAddress('');
      toast.success('IP address added to whitelist');
    } else {
      toast.error('Please enter a valid IP address');
    }
  };

  const removeIpFromWhitelist = (ip) => {
    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: securitySettings.ipWhitelist.filter(i => i !== ip)
    });
    toast.success('IP address removed');
  };

  const SectionCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder, required, helpText }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );

  const Switch = ({ label, enabled, onChange, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Settings</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Configure your business information, preferences, and operational settings
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetToDefault}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save All Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* General Information */}
          {activeTab === 'general' && (
            <>
              <SectionCard title="Company Information" icon={Building2}>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Company Name"
                    value={businessInfo.companyName}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, companyName: v })}
                    required
                  />
                  <InputField
                    label="Legal Name"
                    value={businessInfo.legalName}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, legalName: v })}
                  />
                  <InputField
                    label="Registration Number"
                    value={businessInfo.registrationNumber}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, registrationNumber: v })}
                  />
                  <InputField
                    label="Tax ID / PIN"
                    value={businessInfo.taxId}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, taxId: v })}
                  />
                  <InputField
                    label="VAT Number"
                    value={businessInfo.vatNumber}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, vatNumber: v })}
                  />
                  <InputField
                    label="Industry"
                    value={businessInfo.industry}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, industry: v })}
                  />
                  <InputField
                    label="Year Founded"
                    value={businessInfo.founded}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, founded: v })}
                  />
                  <InputField
                    label="Company Size"
                    value={businessInfo.employees}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, employees: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Contact Information" icon={Mail}>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Email Address"
                    type="email"
                    value={businessInfo.email}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, email: v })}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    value={businessInfo.phone}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, phone: v })}
                    required
                  />
                  <InputField
                    label="Alternate Phone"
                    value={businessInfo.alternatePhone}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, alternatePhone: v })}
                  />
                  <InputField
                    label="Website"
                    value={businessInfo.website}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, website: v })}
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <InputField
                    label="City"
                    value={businessInfo.city}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, city: v })}
                  />
                  <InputField
                    label="State/Province"
                    value={businessInfo.state}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, state: v })}
                  />
                  <InputField
                    label="Postal Code"
                    value={businessInfo.postalCode}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, postalCode: v })}
                  />
                  <InputField
                    label="Country"
                    value={businessInfo.country}
                    onChange={(v) => setBusinessInfo({ ...businessInfo, country: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Branding & Description" icon={Image}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                        <Building2 className="w-10 h-10 text-gray-400" />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Description
                    </label>
                    <textarea
                      value={businessInfo.description}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Tell customers about your business..."
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mission Statement
                      </label>
                      <textarea
                        value={businessInfo.mission}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, mission: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Vision Statement
                      </label>
                      <textarea
                        value={businessInfo.vision}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, vision: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Core Values
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {businessInfo.values.map((value, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm flex items-center gap-2">
                          {value}
                          <button
                            onClick={() => {
                              const newValues = businessInfo.values.filter((_, i) => i !== index);
                              setBusinessInfo({ ...businessInfo, values: newValues });
                            }}
                            className="hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          const value = prompt('Enter a core value:');
                          if (value && value.trim()) {
                            setBusinessInfo({
                              ...businessInfo,
                              values: [...businessInfo.values, value.trim()]
                            });
                          }
                        }}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Value
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* Operating Hours */}
          {activeTab === 'hours' && (
            <SectionCard title="Business Hours" icon={Clock}>
              <div className="space-y-4">
                {operatingHours.map((hour, index) => (
                  <div key={hour.day} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="w-28 font-medium text-gray-700 dark:text-gray-300">{hour.day}</div>
                    {hour.closed ? (
                      <div className="flex-1 text-gray-500">Closed</div>
                    ) : (
                      <div className="flex-1 flex gap-3">
                        <input
                          type="time"
                          value={hour.open}
                          onChange={(e) => updateOperatingHour(index, 'open', e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={hour.close}
                          onChange={(e) => updateOperatingHour(index, 'close', e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                        />
                      </div>
                    )}
                    <button
                      onClick={() => updateOperatingHour(index, 'closed', !hour.closed)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        hour.closed
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {hour.closed ? 'Mark Open' : 'Mark Closed'}
                    </button>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    These hours will be displayed on your storefront and affect order processing times.
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Tax Settings */}
          {activeTab === 'tax' && (
            <SectionCard title="Tax Configuration" icon={Percent}>
              <div className="space-y-6">
                <Switch
                  label="Enable VAT/GST Tax"
                  description="Apply tax to all eligible products and services"
                  enabled={taxSettings.enableVat}
                  onChange={(val) => setTaxSettings({ ...taxSettings, enableVat: val })}
                />
                {taxSettings.enableVat && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField
                        label="Tax Rate (%)"
                        type="number"
                        value={taxSettings.vatRate}
                        onChange={(v) => setTaxSettings({ ...taxSettings, vatRate: parseFloat(v) })}
                        helpText="Default tax rate applied to products"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tax Calculation Method
                        </label>
                        <select
                          value={taxSettings.taxCalculationMethod}
                          onChange={(e) => setTaxSettings({ ...taxSettings, taxCalculationMethod: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        >
                          <option value="line_item">Per Line Item</option>
                          <option value="cart_subtotal">Cart Subtotal</option>
                          <option value="cart_total">Cart Total</option>
                        </select>
                      </div>
                    </div>
                    <Switch
                      label="Prices are tax inclusive"
                      description="Display product prices including tax"
                      enabled={taxSettings.vatInclusive}
                      onChange={(val) => setTaxSettings({ ...taxSettings, vatInclusive: val })}
                    />
                    <Switch
                      label="Apply tax to shipping"
                      description="Charge tax on shipping costs"
                      enabled={taxSettings.shippingTaxable}
                      onChange={(val) => setTaxSettings({ ...taxSettings, shippingTaxable: val })}
                    />
                    <Switch
                      label="Show Tax ID on invoices"
                      description="Display your tax registration number on receipts"
                      enabled={taxSettings.taxIdDisplay}
                      onChange={(val) => setTaxSettings({ ...taxSettings, taxIdDisplay: val })}
                    />
                  </>
                )}
              </div>
            </SectionCard>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <>
              <SectionCard title="Shipping Configuration" icon={Truck}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <InputField
                      label="Free Shipping Threshold (KES)"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(v) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: parseFloat(v) })}
                      helpText="Orders above this amount get free shipping"
                    />
                    <InputField
                      label="Default Weight"
                      type="number"
                      value={shippingSettings.defaultWeight}
                      onChange={(v) => setShippingSettings({ ...shippingSettings, defaultWeight: parseFloat(v) })}
                      helpText="Default weight for products without weight"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight Unit
                      </label>
                      <select
                        value={shippingSettings.weightUnit}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, weightUnit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      >
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="lb">Pounds (lb)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Shipping Methods" icon={TruckIcon}>
                <div className="space-y-4">
                  {shippingSettings.shippingMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${method.enabled ? 'bg-green-500' : 'bg-gray-400'}`}
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.estimatedDays}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {method.cost === 0 ? 'Free' : `KES ${method.cost.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => toggleShippingMethod(method.id)}
                          className={`p-2 rounded-lg transition ${
                            method.enabled
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {method.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                        {shippingSettings.shippingMethods.filter(m => !m.name.includes('Pickup')).length > 1 && (
                          <button
                            onClick={() => setShowDeleteConfirm(method.id.toString())}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddShippingModal(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Shipping Method
                  </button>
                </div>
              </SectionCard>
            </>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <SectionCard title="Payment Methods" icon={CreditCard}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Switch
                    label="Cash on Delivery"
                    enabled={paymentSettings.enableCashOnDelivery}
                    onChange={(val) => setPaymentSettings({ ...paymentSettings, enableCashOnDelivery: val })}
                  />
                  <Switch
                    label="M-Pesa"
                    enabled={paymentSettings.enableMpesa}
                    onChange={(val) => setPaymentSettings({ ...paymentSettings, enableMpesa: val })}
                  />
                  <Switch
                    label="Card Payments"
                    enabled={paymentSettings.enableCardPayment}
                    onChange={(val) => setPaymentSettings({ ...paymentSettings, enableCardPayment: val })}
                  />
                  <Switch
                    label="Bank Transfer"
                    enabled={paymentSettings.enableBankTransfer}
                    onChange={(val) => setPaymentSettings({ ...paymentSettings, enableBankTransfer: val })}
                  />
                </div>

                {paymentSettings.enableMpesa && (
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <InputField
                      label="M-Pesa Paybill Number"
                      value={paymentSettings.mpesaPaybill}
                      onChange={(v) => setPaymentSettings({ ...paymentSettings, mpesaPaybill: v })}
                    />
                    <InputField
                      label="Account Number"
                      value={paymentSettings.mpesaAccountNo}
                      onChange={(v) => setPaymentSettings({ ...paymentSettings, mpesaAccountNo: v })}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <select
                      value={paymentSettings.currency}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="UGX">Ugandan Shilling (UGX)</option>
                      <option value="TZS">Tanzanian Shilling (TZS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Decimal Places
                    </label>
                    <select
                      value={paymentSettings.decimalPlaces}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, decimalPlaces: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="0">0 (e.g., 100)</option>
                      <option value="1">1 (e.g., 100.5)</option>
                      <option value="2">2 (e.g., 100.50)</option>
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <SectionCard title="Email & SMS Notifications" icon={Bell}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Switch
                    label="Order Confirmation"
                    description="Send email when order is placed"
                    enabled={notificationSettings.orderConfirmation}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, orderConfirmation: val })}
                  />
                  <Switch
                    label="Payment Received"
                    description="Send email when payment is confirmed"
                    enabled={notificationSettings.paymentReceived}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, paymentReceived: val })}
                  />
                  <Switch
                    label="Order Shipped"
                    description="Send email when order is shipped"
                    enabled={notificationSettings.orderShipped}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, orderShipped: val })}
                  />
                  <Switch
                    label="Order Delivered"
                    description="Send email when order is delivered"
                    enabled={notificationSettings.orderDelivered}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, orderDelivered: val })}
                  />
                  <Switch
                    label="Inventory Alerts"
                    description="Notify when stock is low"
                    enabled={notificationSettings.inventoryAlerts}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, inventoryAlerts: val })}
                  />
                  <Switch
                    label="Daily Sales Report"
                    description="Receive daily sales summary"
                    enabled={notificationSettings.dailySalesReport}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, dailySalesReport: val })}
                  />
                  <Switch
                    label="Weekly Summary"
                    description="Receive weekly performance summary"
                    enabled={notificationSettings.weeklySummary}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, weeklySummary: val })}
                  />
                  <Switch
                    label="SMS Notifications"
                    description="Send SMS for order updates"
                    enabled={notificationSettings.smsNotifications}
                    onChange={(val) => setNotificationSettings({ ...notificationSettings, smsNotifications: val })}
                  />
                </div>

                {notificationSettings.inventoryAlerts && (
                  <div className="mt-4">
                    <InputField
                      label="Low Stock Threshold"
                      type="number"
                      value={notificationSettings.lowStockThreshold}
                      onChange={(v) => setNotificationSettings({ ...notificationSettings, lowStockThreshold: parseInt(v) })}
                      helpText="Alert when stock falls below this number"
                    />
                  </div>
                )}

                {notificationSettings.smsNotifications && (
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <InputField
                      label="SMS API Key"
                      value={notificationSettings.smsApiKey}
                      onChange={(v) => setNotificationSettings({ ...notificationSettings, smsApiKey: v })}
                      type="password"
                    />
                    <InputField
                      label="SMS Sender ID"
                      value={notificationSettings.smsSenderId}
                      onChange={(v) => setNotificationSettings({ ...notificationSettings, smsSenderId: v })}
                    />
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <SectionCard title="Security Configuration" icon={Shield}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Switch
                    label="Two-Factor Authentication"
                    description="Require 2FA for admin accounts"
                    enabled={securitySettings.twoFactorAuth}
                    onChange={(val) => setSecuritySettings({ ...securitySettings, twoFactorAuth: val })}
                  />
                  <Switch
                    label="Require Email Verification"
                    description="Verify email before account activation"
                    enabled={securitySettings.requireEmailVerification}
                    onChange={(val) => setSecuritySettings({ ...securitySettings, requireEmailVerification: val })}
                  />
                  <div>
                    <InputField
                      label="Session Timeout (minutes)"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(v) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(v) })}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Max Login Attempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(v) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(v) })}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Password Expiry (days)"
                      type="number"
                      value={securitySettings.passwordExpiryDays}
                      onChange={(v) => setSecuritySettings({ ...securitySettings, passwordExpiryDays: parseInt(v) })}
                      helpText="0 = never expires"
                    />
                  </div>
                  <div>
                    <InputField
                      label="Audit Log Retention (days)"
                      type="number"
                      value={securitySettings.auditLogRetention}
                      onChange={(v) => setSecuritySettings({ ...securitySettings, auditLogRetention: parseInt(v) })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    IP Whitelist (Admin Access)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Enter IP address (e.g., 192.168.1.1)"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                    <button
                      onClick={addIpToWhitelist}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                      Add IP
                    </button>
                  </div>
                  <div className="space-y-2">
                    {securitySettings.ipWhitelist.map((ip) => (
                      <div key={ip} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <code className="text-sm">{ip}</code>
                        <button
                          onClick={() => removeIpFromWhitelist(ip)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {securitySettings.ipWhitelist.length === 0 && (
                      <p className="text-sm text-gray-500">No IP addresses whitelisted. All IPs can access admin area.</p>
                    )}
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Localization */}
          {activeTab === 'localization' && (
            <SectionCard title="Localization Settings" icon={Globe}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Default Language
                    </label>
                    <select
                      value={localizationSettings.language}
                      onChange={(e) => setLocalizationSettings({ ...localizationSettings, language: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select
                      value={localizationSettings.timezone}
                      onChange={(e) => setLocalizationSettings({ ...localizationSettings, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                      <option value="Africa/Johannesburg">South Africa Standard Time</option>
                      <option value="Africa/Cairo">Egypt Standard Time</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Format
                    </label>
                    <select
                      value={localizationSettings.dateFormat}
                      onChange={(e) => setLocalizationSettings({ ...localizationSettings, dateFormat: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time Format
                    </label>
                    <select
                      value={localizationSettings.timeFormat}
                      onChange={(e) => setLocalizationSettings({ ...localizationSettings, timeFormat: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <option value="12h">12-hour (2:30 PM)</option>
                      <option value="24h">24-hour (14:30)</option>
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}
        </div>
      </div>

      {/* Add Shipping Method Modal */}
      {showAddShippingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddShippingModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Shipping Method</h3>
            <div className="space-y-4">
              <InputField
                label="Method Name"
                value={newShippingMethod.name}
                onChange={(v) => setNewShippingMethod({ ...newShippingMethod, name: v })}
                placeholder="e.g., Overnight Delivery"
              />
              <InputField
                label="Cost (KES)"
                type="number"
                value={newShippingMethod.cost}
                onChange={(v) => setNewShippingMethod({ ...newShippingMethod, cost: parseFloat(v) })}
                placeholder="0 for free shipping"
              />
              <InputField
                label="Estimated Delivery"
                value={newShippingMethod.estimatedDays}
                onChange={(v) => setNewShippingMethod({ ...newShippingMethod, estimatedDays: v })}
                placeholder="e.g., 2-3 days"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddShippingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={addShippingMethod}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
              >
                Add Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Delete Shipping Method</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this shipping method? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteShippingMethod(parseInt(showDeleteConfirm));
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSettings;