import React from 'react';
import { Calendar, CheckCircle2, Target, DollarSign, PartyPopper, Clock } from 'lucide-react';

interface WeeklyGridProps {
  weeks: number[];
  savedAmounts: number[];
  confirmedWeeks: boolean[];
  incrementAmount: number;
  characterPosition: number;
  onSave: (week: number, amount: number) => void;
  onConfirm: (week: number) => void;
}

const WeeklyGrid: React.FC<WeeklyGridProps> = ({
  weeks,
  savedAmounts,
  confirmedWeeks,
  incrementAmount,
  characterPosition,
  onSave,
  onConfirm,
}) => {
  const getWeekDateRange = (weekNumber: number) => {
    const startDate = new Date('2025-01-06');
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return {
      start: weekStart.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
      end: weekEnd.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
      startDate: weekStart,
      endDate: weekEnd
    };
  };

  const isCurrentDateInWeek = (weekNumber: number) => {
    const { startDate, endDate } = getWeekDateRange(weekNumber);
    const currentDate = new Date();
    return currentDate >= startDate && currentDate <= endDate;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10">
      {weeks.map((week) => {
        const dateRange = getWeekDateRange(week);
        const isCurrentWeek = week - 1 === characterPosition;
        const isConfirmed = confirmedWeeks[week - 1];
        const isActiveWeek = isCurrentDateInWeek(week);
        
        return (
          <div 
            key={week} 
            className={`group relative bg-white rounded-[32px] p-8
              ${isConfirmed 
                ? 'ring-2 ring-rose-100 bg-gradient-to-b from-rose-50/30 to-transparent' 
                : isCurrentWeek 
                  ? 'ring-2 ring-rose-500 bg-gradient-to-b from-rose-50/30 to-transparent'
                  : isActiveWeek
                    ? 'ring-2 ring-amber-400 bg-gradient-to-b from-amber-50/30 to-transparent'
                    : 'hover:ring-2 hover:ring-gray-100'}
              transition-all duration-300 ease-out hover:-translate-y-2
              ${isCurrentWeek 
                ? 'shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]' 
                : isActiveWeek
                  ? 'shadow-[0_20px_40px_-12px_rgba(244,171,62,0.15)]'
                  : 'hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.07)]'}`}
          >
            {/* Decorative elements */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
              ${isActiveWeek ? 'from-amber-100/30' : 'from-rose-100/20'} 
              to-transparent rounded-tr-[32px] pointer-events-none`} />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-bl-[32px] pointer-events-none" />
            
            <div className="space-y-8 relative">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h2 className="font-semibold text-[28px] text-gray-900 tracking-tight">
                      Week {week}
                    </h2>
                    {isConfirmed && (
                      <CheckCircle2 className="w-6 h-6 text-rose-500 mt-1" />
                    )}
                    {isActiveWeek && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/50 mt-1">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-amber-600 tracking-wide">Current Week</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-gray-500 tracking-wide">
                    <Calendar className="w-4 h-4" />
                    <span>{dateRange.start.replace(/^0/, '')} - {dateRange.end.replace(/^0/, '')}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide
                  ${isConfirmed 
                    ? 'bg-rose-100/50 text-rose-600' 
                    : isActiveWeek
                      ? 'bg-amber-100/50 text-amber-600'
                      : 'bg-gray-100/70 text-gray-600'}`}>
                  {isConfirmed ? 'Completed' : isActiveWeek ? 'Active' : 'Pending'}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-transparent border border-gray-100">
                <div className="flex items-center gap-2 text-[13px] text-gray-500 tracking-wide mb-2">
                  <Target className="w-4 h-4" />
                  <span>Target amount</span>
                </div>
                <div className="text-gray-900 font-semibold text-2xl tracking-tight">
                  KES {(week * incrementAmount).toLocaleString().replace(/^0+/, '')}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[13px] text-gray-500 tracking-wide mb-3">
                  <DollarSign className="w-4 h-4" />
                  <span>Enter amount</span>
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">KES</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={savedAmounts[week - 1] === 0 ? '' : savedAmounts[week - 1]}
                    onChange={(e) => onSave(week, Number(e.target.value))}
                    className={`w-full pl-14 pr-5 py-4 rounded-2xl text-lg font-medium
                      ${isConfirmed 
                        ? 'bg-gray-50/80 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-50/80 text-gray-900 focus:bg-white focus:ring-2 focus:ring-rose-100 hover:bg-gray-50'}
                      transition-all duration-200 outline-none border border-gray-100`}
                    placeholder="0.00"
                    disabled={isConfirmed}
                  />
                </div>
              </div>

              {!isConfirmed && savedAmounts[week - 1] > 0 && (
                <button
                  onClick={() => onConfirm(week)}
                  className="relative w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-2xl overflow-hidden
                    active:scale-[0.98] font-medium text-[15px] tracking-wide shadow-lg shadow-rose-500/25
                    transition-all duration-200 hover:shadow-xl hover:shadow-rose-500/20 group/btn"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send money
                    <PartyPopper className="w-4 h-4 opacity-80" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                    translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                </button>
              )}

              {isConfirmed && (
                <div className="flex items-center gap-2.5 text-[13px] text-gray-500 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  <span className="font-medium">Payment confirmed for Week {week}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyGrid; 