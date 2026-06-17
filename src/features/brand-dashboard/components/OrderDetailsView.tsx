import React, { useState } from 'react';
import {
  ChevronLeft,
  Phone,
  MapPin,
  Home as HomeIcon,
  ShoppingBag,
  Check,
  Clock,
  Printer,
  ChevronRight,
  Truck,
  DollarSign
} from 'lucide-react';

interface OrderDetailsViewProps {
  onBack: () => void;
}

export const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({ onBack }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [ready, setReady] = useState(false);

  // Stepper times
  const [confirmTime, setConfirmTime] = useState<string>('Pending');
  const [preparingTime, setPreparingTime] = useState<string>('Pending');
  const [readyTime, setReadyTime] = useState<string>('Pending');

  const handleConfirmOrder = () => {
    if (!orderConfirmed) {
      setOrderConfirmed(true);
      setConfirmTime('Oct 24, 2023 | 02:30 PM');
    } else if (!preparing) {
      setPreparing(true);
      setPreparingTime('Oct 24, 2023 | 02:47 PM');
    } else if (!ready) {
      setReady(true);
      setReadyTime('Oct 24, 2023 | 03:10 PM');
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div id="order-details-view-container" className="w-full text-start select-none animate-fadeIn space-y-6">
      {/* Back button link */}
      <div id="order-details-back" className="flex items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold text-[15px] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Back to Order</span>
        </button>
      </div>

      {/* Heading row */}
      <div id="order-details-header" className="flex items-center justify-start w-full">
        <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
          Order Details
        </h1>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Customer Details & Order Journey) - 5 Cols on desktop */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Customer Details Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
            <h2 className="text-[18px] font-black text-[#3D2B1F] font-cairo">
              Customer Details
            </h2>
            
            {/* Center Profile Image */}
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-[#FCF5EE] shadow-sm">
                <img
                  src="https://i.postimg.cc/7ZwLyt9D/Frame-204.png"
                  alt="Customer Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Customer Information Rows */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-gray-400 font-semibold font-cairo">Customer Name</span>
                <span className="text-[#3D2B1F] font-black font-cairo">Sara Galal</span>
              </div>
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-gray-400 font-semibold font-cairo">Phone Number</span>
                <span className="text-[#3D2B1F] font-bold font-sans">+20 123 456 7890</span>
              </div>
            </div>

            {/* Call Customer Button */}
            <div className="flex justify-center pt-2">
              <a
                href="tel:+201234567890"
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md w-full max-w-[280px] text-[15px]"
              >
                <Phone className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Call Customer</span>
              </a>
            </div>

            <div className="border-t border-gray-100/80 pt-5 space-y-5">
              {/* Delivery Address */}
              <div className="text-start space-y-1.5">
                <div className="flex items-center gap-2 text-[#AE6727]">
                  <HomeIcon className="w-[18px] h-[18px] stroke-[2.25]" />
                  <span className="text-gray-400 font-bold font-cairo text-[14px]">Delivery Address</span>
                </div>
                <div className="text-[#3D2B1F] font-black font-cairo text-[15px] leading-relaxed pl-6.5">
                  45 Maadi St., 3rd Floor, Apt 12, Cairo, Egypt
                </div>
              </div>

              {/* Location Link */}
              <div className="text-start space-y-1.5">
                <div className="flex items-center gap-2 text-[#AE6727]">
                  <MapPin className="w-[18px] h-[18px] stroke-[2.25]" />
                  <span className="text-gray-400 font-bold font-cairo text-[14px]">Location Link</span>
                </div>
                <div className="pl-6.5">
                  <a
                    href="https://maps.app.goo.gl/PlaceholderLocationMaadi"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3D2B1F] hover:text-[#AE6727] font-bold font-sans text-[13.5px] break-all transition-colors underline"
                  >
                    https://maps.app.goo.gl/PlaceholderLocationMaadi
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Order Journey Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
            <h2 className="text-[18px] font-black text-[#3D2B1F] font-cairo">
              Order Journey
            </h2>

            {/* Stepper Vertical Tree */}
            <div className="relative space-y-6">
              {/* Vertical connector line aligned with the badges' centers (36px / 2 = 18px) */}
              <div className="absolute left-[18px] top-4.5 bottom-4.5 w-[2px] bg-gray-100" />
              
              {/* Node 1: Order Placed */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#AE6727] flex items-center justify-center text-white shrink-0">
                  <ShoppingBag className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="flex flex-col text-start pt-0.5">
                  <span className="text-[#3D2B1F] font-black font-cairo text-[15px] leading-tight">Order Placed</span>
                  <span className="text-gray-900 font-bold text-[13px] mt-1">Oct 24, 2023 | 02:30 PM</span>
                </div>
              </div>

              {/* Node 2: Order Confirmed */}
              <div className="relative flex items-start gap-4">
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  orderConfirmed 
                    ? 'bg-[#AE6727] border-[#AE6727] text-white shadow-xs' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-start pt-0.5">
                  <span className="text-[#3D2B1F] font-black font-cairo text-[15px] leading-tight">Order Confirmed</span>
                  <span className={`text-[13px] font-bold mt-1 transition-colors ${
                    orderConfirmed ? 'text-gray-950 font-black' : 'text-gray-400'
                  }`}>{confirmTime}</span>
                </div>
              </div>

              {/* Node 3: Start Preparing */}
              <div className="relative flex items-start gap-4">
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  preparing 
                    ? 'bg-[#AE6727] border-[#AE6727] text-white shadow-xs' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}>
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-start pt-0.5">
                  <span className="text-[#3D2B1F] font-black font-cairo text-[15px] leading-tight">Start Preparing</span>
                  <span className={`text-[13px] font-bold mt-1 transition-colors ${
                    preparing ? 'text-gray-950 font-black' : 'text-gray-400'
                  }`}>{preparingTime}</span>
                </div>
              </div>

              {/* Node 4: Ready */}
              <div className="relative flex items-start gap-4">
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  ready 
                    ? 'bg-[#AE6727] border-[#AE6727] text-white shadow-xs' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}>
                  <Truck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col text-start pt-0.5">
                  <span className="text-[#3D2B1F] font-black font-cairo text-[15px] leading-tight">Ready</span>
                  <span className={`text-[13px] font-bold mt-1 transition-colors ${
                    ready ? 'text-gray-950 font-black' : 'text-gray-400'
                  }`}>{readyTime}</span>
                </div>
              </div>

            </div>

            {/* Interactive Confirm / Step Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-3.5 px-4 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-[15px] shadow-xs active:scale-99"
              >
                {orderConfirmed && preparing && ready && (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                )}
                <span>
                  {!orderConfirmed 
                    ? 'Confirm Order' 
                    : !preparing 
                    ? 'Start Preparing' 
                    : !ready 
                    ? 'Mark as Ready' 
                    : 'Completed'}
                </span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column (Order Items, Payment Summary & Info) - 7 Cols on desktop */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          
          {/* Order Items List */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex flex-col text-start">
              <h2 className="text-[18px] font-black text-[#3D2B1F] font-cairo leading-none">
                Order Items
              </h2>
              <span className="text-gray-400 font-semibold font-sans text-[13px] mt-1.5">
                (2 Items)
              </span>
            </div>

            {/* Custom Responsive Table for Order Items */}
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-150 text-gray-400 font-bold font-sans text-[13.5px] text-start">
                    <th className="py-2.5 text-start font-bold">Image</th>
                    <th className="py-2.5 text-start font-bold">Product & Details</th>
                    <th className="py-2.5 text-center font-bold">Qty</th>
                    <th className="py-2.5 text-end font-bold">Unit Price</th>
                    <th className="py-2.5 text-end font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Row 1: Double Beef Meal */}
                  <tr className="group">
                    <td className="py-4 text-start">
                      <div className="w-[65px] h-[65px] rounded-[14px] overflow-hidden border border-gray-100 shrink-0">
                        <img
                          src="https://i.postimg.cc/C5pgsdrm/Frame-189.png"
                          alt="Double Beef Meal"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-3 text-start align-middle">
                      <div className="flex flex-col leading-tight">
                        <span className="font-extrabold text-[#3D2B1F] text-[15px]">Double Beef Meal(Larg)</span>
                        <span className="text-gray-400 font-bold text-[12.5px] mt-1 text-start">Drink: Coca Cola</span>
                        <span className="text-gray-400 font-bold text-[12.5px] mt-0.5 text-start">Note: No Onions</span>
                      </div>
                    </td>
                    <td className="py-4 text-center font-semibold text-[#3D2B1F] text-[15px] align-middle">
                      1
                    </td>
                    <td className="py-4 text-end font-bold text-[#3D2B1F] text-[15px] align-middle whitespace-nowrap">
                      280 EGP
                    </td>
                    <td className="py-4 text-end font-bold text-[#3D2B1F] text-[15px] align-middle whitespace-nowrap">
                      280 EGP
                    </td>
                  </tr>

                  {/* Row 2: Warm Apple Pie */}
                  <tr className="group">
                    <td className="py-4 text-start">
                      <div className="w-[65px] h-[65px] rounded-[14px] overflow-hidden border border-gray-100 shrink-0">
                        <img
                          src="https://i.postimg.cc/SRVmQkDK/Frame-189-(1).png"
                          alt="Warm Apple Pie"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-3 text-start align-middle">
                      <div className="flex flex-col leading-tight">
                        <span className="font-extrabold text-[#3D2B1F] text-[15px]">Warm Apple Pie</span>
                        <span className="text-gray-400 font-bold text-[12.5px] mt-1 text-start">Extra: Caramel Drizzle</span>
                      </div>
                    </td>
                    <td className="py-4 text-center font-semibold text-[#3D2B1F] text-[15px] align-middle">
                      2
                    </td>
                    <td className="py-4 text-end font-bold text-[#3D2B1F] text-[15px] align-middle whitespace-nowrap">
                      40 EGP
                    </td>
                    <td className="py-4 text-end font-bold text-[#3D2B1F] text-[15px] align-middle whitespace-nowrap">
                      80 EGP
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Payment Summary */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-black text-[#3D2B1F] font-cairo leading-none">
                Payment Summary
              </h2>
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="flex items-center gap-1 text-[#AE6727] hover:text-[#8D501D] font-bold text-[14.5px] cursor-pointer transition-colors"
              >
                <Printer className="w-[17px] h-[17px]" />
                <span>Print Receipt</span>
              </button>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="text-gray-500 font-bold font-cairo">Subtotal</span>
                <span className="text-[#3D2B1F] font-black font-sans">360.00 EGP</span>
              </div>
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="text-gray-500 font-bold font-cairo">Delivery Fee</span>
                <span className="text-[#3D2B1F] font-black font-sans">30.00 EGP</span>
              </div>
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="text-gray-500 font-bold font-cairo">Service Charge (5%)</span>
                <span className="text-[#3D2B1F] font-black font-sans">18.00 EGP</span>
              </div>
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="text-gray-500 font-bold font-cairo">VAT / Tax (14%)</span>
                <span className="text-[#3D2B1F] font-black font-sans">50.40 EGP</span>
              </div>
              <div className="flex items-center justify-between text-[14.5px]">
                <span className="text-gray-500 font-bold font-cairo">Discount (Promo: WELCOME20)</span>
                <span className="text-[#3D2B1F] font-black font-sans">20.00 EGP</span>
              </div>
              
              <hr className="border-gray-100" />

              <div className="flex items-center justify-between text-[19px] pt-1">
                <span className="text-[#3D2B1F] font-black font-cairo">Total Amount</span>
                <span className="text-[#3D2B1F] font-black font-sans">438.40 EGP</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-4">
            <h2 className="text-[18px] font-black text-[#3D2B1F] font-cairo leading-none">
              Payment Info
            </h2>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-bold font-cairo text-[14.5px]">Payment Method</span>
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center">
                    <span className="text-[#AE6727] text-[15px] font-semibold">$</span>
                  </div>
                  <span className="text-[#3D2B1F] font-black font-cairo text-[15px]">Cash on Delivery</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-bold font-cairo text-[14.5px]">Payment Status</span>
                <span className="inline-flex items-center justify-center font-bold px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFFBEB] border border-amber-500/25 text-[#D97706]">
                  Pending
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
