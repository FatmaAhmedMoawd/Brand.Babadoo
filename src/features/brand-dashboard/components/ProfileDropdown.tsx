import React from 'react';
import { User, Store, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileDropdownProps {
  onClose: () => void;
  onLogoutClick: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose, onLogoutClick }) => {
  return (
    <>
      {/* Overlay to catch clicks outside dropdown */}
      <div id="profile-dropdown-backdrop" className="fixed inset-0 z-40" onClick={onClose} />

      {/* Profiler Dropdown Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        id="profile-dropdown-container"
        className="absolute right-0 mt-3 w-[260px] bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden z-50 py-3 text-start"
      >
        <button
          id="profile-item-myprofile"
          onClick={() => {
            onClose();
          }}
          className="w-full px-6 py-3.5 flex items-center gap-4 text-gray-700 hover:bg-gray-50/80 transition-colors font-semibold font-cairo text-base cursor-pointer"
        >
          <User className="w-5 h-5 text-gray-500 stroke-[2.25]" />
          <span>My Profile</span>
        </button>

        <button
          id="profile-item-brandinfo"
          onClick={() => {
            onClose();
          }}
          className="w-full px-6 py-3.5 flex items-center gap-4 text-gray-700 hover:bg-gray-50/80 transition-colors font-semibold font-cairo text-base cursor-pointer"
        >
          <Store className="w-5 h-5 text-gray-500 stroke-[2.25]" />
          <span>Brand Info</span>
        </button>

        {/* Divider line */}
        <div id="profile-dropdown-divider" className="border-t border-gray-100 my-1.5" />

        <button
          id="profile-item-logout"
          onClick={() => {
            onClose();
            onLogoutClick();
          }}
          className="w-full px-6 py-3.5 flex items-center gap-4 text-red-500 hover:bg-red-50/30 transition-colors font-bold font-cairo text-base cursor-pointer"
        >
          <LogOut className="w-5 h-5 stroke-[2.25] text-red-500" />
          <span>Log out</span>
        </button>
      </motion.div>
    </>
  );
};
