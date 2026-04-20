import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Truck, 
  MapPin,
  Briefcase,
  Smartphone,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Remove TypeScript type annotation for useState, use plain string for JS
  const [activeRole, setActiveRole] = useState('distributor');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (!email || !password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      // Demo login success
      console.log('Login attempt:', { email, password, role: activeRole, rememberMe });
      setIsLoading(false);
      // Redirect would happen here
      window.location.href = '/dashboard';
    }, 1500);
  };

  const roleOptions = [
    { id: 'distributor', label: 'Distributor', icon: Briefcase, description: 'Business owner / dispatcher' },
    { id: 'driver', label: 'Driver', icon: Truck, description: 'Delivery driver' },
    { id: 'customer', label: 'Customer', icon: MapPin, description: 'Track your deliveries' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 flex">
      {/* Left Side - Brand/Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
        
        <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Truck className="w-8 h-8" />
            </div>
            <span className="font-bold text-2xl">Deliver<span className="text-indigo-200">Track</span></span>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Welcome back to 
              <span className="block text-indigo-200">Delivery Visibility</span>
            </h2>
            <p className="text-indigo-100 mt-4 text-lg leading-relaxed">
              Track your deliveries in real-time, manage your fleet, and keep customers informed — all from one platform.
            </p>
            
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Real-time GPS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">WhatsApp Alerts</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-indigo-200">
            <p>© 2024 DeliverTrack. Secure & Reliable.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 rounded-lg p-2">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900">Deliver<span className="text-indigo-600">Track</span></span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 mt-2">
              Access your dashboard to manage deliveries
            </p>
          </div>

          {/* Role Toggle */}
          <div className="bg-gray-50 rounded-xl p-1 mb-8 flex gap-1">
            {roleOptions.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-white shadow-sm text-indigo-600 border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : ''}`} />
                  <span className="hidden sm:inline">{role.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role Description */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">
              {activeRole === 'distributor' && 'Login to manage your fleet, track drivers, and view analytics'}
              {activeRole === 'driver' && 'Access your daily deliveries, navigate routes, and update status'}
              {activeRole === 'customer' && 'Track your orders, view delivery status, and contact driver'}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder={activeRole === 'driver' ? 'driver@company.co.ke' : 'name@company.co.ke'}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Demo Credentials</span>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex justify-between"><span>Distributor:</span> <code className="bg-gray-100 px-2 py-0.5 rounded">demo@distributor.co.ke</code> / <code>demo123</code></p>
              <p className="flex justify-between"><span>Driver:</span> <code className="bg-gray-100 px-2 py-0.5 rounded">driver@company.co.ke</code> / <code>driver123</code></p>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              Contact sales
            </button>
          </p>

          {/* Security Badge */}
          <div className="flex justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSL Secure</span>
            <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> 2FA Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}