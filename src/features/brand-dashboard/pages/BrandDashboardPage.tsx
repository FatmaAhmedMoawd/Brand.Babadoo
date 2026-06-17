import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { MetricsRow } from '../components/MetricsRow';
import { SalesTrendChart } from '../components/SalesTrendChart';
import { TopProducts } from '../components/TopProducts';
import { RecentActivity } from '../components/RecentActivity';
import { LatestOrders } from '../components/LatestOrders';
import { LogoutModal } from '../components/LogoutModal';
import { NotificationsContent } from '../components/NotificationsContent';
import { OrdersView } from '../components/OrdersView';
import { OrderDetailsView } from '../components/OrderDetailsView';
import { ProductsView } from '../components/ProductsView';
import { OffersView } from '../components/OffersView';
import { CreateOfferPage } from '../components/CreateOfferPage';
import { FinancialView } from '../components/FinancialView';
import { TeamManagementView } from '../components/TeamManagementView';
import { SubscriptionsView } from '../components/SubscriptionsView';
import { SettingsView } from '../components/SettingsView';
import { Package, X, User, Check, MessageSquare } from 'lucide-react';

export const BrandDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Local toggling states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard'); // Default to dashboard for immediate overview, changing to orders only when clicked!
  const [editOfferMode, setEditOfferMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  
  // New Order Automatic Alert state (controlled by entering the orders view)
  const [showNewOrderAlert, setShowNewOrderAlert] = useState(false);

  // Auto trigger popup 2 seconds after user navigates to the 'orders' tab
  useEffect(() => {
    if (activeItem === 'orders') {
      const timer = setTimeout(() => {
        setShowNewOrderAlert(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNewOrderAlert(false);
    }
  }, [activeItem]);

  // Prevent background scrolling when the mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Only restore overflow if the new order alert is also not open on mobile
      const isNewOrderAlertActiveOnMobile = showNewOrderAlert && window.matchMedia('(max-width: 639px)').matches;
      if (!isNewOrderAlertActiveOnMobile) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
    return () => {
      const isNewOrderAlertActiveOnMobile = showNewOrderAlert && window.matchMedia('(max-width: 639px)').matches;
      if (!isNewOrderAlertActiveOnMobile) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [mobileOpen, showNewOrderAlert]);

  // Prevent background scrolling when the new order alert is open on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    if (showNewOrderAlert && isMobile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (!mobileOpen) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
    return () => {
      if (!mobileOpen) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [showNewOrderAlert, mobileOpen]);

  const handleLogoutConfirm = () => {
    // Clear storage mockup login token
    localStorage.removeItem('user_authenticated');
    setLogoutModalOpen(false);
    setActiveItem('dashboard');
    navigate('/');
  };

  return (
    <div id="brand-dashboard-layout" dir="ltr" className={`min-h-screen bg-[#FAFAFA] flex text-gray-900 font-sans relative ${mobileOpen ? 'overflow-hidden touch-none' : 'overflow-x-hidden'}`}>
      
      {/* 1. Left Sidebar Navigation */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onLogoutClick={() => setLogoutModalOpen(true)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile sidebar overlay backdrop */}
      {mobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden touch-none"
        />
      )}

      {/* 2. Main content container right of Sidebar */}
      <div
        id="dashboard-main-content-wrapper"
        className={`flex-1 flex flex-col min-h-screen min-w-0 max-w-full transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ps-[80px]' : 'lg:ps-[280px]'
        } ps-0 ${mobileOpen ? 'overflow-hidden touch-none' : ''}`}
      >
        {/* Top Header Navigation bar */}
        <DashboardHeader
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          onLogoutClick={() => setLogoutModalOpen(true)}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onViewNotifications={() => {
            setActiveItem('notifications');
            setNotificationsOpen(false);
          }}
        />

        {/* Inner Content scroll zone */}
        <main
          id="dashboard-view-stage"
          className={`flex-1 p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-9 max-w-7xl mx-auto w-full min-w-0 max-w-full overflow-x-hidden ${
            mobileOpen ? 'overflow-y-hidden touch-none' : 'overflow-y-auto'
          }`}
        >
          {activeItem === 'notifications' ? (
            <NotificationsContent />
          ) : activeItem === 'order-details' ? (
            <OrderDetailsView
              onBack={() => setActiveItem('orders')}
            />
          ) : activeItem === 'orders' ? (
            <OrdersView
              showNewOrderAlert={showNewOrderAlert}
              setShowNewOrderAlert={setShowNewOrderAlert}
              onViewOrder={() => setActiveItem('order-details')}
            />
          ) : activeItem === 'products' ? (
            <ProductsView />
          ) : activeItem === 'offers' ? (
            <OffersView
              onCreateOffer={() => {
                setEditOfferMode(false);
                setActiveItem('create-offer');
              }}
              onEditOffer={() => {
                setEditOfferMode(true);
                setActiveItem('create-offer');
              }}
            />
          ) : activeItem === 'create-offer' ? (
            <CreateOfferPage isEdit={editOfferMode} onBack={() => setActiveItem('offers')} />
          ) : activeItem === 'financial' ? (
            <FinancialView />
          ) : activeItem === 'team' ? (
            <TeamManagementView />
          ) : activeItem === 'subscriptions' ? (
            <SubscriptionsView />
          ) : activeItem === 'settings' ? (
            <SettingsView />
          ) : (
            <>
              {/* Header Description block */}
              <div id="dashboard-intro-header" className="text-start select-none">
                <h1 id="dashboard-intro-title" className="text-3xl font-black text-gray-950 font-cairo tracking-tight leading-none">
                  Dashboard Overview
                </h1>
                <p id="dashboard-intro-subtitle" className="text-[15px] font-medium font-cairo text-gray-400 mt-2">
                  Track your brand's performance and growth at a glance
                </p>
              </div>

              {/* Metric Overview Row Cards */}
              <MetricsRow />

              {/* Sales Trend Chart module */}
              <SalesTrendChart />

              {/* Two Columns Section: Top Products & Recent Activities */}
              <div id="dashboard-bento-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TopProducts />
                <RecentActivity />
              </div>

              {/* Latest Orders list table */}
              <LatestOrders />
            </>
          )}

        </main>
      </div>

      {/* 3. Global Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* 4. Beautiful New Order Alert Popup - Centered on mobile, floating top-right on desktop */}
      {showNewOrderAlert && (
        <>
          {/* Smooth backdrop overlay for mobile layout to draw attention and blur the busy main page */}
          <div
            id="new-order-alert-backdrop"
            onClick={() => setShowNewOrderAlert(false)}
            className="sm:hidden fixed inset-0 z-40 bg-black/45 backdrop-blur-xs animate-fadeIn cursor-pointer"
          />

          <div
            id="new-order-alert-container"
            className="fixed inset-0 sm:inset-auto sm:top-24 sm:right-6 z-50 flex items-center justify-center sm:block p-4 sm:p-0 pointer-events-none"
          >
            {/* Soft, delicate card styled with generous negative spaces and elegant cream/brown palette */}
            <div
              id="new-order-alert-card"
              className="bg-white w-full max-w-[365px] sm:w-[350px] rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.18)] sm:shadow-[0_12px_40px_rgba(174,103,39,0.12)] border border-[#AE6727]/10 overflow-hidden select-none pointer-events-auto transform transition-all duration-300 animate-scaleIn sm:animate-slideInRight"
            >
              {/* Premium softer gradient header in warm ivory to cream */}
              <div className="bg-gradient-to-r from-[#FFFDFB] to-[#FAF5F0] px-5 py-[15px] flex items-center justify-between relative border-b border-[#AE6727]/10">
                <div className="flex items-center gap-3">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727] shrink-0 shadow-xs">
                    <Package className="w-[18px] h-[18px] text-[#AE6727]" />
                  </div>
                  <div className="flex flex-col text-start">
                    <span className="text-[#3D2B1F] text-[16px] font-black font-cairo tracking-tight leading-tight">
                      New Order
                    </span>
                    <span className="text-[#AE6727]/70 text-[11px] font-bold font-sans mt-[1px] leading-none">
                      Just now
                    </span>
                  </div>
                </div>
                
                {/* Close Button X */}
                <button
                  type="button"
                  onClick={() => setShowNewOrderAlert(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-[#AE6727] hover:bg-[#AE6727]/5 transition-all duration-200 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-[18px] h-[18px] stroke-[2.25]" />
                </button>
              </div>

              {/* Popup Body contents styled with lighter backgrounds, subtle gold borders, and softer spacing */}
              <div className="p-4.5 space-y-3.5 flex flex-col">
                
                {/* Customer Box */}
                <div className="border border-gray-100 bg-[#FCFAFB]/60 rounded-[16px] p-3 flex items-center gap-3 text-start">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                    <User className="w-[17px] h-[17px]" />
                  </div>
                  <div className="flex flex-col select-text leading-tight">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Customer
                    </span>
                    <span className="text-[14.5px] text-gray-900 font-black font-cairo mt-[2px]">
                      Sara Ahmed
                    </span>
                  </div>
                </div>

                {/* Payment Successful Badge */}
                <div className="self-center inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 text-[#AE6727] font-bold text-[13px] select-text shadow-xs">
                  <div className="w-4.5 h-4.5 rounded-full bg-[#AE6727] flex items-center justify-center text-white p-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 font-black stroke-[3.5]" />
                  </div>
                  <span className="font-cairo leading-none">Payment Successful</span>
                </div>

                {/* Order Summary box */}
                <div className="bg-[#FAF9F9] border border-gray-100/80 rounded-[16px] p-4 text-start space-y-3">
                  <div className="flex flex-col select-text">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Order Summary
                    </span>
                    <span className="text-[14px] text-gray-900 font-black font-cairo mt-[3px] leading-tight">
                      2 items: Headphones, Case
                    </span>
                  </div>
                  
                  <hr className="border-gray-200/50" />

                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-400 font-bold font-cairo">
                      Total Amount
                    </span>
                    <span className="text-[16px] text-[#3D2B1F] font-black font-mono select-text">
                      $129.99
                    </span>
                  </div>
                </div>

                {/* Action Buttons styled delicately */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewOrderAlert(false);
                      setActiveItem('order-details');
                    }}
                    className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-2.5 px-4 rounded-[12px] flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md text-[14px]"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm Order</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowNewOrderAlert(false)}
                    className="w-full bg-white text-[#AE6727] border border-[#AE6727] hover:bg-[#FCF5EE] font-bold font-cairo py-2.5 px-4 rounded-[12px] flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer text-[14px]"
                  >
                    <MessageSquare className="w-4.5 h-4.5 stroke-[2.25]" />
                    <span>Contact Customer</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
