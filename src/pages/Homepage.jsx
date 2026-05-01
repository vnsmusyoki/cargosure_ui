import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  MapPin, Truck, Eye, Smartphone, Link, Bell, TrendingUp, BarChart3, Camera,
  Users, FileText, Settings, Shield, Database, Zap, CheckCircle, ArrowRight,
  Star, Phone, Mail, Play, Send, ArrowUpRight, Radio, MessageSquare,
  Clock, AlertCircle, Wifi, WifiOff, MapPinCheck, Headphones, Download, Code2,
  RotateCcw, Smartphone as PhoneIcon, Globe, Computer, Fan,
  Sparkles, Award, Target, Rocket, Navigation, Package, Clock3,
  BadgeCheck, Layers, CreditCard, ShieldCheck, ThumbsUp, ChartNoAxesCombined,
  Waypoints, Timer, CircleCheckBig, TruckIcon, UserRound, Building2, Check,
  ChevronRight, ExternalLink, Gauge, Leaf, HeartHandshake
} from 'lucide-react';

// ==================== CUSTOM ILLUSTRATIONS ====================
const HeroDashboard = ({ isDark }) => (
  <svg viewBox="0 0 560 420" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
        <feMerge><feMergeNode in="offsetblur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    
    {/* Main card background */}
    <rect x="20" y="20" width="520" height="380" rx="24" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="1.5" />
    
    {/* Header bar */}
    <rect x="20" y="20" width="520" height="52" rx="24" fill={isDark ? "#1e293b" : "#f8fafc"} />
    <circle cx="44" cy="46" r="7" fill="#ef4444" />
    <circle cx="62" cy="46" r="7" fill="#f59e0b" />
    <circle cx="80" cy="46" r="7" fill="#10b981" />
    <text x="220" y="51" fontSize="13" fill={isDark ? "#94a3b8" : "#64748b"} fontFamily="monospace" fontWeight="500">track.delivertrack.ke/live</text>
    <rect x="460" y="38" width="56" height="16" rx="8" fill="#3b82f6" opacity="0.15" />
    <circle cx="484" cy="46" r="4" fill="#3b82f6">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
    
    {/* Side menu */}
    <rect x="20" y="72" width="100" height="328" fill={isDark ? "#0f172a" : "#ffffff"} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x="36" y={88 + i * 44} width="68" height="32" rx="8" fill={i === 0 ? (isDark ? "#1e293b" : "#f1f5f9") : (isDark ? "#0f172a" : "transparent")} stroke={i === 0 ? "#3b82f6" : "none"} strokeWidth="1.5" />
    ))}
    
    {/* Main content area */}
    <rect x="136" y="80" width="388" height="24" rx="6" fill={isDark ? "#1e293b" : "#f1f5f9"} />
    <rect x="136" y="116" width="388" height="160" rx="12" fill="url(#heroGrad)" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="1" />
    
    {/* Map visualization */}
    <path d="M160 180 L500 180" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="6,4" />
    <path d="M280 140 L280 260" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="1.5" strokeDasharray="6,4" />
    
    {/* Delivery points */}
    <circle cx="210" cy="200" r="10" fill="#3b82f6" opacity="0.2" />
    <circle cx="210" cy="200" r="6" fill="#3b82f6" />
    <text x="225" y="204" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>Pickup</text>
    
    <circle cx="380" cy="230" r="10" fill="#10b981" opacity="0.2" />
    <circle cx="380" cy="230" r="6" fill="#10b981" />
    <text x="395" y="234" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>Delivery</text>
    
    <circle cx="300" cy="170" r="8" fill="#f59e0b" opacity="0.2" />
    <circle cx="300" cy="170" r="5" fill="#f59e0b" />
    
    {/* Route line with animation */}
    <path d="M210 200 Q260 180 300 170 Q340 190 380 230" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeDasharray="6,4" opacity="0.8" />
    
    {/* Animated truck */}
    <g>
      <animateMotion dur="6s" repeatCount="indefinite" path="M210 200 Q260 180 300 170 Q340 190 380 230" />
      <rect x="-12" y="-8" width="20" height="14" rx="3" fill="#3b82f6" />
      <circle cx="-4" cy="8" r="5" fill="#1e293b" />
      <circle cx="8" cy="8" r="5" fill="#1e293b" />
    </g>
    
    {/* Bottom stats */}
    <rect x="136" y="292" width="120" height="56" rx="10" fill={isDark ? "#1e293b" : "#ffffff"} stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="1" />
    <text x="156" y="318" fontSize="22" fontWeight="bold" fill="#3b82f6">98.5%</text>
    <text x="156" y="336" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>On-time rate</text>
    
    <rect x="270" y="292" width="120" height="56" rx="10" fill={isDark ? "#1e293b" : "#ffffff"} stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="1" />
    <text x="290" y="318" fontSize="22" fontWeight="bold" fill="#10b981">285</text>
    <text x="290" y="336" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>Today's deliveries</text>
    
    <rect x="404" y="292" width="120" height="56" rx="10" fill={isDark ? "#1e293b" : "#ffffff"} stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="1" />
    <text x="424" y="318" fontSize="22" fontWeight="bold" fill="#f59e0b">12min</text>
    <text x="424" y="336" fontSize="10" fill={isDark ? "#94a3b8" : "#64748b"}>Avg. ETA</text>
  </svg>
);

// ==================== MAIN COMPONENT ====================
const HomePage = () => {
  const { isDark } = useTheme();
  const [displayedStats, setDisplayedStats] = useState({ deliveries: 0, satisfaction: 0, time: 0, drivers: 0 });

  // Animated stats counter
  useEffect(() => {
    const targets = { deliveries: 15420, satisfaction: 98, time: 67, drivers: 245 };
    const duration = 2500;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - progress, 1.5);

      setDisplayedStats({
        deliveries: Math.floor(targets.deliveries * easeOut),
        satisfaction: Math.floor(targets.satisfaction * easeOut),
        time: Math.floor(targets.time * easeOut),
        drivers: Math.floor(targets.drivers * easeOut)
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // Theme-aware styling
  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-white',
    bgSecondary: isDark ? 'bg-slate-900' : 'bg-slate-50',
    bgTertiary: isDark ? 'bg-slate-800/60' : 'bg-slate-100/80',
    bgCard: isDark ? 'bg-slate-900/80' : 'bg-white/80',
    text: isDark ? 'text-slate-100' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    textMuted: isDark ? 'text-slate-500' : 'text-slate-400',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    borderLight: isDark ? 'border-slate-700/50' : 'border-slate-300/50',
    glass: isDark ? 'bg-slate-900/70 backdrop-blur-xl border-slate-800' : 'bg-white/70 backdrop-blur-xl border-slate-200',
    card: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    cardHover: isDark ? 'hover:bg-slate-800/80 hover:border-slate-700' : 'hover:bg-slate-50 hover:border-slate-300',
    accent: 'text-blue-500',
    accentBg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
    accentBorder: isDark ? 'border-blue-500/20' : 'border-blue-200',
    buttonPrimary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300',
    buttonSecondary: `border ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'} transition-all duration-300`,
  };

  const features = [
    { icon: MapPin, title: "Live GPS Tracking", description: "5-second updates with driver location, ETA, and route visualization on an interactive map.", badge: "Real-time", color: "blue" },
    { icon: Smartphone, title: "Customer Portal", description: "WhatsApp & SMS tracking links — customers track deliveries without any app install.", badge: "Frictionless", color: "green" },
    { icon: Camera, title: "Proof of Delivery", description: "Geotagged photos, e-signatures, and timestamps for every delivery stop.", badge: "Secure", color: "purple" },
    { icon: Bell, title: "Smart Notifications", description: "Automated alerts at pickup, in-transit, approaching, and delivered status.", badge: "Automated", color: "amber" },
    { icon: TrendingUp, title: "Route Optimization", description: "AI-powered multi-stop sequencing reduces fuel costs by up to 28%.", badge: "AI-Powered", color: "brand" },
    { icon: BarChart3, title: "Fleet Analytics", description: "Driver scorecards, delivery metrics, cost analysis, and efficiency insights.", badge: "Insights", color: "cyan" },
    { icon: Shield, title: "Geofencing", description: "Virtual boundaries with instant alerts when vehicles enter or exit zones.", badge: "Security", color: "red" },
    { icon: FileText, title: "Smart Invoicing", description: "Auto-generate invoices, payment reconciliation with M-Pesa integration.", badge: "Finance", color: "teal" }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "KES 2,999",
      period: "/month",
      description: "Perfect for small businesses and solo distributors",
      features: ["Up to 50 deliveries/day", "2 vehicles tracked", "WhatsApp notifications", "Basic customer portal", "Email support (48hr response)", "Mobile app access"],
      cta: "Start Free Trial",
      highlighted: false,
      savings: null
    },
    {
      name: "Professional",
      price: "KES 9,999",
      period: "/month",
      description: "For growing logistics teams and distributors",
      features: ["Unlimited deliveries", "Up to 15 vehicles", "SMS + WhatsApp automation", "Advanced analytics dashboard", "Proof of delivery (photos + sig)", "Driver performance scoring", "Priority 24/7 support", "Custom branding", "API access"],
      cta: "Start Free Trial",
      highlighted: true,
      savings: "Save 20% annually"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale fleet operations",
      features: ["Unlimited vehicles & deliveries", "Temperature/humidity tracking", "Full API access & webhooks", "White-label options", "Dedicated account manager", "SLA guarantees (99.9% uptime)", "On-premise deployment", "Custom integrations", "24/7 phone support"],
      cta: "Contact Sales",
      highlighted: false,
      savings: null
    }
  ];

  const testimonials = [
    { 
      quote: "DeliverTrack transformed our last-mile operations. Failed deliveries dropped by 76% and our customers love the real-time tracking links. Best logistics investment we've made.", 
      name: "Grace Muthoni", 
      role: "Operations Director", 
      company: "FreshLink Distributors",
      rating: 5, 
      region: "Nairobi",
      imageInitial: "G"
    },
    { 
      quote: "The route optimization feature alone saved us over KES 45,000 in fuel costs last month. Finally, a logistics platform that understands Kenyan roads and challenges.", 
      name: "Daniel Kipruto", 
      role: "Fleet Manager", 
      company: "Rift Valley Supplies",
      rating: 5, 
      region: "Eldoret",
      imageInitial: "D"
    },
    { 
      quote: "Simple, reliable, and the support team is exceptional. We've scaled from 5 to 25 drivers in 8 months, and DeliverTrack has grown with us every step.", 
      name: "Aisha Juma", 
      role: "Owner", 
      company: "Coastal Traders",
      rating: 5, 
      region: "Mombasa",
      imageInitial: "A"
    }
  ];

  const integrations = [
    { name: "M-Pesa", icon: "💳", color: "from-green-500 to-green-600" },
    { name: "Airtel Money", icon: "📱", color: "from-red-500 to-red-600" },
    { name: "Google Maps", icon: "🗺️", color: "from-blue-400 to-blue-600" },
    { name: "WhatsApp API", icon: "💬", color: "from-green-400 to-green-600" },
    { name: "Twilio", icon: "📧", color: "from-red-400 to-red-600" },
    { name: "Shopify", icon: "🛒", color: "from-emerald-500 to-teal-600" },
    { name: "SAP", icon: "🏢", color: "from-blue-600 to-brand-600" },
    { name: "Oracle", icon: "🗄️", color: "from-red-600 to-orange-600" }
  ];

  return (
    <div className={`${theme.bg} transition-colors duration-300 min-h-screen antialiased`}>
      {/* ========== HERO SECTION ========== */}
      <section id="hero" className={`relative pt-12 lg:pt-16 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden ${theme.bg}`}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">Trusted by 1,200+ Kenyan distributors</span>
              </div>

              {/* Headline */}
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-tight ${theme.text}`}>
                Track every delivery,
                <span className="block bg-gradient-to-r from-blue-600 via-brand-500 to-purple-600 bg-clip-text text-transparent mt-2">
                  eliminate uncertainty
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg lg:text-xl ${theme.textSecondary} max-w-lg leading-relaxed`}>
                Real-time delivery visibility for African logistics. Give your customers Uber-like tracking. 
                Reduce failed deliveries by up to 80% and optimize your fleet operations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className={`${theme.buttonPrimary} px-8 py-4 rounded-xl font-semibold flex items-center gap-2 text-base shadow-xl`}>
                  Start 14-day free trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className={`${theme.buttonSecondary} px-8 py-4 rounded-xl font-semibold flex items-center gap-2`}>
                  <Play className="w-5 h-5" /> Watch demo (2 min)
                </button>
              </div>

              {/* Stats Row */}
              <div className={`flex items-center gap-8 pt-8 border-t ${theme.border}`}>
                <div>
                  <div className={`text-3xl font-bold ${theme.text}`}>{displayedStats.deliveries.toLocaleString()}+</div>
                  <div className={`text-sm ${theme.textMuted}`}>Deliveries completed</div>
                </div>
                <div className={`w-px h-10 ${theme.borderLight}`} />
                <div>
                  <div className={`text-3xl font-bold text-green-500`}>{displayedStats.satisfaction}%</div>
                  <div className={`text-sm ${theme.textMuted}`}>Satisfaction rate</div>
                </div>
                <div className={`w-px h-10 ${theme.borderLight}`} />
                <div>
                  <div className={`text-3xl font-bold text-amber-500`}>-{displayedStats.time}%</div>
                  <div className={`text-sm ${theme.textMuted}`}>Cost reduction</div>
                </div>
              </div>
            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-brand-600/30 rounded-3xl blur-2xl" />
              <div className="relative transform hover:scale-[1.02] transition-all duration-500">
                <HeroDashboard isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className={`py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className={`inline-flex items-center gap-2 ${theme.accentBg} border ${theme.accentBorder} rounded-full px-4 py-1.5 mb-6`}>
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">Complete Feature Set</span>
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-5 ${theme.text}`}>
              Everything you need to master logistics
            </h2>
            <p className={`text-lg ${theme.textSecondary}`}>
              Built specifically for African supply chains — enterprise-grade features, simple interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group ${theme.card} rounded-2xl p-6 transition-all duration-300 ${theme.cardHover} card-hover-effect`}
              >
                <div className="mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${theme.text}`}>{feature.title}</h3>
                <p className={`${theme.textSecondary} text-sm leading-relaxed`}>{feature.description}</p>
                <span className={`inline-block mt-4 text-xs font-medium px-2 py-1 rounded-full ${theme.accentBg} text-blue-500`}>
                  {feature.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS / TRUST SECTION ========== */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 border-y ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-black ${theme.accent} mb-2`}>1,200+</div>
              <div className={`font-semibold ${theme.text}`}>Active Businesses</div>
              <div className={`text-sm ${theme.textMuted}`}>Across Kenya</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black text-green-500 mb-2`}>98.5%</div>
              <div className={`font-semibold ${theme.text}`}>On-Time Delivery</div>
              <div className={`text-sm ${theme.textMuted}`}>Industry leading</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black text-amber-500 mb-2`}>-76%</div>
              <div className={`font-semibold ${theme.text}`}>Failed Deliveries</div>
              <div className={`text-sm ${theme.textMuted}`}>Average reduction</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black text-purple-500 mb-2`}>45k+</div>
              <div className={`font-semibold ${theme.text}`}>Hours Saved</div>
              <div className={`text-sm ${theme.textMuted}`}>Annually by customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className={`py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-5 ${theme.text}`}>How DeliverTrack works</h2>
            <p className={`text-lg ${theme.textSecondary}`}>Four simple steps to logistics excellence</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Add Order", description: "Create orders manually or import via CSV/API", icon: FileText, color: "blue" },
              { step: "02", title: "Assign Driver", description: "Route automatically optimized and sent to driver's app", icon: Send, color: "green" },
              { step: "03", title: "Customer Notified", description: "WhatsApp/SMS tracking link sent automatically", icon: MessageSquare, color: "amber" },
              { step: "04", title: "Proof of Delivery", description: "Photo, signature, and timestamp captured", icon: CheckCircle, color: "purple" }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`${theme.card} rounded-2xl p-6 text-center transition-all hover:scale-105 duration-300`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {idx + 1}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${theme.text}`}>{item.title}</h3>
                  <p className={`${theme.textSecondary} text-sm`}>{item.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" className={`py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-500 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" /> Simple, transparent pricing            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme.text}`}>Choose the perfect plan</h2>
            <p className={`text-lg ${theme.textSecondary}`}>Start free, upgrade as you grow — cancel anytime, no questions asked.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl transition-all duration-300 ${
                  plan.highlighted 
                    ? `border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 ${isDark ? 'bg-slate-900' : 'bg-white'}` 
                    : `${theme.card} border ${theme.border}`
                } p-8 ${plan.highlighted ? 'lg:scale-105' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-brand-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                    🌟 Most Popular
                  </div>
                )}
                {plan.savings && (
                  <div className="absolute top-6 right-6 bg-green-500/10 text-green-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {plan.savings}
                  </div>
                )}
                <h3 className={`text-2xl font-bold ${theme.text}`}>{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className={`text-4xl font-black ${theme.text}`}>{plan.price}</span>
                  <span className={theme.textMuted}>{plan.period}</span>
                </div>
                <p className={`${theme.textSecondary} text-sm mb-6`}>{plan.description}</p>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all mb-8 ${
                  plan.highlighted 
                    ? theme.buttonPrimary 
                    : `border ${theme.borderLight} ${theme.text} hover:${theme.bgSecondary}`
                }`}>
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={theme.textSecondary}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center ${theme.bgTertiary} rounded-2xl p-6 border ${theme.borderLight}`}>
            <p className={`${theme.textSecondary} text-sm`}>
              🚀 <span className="font-semibold">Early bird special:</span> First 100 customers get 40% off for first 6 months + free onboarding session.
            </p>
          </div>
        </div>
      </section>

      {/* ========== INTEGRATIONS ========== */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme.text}`}>Works with your existing tools</h2>
          <p className={`${theme.textSecondary} mb-12 max-w-2xl mx-auto`}>
            Seamless integration with popular payment platforms, communication tools, and e-commerce systems.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((integration, idx) => (
              <div key={idx} className={`${theme.card} rounded-xl p-4 flex flex-col items-center justify-center transition-all hover:scale-105 duration-200 ${theme.cardHover}`}>
                <div className="text-3xl mb-2">{integration.icon}</div>
                <div className={`text-sm font-medium ${theme.text}`}>{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" className={`py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-amber-500" /> Trusted by industry leaders
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${theme.text}`}>What our customers say</h2>
            <p className={`text-lg ${theme.textSecondary}`}>Real success stories from distributors across Kenya</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={`${theme.card} rounded-2xl p-8 transition-all duration-300 ${theme.cardHover}`}>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className={`${theme.textSecondary} italic leading-relaxed mb-8`}>“{testimonial.quote}”</p>
                <div className={`flex items-center gap-4 pt-6 border-t ${theme.border}`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.imageInitial}
                  </div>
                  <div>
                    <div className={`font-bold ${theme.text}`}>{testimonial.name}</div>
                    <div className={`text-sm ${theme.textMuted}`}>{testimonial.role}, {testimonial.company}</div>
                    <div className="text-xs text-blue-500 mt-1">{testimonial.region}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-brand-600 to-purple-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
            <div className="relative p-12 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                Ready to transform your delivery operations?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join over 1,200 businesses across Kenya already saving time and money with DeliverTrack.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all hover:scale-105">
                  Start 14-day free trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all hover:scale-105">
                  Schedule a demo
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-8">
                ✓ No credit card required • ✓ Cancel anytime • ✓ Support in Swahili & English
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className={`border-t ${theme.border} py-16 px-4 sm:px-6 lg:px-8 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-1.5">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-xl ${theme.text}`}>DeliverTrack</span>
              </div>
              <p className={`${theme.textSecondary} text-sm mb-6 max-w-sm`}>
                Real-time delivery visibility for African distributors. Empowering businesses across Kenya with technology that works.
              </p>
              <div className="flex gap-3">
                {["X", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                  <a key={social} href="#" className={`w-9 h-9 rounded-xl ${theme.bgSecondary} border ${theme.border} flex items-center justify-center ${theme.textSecondary} hover:text-blue-500 hover:border-blue-500 transition`}>
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "API Docs", "Demo"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Press", "Partners"] },
              { title: "Resources", links: ["Help Center", "Documentation", "Community", "Status", "Downloads"] }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className={`font-bold mb-4 ${theme.text}`}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={`text-sm ${theme.textSecondary} hover:text-blue-500 transition-colors`}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={`pt-8 border-t ${theme.border} flex flex-col md:flex-row justify-between items-center gap-4`}>
            <p className={`text-sm ${theme.textMuted}`}>© 2024 DeliverTrack. All rights reserved. Built for Kenyan distributors.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className={`${theme.textMuted} hover:text-blue-500 transition`}>Privacy Policy</a>
              <a href="#" className={`${theme.textMuted} hover:text-blue-500 transition`}>Terms of Service</a>
              <a href="#" className={`${theme.textMuted} hover:text-blue-500 transition`}>Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;