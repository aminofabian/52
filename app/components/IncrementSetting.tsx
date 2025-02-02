import React from 'react';
import { Sparkles, Target, TrendingUp, Coins, Trophy, Calendar, ArrowUp, DollarSign, Minus, Plus } from 'lucide-react';

interface IncrementSettingProps {
  incrementAmount: number;
  yearlyGoal: number;
  onIncrementChange: (value: number) => void;
  onAutoFill: () => void;
  highestContribution?: number;
  currentWeek?: number;
  totalWeeks?: number;
  savedAmounts?: number[];
  baseAmount: number;
  onBaseAmountChange: (amount: number) => void;
}

const IncrementSetting: React.FC<IncrementSettingProps> = ({
  incrementAmount,
  yearlyGoal,
  onIncrementChange,
  onAutoFill,
  highestContribution = 0,
  currentWeek = 1,
  totalWeeks = 52,
  savedAmounts = [],
  baseAmount,
  onBaseAmountChange,
}) => {
  const averageContribution = savedAmounts.length > 0 
    ? savedAmounts.reduce((sum, amount) => sum + amount, 0) / savedAmounts.filter(amount => amount > 0).length 
    : 0;
  
  const highestPossibleContribution = totalWeeks * incrementAmount;
  const lowestContribution = incrementAmount;

  const handleIncrement = () => {
    onBaseAmountChange(baseAmount + 10);
  };

  const handleDecrement = () => {
    if (baseAmount > 10) {
      onBaseAmountChange(baseAmount - 10);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5 mb-10">
      <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] 
        shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)] p-8 border border-white/60
        transition-all duration-500 ease-out hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
        
        <div className="relative flex flex-col sm:flex-row items-stretch gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
                <Coins className="relative w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
                group-hover:text-gray-800 transition-colors">Weekly Increment</h3>
            </div>
            
            <div className="relative group/input">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg
                transition-colors duration-300 group-focus-within/input:text-rose-500">KES</span>
              <input
                type="number"
                min="100"
                step="100"
                value={incrementAmount}
                onChange={(e) => onIncrementChange(Number(e.target.value))}
                className="w-full pl-[4.25rem] pr-24 py-5 bg-white/80 border-2 border-gray-100 rounded-2xl 
                  text-2xl font-semibold text-gray-800 tracking-tight transition-all duration-300
                  focus:outline-none focus:ring-[3px] focus:ring-rose-100 focus:border-rose-500 focus:bg-white
                  placeholder:text-gray-300 group-hover/input:border-gray-200"
                placeholder="Enter amount"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] font-medium tracking-wide">
                per week
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 via-transparent to-rose-500/5 
                opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
            </div>
          </div>

          <button
            onClick={onAutoFill}
            className="relative bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-5 rounded-2xl 
              flex items-center gap-3 font-semibold text-[15px] tracking-wide whitespace-nowrap
              shadow-lg shadow-rose-500/25 overflow-hidden
              transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/20 
              active:scale-[0.98] hover:-translate-y-0.5 group/btn"
          >
            <span className="relative z-10">Auto-Fill</span>
            <Sparkles className="relative z-10 w-5 h-5 text-white/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
              translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
          </button>
        </div>
      </div>

      {incrementAmount > 0 && (
        <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] 
          overflow-hidden transition-all duration-500 transform hover:scale-[1.02] group h-full
          shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)] border border-white/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
          
          <div className="relative h-full flex items-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r 
              from-transparent via-rose-500/30 to-transparent rounded-full" />
            
            <div className="w-full text-center space-y-6 p-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl 
                bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
                group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
                <Target className="w-5 h-5 text-rose-600" />
                <h3 className="text-[15px] font-semibold text-gray-800 tracking-wide">Weekly Contributions</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-gray-800 tracking-tight">
                    KES {incrementAmount.toLocaleString()}
                  </span>
                  <div className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold tracking-wide">
                    base amount
                  </div>
                </div>

                <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-[13px] text-gray-500">Highest Made</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    KES {highestContribution.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">your record</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <ArrowUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-[13px] text-gray-500">Average</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    KES {Math.round(averageContribution).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per contribution</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-4 h-4 text-rose-500" />
                    <span className="text-[13px] text-gray-500">Highest Possible</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    KES {(totalWeeks * incrementAmount).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">week {totalWeeks}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <span className="text-[13px] text-gray-500">Lowest</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    KES {incrementAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">week 1</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-center gap-2 text-[15px] text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Current Week: {currentWeek} of {totalWeeks}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-800 tracking-tight">
                    KES {yearlyGoal.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[15px] text-gray-500">
                    <span>total yearly target</span>
                    <Target className="w-4 h-4 text-rose-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-gray-800 font-semibold mb-4">Base Amount (KES)</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
            disabled={baseAmount <= 10}
          >
            <Minus size={20} />
          </button>
          <span className="text-2xl font-bold text-gray-900 min-w-[80px] text-center">
            {baseAmount}
          </span>
          <button
            onClick={handleIncrement}
            className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This will affect the amount for each envelope
        </p>
      </div>
    </div>
  );
};

export default IncrementSetting; 