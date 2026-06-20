import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Smartphone,
  Camera,
  Check,
  CheckCircle2
} from 'lucide-react';

interface PersonalInformationViewProps {
  onBack: () => void;
}

export const PersonalInformationView: React.FC<PersonalInformationViewProps> = ({ onBack }) => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Values from the screenshot with localStorage loading
  const [firstName, setFirstName] = useState(() => {
    return localStorage.getItem('babbads_first_name') || 'Ahmed';
  });
  const [lastName, setLastName] = useState(() => {
    return localStorage.getItem('babbads_last_name') || 'Muhammed';
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('babbads_email') || 'ahmed@gmail.com';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem('babbads_phone') || '01002386568';
  });
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('babbads_profile_photo') || 'https://i.postimg.cc/63LC8RRp/Capture.png';
  });
  const [twoFactor, setTwoFactor] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('babbads_first_name', firstName);
    localStorage.setItem('babbads_last_name', lastName);
    localStorage.setItem('babbads_email', email);
    localStorage.setItem('babbads_phone', phoneNumber);
    localStorage.setItem('babbads_profile_photo', profileImage);

    // Dispatch update event
    window.dispatchEvent(new Event('babbads_profile_photo_updated'));

    setShowSuccessAlert(true);
    setEditMode(false);
    // Auto fade alert after 4 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  const handleCancel = () => {
    setFirstName(localStorage.getItem('babbads_first_name') || 'Ahmed');
    setLastName(localStorage.getItem('babbads_last_name') || 'Muhammed');
    setEmail(localStorage.getItem('babbads_email') || 'ahmed@gmail.com');
    setPhoneNumber(localStorage.getItem('babbads_phone') || '01002386568');
    setProfileImage(localStorage.getItem('babbads_profile_photo') || 'https://i.postimg.cc/63LC8RRp/Capture.png');
    setEditMode(false);
  };

  return (
    <div id="personal-info-page" className="space-y-6 text-start select-none w-full animate-fadeIn max-w-7xl mx-auto pb-10">
      
      {/* 1. Header Back Navigation Breadcrumb row */}
      <div id="personal-info-breadcrumb" className="flex items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold font-cairo text-[15px] cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Back to Setting</span>
        </button>
      </div>

      {/* 2. Top Title and Actions Row (Exactly matching search results and user visual request) */}
      <div id="personal-info-heading-actions" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
            Owner Profile
          </h1>
          <p className="text-[15px] font-semibold text-gray-400 font-cairo leading-relaxed">
            Manage your personal information and security settings
          </p>
        </div>

        {/* Action Button: "Edite" as requested in screenshot */}
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

      {/* 3. Owner profile form sections */}
      <div id="personal-info-grid" className="space-y-6">
        
        {/* Card 1: Profile Picture - contains Profile Image & Input Fields */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 space-y-8 shadow-[0_4px_24px_rgba(0,0,0,0.015)] text-start">
          
          {/* Corrected Card Header title to "Profile Picture" to prevent brand logo confusion */}
          <h2 className="text-[20px] font-black text-gray-950 font-cairo leading-none">
            Profile Picture
          </h2>

          {/* Round avatar and details row */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 text-center sm:text-start">
            
            {/* Avatar thumbnail with orange camera icon overlay */}
            <div className="relative w-28 h-28 rounded-full border border-gray-100 bg-neutral-50 shadow-inner flex items-center justify-center shrink-0">
              <img
                src={profileImage}
                alt="Owner Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {/* Little Camera Overlay Trigger */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#FFFFFF] border border-gray-100 shadow-md flex items-center justify-center text-gray-500 hover:text-[#AE6727] transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#FCF5EE] border border-[#AE6727]/10 flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-[#AE6727]" />
                </div>
              </button>
            </div>

            {/* Name and verified state */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-start gap-2">
              <span className="text-[24px] font-black text-gray-950 font-cairo leading-tight">
                {firstName} {lastName}
              </span>

              {/* Blue solid/soft "Email Verified" badge */}
              <div className="inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-[#E8EFFF] text-[#3B72FF] rounded-[10px] w-fit font-bold text-[14px]">
                <Check className="w-[15px] h-[15px] text-[#3B72FF] stroke-[3]" />
                <span className="leading-none">Email Verified</span>
              </div>
            </div>

          </div>

          {/* Form input fields split into Grid (2 columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Name Field */}
            <div id="first-name-field" className="flex flex-col text-start space-y-2 w-full">
              <label className="text-[14px] font-bold text-gray-700 font-cairo">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <User className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  disabled={!editMode}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 border rounded-[14px] font-sans font-bold text-[14.5px] transition-all bg-white ${
                    editMode 
                    ? 'border-[#AE6727] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] cursor-text text-gray-950' 
                    : 'border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div id="last-name-field" className="flex flex-col text-start space-y-2 w-full">
              <label className="text-[14px] font-bold text-gray-700 font-cairo">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <User className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <input
                  type="text"
                  value={lastName}
                  disabled={!editMode}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 border rounded-[14px] font-sans font-bold text-[14.5px] transition-all bg-white ${
                    editMode 
                    ? 'border-[#AE6727] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] cursor-text text-gray-950' 
                    : 'border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Email Address Field */}
            <div id="email-address-field" className="flex flex-col text-start space-y-2 w-full">
              <label className="text-[14px] font-bold text-gray-700 font-cairo">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <Mail className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled={!editMode}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 border rounded-[14px] font-sans font-bold text-[14.5px] transition-all bg-white ${
                    editMode 
                    ? 'border-[#AE6727] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] cursor-text text-gray-950' 
                    : 'border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div id="phone-number-field" className="flex flex-col text-start space-y-2 w-full">
              <label className="text-[14px] font-bold text-gray-700 font-cairo">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-gray-400 pointer-events-none">
                  <Phone className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <input
                  type="text"
                  value={phoneNumber}
                  disabled={!editMode}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 border rounded-[14px] font-sans font-bold text-[14.5px] transition-all bg-white ${
                    editMode 
                    ? 'border-[#AE6727] focus:outline-hidden focus:ring-2 focus:ring-[#AE6727]/15 focus:border-[#AE6727] cursor-text text-gray-950' 
                    : 'border-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                />
              </div>
            </div>

          </div>

        </div>

        {/* Card 2: Security */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.015)] text-start">
          
          {/* Header Row */}
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-lg bg-[#EBF3FF] flex items-center justify-center text-[#3B72FF] shrink-0">
              <Shield className="w-5 h-5 text-[#3B72FF]" />
            </div>
            <h2 className="text-[20px] font-black text-gray-950 font-cairo leading-none">
              Security
            </h2>
          </div>

          {/* List layout inside Security */}
          <div className="space-y-4">
            
            {/* Password Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 rounded-[18px] p-4.5 bg-neutral-50/20 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[46px] border border-gray-100 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Lock className="w-[18px] h-[18px] text-gray-800" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[15.5px] font-bold text-gray-950 font-cairo">
                    Password
                  </span>
                  <span className="text-[13px] text-gray-400 font-semibold mt-[2px] leading-relaxed">
                    Last changed 3 months ago
                  </span>
                </div>
              </div>

              {/* Action Button: Change Passwod (As spelled in screenshot) */}
              <button
                type="button"
                className="px-5 py-2.5 bg-white border border-gray-200 text-[#AE6727] hover:bg-[#FCF5EE]/40 font-bold font-cairo text-[14.5px] rounded-[12px] transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                Change Passwod
              </button>
            </div>

            {/* Two-Factor Authentication Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 rounded-[18px] p-4.5 bg-neutral-50/20 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[46px] border border-gray-100 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Smartphone className="w-[18px] h-[18px] text-gray-800" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[15.5px] font-bold text-gray-950 font-cairo">
                    Two-Factor Authentication
                  </span>
                  <span className="text-[13px] text-gray-400 font-semibold mt-[2px] leading-relaxed">
                    Add an extra layer of security to your account
                  </span>
                </div>
              </div>

              {/* Slider Toggle Switch (Interactive) */}
              <button
                type="button"
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  twoFactor ? 'bg-[#3B72FF]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    twoFactor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Success Toast Alert */}
      {showSuccessAlert && (
        <div
          id="personal-info-success-toast"
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
              Profile updated successfully!
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
