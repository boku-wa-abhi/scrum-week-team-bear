# Scrum Week Team Bear — Time Tracking Widget

A minimalist floating desktop widget built with React + Vite + Tailwind CSS. It mimics a Spotlight-style bar that lets you pick a project, set a duration (manually or via quick presets), and log entries for testing.

## Features
- Spotlight-inspired pill layout with individual sections for project, duration, action, and settings.
- Duration presets popover (15m, 30m, 1h, Deep Work Block) plus manual text entry validation.
- Inline validation with subtle error highlighting.
- Preview list beneath the widget to confirm the captured entries.

## Getting Started
1. Install dependencies (run this inside the repository root):
   ```bash
   npm install
   ```
2. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Vite will print a local URL you can open in your browser.
3. Create a production build when needed:
   ```bash
   npm run build
   ```
   Preview the optimized bundle with `npm run preview`.

## Tech Stack
- [Vite](https://vitejs.dev/) for the React build tooling.
- [React 18](https://react.dev/) for component logic/state.
- [Tailwind CSS](https://tailwindcss.com/) for the modern floating UI styling.
