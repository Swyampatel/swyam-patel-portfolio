import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const lines = [
  { text: '$ ./init swyam.portfolio', kind: 'cmd' },
  { text: '[  OK  ] booting kernel · v4.7.1', kind: 'ok' },
  { text: '[  OK  ] mounting /experience  ·  6 roles loaded', kind: 'ok' },
  { text: '[  OK  ] mounting /projects    ·  6 case studies', kind: 'ok' },
  { text: '[  OK  ] establishing connection · jersey city, nj', kind: 'ok' },
  { text: '[  OK  ] neural network online · synapses warm', kind: 'ok' },
  { text: '> ready.', kind: 'ready' },
] as const;

const SESSION_KEY = 'swyam.boot.played.v1';

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const played = sessionStorage.getItem(SESSION_KEY);
    if (played) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    if (step >= lines.length) {
      const t = setTimeout(() => {
        setDone(true);
        sessionStorage.setItem(SESSION_KEY, '1');
        setTimeout(() => setShow(false), 700);
      }, 1400);
      return () => clearTimeout(t);
    }
    const isLast = step === lines.length - 1;
    const delay =
      step === 0
        ? 500
        : isLast
        ? 600
        : 320 + Math.random() * 220;
    const t = setTimeout(() => setStep(step + 1), delay);
    return () => clearTimeout(t);
  }, [show, step]);

  function skip() {
    setDone(true);
    sessionStorage.setItem(SESSION_KEY, '1');
    setTimeout(() => setShow(false), 200);
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
          onClick={skip}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(167,139,250,0.12) 0%, transparent 60%)',
            }}
          />

          <div className="relative w-full max-w-xl px-6 font-mono text-sm">
            <div className="mb-6 flex items-center gap-2 text-xs text-ink-400">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/60" />
                <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </span>
              <span className="ml-3">~/swyam-patel — zsh — 80×24</span>
            </div>

            <div className="space-y-1.5">
              {lines.slice(0, step).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className="leading-relaxed"
                >
                  {l.kind === 'cmd' && <span className="text-ink-100">{l.text}</span>}
                  {l.kind === 'ok' && (
                    <span>
                      <span className="text-emerald-400">{l.text.slice(0, 8)}</span>
                      <span className="text-ink-200">{l.text.slice(8)}</span>
                    </span>
                  )}
                  {l.kind === 'ready' && (
                    <span className="text-accent">{l.text}</span>
                  )}
                </motion.div>
              ))}
              {step < lines.length && (
                <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
              )}
            </div>

            <div className="mt-10 text-center font-mono text-[10px] uppercase tracking-wider text-ink-500">
              Click anywhere to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
