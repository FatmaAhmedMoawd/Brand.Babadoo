import React from 'react';
import { Coins, Wallet, UserPlus, ShoppingCart } from 'lucide-react';

export const MetricsRow: React.FC = () => {
  const metrics = [
    {
      id: 'daily-sales',
      title: 'Daily Sales',
      value: '1.25k',
      currency: 'EGP',
      icon: <Coins className="w-5 h-5 text-[#AE6727]" width={20} height={20} />,
      change: '12%',
      changeSub: 'vs Last week',
    },
    {
      id: 'current-profit',
      title: 'Current Profit',
      value: '450',
      currency: 'EGP',
      icon: <Wallet className="w-5 h-5 text-[#AE6727]" width={20} height={20} />,
      change: '8%',
      changeSub: 'vs Last week',
    },
    {
      id: 'total-subscribers',
      title: 'Total Subscribers',
      value: '1.5k',
      currency: '',
      icon: <UserPlus className="w-5 h-5 text-[#AE6727]" width={20} height={20} />,
      change: '5%',
      changeSub: 'vs Last week',
    },
    {
      id: 'active-orders',
      title: 'Active Orders',
      value: '24',
      currency: '',
      icon: <ShoppingCart className="w-5 h-5 text-[#AE6727]" width={20} height={20} />,
      badge: 'In kitchen right now',
      badgeBg: 'bg-[#AE6727] text-white',
    },
  ];

  return (
    <div id="metrics-cards-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {metrics.map((m) => (
        <div
          key={m.id}
          id={`metric-card-${m.id}`}
          className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-sm transition-all duration-300 text-start min-h-[148px]"
        >
          {/* Header area of Card: Icon + Title */}
          <div id={`metric-header-${m.id}`} className="flex items-center gap-3">
            <div
              id={`metric-icon-circle-${m.id}`}
              className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-[#FCF5EE]"
            >
              {m.icon}
            </div>
            <span
              id={`metric-title-${m.id}`}
              className="font-medium text-gray-500 text-[15px] leading-none"
            >
              {m.title}
            </span>
          </div>

          {/* Value + Change details row */}
          <div id={`metric-meta-row-${m.id}`} className="flex items-end justify-between gap-4 mt-4">
            <div id={`metric-value-container-${m.id}`} className="flex items-baseline">
              <span
                id={`metric-value-${m.id}`}
                className="text-[28px] font-bold text-gray-900 leading-none tracking-tight"
              >
                {m.value}
              </span>
              {m.currency && (
                <span
                  id={`metric-currency-${m.id}`}
                  className="text-sm font-medium text-gray-500 ml-1.5 leading-none"
                >
                  {m.currency}
                </span>
              )}
            </div>

            {/* Change metrics or Kitchen pill */}
            {m.change ? (
              <div id={`metric-change-block-${m.id}`} className="flex flex-col items-center gap-1">
                <span
                  id={`metric-change-badge-${m.id}`}
                  className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-[#E6F9EE] border border-[#D1F7EC] text-[#12B76A] text-[12px] font-semibold rounded-full leading-none"
                >
                  {m.change} ↗
                </span>
                <span
                  id={`metric-change-sub-${m.id}`}
                  className="text-[10px] text-[#12B76A] font-semibold tracking-wide whitespace-nowrap"
                >
                  {m.changeSub}
                </span>
              </div>
            ) : (
              <span
                id={`metric-badge-pill-${m.id}`}
                className={`py-1.5 px-4 rounded-full text-xs font-semibold leading-none shadow-xs ${m.badgeBg}`}
              >
                {m.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
