
import { Outlet, Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import { MapPin, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";


export default function DefaultLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleDark } = useTheme();
  const navigate = useNavigate();
  const theme = {
    text: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    navBg: isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200',
    bgSecondary: isDark ? 'bg-slate-900' : 'bg-slate-50',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    button: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${theme.navBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded-lg p-1.5 transform hover:scale-110 transition-transform`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-xl ${theme.text}`}>
                DeliverTrack
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className={`${theme.textSecondary} hover:${theme.text} transition`}>Features</a>
              <a href="#usecases" className={`${theme.textSecondary} hover:${theme.text} transition`}>Use Cases</a>
              <a href="#pricing" className={`${theme.textSecondary} hover:${theme.text} transition`}>Pricing</a>
              <a href="#contact" className={`${theme.textSecondary} hover:${theme.text} transition`}>Contact</a>
              <button
                onClick={toggleDark}
                className={`p-2 rounded-lg ${theme.bgSecondary} transition-colors`}
              >
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
             
              <button onClick={()=> navigate('login')} className={`${theme.button} px-6 py-2 rounded-lg font-medium transition`}>
                My Account
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${theme.border} py-4`}>
            <div className="flex flex-col gap-3 px-4">
              <a href="#features" className={`${theme.textSecondary} py-2`}>Features</a>
              <a href="#usecases" className={`${theme.textSecondary} py-2`}>Use Cases</a>
              <a href="#pricing" className={`${theme.textSecondary} py-2`}>Pricing</a>
              <a href="#contact" className={`${theme.textSecondary} py-2`}>Contact</a>
              <button onClick={()=>navigate('/login')} className={`${theme.button} px-6 py-2 rounded-lg font-medium`}>Get Started</button> 
            </div>
          </div>
        )}
      </nav>
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}