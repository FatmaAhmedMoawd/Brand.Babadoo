import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

interface DashboardHeaderProps {
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  onLogoutClick: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onViewNotifications: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  notificationsOpen,
  setNotificationsOpen,
  profileOpen,
  setProfileOpen,
  onLogoutClick,
  mobileOpen,
  setMobileOpen,
  onViewNotifications,
}) => {
  const [profileImage, setProfileImage] = React.useState<string>(() => {
    return localStorage.getItem('babbads_profile_photo') || 'https://i.postimg.cc/63LC8RRp/Capture.png';
  });
  const [firstName, setFirstName] = React.useState<string>(() => {
    return localStorage.getItem('babbads_first_name') || 'Ahmed';
  });
  const [lastName, setLastName] = React.useState<string>(() => {
    return localStorage.getItem('babbads_last_name') || 'Muhammed';
  });

  React.useEffect(() => {
    const handleUpdate = () => {
      setProfileImage(localStorage.getItem('babbads_profile_photo') || 'https://i.postimg.cc/63LC8RRp/Capture.png');
      setFirstName(localStorage.getItem('babbads_first_name') || 'Ahmed');
      setLastName(localStorage.getItem('babbads_last_name') || 'Muhammed');
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('babbads_profile_photo_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('babbads_profile_photo_updated', handleUpdate);
    };
  }, []);

  return (
    <header
      id="dashboard-header"
      className="h-[84px] sticky top-0 z-20 bg-white border-b border-gray-100 px-4 md:px-10 flex items-center justify-between shrink-0 gap-3"
    >
      {/* Drawer Hamburger Menu for Mobile/Tablet */}
      <button
        id="mobile-sidebar-toggle-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50 border border-gray-100 cursor-pointer"
        aria-label="Toggle mobile sidebar menu panel"
      >
        <Menu className="w-6 h-6 stroke-[2]" width={24} height={24} />
      </button>
      {/* Search Bar section */}
      <div id="header-search-wrapper" className="flex-1 max-w-[540px] hidden sm:block">
        <div id="search-input-container" className="relative group">
          <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#AE6727] transition-colors">
            <Search className="w-[18px] h-[18px] stroke-[2.25]" width={18} height={18} />
          </div>
          <input
            id="search-input-field"
            type="text"
            placeholder="Search for anything"
            aria-label="Search dashboard records"
            className="w-full bg-white border border-gray-200 rounded-[14px] py-2.5 ps-11 pe-4 text-sm font-medium font-cairo text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#AE6727] focus:ring-4 focus:ring-[#AE6727]/5"
          />
        </div>
      </div>

      <div id="header-search-spacing" className="flex-1 sm:hidden" />

      {/* Right Controls Area */}
      <div id="header-right-controls" className="flex items-center gap-6 md:gap-7">
        
        {/* Notification Bell Icon */}
        <div id="notif-trigger-wrapper" className="relative">
          <button
            id="notification-bell-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            aria-label="Toggle notifications menu, 2 unread notifications"
            className="relative w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer border border-gray-100"
          >
            <Bell className="w-[21px] h-[21px] stroke-[2]" width={21} height={21} />
            
            {/* Orange Counter Badge */}
            <span
              id="notif-badge-counter"
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#D38842] border-2 border-white text-white text-[10px] font-black rounded-full flex items-center justify-center font-sans shadow-sm"
            >
              2
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div id="header-notif-dropdown" className="absolute right-0 top-full z-40">
              <NotificationDropdown 
                onClose={() => setNotificationsOpen(false)} 
                onViewNotifications={onViewNotifications} 
              />
            </div>
          )}
        </div>

        {/* User Account Menu Trigger */}
        <div id="profile-trigger-wrapper" className="relative">
          <button
            id="profile-dropdown-btn"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            aria-label="Toggle user profile dropdown menu selection"
            className="flex items-center gap-3.5 hover:bg-gray-50/80 p-1.5 pr-2.5 rounded-2xl transition-colors text-start cursor-pointer group"
          >
            {/* User Profile avatar */}
            <img
              id="profile-user-avatar"
              src={profileImage}
              alt={`${firstName} ${lastName}`}
              width={40}
              height={40}
              style={{ aspectRatio: '1/1' }}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
              referrerPolicy="no-referrer"
            />
            
            {/* User credentials */}
            <div id="profile-user-credentials" className="hidden md:flex flex-col select-none leading-none">
              <span id="profile-user-name" className="text-sm font-bold text-gray-900 font-cairo">
                {firstName} {lastName}
              </span>
              <span id="profile-user-role" className="text-[11px] text-gray-400 font-medium font-mono tracking-wide mt-0.5">
                Brand Owner
              </span>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0" width={16} height={16} />
          </button>

          {/* User Profile dropdown menu */}
          {profileOpen && (
            <div id="header-profile-dropdown" className="absolute right-0 top-full z-40">
              <ProfileDropdown
                onClose={() => setProfileOpen(false)}
                onLogoutClick={onLogoutClick}
              />
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
