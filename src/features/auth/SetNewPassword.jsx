import React, { useState } from 'react';
import {
  Lock, Eye, EyeOff, ArrowLeft, ArrowRight, Truck,
  CheckCircle, AlertCircle, Shield, Smartphone, Key, Check, X
} from 'lucide-react';

export default function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 2) return { score, label: 'Weak', bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400' };
    if (score <= 4) return { score, label: 'Medium', bar: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400' };
    return { score: 5, label: 'Strong', bar: 'bg-green-500', text: 'text-green-600 dark:text-green-400' };
  };

  const strength = calculateStrength(password);

  const requirements = [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'At least 12 characters (strong)', test: password.length >= 12 },
    { label: 'At least one uppercase letter', test: /[A-Z]/.test(password) },
    { label: 'At least one number', test: /[0-9]/.test(password) },
    { label: 'At least one special character', test: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) { setError('Please enter a new password'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    setIsLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      setTimeout(() => { window.location.href = '/login'; }, 3000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset Successfully!</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-6">
              Your password has been updated. You will be redirected to the login page.
            </p>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-4">
              <div className="bg-indigo-600 h-1.5 rounded-full animate-pulse w-full" />
            </div>
            <a
              href="/login"
              className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Go to Login <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full" />

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
              <span className="text-indigo-200 text-sm font-medium">Create New Password</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Create a
              <span className="block text-indigo-200">strong password</span>
            </h2>
            <p className="text-indigo-100 mt-4 text-lg leading-relaxed">
              Your new password must be different from previously used passwords and meet the security requirements below.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Encrypted storage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm">Hashed passwords</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-indigo-200">
            <p>© {new Date().getFullYear()} DeliverTrack. Secure password reset.</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 rounded-lg p-2">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                Deliver<span className="text-indigo-600">Track</span>
              </span>
            </div>
          </div>

          <a
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </a>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Set new password</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-2">Create a strong password for your account</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your new password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword
                    ? <EyeOff className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    : <Eye className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                  }
                </button>
              </div>

              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-400">Password strength:</span>
                    <span className={`font-medium ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.bar}`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword
                    ? <EyeOff className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                    : <Eye className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                  }
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <X className="w-3 h-3" /> Passwords do not match
                </p>
              )}
              {confirmPassword && password === confirmPassword && password.length > 0 && (
                <p className="mt-1 text-xs text-green-500 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 border border-gray-100 dark:border-slate-700">
              <p className="text-xs font-medium text-gray-700 dark:text-slate-300 mb-2">Password requirements:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {req.test
                      ? <Check className="w-3.5 h-3.5 text-green-500" />
                      : <X className="w-3.5 h-3.5 text-gray-400 dark:text-slate-600" />
                    }
                    <span className={`text-xs ${req.test ? 'text-gray-700 dark:text-slate-300' : 'text-gray-400 dark:text-slate-500'}`}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Resetting password...</>
              ) : (
                <>Reset Password <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-500 dark:text-slate-400">
                <p className="font-medium text-gray-700 dark:text-slate-300 mb-1">Password tips:</p>
                <p className="mb-1">• Use a mix of letters, numbers, and symbols</p>
                <p className="mb-1">• Avoid common words or personal information</p>
                <p>• Don't reuse passwords from other accounts</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
              <Shield className="w-3 h-3" /> SSL Secure
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
              <Smartphone className="w-3 h-3" /> End-to-end encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
