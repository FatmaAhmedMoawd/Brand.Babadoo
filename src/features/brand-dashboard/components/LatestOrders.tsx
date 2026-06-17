import React from 'react';
import { MoreVertical } from 'lucide-react';
import { OrderItem } from '../types';

export const LatestOrders: React.FC = () => {
  const orders: OrderItem[] = [
    {
      id: '#2045',
      customerName: 'Sara Ahmed',
      customerId: 'USR4521',
      date: 'Oct 26',
      time: '10:32 AM',
      amount: '350 EGP',
      status: 'Pending',
    },
    {
      id: '#2044',
      customerName: 'Ahmed Ali',
      customerId: 'USR4435',
      date: 'Oct 26',
      time: '09:30 AM',
      amount: '1.2k EGP',
      status: 'Shipped',
    },
    {
      id: '#2043',
      customerName: 'Lila Mahmoud',
      customerId: 'USR4521',
      date: 'Oct 26',
      time: '21:00 PM',
      amount: '850 EGP',
      status: 'Delivered',
    },
    {
      id: '#2042',
      customerName: 'Yousef Hasan',
      customerId: 'USR4356',
      date: 'Oct 26',
      time: '18:45 PM',
      amount: '420 EGP',
      status: 'Pending',
    },
    {
      id: '#2041',
      customerName: 'Mariam Ahmed',
      customerId: 'USR4678',
      date: 'Oct 25',
      time: '10:32 AM',
      amount: '2.1k EGP',
      status: 'Delivered',
    },
    {
      id: '#2041', // Matches image duplicate ID
      customerName: 'Mariam Ahmed',
      customerId: 'USR4678',
      date: 'Oct 25',
      time: '15:20 PM',
      amount: '2.1k EGP',
      status: 'Delivered',
    },
  ];

  const getStatusBadgeStyles = (status: OrderItem['status']) => {
    switch (status) {
      case 'Pending':
        return 'border border-amber-500/30 bg-amber-50/50 text-amber-600';
      case 'Shipped':
        return 'border border-blue-500/30 bg-blue-50/40 text-blue-600';
      case 'Delivered':
        return 'border border-green-500/25 bg-green-50/40 text-green-600';
      default:
        return 'border border-gray-200 bg-gray-50 text-gray-600';
    }
  };

  return (
    <div id="latest-orders-card" className="bg-white border border-gray-100 rounded-[24px] p-3.5 xs:p-5 md:p-8 shadow-xs flex flex-col justify-between w-full max-w-full overflow-hidden">
      {/* Card Header row */}
      <div id="latest-orders-header" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div id="latest-orders-title-wrapper" className="text-start">
          <h3 id="latest-orders-title" className="text-xl font-bold font-cairo text-gray-900 leading-none">
            Latest Orders
          </h3>
          <p id="latest-orders-subtitle" className="text-sm font-medium font-cairo text-gray-400 mt-1.5 leading-none">
            Review and manage your most recent customer transactions.
          </p>
        </div>

        <button
          id="latest-orders-view-all"
          className="text-base font-bold font-cairo text-[#AE6727] hover:underline cursor-pointer self-start sm:self-auto"
        >
          View All
        </button>
      </div>

      {/* Table responsive viewport wrapper */}
      <div id="latest-orders-table-wrapper" className="w-full overflow-x-auto select-text custom-scrollbar pb-2">
        <table id="latest-orders-table" className="w-full min-w-[750px] text-start border-collapse">
          {/* Table Headings */}
          <thead>
            <tr className="bg-[#ECECEC]/80 text-[#212121]">
              <th className="py-3 text-start font-medium text-[15px] font-sans rounded-l-xl pl-4 pr-4">
                Order ID
              </th>
              <th className="py-3 text-start font-medium text-[15px] font-sans pr-4">
                Customer
              </th>
              <th className="py-3 text-start font-medium text-[15px] font-sans pr-4">
                Date&Time
              </th>
              <th className="py-3 text-start font-medium text-[15px] font-sans pr-4">
                Total Amount
              </th>
              <th className="py-3 text-center font-medium text-[15px] font-sans pr-4">
                Status
              </th>
              <th className="py-3 text-end font-medium text-[15px] font-sans rounded-r-xl pr-4 pl-2">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body rows */}
          <tbody className="divide-y divide-gray-50">
            {orders.map((order, idx) => (
              <tr
                key={idx}
                id={`latest-order-row-${idx}`}
                className="hover:bg-gray-50/40 transition-colors group"
              >
                {/* Order ID */}
                <td className="py-4.5 pr-4 pl-4 text-start font-mono text-[14.5px] font-bold text-gray-900">
                  {order.id}
                </td>

                {/* Customer Details info stacked */}
                <td className="py-4.5 pr-4 text-start min-w-[140px]">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 font-cairo text-[14.5px] leading-tight group-hover:text-[#AE6727] transition-colors">
                      {order.customerName}
                    </span>
                    <span className="text-[12px] font-bold font-mono text-gray-400 mt-[3px]">
                      {order.customerId}
                    </span>
                  </div>
                </td>

                {/* Date & Time details stacked */}
                <td className="py-4.5 pr-4 text-start min-w-[120px]">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-950 font-sans text-[14.5px] leading-tight">
                      {order.date}
                    </span>
                    <span className="text-[11.5px] font-semibold font-mono text-gray-400 mt-[2px]">
                      {order.time}
                    </span>
                  </div>
                </td>

                {/* Total amount */}
                <td className="py-4.5 pr-4 text-start font-bold text-gray-950 font-sans text-[14.5px] whitespace-nowrap">
                  {order.amount}
                </td>

                {/* Order fulfillment status badge */}
                <td className="py-4.5 pr-4 text-center align-middle whitespace-nowrap min-w-[110px]">
                  <span
                    id={`order-status-badge-${idx}`}
                    className={`inline-flex items-center justify-center font-bold font-cairo text-[13px] px-4.5 py-[5px] rounded-[11px] leading-none select-none min-w-[84px] text-center ${getStatusBadgeStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* More Action option dropdown */}
                <td className="py-4.5 pl-2 pr-4 text-end text-gray-400 hover:text-gray-600 transition-colors">
                  <button
                    id={`order-action-btn-${idx}`}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                  >
                    <MoreVertical className="w-5 h-5 shrink-0" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
