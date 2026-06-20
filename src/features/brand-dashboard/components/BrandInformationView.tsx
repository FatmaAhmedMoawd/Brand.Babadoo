import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  Store,
  Phone,
  MapPin,
  Upload,
  FileText,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Check,
  AlertCircle
} from 'lucide-react';

interface BrandInformationViewProps {
  onBack: () => void;
}

export const BrandInformationView: React.FC<BrandInformationViewProps> = ({ onBack }) => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Form states initialized to exact values requested and visible in screenshots
  const [brandLogo, setBrandLogo] = useState<string>(() => {
    return localStorage.getItem('babbads_brand_logo') || 'https://i.postimg.cc/63LC8RRp/Capture.png';
  });
  const [coverImage, setCoverImage] = useState<string | null>(() => {
    return localStorage.getItem('babbads_cover_image') || null;
  });
  const [brandNameAr, setBrandNameAr] = useState<string>(() => {
    return localStorage.getItem('babbads_brand_name_ar') || 'روستو';
  });
  const [brandNameEn, setBrandNameEn] = useState<string>(() => {
    return localStorage.getItem('babbads_brand_name_en') || 'Rosto';
  });
  const [description, setDescription] = useState<string>(() => {
    return localStorage.getItem('babbads_description') || '';
  });
  const [contactPhone, setContactPhone] = useState<string>(() => {
    return localStorage.getItem('babbads_contact_phone') || '+201001234567';
  });
  const [address, setAddress] = useState<string>(() => {
    return localStorage.getItem('babbads_address') || '123 Main Street, Cairo, Egypt';
  });

  // Social media states
  const [facebook, setFacebook] = useState<string>(() => {
    return localStorage.getItem('babbads_facebook') || '@thecoffeehouse';
  });
  const [instagram, setInstagram] = useState<string>(() => {
    return localStorage.getItem('babbads_instagram') || '@thecoffeehouse';
  });
  const [twitter, setTwitter] = useState<string>(() => {
    return localStorage.getItem('babbads_twitter') || '@thecoffeehouse';
  });

  // Legal document files state
  const [documents, setDocuments] = useState<string[]>([]);

  // File upload refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // File upload handlers
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments((prev) => [...prev, file.name]);
    }
  };

  const handleSave = () => {
    localStorage.setItem('babbads_brand_logo', brandLogo);
    if (coverImage) {
      localStorage.setItem('babbads_cover_image', coverImage);
    }
    localStorage.setItem('babbads_brand_name_ar', brandNameAr);
    localStorage.setItem('babbads_brand_name_en', brandNameEn);
    localStorage.setItem('babbads_description', description);
    localStorage.setItem('babbads_contact_phone', contactPhone);
    localStorage.setItem('babbads_address', address);
    localStorage.setItem('babbads_facebook', facebook);
    localStorage.setItem('babbads_instagram', instagram);
    localStorage.setItem('babbads_twitter', twitter);

    // Save success alert trigger
    setShowSuccessAlert(true);
    setEditMode(false);

    // Dispatch custom event to notify other components (like BrandLogo)
    window.dispatchEvent(new Event('babbads_logo_updated'));

    // Auto fade alert after 4 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  const handleCancel = () => {
    // Reset to original states loaded from localStorage
    setBrandLogo(localStorage.getItem('babbads_brand_logo') || 'https://i.postimg.cc/63LC8RRp/Capture.png');
    setCoverImage(localStorage.getItem('babbads_cover_image') || null);
    setBrandNameAr(localStorage.getItem('babbads_brand_name_ar') || 'روستو');
    setBrandNameEn(localStorage.getItem('babbads_brand_name_en') || 'Rosto');
    setDescription(localStorage.getItem('babbads_description') || '');
    setContactPhone(localStorage.getItem('babbads_contact_phone') || '+201001234567');
    setAddress(localStorage.getItem('babbads_address') || '123 Main Street, Cairo, Egypt');
    setFacebook(localStorage.getItem('babbads_facebook') || '@thecoffeehouse');
    setInstagram(localStorage.getItem('babbads_instagram') || '@thecoffeehouse');
    setTwitter(localStorage.getItem('babbads_twitter') || '@thecoffeehouse');
    setEditMode(false);
  };

  return (
    <div id="brand-info-page" className="space-y-6 text-start select-none w-full animate-fadeIn max-w-7xl mx-auto pb-10">
      
      {/* 1. Header Back Navigation Breadcrumb row */}
      <div id="brand-info-breadcrumb" className="flex items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold font-cairo text-[15px] cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Back to Setting</span>
        </button>
      </div>

      {/* 2. Top Title and Actions Row (Exactly matches screenshots and details) */}
      <div id="brand-info-heading-actions" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
              Brand Information
            </h1>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-[13px] font-bold font-cairo bg-[#EBFDF2] text-[#14BA6D] border border-[#14BA6D]/10">
              Active
            </span>
          </div>
          <p className="text-[15px] font-semibold text-gray-400 font-cairo leading-relaxed">
            Manage your brand details and media
          </p>
        </div>

        {/* Action button(s) at Top-Right */}
        <div className="flex items-center gap-3.5">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-8 py-2.5 bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo rounded-[12px] min-w-[130px] flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer text-[15px]"
            >
              Edite
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-7 py-2.5 bg-white hover:bg-neutral-50 text-[#AE6727] border border-[#AE6727] font-bold font-cairo rounded-[12px] min-w-[110px] flex items-center justify-center transition-all cursor-pointer text-[15px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-7 py-2.5 bg-[#AE6727] hover:bg-[#8D501D] text-white border border-[#AE6727] font-bold font-cairo rounded-[12px] min-w-[150px] flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer text-[15px]"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Two columns main layout (Bento grid style matching screenshot) */}
      <div id="brand-info-cols-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Main Form details (Logo, Cover, Inputs) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.015)] text-start">
            
            {/* A. Brand Logo Section */}
            <div id="brand-logo-section" className="space-y-4">
              <h2 className="text-[18px] font-black text-gray-950 font-cairo leading-tight">
                Brand Logo
              </h2>
              
              <div className="flex items-center gap-5">
                {/* Round logo thumbnail frame */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-100 overflow-hidden bg-neutral-50 shadow-inner flex items-center justify-center shrink-0">
                  <img
                    src={brandLogo}
                    alt="Brand Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Change logo button and info */}
                <div className="flex flex-col text-start gap-1">
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="px-5 py-2 bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo text-[14px] rounded-[10px] transition-colors cursor-pointer w-fit"
                  >
                    Chang Logo
                  </button>
                  <span className="text-[12.5px] font-semibold text-gray-400 font-sans mt-[4px] leading-relaxed">
                    Recommended: 400×400px
                  </span>
                </div>
              </div>
            </div>

            {/* B. Cover Image Section */}
            <div id="cover-image-section" className="space-y-3 pt-2">
              <h2 className="text-[18px] font-black text-gray-950 font-cairo leading-tight">
                Cover Image
              </h2>

              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                className="hidden"
              />

              {/* Cover drag/upload drop zone */}
              <div
                onClick={() => coverInputRef.current?.click()}
                className={`relative border-2 border-dashed ${
                  coverImage ? 'border-[#AE6727]/30' : 'border-gray-200'
                } hover:border-[#AE6727]/40 rounded-[20px] bg-neutral-50/50 p-6 sm:p-9 text-center cursor-pointer transition-all duration-200 overflow-hidden flex flex-col items-center justify-center min-h-[190px]`}
              >
                {coverImage ? (
                  <>
                    <img
                      src={coverImage}
                      alt="Brand Cover Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-[12px] px-4 py-2 text-sm font-bold font-cairo text-[#AE6727]">
                        Change Cover
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 max-w-sm">
                    {/* Upload icon in trademark orange brown */}
                    <div className="w-12 h-12 rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727]">
                      <Upload className="w-5 h-5 text-[#AE6727] stroke-[2.25]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[16px] font-black text-[#3D2B1F] font-cairo leading-tight">
                        Upload Cover Image
                      </h4>
                      <p className="text-[12.5px] font-semibold text-gray-400 font-sans leading-none">
                        Recommended: 1200×400px
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-2.5 px-4.5 py-1.5 bg-white border border-[#AE6727] text-[#AE6727] font-bold font-cairo text-[13px] rounded-[10px] hover:bg-[#FCF5EE] transition-colors"
                    >
                      Upload Cover
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* C. Inputs Fields Split (Brand Names in Arabic & English) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Brand Name Arabic */}
              <div id="brand-name-ar-field" className="flex flex-col text-start space-y-1.5 w-full">
                <label className="text-[14px] font-bold text-[#3D2B1F] font-cairo">
                  Brand Name(Arabic) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-4 text-gray-400 pointer-events-none">
                    <Store className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    type="text"
                    value={brandNameAr}
                    onChange={(e) => setBrandNameAr(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[14.5px] text-gray-900 placeholder-gray-400 transition-all shadow-2xs bg-white cursor-text"
                  />
                </div>
              </div>

              {/* Brand Name English */}
              <div id="brand-name-en-field" className="flex flex-col text-start space-y-1.5 w-full">
                <label className="text-[14px] font-bold text-[#3D2B1F] font-cairo">
                  Brand Name(English) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-4 text-gray-400 pointer-events-none">
                    <Store className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    type="text"
                    value={brandNameEn}
                    onChange={(e) => setBrandNameEn(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[14.5px] text-gray-900 placeholder-gray-400 transition-all shadow-2xs bg-white cursor-text"
                  />
                </div>
              </div>
            </div>

            {/* D. Brand Description area */}
            <div id="brand-desc-field" className="flex flex-col text-start space-y-1.5 w-full">
              <label className="text-[14px] font-bold text-[#3D2B1F] font-cairo">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a detailed description of your restaurant....."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-semibold text-[14px] text-gray-950 placeholder-gray-400 transition-all shadow-2xs resize-none bg-white cursor-text"
              />
              <span className="text-[12px] font-semibold text-gray-400 font-cairo">
                Provide detailed information about the restaurant, featured, etc
              </span>
            </div>

            {/* E. Phone and Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* Phone Field */}
              <div id="contact-phone-field" className="flex flex-col text-start space-y-1.5 w-full">
                <label className="text-[14px] font-bold text-[#3D2B1F] font-cairo">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-4 text-gray-400 pointer-events-none">
                    <Phone className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[14.5px] text-gray-900 placeholder-gray-400 transition-all shadow-2xs bg-white cursor-text"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div id="address-field" className="flex flex-col text-start space-y-1.5 w-full">
                <label className="text-[14px] font-bold text-[#3D2B1F] font-cairo">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-4 text-gray-400 pointer-events-none">
                    <MapPin className="w-[18px] h-[18px]" />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[14.5px] text-gray-900 placeholder-gray-400 transition-all shadow-2xs bg-white cursor-text"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* RIGHT COLUMN: Sidebar (Social Media links, Document verification) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Social Media Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.012)] text-start">
            <h2 className="text-[18px] font-black text-gray-950 font-cairo">
              Social Media
            </h2>

            {/* Facebook Field */}
            <div className="flex flex-col text-start space-y-1.5">
              <label className="text-[13px] font-bold text-[#3D2B1F] font-cairo">
                Facebook
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-100 rounded-[12px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[13.5px] text-gray-900 transition-all bg-white cursor-text"
                />
              </div>
            </div>

            {/* Instagram Field */}
            <div className="flex flex-col text-start space-y-1.5">
              <label className="text-[13px] font-bold text-[#3D2B1F] font-cairo">
                Instagram
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
                  <Instagram className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-100 rounded-[12px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[13.5px] text-gray-900 transition-all bg-white cursor-text"
                />
              </div>
            </div>

            {/* Twitter Field */}
            <div className="flex flex-col text-start space-y-1.5">
              <label className="text-[13px] font-bold text-[#3D2B1F] font-cairo">
                Twitter
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-100 rounded-[12px] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] font-sans font-bold text-[13.5px] text-gray-900 transition-all bg-white cursor-text"
                />
              </div>
            </div>
          </div>

          {/* Legal Documents Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.012)] text-start relative overflow-hidden">
            <h2 className="text-[18px] font-black text-gray-950 font-cairo leading-none">
              Legal Documents
            </h2>

            {/* Document Verification Box with clean custom style */}
            <div className="bg-[#FCFBFC] border border-gray-100 rounded-[16px] p-3.5 flex items-center justify-between text-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 shrink-0">
                  <FileText className="w-[18px] h-[18px] text-[#3D2B1F]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[14px] text-gray-950 font-black font-cairo">
                    Document Status
                  </span>
                  <span className="text-[11.5px] text-gray-400 font-semibold mt-[2px] leading-relaxed">
                    Business license and permits
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="text-emerald-500 flex items-center shrink-0">
                <CheckCircle2 className="w-5 h-5 fill-emerald-500/10 text-emerald-500 stroke-[2.25]" />
              </div>
            </div>

            {/* Upload documents target */}
            <input
              type="file"
              ref={docInputRef}
              onChange={handleDocChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            <div
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-[#AE6727]/30 rounded-[20px] bg-neutral-50/50 p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[170px]"
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-11 h-11 rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center text-[#AE6727]">
                  <Upload className="w-[18px] h-[18px] text-[#AE6727] stroke-[2.25]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[15px] font-black text-[#3D2B1F] font-cairo">
                    Upload documents
                  </h4>
                  <p className="text-[11.5px] font-semibold text-gray-400 font-sans leading-none">
                    PDF, DOC up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {documents.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">
                  Uploaded Files ({documents.length})
                </div>
                {documents.map((docName, index) => (
                  <div key={index} className="flex items-center gap-1.5 bg-[#FCF5EE]/40 border border-[#AE6727]/5 rounded-[8px] p-2 text-[12.5px] font-semibold text-[#8D501D] truncate">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate flex-1">{docName}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded font-bold shrink-0">Ready</span>
                  </div>
                ))}
              </div>
            )}

            {/* Hint message at bottom of legal documents view */}
            <p className="text-[11px] font-semibold text-gray-400 font-cairo leading-relaxed pt-2 border-t border-gray-100/60 mt-1">
              * Documents are reviewed by admin. Status will be updated within 24–48 hours.
            </p>
          </div>

        </div>

      </div>

      {/* 4. Success Alert Warning Notification Overlay (Perfect custom design matching user request) */}
      {showSuccessAlert && (
        <div
          id="brand-info-success-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-neutral-900 text-white rounded-[16px] px-5 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] max-w-sm border border-neutral-800 animate-slideInRight select-none"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-[18px] h-[18px] stroke-[3]" />
          </div>
          <div className="flex flex-col text-start">
            <span className="text-[14.5px] font-black text-white font-cairo leading-tight">
              Success
            </span>
            <span className="text-[13px] font-semibold text-neutral-400 font-sans mt-[2px] leading-relaxed">
              Changes saved successfully!
            </span>
          </div>
          <button
            onClick={() => setShowSuccessAlert(false)}
            className="text-neutral-400 hover:text-white font-black font-cairo text-[12.5px] ps-2.5 ms-auto uppercase tracking-wider shrink-0 transition-colors"
          >
            OK
          </button>
        </div>
      )}

    </div>
  );
};
