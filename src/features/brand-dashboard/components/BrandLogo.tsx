import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
}

export const BrandLogo = React.memo(({ collapsed = false }: BrandLogoProps) => {
  const [imageError, setImageError] = React.useState(false);
  const [dbBrandLogo, setDbBrandLogo] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check if there is a custom brand logo saved
    const savedLogo = localStorage.getItem('babbads_brand_logo');
    if (savedLogo) {
      setDbBrandLogo(savedLogo);
    }

    // Listen to storage changes for multi-tab or same-page dynamics
    const handleStorageChange = () => {
      const updatedLogo = localStorage.getItem('babbads_brand_logo');
      setDbBrandLogo(updatedLogo);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('babbads_logo_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('babbads_logo_updated', handleStorageChange);
    };
  }, []);

  const logoUrl = dbBrandLogo || "https://i.postimg.cc/63LC8RRp/Capture.png";
  const collapsedLogoUrl = "https://i.postimg.cc/k5HbY5wj/Capture.png";

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    if (collapsed) {
      return (
        <div id="brand-logo-collapsed-fallback" className="w-[48px] h-[48px] rounded-[14px] bg-[#AE6727] flex items-center justify-center text-white font-extrabold text-[22px] font-cairo shadow-md shadow-[#AE6727]/10">
          B
        </div>
      );
    }
    return (
      <div id="brand-logo-full-fallback" className="flex items-center gap-2 py-1 select-none">
        <div className="w-[36px] h-[36px] rounded-[10px] bg-[#AE6727] flex items-center justify-center text-white font-black text-[18px] font-cairo">
          B
        </div>
        <span className="text-[20px] font-black tracking-tight text-gray-950 font-cairo leading-none">
          BABBADO<span className="text-[#AE6727]">.</span>
        </span>
      </div>
    );
  }

  return (
    <div id="brand-logo-container" className="flex items-center select-none justify-center w-full">
      {collapsed ? (
        <div id="brand-logo-collapsed-box" className="w-[54px] h-[54px] flex items-center justify-center">
          <img
            id="brand-logo-collapsed-img"
            src={collapsedLogoUrl}
            alt="BABBADO B"
            width={44}
            height={44}
            style={{ aspectRatio: '1/1' }}
            className="h-[44px] w-[44px] object-contain pointer-events-none"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>
      ) : (
        <div id="brand-logo-full-box" className="h-[54px] w-[162px] flex items-center justify-center">
          <img
            id="brand-logo-full-img"
            src={logoUrl}
            alt="BABBADO Logo"
            width={162}
            height={54}
            style={{ aspectRatio: '3/1' }}
            className="h-[54px] w-[162px] object-contain"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>
      )}
    </div>
  );
});

