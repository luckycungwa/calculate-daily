import React from 'react';
import { usePageMeta } from '../lib/seo';
import { AboutSection } from '../components/AboutSection';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About & Methodology',
    description:
      'About CalculateDaily: fast, private, browser-native calculators for finance, health, construction, and everyday math. Learn how our tools work.',
    canonicalPath: '/about',
  });

  return <AboutSection />;
};