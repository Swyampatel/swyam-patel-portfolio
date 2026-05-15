import { profile } from '../data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-ink-400 sm:flex-row">
        <span>
          © {year} {profile.name}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-ink-600" />
          Built with React, Tailwind, Framer Motion
          <span className="h-1 w-1 rounded-full bg-ink-600" />
        </span>
      </div>
    </footer>
  );
}
