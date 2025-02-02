import React from 'react';

const BottomNav = () => {
  return (
    // Hide on desktop (md and up), show on mobile
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Enhanced blur layer */}
      <div className="absolute inset-0 bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl" />
      
      {/* Safe area padding with improved gradient */}
      <div className="relative bg-gradient-to-t from-white/90 via-white/80 to-transparent 
        dark:from-gray-900/90 dark:via-gray-900/80 dark:to-transparent
        border-t border-gray-200/50 dark:border-gray-700/50 
        pb-[env(safe-area-inset-bottom,16px)]
        shadow-lg">
        
        <div className="flex items-center justify-around px-4 py-1">
          <button className="p-2 flex flex-col items-center justify-center min-w-[64px]
            group relative">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center
              bg-gray-100/50 dark:bg-gray-800/50
              transition-all duration-200 group-active:scale-90">
              <span className="text-xl transition-transform duration-200 
                group-hover:scale-110 group-active:scale-95">🏠</span>
            </div>
            <span className="text-[11px] font-medium mt-1 text-gray-600 dark:text-gray-300
              group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Home</span>
          </button>

          <button className="p-2 flex flex-col items-center justify-center min-w-[64px]
            group relative">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center
              bg-gray-100/50 dark:bg-gray-800/50
              transition-all duration-200 group-active:scale-90">
              <span className="text-xl transition-transform duration-200 
                group-hover:scale-110 group-active:scale-95">📊</span>
            </div>
            <span className="text-[11px] font-medium mt-1 text-gray-600 dark:text-gray-300
              group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Stats</span>
          </button>

          <button className="p-2 flex flex-col items-center justify-center min-w-[64px]
            group relative">
            {/* Improved Notification Badge */}
            <div className="absolute top-1 right-1 w-4.5 h-4.5 bg-rose-500 rounded-full 
              flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
              <span className="text-[9px] font-bold text-white">3</span>
            </div>
            
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center
              bg-gray-100/50 dark:bg-gray-800/50
              transition-all duration-200 group-active:scale-90">
              <span className="text-xl transition-transform duration-200 
                group-hover:scale-110 group-active:scale-95">📅</span>
            </div>
            <span className="text-[11px] font-medium mt-1 text-gray-600 dark:text-gray-300
              group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Weeks</span>
          </button>

          <button className="p-2 flex flex-col items-center justify-center min-w-[64px]
            group relative">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center
              bg-gray-100/50 dark:bg-gray-800/50
              transition-all duration-200 group-active:scale-90">
              <span className="text-xl transition-transform duration-200 
                group-hover:scale-110 group-active:scale-95">⚙️</span>
            </div>
            <span className="text-[11px] font-medium mt-1 text-gray-600 dark:text-gray-300
              group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav; 