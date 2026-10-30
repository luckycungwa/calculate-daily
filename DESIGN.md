# Design System: Calculate Daily

> **Superseded — read `docs/totalcalculation-rebrand.md` first.** This document
> describes the pre-rebrand "Cockpit Dense" system (emerald as the functional
> primary, Plus Jakarta Sans). The live Total Calculation system uses indigo
> `--primary`/`--primary-tint` for interactive elements and reserves emerald
> `--brand` for the wordmark and positive states; General Sans + DM Sans +
> JetBrains Mono. The structure, density and tabular-numeric rules below still
> apply. Update this file only to keep it from misleading implementers.

## 1. Visual Theme & Atmosphere
Calculate Daily adopts a disciplined, high-density utility aesthetic ("Cockpit Dense", Density 7, Variance 4, Motion 4). The visual atmosphere is stripped of gratuitous decoration, neon glowing shadows, and AI gradient fills. Every screen is engineered around instantaneous mathematical feedback, monospace tabular precision, high-contrast typography, and tactile structural borders.

## 2. Color Palette & Roles
- **Canvas Neutral** (`#FAFAFA` / Dark: `#09090B`) - Primary application background
- **Pure Surface** (`#FFFFFF` / Dark: `#18181B`) - Card and calculator container fill
- **Deep Charcoal Ink** (`#09090B` / Dark: `#FAFAFA`) - Primary high-contrast text
- **Muted Steel** (`#71717A` / Dark: `#A1A1AA`) - Secondary metrics, units, and descriptive labels
- **Structural Border** (`#E4E4E7` / Dark: `#27272A`) - 1px crisp layout boundaries and dividers
- **Emerald Accent** (`#059669` / Dark: `#10B981`) - Functional primary action, positive delta, active state
- **Destructive Rose** (`#E11D48` / Dark: `#F43F5E`) - Negative delta and reset actions

## 3. Typography Rules
- **Display & UI:** Plus Jakarta Sans / Geist - Tight tracking (`tracking-tight`), crisp weight hierarchy (500, 600, 700)
- **Body:** Plus Jakarta Sans - Relaxed leading (1.5), maximum 65ch per column
- **Monospace / Numerical:** JetBrains Mono / ui-monospace - High-density tabular figures (`font-mono tabular-nums`) for all live calculations, inputs, rates, and amortization schedules
- **Banned:** Inter, generic serifs, gradient text, all-caps body text, emojis

## 4. Component Stylings
- **Buttons:** Tactile flat button with 1px border (`border-border`), clear active state, zero outer glow or neon gradients.
- **Cards:** Clean 12px rounded cards with 1px solid border (`border-border`), subtle flat elevation (`shadow-xs`), no nested cards.
- **Inputs & Sliders:** Dedicated labels above input, monospace value preview, accent focus ring (`ring-1 ring-primary`), no floating placeholder gimmicks.
- **Tabs & Segmented Controls:** Flat pill toggles with high contrast active state.
- **Badges:** Muted background with crisp border and clean text label; zero emojis.
- **Loaders:** Structural skeleton pulse matching exact geometry.
- **Empty & Error States:** Monospace code blocks and clean inline alerts.

## 5. Layout Principles
- Mathematical padding scale (16px, 24px, 32px); inner padding never exceeds outer container padding.
- Grid-first responsive layout with max-width containment (`max-w-7xl`).
- High-density information panels replacing fluffy cards with clear `border-b` / `border-t` dividers.
- Single-column collapse on mobile (< 768px) with 44px minimum interactive touch targets.

## 6. Motion & Interaction
- Restrained CSS transitions (`transition-all duration-150 ease-out`).
- Transform and opacity animations only; no distracting bounce loops or continuous floating objects.
- Immediate client-side calculation reactivity (< 16ms evaluation).

## 7. Anti-Patterns (Strictly Banned)
- No emojis anywhere in the interface
- No purple/blue neon gradients or glowing drop-shadows
- No gradient text (`bg-clip-text text-transparent`)
- No pure black (`#000000`)
- No multi-colored decorative borders
- No custom cursor gimmicks
- No AI buzzwords or filler marketing copy
- No 3-column identical decorative card grids
- No fake telemetry or invented metrics
