import React, { useState } from 'react';
import { ShoppingCart, DollarSign, Store, ShieldCheck, Settings, Bell } from 'lucide-react';
import { motion } from 'motion/react';

// Define NotificationItem structure
export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  category: 'branch' | 'payments' | 'orders' | 'administration' | 'system';
  unread: boolean;
  iconBg: string;
  icon: React.ReactNode;
}

export const NotificationsContent: React.FC = () => {
  const initialNotifications: NotificationItem[] = [
    {
      id: 1,
      title: 'New Order Received',
      description: 'Order #ORD-1005 has been placed at Main Branch - Downtown',
      time: '2 minutes ago',
      category: 'orders',
      unread: true,
      iconBg: 'bg-[#EAF0FE] text-[#2F67F6]',
      icon: <ShoppingCart className="w-[20px] h-[20px] text-[#2F67F6]" />,
    },
    {
      id: 2,
      title: 'Payment Received',
      description: 'Payment of 850.00 SAR has been credited to your account',
      time: '15 minutes ago',
      category: 'payments',
      unread: true,
      iconBg: 'bg-[#EBFDFC] text-[#111827]', // Green hue
      icon: <DollarSign className="w-[20px] h-[20px] text-[#059669]" />,
    },
    {
      id: 3,
      title: 'Branch Status Changed',
      description: 'North Branch has been marked as closed by the manager',
      time: '1 hour ago',
      category: 'branch',
      unread: true,
      iconBg: 'bg-[#FFFBEB] text-[#D97706]',
      icon: <Store className="w-[20px] h-[20px] text-[#D97706]" />,
    },
    {
      id: 4,
      title: 'Product Approved',
      description: 'Your product "Iced Caramel Latte" has been approved by admin',
      time: '2 hours ago',
      category: 'administration',
      unread: false,
      iconBg: 'bg-[#FEF2F2] text-[#EF4444]',
      icon: <ShieldCheck className="w-[20px] h-[20px] text-[#EF4444]" />,
    },
    {
      id: 5,
      title: 'Order Cancelled',
      description: 'Order #ORD-1003 was cancelled by customer',
      time: '3 hours ago',
      category: 'orders',
      unread: false,
      iconBg: 'bg-[#EFF6FF] text-[#3B82F6]',
      icon: <ShoppingCart className="w-[20px] h-[20px] text-[#3B82F6]" />,
    },
    {
      id: 6,
      title: 'System Maintenance',
      description: 'Scheduled maintenance on May 8, 2026 from 2:00 AM to 4:00 AM',
      time: 'May 6, 2026',
      category: 'system',
      unread: false,
      iconBg: 'bg-[#F3F4F6] text-gray-500',
      icon: <Settings className="w-[20px] h-[20px] text-gray-500" />,
    },
    {
      id: 7,
      title: 'Weekly Summary Available',
      description: 'Your weekly sales summary is ready to view',
      time: 'May 5, 2026',
      category: 'payments',
      unread: false,
      iconBg: 'bg-[#ECFDF5] text-[#10B981]',
      icon: <DollarSign className="w-[20px] h-[20px] text-[#10B981]" />,
    },
  ];

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Compute stats
  const totalUnreadCount = notifications.filter(n => n.unread).length;
  const totalCount = notifications.length;

  // Compute unread count per category
  const getTabUnreadCount = (category: string) => {
    if (category === 'all') return totalUnreadCount;
    return notifications.filter(n => n.category === category && n.unread).length;
  };

  const tabs = [
    { id: 'all', label: 'All', hasBadge: true },
    { id: 'branch', label: 'Branch', hasBadge: true },
    { id: 'payments', label: 'Payments', hasBadge: true },
    { id: 'orders', label: 'Orders', hasBadge: true },
    { id: 'administration', label: 'Administration', hasBadge: false },
    { id: 'system', label: 'System', hasBadge: false },
  ];

  // Filtering logic
  const filteredNotifications = activeTab === 'all'
    ? notifications
    : (activeTab === 'administration' || activeTab === 'system')
      ? []
      : notifications.filter(n => n.category === activeTab);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  return (
    <div id="notifications-view-container" className="space-y-6 sm:space-y-9">
      
      {/* 1. Page Title Header block */}
      <div id="notifications-intro-header" className="text-start select-none">
        <h1 id="notifications-intro-title" className="text-3xl font-black text-gray-950 font-cairo tracking-tight leading-none text-start">
          Notifications
        </h1>
        <p id="notifications-intro-subtitle" className="text-[15px] font-medium font-cairo text-gray-400 mt-2 text-start">
          Stay updated with your business activities
        </p>
      </div>

      {/* 2. Top Banner Card Info - Exact pixel replica of requested layout, optimized for all screens */}
      <div 
        id="notifications-custom-banner" 
        className="bg-[#EFF1FE] rounded-[22px] p-4 xs:p-5 sm:p-6 md:px-10 md:py-7 flex flex-row items-center justify-between gap-3 sm:gap-4 select-none w-full"
      >
        {/* Left Side: Bell Vector Ring + Unread Notifications scale */}
        <div className="flex items-center gap-2 px-0.5 xs:gap-3 sm:gap-4 min-w-0">
          {/* Vibrant high-contrast blue round container with centered hollow white bell */}
          <div className="w-[40px] h-[40px] xs:w-[48px] xs:h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#002BFF] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,43,255,0.15)]">
            <Bell className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
          </div>
          
          {/* Label and Count */}
          <div className="flex flex-col text-start min-w-0">
            <span className="text-[10px] xs:text-[12px] sm:text-[14px] text-[#555E70] font-semibold font-sans tracking-tight truncate">
              Unread Notifications
            </span>
            <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0F17] leading-none mt-0.5 sm:mt-1 font-sans">
              {totalUnreadCount}
            </span>
          </div>
        </div>

        {/* Right Side: Total Notifications metrics (Text rightaligned, count rightaligned) */}
        <div className="flex flex-col items-end text-end shrink-0">
          <span className="text-[10px] xs:text-[12px] sm:text-[14px] text-[#555E70] font-semibold font-sans tracking-tight">
            Total Notifications
          </span>
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0F17] leading-none mt-0.5 sm:mt-1 font-sans">
            {totalCount}
          </span>
        </div>
      </div>

      {/* 3. Main Filter Card Panel */}
      <div id="notifications-main-card" className="bg-white border border-gray-100 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden select-none">
        
        {/* Responsive Horizontal Tab List wrapper */}
        <div 
          id="notifications-tabs-container" 
          className="border-b border-gray-100 px-4 xs:px-6 sm:px-8 py-0.5 md:py-1 flex items-center gap-4 xs:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none style-scrollbar"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const badgeCount = getTabUnreadCount(tab.id);
            const showBadge = tab.hasBadge && badgeCount > 0;
            
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-0.5 xs:px-1 border-b-2 font-cairo font-semibold text-[13px] xs:text-[14px] sm:text-[16px] transition-all relative inline-flex items-center gap-1 xs:gap-1.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'border-[#AE6727] text-[#AE6727] font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>{tab.label}</span>
                {showBadge && (
                  <span className="bg-[#D38842] text-white text-[9px] xs:text-[11px] font-bold h-4 xs:h-5 min-w-4 xs:min-w-5 px-1 xs:px-1.5 rounded-full inline-flex items-center justify-center font-sans tracking-tight">
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Item Rows stage */}
        <div id="notifications-rows-wrapper" className="divide-y divide-gray-100/80">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                id={`notif-full-row-${notif.id}`}
                onClick={() => handleMarkAsRead(notif.id)}
                className="p-4 xs:p-5 sm:p-7 md:p-8 flex items-start justify-between gap-3 sm:gap-4 hover:bg-gray-50/40 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-start gap-3 xs:gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Left Circle Icon matching specific design style */}
                  <div className={`w-9 h-9 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg} transition-transform group-hover:scale-105 duration-200`}>
                    <div className="scale-90 xs:scale-100 flex items-center justify-center">
                      {notif.icon}
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="flex-1 min-w-0 text-start">
                    <h3 className="text-[14px] xs:text-[16px] sm:text-[18px] font-bold text-gray-950 font-sans tracking-tight leading-tight group-hover:text-[#AE6727] transition-colors">
                      {notif.title}
                    </h3>
                    <p className="text-[12px] xs:text-[13px] sm:text-[14px] text-[#555E70] font-sans leading-relaxed mt-1 xs:mt-1.5">
                      {notif.description}
                    </p>
                    <span className="text-[11px] xs:text-[12px] sm:text-[13px] text-gray-400 font-sans mt-1.5 xs:mt-2 block">
                      {notif.time}
                    </span>
                  </div>
                </div>

                {/* Blue unread marker indicator on right side */}
                {notif.unread && (
                  <span 
                    id={`row-unread-dot-${notif.id}`}
                    className="w-2.5 h-2.5 bg-[#002BFF] rounded-full shrink-0 self-center shadow-[0_0_8px_rgba(0,43,255,0.4)]"
                    title="Mark as read"
                  />
                )}
              </div>
            ))
          ) : (
            // Elegant placeholder for clean empty state fallback
            <div id="notif-empty-state" className="p-16 flex flex-col items-center justify-center text-center select-none">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold font-cairo text-gray-700">No Notifications</h3>
              <p className="text-sm font-cairo text-gray-400 mt-1 max-w-xs">
                There are no notifications in this category right now.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
