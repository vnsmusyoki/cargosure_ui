import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const PosLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

export default PosLayout;
