import React, { useState, useRef } from 'react';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock';
import {
  ShoppingCart,
  FileText,
  Rocket,
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  Headphones,
  CreditCard,
  X,
  Lock,
  AlertCircle,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const SubscriptionsView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Lock body scroll when checkout modal is active
  useBodyScrollLock(showCheckout);

  // Form states prefilled as in screenshot
  const [cardholderName, setCardholderName] = useState('Ahmed Muhammed');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Ref for scrolling down to pricing section
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowCheckout(false);
        // Reset card fields
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      }, 2000);
    }, 1500);
  };

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Is subscription mandatory?',
      answer: 'Yes, a subscription is required to continue receiving new orders after your free trial period ends.',
    },
    {
      id: 'faq-2',
      question: 'Will I be charged automatically?',
      answer: 'Yes, your subscription will automatically renew at the end of each billing cycle (monthly or yearly) unless canceled.',
    },
    {
      id: 'faq-3',
      question: 'What happens if I don\'t pay?',
      answer: 'Your ability to receive new orders will be paused, but you will still have access to your dashboard and historical data.',
    },
    {
      id: 'faq-4',
      question: 'Can I make payments manually?',
      answer: 'Yes, you can initiate a manual payment or update your billing details at any time from your account settings.',
    },
  ];

  return (
    <div id="subscriptions-view" className="space-y-12 pb-16 animate-fadeIn text-start">
      {/* Page Title Header */}
      <div id="subscriptions-header" className="select-none">
        <h1 className="text-3xl font-black text-gray-950 font-cairo tracking-tight leading-none">
          Subscriptions
        </h1>
        <p className="text-[15px] font-medium font-cairo text-gray-400 mt-2">
          Manage your subscription plan and billing information
        </p>
      </div>

      {/* Trial Status Card */}
      <div
        id="trial-status-card"
        className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6 relative"
      >
        {/* Card Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-cairo tracking-tight">
              You are currently in the Free Trial period
            </h2>
            <p className="text-sm font-medium text-gray-500 font-cairo leading-relaxed">
              Experience Babbado's full features at no cost during your trial
            </p>
          </div>
          {/* Blue trial badge */}
          <span className="self-start sm:self-center inline-flex items-center px-4 py-1.5 rounded-full bg-[#2563EB] text-white text-[12px] font-black uppercase tracking-wider shadow-sm select-none">
            Free Trial
          </span>
        </div>

        {/* Tracker Progress Bar Segment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[14.5px] font-bold text-gray-900 font-cairo">
              Trial Usage
            </span>
            <span className="text-[14.5px] font-bold text-gray-900 font-mono">
              8 / 20 orders
            </span>
          </div>

          {/* Elegant 40% complete progress bar */}
          <div className="w-full h-2.5 bg-gray-50 border border-gray-100/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: '40%' }}
            />
          </div>

          <p className="text-[13.5px] font-medium text-gray-500 font-cairo select-none pt-0.5">
            <span className="text-blue-600 font-black">12 orders remaining.</span> Use Babbado for free until your 20th order.
          </p>
        </div>

        {/* Action button inside Trial card */}
        <div className="pt-2">
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#AE6727] border border-[#AE6727]/30 hover:border-[#AE6727] hover:bg-[#FCF5EE]/40 font-bold font-cairo rounded-[12px] text-[14.5px] transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
          >
            Choose Your Plan
          </button>
        </div>
      </div>

      {/* Grid: What happens after trial ends */}
      <div id="trial-end-info-section" className="space-y-8 select-none">
        <h3 className="text-2xl md:text-3xl font-black text-gray-950 text-center font-cairo tracking-tight">
          What happens after the end of the trial period?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-[#FCF5EE] flex items-center justify-center text-[#AE6727]">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-950 font-cairo leading-tight">
              Orders Paused
            </h4>
            <p className="text-sm font-medium text-gray-500 font-cairo leading-relaxed">
              New orders will stop automatically after your 20th order.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-[#FCF5EE] flex items-center justify-center text-[#AE6727]">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-950 font-cairo leading-tight">
              Full Access
            </h4>
            <p className="text-sm font-medium text-gray-500 font-cairo leading-relaxed">
              Manage existing orders, view analytics, and account settings.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-[#FCF5EE] flex items-center justify-center text-[#AE6727]">
              <Rocket className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-950 font-cairo leading-tight">
              Instant Start
            </h4>
            <p className="text-sm font-medium text-gray-500 font-cairo leading-relaxed">
              Subscribe at any time to start accepting new orders again.
            </p>
          </div>
        </div>
      </div>

      {/* Main Choose Your Plan Pricing Block */}
      <div
        ref={pricingSectionRef}
        id="pricing-plan-selection-section"
        className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.01)] space-y-8 flex flex-col items-center text-center"
      >
        <div className="space-y-2 select-none">
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 font-cairo tracking-tight">
            Choose Your Plan
          </h3>
          <p className="text-sm md:text-base font-medium text-gray-400 font-cairo">
            Simple, transparent pricing for your business growth
          </p>
        </div>

        {/* Monthly/Yearly Toggle Switch */}
        <div className="bg-[#FAF9F9] border border-gray-100 p-1.5 rounded-full inline-flex items-center gap-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full font-bold text-[14px] font-cairo transition-all duration-200 cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#AE6727] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Monthly
          </button>
          
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full font-bold text-[14px] font-cairo transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#AE6727] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>Yearly</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-black select-none ${
                billingCycle === 'yearly'
                  ? 'bg-white text-[#22C55E]'
                  : 'bg-[#E8F8EE] text-[#22C55E]'
              }`}
            >
              Save 20%
            </span>
          </button>
        </div>

        {/* Single Pricing Card */}
        <div className="w-full max-w-lg bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 text-start relative overflow-hidden">
          {/* Card Top Details */}
          <div className="text-center space-y-1.5 select-none">
            <h4 className="text-xl md:text-2xl font-black text-gray-950 font-cairo">
              Babbado Subscription
            </h4>
            <p className="text-[13.5px] font-medium text-gray-400 font-cairo">
              Everything you need to grow your business
            </p>
          </div>

          {/* Pricing amount representation */}
          <div className="text-center py-4 flex items-baseline justify-center gap-1 select-text">
            <span className="text-4xl md:text-5xl font-black text-gray-950 font-mono tracking-tight">
              {billingCycle === 'monthly' ? '300' : '240'}
            </span>
            <span className="text-[16px] md:text-lg font-black text-gray-950 font-cairo ml-1">
              EGP
            </span>
            <span className="text-sm font-semibold text-gray-400 font-cairo ml-1">
              / mo
            </span>
          </div>

          <hr className="border-gray-50" />

          {/* Features Checklist */}
          <div className="space-y-4">
            <p className="text-[14px] font-black text-gray-950 font-cairo tracking-tight select-none">
              What's included:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Unlimited orders processing',
                'Multi-branch management',
                'Real-time analytics & reports',
                'Product & offer management',
                '24/7 Priority support',
                'Advanced order tracking',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E8F8EE] flex items-center justify-center text-[#22C55E] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[14px] font-semibold text-gray-600 font-cairo">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA subscribe Button */}
          <div className="pt-2">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo py-3.5 px-6 rounded-[14px] text-[15px] select-none text-center shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-99"
            >
              Subscribe Now
            </button>
            <p className="text-center text-[12px] font-medium text-gray-400 font-cairo mt-3.5 select-none font-sans">
              Cancel anytime. No hidden fees or commitments.
            </p>
          </div>
        </div>
      </div>

      {/* Why Subscribe Column Features */}
      <div id="why-subscribe-details-section" className="space-y-8 select-none text-center">
        <h3 className="text-2xl md:text-3xl font-black text-gray-950 font-cairo tracking-tight">
          Why Subscribe?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Item 1 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#AE6727] flex items-center justify-center text-white shadow-md shadow-[#AE6727]/10">
              <Zap className="w-6 h-6 fill-current text-white" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-900 font-cairo mt-1">
              Unlimited Growth
            </h4>
            <p className="text-sm font-medium text-gray-400 font-cairo leading-relaxed max-w-xs">
              Process unlimited orders without restrictions
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#AE6727] flex items-center justify-center text-white shadow-md shadow-[#AE6727]/10">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-900 font-cairo mt-1">
              Advanced Analytics
            </h4>
            <p className="text-sm font-medium text-gray-400 font-cairo leading-relaxed max-w-xs">
              Track performance with detailed insights
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#AE6727] flex items-center justify-center text-white shadow-md shadow-[#AE6727]/10">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black text-gray-900 font-cairo mt-1">
              Priority Support
            </h4>
            <p className="text-sm font-medium text-gray-400 font-cairo leading-relaxed max-w-xs">
              24/7 dedicated support team for partners
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordions Section */}
      <div id="subscriptions-faq-section" className="space-y-8 max-w-3xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-black text-gray-950 text-center font-cairo tracking-tight select-none">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqItems.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-[16px] border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Header Header clickable row */}
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 font-bold text-gray-950 font-cairo text-start relative cursor-pointer hover:bg-gray-50/40 select-none transition-colors"
                >
                  <span className="text-[15px] sm:text-[16px] tracking-tight">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Animated expandable content segment */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[150px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-5 py-4 text-sm font-medium text-gray-500 font-cairo leading-relaxed select-text">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          {/* Main Modal Card */}
          <div className="bg-white w-full max-w-[480px] rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.18)] relative max-h-[92vh] overflow-hidden flex flex-col animate-scaleIn text-start">
            
            {/* Header with Close Sign */}
            <div className="flex items-start justify-between p-6 pb-4 select-none bg-white border-b border-gray-100/50 shrink-0">
              <div>
                <h2 className="text-2xl font-bold font-cairo text-gray-950 tracking-tight leading-none">
                  Checkout
                </h2>
                <p className="text-[13.5px] font-medium font-cairo text-gray-400 mt-2">
                  Complete your subscription
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body with Transparent Scrollbar Track and padding bottom */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-5 custom-scrollbar hover:[&::-webkit-scrollbar-thumb]:bg-[#AE6727] [&::-webkit-scrollbar-track]:bg-transparent">
              {/* Dynamic Success screen or full body form */}
              {paymentSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-scaleIn select-none">
                  <div className="w-16 h-16 rounded-full bg-[#E8F8EE] flex items-center justify-center text-[#22C55E]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-bold font-cairo text-[#3D2B1F]">
                    Subscription Activated!
                  </h3>
                  <p className="text-sm font-medium font-cairo text-gray-500 max-w-sm leading-relaxed">
                    Thank you! Your Babbado {billingCycle === 'monthly' ? 'monthly' : 'yearly'} subscription was processed successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePay} className="space-y-6">
                  
                  {/* Order Summary box */}
                  <div className="bg-[#FAF5F0] border border-[#AE6727]/10 p-5 rounded-[20px] space-y-3.5 select-none text-[14px]">
                    <h3 className="font-extrabold font-cairo text-gray-950 text-base mb-1.5">
                      Order Summary
                    </h3>
                    
                    {/* Row 1: Plan */}
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="text-gray-400 font-medium font-cairo">Plan</span>
                      <span className="text-gray-950 font-bold font-cairo text-end">
                        {billingCycle === 'monthly' 
                          ? 'Babbado Monthly Subscription' 
                          : 'Babbado Yearly Subscription'
                        }
                      </span>
                    </div>

                    <hr className="border-peach border-t border-[#AE6727]/5" />

                    {/* Row 2: Total Amount */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-black font-cairo">Total Amount</span>
                      <span className="text-xl font-extrabold font-mono text-[#AE6727] tracking-tight">
                        {billingCycle === 'monthly' ? '300 EGP' : '2,880 EGP'}
                      </span>
                    </div>

                    <hr className="border-peach border-t border-[#AE6727]/5" />

                    {/* Row 3: Next Billing Date */}
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-400 font-semibold font-cairo">Next Billing Date</span>
                      <span className="text-gray-950 font-extrabold font-sans">
                        {billingCycle === 'monthly' ? 'July 16, 2026' : 'June 16, 2027'}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Details container */}
                  <div className="border border-gray-100 rounded-[20px] p-5 space-y-4">
                    <h3 className="text-base font-extrabold text-gray-950 font-cairo select-none">
                      Payment Method
                    </h3>

                    {/* Field: Cardholder name */}
                    <div className="space-y-1.5 text-start">
                      <label className="block text-[12px] font-extrabold text-gray-800 px-1 font-cairo">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#AE6727] focus:outline-none rounded-[12px] text-sm font-semibold text-gray-950 font-cairo transition-all"
                        placeholder="Ahmed Muhammed"
                      />
                    </div>

                    {/* Field: Card Number with icon */}
                    <div className="space-y-1.5 text-start">
                      <label className="block text-[12px] font-extrabold text-gray-800 px-1 font-cairo">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="1234 **** **** ****"
                          value={cardNumber}
                          onChange={(e) => {
                            // Allow digits only and auto space every 4 digits
                            let value = e.target.value.replace(/\D/g, '');
                            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                            setCardNumber(formattedValue);
                          }}
                          className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#AE6727] focus:outline-none rounded-[12px] text-sm font-bold font-mono text-gray-950 tracking-widest transition-all"
                        />
                      </div>
                    </div>

                    {/* Grid fields: Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Expiry Date */}
                      <div className="space-y-1.5 text-start">
                        <label className="block text-[12px] font-extrabold text-gray-800 px-1 font-cairo">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setExpiryDate(value);
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#AE6727] focus:outline-none rounded-[12px] text-sm font-extrabold font-mono text-gray-900 tracking-wider text-center transition-all"
                        />
                      </div>

                      {/* CVV */}
                      <div className="space-y-1.5 text-start">
                        <label className="block text-[12px] font-extrabold text-gray-800 px-1 font-cairo">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={cvv}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            setCvv(value);
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#AE6727] focus:outline-none rounded-[12px] text-sm font-black font-mono text-gray-900 tracking-widest text-center transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Auto-Renewal blue warning text container */}
                  <div className="bg-[#EEF2FF] border border-[#CBD5E1]/30 p-4 rounded-[12px] flex items-start gap-2.5 select-none">
                    <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-[13px] font-medium text-indigo-800 font-cairo leading-relaxed text-start">
                      Auto-Renewal: Your subscription will automatically renew every {billingCycle === 'monthly' ? 'month' : 'year'}. You can cancel at any time from settings.
                    </p>
                  </div>

                  {/* CTA submit form button */}
                  <div className="pt-2 select-none">
                    <button
                      disabled={isPaying}
                      type="submit"
                      className="w-full bg-[#AE6727] hover:bg-[#8D501D] disabled:opacity-80 disabled:cursor-not-allowed text-white font-bold font-cairo py-3.5 px-6 rounded-[14px] text-[15px] select-none text-center shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-99 flex items-center justify-center gap-2"
                    >
                      {isPaying ? (
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing payment...
                        </span>
                      ) : (
                        `Confirm & Pay ${billingCycle === 'monthly' ? '300 EGP' : '2,880 EGP'}`
                      )}
                    </button>
                    <p className="text-center text-[12px] font-medium text-gray-400 font-cairo mt-3.5 flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Your payment information is encrypted and secure</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
