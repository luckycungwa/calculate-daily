import React from 'react';
import { usePageMeta } from '../lib/seo';
import { AboutSection } from '../components/AboutSection';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About & Methodology',
    description:
      'About Total Calculation: browser-based calculators for finance, health, construction, and everyday math. Learn how our tools and checks work.',
    canonicalPath: '/about',
  });

  return <AboutSection />;
};