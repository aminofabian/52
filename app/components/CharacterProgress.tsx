import React from 'react';
import { motion } from 'framer-motion';

interface CharacterProgressProps {
  envelopes: Array<{
    id: string;
    amount: number;
    isSelected: boolean;
  }>;
  baseAmount: number;
}

export default function CharacterProgress({ envelopes, baseAmount }: CharacterProgressProps) {
  const maxAmount = envelopes.length * baseAmount;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg">
      <h3 className="text-gray-800 font-semibold mb-6">Weekly Progress</h3>
      <div className="flex items-end gap-1 h-[200px] overflow-x-auto pb-4">
        {envelopes.map((envelope, index) => {
          const height = ((index + 1) * baseAmount / maxAmount) * 100;
          return (
            <motion.div
              key={envelope.id}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              className={`relative w-2 min-w-[8px] rounded-t-full ${
                envelope.isSelected 
                  ? 'bg-rose-200' 
                  : 'bg-rose-500'
              }`}
            >
              {(index + 1) % 4 === 0 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                  Week {index + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 