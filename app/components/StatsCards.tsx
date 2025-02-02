import React from 'react';
import { Wallet, Target, Calendar, BarChart3, Sparkles } from 'lucide-react';

interface StatsCardsProps {
  totalSaved: number;
  yearlyGoal: number;
  confirmedWeeks: boolean[];
  percentageComplete: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalSaved,
  yearlyGoal,
  confirmedWeeks,
  percentageComplete,
}) => {
  return (
    <div className="overflow-x-visible pb-4 mb-8 px-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="col-span-1 group">
          <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 
            border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
            transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]
            hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                  group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
                  <Wallet className="relative w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
                  group-hover:text-gray-800 transition-colors">Total Saved</h3>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <p className="text-3xl md:text-[2.75rem] font-bold text-gray-900 tracking-tight transition-transform duration-500 
                    group-hover:scale-[1.02] origin-left flex items-center gap-2">
                    KES {totalSaved.toLocaleString()}
                    <Sparkles className="w-5 h-5 text-rose-500/70" />
                  </p>
                  <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-2xl" />
                </div>
                <p className="text-sm text-gray-500 tracking-wide">saved so far</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 group">
          <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 
            border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
            transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]
            hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                  group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
                  <Target className="relative w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
                  group-hover:text-gray-800 transition-colors">Yearly Goal</h3>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <p className="text-3xl md:text-[2.75rem] font-bold text-gray-900 tracking-tight transition-transform duration-500 
                    group-hover:scale-[1.02] origin-left">
                    KES {yearlyGoal.toLocaleString()}
                  </p>
                  <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-2xl" />
                </div>
                <p className="text-sm text-gray-500 tracking-wide">target for 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 group">
          <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 
            border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
            transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]
            hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                  group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
                  <Calendar className="relative w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
                  group-hover:text-gray-800 transition-colors">Weeks Complete</h3>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="flex items-baseline gap-2 transition-transform duration-500 
                    group-hover:scale-[1.02] origin-left">
                    <p className="text-3xl md:text-[2.75rem] font-bold text-gray-900 tracking-tight">
                      {confirmedWeeks.filter(confirmed => confirmed).length}
                    </p>
                    <p className="text-xl md:text-2xl text-gray-400 font-semibold tracking-tight">/ 52</p>
                  </div>
                  <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-2xl" />
                </div>
                <p className="text-sm text-gray-500 tracking-wide">weeks confirmed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 group">
          <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 
            border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
            transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]
            hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                  group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
                  <BarChart3 className="relative w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
                  group-hover:text-gray-800 transition-colors">Overall Progress</h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="relative">
                    <p className="text-3xl md:text-[2.75rem] font-bold text-gray-900 tracking-tight transition-transform duration-500 
                      group-hover:scale-[1.02] origin-left">
                      {percentageComplete.toFixed(1)}%
                    </p>
                    <div className="absolute -inset-x-2 -inset-y-3 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-2xl" />
                  </div>
                  <p className="text-sm text-gray-500 tracking-wide">completion rate</p>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-rose-500 via-rose-500 to-rose-600 h-full rounded-full 
                        transition-all duration-1000 ease-out relative group-hover:from-rose-600 group-hover:to-rose-500"
                      style={{ width: `${percentageComplete}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 
                        animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/5 via-transparent to-rose-500/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards; 