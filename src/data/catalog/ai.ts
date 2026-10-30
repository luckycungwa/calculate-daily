import { CalculatorMeta } from '../../types';

export const AI_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'ai-token-cost',
    slug: 'ai-token-cost-calculator',
    name: 'AI Token Cost Calculator',
    shortDesc: 'Estimate LLM API cost from token counts and your provider’s price per million tokens.',
    tagline: 'Price the prompt, not the guess.',
    category: 'tech',
    iconName: 'Coins',
    badge: 'AI & APIs',
    featured: true,
    keywords: [
      'ai token cost calculator',
      'llm cost calculator',
      'api cost calculator',
      'token cost calculator',
      'openai cost calculator',
      'ai api pricing calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'inputTokens', label: 'Input tokens per request', type: 'number', defaultValue: 2000, min: 0, step: 100 },
        { id: 'outputTokens', label: 'Output tokens per request', type: 'number', defaultValue: 500, min: 0, step: 100 },
        {
          id: 'inputPricePerMillion',
          label: 'Input price per 1M tokens',
          type: 'number',
          defaultValue: 3,
          min: 0,
          step: 0.1,
        },
        {
          id: 'outputPricePerMillion',
          label: 'Output price per 1M tokens',
          type: 'number',
          defaultValue: 15,
          min: 0,
          step: 0.1,
        },
        { id: 'requestsPerMonth', label: 'Requests per month', type: 'number', defaultValue: 10000, min: 0, step: 1000 },
      ],
      results: [
        {
          label: 'Cost per 1,000 requests (USD)',
          formulaCode:
            '((inputTokens / 1000000) * inputPricePerMillion + (outputTokens / 1000000) * outputPricePerMillion) * 1000',
          accent: true,
        },
        {
          label: 'Cost per request (cents)',
          formulaCode:
            '((inputTokens / 1000000) * inputPricePerMillion + (outputTokens / 1000000) * outputPricePerMillion) * 100',
          suffix: '¢',
        },
        {
          label: 'Input cost per request (cents)',
          formulaCode: '((inputTokens / 1000000) * inputPricePerMillion) * 100',
          suffix: '¢',
        },
        {
          label: 'Output cost per request (cents)',
          formulaCode: '((outputTokens / 1000000) * outputPricePerMillion) * 100',
          suffix: '¢',
        },
        {
          label: 'Monthly cost (USD)',
          formulaCode:
            '((inputTokens / 1000000) * inputPricePerMillion + (outputTokens / 1000000) * outputPricePerMillion) * requestsPerMonth',
        },
        {
          label: 'Monthly tokens',
          formulaCode: '(inputTokens + outputTokens) * requestsPerMonth',
          suffix: 'tokens',
        },
      ],
      formulaDescription: 'Cost = input tokens ÷ 1M × input price + output tokens ÷ 1M × output price',
      tips: [
        'Prices change. Enter the current per-million-token rates from your provider rather than relying on a number baked into a calculator.',
        'Output tokens usually cost several times more than input tokens, so a long answer can dominate the bill even when the prompt is short.',
        'Count tokens with the provider’s own tokenizer or token-counting endpoint; a rough character-to-token ratio is not accurate enough for budgeting.',
      ],
    },
    content: {
      intro:
        'The AI Token Cost Calculator estimates what an LLM API call costs from its input and output token counts and the price you pay per million tokens. It is deliberately pricing-agnostic: you enter the current rates, so the result stays correct when a provider changes its price list.',
      howItWorks:
        'Providers price input and output tokens separately, usually per million tokens. Input cost is input tokens divided by one million, multiplied by the input price. Output cost is the same calculation with the output figures. Adding them gives the cost per request, and multiplying by monthly requests gives the running cost.',
      example:
        'A request with 2,000 input tokens and 500 output tokens, at $3 per million input and $15 per million output, costs $0.006 for input and $0.0075 for output. That is $0.0135 per request — 1.35 cents — or $13.50 per 1,000 requests and $135 a month at 10,000 requests, with an effective blended rate of $5.40 per million tokens.',
      formulas: [
        { label: 'Input cost', expression: 'input tokens ÷ 1,000,000 × input price' },
        { label: 'Output cost', expression: 'output tokens ÷ 1,000,000 × output price' },
        { label: 'Cost per request', expression: 'input cost + output cost' },
        { label: 'Monthly cost', expression: 'cost per request × requests per month' },
      ],
      sources: [
        {
          label: 'OpenAI — Tokenizer and token counting',
          expression: 'How text is split into tokens',
          note: 'Explains why token counts differ from word counts and why the provider’s tokenizer is the accurate measure.',
        },
        {
          label: 'Anthropic — Token counting',
          expression: 'Input and output token accounting',
          note: 'Documents that input and output tokens are counted and priced separately.',
        },
        {
          label: 'Google Cloud — Gemini API pricing',
          expression: 'Per-million-token pricing structure',
          note: 'An example of the per-million-token convention used by this calculator.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Cost per request (cents)',
          explanation:
            'The marginal API cost of one request, in cents, at the token counts and prices you entered. It excludes retries, caching discounts, and any minimum charges.',
        },
        {
          resultLabel: 'Monthly cost (USD)',
          explanation:
            'The cost per request multiplied by your monthly volume. Use it as a budget baseline, then add headroom for retries, development traffic, and price changes.',
        },
      ],
      workflowLinks: [
        { slug: 'binary-to-decimal-calculator', step: 'Work with the byte-level units behind a tokenizer.' },
        { slug: 'download-time-calculator', step: 'Estimate how long a large batch of requests takes to transfer.' },
        { slug: 'password-entropy-calculator', step: 'Compare the information content of a token string with a secret.' },
      ],
      faqs: [
        {
          q: 'What is a token?',
          a: 'A token is a chunk of text — often a word, part of a word, or punctuation — that a language model processes as one unit. A rough English rule is about four characters per token, but the exact split depends on the provider’s tokenizer.',
        },
        {
          q: 'Why are input and output prices different?',
          a: 'Output generation is more computationally expensive than reading a prompt, so providers usually charge several times more per output token. Some also charge differently for cached input, batch requests, or long contexts.',
        },
        {
          q: 'Why does the calculator ask me to enter the price?',
          a: 'Because model prices change frequently and vary by provider, region, and tier. Hard-coding a rate would make the tool wrong the moment a price list changed. Enter the current published rate and the result stays accurate.',
        },
        {
          q: 'Does this include retries and failed requests?',
          a: 'No. It prices successful calls at the token counts you enter. Failed requests may still consume tokens, and retries double the cost, so add a margin if your application retries aggressively or streams partial output.',
        },
      ],
      related: ['binary-to-decimal-calculator', 'download-time-calculator', 'password-entropy-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
];
