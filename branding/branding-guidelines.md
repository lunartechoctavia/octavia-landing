# Octavia (Memento) Landing Page Branding & Styling Guidelines

This document serves as the extracted source of truth for the styling, branding, and structural UI patterns found inside the `octavia-landing` HTML templates. It should be referenced when building new components or converting the static HTML to React/Next.js.

## 1. Global Themes & Configuration

The design system relies on a heavily modified Tailwind CSS configuration, centered around a premium, dark-mode-first aesthetic with glassmorphism and neon accents.

### Core Colors

- **Background (Deep Space):** `#050505` (Main surface color for `body`)
- **Neutral 900:** `#111111` (Used for slightly elevated surfaces / search bars)
- **Neutral 850:** `#1A1A1A`
- **Card Backgrounds:** `bg-[#0A0A0A]` or `bg-neutral-900/30`
- **Primary Accent (Purple):**
  - 400: `#A78BFA`
  - 500: `#8B5CF6` (Main brand color for glows and primary buttons)
  - 600: `#7C3AED`
  - 900: `#2E1065`
- **Secondary Accents (Used for icons and categorizations):**
  - Cyan, Blue, Green, Pink, Orange (Usually utilized at `500/10` for backgrounds and `400` for text/icons).

### Typography

- **Display & Headings:** `Geist` (Provides the sharp, modern, technical feel)
- **Body & UI Text:** `Inter` or `Geist`
- **Technical / System Badges:** `Geist Mono` (Used for system statuses, "Fast" badges, etc.)
- _Note:_ The templates also preload a massive suite of fonts (Roboto, Montserrat, Poppins, Playfair, Instrument Serif, Bricolage, etc.) suggesting support for user-customizable text within the app itself, but `Geist`/`Inter` are the core UI fonts.
- **Sizing Patterns:** Heavy use of micro-typography.
  - `text-[10px]`: Extreme micro-copy, status indicator text, tags.
  - `text-[11px]`: Secondary descriptions in dropdowns.
  - `text-xs`: Standard UI buttons, input text, and tertiary nav.

---

## 2. Visual Effects & Layers

### Shadows & Glows

The \"premium\" feel is largely driven by custom, colored drop shadows rather than standard black shadows.

- **Large Glow (`boxShadow.glow`):** `0 0 60px -15px rgba(139, 92, 246, 0.15)`
- **Small Glow (`boxShadow.glow-sm`):** `0 0 20px -5px rgba(139, 92, 246, 0.3)`
- **Interactive Button Glows:**
  - Base: `shadow-[0_0_20px_-10px_rgba(168,85,247,0.3)]`
  - Hover: `shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)]`

### Glassmorphism (The `.glass` effect)

- **Background:** `rgba(5, 5, 5, 0.7)`
- **Blur:** `backdrop-blur(16px)`
- **Borders:** Subtle top/bottom borders using `border-white/5` or `border-white/10`.
- _Usage:_ Navigation bars, elevated dropdown menus, sticky headers.

---

## 3. Custom Utilities & Animations

### Animations

Defined in the Tailwind config extension:

1.  **Marquee (`animate-marquee`):** `40s linear infinite` (Used for the \"Trusted By\" logo rows).
2.  **Float (`animate-float`):** `8s ease-in-out infinite` (Used for floating 3D elements or cards, `-10px` Y translation).
3.  **Pulse Slow (`animate-pulse-slow`):** Used for large, ambient background radial gradients (`6s` duration).

### Structural Transforms (3D Perspective)

- `.rotate-x-5`: `perspective(1000px) rotateX(5deg)`
- `.rotate-x-12`: `perspective(1000px) rotateX(12deg)`
- `.preserve-3d`: `transform-style: preserve-3d`
- _Usage:_ Used on large product mockups (like the center application preview in the hero section) to give them depth.

---

## 4. Recurring UI Component Patterns

### 1. The \"Ghost\" Button / Badge

Used for secondary actions or category tags.

- `px-4 py-1.5 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white transition-colors`

### 2. The \"Hero\" Primary Button

Used for the main \"Sign up\" or \"Upgrade\" actions.

- `relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 overflow-hidden`
- **Inner Glow on Hover:** Incorporates an absolute inset `div` with `bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10` that fades in on hover.

### 3. Feature/Icon Cards

Used in the navigation dropdowns and feature grids.

- **Container:** `flex items-start gap-3 group/item`
- **Icon Box:** `w-8 h-8 rounded-lg flex items-center justify-center transition-colors`
  - Example (Purple): `bg-purple-500/10 text-purple-400 group-hover/item:bg-purple-500/20 border border-purple-500/10`
- **Text:** `text-sm font-medium text-white mb-1 group-hover/item:text-[accent-color-300]`

### 4. Background Ambient Noise / Glows

- Standard hero backgrounds use absolute containers with `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%)` paired with the `pulse-slow` animation to create a breathing ambient light effect.
