"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Target, Trophy, Calendar, ArrowUp, Coins, Shuffle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import IncrementSetting from '../components/IncrementSetting';
import CharacterProgress from '../components/CharacterProgress';

interface Envelope {
  id: string;
  amount: number;
  isSelected: boolean;
  weekNumber?: number;
}

export default function EnvelopeChallenge() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState<Envelope | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [statistics, setStatistics] = useState({
    totalSaved: 0,
    remainingEnvelopes: 52,
    highestPicked: 0,
    lowestPicked: 0,
    averagePerWeek: 0,
  });
  const [baseAmount, setBaseAmount] = useState<number>(100);

  // Initialize envelopes
  useEffect(() => {
    const initialEnvelopes = Array.from({ length: 52 }, (_, i) => ({
      id: String(i + 1),
      amount: (i + 1) * baseAmount,
      isSelected: false,
    }));
    setEnvelopes(initialEnvelopes);
  }, [baseAmount]);

  const pickRandomEnvelope = () => {
    setIsShuffling(true);
    
    // Simulate shuffling animation
    setTimeout(() => {
      const availableEnvelopes = envelopes.filter(env => !env.isSelected);
      if (availableEnvelopes.length === 0) return;

      const randomIndex = Math.floor(Math.random() * availableEnvelopes.length);
      const picked = availableEnvelopes[randomIndex];
      
      // Update statistics
      const newStats = {
        totalSaved: statistics.totalSaved + picked.amount,
        remainingEnvelopes: statistics.remainingEnvelopes - 1,
        highestPicked: Math.max(statistics.highestPicked, picked.amount),
        lowestPicked: statistics.lowestPicked === 0 ? picked.amount : Math.min(statistics.lowestPicked, picked.amount),
        averagePerWeek: (statistics.totalSaved + picked.amount) / (52 - statistics.remainingEnvelopes + 1),
      };
      
      setStatistics(newStats);
      setSelectedEnvelope(picked);
      
      // Update envelopes state
      setEnvelopes(envelopes.map(env => 
        env.id === picked.id ? { ...env, isSelected: true } : env
      ));
      
      setIsShuffling(false);
    }, 1500);
  };

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
              title="Remaining Envelopes"
              value={statistics.remainingEnvelopes.toString()}
              icon={<Mail className="w-6 h-6 text-rose-600" />}
            />
            <StatsCard
              title="Lowest Possible"
              value={`KES ${baseAmount.toLocaleString()}`}
              icon={<ArrowUp className="w-6 h-6 text-rose-600" />}
            />
            <StatsCard
              title="Highest Possible"
              value={`KES ${(baseAmount * 52).toLocaleString()}`}
              icon={<Trophy className="w-6 h-6 text-rose-600" />}
            />
          </div>

          {/* Base Amount Setting */}
          <div className="mb-8">
            <IncrementSetting
              baseAmount={baseAmount}
              onBaseAmountChange={setBaseAmount}
              incrementAmount={baseAmount}
              yearlyGoal={52 * baseAmount}
              onIncrementChange={setBaseAmount}
              onAutoFill={() => {}}
            />
          </div>

          {/* Progress Visualization */}
          <div className="mb-8">
            <CharacterProgress
              envelopes={envelopes}
              baseAmount={baseAmount}
            />
          </div>

          {/* Envelope Picker Section */}
          <div className="relative bg-gradient-to-br from-white via-white to-white/95 backdrop-blur-xl rounded-[2.5rem] 
            p-8 border border-white/60 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)]
            transition-all duration-500 mb-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,228,230,0.2),rgba(255,241,242,0.1),transparent_70%)]" />
            
            <div className="relative text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl 
                bg-gradient-to-br from-rose-500/10 via-rose-500/10 to-rose-600/10">
                <Mail className="w-5 h-5 text-rose-600" />
                <h3 className="text-[15px] font-semibold text-gray-800 tracking-wide">
                  Pick Your Envelope
                </h3>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={pickRandomEnvelope}
                  disabled={isShuffling || statistics.remainingEnvelopes === 0}
                  className="relative bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-5 rounded-2xl 
                    flex items-center gap-3 font-semibold text-[15px] tracking-wide
                    shadow-lg shadow-rose-500/25 overflow-hidden
                    transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/20 
                    active:scale-[0.98] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">Pick Random Envelope</span>
                  {isShuffling ? (
                    <Shuffle className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Selected Envelope Display */}
              <AnimatePresence mode="wait">
                {selectedEnvelope && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-auto"
                  >
                    <div className="space-y-4">
                      <Mail className="w-12 h-12 text-rose-500 mx-auto" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          You picked envelope #{selectedEnvelope.id}
                        </h4>
                        <p className="text-3xl font-bold text-rose-600 mt-2">
                          KES {selectedEnvelope.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Envelope Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {envelopes.map((envelope) => (
              <div
                key={envelope.id}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold
                  ${envelope.isSelected 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-white text-gray-800 shadow-md hover:shadow-lg transition-shadow'}`}
              >
                {envelope.amount.toLocaleString()}
              </div>
            ))}
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