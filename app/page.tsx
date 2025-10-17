'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import WelcomeModal from './components/WelcomeModal';

// Dynamic imports to avoid SSR issues with PDF viewer
const PDFViewer = dynamic(() => import('./components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  ),
});

const ControlPanel = dynamic(() => import('./components/ControlPanel'), {
  ssr: false,
});

export default function Home() {
  const [panelWidth, setPanelWidth] = useState(384);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;
      setPanelWidth((prev) => {
        const newWidth = Math.min(Math.max(window.innerWidth - event.clientX, 320), 640);
        return newWidth;
      });
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('mouseleave', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('mouseleave', stopResizing);
    };
  }, [isResizing]);

  const startResizing = () => setIsResizing(true);

  return (
    <>
      <WelcomeModal />
      <main className="flex h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Left Panel - PDF Viewer */}
        <div className="flex-1 min-w-0 border-r border-gray-300 dark:border-gray-700">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            }
          >
            <PDFViewer />
          </Suspense>
        </div>

        <div
          className={`w-[6px] cursor-col-resize bg-white/60 dark:bg-white/20 transition ${
            isResizing ? 'opacity-100' : 'opacity-80 hover:opacity-100'
          }`}
          onMouseDown={startResizing}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize control panel"
        />

        {/* Right Panel - Control Panel */}
        <div className="flex-shrink-0" style={{ width: panelWidth }}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            }
          >
            <ControlPanel />
          </Suspense>
        </div>
      </main>
    </>
  );
}
