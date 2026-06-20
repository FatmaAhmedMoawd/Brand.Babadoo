import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ChevronRight, MessageSquare, X, Send, Paperclip, Smile, ArrowRight } from 'lucide-react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const SupportHelpView: React.FC = () => {
  // Live Chat interactive state and handlers
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      name: 'Sara (Support)',
      text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'user',
      name: 'You',
      text: 'مرحباً، لدي مشكلة في تحديث معلومات البراند',
      time: '10:31 AM'
    },
    {
      id: 3,
      sender: 'support',
      name: 'Sara (Support)',
      text: 'بالتأكيد، سأساعدك في ذلك. هل يمكنك إخباري بالتفصيل عن المشكلة؟',
      time: '10:31 AM'
    },
    {
      id: 4,
      sender: 'user',
      name: 'You',
      text: 'عند الضغط على حفظ التغييرات، لا يحدث شيء',
      time: '10:32 AM'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic to always show latest messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  // Prevent background scroll
  useBodyScrollLock(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    const currentTimeString = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        name: 'You',
        text: userText,
        time: currentTimeString
      }
    ]);
    setInputText('');

    // Simulate agent typing
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let supportResponse = '';
      
      const cleanText = userText.toLowerCase().trim();
      if (cleanText.includes('براند') || cleanText.includes('معلومات') || cleanText.includes('لوجو') || cleanText.includes('صورة') || cleanText.includes('تحديث_البراند')) {
        supportResponse = 'يسعدني جداً مساعدتك في تعديل معلومات البراند! يرجى التأكد من أن جميع الحقول المطلوبة باللغتين العربية والإنجليزية ممتلئة تماماً، وأن حجم الصور المرفوعة لا يتجاوز 5 ميجا بايت. هل تظهر لك رسالة خطأ معينة عند الحفظ؟';
      } else if (cleanText.includes('شكرا') || cleanText.includes('تم') || cleanText.includes('يسلمو') || cleanText.includes('يعطيك') || cleanText.includes('تمام')) {
        supportResponse = 'على الرحب والسعة دائماً! نحن متواجدون هنا على مدار الساعة لخدمتك في أي وقت. طاب يومك!';
      } else {
        supportResponse = 'لقد قمت بإحالة موضوعك مباشرة إلى الفريق التقني المختص لمراجعته فوراً وسيتواصلون معك عبر البريد الإلكتروني الخاص بك في غضون دقائق معدودة.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'support',
          name: 'Sara (Support)',
          text: supportResponse,
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        }
      ]);
    }, 1500);
  };

  // Frequently asked questions state
  // Pre-expand 'faq-1' to match the screenshot exactly! But onlyallow one open at a time
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setActiveFaqId((currentId) => (currentId === id ? null : id));
  };

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How can I change my phone number?',
      answer: (
        <div className="flex flex-wrap items-center gap-1.5 text-[14px] font-semibold text-gray-600 font-cairo">
          <span>You can change your phone number by going to settings</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span>Brand information</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span>Update contact phone</span>
        </div>
      ),
    },
    {
      id: 'faq-2',
      question: 'When are earnings transferred?',
      answer: (
        <div className="text-[14px] font-semibold text-gray-600 font-cairo leading-relaxed">
          Earnings are processed and transferred automatically to your registered bank account on a weekly cycle (typically every Sunday). You can view your balance and track pending transfers in the <strong className="text-[#AE6727] font-bold">Financial</strong> section of your dashboard.
        </div>
      ),
    },
    {
      id: 'faq-3',
      question: 'How do I add a new product?',
      answer: (
        <div className="text-[14px] font-semibold text-gray-600 font-cairo leading-relaxed">
          To add a new product, go to the <strong className="text-[#AE6727] font-bold">Products</strong> tab in your sidebar, click on <strong className="text-[#AE6727] font-bold">Add Product</strong> button at the top right, fill in your product details (name, price, and photo), and save. It will be live instantly!
        </div>
      ),
    },
  ];

  if (isChatOpen) {
    return (
      <div 
        id="live-chat-full-page" 
        className="w-full bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col h-[700px] max-h-[85vh] animate-fadeIn text-start text-gray-900" 
        style={{ direction: 'rtl' }}
      >
        {/* Header: Exact color bg-[#b36b2b], configured to Arabic RTL so back button is beautifully accessible */}
        <div
          className="bg-[#b36b2b] px-6 py-[18px] flex items-center justify-between text-white select-none shrink-0 border-b border-white/10"
        >
          <div className="flex items-center gap-3.5">
            {/* Back Button with ArrowRight pointing right representing Arabic return */}
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95 border border-white/20"
              title="العودة للدعم والمساعدة"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            
            <div className="w-[1px] h-6 bg-white/20 self-center"></div>

            {/* Avatar with S and Green dot */}
            <div className="relative w-11 h-11 rounded-full bg-white text-[#b36b2b] flex items-center justify-center font-bold text-lg shadow-sm">
              <span>S</span>
              {/* Status Indicator */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            
            {/* Title & Status */}
            <div className="flex flex-col text-right">
              <span className="text-[17px] font-bold font-cairo leading-snug">الدعم المباشر ومساعد الذكاء الاصطناعي</span>
              <span className="text-[12px] text-white/85 font-cairo leading-none">متصل الآن • متوسط سرعة الرد: دقيقتين</span>
            </div>
          </div>

          {/* Quick Exit Text Action */}
          <button
            type="button"
            onClick={() => setIsChatOpen(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-[14px] font-bold font-cairo transition-all active:scale-95"
          >
            <span>رجوع</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 bg-[#F5F5F5] p-5 overflow-y-auto space-y-4 flex flex-col scrollbar-thin">
          {messages.map((msg) => {
            const isSupport = msg.sender === 'support';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  isSupport ? 'self-start items-start' : 'self-end items-end'
                }`}
              >
                {/* Speaker name */}
                {isSupport && (
                  <span className="text-[11px] font-semibold text-gray-400 font-cairo mb-1 px-1">
                    {msg.name}
                  </span>
                )}

                {/* Bubble Content */}
                <div
                  className={`p-3.5 px-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] ${
                    isSupport
                      ? 'bg-white text-gray-800 rounded-[18px] rounded-tr-none text-right font-cairo text-[14px] leading-relaxed border border-gray-100'
                      : 'bg-[#b36b2b] text-white rounded-[18px] rounded-tl-none text-right font-cairo text-[14px] leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed font-semibold">{msg.text}</p>
                </div>

                {/* Timestamp */}
                <span className="text-[10px] font-medium text-gray-400 font-mono mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex flex-col items-start self-start max-w-[80%]">
              <span className="text-[11px] font-semibold text-gray-400 font-cairo mb-1 px-1">
                Sara (Support)
              </span>
              <div className="bg-white border border-gray-100 rounded-[18px] rounded-tr-none p-3 px-4 flex items-center gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Anchor for automatic scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form
          onSubmit={handleSendMessage}
          className="bg-white p-4 border-t border-gray-100 flex items-center gap-3 shrink-0 select-none pb-5"
        >
          {/* Attachment clips & Smile icons */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <button
              type="button"
              title="Attach file"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-gray-600 border border-gray-100"
            >
              <Paperclip className="w-[19px] h-[19px] -rotate-45" />
            </button>
            <button
              type="button"
              title="Add emoji"
              onClick={() => setInputText(prev => prev + '😊')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-gray-600 border border-gray-100"
            >
              <Smile className="w-[19px] h-[19px]" />
            </button>
          </div>

          {/* Message Input, with exact placeholder "Type your massege" */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your massege"
            className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 font-semibold px-4 py-3 rounded-[16px] text-sm text-right font-cairo outline-none focus:bg-white focus:ring-1 focus:ring-[#b36b2b]/20 border border-gray-100 transition-all focus:border-[#b36b2b]/30"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-[16px] bg-[#b36b2b] flex items-center justify-center text-white disabled:opacity-50 disabled:scale-100 disabled:shadow-none hover:opacity-95 active:scale-95 transition-all shadow-[0_4px_12px_rgba(179,107,43,0.30)] shrink-0"
          >
            <Send className="w-[18px] h-[18px]" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div id="support-help-view" className="space-y-8 pb-16 animate-fadeIn text-start select-none">
      
      {/* 1. Header Section */}
      <div id="support-header" className="space-y-1">
        <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
          Support & Help
        </h1>
        <p className="text-[15px] font-semibold font-cairo text-gray-400 mt-2">
          We're here to help solve any problem or answer your questions
        </p>
      </div>

      {/* 2. How can we help? Section */}
      <div id="help-channel-section" className="space-y-4">
        <h2 className="text-2xl font-black text-gray-950 font-cairo tracking-tight">
          How can we help?
        </h2>

        {/* Live Chat Action Card */}
        <div
          id="live-chat-card"
          onClick={() => setIsChatOpen(true)}
          className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] transition-all hover:shadow-[0_8px_30px_rgba(174,103,39,0.04)] hover:border-[#AE6727]/10 flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-5">
            {/* Soft pale orange icon box */}
            <div className="w-[56px] h-[56px] rounded-[18px] bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727] shrink-0 shadow-2xs">
              {/* Custom SVG speech bubble and chat representing exact icon with smile/inner chat details */}
              <div className="relative">
                <MessageSquare className="w-[26px] h-[26px] text-[#AE6727] stroke-[2]" />
                <span className="absolute top-[8px] left-[10px] flex gap-[2px]">
                  <span className="w-1 h-1 bg-[#AE6727] rounded-full animate-pulseDelay1" />
                  <span className="w-1 h-1 bg-[#AE6727] rounded-full animate-pulseDelay2" />
                </span>
              </div>
            </div>

            {/* Title and details */}
            <div className="flex flex-col text-start">
              <span className="text-lg font-black text-gray-950 font-cairo leading-tight group-hover:text-[#AE6727] transition-colors">
                Live Chat
              </span>
              <span className="text-[14px] font-semibold text-gray-400 font-cairo mt-1">
                Talk to our representatives now - Available 24/7
              </span>
            </div>
          </div>

          {/* Right Chevron arrow icon */}
          <div className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#AE6727] group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-5 h-5 stroke-[2.25]" />
          </div>
        </div>
      </div>

      {/* 3. Frequently Asked Questions Card Container */}
      <div id="faq-accordions-card" className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.015)] space-y-6">
        
        {/* Card Header with Question Mark bubble icon */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FCF5EE] flex items-center justify-center text-[#AE6727]/90 shrink-0">
            <HelpCircle className="w-[19px] h-[19px] stroke-[2.25]" />
          </div>
          <h2 className="text-xl font-black text-gray-950 font-cairo leading-none">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQs list list container */}
        <div className="space-y-4">
          {faqItems.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-[16px] border border-gray-100 overflow-hidden transition-all duration-200"
              >
                {/* Expandable trigger row */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 font-black font-cairo text-start relative cursor-pointer hover:bg-gray-50/40 select-none transition-colors group text-gray-900"
                >
                  <span className="text-[15px] sm:text-[16px] tracking-tight text-gray-900 group-hover:text-[#AE6727] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-gray-50 group-hover:text-[#AE6727] transition-all">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                </button>

                {/* Answer body with smooth height transition */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-5 py-4 text-sm font-semibold text-gray-500 font-cairo leading-relaxed select-text bg-[#FAFBFB]/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Contact Us/Alternative Help Channels Box */}
      <div
        id="additional-info-box"
        className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-[0_4px_35px_rgba(0,0,0,0.015)]"
      >
        <div className="flex flex-col space-y-4 text-start">
          {/* Header title */}
          <span className="text-[17px] font-black text-gray-950 font-cairo">
            (Didn't find what you're looking for?)
          </span>

          <hr className="border-gray-50" />

          {/* Contact Methods details matching Arabic layout */}
          <div className="space-y-4">
            
            {/* Email contact method */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
              <span className="text-[15px] sm:text-[16px] font-black text-gray-800 font-mono select-text">
                support@vendor.com
              </span>
              <span className="text-[14px] sm:text-[15px] font-bold text-gray-500 font-cairo select-text" dir="rtl">
                يمكنك التواصل معنا عبر البريد الإلكتروني:
              </span>
            </div>

            <hr className="border-gray-50 border-dashed" />

            {/* Phone contact method */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
              <span className="text-[16px] sm:text-[17px] font-black text-gray-800 font-mono select-text tracking-wide">
                +20 100 000 0000
              </span>
              <span className="text-[14px] sm:text-[15px] font-bold text-gray-500 font-cairo select-text" dir="rtl">
                أو اتصل بنا على الرقم:
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
