import React from 'react';
import { usePageMeta } from '../lib/seo';
import { DailySavingsChallenge } from '../components/DailySavingsChallenge';

interface SavingsGoalPageProps {
  onSaveHistory?: (summary: string) => void;
}

export const SavingsGoalPage: React.FC<SavingsGoalPageProps> = ({ onSaveHistory }) => {
  usePageMeta({
    title: 'Daily Savings Goal Challenge',
    description:
      'Break a large savings target into a realistic daily, weekly, and monthly deposit pace and see a habit-sized number you can actually sustain.',
    canonicalPath: '/savings-goal',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Daily Savings Goal Challenge
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
          Convert any financial target into a daily allocation pace you can actually sustain.
        </p>
      </div>
      <DailySavingsChallenge onSaveHistory={onSaveHistory} />
    </div>
  );
};