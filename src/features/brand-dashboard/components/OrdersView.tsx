import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  ChevronDown,
  MoreVertical,
  Clock,
  Package,
  Coins,
  ArrowUpRight,
  User,
  CheckCircle2,
  Check,
  MessageSquare,
  Globe,
  MapPin,
  Building
} from 'lucide-react';

interface OrderSummaryItem {
  id: string;
  customer: string;
  items: string[];
  amount: string;
  rawAmount: number; // for total calculations
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  branch: string;
  date: 'Today' | 'Yesterday' | 'Last 7 Days';
  statusText?: string;
}

interface OrdersViewProps {
  showNewOrderAlert?: boolean;
  setShowNewOrderAlert?: (show: boolean) => void;
  onViewOrder?: (orderId: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  showNewOrderAlert = false,
  setShowNewOrderAlert,
  onViewOrder
}) => {
  // Tabs and filter states
  const [activeTab, setActiveTab] = useState<'ongoing' | 'new' | 'completed' | 'cancelled'>('ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dropdown states
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<'All Branches' | 'Main Branch - Downtown' | 'North Branch'>('All Branches');
  
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<'Today' | 'Yesterday' | 'Last 7 Days'>('Today');

  // Popup state - Managed locally inside OrdersView for manual triggers if needed
  // or shown automatically
  
  // Ref for outside clicks to close dropdowns
  const branchDropdownRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setTimeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Database of orders with mock data for realistic filters
  const allOrders: OrderSummaryItem[] = [
    // --- ONGOING ORDERS ---
    {
      id: '#ORD-5502',
      customer: 'Sama Galal',
      items: ['1x Double Beef Meal,', '1x Apple Pie'],
      amount: '438.40 EGP',
      rawAmount: 438.4,
      status: 'Out for Delivery',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },
    {
      id: '#ORD-5501',
      customer: 'Sara Ahmed',
      items: ['2x Margherita Large,', '1x Family Fries'],
      amount: '480 EGP',
      rawAmount: 480.0,
      status: 'Preparing',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },
    {
      id: '#ORD-5505',
      customer: 'Yousef Kamal',
      items: ['9 Pcs Bucket,', '1x Large Coleslaw'],
      amount: '550 EGP',
      rawAmount: 550.0,
      status: 'Preparing',
      branch: 'North Branch',
      date: 'Today'
    },
    {
      id: '#ORD-5504',
      customer: 'Lila Hasan',
      items: ['1x Fettuccine Alfredo,', '1x Garlic Bread'],
      amount: '210 EGP',
      rawAmount: 210.0,
      status: 'Preparing',
      branch: 'North Branch',
      date: 'Today'
    },

    // --- NEW ORDERS ---
    {
      id: '#ORD-7701',
      customer: 'Ahmed Sami',
      items: ['2x Mix Grill,', '1x Green Salad'],
      amount: '45.0 EGP',
      rawAmount: 45.0,
      status: 'Pending',
      statusText: '2 mins ago',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },
    {
      id: '#ORD-5502',
      customer: 'Sarah Mahmoud',
      items: ['1x Margherita Pizza (L),', '1x Coke'],
      amount: '18.50 EGP',
      rawAmount: 18.50,
      status: 'Pending',
      statusText: '5 mins ago',
      branch: 'North Branch',
      date: 'Today'
    },
    {
      id: '#ORD-5503',
      customer: 'Leila Hassan',
      items: ['3x Chicken Shawarma', 'Sandwiches'],
      amount: '21.00 EGP',
      rawAmount: 21.0,
      status: 'Pending',
      statusText: '8 mins ago',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },

    // --- COMPLETED ORDERS ---
    {
      id: '#ORD-5501',
      customer: 'Ahmed Mansour',
      items: ['2x Double Cheese Burger,', '1x Large Fries'],
      amount: '450 EGP',
      rawAmount: 450.0,
      status: 'Completed',
      statusText: 'Delivered',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },
    {
      id: '#ORD-5503',
      customer: 'Marawan Khaled',
      items: ['24 Pieces Mixed Sushi,', '2x Miso Soup'],
      amount: '1.2k EGP',
      rawAmount: 1200.0,
      status: 'Completed',
      statusText: 'Delivered',
      branch: 'North Branch',
      date: 'Today'
    },
    {
      id: '#ORD-5504',
      customer: 'Mona Zaki',
      items: ['Grocery Pack (12 Items)'],
      amount: '1,200 EGP',
      rawAmount: 1200.0,
      status: 'Completed',
      statusText: 'Delivered',
      branch: 'Main Branch - Downtown',
      date: 'Today'
    },
    {
      id: '#ORD-5505',
      customer: 'Khaled Selim',
      items: ['1x Family Pizza, 1x Apple Juice,', '2x Cheesecake'],
      amount: '680 EGP',
      rawAmount: 680.0,
      status: 'Completed',
      statusText: 'Delivered',
      branch: 'North Branch',
      date: 'Today'
    },

    // --- CANCELLED ORDERS ---
    {
      id: '#ORD-5312',
      customer: 'Mona Ahmed',
      items: ['Beef Wrap'],
      amount: '280 EGP',
      rawAmount: 280.0,
      status: 'Cancelled',
      statusText: 'Cancelled',
      branch: 'North Branch',
      date: 'Today'
    }
  ];

  // Helper filter logic
  const filteredOrders = allOrders.filter(order => {
    // 1. Tab match
    let tabMatch = false;
    if (activeTab === 'ongoing') {
      tabMatch = order.status === 'Preparing' || order.status === 'Out for Delivery';
    } else if (activeTab === 'new') {
      tabMatch = order.status === 'Pending';
    } else if (activeTab === 'completed') {
      tabMatch = order.status === 'Completed';
    } else if (activeTab === 'cancelled') {
      tabMatch = order.status === 'Cancelled';
    }

    // 2. Branch match
    const branchMatch = selectedBranch === 'All Branches' || order.branch === selectedBranch;

    // 3. Time range match
    const timeMatch = selectedTime === 'Last 7 Days' || order.date === selectedTime;

    // 4. Search text match
    const searchMatch = searchQuery.trim() === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    return tabMatch && branchMatch && timeMatch && searchMatch;
  });

  // Badge background classes
  const getStatusBadgeStyles = (status: OrderSummaryItem['status']) => {
    switch (status) {
      case 'Pending':
        return 'border border-amber-500/30 bg-amber-50/50 text-amber-600';
      case 'Preparing':
        return 'border border-amber-500/30 bg-[#FFFBEB] text-[#D97706]';
      case 'Out for Delivery':
        return 'border border-[#3B82F6]/30 bg-[#EFF6FF] text-[#2563EB]';
      case 'Completed':
        return 'border border-emerald-500/30 bg-[#ECFDF5] text-[#059669]';
      case 'Cancelled':
        return 'border border-red-500/30 bg-[#FEF2F2] text-[#DC2626]';
      default:
        return 'border border-gray-200 bg-gray-50 text-gray-600';
    }
  };

  return (
    <div id="orders-dashboard-view" className="space-y-8 text-start select-none w-full animate-fadeIn">
      {/* 1. Header Information */}
      <div id="orders-view-header" className="select-none text-start space-y-2">
        <div className="flex items-center justify-between gap-4 w-full">
          <h1 id="orders-view-title" className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
            Orders
          </h1>
          
          {!showNewOrderAlert && (
            <button
              type="button"
              onClick={() => setShowNewOrderAlert && setShowNewOrderAlert(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FCF5EE] border border-[#AE6727]/15 hover:bg-[#F2E7DC] text-[#AE6727] text-[13.5px] font-bold font-cairo rounded-full transition-all duration-300 cursor-pointer animate-pulseSoft shadow-xs hover:scale-102 active:scale-98 shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulseIndicator absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12B76A]"></span>
              </span>
              <span>New Order Alert</span>
            </button>
          )}
        </div>
        
        <p id="orders-view-subtitle" className="text-[15px] font-medium font-cairo text-gray-400">
          Manage and track your store orders in real-time.
        </p>
      </div>

      {/* 2. Metrics row exactly matching screenshot */}
      <div id="orders-metrics-row" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Orders Metric */}
        <div id="metric-card-total-orders" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-[#FCF5EE]">
              <Package className="w-5 h-5 text-[#AE6727]" />
            </div>
            <span className="font-medium text-gray-500 text-[15px] leading-none">Total Orders</span>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">1.2k</span>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-[#E6F9EE] border border-[#D1F7EC] text-[#12B76A] text-[12px] font-bold rounded-full leading-none">
                +15% ↗
              </span>
              <span className="text-[10px] text-[#12B76A] font-semibold tracking-wide whitespace-nowrap">vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Active Orders Metric */}
        <div id="metric-card-active-orders" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-[#FCF5EE]">
              <Clock className="w-5 h-5 text-[#AE6727]" />
            </div>
            <span className="font-medium text-gray-500 text-[15px] leading-none">Active Orders</span>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">45</span>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-[#E6F9EE] border border-[#D1F7EC] text-[#12B76A] text-[12px] font-bold rounded-full leading-none">
                +12% ↗
              </span>
              <span className="text-[10px] text-[#12B76A] font-semibold tracking-wide whitespace-nowrap">vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Metric */}
        <div id="metric-card-total-revenue" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-[#FCF5EE]">
              <Coins className="w-5 h-5 text-[#AE6727]" />
            </div>
            <span className="font-medium text-gray-500 text-[15px] leading-none">Total Revenue</span>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div className="flex items-baseline">
              <span className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">45.8k</span>
              <span className="text-sm font-medium text-gray-500 ml-1.5 leading-none">EGP</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-[#E6F9EE] border border-[#D1F7EC] text-[#12B76A] text-[12px] font-bold rounded-full leading-none">
                8.4% ↗
              </span>
              <span className="text-[10px] text-[#12B76A] font-semibold tracking-wide whitespace-nowrap">vs yesterday</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Order List Panel containing Filters & Tables */}
      <div id="orders-list-card" className="bg-white border border-gray-100 rounded-[24px] p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col w-full">
        
        {/* Header of dynamic table area with Filters dropdown */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 pb-6 border-b border-gray-50">
          
          <div className="text-start">
            <h2 className="text-xl font-bold font-cairo text-gray-900">Orders list</h2>
          </div>

          {/* Action Tools: Search input & two styled Dropdown selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            
            {/* Search order ID */}
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#AE6727]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID"
                className="w-full bg-white border border-gray-200 rounded-[12px] py-2.5 ps-10 pe-4 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#AE6727] focus:ring-2 focus:ring-[#AE6727]/5"
              />
            </div>

            {/* "All Branches" Dropdown (Ref) */}
            <div className="relative shrink-0" ref={branchDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setBranchDropdownOpen(!branchDropdownOpen);
                  setTimeDropdownOpen(false);
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-between gap-2 border rounded-[12px] px-4 py-2.5 text-[14.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  branchDropdownOpen
                    ? 'border-[#AE6727] bg-white text-[#AE6727] ring-4 ring-[#AE6727]/5 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50/50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className={`w-4 h-4 ${branchDropdownOpen ? 'text-[#AE6727]' : 'text-gray-500'}`} />
                  <span className="font-cairo">{selectedBranch}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${branchDropdownOpen ? 'rotate-180 text-[#AE6727]' : 'text-gray-400'}`} />
              </button>

              {/* Branch Dropdown list popup matching screenshot */}
              {branchDropdownOpen && (
                <div className="absolute left-0 mt-2 z-30 w-56 bg-white border border-gray-150 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] p-1.5 flex flex-col text-start overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => {
                      setSelectedBranch('All Branches');
                      setBranchDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedBranch === 'All Branches'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>All Branches</span>
                    {selectedBranch === 'All Branches' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBranch('Main Branch - Downtown');
                      setBranchDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedBranch === 'Main Branch - Downtown'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>Main Branch - Downtown</span>
                    {selectedBranch === 'Main Branch - Downtown' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBranch('North Branch');
                      setBranchDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedBranch === 'North Branch'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>North Branch</span>
                    {selectedBranch === 'North Branch' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                </div>
              )}
            </div>

            {/* "Today" Dropdown (Ref) */}
            <div className="relative shrink-0" ref={timeDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setTimeDropdownOpen(!timeDropdownOpen);
                  setBranchDropdownOpen(false);
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-between gap-2 border rounded-[12px] px-4 py-2.5 text-[14.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  timeDropdownOpen
                    ? 'border-[#AE6727] bg-white text-[#AE6727] ring-4 ring-[#AE6727]/5 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50/50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${timeDropdownOpen ? 'text-[#AE6727]' : 'text-gray-500'}`} />
                  <span className="font-cairo">{selectedTime}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${timeDropdownOpen ? 'rotate-180 text-[#AE6727]' : 'text-gray-400'}`} />
              </button>

              {/* Time Dropdown list popup matching screenshot in pure English */}
              {timeDropdownOpen && (
                <div className="absolute right-0 mt-2 z-30 w-48 bg-white border border-gray-150 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] p-1.5 flex flex-col text-start overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => {
                      setSelectedTime('Today');
                      setTimeDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedTime === 'Today'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>Today</span>
                    {selectedTime === 'Today' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTime('Yesterday');
                      setTimeDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedTime === 'Yesterday'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>Yesterday</span>
                    {selectedTime === 'Yesterday' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTime('Last 7 Days');
                      setTimeDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-50 text-start font-medium rounded-xl transition-all flex items-center justify-between ${
                      selectedTime === 'Last 7 Days'
                        ? 'text-[#AE6727] font-semibold bg-[#FCF5EE]/70'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>Last 7 Days</span>
                    {selectedTime === 'Last 7 Days' && <Check className="w-4 h-4 text-[#AE6727] shrink-0" />}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 4. Tab Navigation Bar exactly styled with brown indicator underline */}
        <div id="orders-tab-selectors" className="flex items-center justify-start gap-1 overflow-x-auto custom-scrollbar border-b border-gray-100 shrink-0 select-none mt-2 pb-1.5">
          
          <button
            onClick={() => setActiveTab('new')}
            className={`py-4 px-4 font-cairo text-[15px] font-bold cursor-pointer whitespace-nowrap transition-colors shrink-0 relative ${
              activeTab === 'new' ? 'text-[#AE6727]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            New Orders
            {activeTab === 'new' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AE6727] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ongoing')}
            className={`py-4 px-4 font-cairo text-[15px] font-bold cursor-pointer whitespace-nowrap transition-colors shrink-0 relative ${
              activeTab === 'ongoing' ? 'text-[#AE6727]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Ongoing Orders
            {activeTab === 'ongoing' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AE6727] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-4 font-cairo text-[15px] font-bold cursor-pointer whitespace-nowrap transition-colors shrink-0 relative ${
              activeTab === 'completed' ? 'text-[#AE6727]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Completed Orders
            {activeTab === 'completed' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AE6727] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`py-4 px-4 font-cairo text-[15px] font-bold cursor-pointer whitespace-nowrap transition-colors shrink-0 relative ${
              activeTab === 'cancelled' ? 'text-[#AE6727]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Cancelled Orders
            {activeTab === 'cancelled' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AE6727] rounded-t-full" />
            )}
          </button>

        </div>

        {/* 5. Scrollable Database Table viewport */}
        <div className="w-full overflow-x-auto pb-4 select-text">
          <table className="w-full min-w-[750px] border-collapse mt-4">
            <thead>
              <tr className="bg-[#ECECEC]/80 text-[#212121]">
                <th className="py-3 px-4 text-start font-bold font-sans text-[14.5px] rounded-l-xl">Order ID</th>
                <th className="py-3 px-4 text-start font-bold font-sans text-[14.5px]">Customer</th>
                <th className="py-3 px-4 text-start font-bold font-sans text-[14.5px]">Items Summary</th>
                <th className="py-3 px-4 text-start font-bold font-sans text-[14.5px]">Amount</th>
                <th className="py-3 px-4 text-center font-bold font-sans text-[14.5px]">Status</th>
                <th className="py-3 px-4 text-end font-bold font-sans text-[14.5px] rounded-r-xl">Action</th>
              </tr>
            </thead>

            {/* Table Dynamic Rows depending on state filtered list */}
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    onClick={() => onViewOrder && onViewOrder(order.id)}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    
                    {/* Order ID */}
                    <td className="py-4.5 px-4 font-mono text-[14.5px] font-extrabold text-gray-950 align-middle">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4.5 px-4 align-middle">
                      <span className="font-bold text-gray-900 text-[14.5px] group-hover:text-[#AE6727] transition-colors block">
                        {order.customer}
                      </span>
                    </td>

                    {/* Items Summary - separate line rendering */}
                    <td className="py-4.5 px-4 text-start align-middle">
                      <div className="flex flex-col text-[#424242] text-[14px]">
                        {order.items.map((item, i) => (
                          <span key={i} className="leading-tight block font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4.5 px-4 font-bold text-gray-950 font-sans text-[14.5px] whitespace-nowrap align-middle">
                      {order.amount}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4.5 px-4 text-center align-middle whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center font-bold font-cairo text-[13px] px-4.5 py-[5.5px] rounded-[11px] leading-none min-w-[120px] text-center shadow-2xs ${getStatusBadgeStyles(order.status)}`}>
                        {order.statusText || order.status}
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-4.5 px-4 text-end align-middle">
                      <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer inline-flex items-center justify-center">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 6. Footer section with exact match to image 'Showing 1 to 8 of 20 Orders' */}
        <div id="orders-list-footer" className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-50 select-none">
          <span className="text-sm font-semibold text-gray-500 font-cairo">
            Showing {filteredOrders.length > 0 ? '1' : '0'} to {filteredOrders.length} of {filteredOrders.length} Orders
          </span>

          <div className="flex items-center gap-1">
            <button className="px-3.5 py-2 text-sm font-bold text-gray-500 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Previous
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold bg-[#AE6727] text-white rounded-full">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold text-gray-600 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold text-gray-600 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
              3
            </button>
            <button className="px-3.5 py-2 text-sm font-bold text-gray-500 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
