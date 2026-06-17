import React from 'react';
import {
  Store,
  Settings,
  Shield,
  User,
  ChevronRight
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const settingCards = [
    {
      id: 'brand-info',
      title: 'Brand Information',
      description: 'Update name, address, logo and description',
      icon: (
        <div className="relative flex items-center justify-center">
          <Store className="w-6 h-6 text-[#AE6727]" />
        </div>
      ),
    },
    {
      id: 'branch-mgmt',
      title: 'Branch Management',
      description: 'Manage all your business locations',
      icon: (
        <div className="relative flex items-center justify-center">
          <Store className="w-6 h-6 text-[#AE6727]" />
          <div className="absolute -bottom-1 -right-1 bg-[#FCF5EE] rounded-full p-0.5 border border-white">
            <Settings className="w-3 h-3 text-[#AE6727]" />
          </div>
        </div>
      ),
    },
    {
      id: 'password-security',
      title: 'Password & Security',
      description: 'Change password and secure your account',
      icon: (
        <div className="relative flex items-center justify-center">
          <Shield className="w-6 h-6 text-[#AE6727]" />
        </div>
      ),
    },
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Update your personal details, email, and profile photo',
      icon: (
        <div className="relative flex items-center justify-center">
          <User className="w-6 h-6 text-[#AE6727]" />
        </div>
      ),
    },
  ];

  return (
    <div id="brand-settings-container" className="space-y-8 text-start select-none w-full animate-fadeIn">
      {/* Page Header */}
      <div id="settings-header" className="space-y-2">
        <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
          Brand Settings
        </h1>
        <p className="text-[15px] font-medium text-gray-400 font-cairo leading-relaxed">
          Manage your identity and how customers see you
        </p>
      </div>

      {/* Cards List Stack */}
      <div id="settings-cards-list" className="space-y-4">
        {settingCards.map((card) => (
          <div
            key={card.id}
            id={`settings-card-${card.id}`}
            className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex items-center justify-between hover:shadow-md hover:border-[#AE6727]/15 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-5">
              {/* Icon Container with beautiful warm ivory scheme */}
              <div
                id={`settings-icon-wrapper-${card.id}`}
                className="w-14 h-14 rounded-[16px] bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200"
              >
                {card.icon}
              </div>

              {/* Text Information column */}
              <div className="flex flex-col text-start">
                <span className="text-[17.5px] font-bold text-gray-950 font-cairo leading-tight">
                  {card.title}
                </span>
                <span className="text-[13.5px] font-semibold text-gray-400 font-cairo mt-[4px] leading-relaxed">
                  {card.description}
                </span>
              </div>
            </div>

            {/* Right chevron indicator */}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#AE6727] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        ))}
      </div>

      {/* Need Help Banner Card */}
      <div
        id="settings-help-card"
        className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-start relative overflow-hidden"
      >
        <h3 className="text-[16px] font-black text-gray-950 font-cairo leading-tight">
          Need Help?
        </h3>
        <p className="text-[14px] font-semibold text-gray-400 font-cairo mt-2.5 leading-relaxed">
          If you need assistance with your settings, please contact our support team at{' '}
          <a
            href="mailto:support@vendor.com"
            className="text-[#AE6727] hover:underline hover:text-[#8D501D] font-bold transition-colors select-text inline-block"
          >
            support@vendor.com
          </a>
        </p>
      </div>
    </div>
  );
};
