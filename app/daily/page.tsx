"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Coins, Target, Trophy, ArrowUp, Check } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import IncrementSetting from '../components/IncrementSetting';

interface DayContribution {
  day: number;
  amount: number;
  isCompleted: boolean;
}

export default function DailySavings() {
  const [baseAmount, setBaseAmount] = useState<number>(10);
  const [contributions, setContributions] = useState<DayContribution[]>([]);
  const [statistics, setStatistics] = useState({
    totalSaved: 0,
    daysCompleted: 0,
    currentDay: new Date().getDate(),
  });

  // Initialize days
  useEffect(() => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const initialDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      amount: (i + 1) * baseAmount,
      isCompleted: false,
    }));
    setContributions(initialDays);
  }, [baseAmount]);

  const handleDayComplete = (day: number) => {
    const updatedContributions = contributions.map(contrib =>
      contrib.day === day ? { ...contrib, isCompleted: true } : contrib
    );
    
    setContributions(updatedContributions);
    
    const completed = updatedContributions.filter(c => c.isCompleted);
    setStatistics({
      ...statistics,
      totalSaved: completed.reduce((sum, c) => sum + c.amount, 0),
      daysCompleted: completed.length,
    });
  };

  const daysInMonth = contributions.length;
  const monthlyTarget = contributions.reduce((sum, day) => sum + day.amount, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917]">
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 to-black/5 mix-blend-overlay"></div>
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatsCard
              title="Total Saved"
              value={`KES ${statistics.totalSaved.toLocaleString()}`}
              icon={<Coins className="w-6 h-6 text-rose-600" />}
            />
            <StatsCard
              title="Days Completed"
              value={`${statistics.daysCompleted} / ${daysInMonth}`}
              icon={<Calendar className="w-6 h-6 text-rose-600" />}
            />
            <StatsCard
              title="Today's Target"
              value={`KES ${(statistics.currentDay * baseAmount).toLocaleString()}`}
              icon={<Target className="w-6 h-6 text-rose-600" />}
            />
            <StatsCard
              title="Monthly Target"
              value={`KES ${monthlyTarget.toLocaleString()}`}
              icon={<Trophy className="w-6 h-6 text-rose-600" />}
            />
          </div>

          {/* Base Amount Setting */}
          <div className="mb-8">
            <IncrementSetting
              baseAmount={baseAmount}
              onBaseAmountChange={setBaseAmount}
              incrementAmount={baseAmount}
              yearlyGoal={monthlyTarget}
              onIncrementChange={setBaseAmount}
              onAutoFill={() => {}}
            />
          </div>

          {/* Daily Grid */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
            <h3 className="text-gray-800 font-semibold mb-6">Daily Contributions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {contributions.map((day) => (
                <motion.button
                  key={day.day}
                  onClick={() => handleDayComplete(day.day)}
                  disabled={day.isCompleted || day.day > statistics.currentDay}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300
                    ${day.isCompleted 
                      ? 'bg-rose-50 border-rose-200' 
                      : day.day === statistics.currentDay
                        ? 'bg-white border-rose-500 shadow-lg shadow-rose-500/10'
                        : day.day > statistics.currentDay
                          ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                          : 'bg-white border-gray-100 hover:border-rose-200 hover:shadow-lg'
                    }`}
                >
                  <div className="text-sm font-medium text-gray-400">Day</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{day.day}</div>
                  <div className="text-sm font-semibold text-rose-600">
                    KES {day.amount.toLocaleString()}
                  </div>
                  {day.isCompleted && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4 text-rose-500" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 
    border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
    transition-all duration-500 group overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
    
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10 
          group-hover:from-rose-500/20 group-hover:via-rose-500/20 group-hover:to-rose-600/20 transition-colors duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 opacity-50" />
          {icon}
        </div>
        <h3 className="text-gray-600 text-[15px] font-medium tracking-wide
          group-hover:text-gray-800 transition-colors">{title}</h3>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  </div>
); 