import React from 'react';
import {
  Home,
  Package,
  Box,
  Tag,
  Wallet,
  Users,
  CreditCard,
  Settings,
  Headphones,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  onLogoutClick: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  setCollapsed,
  activeItem,
  setActiveItem,
  onLogoutClick,
  mobileOpen,
  setMobileOpen,
}) => {
  const primaryItems: SidebarItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'products', name: 'Products', icon: <Box className="w-5 h-5" /> },
    { id: 'offers', name: 'Offers Managment', icon: <Tag className="w-5 h-5" /> },
    { id: 'financial', name: 'Financial', icon: <Wallet className="w-5 h-5" /> },
    { id: 'team', name: 'Team Managment', icon: <Users className="w-5 h-5" /> },
    { id: 'subscriptions', name: 'Subscriptions.', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div
      id="sidebar-container"
      className={`fixed top-0 bottom-0 start-0 z-40 bg-white border-r border-gray-100 flex flex-col justify-between transition-all duration-300 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${collapsed ? 'w-[80px]' : 'w-[280px]'}`}
    >
      {/* Top Brand Logo Section */}
      <div id="sidebar-logo-section" className={`h-[84px] border-b border-gray-50 flex items-center shrink-0 relative ${collapsed ? 'justify-center px-1' : 'px-6'}`}>
        <BrandLogo collapsed={collapsed} />
        {/* Mobile close button inside the sidebar logo area */}
        <button
          id="sidebar-mobile-close-btn"
          onClick={() => setMobileOpen(false)}
          className="absolute top-1/2 -translate-y-1/2 right-4 lg:hidden p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 active:bg-gray-200/80 transition-colors focus:outline-none cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Middle Menu List */}
      <div id="sidebar-menu-list" className={`flex-1 overflow-y-auto py-6 space-y-1.5 custom-scrollbar ${collapsed ? 'px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]' : 'px-4'}`}>
        {primaryItems.map((item) => {
          const isActive = activeItem === item.id || (item.id === 'orders' && activeItem === 'order-details') || (item.id === 'offers' && activeItem === 'create-offer');
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => {
                setActiveItem(item.id);
                setMobileOpen(false); // Close sidebar drawer on mobile on select
              }}
              className={`flex items-center rounded-[16px] transition-all cursor-pointer group shrink-0 ${
                collapsed
                  ? 'justify-center w-12 h-12 mx-auto p-0 shrink-0'
                  : 'w-full py-3.5 px-4.5 gap-4 text-start'
              } ${
                isActive
                  ? 'bg-[#AE6727] text-white shadow-md shadow-[#AE6727]/15 font-bold'
                  : 'text-gray-600 hover:bg-gray-50/80 font-medium'
              }`}
            >
              <div
                id={`sidebar-icon-${item.id}`}
                className={`transition-transform duration-200 shrink-0 ${
                  isActive ? 'scale-105' : 'group-hover:scale-105 text-gray-500'
                }`}
              >
                {item.icon}
              </div>
              {!collapsed && (
                <span id={`sidebar-text-${item.id}`} className="font-cairo text-base">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Section */}
      <div id="sidebar-footer" className="p-4 border-t border-gray-50 shrink-0 space-y-1">
        {/* Support & Help */}
        <button
          id="sidebar-item-support"
          onClick={() => {
            setActiveItem('support');
            setMobileOpen(false);
          }}
          className={`flex items-center rounded-[16px] transition-all cursor-pointer group shrink-0 ${
            collapsed ? 'justify-center w-12 h-12 mx-auto p-0 shrink-0' : 'w-full py-3.5 px-4.5 gap-4 text-start'
          } ${
            activeItem === 'support'
              ? 'bg-[#AE6727] text-white shadow-md shadow-[#AE6727]/15 font-bold'
              : 'text-gray-600 hover:bg-gray-50/80 font-medium'
          }`}
        >
          <Headphones className={`w-5 h-5 shrink-0 ${activeItem === 'support' ? 'text-white scale-105' : 'text-gray-500 group-hover:scale-105'}`} />
          {!collapsed && <span className="font-cairo text-base">Support & Help</span>}
        </button>

        {/* Log out */}
        <button
          id="sidebar-item-logout"
          onClick={onLogoutClick}
          className={`flex items-center rounded-[16px] text-red-500 hover:bg-red-50/50 transition-symmetric font-bold cursor-pointer shrink-0 ${
            collapsed ? 'justify-center w-12 h-12 mx-auto p-0 shrink-0' : 'w-full py-3.5 px-4.5 gap-4 text-start'
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0 stroke-[2.25]" />
          {!collapsed && <span className="font-cairo text-base">Log out</span>}
        </button>

        {/* Collapse Sidebar Button - hidden on mobile */}
        <button
          id="sidebar-item-collapse"
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex items-center rounded-[16px] text-gray-500 hover:bg-gray-50/80 transition-symmetric font-medium cursor-pointer shrink-0 ${
            collapsed ? 'justify-center w-12 h-12 mx-auto p-0 shrink-0' : 'w-full py-3.5 px-4.5 gap-4 text-start'
          }`}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 shrink-0" />
          )}
          {!collapsed && <span className="font-cairo text-base">Collapse</span>}
        </button>
      </div>
    </div>
  );
};
