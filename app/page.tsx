"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import IncrementSetting from './components/IncrementSetting';
import CharacterProgress from './components/CharacterProgress';
import WeeklyGrid from './components/WeeklyGrid';
import BottomNav from './components/BottomNav';

export default function SavingsChallenge() {
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);
  const [savedAmounts, setSavedAmounts] = React.useState<number[]>(Array(52).fill(0));
  const [incrementAmount, setIncrementAmount] = useState<number>(100);
  const [confirmedWeeks, setConfirmedWeeks] = useState<boolean[]>(Array(52).fill(false));
  const [showCharacter, setShowCharacter] = useState(false);
  const [characterPosition, setCharacterPosition] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  // Calculate highest contribution
  const highestContribution = Math.max(...savedAmounts);

  // Calculate current week
  const getCurrentWeek = () => {
    const startDate = new Date('2025-01-06');
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, Math.min(52, diffWeeks));
  };

  // Calculate date ranges for 2025
  const getWeekDateRange = (weekNumber: number) => {
    const startDate = new Date('2025-01-06'); // First Monday of 2025
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return {
      start: weekStart.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
      end: weekEnd.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
    };
  };

  const handleSave = (week: number, amount: number) => {
    const newAmounts = [...savedAmounts];
    newAmounts[week - 1] = amount;
    setSavedAmounts(newAmounts);
  };

  const handleConfirm = (week: number) => {
    const newConfirmed = [...confirmedWeeks];
    newConfirmed[week - 1] = true;
    setConfirmedWeeks(newConfirmed);
  };

  const populateIncrementalAmounts = () => {
    const newAmounts = weeks.map((week) => week * incrementAmount);
    setSavedAmounts(newAmounts);
  };

  const totalSaved = savedAmounts.reduce((sum, amount, index) => 
    sum + (confirmedWeeks[index] ? amount : 0), 0);
  const percentageComplete = (confirmedWeeks.filter(confirmed => confirmed).length / 52) * 100;
  const yearlyGoal = weeks.reduce((sum, week) => sum + (week * incrementAmount), 0);

  const getEncouragingMessage = () => {
    if (percentageComplete === 0) return "Ready to start your savings journey? Let's go! 🚀";
    if (percentageComplete < 25) return "Great start! Keep the momentum going! 💪";
    if (percentageComplete < 50) return "You're making excellent progress! Stay consistent! 🌟";
    if (percentageComplete < 75) return "Look how far you've come! You're crushing it! 🏆";
    if (percentageComplete < 100) return "The finish line is in sight! You're amazing! 🎯";
    return "Congratulations! You've completed the challenge! 🎉";
  };

  useEffect(() => {
    if (confirmedWeeks.some(confirmed => confirmed)) {
      setShowCharacter(true);
      const lastConfirmedIndex = confirmedWeeks.lastIndexOf(true);
      setCharacterPosition(lastConfirmedIndex);
      setIsWalking(true);
      
      // Reset walking animation after movement
      setTimeout(() => setIsWalking(false), 1000);
    }
  }, [confirmedWeeks]);

  const getCharacterMessage = () => {
    if (!showCharacter) return "";
    const currentAmount = savedAmounts[characterPosition];
    const weekNumber = characterPosition + 1;
    return `Week ${weekNumber}: You've saved KES ${currentAmount.toLocaleString()} here! 🎯`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="fixed inset-0 opacity-100" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughpaper'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02' numOctaves='5' seed='2' stitchTiles='stitch' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='2' result='diffLight'%3E%3CfeDistantLight azimuth='45' elevation='35'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughpaper)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '500px 500px',
        filter: 'contrast(120%) brightness(110%)',
      }}></div>
      <div className="fixed inset-0 mix-blend-overlay opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='rough'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' stitchTiles='stitch'/%3E%3CfeDiffuseLighting surfaceScale='3' lighting-color='white'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23rough)'/%3E%3C/svg%3E")`,
        backgroundSize: '1000px 1000px',
      }}></div>
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 to-black/5 mix-blend-overlay"></div>
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 pb-20">
          <StatsCards
            totalSaved={totalSaved}
            yearlyGoal={yearlyGoal}
            confirmedWeeks={confirmedWeeks}
            percentageComplete={percentageComplete}
          />

          <IncrementSetting
            incrementAmount={incrementAmount}
            yearlyGoal={yearlyGoal}
            onIncrementChange={setIncrementAmount}
            onAutoFill={populateIncrementalAmounts}
            highestContribution={highestContribution}
            currentWeek={getCurrentWeek()}
            totalWeeks={52}
            savedAmounts={savedAmounts}
            baseAmount={incrementAmount}
            onBaseAmountChange={setIncrementAmount}
          />

          <CharacterProgress
            envelopes={Array.from({ length: 52 }, (_, i: number) => ({
              id: String(i + 1),
              amount: savedAmounts[i],
              isSelected: confirmedWeeks[i]
            }))}
            baseAmount={incrementAmount}
          />

          <WeeklyGrid
            weeks={weeks}
            savedAmounts={savedAmounts}
            confirmedWeeks={confirmedWeeks}
            incrementAmount={incrementAmount}
            characterPosition={characterPosition}
            onSave={handleSave}
            onConfirm={handleConfirm}
          />
        </div>
         <div className="mt-10">
         <BottomNav />
         </div>
      </div>
    </div>
  );
}
