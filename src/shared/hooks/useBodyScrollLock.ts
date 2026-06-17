import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // Save the original body and html overflow styles
    const originalBodyOverflow = window.getComputedStyle(document.body).overflow;
    const originalHtmlOverflow = window.getComputedStyle(document.documentElement).overflow;
    
    // Find the dashboard-view-stage element which handles the main content scroll in the brand dashboard
    const dashboardViewStage = document.getElementById('dashboard-view-stage');
    const originalStageOverflowY = dashboardViewStage ? window.getComputedStyle(dashboardViewStage).overflowY : null;

    // Lock scrolling on document bodies
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Lock scrolling on the dashboard stages if they exist
    if (dashboardViewStage) {
      dashboardViewStage.style.overflowY = 'hidden';
    }

    // Restore original scrolling styles on cleanup
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (dashboardViewStage && originalStageOverflowY) {
        dashboardViewStage.style.overflowY = originalStageOverflowY;
      }
    };
  }, [isLocked]);
};
