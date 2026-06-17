import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false }) => {
  return (
    <div id="brand-logo-container" className="flex items-center select-none justify-center w-full">
      {collapsed ? (
        <div id="brand-logo-collapsed-box" className="w-[54px] h-[54px] flex items-center justify-center">
          <img
            id="brand-logo-collapsed-img"
            src="https://i.postimg.cc/k5HbY5wj/Capture.png"
            alt="BABBADO B"
            className="h-[44px] w-auto object-contain pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <img
          id="brand-logo-full-img"
          src="https://i.postimg.cc/vBn335YH/Frame-41.png"
          alt="BABBADO Logo"
          className="h-[54px] w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
