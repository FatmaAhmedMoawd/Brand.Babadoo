import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BrandDashboardPage } from '../../features/brand-dashboard/pages/BrandDashboardPage';

// Placeholder components for the other domains
const AdminDashboardLayout = () => <div className="p-8 text-start animate-fadeIn" dir="rtl"><h1>لوحة تحكم الإدارة (admin.babbadoo.app)</h1><p>للمسؤولين فقط</p></div>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Brand Dashboard becomes the default (root) entry point */}
        <Route path="/" element={<BrandDashboardPage />} />
        
        {/* Supporting path /app/* to direct to the dashboard as well */}
        <Route path="/app/*" element={<BrandDashboardPage />} />
        
        {/* Admin Routes (Simulating subdomain via path for dev preview) */}
        <Route path="/admin/*" element={<AdminDashboardLayout />} />

        {/* Fallback redirects to root dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
