import React, { useState } from 'react';
import { 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Smartphone,
  Send,
  Key,
  RefreshCw
} from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Email validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo success - in production, check if email exists
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    if (resendCount >= 3) {
      setError('Too many attempts. Please try again in 1 hour.');
      return;
    }
    
    setResendCount(prev => prev + 1);
    setError('');
    
    // Simulate resend
    setTimeout(() => {
      // Show success toast or message
      alert('Reset link has been resent to your email.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 flex">
      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Decorative elements */}
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6" />
              </div>
              <span className="text-indigo-200 text-sm font-medium">Password Recovery</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Forgot your password?
              <span className="block text-indigo-200 text-2xl mt-2">We've got you covered</span>
            </h2>
            <p className="text-indigo-100 mt-4 text-lg leading-relaxed">
              Enter your email address and we'll send you a link to reset your password and regain access to your account.
            </p>
            
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Secure reset link</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Valid for 24 hours</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-indigo-200">
            <p>© 2024 DeliverTrack. Secure password recovery.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
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

          {/* Back to Login Link */}
          <a 
            href="/login" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </a>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reset your password</h1>
            <p className="text-gray-500 mt-2">
              We'll send you a link to create a new password
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Check your email</h3>
                <p className="text-green-700 mt-2 text-sm">
                  We've sent a password reset link to <strong className="font-medium">{email}</strong>
                </p>
                <p className="text-green-600 text-xs mt-3">
                  The link will expire in 24 hours. Check your spam folder if you don't see it.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResend}
                  disabled={resendCount >= 3}
                  className={`w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium transition ${
                    resendCount >= 3 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend reset link
                </button>

                <a
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition"
                >
                  Return to Sign In
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {resendCount > 0 && (
                <p className="text-center text-xs text-gray-400">
                  Resend attempts: {resendCount}/3
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Error Alert */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="name@company.co.ke"
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Enter the email you used to register
                  </p>
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
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Help Text */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-500">
                    <p className="font-medium text-gray-700 mb-1">Having trouble?</p>
                    <p className="mb-1">• Check your spam or junk folder for the reset email</p>
                    <p className="mb-1">• Make sure you're using the email associated with your account</p>
                    <p>• Contact support if you need further assistance</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Still need help?{' '}
                  <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </>
          )}

          {/* Security Badge */}
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Shield className="w-3 h-3" /> SSL Secure
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Smartphone className="w-3 h-3" /> 24hr link validity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}