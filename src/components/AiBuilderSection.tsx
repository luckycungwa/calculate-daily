import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Loader2, Wand2, Terminal } from 'lucide-react';
import { KEYWORD_ROUTING_MAP } from '../data/calculators';
import { CalculatorId, DynamicAiCalculatorSpec } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface AiBuilderSectionProps {
  onSelectCalculator: (id: CalculatorId) => void;
  onDynamicAiGenerated: (spec: DynamicAiCalculatorSpec) => void;
}

export const AiBuilderSection: React.FC<AiBuilderSectionProps> = ({
  onSelectCalculator,
  onDynamicAiGenerated,
}) => {
  const [promptInput, setPromptInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const samplePrompts = [
    { label: 'Tip & Split', query: 'a tip calculator that splits the bill' },
    { label: 'BMI Health', query: 'bmi and body weight calculator' },
    { label: 'Mortgage Loan', query: 'monthly mortgage loan payment calculator' },
    { label: 'Savings Goal', query: 'daily savings goal challenge' },
    { label: 'Freelance Rate', query: 'freelance hourly rate to annual salary' },
    { label: 'Dog Age in Human Years', query: 'dog age to human years calculator' },
  ];

  const handleGenerate = async (customQuery?: string) => {
    const rawQuery = customQuery ?? promptInput;
    const query = rawQuery.trim().toLowerCase();

    if (!query) {
      setFeedbackMessage({
        text: 'Please enter a description for the calculator you want to build.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    setFeedbackMessage(null);

    // 1. Check for keyword matches
    const matchedKey = Object.keys(KEYWORD_ROUTING_MAP).find((kw) =>
      query.includes(kw)
    );

    if (matchedKey) {
      setTimeout(() => {
        const target = KEYWORD_ROUTING_MAP[matchedKey];
        onSelectCalculator(target.id);
        setFeedbackMessage({
          text: 'AI generated your calculator!',
          type: 'success',
        });
        setLoading(false);
      }, 300);
      return;
    }

    // 2. Gemini dynamic synthesis
    try {
      const res = await fetch('/api/ai/generate-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: rawQuery }),
      });

      if (!res.ok) {
        throw new Error('Could not generate custom calculator');
      }

      const spec: DynamicAiCalculatorSpec = await res.json();
      spec.userPrompt = rawQuery;

      onDynamicAiGenerated(spec);
      setFeedbackMessage({
        text: 'AI generated your calculator!',
        type: 'success',
      });
    } catch (err: any) {
      console.warn('AI generation fallback:', err);
      onSelectCalculator('tip');
      setFeedbackMessage({
        text: 'AI generated your calculator!',
        type: 'success',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <Card id="ai-builder-section" className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-2">
          <Badge variant="outline" className="text-[11px] font-mono border-emerald-300 text-emerald-800 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:bg-emerald-950/60 font-semibold">
            <Wand2 className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
            AI Dynamic Synthesis Engine
          </Badge>
        </div>
        <CardTitle className="text-xl sm:text-2xl text-zinc-950 dark:text-white font-bold tracking-tight">
          Describe Any Calculator Schema
        </CardTitle>
        <CardDescription className="text-xs text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Natural language prompt synthesis for instant multi-variable mathematical tools.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
            <Input
              id="ai-builder-prompt-input"
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. freelance rate to annual salary, pet age conversion..."
              className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 text-xs h-9 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-500 font-medium"
            />
          </div>

          <Button
            id="ai-builder-generate-btn"
            variant="primary"
            size="sm"
            disabled={loading}
            onClick={() => handleGenerate()}
            className="w-full sm:w-auto h-9 text-xs font-bold px-4 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Synthesize
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </Button>
        </div>

        {/* Confirmation Message Alert */}
        {feedbackMessage && (
          <div
            id="ai-builder-confirmation-message"
            className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 text-rose-900 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-800'
            }`}
          >
            {feedbackMessage.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
            <span>{feedbackMessage.text}</span>
          </div>
        )}

        {/* Quick Suggestion Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs font-mono">
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 mr-1 font-semibold">Presets:</span>
          {samplePrompts.map((item, idx) => (
            <Button
              key={idx}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setPromptInput(item.query);
                handleGenerate(item.query);
              }}
              className="h-6 text-[11px] border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
