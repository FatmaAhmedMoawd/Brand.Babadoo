import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Common";
import { Upload, ChevronDown, Phone, Check, Utensils, ShoppingBag, UserCircle, Store, Coffee, Pizza, Home, ShoppingCart, Laptop, Pill, Heart, Flower2, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useRTL } from "@/shared/hooks/useRTL";
import { LiveLocationMap } from "./LiveLocationMap";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { NominatimAddress } from "../../../../../services/locationService";

export const PartnerRegistration: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [step, setStep] = useState(1);
  const prevStepRef = useRef(1);
  const registrationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prevStepRef.current !== step) {
      registrationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevStepRef.current = step;
  }, [step]);

  // Custom Select Component
  const CustomSelect = ({ 
    label, 
    name, 
    value, 
    options, 
    onChange, 
    placeholder,
    icon: Icon
  }: { 
    label: string; 
    name: string; 
    value: string; 
    options: { label: string; value: string; icon?: React.ReactNode }[]; 
    onChange: (name: string, value: string) => void; 
    placeholder: string;
    icon?: React.ComponentType<{ className?: string }>;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="space-y-2 relative">
        <label className="block font-bold text-sm text-gray-800">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full flex items-center justify-between border rounded-2xl p-4 bg-white transition-all duration-300 outline-none group shadow-sm hover:shadow-md",
              isOpen ? "border-brand-brown ring-4 ring-brand-brown/5" : "border-gray-200"
            )}
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon className={cn("w-5 h-5", isOpen ? "text-brand-brown" : "text-gray-400")} />}
              <span className={cn("font-medium", !selectedOption ? "text-gray-400" : "text-gray-900")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
              <div
                className="absolute left-0 right-0 z-[70] mt-2 bg-white border border-gray-100 rounded-[24px] shadow-2xl overflow-hidden py-2 animate-fade-in-up"
              >
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(name, opt.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-5 py-4 text-start transition-all duration-200 group/item relative",
                      value === opt.value ? "bg-brand-brown/10 text-brand-brown" : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {opt.icon && <span className="relative z-10">{opt.icon}</span>}
                    <span className="font-bold font-cairo relative z-10">{opt.label}</span>
                    {value === opt.value && <Check className="ms-auto w-5 h-5 text-brand-brown relative z-10" />}
                    <div className="absolute inset-0 bg-brand-brown opacity-0 group-hover/item:opacity-[0.03] transition-opacity" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Form State
  const [formData, setFormData] = useState({
    brandName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bizType: "",
    storeType: "",
    branchCount: 1,
    role: "",
    bizPhone: "",
    address: "",
    country: "",
    governorate: "",
    city: "",
    area: "",
    street: "",
    landmark: "",
    buildingNumber: "",
    addressNotes: "",
    lat: 30.0444,
    lng: 31.2357,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // File Upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [storeImagePreview, setStoreImagePreview] = useState<string | null>(null);
  const [storeImageFile, setStoreImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError(isRTL ? "يرجى اختيار ملف صورة صالح (PNG, JPG)" : "Please select a valid image file (PNG, JPG)");
      return;
    }
    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(isRTL ? "حجم الصورة يتعدى 5 ميجابايت" : "Image size exceeds 5MB");
      return;
    }

    setUploadError("");
    setStoreImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setStoreImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const removeStoreImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering file upload trigger onClick
    setStoreImagePreview(null);
    setStoreImageFile(null);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetRegistrationForm = () => {
    setFormData({
      brandName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bizType: "",
      storeType: "",
      branchCount: 1,
      role: "",
      bizPhone: "",
      address: "",
      country: "",
      governorate: "",
      city: "",
      area: "",
      street: "",
      landmark: "",
      buildingNumber: "",
      addressNotes: "",
      lat: 30.0444,
      lng: 31.2357,
    });
    setErrors({});
    setTouched({});
    setStoreImagePreview(null);
    setStoreImageFile(null);
    setUploadError("");
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    const val = value.trim();

    if (name === "brandName") {
      if (val.length < 2) {
        error = "يجب أن يكون اسم النشاط حرفين على الأقل";
      }
    }

    if (name === "firstName" || name === "lastName") {
      const label = name === "firstName" ? "الاسم الأول" : "الاسم الأخير";
      if (val.length < 2) {
        error = `يجب أن يكون ${label} حرفين على الأقل`;
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        error = "يرجى إدخال بريد إلكتروني صحيح";
      }
    }

    if (name === "phone") {
      const cleanPhone = val.replace(/[\s-]/g, "");
      const phoneRegex = /^01[0125]\d{8}$/;
      if (!phoneRegex.test(cleanPhone) && cleanPhone.length > 0) {
        error = "يرجى إدخال رقم موبايل صحيح";
      }
      if (cleanPhone.length === 0) {
        error = "رقم الموبايل مطلوب";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // If field was already touched, validate on change too
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    // Delay selection slightly to run after the default click handling places the cursor
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          target.select();
          // Fallback for iOS webkit sometimes ignoring select()
          if (["text", "email", "url", "tel", "password", "search"].includes(target.type)) {
            target.setSelectionRange(0, target.value.length);
          }
        } catch (err) {
          // Ignored for input types that natively don't support setSelectionRange (e.g., number)
        }
      }, 0);
    });
  };

  const isStep1Valid = () => {
    return (
      formData.brandName.trim().length >= 2 &&
      formData.firstName.trim().length >= 2 &&
      formData.lastName.trim().length >= 2 &&
      !errors.brandName &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.phone &&
      formData.email !== "" &&
      formData.phone !== ""
    );
  };

  const isStep2Valid = () => {
    if (!formData.bizType) return false;
    if (!formData.role) return false;
    return true;
  };

  const isStep3Valid = () => {
    return formData.address.trim() !== "";
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handleNextStep = () => {
    if (isStep1Valid()) {
      handleStepChange(2);
    }
  };

  const setAddressData = (addressData: NominatimAddress | null, lat?: number, lng?: number) => {
    if (!addressData) return;
    const details = addressData.address || {};
    
    setFormData(prev => ({ 
      ...prev, 
      ...(lat !== undefined && lng !== undefined ? { lat, lng } : {}),
      address: addressData.display_name || prev.address,
      country: details.country || prev.country,
      governorate: details.state || details.county || prev.governorate,
      city: details.city || details.town || details.village || details.county || prev.city,
      area: details.suburb || details.neighbourhood || details.residential || details.quarter || prev.area,
      street: details.road || prev.street,
      buildingNumber: details.house_number || prev.buildingNumber,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, address: value }));
  };

  return (
    <section ref={registrationRef} id="registration" className="py-24 bg-white relative scroll-mt-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {!isSubmitted && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-cairo">
              {t("partner.registrationTitle")}
            </h2>
            <p className="text-xl text-gray-600 font-cairo">
              {t("partner.registrationSubtitle")}
            </p>
          </div>
        )}

        {/* Stepper */}
        {!isSubmitted && (
          <div className="flex justify-between items-center mb-12 relative px-4">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0">
              <div
                className="h-full bg-[#D38842] transition-all"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 1 ? "bg-[#D38842]" : "bg-gray-300"}`}
              >
                1
              </div>
              <span className="text-sm md:text-base font-bold text-brand-dark text-center">
                {t("partner.step1")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 2 ? "bg-[#D38842]" : "bg-gray-300"}`}
              >
                2
              </div>
              <span className="text-sm md:text-base font-bold text-gray-500 text-center">
                {t("partner.step2")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 3 ? "bg-[#D38842]" : "bg-gray-300"}`}
              >
                3
              </div>
              <span className="text-sm md:text-base font-bold text-gray-500 text-center">
                {t("partner.step3")}
              </span>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="relative rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="p-8 md:p-12 h-full w-full relative overflow-hidden">

            {isSubmitted ? (
              <div
                className="text-center py-8 space-y-8 max-w-2xl mx-auto animate-fade-in-up"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  <h3 className="text-3xl font-black text-brand-dark font-cairo mt-2">
                    {isRTL ? "تم تقديم طلبك بنجاح!" : "Application Submitted Successfully!"}
                  </h3>
                  <p className="text-gray-500 font-medium font-cairo text-lg max-w-lg leading-relaxed">
                    {isRTL 
                      ? `شكراً لانضمامك لبابادو يا ${formData.firstName}! لقد استلمنا طلب تسجيل "${formData.brandName}" وسيتم مراجعته خلال 24 ساعة.`
                      : `Thanks for joining Babadoo, ${formData.firstName}! We received your application for "${formData.brandName}" and will review it within 24 hours.`
                    }
                  </p>
                </div>

                {/* Animated Store Card Mockup preview */}
                <div className="border border-gray-100 rounded-[32px] p-6 bg-gradient-to-br from-brand-light/30 via-white to-orange-50/20 shadow-lg relative text-start overflow-hidden max-w-md mx-auto">
                  <span className="absolute top-4 end-4 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full font-cairo">
                    {isRTL ? "بانتظار الموافقة" : "Pending Review"}
                  </span>
                  
                  <div className="flex gap-4 items-center">
                    {storeImagePreview ? (
                      <img
                        src={storeImagePreview}
                        alt="Store Brand Preview"
                        className="w-16 h-16 rounded-2xl object-contain bg-white border border-gray-100 shadow-sm p-1"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                        <Store className="w-8 h-8 text-[#D38842]" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-bold font-cairo text-brand-dark mb-0.5">
                        {formData.brandName}
                      </h4>
                      <p className="text-xs text-gray-400 font-bold font-cairo">
                        {formData.bizType === "restaurant" ? (isRTL ? "مطعم 🍔" : "Restaurant 🍔") : 
                         formData.bizType === "store" ? (isRTL ? "محل تجاري 🛍️" : "Store 🛍️") :
                         formData.bizType === "supermarket" ? (isRTL ? "سوبرماركت 🛒" : "Supermarket 🛒") :
                         formData.bizType === "cafe" ? (isRTL ? "مقهى ☕" : "Cafe ☕") :
                         formData.bizType === "pharmacy" ? (isRTL ? "صيدلية 💊" : "Pharmacy 💊") :
                         (isRTL ? "نشاط آخر ✨" : "Other Business ✨")}
                      </p>
                      <p className="text-xs text-brand-brown/80 font-bold font-cairo mt-1">
                        {formData.branchCount > 1 ? (isRTL ? `${formData.branchCount} فروع` : `${formData.branchCount} Branches`) : (isRTL ? "فرع واحد" : "1 Branch")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 space-y-2 text-sm text-gray-600 font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cairo">{isRTL ? "رقم الهاتف والاتصال:" : "Contact Phone:"}</span>
                      <span className="font-bold text-gray-800" dir="ltr">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cairo">{isRTL ? "البريد الإلكتروني للعمل:" : "Work Email:"}</span>
                      <span className="font-bold text-gray-800 break-all">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-cairo">{isRTL ? "المدينة والعنوان:" : "City & Address:"}</span>
                      <span className="font-bold text-gray-800 font-cairo text-xs text-end max-w-[200px] truncate">{formData.city || formData.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetRegistrationForm}
                    className="px-8 py-3 w-full sm:w-auto border border-[#C48033] text-[#C48033] hover:bg-[#C48033] hover:text-white font-bold rounded-xl font-cairo transition-all"
                  >
                    {isRTL ? "تسجيل نشاط تجاري آخر" : "Register Another Business"}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
              <div
                className="space-y-6 text-start animate-fade-in-up"
              >
                <div className="space-y-4">
                  <label className="block font-bold text-sm text-gray-800 px-1">
                    {t("partner.brandName")}
                  </label>
                  <div className="relative group">
                    <Store className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors w-5 h-5" />
                    <input
                      type="text"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      placeholder={t("partner.brandNamePlaceholder")}
                      className={cn(
                        "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm",
                        errors.brandName 
                          ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                          : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                      )}
                    />
                  </div>
                  {errors.brandName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium px-1 animate-fade-in-up">{errors.brandName}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.firstName")}
                    </label>
                    <div className="relative group">
                      <UserCircle className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        placeholder={t("partner.firstNamePlaceholder")}
                        className={cn(
                          "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm",
                          errors.firstName 
                            ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                            : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                        )}
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium px-1 animate-fade-in-up">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-4">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.lastName")}
                    </label>
                    <div className="relative group">
                      <UserCircle className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        placeholder={t("partner.lastNamePlaceholder")}
                        className={cn(
                          "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm",
                          errors.lastName 
                            ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                            : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                        )}
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium px-1 animate-fade-in-up">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-bold text-sm text-gray-800 px-1">
                    {t("partner.email")}
                  </label>
                  <div className="relative group">
                    <Check className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      placeholder="example@gmail.com"
                      className={cn(
                        "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm",
                        isRTL && "ps-4 pe-14",
                        isRTL ? "text-right" : "text-left",
                        errors.email 
                          ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                          : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                      )}
                      dir="ltr"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-cairo mt-1 font-medium px-1 animate-fade-in-up">{errors.email}</p>}
                </div>

                <div className="space-y-4">
                  <label className="block font-bold text-sm text-gray-800 px-1">
                    {t("partner.phone")}
                  </label>
                  <div className="relative group">
                    <Phone className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      placeholder="01012345678"
                      className={cn(
                        "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm",
                        isRTL && "ps-4 pe-14",
                        isRTL ? "text-right" : "text-left",
                        errors.phone 
                          ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                          : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                      )}
                      dir="ltr"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs font-cairo mt-1 font-medium px-1 leading-relaxed animate-fade-in-up">{errors.phone}</p>}
                </div>

                <div className="pt-6 flex justify-center">
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid()}
                    className={cn(
                      "px-12 py-3.5 text-lg font-bold w-full md:w-auto mt-4 rounded-lg border-none shadow-md font-cairo transition-all text-white",
                      isStep1Valid() ? "bg-[#C48033] hover:bg-[#A36A29] cursor-pointer" : "bg-gray-300 cursor-not-allowed text-gray-500"
                    )}
                  >
                    {t("partner.nextStep")}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div
                className="space-y-6 text-start animate-fade-in-up"
              >
                <CustomSelect
                  label={t("partner.bizType")}
                  name="bizType"
                  value={formData.bizType}
                  placeholder={t("partner.bizTypeSelect")}
                  icon={Store}
                  options={isRTL ? [
                    { label: "مطعم", value: "restaurant", icon: <Utensils className="w-5 h-5 text-orange-500" /> },
                    { label: "محل تجاري", value: "store", icon: <ShoppingBag className="w-5 h-5 text-blue-500" /> },
                    { label: "سوبر ماركت", value: "supermarket", icon: <Store className="w-5 h-5 text-emerald-500" /> },
                    { label: "مقهى / كافيه", value: "cafe", icon: <Coffee className="w-5 h-5 text-amber-600" /> },
                    { label: "صيدلية", value: "pharmacy", icon: <Pill className="w-5 h-5 text-rose-500" /> },
                    { label: "أخرى", value: "other", icon: <ChevronDown className="w-5 h-5 text-gray-500" /> },
                  ] : [
                    { label: "Restaurant", value: "restaurant", icon: <Utensils className="w-5 h-5 text-orange-500" /> },
                    { label: "Store", value: "store", icon: <ShoppingBag className="w-5 h-5 text-blue-500" /> },
                    { label: "Supermarket", value: "supermarket", icon: <Store className="w-5 h-5 text-emerald-500" /> },
                    { label: "Cafe", value: "cafe", icon: <Coffee className="w-5 h-5 text-amber-600" /> },
                    { label: "Pharmacy", value: "pharmacy", icon: <Pill className="w-5 h-5 text-rose-500" /> },
                    { label: "Other", value: "other", icon: <ChevronDown className="w-5 h-5 text-gray-500" /> },
                  ]}
                  onChange={(name, value) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      [name]: value,
                      storeType: value 
                    }));
                  }}
                />

                <div className="space-y-4">
                  <label className="block font-bold text-sm text-gray-800 px-1">
                    {t("partner.branchCount")}
                  </label>
                  <input
                    type="number"
                    name="branchCount"
                    value={formData.branchCount}
                    onChange={(e) => {
                      const val = e.target.value === "" ? "" : parseInt(e.target.value);
                      if (val === "" || val >= 1) {
                        setFormData(prev => ({ ...prev, branchCount: val as number }));
                      }
                    }}
                    onFocus={handleFocus}
                    min="1"
                    placeholder="1"
                    className="w-full border border-gray-200 rounded-[20px] p-4 outline-none focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5 transition-all duration-300 bg-white shadow-sm"
                  />
                </div>

                <CustomSelect
                  label={t("partner.role")}
                  name="role"
                  value={formData.role}
                  placeholder={t("partner.roleSelect")}
                  icon={UserCircle}
                  options={isRTL ? [
                    { label: "المالك أو الشريك", value: "owner", icon: <Check className="w-4 h-4 text-emerald-500" /> },
                    { label: "المدير أو الممثل القانوني", value: "manager", icon: <Check className="w-4 h-4 text-blue-500" /> },
                  ] : [
                    { label: "Owner or Partner", value: "owner", icon: <Check className="w-4 h-4 text-emerald-500" /> },
                    { label: "Manager or Legal Representative", value: "manager", icon: <Check className="w-4 h-4 text-blue-500" /> },
                  ]}
                  onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                />

                <div className="pt-6 flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleStepChange(1)}
                    className="flex-1 w-full border border-[#C48033] text-[#C48033] hover:bg-[#C48033] hover:text-white font-bold rounded-lg py-3.5 font-cairo transition-all"
                  >
                    {t("partner.back")}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                       if (isStep2Valid()) handleStepChange(3);
                    }}
                    disabled={!isStep2Valid()}
                    className={cn(
                      "flex-1 w-full py-3.5 font-bold rounded-lg border-none shadow-md font-cairo transition-all text-white",
                      isStep2Valid() ? "bg-[#C48033] hover:bg-[#A36A29] cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                    )}
                  >
                    {t("partner.nextStep")}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div
                className="space-y-8 text-start animate-fade-in-up"
              >
                <div className="space-y-3">
                  <LiveLocationMap 
                    position={[formData.lat, formData.lng]}
                    onLocationChange={(lat, lng) => setFormData(prev => ({ ...prev, lat, lng }))}
                    onAddressFound={(addressData) => setAddressData(addressData)}
                  />
                </div>

                <div className="space-y-3 relative z-50">
                  <label className="block font-bold text-sm text-gray-800 px-1">
                    {t("partner.fullAddress")}
                  </label>
                  <AddressAutocomplete
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    onSelect={(addressData, lat, lng) => setAddressData(addressData, lat, lng)}
                    placeholder={t("partner.fullAddressPlaceholder")}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.country")}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.countryPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.governorate")}
                    </label>
                    <input
                      type="text"
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.governoratePlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.cityPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.area")}
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.areaPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.street")}
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.streetPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.buildingNumber")}
                    </label>
                    <input
                      type="text"
                      name="buildingNumber"
                      value={formData.buildingNumber}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.buildingNumberPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.landmark")}
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      placeholder={t("partner.landmarkPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block font-bold text-sm text-gray-800 px-1">
                      {t("partner.addressNotes")}
                    </label>
                    <textarea
                      name="addressNotes"
                      value={formData.addressNotes}
                      onChange={handleInputChange}
                      placeholder={t("partner.addressNotesPlaceholder")}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 transition-all duration-300 bg-white shadow-sm font-cairo min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.storeImageOptional")}
                  </label>
                  
                  {/* Real file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    id="store-image-upload-input"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed p-10 rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer text-gray-500 bg-white shadow-sm relative min-h-[220px] overflow-hidden group",
                      isDragging 
                        ? "border-[#D38842] bg-[#F7F1E7]/40 ring-4 ring-[#D38842]/5 scale-[0.99]" 
                        : "border-gray-200 hover:border-[#D38842] hover:shadow-md"
                    )}
                  >
                    {storeImagePreview ? (
                      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gray-50 p-4">
                        <img
                          src={storeImagePreview}
                          alt="Store Preview"
                          className="max-w-full max-h-full object-contain z-10 brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="bg-white/95 text-brand-dark hover:bg-[#D38842] hover:text-white px-4 py-2 rounded-xl text-sm font-bold font-cairo transition-all shadow-sm flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            {isRTL ? "تغيير الصورة" : "Change Photo"}
                          </button>
                          <button
                            type="button"
                            onClick={removeStoreImage}
                            className="bg-red-500/90 text-white hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-bold font-cairo transition-all shadow-sm flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            {isRTL ? "حذف" : "Delete"}
                          </button>
                        </div>
                        {/* Quick non-hover delete button for mobile since they can't hover */}
                        <div className="absolute top-3 end-3 z-30 sm:hidden">
                          <button
                            type="button"
                            onClick={removeStoreImage}
                            className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
                            aria-label="Delete Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-brand-light/70 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-8 h-8 text-[#D38842]" />
                        </div>
                        <span className="font-bold font-cairo text-gray-800 text-lg">
                          {t("partner.uploadPhotoTitle")}
                        </span>
                        <span className="text-sm font-medium text-gray-400 mt-1">
                          {t("partner.uploadPhotoDesc")}
                        </span>
                        {isRTL ? (
                          <span className="text-xs text-gray-400 mt-2 font-cairo">
                            يمكنك سحب وإفلات الصورة هنا، أو الضغط للاختيار من جهازك أو كاميرا الهاتف
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 mt-2">
                            Drag and drop an image here, or click to choose from your device/camera
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {uploadError && (
                    <p
                      className="text-red-500 text-xs font-semibold px-1 font-cairo animate-fade-in-up"
                    >
                      {uploadError}
                    </p>
                  )}
                </div>

                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#166534] text-sm mb-1">
                      {t("partner.almostDoneTitle")}
                    </h4>
                    <p className="text-[#15803d] text-xs font-medium leading-relaxed">
                      {t("partner.almostDoneDesc")}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => handleStepChange(2)}
                    className="flex-1 w-full border-2 border-[#C48033] text-[#C48033] hover:text-white hover:bg-[#C48033] font-bold rounded-xl py-3.5 font-cairo transition-all disabled:opacity-50"
                  >
                    {t("partner.back")}
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!isStep3Valid() || isSubmitting}
                    onClick={() => {
                      if (isStep3Valid()) {
                        setIsSubmitting(true);
                        console.log("Submit Form:", {
                          ...formData,
                          storeImageFile,
                          storeImagePreview
                        });
                        setTimeout(() => {
                          setIsSubmitting(false);
                          setIsSubmitted(true);
                        }, 1800);
                      }
                    }}
                    className={cn(
                      "flex-1 w-full py-3.5 font-bold rounded-xl border-none shadow-lg font-cairo transition-all text-white flex items-center justify-center gap-2",
                      isStep3Valid() && !isSubmitting ? "bg-[#C48033] hover:bg-[#A36A29] shadow-[#C48033]/20 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isRTL ? "جاري الإرسال..." : "Submitting..."}
                      </>
                    ) : (
                      t("partner.submit")
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>
    </section>
  );
};
