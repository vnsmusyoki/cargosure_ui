import React, { useState, useEffect } from 'react';
import {
  MapPin, Truck, Eye, Smartphone, Link, Bell, TrendingUp, BarChart3, Camera,
  Users, FileText, Settings, Shield, Database, Zap, CheckCircle, ArrowRight,
  Star, Phone, Mail, Menu, X, Play, Send, ArrowUpRight, Radio, MessageSquare,
  Clock, AlertCircle, Wifi, WifiOff, MapPinCheck, Headphones, Download, Code2,
  RotateCcw, Smartphone as PhoneIcon, Globe, Computer, Fan,
  Moon, Sun
} from 'lucide-react';

// SVG Components
const MapIllustration = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full">
    <rect width="300" height="300" fill="none"/>
    <path d="M50 150 L250 150" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
    <path d="M150 50 L150 250" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
    <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.8"/>
    <circle cx="200" cy="120" r="8" fill="currentColor" opacity="0.8"/>
    <circle cx="150" cy="200" r="8" fill="currentColor" opacity="0.8"/>
    <path d="M100 100 Q150 110 200 120 Q175 160 150 200" stroke="currentColor" strokeWidth="3" fill="none"/>
    <g transform="translate(100, 100)">
      <rect x="-8" y="-8" width="16" height="16" fill="currentColor" opacity="0.9"/>
    </g>
  </svg>
);

const TruckIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    <rect width="300" height="200" fill="none"/>
    {/* Road */}
    <path d="M0 120 L300 120" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
    <path d="M0 125 L300 125" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="10,10"/>
    {/* Truck */}
    <g>
      {/* Cabin */}
      <rect x="30" y="80" width="40" height="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="45" cy="120" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Cargo box */}
      <rect x="75" y="75" width="80" height="45" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Back wheel */}
      <circle cx="155" cy="120" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Window */}
      <rect x="35" y="85" width="30" height="20" fill="currentColor" opacity="0.3"/>
      {/* Door */}
      <line x1="70" y1="80" x2="70" y2="115" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </g>
  </svg>
);

const PhoneIllustration = () => (
  <svg viewBox="0 0 200 300" className="w-full h-full">
    <rect width="200" height="300" fill="none"/>
    {/* Phone frame */}
    <rect x="30" y="20" width="140" height="260" rx="15" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Screen */}
    <rect x="35" y="30" width="130" height="240" fill="currentColor" opacity="0.05"/>
    {/* Status bar */}
    <rect x="35" y="30" width="130" height="25" fill="currentColor" opacity="0.1"/>
    <text x="100" y="50" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.5">9:41</text>
    {/* Content */}
    <circle cx="60" cy="80" r="12" fill="currentColor" opacity="0.4"/>
    <rect x="75" y="75" width="70" height="8" fill="currentColor" opacity="0.3"/>
    <rect x="75" y="88" width="50" height="4" fill="currentColor" opacity="0.2"/>
    {/* Loading indicator */}
    <circle cx="100" cy="140" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <path d="M115 140 A15 15 0 0 1 100 125" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Button */}
    <rect x="50" y="200" width="100" height="40" rx="8" fill="currentColor" opacity="0.2"/>
    <text x="100" y="228" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.6">Track Order</text>
  </svg>
);

const AnalyticsIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    <rect width="300" height="200" fill="none"/>
    {/* Axes */}
    <line x1="40" y1="160" x2="40" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    <line x1="40" y1="160" x2="280" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    {/* Bars */}
    <g opacity="0.7">
      <rect x="60" y="120" width="30" height="40" fill="currentColor"/>
      <rect x="100" y="90" width="30" height="70" fill="currentColor"/>
      <rect x="140" y="70" width="30" height="90" fill="currentColor"/>
      <rect x="180" y="80" width="30" height="80" fill="currentColor"/>
      <rect x="220" y="100" width="30" height="60" fill="currentColor"/>
    </g>
    {/* Legend */}
    <circle cx="50" cy="30" r="4" fill="currentColor" opacity="0.6"/>
    <text x="60" y="35" fontSize="10" fill="currentColor" opacity="0.6">Deliveries</text>
  </svg>
);

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [displayedStats, setDisplayedStats] = useState({ orders: 0, drivers: 0, regions: 0, uptime: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedStats(prev => ({
        orders: Math.min(prev.orders + Math.random() * 50, 1250),
        drivers: Math.min(prev.drivers + Math.random() * 5, 89),
        regions: Math.min(prev.regions + Math.random() * 2, 14),
        uptime: Math.min(prev.uptime + 0.1, 99.95)
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-white',
    bgSecondary: isDark ? 'bg-slate-900' : 'bg-slate-50',
    bgTertiary: isDark ? 'bg-slate-800' : 'bg-slate-100',
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    textTertiary: isDark ? 'text-slate-500' : 'text-slate-500',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    borderLight: isDark ? 'border-slate-700/50' : 'border-slate-300/50',
    card: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    cardHover: isDark ? 'hover:bg-slate-800/50 hover:border-slate-700' : 'hover:bg-slate-50 hover:border-slate-300',
    accent: 'text-blue-600',
    accentBg: isDark ? 'bg-blue-950' : 'bg-blue-50',
    accentBorder: isDark ? 'border-blue-800' : 'border-blue-200',
    button: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: isDark ? 'border-slate-700 text-white hover:bg-slate-800' : 'border-slate-300 text-slate-900 hover:bg-slate-100',
    navBg: isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200',
  };

  const coreFeatures = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      desc: "5-second GPS updates from dispatch to doorstep",
      badge: "Core"
    },
    {
      icon: Smartphone,
      title: "Customer Portal",
      desc: "WhatsApp & SMS tracking links - zero friction",
      badge: "Core"
    },
    {
      icon: Truck,
      title: "Driver Management",
      desc: "Assign, track, and communicate with drivers in real-time",
      badge: "Core"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      desc: "Auto notifications at pickup, in-transit, arriving, delivered",
      badge: "Core"
    },
    {
      icon: BarChart3,
      title: "Fleet Analytics",
      desc: "Driver scorecards, delivery metrics, efficiency insights",
      badge: "Growth"
    },
    {
      icon: Camera,
      title: "Proof of Delivery",
      desc: "GPS-stamped photos and signatures on every delivery",
      badge: "Growth"
    },
    {
      icon: TrendingUp,
      title: "Route Optimization",
      desc: "AI-powered multi-stop sequencing saves fuel & time",
      badge: "Growth"
    },
    {
      icon: FileText,
      title: "Invoicing & Payments",
      desc: "M-Pesa, MTN Money, and bank integration built-in",
      badge: "Growth"
    }
  ];

  const useCases = [
    {
      title: "Upcountry Wholesalers",
      desc: "From Kisumu to Nakuru, track bulk orders to small retailers",
      metric: "50+ deliveries/day"
    },
    {
      title: "FMCG Distributors",
      desc: "Real-time visibility across supermarkets, kiosks, and dukas",
      metric: "300+ active retailers"
    },
    {
      title: "Cold Chain Logistics",
      desc: "Temperature-controlled deliveries with compliance tracking",
      metric: "2-8°C monitoring"
    },
    {
      title: "E-Commerce Fulfillment",
      desc: "Handle same-day and next-day deliveries across Nairobi",
      metric: "Multi-stop optimization"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "KES 2,999",
      period: "/month",
      desc: "For small traders & solo distributors",
      features: [
        "Up to 20 deliveries/day",
        "1 vehicle tracking",
        "WhatsApp notifications",
        "Basic customer portal",
        "Mobile app (Android/iOS)",
        "Email support"
      ],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      name: "Professional",
      price: "KES 9,999",
      period: "/month",
      desc: "For growing distributors",
      features: [
        "Unlimited deliveries",
        "Up to 10 vehicles",
        "SMS & WhatsApp automation",
        "Advanced analytics",
        "Driver performance scoring",
        "Proof of delivery (photos)",
        "Priority support (24/7)",
        "Custom branding"
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      desc: "For large-scale operations",
      features: [
        "Unlimited everything",
        "Unlimited vehicles",
        "Temperature & humidity tracking",
        "Advanced route optimization",
        "API access & integrations",
        "Custom reports & dashboards",
        "Dedicated account manager",
        "SLA guarantees (99.9% uptime)"
      ],
      cta: "Schedule Demo",
      highlight: false
    }
  ];

  const marketData = [
    { label: "Traders in Kenya", value: "2.1M+", insight: "Small wholesalers & SMEs" },
    { label: "Failed Deliveries/Year", value: "~35%", insight: "Due to poor visibility" },
    { label: "Avg Last-Mile Cost", value: "35-55%", insight: "Of total transport cost" },
    { label: "Market Opportunity", value: "KES 50B+", insight: "TAM for logistics tech" }
  ];

  const integrations = [
    { name: "M-Pesa", icon: "💰" },
    { name: "Airtel Money", icon: "📱" },
    { name: "Google Maps", icon: "🗺️" },
    { name: "Twilio SMS", icon: "📧" },
    { name: "WhatsApp API", icon: "💬" },
    { name: "Shopify", icon: "🛒" }
  ];


  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>

      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 ${theme.accentBg} border ${theme.accentBorder} ${theme.accent} px-3 py-1 rounded-full text-sm font-medium`}>
                  <Radio className="w-4 h-4 animate-pulse" />
                  Live in Nairobi • Expanding to 14 regions
                </div>

                <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${theme.text}`}>
                  Track every delivery,
                  <span className={`block ${theme.accent}`}> eliminate uncertainty</span>
                </h1>

                <p className={`text-xl ${theme.textSecondary} leading-relaxed max-w-lg`}>
                  Real-time delivery visibility for upcountry traders and wholesalers. Give your customers Uber-like tracking. Take back control of your fleet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className={`${theme.button} px-8 py-4 rounded-xl transition font-semibold flex items-center justify-center gap-2 text-lg`}>
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className={`border ${theme.borderLight} ${theme.text} px-8 py-4 rounded-xl hover:${theme.bgSecondary} transition font-semibold flex items-center justify-center gap-2 text-lg`}>
                  <Play className="w-5 h-5" /> Watch 2-min Demo
                </button>
              </div>

              <div className={`flex items-center gap-6 pt-8 border-t ${theme.border}`}>
                <div>
                  <div className={`text-2xl font-bold ${theme.text}`}>{Math.floor(displayedStats.orders)}</div>
                  <div className={`text-sm ${theme.textTertiary}`}>Orders tracked today</div>
                </div>
                <div className={`w-px h-12 ${theme.borderLight}`} />
                <div>
                  <div className={`text-2xl font-bold ${theme.text}`}>{Math.floor(displayedStats.drivers)}</div>
                  <div className={`text-sm ${theme.textTertiary}`}>Active drivers</div>
                </div>
                <div className={`w-px h-12 ${theme.borderLight}`} />
                <div>
                  <div className={`text-2xl font-bold ${theme.text}`}>{displayedStats.uptime.toFixed(2)}%</div>
                  <div className={`text-sm ${theme.textTertiary}`}>System uptime</div>
                </div>
              </div>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="relative">
              <div className={`relative ${theme.bgTertiary} border ${theme.border} rounded-2xl overflow-hidden shadow-xl`}>
                {/* Browser Header */}
                <div className={`${isDark ? 'bg-slate-700' : 'bg-slate-200'} px-4 py-3 flex items-center gap-2 border-b ${theme.border}`}>
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={`text-xs ${theme.textTertiary} ml-2`}>dashboard.delivertrack.ke</span>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-lg font-bold ${theme.text}`}>Active Deliveries</h3>
                      <p className={`text-sm ${theme.textTertiary} mt-1`}>Real-time across all regions</p>
                    </div>
                    <div className="flex gap-2">
                      <div className={`px-3 py-1 ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'} text-xs rounded-full flex items-center gap-1`}>
                        <Radio className="w-3 h-3 animate-pulse" /> Live
                      </div>
                    </div>
                  </div>

                  {/* Active Deliveries List */}
                  <div className="space-y-3">
                    {[
                      { driver: "James Mwangi", order: "ORD-2341", eta: "8 min", progress: 75, region: "Nairobi Central" },
                      { driver: "Sarah Wanjiru", order: "ORD-2342", eta: "15 min", progress: 50, region: "Westlands" },
                      { driver: "Peter Omondi", order: "ORD-2343", eta: "23 min", progress: 30, region: "Karen" }
                    ].map((delivery, i) => (
                      <div key={i} className={`${theme.card} rounded-lg p-3 transition`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
                              <Truck className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className={`font-medium text-sm ${theme.text}`}>{delivery.driver}</div>
                              <div className={`text-xs ${theme.textTertiary}`}>{delivery.order}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${theme.accent}`}>{delivery.eta}</div>
                            <div className={`text-xs ${theme.textTertiary}`}>{delivery.region}</div>
                          </div>
                        </div>
                        <div className={`w-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'} rounded h-1.5`}>
                          <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded h-full`} style={{ width: `${delivery.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className={`grid grid-cols-3 gap-3 pt-4 border-t ${theme.border}`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme.accent}`}>12</div>
                      <div className={`text-xs ${theme.textTertiary}`}>In Transit</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-green-600`}>24</div>
                      <div className={`text-xs ${theme.textTertiary}`}>Completed</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-orange-600`}>2</div>
                      <div className={`text-xs ${theme.textTertiary}`}>Delayed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className={`absolute -bottom-6 -right-6 ${theme.bgTertiary} border ${theme.border} rounded-lg p-4 shadow-xl max-w-xs animate-bounce`}>
                <div className="flex items-start gap-3">
                  <MessageSquare className={`w-5 h-5 ${theme.accent} flex-shrink-0 mt-0.5`} />
                  <div className="text-sm">
                    <p className={`font-medium ${theme.text}`}>Order #ORD-2341 arriving in 8 min</p>
                    <p className={`${theme.textTertiary} text-xs mt-1`}>Driver: James M. • Nairobi Central</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 border-y ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Why now? Kenya's market is ready</h2>
            <p className={theme.textSecondary}>The numbers show a massive opportunity</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketData.map((item, i) => (
              <div key={i} className={`${theme.card} rounded-lg p-6 transition`}>
                <div className={`text-3xl font-bold ${theme.accent} mb-2`}>
                  {item.value}
                </div>
                <div className={`font-semibold text-sm mb-2 ${theme.text}`}>{item.label}</div>
                <div className={`text-xs ${theme.textTertiary}`}>{item.insight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 ${theme.accentBg} border ${theme.accentBorder} ${theme.accent} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
              <Zap className="w-4 h-4" />
              Complete Feature Set
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.text}`}>Everything you need in one platform</h2>
            <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
              Built specifically for African distributors. No complexity. Pure functionality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, i) => (
              <div
                key={i}
                className={`group ${theme.card} rounded-xl p-6 transition ${theme.cardHover}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${theme.accentBg} rounded-lg flex items-center justify-center transition`}>
                    <feature.icon className={`w-6 h-6 ${theme.accent}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 ${isDark ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className={`font-bold text-lg ${theme.text} mb-2`}>{feature.title}</h3>
                <p className={`${theme.textSecondary} text-sm`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-green-950' : 'bg-green-100'} border ${isDark ? 'border-green-800' : 'border-green-300'} ${isDark ? 'text-green-300' : 'text-green-700'} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
              <Users className="w-4 h-4" />
              Built for Your Business
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.text}`}>Who succeeds with DeliverTrack</h2>
            <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
              From Kisumu to Mombasa, distributors are already saving time and money
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl p-8 border ${theme.border} transition`}
              >
                <div className={`absolute inset-0 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'} group-hover:opacity-75 transition`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-2xl font-bold ${theme.text}`}>{useCase.title}</h3>
                    <ArrowUpRight className={`w-5 h-5 ${theme.textTertiary} transition`} />
                  </div>
                  <p className={`${theme.textSecondary} mb-6`}>{useCase.desc}</p>
                  <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} px-3 py-1 rounded-full`}>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className={`text-sm font-medium ${theme.text}`}>{useCase.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${theme.text}`}>How it works in 4 steps</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Add Order", desc: "Create order or import from CSV", icon: FileText },
              { step: 2, title: "Assign Driver", desc: "Send to driver's phone instantly", icon: Send },
              { step: 3, title: "Customer Gets Link", desc: "WhatsApp tracking link auto-sent", icon: MessageSquare },
              { step: 4, title: "Complete Delivery", desc: "Signature + photo proof", icon: CheckCircle }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className={`${theme.card} rounded-xl p-6 text-center transition`}>
                  <div className={`w-12 h-12 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold`}>
                    {item.step}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${theme.text}`}>{item.title}</h3>
                  <p className={`${theme.textSecondary} text-sm`}>{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-purple-950' : 'bg-purple-100'} border ${isDark ? 'border-purple-800' : 'border-purple-300'} ${isDark ? 'text-purple-300' : 'text-purple-700'} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
              <BarChart3 className="w-4 h-4" />
              Simple, transparent pricing
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.text}`}>Plans for every distributor</h2>
            <p className={theme.textSecondary}>No surprises. No long contracts. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border transition-all ${
                  plan.highlight
                    ? `${isDark ? 'bg-blue-950/30 border-blue-800' : 'bg-blue-50 border-blue-300'} scale-105 shadow-lg`
                    : `${theme.card} ${theme.cardHover}`
                } p-8`}
              >
                {plan.highlight && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>{plan.name}</h3>
                  <p className={`${theme.textSecondary} text-sm mb-4`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${theme.text}`}>{plan.price}</span>
                    <span className={theme.textSecondary}>{plan.period}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                    plan.highlight
                      ? `${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`
                      : `border ${theme.borderLight} ${theme.text} hover:${theme.bgSecondary}`
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${theme.text}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 ${theme.bgSecondary} border ${theme.border} rounded-xl p-8 text-center`}>
            <p className={`${theme.text} mb-4`}>
              <strong>Early bird offer:</strong> Get 50% off for the first 3 months + free onboarding
            </p>
            <p className={`text-sm ${theme.textTertiary}`}>Limited to first 100 distributors. Valid until June 30, 2024.</p>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Works with what you already use</h2>
          <p className={`${theme.textSecondary} mb-12`}>Seamless integrations with popular payment and communication platforms</p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {integrations.map((integration, i) => (
              <div key={i} className={`${theme.card} rounded-lg p-6 flex flex-col items-center justify-center transition ${theme.cardHover}`}>
                <div className="text-4xl mb-2">{integration.icon}</div>
                <div className={`text-sm font-medium ${theme.text}`}>{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-purple-950' : 'bg-purple-100'} border ${isDark ? 'border-purple-800' : 'border-purple-300'} ${isDark ? 'text-purple-300' : 'text-purple-700'} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
              <Clock className="w-4 h-4" />
              Product Roadmap
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${theme.text}`}>From MVP to Market Leader</h2>
            <p className={theme.textSecondary}>90-day sprint. Then scaling nationwide.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: "Phase 1: MVP",
                timeline: "Apr - Jun 2024",
                items: [
                  "Order Management",
                  "Real-time GPS Tracking",
                  "Driver App (Android/iOS)",
                  "Customer Portal",
                  "WhatsApp Integration",
                  "Proof of Delivery"
                ]
              },
              {
                phase: "Phase 2: Scale",
                timeline: "Jul - Sep 2024",
                items: [
                  "Route Optimization",
                  "Temperature Monitoring",
                  "Advanced Analytics",
                  "SMS Notifications",
                  "Bulk Order Import",
                  "Driver Scorecards"
                ]
              },
              {
                phase: "Phase 3: Dominate",
                timeline: "Oct - Dec 2024",
                items: [
                  "Nationwide Expansion",
                  "API Access",
                  "Shopify Integration",
                  "Insurance Partnerships",
                  "B2B Marketplace",
                  "Financing Solutions"
                ]
              }
            ].map((phase, i) => (
              <div key={i} className={`${theme.card} rounded-xl p-8 transition ${theme.cardHover}`}>
                <div className={`text-blue-600 text-sm font-bold mb-2`}>{phase.timeline}</div>
                <h3 className={`text-2xl font-bold mb-6 ${theme.text}`}>{phase.phase}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className={`flex items-center gap-3 ${theme.textSecondary}`}>
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme.text}`}>Trusted by Kenyan distributors</h2>
            <p className={theme.textSecondary}>Real feedback from real users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "My phone calls dropped by 70%. Customers track their own orders now.",
                author: "James Kipchoge",
                role: "FMCG Distributor, Nairobi",
                region: "Nairobi"
              },
              {
                quote: "For the first time, I know exactly where my drivers are. This is a game-changer.",
                author: "Mary Wanjiru",
                role: "Wholesaler, Kisumu",
                region: "Kisumu"
              },
              {
                quote: "Simple to use, affordable, and it actually solves our real problems.",
                author: "Peter Omondi",
                role: "Logistics Manager, Mombasa",
                region: "Mombasa"
              }
            ].map((testimonial, i) => (
              <div key={i} className={`${theme.card} rounded-xl p-8 transition ${theme.cardHover}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className={`${theme.textSecondary} italic mb-6`}>"{testimonial.quote}"</p>
                <div className={`pt-6 border-t ${theme.border}`}>
                  <div className={`font-bold ${theme.text}`}>{testimonial.author}</div>
                  <div className={`text-sm ${theme.textTertiary}`}>{testimonial.role}</div>
                  <div className={`text-xs text-blue-600 mt-2`}>• {testimonial.region}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 border-t ${theme.border}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-5xl font-bold mb-6 ${theme.text}`}>
            Ready to take control of your deliveries?
          </h2>
          <p className={`text-xl ${theme.textSecondary} mb-8`}>
            Join 500+ distributors across Kenya already saving time and money.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${theme.button} px-8 py-4 rounded-xl transition font-semibold text-lg`}>
              Get Started Free (14 Days)
            </button>
            <button className={`border ${theme.borderLight} ${theme.text} px-8 py-4 rounded-xl hover:${theme.bgSecondary} transition font-semibold text-lg flex items-center justify-center gap-2`}>
              <Phone className="w-5 h-5" /> Schedule Call
            </button>
          </div>

          <p className={`${theme.textTertiary} text-sm mt-6`}>No credit card required • Cancel anytime • Support in Swahili & English</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${theme.border} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          {/* Footer Content Grid */}
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded-lg p-1`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-lg ${theme.text}`}>DeliverTrack</span>
              </div>
              <p className={`${theme.textSecondary} text-sm mb-6`}>Real-time delivery visibility for African distributors. Empowering traders across Kenya with technology that works.</p>
              <div className="flex gap-3">
                <a href="#" className={`w-8 h-8 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center hover:text-blue-600 transition`}>
                  <X className="w-4 h-4" />
                </a>
                <a href="#" className={`w-8 h-8 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center hover:text-blue-600 transition`}>
                  <X className="w-4 h-4" />
                </a>
                <a href="#" className={`w-8 h-8 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center hover:text-blue-600 transition`}>
                  <Fan className="w-4 h-4" />
                </a>
                <a href="#" className={`w-8 h-8 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center hover:text-blue-600 transition`}>
                  <Computer className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className={`font-bold mb-4 ${theme.text}`}>Product</h4>
              <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
                <li><a href="#features" className={`hover:${theme.text} transition`}>Features</a></li>
                <li><a href="#pricing" className={`hover:${theme.text} transition`}>Pricing</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Integrations</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Demo</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>API Docs</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className={`font-bold mb-4 ${theme.text}`}>Company</h4>
              <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
                <li><a href="#" className={`hover:${theme.text} transition`}>About Us</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Blog</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Careers</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Press</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Partners</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className={`font-bold mb-4 ${theme.text}`}>Resources</h4>
              <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
                <li><a href="#" className={`hover:${theme.text} transition`}>Documentation</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Help Center</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Community</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Status Page</a></li>
                <li><a href="#" className={`hover:${theme.text} transition`}>Downloads</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className={`font-bold mb-4 ${theme.text}`}>Get in Touch</h4>
              <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hello@delivertrack.ke" className={`hover:${theme.text} transition`}>hello@delivertrack.ke</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+254700123456" className={`hover:${theme.text} transition`}>+254 700 123 456</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Nairobi, Kenya<br/>Serving 14+ regions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={`${theme.bgSecondary} border ${theme.border} rounded-xl p-8 mb-12`}>
            <div className="max-w-2xl">
              <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Stay Updated</h3>
              <p className={`${theme.textSecondary} mb-6`}>Get the latest updates on new features, best practices for delivery optimization, and industry insights.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`flex-1 px-4 py-3 rounded-lg ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'} border ${theme.text} placeholder-${theme.textTertiary}`}
                />
                <button className={`${theme.button} px-6 py-3 rounded-lg font-medium transition`}>
                  Subscribe
                </button>
              </div>
              <p className={`text-xs ${theme.textTertiary} mt-3`}>We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={`border-t ${theme.border} pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className={`text-sm ${theme.textTertiary}`}>
                &copy; 2024 DeliverTrack. All rights reserved. Built for Kenyan traders and distributors.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className={`${theme.textSecondary} hover:${theme.text} transition`}>Privacy Policy</a>
                <a href="#" className={`${theme.textSecondary} hover:${theme.text} transition`}>Terms of Service</a>
                <a href="#" className={`${theme.textSecondary} hover:${theme.text} transition`}>Security</a>
                <a href="#" className={`${theme.textSecondary} hover:${theme.text} transition`}>Compliance</a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`mt-8 p-4 ${theme.accentBg} border ${theme.accentBorder} rounded-lg`}>
            <p className={`text-sm ${theme.accent} text-center`}>
              <strong>🚀 Beta Launch:</strong> Early adopters get 50% lifetime discount + exclusive features. Limited to 100 distributors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;