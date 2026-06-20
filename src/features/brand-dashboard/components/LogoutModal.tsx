import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  useBodyScrollLock(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the cancel button as safe default focus
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([-1])'
    );
    if (focusableElements && focusableElements.length > 0) {
      const cancelBtn = Array.from(focusableElements).find(
        (el) => el.id === 'logout-cancel-btn'
      ) as HTMLElement;
      if (cancelBtn) {
        cancelBtn.focus();
      } else {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div id="logout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        id="logout-modal-container"
        className="relative bg-white rounded-[24px] max-w-sm w-full p-8 shadow-2xl border border-gray-100 flex flex-col items-center text-center z-10"
      >
        {/* Red Log Out Icon inside light red/neutral container */}
        <div id="logout-icon-wrapper" className="w-[84px] h-[84px] rounded-full bg-red-50/50 flex items-center justify-center mb-6">
          <div className="w-[56px] h-[56px] rounded-full border border-red-100 bg-white flex items-center justify-center shadow-sm">
            <LogOut className="w-6 h-6 text-red-500 stroke-[2.25]" />
          </div>
        </div>

        {/* Text Details */}
        <h3 id="logout-modal-title" className="text-2xl font-bold font-cairo text-gray-900 mb-2 leading-8">
          Log out?
        </h3>
        <p id="logout-modal-description" className="text-gray-500 font-cairo text-sm leading-6 mb-8 max-w-[280px]">
          Are you sure you want to log out? Any unsaved changes might be lost.
        </p>

        {/* Actions Button Bar */}
        <div id="logout-action-buttons" className="flex items-center justify-end w-full gap-8">
          <button
            id="logout-cancel-btn"
            onClick={onClose}
            className="text-[#AE6727] font-bold font-cairo text-base hover:opacity-85 transition-opacity px-3 py-2 cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            id="logout-confirm-btn"
            onClick={onConfirm}
            className="border-2 border-red-500 hover:bg-red-50 text-red-500 font-bold font-cairo text-base px-6 py-3 rounded-[16px] transition-all cursor-pointer shadow-xs min-w-[130px]"
          >
            Yes, Log out
          </button>
        </div>
      </motion.div>
    </div>
  );
};
