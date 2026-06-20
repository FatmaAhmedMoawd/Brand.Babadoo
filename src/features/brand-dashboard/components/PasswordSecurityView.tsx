import React, { useState } from 'react';
import { ChevronLeft, Shield, Lock, Check, Eye, EyeOff } from 'lucide-react';

interface PasswordSecurityViewProps {
  onBack: () => void;
}

export const PasswordSecurityView: React.FC<PasswordSecurityViewProps> = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Visibility toggle state for each input field
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    // Mimic real security save action
    setShowSuccessAlert(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onBack();
  };

  return (
    <div id="password-security-page" className="w-full text-start select-none animate-fadeIn bg-[#FDFCFB] min-h-screen px-4 py-6 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      
      {/* Container wrapper for content to allow absolute/flex alignment of the footer if needed, or structured flow */}
      <div className="space-y-6 flex-1">
        
        {/* 1. Header Back Navigation row */}
        <div id="password-security-breadcrumb" className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#AE6727] hover:text-[#8D501D] font-semibold transition-colors cursor-pointer text-base"
          >
            <ChevronLeft className="w-5 h-5 text-[#AE6727]" />
            <span>Back to Setting</span>
          </button>
        </div>

        {/* 2. Top Title and Subtitle as per user screenshot */}
        <div id="password-security-heading" className="space-y-1.5 pt-2">
          <h1 className="text-[36px] font-bold text-[#0D0D0D] tracking-tight leading-none font-sans">
            Change Password
          </h1>
          <p className="text-[15px] font-normal text-[#757575] leading-relaxed">
            Update your account password to keep it secure
          </p>
        </div>

        {/* 3. The exact main Box/Card on the left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          <div className="lg:col-span-7 bg-white border border-[#E9EFF2] rounded-[18px] p-8 md:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.015)] space-y-6">
            
            {/* Current Password Input Field */}
            <div id="current-password-field-grp" className="flex flex-col text-start space-y-2.5 w-full">
              <label className="text-[15px] font-bold text-[#1F1F1F]">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-[#9CA3AF] pointer-events-none">
                  <Lock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  placeholder="Enter current password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-[#E5E7EB] rounded-[12px] font-sans text-[15px] text-[#1F1F1F] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 text-[#9CA3AF] hover:text-[#AE6727] cursor-pointer transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password Input Field */}
            <div id="new-password-field-grp" className="flex flex-col text-start space-y-2.5 w-full">
              <label className="text-[15px] font-bold text-[#1F1F1F]">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-[#9CA3AF] pointer-events-none">
                  <Lock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-[#E5E7EB] rounded-[12px] font-sans text-[15px] text-[#1F1F1F] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 text-[#9CA3AF] hover:text-[#AE6727] cursor-pointer transition-colors"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password Input Field */}
            <div id="confirm-password-field-grp" className="flex flex-col text-start space-y-2.5 w-full">
              <label className="text-[15px] font-bold text-[#1F1F1F]">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <div className="absolute left-4 text-[#9CA3AF] pointer-events-none">
                  <Lock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border border-[#E5E7EB] rounded-[12px] font-sans text-[15px] text-[#1F1F1F] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 text-[#9CA3AF] hover:text-[#AE6727] cursor-pointer transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements Box inside the card */}
            <div className="bg-[#FAF9F6] border border-[#EBEAE6] rounded-[14px] p-5 space-y-3.5 text-start">
              <div className="flex items-center gap-2.5 text-[#1F1F1F]">
                <Shield className="w-[18px] h-[18px] text-[#AE6727]" />
                <span className="text-[15px] font-bold text-[#1F1F1F] font-sans">
                  Password Requirements
                </span>
              </div>
              <ul className="space-y-2 text-[14px] font-medium text-[#79746A] pl-1 list-none font-sans">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#79746A] rounded-full shrink-0" />
                  8 characters minimum
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#79746A] rounded-full shrink-0" />
                  Include symbol (@, #, $, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#79746A] rounded-full shrink-0" />
                  Include number
                </li>
              </ul>
            </div>

          </div>

          {/* Empty spacer column or details space to balance design perfectly */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>

      </div>

      {/* 4. Exact styled bottom action buttons aligned exactly like screenshot at the bottom right */}
      <div id="password-security-actions-row" className="flex items-center justify-end gap-8 pt-8 pb-4 w-full">
        <button
          onClick={handleCancel}
          className="text-[#AE6727] hover:text-[#8D501D] font-bold font-sans text-[16.5px] cursor-pointer transition-colors px-4 py-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-[46px] py-5 text-white font-bold font-sans text-[17px] rounded-[22px] min-w-[185px] cursor-pointer transition-all font-semibold bg-[#AE6727] hover:bg-[#8D501D] active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          Save Changes
        </button>
      </div>

      {/* Success Notification Alert */}
      {showSuccessAlert && (
        <div
          id="password-success-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-neutral-900 text-white rounded-[16px] px-5 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] max-w-sm border border-neutral-800 animate-slideInRight select-none"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-[18px] h-[18px] stroke-[3]" />
          </div>
          <div className="flex flex-col text-start">
            <span className="text-[14.5px] font-black text-white font-sans leading-tight">
              Success
            </span>
            <span className="text-[13px] font-semibold text-neutral-400 font-sans mt-[2px] leading-relaxed">
              Security settings updated successfully!
            </span>
          </div>
          <button
            onClick={() => setShowSuccessAlert(false)}
            className="text-neutral-400 hover:text-white font-black text-[12.5px] ps-2.5 ms-auto uppercase tracking-wider shrink-0 transition-colors"
          >
            OK
          </button>
        </div>
      )}

    </div>
  );
};
