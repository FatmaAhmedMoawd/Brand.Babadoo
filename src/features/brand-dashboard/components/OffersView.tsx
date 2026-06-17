import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';
import {
  Search,
  Download,
  Filter,
  ChevronDown,
  Tag,
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  Zap,
  Users,
  DollarSign,
  AlertTriangle,
  Info,
  TrendingUp
} from 'lucide-react';

interface OfferItem {
  id: number;
  name: string;
  products: string;
  branch: string;
  status: 'Active' | 'Pending Approval';
  enabled: boolean;
}

interface OffersViewProps {
  onCreateOffer?: () => void;
  onEditOffer?: () => void;
}

export const OffersView: React.FC<OffersViewProps> = ({ onCreateOffer, onEditOffer }) => {
  // 1. Core State
  const [offers, setOffers] = useState<OfferItem[]>([
    {
      id: 1,
      name: 'Coffee Bundle Deal',
      products: 'Classic Cappuccino',
      branch: 'Main Branch - Downtown',
      status: 'Active',
      enabled: true
    },
    {
      id: 2,
      name: 'Weekend Special',
      products: 'Iced Latte',
      branch: 'Main Branch - Downtown',
      status: 'Pending Approval',
      enabled: false
    },
    {
      id: 3,
      name: 'Dessert Combo',
      products: 'Chocolate Cake',
      branch: 'North Branch',
      status: 'Active',
      enabled: true
    }
  ]);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  // Modal / Popup State for Deleting
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<OfferItem | null>(null);

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lock scrolling when deletion modal is open
  useBodyScrollLock(deleteModalOpen);

  // 2. Click outside helper to dismiss the Branch filter dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. Simple action trigger helpers
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleEnabled = (id: number) => {
    setOffers(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
    const offer = offers.find(o => o.id === id);
    if (offer) {
      triggerToast(`"${offer.name}" campaign has been ${!offer.enabled ? 'activated' : 'disabled'}.`);
    }
  };

  const handleDeleteClick = (offer: OfferItem) => {
    setOfferToDelete(offer);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (offerToDelete) {
      setOffers(prev => prev.filter(item => item.id !== offerToDelete.id));
      triggerToast(`"${offerToDelete.name}" campaign has been deleted successfully.`);
      setDeleteModalOpen(false);
      setOfferToDelete(null);
    }
  };

  // 4. Filter and search list logic
  const filteredOffers = useMemo(() => {
    return offers.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchBranch =
        selectedBranch === 'All Branches' ||
        item.branch.includes(selectedBranch);

      return matchSearch && matchBranch;
    });
  }, [offers, searchQuery, selectedBranch]);

  // 5. Hardcoded SVG values matching the original screenshot line chart
  const weekData = [
    { day: 'Mon', value: 40 },
    { day: 'Tue', value: 65 },
    { day: 'Wed', value: 80 },
    { day: 'Thu', value: 55 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 115 },
    { day: 'Sun', value: 100 }
  ];

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 35;
  const paddingTop = 25;
  const paddingBottom = 35;

  // Grid values [0, 30, 60, 90, 120] mapped to Y positions
  const yValues = [0, 30, 60, 90, 120];

  const points = useMemo(() => {
    const totalPoints = weekData.length;
    const contentWidth = svgWidth - paddingLeft - paddingRight;
    const contentHeight = svgHeight - paddingTop - paddingBottom;

    return weekData.map((d, index) => {
      // Scale X evenly
      const x = paddingLeft + (index / (totalPoints - 1)) * contentWidth;
      // Scale Y (maximum is 120, minimum is 0, top of SVG is y=0)
      const y = paddingTop + contentHeight - (d.value / 120) * contentHeight;
      return { x, y, day: d.day, value: d.value };
    });
  }, [weekData]);

  // Smooth spline curve path generator using Catmull-Rom or simplified Bezier segments
  const splinePath = useMemo(() => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  }, [points]);

  // Gradient path filled underneath the line curve
  const fillPath = useMemo(() => {
    if (points.length === 0) return '';
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = svgHeight - paddingBottom;
    return `${splinePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [points, splinePath]);

  // Interactive local hover state for chart tooltips
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  return (
    <div id="promotions-offers-view" className="space-y-6 sm:space-y-8 text-start select-none w-full animate-fadeIn font-sans pb-16">
      
      {/* 1. View Header with title details and main action button */}
      <div id="offers-management-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="text-start">
          <h1 id="offers-main-title" className="text-3xl font-black text-gray-950 font-cairo tracking-tight leading-none">
            Promotions & Offers
          </h1>
          <p id="offers-main-subtitle" className="text-[15px] font-medium font-cairo text-gray-400 mt-2">
            Create, manage, and track your marketing campaigns
          </p>
        </div>

        <button
          id="btn-create-new-offer"
          onClick={() => {
            if (onCreateOffer) {
              onCreateOffer();
            } else {
              triggerToast('Creating a new promotion offer flow is currently in development.');
            }
          }}
          className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-[14.5px] self-start md:self-auto shrink-0"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* 2. Top Metric Cards Row - Perfect vertical-separation layouts from original screenshot */}
      <div id="offers-metrics-container" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card A: Active Campaigns */}
        <div id="metric-card-active-campaigns" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between w-full min-h-[118px]">
          {/* Top Section */}
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] rounded-full bg-[#FCF5EE] flex items-center justify-center text-[#AE6727] shrink-0">
              <Zap className="w-[15px] h-[15px] text-[#AE6727]" />
            </div>
            <span className="text-[13.5px] font-bold text-gray-500 font-sans tracking-wide">
              Active Campaigns
            </span>
          </div>
          
          {/* Bottom Section */}
          <div className="flex items-end justify-between mt-3 select-text">
            <span className="text-[28px] font-black text-gray-950 font-sans leading-none">
              8
            </span>
            <div className="flex flex-col items-end">
              <span className="bg-[#EBFBF3] border border-[#BCF0DA] text-[#10B981] text-[11px] font-bold px-2 py-0.5 rounded-full leading-none">
                1.2k EGP <span className="font-sans font-black">+</span>
              </span>
              <span className="text-[9.5px] font-bold text-[#14BA6D] tracking-wider uppercase mt-1">
                this week
              </span>
            </div>
          </div>
        </div>

        {/* Card B: Total Uses */}
        <div id="metric-card-total-uses" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between w-full min-h-[118px]">
          {/* Top Section */}
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] rounded-full bg-[#FCF5EE] flex items-center justify-center text-[#AE6727] shrink-0">
              <Users className="w-[15px] h-[15px] text-[#AE6727]" />
            </div>
            <span className="text-[13.5px] font-bold text-gray-500 font-sans tracking-wide">
              Total Uses
            </span>
          </div>
          
          {/* Bottom Section */}
          <div className="flex items-end justify-between mt-3 select-text">
            <span className="text-[28px] font-black text-gray-950 font-sans leading-none">
              1.2k
            </span>
            <div className="flex flex-col items-end">
              <span className="bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold px-2 py-0.5 rounded-full leading-none">
                -15%
              </span>
              <span className="text-[9.5px] font-bold text-red-400 tracking-wider uppercase mt-1">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Card C: Revenue from Offers */}
        <div id="metric-card-revenue-offers" className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between w-full min-h-[118px]">
          {/* Top Section */}
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[32px] rounded-full bg-[#FCF5EE] flex items-center justify-center text-[#AE6727] shrink-0">
              <DollarSign className="w-[15px] h-[15px] text-[#AE6727]" />
            </div>
            <span className="text-[13.5px] font-bold text-gray-500 font-sans tracking-wide">
              Revenue from Offers
            </span>
          </div>
          
          {/* Bottom Section */}
          <div className="flex items-end justify-between mt-3 select-text">
            <span className="text-[28px] font-black text-gray-950 font-sans leading-none">
              120k
            </span>
            <div className="bg-[#EEF1FC] border border-[#DEE3FB] rounded-[10px] px-3 py-1.5 text-center flex flex-col items-center justify-center min-w-[124px]">
              <span className="text-[#5468E2] text-[9.5px] font-black leading-tight tracking-tight uppercase">Last withdrawal:</span>
              <span className="text-[#5468E2] text-[10.5px] font-black mt-0.5 leading-tight">2 days</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Trend Chart Section */}
      <div id="offers-trend-chart-card" className="bg-white border border-[#EBEBEB] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-5 mb-5 select-none text-start">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#AE6727]" /> {/* Smooth curvilinear icon */}
              <h2 className="text-[18.5px] font-black text-gray-900 font-sans">
                Offer Usage Trends
              </h2>
            </div>
            <p className="text-[13px] font-semibold text-gray-400 mt-1">
              Last 7 days performance
            </p>
          </div>

          <div className="flex items-center gap-8 pl-1">
            <div className="flex flex-col text-start sm:text-end">
              <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                Total Uses
              </span>
              <span className="text-[26px] font-black text-gray-950 font-mono mt-0.5 select-text">
                550
              </span>
            </div>
            
            <div className="w-[1px] h-9 bg-gray-100 hidden sm:block" />

            <div className="flex flex-col text-start sm:text-end">
              <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                Avg. Daily
              </span>
              <span className="text-[26px] font-black text-gray-950 font-mono mt-0.5 select-text">
                79
              </span>
            </div>
          </div>
        </div>

        {/* Customized Spline SVG container */}
        <div id="chart-svg-interactive-wrapper" className="w-full select-none pt-2.5 pb-2 overflow-hidden">
          <div className="w-full relative">
            
            {/* Soft, beautiful hover tooltip floating inside stage */}
            {hoveredPointId !== null && (
              <div
                id="chart-hover-tooltip"
                style={{
                  position: 'absolute',
                  left: `${points[hoveredPointId].x}px`,
                  top: `${points[hoveredPointId].y - 45}px`,
                  transform: 'translateX(-50%)'
                }}
                className="bg-gray-900/95 text-white backdrop-blur-xs text-[11.5px] font-black rounded-lg px-3 py-1.5 shadow-lg flex flex-col items-center gap-0.5 pointer-events-none z-10 animate-fadeIn border border-white/10"
              >
                <span className="text-white font-sans">{points[hoveredPointId].day}</span>
                <span className="text-[#FCF5EE] font-mono">{points[hoveredPointId].value} uses</span>
              </div>
            )}

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
              <defs>
                {/* Curve fill Gradient */}
                <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#AE6727" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#AE6727" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Dotted horizontal Grid Lines [0, 30, 60, 90, 120] */}
              {yValues.map((val) => {
                const heightFraction = val / 120;
                const contentHeight = svgHeight - paddingTop - paddingBottom;
                const y = paddingTop + contentHeight - heightFraction * contentHeight;
                return (
                  <g key={val}>
                    {/* Horizontal gridline path */}
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={svgWidth - paddingRight}
                      y2={y}
                      stroke="#F0F0F0"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                    />
                    {/* Left Axis label numbers */}
                    <text
                      x={paddingLeft - 12}
                      y={y + 4}
                      textAnchor="end"
                      fill="#9BA3AF"
                      className="text-[11px] font-bold font-mono"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Gradient shading underneath curve */}
              <path d={fillPath} fill="url(#chartLineGradient)" />

              {/* Main curve line */}
              <path
                d={splinePath}
                fill="none"
                stroke="#AE6727"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Responsive interactive circles on vertices */}
              {points.map((p, index) => {
                const isHovered = hoveredPointId === index;
                return (
                  <g key={index}>
                    {/* Invisible larger hover catcher circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="16"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointId(index)}
                      onMouseLeave={() => setHoveredPointId(null)}
                    />
                    
                    {/* Outer glow ring when hovered */}
                    {isHovered && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="10"
                        fill="#AE6727"
                        opacity="0.15"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer colored point circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? "7" : "6"}
                      fill="#AE6727"
                      stroke="#FFFFFF"
                      strokeWidth={isHovered ? "3.25" : "2.5"}
                      className="transition-all duration-150 shadow-md pointer-events-none cursor-pointer"
                    />
                  </g>
                );
              })}

              {/* Horizontal Bottom axis line */}
              <line
                x1={paddingLeft}
                y1={svgHeight - paddingBottom}
                x2={svgWidth - paddingRight}
                y2={svgHeight - paddingBottom}
                stroke="#ECEFF1"
                strokeWidth="1.5"
              />

              {/* Day Labels along bottom axis */}
              {points.map((p, index) => (
                <text
                  key={index}
                  x={p.x}
                  y={svgHeight - paddingBottom + 20}
                  textAnchor="middle"
                  fill="#9BA3AF"
                  className="text-[12.5px] font-bold font-sans select-none"
                >
                  {p.day}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Complete Offers List Table Module */}
      <div id="offers-list-panel" className="bg-white border border-[#EBEBEB] rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden w-full">
        
        {/* Table Filters header area */}
        <div id="table-filter-bar" className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4.5 border-b border-gray-50 bg-white">
          <span className="text-[19px] font-black text-gray-900 font-sans tracking-tight text-start select-none">
            Offers List
          </span>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-grow lg:flex-grow-0 justify-end">
            {/* Search Input bar */}
            <div className="relative min-w-0 sm:w-[320px]">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-[18px] h-[18px] text-gray-450 stroke-[2.25]" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by offer name, promo code, or category...."
                className="w-full bg-[#FAFAFA] border border-gray-150 rounded-[12px] ps-11 pe-4 py-2.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none focus:border-[#AE6727] focus:bg-white transition-all text-start"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 end-3.5 flex items-center p-1 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Export Sheet Button */}
            <button
              id="btn-export-offers"
              onClick={() => triggerToast(`Exported ${filteredOffers.length} offers list successfully.`)}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50/70 transition-colors font-bold rounded-[12px] text-[14px] flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <Download className="w-[17px] h-[17px] stroke-[2.2]" />
              <span>Export</span>
            </button>

            {/* Branch selector dropdown */}
            <div ref={branchDropdownRef} className="relative shrink-0">
              <button
                id="btn-filter-branch"
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="px-5 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50/70 transition-colors font-bold rounded-[12px] text-[14px] flex items-center justify-between gap-4 cursor-pointer shadow-xs w-full sm:w-auto"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-[17px] h-[17px] stroke-[2.2] text-gray-500" />
                  <span>{selectedBranch === 'All Branches' ? 'All Branches' : selectedBranch}</span>
                </div>
                <ChevronDown className={`w-[15px] h-[15px] transition-transform text-gray-400 ${branchDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {branchDropdownOpen && (
                <div className="absolute right-0 top-[105%] bg-white border border-gray-100 rounded-[14px] shadow-lg z-30 py-1.5 w-[200px] overflow-hidden animate-scaleIn select-none">
                  {['All Branches', 'Main Branch - Downtown', 'North Branch'].map((branchOpt) => (
                    <button
                      key={branchOpt}
                      onClick={() => {
                        setSelectedBranch(branchOpt);
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full text-start px-4.5 py-2.5 text-[13.5px] font-bold transition-colors ${
                        selectedBranch === branchOpt
                          ? 'bg-[#FCF5EE] text-[#AE6727]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {branchOpt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Real responsive Table stage */}
        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="bg-[#FAF9F9] border-b border-gray-100 text-[13px] font-bold text-gray-400 uppercase tracking-wider select-none text-start">
                <th className="px-6 py-[18px] font-bold text-start font-sans">Offer Name</th>
                <th className="px-6 py-[18px] font-bold text-start font-sans">Products</th>
                <th className="px-6 py-[18px] font-bold text-start font-sans">Branch</th>
                <th className="px-6 py-[18px] font-bold text-start font-sans">Status</th>
                <th className="px-6 py-[18px] font-bold text-start font-sans">Enabled</th>
                <th className="px-6 py-[18px] font-bold text-end font-sans">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((item) => (
                  <tr
                    key={item.id}
                    id={`offer-row-${item.id}`}
                    className="hover:bg-gray-50/40 transition-colors text-start align-middle"
                  >
                    {/* Offer Name */}
                    <td className="px-6 py-5.5 text-start font-sans">
                      <span className="text-[15px] font-bold text-gray-900 leading-tight block select-text">
                        {item.name}
                      </span>
                    </td>

                    {/* Products */}
                    <td className="px-6 py-5.5 text-start font-sans select-text">
                      <span className="text-[14.5px] font-medium text-gray-500">
                        {item.products}
                      </span>
                    </td>

                    {/* Branch */}
                    <td className="px-6 py-5.5 text-start font-sans select-text">
                      <span className="text-[14.5px] font-medium text-gray-500">
                        {item.branch}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="px-6 py-5.5 text-start font-sans select-none">
                      {item.status === 'Active' ? (
                        <span className="inline-flex items-center px-3 py-1 bg-[#EBFBF3] border border-[#BCF0DA] text-[#14BA6D] text-[12px] font-bold rounded-full select-none">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 bg-[#FFF9F0] border border-[#FDE68A] text-[#D88D23] text-[12px] font-bold rounded-full select-none">
                          Pending Approval
                        </span>
                      )}
                    </td>

                    {/* Custom toggle switch */}
                    <td className="px-6 py-5.5 text-start font-sans select-none">
                      <button
                        type="button"
                        onClick={() => handleToggleEnabled(item.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          item.enabled ? 'bg-[#AE6727]' : 'bg-gray-200'
                        }`}
                        aria-label="Toggle active status"
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            item.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Action buttons (Edit & Dynamic Delete) */}
                    <td className="px-6 py-5.5 text-end font-sans select-none">
                      <div className="flex items-center justify-end gap-3.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (onEditOffer) {
                              onEditOffer();
                            } else {
                              triggerToast(`Editing flow for "${item.name}" is currently in development.`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100/50 transition-all cursor-pointer"
                          aria-label="Edit offer"
                        >
                          <Edit3 className="w-5 h-5 stroke-[2.2]" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-all cursor-pointer"
                          aria-label="Delete offer"
                        >
                          <Trash2 className="w-5 h-5 stroke-[2.2] text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium select-none">
                    No active offers matching your current search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* 5. Center-screen Confirmation Modal for Deleting exactly as in Snapshot 2 */}
      {deleteModalOpen && offerToDelete && (
        <>
          {/* Backdrop Blur Overlays */}
          <div
            id="delete-modal-backdrop"
            onClick={() => {
              setDeleteModalOpen(false);
              setOfferToDelete(null);
            }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-fadeIn cursor-pointer"
          />

          {/* Centered Modal Dialogue box with precise proportions */}
          <div
            id="delete-modal-container"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 cursor-default select-none pointer-events-none font-sans"
          >
            <div
              id="delete-modal-card"
              onClick={(e) => e.stopPropagation()} // block bubble actions causing close
              className="bg-white w-full max-w-[420px] rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] border border-[#AE6727]/10 p-7 flex flex-col items-center text-center pointer-events-auto transform transition-all duration-300 animate-scaleIn select-none"
            >
              {/* Giant Gold Icon box at the top */}
              <div className="w-14 h-14 rounded-2xl bg-[#AE6727] flex items-center justify-center text-white mb-5 shadow-md shadow-[#AE6727]/15">
                <Info className="w-7 h-7 text-white stroke-[2.5]" />
              </div>

              {/* Title Header text */}
              <h2 className="text-[20px] font-black text-gray-900 tracking-tight leading-tight mb-3 font-sans">
                Delete entire offer
              </h2>

              {/* Description body with generous padding */}
              <p className="text-[14px] text-gray-500/90 font-medium leading-relaxed mb-8 max-w-[340px] font-sans">
                Are you sure you want to delete the "{offerToDelete.name}" campaign? This will immediately stop the discount for all included products, and customers will no longer be able to see or use it on the app.
              </p>

              {/* Bottom Control Buttons */}
              <div className="flex items-center gap-7.5 w-full pt-1">
                {/* Cancel on the Left */}
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setOfferToDelete(null);
                  }}
                  className="flex-1 text-[#AE6727] hover:text-[#8D501D] hover:bg-amber-50/50 font-black text-[15px] font-sans py-3 rounded-[12px] transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>

                {/* Confirm Delete on the Right */}
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 bg-[#AE6727] hover:bg-[#8D501D] text-white font-black text-[15px] font-sans py-3 rounded-[12px] transition-colors cursor-pointer text-center shadow-xs"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </>
      )}

      {/* 6. Elegant toast alert popup */}
      {toastMessage && (
        <div
          id="toast-notifications-node"
          className="fixed bottom-6 right-6 bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.15)] flex items-center gap-2.5 z-50 animate-slideInRight select-text font-sans text-sm font-bold"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
