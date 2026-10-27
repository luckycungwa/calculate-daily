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
      'Turn any savings target into a daily, weekly, and monthly deposit plan. See exactly how much to save each day to reach your goal without stress.',
    canonicalPath: '/savings-goal',
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Daily Savings Goal Challenge
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Saving R10,000 feels impossible when you think about it as one lump sum. But saving R27.40 a day?
          That's a coffee and a snack. This calculator breaks any financial target into a daily, weekly, and
          monthly pace so you can actually see yourself getting there.
        </p>
      </div>

      {/* The Calculator */}
      <DailySavingsChallenge onSaveHistory={onSaveHistory} />

      {/* Educational Content */}
      <div className="max-w-2xl space-y-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">How the Daily Savings Method Works</h2>
          <p>
            The idea is simple: instead of telling yourself to save a large amount every month, you divide
            that target by 30 or 31 days. The resulting daily number feels small and achievable, which makes
            it far more likely you will actually stick with it.
          </p>
          <p>
            Research on habit formation shows that small, repeatable actions compound over time. A daily
            savings habit works the same way. When the amount is small enough that you barely notice it leaving
            your account, consistency becomes automatic rather than a willpower exercise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Why People Fail at Saving</h2>
          <p>
            Most savings plans fail because they set an ambitious monthly target without breaking it down.
            When you see R5,000 due at the end of the month, it feels overwhelming from day one. By contrast,
            R166.67 a day is just a small transfer you can automate.
          </p>
          <p>
            The daily approach also gives you faster feedback. Instead of checking your progress once a month,
            you see your balance grow every single day. That visible momentum is one of the strongest
            motivators for continuing any financial habit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tips to Stay on Track</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-1">
            <li><strong>Automate it.</strong> Set up a daily transfer to a separate savings account so you never have to decide.</li>
            <li><strong>Round up.</strong> If your target is R166.67, save R170. The extra R3.33 adds up to over R100 a year.</li>
            <li><strong>Track visually.</strong> Use a savings tracker app or even a wall chart. Seeing progress matters.</li>
            <li><strong>Start with one week.</strong> Commit to just seven days first. Once the habit forms, the rest follows.</li>
            <li><strong>Celebrate milestones.</strong> Hit 25% of your goal? Treat yourself to something small. Positive reinforcement works.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Setting Realistic Goals</h2>
          <p>
            The best savings goal is one you can actually reach. Start with a timeframe that feels comfortable,
            whether that is 30 days, 90 days, or a full year. You can always increase the pace later once the
            habit is established.
          </p>
          <p>
            If your target feels too far away, try splitting it into phases. Save for the first 25%, then
            reassess. Partial progress is infinitely better than no progress, and each phase builds confidence
            for the next one.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">How much should I save per day?</p>
              <p>It depends on your goal and timeline. A R10,000 goal in 6 months means about R55 per day.
                In 12 months, it drops to roughly R27 per day. Use the calculator above to find your exact number.</p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">Should I save daily or monthly?</p>
              <p>Daily saving builds the habit faster because you see progress every day. However, monthly
                transfers work just as well if daily feels like too many transactions. The key is consistency,
                not frequency.</p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">What if I miss a day?</p>
              <p>Don't stress. One missed day does not ruin the plan. Just transfer double the next day or add
                the missed amount at the end of the week. The goal is progress, not perfection.</p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">Where should I keep my savings?</p>
              <p>Put it somewhere separate from your spending account. A high-interest savings account or a
                money market fund works well. The physical separation reduces temptation to spend it.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
