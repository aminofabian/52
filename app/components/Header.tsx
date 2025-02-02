import React from 'react';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl 
      shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] border-b border-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white w-10 h-10 
              rounded-xl flex items-center justify-center shadow-lg shadow-rose-200/50 
              ring-4 ring-white">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 
                bg-clip-text text-transparent">
                52 Week Challenge
              </h1>
              <p className="text-sm text-gray-500 font-medium">Track your savings journey</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative group">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full 
                flex items-center justify-center ring-2 ring-white">
                <span className="text-[10px] font-semibold text-white">3</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 hover:bg-white border border-gray-100
                transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 
                hover:border-rose-100 group-active:scale-95">
                <span className="text-xl">📊</span>
              </div>
            </button>

            <button className="p-2.5 rounded-xl bg-white/80 hover:bg-white border border-gray-100
              transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 
              hover:border-rose-100 active:scale-95">
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 