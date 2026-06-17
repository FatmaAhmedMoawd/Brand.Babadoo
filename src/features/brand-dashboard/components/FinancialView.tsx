import React, { useState } from 'react';
import {
  Wallet,
  Clock,
  ArrowUpRight,
  Search,
  Download,
  Filter,
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  User,
  Building
} from 'lucide-react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';

interface Transaction {
  id: string;
  date: string;
  time: string;
  amount: string;
  source: 'Order' | 'Fee' | 'Refund';
  status: 'Completed' | 'Processing' | 'Refunded';
}

export const FinancialView: React.FC = () => {
  // Navigation internal state: 'overview' shows payment list, 'withdraw' shows the detailed bank inputs page
  const [viewState, setViewState] = useState<'overview' | 'withdraw'>('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Withdraw page inputs & states
  const [withdrawAmount, setWithdrawAmount] = useState('0');
  const [accountHolder, setAccountHolder] = useState('');
  const [ibanNum, setIbanNum] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Lock scrolling on background when success modal is open
  useBodyScrollLock(showSuccessPopup);

  // Hardcoded transaction history matching the screenshot exactly
  const allTransactions: Transaction[] = [
    {
      id: 'TXN-001245',
      date: 'Feb 6, 2026',
      time: '14:32',
      amount: '2.5k EGP',
      source: 'Order',
      status: 'Completed',
    },
    {
      id: 'TXN-001244',
      date: 'Feb 4, 2026',
      time: '09:15',
      amount: '1.9k EGP',
      source: 'Fee',
      status: 'Completed',
    },
    {
      id: 'TXN-001243',
      date: 'Feb 2, 2026',
      time: '16:45',
      amount: '3.2k EGP',
      source: 'Order',
      status: 'Processing',
    },
    {
      id: 'TXN-001242',
      date: 'Jan 31, 2026',
      time: '11:20',
      amount: '980 EGP',
      source: 'Refund',
      status: 'Completed',
    },
    {
      id: 'TXN-001241',
      date: 'Jan 29, 2026',
      time: '13:55',
      amount: '1.5k EGP',
      source: 'Order',
      status: 'Refunded',
    },
  ];

  // Simple filter for simulation
  const filteredTransactions = allTransactions.filter(item => {
    const idMatches = item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const amountMatches = item.amount.toLowerCase().includes(searchQuery.toLowerCase());
    const sourceMatches = item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return idMatches || amountMatches || sourceMatches;
  });

  const getSourceBadgeStyle = (source: Transaction['source']) => {
    switch (source) {
      case 'Order':
        return 'border border-[#12B76A]/45 text-[#12B76A] bg-[#ECFDF5]/20 font-bold px-3 py-1 text-[13px] rounded-[10px] text-center min-w-[70px] inline-block';
      case 'Fee':
        return 'border border-gray-300 text-gray-500 bg-transparent font-bold px-3 py-1 text-[13px] rounded-[10px] text-center min-w-[70px] inline-block';
      case 'Refund':
        return 'border border-red-500/40 text-red-500 bg-red-50/10 font-bold px-3 py-1 text-[13px] rounded-[10px] text-center min-w-[70px] inline-block';
      default:
        return 'border border-gray-300 text-gray-600 bg-transparent font-bold px-3 py-1 text-[13px] rounded-[10px] text-center min-w-[70px] inline-block';
    }
  };

  const getStatusBadgeStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'border border-transparent bg-[#ECFDF5] text-[#059669] font-bold rounded-full px-3.5 py-1 text-[13px] inline-flex items-center gap-1.5';
      case 'Processing':
        return 'border border-transparent bg-[#FFFBEB] text-[#D97706] font-bold rounded-full px-3.5 py-1 text-[13px] inline-flex items-center gap-1.5';
      case 'Refunded':
        return 'border border-transparent bg-[#EFF6FF] text-[#2563EB] font-bold rounded-full px-3.5 py-1 text-[13px] inline-flex items-center gap-1.5';
      default:
        return 'border border-transparent bg-gray-50 text-gray-600 font-bold rounded-full px-3.5 py-1 text-[13px] inline-flex items-center gap-1.5';
    }
  };

  const getStatusDotColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#059669]';
      case 'Processing':
        return 'bg-[#D97706]';
      case 'Refunded':
        return 'bg-[#2563EB]';
      default:
        return 'bg-gray-400';
    }
  };

  const handleExport = () => {
    const headers = ['Transaction ID', 'Date & Time', 'Amount', 'Source', 'Status'];
    const rows = allTransactions.map(t => [t.id, `${t.date} ${t.time}`, t.amount, t.source, t.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePresetSelect = (value: string) => {
    setWithdrawAmount(value);
  };

  const handleConfirmClick = () => {
    setShowSuccessPopup(true);
  };

  // Switch between Overview and Withdraw Full Screen Pages
  if (viewState === 'withdraw') {
    return (
      <div id="withdraw-funds-page" className="space-y-6 text-start select-none w-full animate-fadeIn pb-12 relative">
        
        {/* Back navigation button */}
        <button
          id="back-to-financial-btn"
          onClick={() => setViewState('overview')}
          className="inline-flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold text-[15px] font-cairo cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Financial</span>
        </button>

        {/* Header Titles */}
        <div id="withdraw-header" className="space-y-1.5 text-start">
          <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
            Withdraw Funds
          </h1>
          <p className="text-[15px] font-medium text-gray-400 font-cairo">
            Transfer your earnings to your preferred payment method
          </p>
        </div>

        {/* Current Available Balance large bar */}
        <div id="current-balance-card" className="bg-white border border-gray-150 rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.015)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2 text-start">
            <span className="text-[14px] font-semibold text-gray-500 block leading-none">
              Current Available Balance
            </span>
            <span className="text-[32px] font-black text-gray-950 block leading-none font-sans">
              15.4k EGP
            </span>
            <span className="text-[14.5px] font-medium text-gray-400 block font-cairo">
              Funds will be transferred to your selected method within 2–3 business days.
            </span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-[#AE6727] flex items-center justify-center text-white shrink-0 shadow-sm">
            <span className="text-[26px] font-bold font-sans select-none">$</span>
          </div>
        </div>

        {/* Form Inputs & Checkout Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Inputs) */}
          <div className="lg:col-span-2 space-y-6">
            <div id="inputs-container-card" className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-start space-y-5">
              
              {/* Amount to Withdraw field */}
              <div className="space-y-2">
                <label className="block text-[14.5px] font-bold text-[#1E293B] font-cairo">
                  Amount to Withdraw <span className="text-red-500 font-bold">*</span>
                </label>
                
                <div className="relative">
                  <input
                    type="text"
                    value={withdrawAmount}
                    onChange={(e) => {
                      // Allow digits only
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setWithdrawAmount(val || '0');
                    }}
                    className="w-full bg-white border border-gray-200 rounded-[12px] py-3.5 px-4 pr-16 text-lg font-bold text-gray-950 outline-none transition-all focus:border-[#AE6727] focus:ring-4 focus:ring-[#AE6727]/5 font-sans"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-extrabold text-gray-400 text-sm select-none">
                    EGP
                  </span>
                </div>

                {/* Preset quick buttons */}
                <div className="flex flex-wrap gap-2.5 pt-1.5 select-none">
                  {[
                    { label: '1k', value: '1000' },
                    { label: '5k', value: '5000' },
                    { label: '10k', value: '10000' },
                    { label: 'Withdraw All', value: '15400' }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetSelect(preset.value)}
                      className={`px-4.5 py-2.5 border rounded-[10px] text-[13.5px] font-bold transition-all cursor-pointer ${
                        withdrawAmount === preset.value
                          ? 'border-[#AE6727] bg-[#FCF5EE] text-[#AE6727]'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Title: Bank Account Information */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-[17.5px] font-bold text-gray-950 font-cairo">
                  Bank Account Information
                </h3>
              </div>

              {/* Account Holder Name input */}
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#1E293B] font-cairo">
                  Account Holder Name <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="Enter Full name"
                    className="w-full bg-white border border-gray-200 rounded-[12px] py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#AE6727] focus:ring-4 focus:ring-[#AE6727]/5"
                  />
                </div>
              </div>

              {/* IBAN Number input */}
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#1E293B] font-cairo">
                  IBAN Number <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    required
                    value={ibanNum}
                    onChange={(e) => setIbanNum(e.target.value)}
                    placeholder="Enter iban number"
                    className="w-full bg-white border border-gray-200 rounded-[12px] py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#AE6727] focus:ring-4 focus:ring-[#AE6727]/5"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Transaction Summary Card & Action Buttons) */}
          <div className="space-y-6">
            <div id="transaction-summary-card" className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)] text-start space-y-4">
              <h3 className="text-[17.5px] font-black text-gray-950 font-cairo">
                Transaction Summary
              </h3>

              <div className="space-y-3.5">
                {/* Requested Amount row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-500 font-cairo">Requested Amount</span>
                  <span className="font-extrabold text-gray-950">
                    {Number(withdrawAmount) === 1000
                      ? '1k EGP'
                      : Number(withdrawAmount) === 5000
                      ? '5k EGP'
                      : Number(withdrawAmount) === 10000
                      ? '10k EGP'
                      : `${(Number(withdrawAmount) || 0).toLocaleString()} EGP`}
                  </span>
                </div>

                {/* Transfer Fees row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-500 font-cairo">Transfer Fees</span>
                  <span className="font-extrabold text-[#D92D20]">-50 EGP</span>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100 my-4" />

                {/* Net Amount row */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-500 text-sm font-cairo">Net Amount to Receive</span>
                  <span className="text-xl font-extrabold text-gray-950 font-sans">
                    {Math.max(0, (Number(withdrawAmount) || 0) - 50).toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Buttons Column (vertical stack) */}
            <div className="flex flex-col gap-3 select-none w-full">
              <button
                type="button"
                onClick={handleConfirmClick}
                className="w-full py-3.5 px-4 bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-[15px] transition-all cursor-pointer font-cairo shadow-md"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Cofirm Withdrawal</span>
              </button>

              <button
                type="button"
                onClick={() => setViewState('overview')}
                className="w-full py-3.5 px-4 border border-[#AE6727] text-[#AE6727] hover:bg-[#FCF5EE] font-bold rounded-xl text-center text-[15px] transition-all cursor-pointer font-cairo"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>

        {/* Centered Success Popup Overlay with precise elements matching the second screenshot */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => {
                setShowSuccessPopup(false);
                setViewState('overview');
                setWithdrawAmount('0');
              }}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-fadeIn"
            />

            <div className="bg-white w-full max-w-[440px] rounded-[24px] border border-gray-100 p-8 relative z-10 shadow-[0_24px_64px_rgba(0,0,0,0.18)] select-text text-center animate-scaleIn space-y-6">
              
              {/* Giant green success circle with white checkmark */}
              <div className="w-[80px] h-[80px] bg-[#22C55E] text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/15 shrink-0 select-none">
                <svg className="w-[42px] h-[42px] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Texts */}
              <div className="space-y-2.5">
                <h3 className="text-[25px] font-black text-[#1E293B] tracking-tight leading-tight font-sans">
                  Withdrawal Request Received
                </h3>
                <p className="text-[14.5px] font-semibold text-gray-500 leading-relaxed font-cairo max-w-sm mx-auto">
                  Your request to withdraw funds is being processed. The amount will be transferred to your linked bank account within 2–3 business days.
                </p>
              </div>

              {/* Ok Confirm Button */}
              <button
                type="button"
                onClick={() => {
                  setShowSuccessPopup(false);
                  setViewState('overview');
                  setWithdrawAmount('0');
                }}
                className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-3.5 rounded-[12px] transition-all text-base tracking-wide font-cairo cursor-pointer block text-center shadow-md shadow-[#AE6727]/10"
              >
                Ok
              </button>

            </div>
          </div>
        )}

      </div>
    );
  }

  // DEFAULT VIEW: Overview page / Dashboard table view
  return (
    <div id="financial-view-container" className="space-y-8 text-start select-none w-full animate-fadeIn">
      {/* 1. Header Information & Withdraw Button */}
      <div id="financial-view-header" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="text-start space-y-2">
          <h1 id="financial-view-title" className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
            Financial
          </h1>
          <p id="financial-view-subtitle" className="text-[15px] font-medium font-cairo text-gray-400 max-w-2xl leading-relaxed">
            Manage your earnings, withdrawals, and payment history
          </p>
        </div>

        <button
          id="withdraw-funds-btn"
          type="button"
          onClick={() => setViewState('withdraw')}
          className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-3 px-5 rounded-[12px] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 shrink-0 cursor-pointer self-start md:self-center"
        >
          <Wallet className="w-5 h-5" />
          <span>Withdraw Funds</span>
        </button>
      </div>

      {/* 2. Metrics row exactly matching screenshot */}
      <div id="financial-metrics-row" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Available Balance Metric Card */}
        <div id="metric-card-available-balance" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727] shrink-0">
              <Wallet className="w-[18px] h-[18px]" />
            </div>
            <span className="font-semibold text-gray-500 text-[15px] leading-none">Available Balance</span>
          </div>
          <div className="flex items-end justify-between gap-4 mt-4">
            <div className="flex items-baseline">
              <span className="text-[28px] font-black text-gray-950 leading-none tracking-tight">15.4k</span>
              <span className="text-sm font-semibold text-gray-500 ml-1.5 leading-none">EGP</span>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-[#E6F9EE] border border-[#D1F7EC] text-[#12B76A] text-[12px] font-extrabold rounded-full leading-none">
                1.2k EGP +
              </span>
              <span className="text-[10px] text-[#12B76A] font-extrabold tracking-wide whitespace-nowrap">this week</span>
            </div>
          </div>
        </div>

        {/* Pending Balance Metric Card */}
        <div id="metric-card-pending-balance" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727] shrink-0">
              <Clock className="w-[18px] h-[18px]" />
            </div>
            <span className="font-semibold text-gray-500 text-[15px] leading-none">Pending Balance</span>
          </div>
          <div className="flex items-end justify-between gap-4 mt-4">
            <div className="flex items-baseline">
              <span className="text-[28px] font-black text-gray-950 leading-none tracking-tight">3.2k</span>
              <span className="text-sm font-semibold text-gray-500 ml-1.5 leading-none">EGP</span>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="inline-flex items-center gap-0.5 py-1 px-2.5 bg-red-50 border border-red-100 text-red-600 text-[12px] font-extrabold rounded-full leading-none">
                -15% ↘
              </span>
              <span className="text-[10px] text-gray-400 font-extrabold tracking-wide whitespace-nowrap">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Total Withdrawn Metric Card */}
        <div id="metric-card-total-withdrawn" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-gray-200 hover:shadow-xs transition-all duration-300 min-h-[148px]">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727] shrink-0">
              <ArrowUpRight className="w-[18px] h-[18px]" />
            </div>
            <span className="font-semibold text-gray-500 text-[15px] leading-none">Total Withdrawn</span>
          </div>
          <div className="flex items-end justify-between gap-4 mt-4 font-sans">
            <div className="flex items-baseline">
              <span className="text-[28px] font-black text-gray-950 leading-none tracking-tight">120k</span>
              <span className="text-sm font-semibold text-gray-500 ml-1.5 leading-none">EGP</span>
            </div>
            <span className="inline-flex items-center py-1.5 px-3 bg-[#AE6727] text-white text-[11px] font-extrabold rounded-full leading-none shadow-sm shadow-[#AE6727]/10 shrink-0">
              Last withdrawal: 2 days
            </span>
          </div>
        </div>

      </div>

      {/* 3. Main Payment History Section */}
      <div id="payment-history-card" className="bg-white border border-gray-100 rounded-[24px] p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col w-full">
        
        {/* Card Header with inputs */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 pb-6 border-b border-gray-100">
          <div className="text-start">
            <h2 className="text-xl font-bold font-cairo text-gray-990 md:text-[22px]">Payment History</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
            {/* Search Input filter */}
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything"
                className="w-full bg-white border border-gray-200 rounded-[12px] py-2.5 ps-11 pe-4 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#AE6727] focus:ring-4 focus:ring-[#AE6727]/5"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              type="button"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 rounded-[12px] px-4.5 py-2.5 text-[14.5px] font-semibold text-gray-700 bg-white hover:bg-gray-55 hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-gray-500" />
              <span>Export</span>
            </button>

            {/* All Branches Filter Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className={`w-full sm:w-auto inline-flex items-center justify-between gap-3 border rounded-[12px] px-4.5 py-2.5 text-[14.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  branchDropdownOpen
                    ? 'border-[#AE6727] bg-white text-[#AE6727] ring-4 ring-[#AE6727]/5'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span>{selectedBranch}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {branchDropdownOpen && (
                <div className="absolute right-0 mt-2 z-30 w-56 bg-white border border-gray-150 rounded-2xl shadow-xl p-1.5 flex flex-col text-start overflow-hidden animate-fadeIn">
                  {['All Branches', 'Main Branch - Downtown', 'North Branch'].map((branch) => (
                    <button
                      key={branch}
                      onClick={() => {
                        setSelectedBranch(branch);
                        setBranchDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-gray-55 text-start font-bold rounded-xl transition-all ${
                        selectedBranch === branch
                          ? 'text-[#AE6727] bg-[#FCF5EE]'
                          : 'text-gray-700'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Table view matching screenshot layout exactly */}
        <div className="w-full overflow-x-auto pb-4 pt-4 select-text">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="bg-[#ECECEC]/90 text-[#212121]">
                <th className="py-3.5 px-4 text-start font-bold font-sans text-[14.5px] rounded-l-xl">Transaction ID</th>
                <th className="py-3.5 px-4 text-start font-bold font-sans text-[14.5px]">Date & Time</th>
                <th className="py-3.5 px-4 text-start font-bold font-sans text-[14.5px]">Amount</th>
                <th className="py-3.5 px-4 text-start font-bold font-sans text-[14.5px]">Source</th>
                <th className="py-3.5 px-4 text-start font-bold font-sans text-[14.5px] rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150/60">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Transaction ID */}
                    <td className="py-4.5 px-4 font-mono font-black text-[14.5px] text-gray-950 align-middle">
                      {tx.id}
                    </td>

                    {/* Date & Time (Multi Line) */}
                    <td className="py-4.5 px-4 align-middle text-start">
                      <div className="flex flex-col font-cairo">
                        <span className="font-extrabold text-[#3D2B1F] text-[14.5px]">
                          {tx.date}
                        </span>
                        <span className="text-gray-400 text-xs font-bold mt-[2px]">
                          {tx.time}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4.5 px-4 font-black font-sans text-[14.5px] text-gray-950 align-middle text-start">
                      {tx.amount}
                    </td>

                    {/* Source outline badge */}
                    <td className="py-4.5 px-4 align-middle text-start">
                      <span className={getSourceBadgeStyle(tx.source)}>
                        {tx.source}
                      </span>
                    </td>

                    {/* Status badge with colored dot inside */}
                    <td className="py-4.5 px-4 align-middle text-start whitespace-nowrap">
                      <span className={getStatusBadgeStyle(tx.status)}>
                        <span className={`w-2 h-2 rounded-full ${getStatusDotColor(tx.status)}`} />
                        <span>{tx.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-bold font-cairo">
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination and showing footer */}
        <div id="payment-table-footer" className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 select-none">
          <span className="text-[14.5px] font-extrabold text-gray-400 font-cairo">
            Showing 1 to {filteredTransactions.length} of 20 Orders
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className="px-3.5 py-2 text-sm font-extrabold text-gray-400 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            
            {[1, 2, 3].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center text-sm font-black rounded-lg transition-all ${
                  currentPage === pageNum
                    ? 'bg-[#AE6727] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => currentPage < 3 && setCurrentPage(currentPage + 1)}
              className="px-3.5 py-2 text-sm font-extrabold text-gray-400 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
