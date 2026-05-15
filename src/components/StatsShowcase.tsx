import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/tilt-card';

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
};

const stats: Stat[] = [
  { value: 99.95, suffix: '%', label: 'Uptime SLA held', caption: 'Multi-service GCP @ Mobilinq' },
  { value: 500, suffix: '+', label: 'Institutional users', caption: 'Reporting platform @ ML Capital' },
  { value: 33, suffix: '%', label: 'Cloud cost cut', caption: '$18K → $12K monthly' },
  { value: 95, suffix: '+', label: 'PageSpeed score', caption: 'Production · Nanny Linkup' },
  { value: 99.9, suffix: '%', label: 'Model accuracy', caption: 'ResNet50 · 15K image dataset' },
  { value: 75, suffix: '%', label: 'Footprint reduced', caption: 'Neural net compression' },
];

function useCount(target: number, start: boolean, duration = 1600): number {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return val;
}

function StatCard({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const v = useCount(stat.value, inView, 1400 + index * 100);
  const display = stat.value % 1 !== 0 ? v.toFixed(2) : Math.round(v).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <TiltCard
        intensity={6}
        scale={1.02}
        className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-colors hover:border-accent/30"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition-opacity group-hover:bg-accent/10"
        />
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="mt-2 flex items-baseline">
            {stat.prefix && (
              <span className="font-display text-2xl font-semibold text-ink-300">
                {stat.prefix}
              </span>
            )}
            <span className="font-display text-5xl font-semibold tracking-tightest text-ink-50 sm:text-6xl">
              {display}
            </span>
            {stat.suffix && (
              <span className="font-display text-3xl font-semibold text-accent">
                {stat.suffix}
              </span>
            )}
          </div>
          <div className="mt-3 text-sm font-medium text-ink-100">
            {stat.label}
          </div>
          <div className="mt-1 font-mono text-[11px] text-ink-400">
            {stat.caption}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function StatsShowcase() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="By the numbers" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-300">
          <span className="text-accent">∑</span>
          <span className="h-px w-8 bg-white/10" />
          <span>By the numbers</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
