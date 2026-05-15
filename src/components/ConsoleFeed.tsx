import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

type LogLine = {
  id: number;
  ts: string;
  level: 'INFO' | 'OK' | 'DEPLOY' | 'METRIC';
  text: string;
};

const templates: Array<Omit<LogLine, 'id' | 'ts'>> = [
  { level: 'DEPLOY', text: 'deployed nannylinkup-prod · v2.4.1 · cloud-run' },
  { level: 'OK', text: 'firestore · query optimized · p99 −43ms' },
  { level: 'METRIC', text: 'pagespeed · /home · 96 perf · 100 a11y' },
  { level: 'INFO', text: 'autoscale · cloud-run · 3 → 7 instances' },
  { level: 'OK', text: 'redis · presence cache hit-rate 99.2%' },
  { level: 'DEPLOY', text: 'mondai-api · ci passed · merging to main' },
  { level: 'METRIC', text: 'socket.io · 412 connected · 0 dropped' },
  { level: 'INFO', text: 'bigquery · ingest job · 2.1M rows · 8.4s' },
  { level: 'OK', text: 'lighthouse ci · pr#142 · all budgets met' },
  { level: 'DEPLOY', text: 'rolling update · zero-downtime · ✓' },
  { level: 'METRIC', text: 'p95 latency · 87ms · within slo' },
  { level: 'INFO', text: 'terraform plan · 0 to add · 2 to change' },
  { level: 'OK', text: 'cdn purge · 14 paths · ttl reset' },
  { level: 'METRIC', text: 'error budget · 99.97% · burn 0.8x' },
];

const colors: Record<LogLine['level'], string> = {
  INFO: 'text-sky-400',
  OK: 'text-emerald-400',
  DEPLOY: 'text-violet-300',
  METRIC: 'text-amber-300',
};

function makeLine(seed: number): LogLine {
  const t = templates[seed % templates.length];
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return { ...t, id: seed, ts: `${hh}:${mm}:${ss}` };
}

export function ConsoleFeed() {
  const [lines, setLines] = useState<LogLine[]>(() =>
    Array.from({ length: 4 }, (_, i) => makeLine(i)),
  );

  useEffect(() => {
    let id = lines[lines.length - 1].id + 1;
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, makeLine(id)];
        id++;
        return next.slice(-4);
      });
    }, 2200);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/70 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-ink-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-300">
            ~/swyam — live ops
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            Streaming
          </span>
        </div>
      </div>

      <div className="relative h-[112px] px-3.5 py-2 font-mono text-[11.5px] leading-[1.55]">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 whitespace-nowrap"
            >
              <span className="text-ink-500">{l.ts}</span>
              <span className={`${colors[l.level]} font-medium`}>{l.level.padEnd(6)}</span>
              <span className="truncate text-ink-200">{l.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
