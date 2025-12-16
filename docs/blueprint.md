# **App Name**: Vaomi.ai Reconstruction

## Core Features:

- Smooth Scrolling: Implement Lenis Scroll for buttery smooth inertial scrolling, replacing default browser jerky scrolling.
- Typewriter Effect: Animate the 'Hi, I'm Vaomi' text with a typewriter effect or a scramble reveal and include a blinking cursor.
- Infinite Logo Marquee: Create a full-width strip with investor logos that auto-scrolls infinitely. Add gradient masks for a fade-out effect.
- Sticky Stacking Cards: Implement a stacking cards mechanic where cards stick to the top as the user scrolls, creating a sense of depth.
- Scroll-based Animations: Add staggered fade-in effects, scaling and brightness changes on scroll using Framer Motion's useScroll and useTransform hooks.

## Style Guidelines:

- Background: Near-black (#030303) for a dark mode aesthetic.
- Primary Text: Pure white (#FFFFFF) for high contrast and readability.
- Secondary Text: Light gray (#A1A1AA) for less prominent text elements.
- Accent Color: Electric green (#4ADE80) used sparingly to highlight interactive elements or data graphics.
- Headings: 'Inter' sans-serif with font-weight 600 and letter-spacing -0.02em. Note: currently only Google Fonts are supported.
- Body: 'Inter' sans-serif with font-weight 400 and line-height 1.6. Note: currently only Google Fonts are supported.
- Hover Effects: All hover effects should have a duration of 300ms with ease-out timing.
- Scroll Reveals: Use y: 20 -> y: 0 and opacity: 0 -> opacity: 1 for elements appearing on scroll.