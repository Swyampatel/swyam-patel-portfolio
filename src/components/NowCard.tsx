import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { now } from '../data/portfolio';

const toneStyles: Record<string, { dot: string; label: string }> = {
  violet: { dot: 'bg-violet-400', label: 'text-violet-300' },
  emerald: { dot: 'bg-emerald-400', label: 'text-emerald-300' },
  sky: { dot: 'bg-sky-400', label: 'text-sky-300' },
  amber: { dot: 'bg-amber-400', label: 'text-amber-300' },
  fuchsia: { dot: 'bg-fuchsia-400', label: 'text-fuchsia-300' },
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function NowCard() {
  const [highlight, setHighlight] = useState(0);
  const d = new Date();
  const stamp = `${months[d.getMonth()]} ${d.getFullYear()}`;

  useEffect(() => {
    const id = setInterval(() => {
      setHighlight((p) => (p + 1) % now.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/70 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-ink-300" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-300">
            Now · {stamp}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            Live
          </span>
        </div>
      </div>

      <ul className="space-y-2 p-3.5">
        {now.map((item, i) => {
          const tone = toneStyles[item.tone] ?? toneStyles.violet;
          const isActive = i === highlight;
          return (
            <li
              key={item.label}
              className="relative flex items-center gap-2.5 text-[11.5px]"
            >
              <span
                className={`relative flex h-1.5 w-1.5 flex-none rounded-full ${tone.dot}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="now-highlight"
                    className={`absolute inset-0 -m-1 rounded-full ${tone.dot} opacity-30`}
                    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  />
                )}
              </span>
              <span
                className={`flex-none font-mono text-[10px] uppercase tracking-wider ${tone.label}`}
                style={{ width: 64 }}
              >
                {item.label}
              </span>
              <span
                className={`truncate transition-colors duration-300 ${
                  isActive ? 'text-ink-50' : 'text-ink-200'
                }`}
              >
                {item.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
