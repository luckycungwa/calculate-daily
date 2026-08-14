import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Calculator Generation Endpoint
  app.post('/api/ai/generate-calculator', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      if (!ai) {
        // Fallback rule-based calculator schema if API key isn't provided
        res.json({
          title: 'Smart Calculator',
          description: `Custom calculation for: "${prompt}"`,
          icon: 'Calculator',
          fields: [
            { id: 'val1', label: 'Primary Value', type: 'number', defaultValue: 100, unit: 'units' },
            { id: 'val2', label: 'Rate or Factor', type: 'number', defaultValue: 10, unit: '%' },
          ],
          formulaDescription: 'Result = Primary Value × (Rate / 100)',
          formulaCode: 'val1 * (val2 / 100)',
          resultLabel: 'Calculated Output',
          resultPrefix: '$',
          resultSuffix: '',
          tips: ['Adjust the inputs above to recalculate automatically.'],
        });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Create a functional mathematical calculator specification for the user's request: "${prompt}".
Provide numeric input fields, default values, the formula description, a safe JavaScript expression (using variable IDs that match the field IDs) that returns a single numeric result, and helpful tip text.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Short catchy calculator title' },
              description: { type: Type.STRING, description: '1-sentence explanation of what this computes' },
              icon: { type: Type.STRING, description: 'Lucide icon name (e.g. Calculator, DollarSign, Activity, Percent, Flame, Clock, Sparkles)' },
              fields: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: 'Valid JS identifier like price, hours, rate' },
                    label: { type: Type.STRING, description: 'User-friendly input label' },
                    type: { type: Type.STRING, description: 'number' },
                    defaultValue: { type: Type.NUMBER },
                    min: { type: Type.NUMBER },
                    max: { type: Type.NUMBER },
                    step: { type: Type.NUMBER },
                    unit: { type: Type.STRING, description: 'Unit like $, %, kg, hours, days, etc.' },
                  },
                  required: ['id', 'label', 'type', 'defaultValue'],
                },
              },
              formulaDescription: { type: Type.STRING, description: 'Human readable mathematical formula' },
              formulaCode: { type: Type.STRING, description: 'Safe JavaScript arithmetic formula using field IDs, e.g. "price * (1 - discount / 100)" or "(weight / ((height/100)*(height/100)))"' },
              resultLabel: { type: Type.STRING, description: 'Label for the result' },
              resultPrefix: { type: Type.STRING, description: 'e.g. $, or empty' },
              resultSuffix: { type: Type.STRING, description: 'e.g. kcal, units, %, or empty' },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2 brief helpful calculation tips or insight bullets',
              },
            },
            required: ['title', 'description', 'fields', 'formulaDescription', 'formulaCode', 'resultLabel'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini calculation generation error:', err);
      res.status(500).json({
        error: 'Failed to generate custom calculator',
        details: err?.message || 'Unknown error',
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Calculate Daily server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
