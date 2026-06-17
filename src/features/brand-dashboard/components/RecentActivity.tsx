import React from 'react';
import { ActivityItem } from '../types';

export const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      user: 'Ahmed Hassan',
      initials: 'AH',
      action: "Updated menu price for 'Grilled Chicken'",
      time: '2 mins ago',
      avatarColor: 'bg-[#FFF5EC] text-[#AE6727]',
    },
    {
      id: 2,
      user: 'Sara Mohamed',
      initials: 'SM',
      action: 'Processed a refund for Order #8421',
      time: '15 mins ago',
      avatarColor: 'bg-[#F3E8FF] text-[#7C3AED]',
    },
    {
      id: 3,
      user: 'Omar Ali',
      initials: 'OA',
      action: 'Added new item "Truffle Pasta" to menu',
      time: '32 mins ago',
      avatarColor: 'bg-[#E0F2FE] text-[#0369A1]',
    },
    {
      id: 4,
      user: 'Fatima Khalil',
      initials: 'FK',
      action: 'Completed kitchen shift - 45 orders',
      time: '1 hour ago',
      avatarColor: 'bg-[#FCE7F3] text-[#DB2777]',
    },
    {
      id: 5,
      user: 'Youssef Ibrahim',
      initials: 'YI',
      action: 'Updated inventory stock for ingredients',
      time: '2 hours ago',
      avatarColor: 'bg-[#FEF3C7] text-[#D97706]',
    },
  ];

  return (
    <div id="recent-activity-card" className="bg-white border border-gray-100 rounded-[24px] p-3.5 xs:p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full w-full overflow-hidden">
      {/* Header element */}
      <div id="recent-activity-header" className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div id="recent-activity-headline-wrapper" className="text-start">
          <h3 id="recent-activity-title" className="text-xl font-bold font-cairo text-gray-900 leading-none">
            Recent Activity
          </h3>
          <p id="recent-activity-subtitle" className="text-sm font-medium font-cairo text-gray-400 mt-1.5 leading-none">
            Monitor employee actions and system events
          </p>
        </div>
        
        <button
          id="recent-activity-view-all"
          className="text-base font-bold font-cairo text-[#AE6727] hover:underline cursor-pointer inline-flex items-center gap-1 shrink-0 self-start sm:self-auto"
        >
          <span>View All</span>
          <span className="font-sans">➔</span>
        </button>
      </div>

      {/* Activity logs area */}
      <div id="recent-activity-logs" className="space-y-[15px]">
        {activities.map((act) => (
          <div
            key={act.id}
            id={`activity-row-${act.id}`}
            className="flex items-center justify-between gap-1.5 xs:gap-3 sm:gap-4 py-1.5 px-1 rounded-2xl hover:bg-gray-50/50 transition-colors text-start"
          >
            {/* Initials avatar + Action details */}
            <div id={`activity-details-left-${act.id}`} className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              {/* Colored Badge of User Initials */}
              <div
                id={`activity-badge-${act.id}`}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black font-sans text-xs sm:text-sm tracking-wide shrink-0 shadow-xs border border-gray-100/10 ${act.avatarColor}`}
              >
                {act.initials}
              </div>

              {/* Action meta */}
              <div id={`activity-text-${act.id}`} className="min-w-0 pr-1 sm:pr-3">
                <h4 id={`activity-user-${act.id}`} className="font-bold text-gray-900 font-cairo text-xs sm:text-[15px] leading-snug">
                  {act.user}
                </h4>
                <p id={`activity-action-${act.id}`} className="text-gray-500 font-cairo text-[11.5px] sm:text-[13px] mt-0.5 leading-tight truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs xl:max-w-sm">
                  {act.action}
                </p>
              </div>
            </div>

            {/* Timestamps on the right */}
            <span
              id={`activity-timestamp-${act.id}`}
              className="text-[10.5px] sm:text-xs font-bold font-mono text-gray-400 shrink-0 whitespace-nowrap self-start mt-1"
            >
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
