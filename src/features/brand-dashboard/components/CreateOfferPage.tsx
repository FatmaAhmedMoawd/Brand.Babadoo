import React, { useState, useEffect } from 'react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';
import {
  ChevronLeft,
  Info,
  Tag,
  Calendar,
  Users,
  DollarSign,
  Plus,
  X,
  Package,
  TrendingDown,
  Percent,
  Check,
  Building
} from 'lucide-react';

interface SimpleProduct {
  id: string;
  name: string;
  category: string;
}

interface CreateOfferPageProps {
  onBack: () => void;
  isEdit?: boolean;
}

export const CreateOfferPage: React.FC<CreateOfferPageProps> = ({ onBack, isEdit = false }) => {
  // 1. Interactive States
  const [offerName, setOfferName] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [offerType, setOfferType] = useState('');
  const [description, setDescription] = useState('');

  // Schedulers
  const [startDate, setStartDate] = useState(isEdit ? '2025-05-01' : '');
  const [endDate, setEndDate] = useState(isEdit ? '2025-05-10' : '');
  const [usageLimit, setUsageLimit] = useState(isEdit ? '100' : '0');
  const [minOrderValue, setMinOrderValue] = useState('');

  // Products
  const [selectedProducts, setSelectedProducts] = useState<SimpleProduct[]>(
    isEdit
      ? [
          { id: 'edit-1', name: 'Family Meal Box', category: 'Meals' },
          { id: 'edit-2', name: 'Grilled Chicken', category: 'Meals' },
          { id: 'edit-3', name: 'Premium Pizza', category: 'Meals' }
        ]
      : [{ id: '1', name: 'Product Name', category: 'Category' }]
  );
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [mockAvailableProducts] = useState<SimpleProduct[]>([
    { id: 'classic-cappuccino', name: 'Classic Cappuccino', category: 'Beverages' },
    { id: 'iced-latte', name: 'Iced Latte', category: 'Beverages' },
    { id: 'chocolate-cake', name: 'Chocolate Cake', category: 'Desserts' },
    { id: 'mochaccino', name: 'Mochaccino Special', category: 'Beverages' },
    { id: 'croissant', name: 'Butter Croissant', category: 'Bakery' }
  ]);

  // Pricing Calculator
  const [originalPrice, setOriginalPrice] = useState(isEdit ? '200' : '');
  const [discountPercent, setDiscountPercent] = useState(isEdit ? '10' : '');
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number | string>('00');

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Success Confirmation Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Lock body scroll when modals are displayed
  useBodyScrollLock(showAddProductModal || showSuccessModal);

  // Dynamic calculations for discount
  useEffect(() => {
    const orig = parseFloat(originalPrice);
    const disc = parseFloat(discountPercent);

    if (!isNaN(orig) && orig >= 0) {
      if (!isNaN(disc) && disc >= 0 && disc <= 100) {
        const afterDis = orig - (orig * disc) / 100;
        setPriceAfterDiscount(afterDis.toFixed(2));
      } else {
        setPriceAfterDiscount(orig.toFixed(2));
      }
    } else {
      setPriceAfterDiscount('00');
    }
  }, [originalPrice, discountPercent]);

  const handleAddProduct = (prod: SimpleProduct) => {
    if (!selectedProducts.find(p => p.id === prod.id)) {
      setSelectedProducts([...selectedProducts, prod]);
    }
    setShowAddProductModal(false);
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLaunchCampaign = () => {
    setShowSuccessModal(true);
  };

  const handleSaveChanges = () => {
    showToast('Changes saved successfully.');
  };

  return (
    <div id="create-new-offer-view" className="space-y-6 text-start select-none w-full animate-fadeIn font-sans pt-6 pb-16">
      
      {/* Back to list navigation */}
      <div id="back-navigation-row" className="flex items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-medium text-[15px] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span className="font-sans leading-none">Back to Offers Managment</span>
        </button>
      </div>

      {/* Main header block */}
      <div id="create-offer-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full pt-1">
        <div className="text-start">
          <div className="flex items-center gap-3.5 flex-wrap">
            <h1 id="create-offer-main-title" className="text-3xl font-black text-gray-900 tracking-tight leading-none">
              {isEdit ? 'Edite Offer' : 'Create New Offer'}
            </h1>
            {isEdit && (
              <span className="inline-flex items-center px-3 py-1 bg-[#EBFBF3] border border-[#BCF0DA] text-[#14BA6D] text-[12px] font-bold rounded-lg select-none">
                Active
              </span>
            )}
          </div>
          <p id="create-offer-main-subtitle" className="text-[15px] font-medium text-gray-400 mt-2.5">
            {isEdit ? 'Update your promotional campaign details' : 'Set up your promotional campaign in a few simple steps'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 self-start md:self-auto">
          {isEdit ? (
            <>
              <button
                type="button"
                onClick={onBack}
                className="text-[#AE6727] hover:text-[#8D501D] hover:bg-[#AE6727]/5 font-bold transition-all py-3 px-6 rounded-[12px] text-[14.5px] cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-3 px-6 rounded-[12px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-[14.5px] shrink-0"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => showToast('Campaign saved as draft.')}
                className="text-[#AE6727] hover:text-[#8D501D] hover:bg-[#AE6727]/5 font-bold transition-all py-3 px-6 rounded-[12px] text-[14.5px] cursor-pointer"
              >
                Save as Draft
              </button>
              
              <button
                type="button"
                onClick={handleLaunchCampaign}
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-3 px-6 rounded-[12px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-[14.5px] shrink-0"
              >
                Launch Campaign
              </button>
            </>
          )}
        </div>
      </div>

      {/* Blue Warning Banner Notice matching screenshot */}
      <div id="admin-review-banner" className="bg-[#EEF4FF] border border-[#D5E6FF] rounded-[14px] p-4 flex items-start gap-3.5 select-text">
        <div className="w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center text-white shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5 text-white stroke-[3.25]" />
        </div>
        <div className="text-[#1E40AF] text-[14px] font-semibold leading-relaxed text-start">
          All promotional offers require admin review before going live.{' '}
          <span className="font-bold">Approval typically takes 24–48 hours.</span>
        </div>
      </div>

      {/* Two Column Layout Grid */}
      <div id="create-offer-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Basic Information */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Basic Info White Card */}
          <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] space-y-6">
            <h2 className="text-[19px] font-black text-gray-950 font-sans tracking-tight text-start border-b border-gray-50 pb-4">
              Basic Information
            </h2>

            {/* Offer Name */}
            <div className="flex flex-col space-y-2 select-text">
              <label className="text-[14px] font-bold text-gray-700 text-start flex items-center">
                Offer Name <span className="text-red-500 ml-1 font-black">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                  <Tag className="w-4.5 h-4.5 stroke-[2.2]" />
                </span>
                <input
                  type="text"
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder="e.g., Weekend Special, Summer Flash Sale"
                  className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start"
                />
              </div>
            </div>

            {/* Select Branch & Offer Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Select Branch Selector */}
              <div className="flex flex-col space-y-2">
                <label className="text-[14px] font-bold text-gray-700 text-start flex items-center">
                  Select Branch <span className="text-red-500 ml-1 font-black">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                    <Building className="w-4.5 h-4.5 stroke-[2.2]" />
                  </span>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-10 py-3.5 text-[14px] font-semibold text-gray-800 outline-none appearance-none transition-all text-start"
                  >
                    <option value="" disabled hidden></option>
                    <option value="all">All Branches</option>
                    <option value="main">Main Branch - Downtown</option>
                    <option value="north">North Branch</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Offer Type Input */}
              <div className="flex flex-col space-y-2 select-text">
                <label className="text-[14px] font-bold text-gray-700 text-start flex items-center">
                  Offer Type
                </label>
                <input
                  type="text"
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                  placeholder=""
                  className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start"
                />
              </div>

            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2 select-text">
              <label className="text-[14px] font-bold text-gray-700 text-start">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Explain the offer to customers (e.g., Get 20% off on all family meals this weekend)"
                className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start resize-none leading-relaxed"
              />
            </div>

            {/* Fine Helper Text Inside Card */}
            <div className="text-[12.5px] font-medium text-gray-400 text-start pt-1">
              Provide detailed information about the product, featured, etc
            </div>

          </div>

        </div>

        {/* Right Column: Product Selection */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] space-y-5">
            <div>
              <h2 className="text-[19px] font-black text-gray-950 font-sans tracking-tight text-start">
                Product Selection
              </h2>
              <p className="text-[13px] font-semibold text-gray-400 text-start mt-1">
                Products or categories included in this offer
              </p>
            </div>

            {/* Counter and Add Button Row */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-extrabold text-gray-800 select-text">
                Selected Products: {selectedProducts.length}
              </span>

              <button
                type="button"
                onClick={() => {}}
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-2 px-4 rounded-[10px] flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer text-[13px]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Display list box */}
            <div className="bg-[#FAF9F9]/90 border border-gray-100 rounded-[16px] p-4 min-h-[160px] space-y-3 flex flex-col justify-center">
              {selectedProducts.length > 0 ? (
                <div className="space-y-2.5">
                  {selectedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-gray-150 rounded-[12px] p-3 flex items-center justify-between select-text group transition-colors hover:border-[#AE6727]/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                          <Package className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                        <div className="flex flex-col text-start">
                          <span className="text-[14px] font-bold text-gray-900 leading-tight">
                            {p.name}
                          </span>
                          <span className="text-[11.5px] font-semibold text-gray-400 mt-0.5">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(p.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <X className="w-4.5 h-4.5 stroke-[2.2]" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="w-10 h-10 text-gray-350 mx-auto stroke-[1.5]" />
                  <p className="text-[13px] font-bold text-gray-400 mt-2.5">No products added yet</p>
                  <p className="text-[11.5px] text-gray-400 mt-1">Click the button above to add products.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Scheduling & Rules White Card (Spanning all) */}
      <div id="scheduling-rules-section" className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] space-y-6">
        <div>
          <h2 className="text-[19px] font-black text-gray-950 font-sans tracking-tight text-start">
            Scheduling & Rules
          </h2>
          <p className="text-[13px] font-semibold text-gray-400 text-start mt-1">
            Set the duration and usage limits for your campaign
          </p>
        </div>

        {/* Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          
          {/* Start Date */}
          <div className="flex flex-col space-y-2 select-text">
            <label className="text-[14px] font-bold text-gray-700 text-start flex items-center">
              Start Date <span className="text-red-500 ml-1 font-black">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                <Calendar className="w-4.5 h-4.5 stroke-[2.2]" />
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 outline-none transition-all text-start"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex flex-col space-y-2 select-text">
            <label className="text-[14px] font-bold text-gray-700 text-start flex items-center">
              End Date <span className="text-red-500 ml-1 font-black">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
                <Calendar className="w-4.5 h-4.5 stroke-[2.2]" />
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 outline-none transition-all text-start"
              />
            </div>
          </div>

        </div>

        {/* Usage Limit input */}
        <div className="flex flex-col space-y-2 select-text">
          <label className="text-[14px] font-bold text-gray-700 text-start">
            Usage Limit
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
              <Users className="w-4.5 h-4.5 stroke-[2.2]" />
            </span>
            <input
              type="text"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start"
            />
          </div>
          <div className="text-[12.5px] font-medium text-gray-400 text-start pl-1">
            Leave empty for unlimited users
          </div>
        </div>

        {/* Minimum Order Value input */}
        <div className="flex flex-col space-y-2 select-text">
          <label className="text-[14px] font-bold text-gray-700 text-start">
            Minimum Order Value
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400">
              <Tag className="w-4.5 h-4.5 stroke-[2.2]" />
            </span>
            <input
              type="text"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(e.target.value)}
              placeholder="00 EGP"
              className="w-full bg-white border border-gray-200 hover:border-gray-350 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-450 outline-none transition-all text-start"
            />
          </div>
          <div className="text-[12.5px] font-medium text-gray-400 text-start pl-1">
            Applies only for orders above this value
          </div>
        </div>

      </div>

      {/* Pricing Calculator Card - custom peach/light orange background styling */}
      <div id="pricing-calculator-section" className="bg-[#FAF6F0] border border-[#F2E5D4] rounded-[24px] p-6 shadow-[0_2px_18px_rgba(174,103,39,0.02)] space-y-6">
        
        {/* Header Title with custom icon */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-[10px] bg-[#AE6727] flex items-center justify-center text-white shrink-0">
            <DollarSign className="w-4.5 h-4.5 text-white stroke-[2.5]" />
          </div>
          <h2 className="text-[17.5px] font-black text-[#5C3E21] font-sans tracking-tight text-start">
            Pricing Calculator
          </h2>
        </div>

        {/* Dynamic Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          
          {/* Original Price */}
          <div className="flex flex-col space-y-2 select-text">
            <label className="text-[13.5px] font-bold text-[#7C5A38] text-start flex items-center">
              Original Price <span className="text-red-500 ml-1 font-black">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-400 font-bold text-[15px]">
                $
              </span>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="00.0"
                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#AE6727] rounded-[12px] ps-10 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start"
              />
            </div>
          </div>

          {/* Discount % */}
          <div className="flex flex-col space-y-2 select-text">
            <label className="text-[13.5px] font-bold text-[#7C5A38] text-start flex items-center">
              Discount <span className="text-red-500 ml-1 font-black">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-gray-450">
                <Percent className="w-4.5 h-4.5 stroke-[2.2]" />
              </span>
              <input
                type="text"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder=""
                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#AE6727] rounded-[12px] ps-11 pe-4 py-3.5 text-[14px] font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all text-start"
              />
            </div>
          </div>

        </div>

        {/* Interactive White Result Card with precise border/glow */}
        <div className="bg-white border-2 border-[#AE6727]/25 rounded-[16px] p-5.5 flex items-center justify-between shadow-[0_4px_16px_rgba(174,103,39,0.03)] select-text">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-[19px] h-[19px] text-[#AE6727] shrink-0" />
            <span className="text-[14.5px] font-extrabold text-[#735231] font-sans">
              Price After Discount
            </span>
          </div>
          <span className="text-[26px] font-black text-[#AE6727] font-sans tracking-tight">
            {priceAfterDiscount} EGP
          </span>
        </div>

        {/* Footer info tip */}
        <div className="text-[12.5px] font-medium text-gray-400 text-start leading-relaxed pt-1 select-none">
          A small service fee may be added to the customer depending on platform policies
        </div>

      </div>

      {/* Add Product Dialog Modal Box */}
      {showAddProductModal && (
        <>
          <div
            onClick={() => setShowAddProductModal(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-fadeIn cursor-pointer"
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[440px] rounded-[24px] shadow-2xl p-6 border border-gray-100 flex flex-col tracking-tight animate-scaleIn select-none"
            >
              <div className="flex items-center justify-between border-b border-gray-50 pb-3.5">
                <h3 className="text-[18px] font-black text-gray-950">Add Available Product</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5 max-h-[280px] overflow-y-auto custom-scrollbar pr-1 select-text text-start">
                {mockAvailableProducts.map((p) => {
                  const alreadySelected = !!selectedProducts.find((item) => item.id === p.id);
                  return (
                    <button
                      key={p.id}
                      disabled={alreadySelected}
                      onClick={() => handleAddProduct(p)}
                      className={`w-full p-3.5 rounded-[12px] border text-start flex items-center justify-between transition-all cursor-pointer ${
                        alreadySelected
                          ? 'bg-gray-50 border-gray-150 text-gray-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-gray-150 text-gray-800 hover:border-[#AE6727]/30 hover:bg-[#AE6727]/2'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-[34px] h-[34px] rounded-full bg-gray-50 flex items-center justify-center text-gray-450 shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[14px] font-extrabold text-inherit">{p.name}</span>
                          <span className="text-[11.5px] font-semibold text-gray-400 mt-0.5">{p.category}</span>
                        </div>
                      </div>

                      {alreadySelected ? (
                        <span className="text-gray-400 text-xs font-bold bg-gray-200/50 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Added
                        </span>
                      ) : (
                        <span className="text-[#AE6727] text-xs font-black hover:underline">Select</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Confirmation Modal */}
      {showSuccessModal && (
        <>
          <div
            onClick={() => {
              setShowSuccessModal(false);
              onBack();
            }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xs animate-fadeIn cursor-pointer"
          />

          <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-24 md:pt-32 overflow-y-auto">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[430px] rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] p-8 border border-gray-50 flex flex-col items-center text-center animate-scaleIn select-none"
            >
              {/* Green circular success icon precisely styled */}
              <div className="w-[84px] h-[84px] rounded-full bg-[#22C55E] flex items-center justify-center text-white shrink-0 shadow-[0_4px_16px_rgba(34,197,94,0.22)]">
                <Check className="w-11 h-11 text-white stroke-[3.25]" />
              </div>

              {/* Title matches the bold design */}
              <h3 className="text-[23px] font-black text-gray-900 tracking-tight mt-7 leading-tight">
                {isEdit ? 'Changes Saved Successfully' : 'Offer Submitted for Review'}
              </h3>

              {/* Description matches exact wordings, weight and spacing */}
              <p className="text-[14.5px] font-medium text-gray-400 leading-relaxed mt-4 max-w-[325px]">
                {isEdit 
                  ? 'Your promotional campaign changes have been saved and applied.'
                  : 'Your offer has been submitted and is currently under review. It will be visible to customers once approved by the administration.'}
              </p>

              {/* Ok Button matching original copper/brown styled button */}
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onBack();
                }}
                className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-extrabold font-sans py-4 rounded-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-[15px] mt-8"
              >
                Ok
              </button>
            </div>
          </div>
        </>
      )}

      {/* Floating dynamic success toast notification */}
      {toastMessage && (
        <div
          id="create-offer-toast"
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
