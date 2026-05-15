import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MapPin, Sparkles as SparkIcon } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ConsoleFeed } from './ConsoleFeed';
import { MagneticButton } from './MagneticButton';
import { NowCard } from './NowCard';
import { NeuralCanvas } from './NeuralCanvas';
import { VerticalCutReveal } from './ui/vertical-cut-reveal';

const SplineScene = lazy(() =>
  import('./ui/splite').then((m) => ({ default: m.SplineScene })),
);

const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const ease = [0.16, 1, 0.3, 1] as const;

function RobotPanel() {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    type Win = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as Win;
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative h-[600px] w-full xl:h-[680px]">
      {ready ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-wider text-ink-500">
              warming 3d…
            </div>
          }
        >
          <SplineScene
            scene={SCENE_URL}
            className="h-full w-full"
            onLoad={() => setLoaded(true)}
          />
        </Suspense>
      ) : (
        <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-wider text-ink-500" />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div
        className={`pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/10 bg-ink-900/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md transition-opacity duration-700 ${
          loaded ? 'text-emerald-400 opacity-100' : 'text-ink-500 opacity-60'
        }`}
      >
        {loaded ? '● drag to rotate' : 'loading webgl…'}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="work"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 -z-[5]">
        <NeuralCanvas />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 25% 40%, transparent 0%, rgba(7,7,8,0.55) 60%, rgba(7,7,8,0.85) 100%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-200">
            Available for select engagements
          </span>
        </motion.div>

        <h1 className="font-display text-balance text-[44px] font-semibold leading-[1.06] tracking-tightest text-ink-50 sm:text-6xl md:text-7xl lg:text-[88px]">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.08}
            staggerFrom="first"
            reverse={true}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 26,
              delay: 0.1,
            }}
            containerClassName="block"
          >
            Engineering leader
          </VerticalCutReveal>
          <span className="block">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              reverse={true}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 26,
                delay: 0.45,
              }}
              containerClassName="inline-flex"
              wordLevelClassName="text-ink-200"
            >
              building
            </VerticalCutReveal>
            <span>&nbsp;</span>
            <span className="relative inline-block">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                reverse={true}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 26,
                  delay: 0.7,
                }}
                containerClassName="inline-flex bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent"
              >
                AI-native
              </VerticalCutReveal>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.4, ease }}
                className="absolute -bottom-1 left-0 right-0 h-px origin-left bg-gradient-to-r from-violet-400/0 via-violet-400/60 to-fuchsia-400/0"
              />
            </span>
          </span>
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.08}
            reverse={true}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 26,
              delay: 0.95,
            }}
            containerClassName="block text-ink-300"
          >
            products.
          </VerticalCutReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.2 }}
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-ink-200 sm:text-xl"
        >
          Currently Head of Engineering at{' '}
          <span className="text-ink-50">Mondai</span>, Co-Founder of{' '}
          <span className="text-ink-50">Nanny Linkup</span>. Previously Tech
          Director @ ML Capital, AI Researcher @ NJCU.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.35 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-ink-50 px-6 py-3.5 text-sm font-medium text-ink-950 transition-shadow hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.6)]"
          >
            <span className="relative z-10">Get in touch</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </MagneticButton>

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.06] hover:text-ink-50"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.06] hover:text-ink-50"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <span className="ml-2 hidden items-center gap-1.5 font-mono text-[11px] text-ink-400 sm:inline-flex">
            <span>or</span>
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink-300">
              ⌘K
            </kbd>
            <span>anywhere</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.55 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-ink-300"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-500" />
            EST · UTC−5
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-500" />
            <span className="text-emerald-400">●</span> Online
          </span>
        </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="hidden lg:col-span-6 lg:-mr-8 lg:block xl:-mr-16"
          >
            <RobotPanel />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.7 }}
          className="mt-10 grid gap-3 lg:mt-12 lg:grid-cols-3"
        >
          <StatusCard />
          <NowCard />
          <ConsoleFeed />
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 animate-float text-ink-400 hover:text-ink-200 sm:block"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}

function StatusCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-xl">
      <div className="pointer-events-none absolute -inset-px rounded-xl">
        <div
          className="absolute inset-0 rounded-xl opacity-50"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(167,139,250,0.45) 60deg, transparent 180deg, rgba(99,102,241,0.35) 240deg, transparent 360deg)',
            animation: 'beam-spin 8s linear infinite',
          }}
        />
        <div className="absolute inset-[1px] rounded-xl bg-ink-900/95 backdrop-blur-xl" />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between border-b border-white/5 px-3.5 py-2">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-300">
            <SparkIcon className="h-3 w-3 text-accent" />
            Currently shipping
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
            Live
          </span>
        </div>

        <div className="px-3.5 py-3">
          <div className="font-display text-base font-semibold text-ink-50">
            Mondai by Rita
          </div>
          <div className="mt-0.5 text-xs text-ink-300">
            AI-native product platform · Head of Engineering
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/5 pt-3">
            <Stat label="Years building" value="5+" />
            <Stat label="Roles shipped" value="6" />
            <Stat label="Uptime held" value="99.95%" />
            <Stat label="Cost cut" value="33%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold tracking-tight text-ink-50">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-400">
        {label}
      </div>
    </div>
  );
}
