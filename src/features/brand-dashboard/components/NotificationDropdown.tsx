import React from 'react';
import { ShoppingCart, DollarSign, Store, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationDropdownProps {
  onClose: () => void;
  onViewNotifications: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose, onViewNotifications }) => {
  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      description: 'Order #ORD-1005 has been placed at Main Branch - Downtown',
      time: '2 minutes ago',
      iconBg: 'bg-[#EAF0FE] text-[#2F67F6]',
      icon: <ShoppingCart className="w-[22px] h-[22px] text-[#2F67F6]" />,
    },
    {
      id: 2,
      title: 'Payment Received',
      description: 'Payment of 850.00 SAR has been credited to your account',
      time: '15 minutes ago',
      iconBg: 'bg-[#EBFDFC] text-[#10B981]',
      icon: <DollarSign className="w-[22px] h-[22px] text-[#059669]" />,
    },
    {
      id: 3,
      title: 'Branch Status Changed',
      description: 'North Branch has been marked as closed by the manager',
      time: '1 hour ago',
      iconBg: 'bg-[#FFFBEB] text-[#D97706]',
      icon: <Store className="w-[22px] h-[22px] text-[#D97706]" />,
    },
  ];

  return (
    <>
      {/* Overlay to close when clicking outside */}
      <div id="notif-dropdown-backdrop" className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Dropdown Container */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        id="notif-dropdown-container"
        className="fixed sm:absolute top-[84px] sm:top-auto left-4 right-4 xs:left-4 xs:right-4 sm:left-auto sm:right-0 mt-3 w-auto sm:w-[470px] bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-50 text-start select-none"
      >
        {/* Notification list block */}
        <div id="notif-list-wrapper" className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              id={`notif-item-${notif.id}`}
              className="flex items-start justify-between gap-3 sm:gap-4 group cursor-pointer hover:bg-gray-50/40 p-1.5 -m-1.5 rounded-xl transition-all duration-200"
            >
              {/* Left Circle Icon */}
              <div
                id={`notif-icon-circle-${notif.id}`}
                className={`w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}
              >
                <div className="scale-90 sm:scale-100">
                  {notif.icon}
                </div>
              </div>

              {/* Text Details */}
              <div id={`notif-text-content-${notif.id}`} className="flex-1 min-w-0">
                <h4 id={`notif-heading-${notif.id}`} className="text-[15px] sm:text-[17px] font-bold text-[#111827] font-sans leading-tight">
                  {notif.title}
                </h4>
                <p id={`notif-desc-${notif.id}`} className="text-[12px] sm:text-[13px] text-gray-500 font-sans leading-relaxed mt-1">
                  {notif.description}
                </p>
                <span id={`notif-time-${notif.id}`} className="text-[11px] sm:text-[12px] text-gray-400 font-sans mt-1.5 block">
                  {notif.time}
                </span>
              </div>

              {/* Blue Unread Dot on Right */}
              <div
                id={`notif-unread-dot-${notif.id}`}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#2F67F6] rounded-full shrink-0 self-center"
              />
            </div>
          ))}
        </div>

        {/* Bottom All Notification link bar */}
        <div id="notif-bottom-bar" className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
          <button
            id="all-notif-btn"
            onClick={() => {
              onViewNotifications();
              onClose();
            }}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 flex items-center gap-3 font-bold font-sans text-[15px] sm:text-[16px] text-[#111827] text-start cursor-pointer transition-colors"
          >
            <Bell className="w-5 h-5 text-[#111827] stroke-[2]" />
            <span>All Notification</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

