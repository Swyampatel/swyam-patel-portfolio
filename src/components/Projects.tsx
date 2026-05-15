import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';
import { cn } from '../lib/cn';

const ease = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const [hero, ...rest] = projects;

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Projects I'm proud of."
          description="A mix of production systems and ML/AI explorations. Code is on GitHub where applicable."
        />

        <div className="grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          <FeaturedProject project={hero} />

          {rest.slice(0, 2).map((p, idx) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={idx + 1}
              span="lg:col-span-3"
            />
          ))}

          {rest.slice(2).map((p, idx) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={idx + 3}
              span="lg:col-span-2"
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  project: (typeof projects)[number];
  index: number;
  span?: string;
  compact?: boolean;
};

function FeaturedProject({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.a
      href={project.live ?? project.github ?? '#'}
      target={project.live || project.github ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease }}
      className="group relative col-span-full overflow-hidden rounded-3xl border border-white/10 lg:row-span-1"
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl">
        <div
          className="absolute inset-0 rounded-3xl opacity-60"
          style={{
            background:
              'conic-gradient(from 90deg at 50% 50%, rgba(167,139,250,0) 0deg, rgba(167,139,250,0.5) 60deg, rgba(236,72,153,0.4) 130deg, rgba(99,102,241,0.5) 220deg, rgba(167,139,250,0) 360deg)',
            animation: 'beam-spin 10s linear infinite',
          }}
        />
        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-ink-850 via-ink-900 to-ink-850" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 80% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 80% 50%, black, transparent)',
        }}
      />

      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              Featured · Co-founded
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300">
              2025 — present
            </span>
          </div>

          <h3 className="mt-6 font-display text-4xl font-semibold tracking-tightest text-ink-50 sm:text-5xl lg:text-6xl">
            {project.title}
          </h3>

          <p className="mt-3 text-lg text-ink-100/90 sm:text-xl">
            {project.blurb}
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-200/85">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink-100"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-100">
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:block">
          <div className="grid gap-3">
            {project.metrics?.map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  Metric · {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-2 font-display text-xl font-semibold text-ink-50">
                  {m}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project: p, index, span, compact }: CardProps) {
  return (
    <motion.a
      href={p.live ?? p.github ?? '#'}
      target={p.live || p.github ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.5,
        ease,
        delay: Math.min(index * 0.04, 0.2),
      }}
      className={cn(
        'group relative col-span-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm transition-all hover:border-white/25 hover:from-white/[0.07]',
        span,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(167,139,250,0.10), transparent 50%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-ink-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-2 opacity-60 transition-opacity group-hover:opacity-100">
          {p.github && <Github className="h-4 w-4 text-ink-200" />}
          <ArrowUpRight className="h-4 w-4 text-ink-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      <h3
        className={cn(
          'relative mt-5 font-display font-semibold tracking-tight text-ink-50',
          compact ? 'text-xl' : 'text-2xl',
        )}
      >
        {p.title}
      </h3>

      <p className="relative mt-2 text-sm text-ink-300">{p.blurb}</p>

      {!compact && (
        <p className="relative mt-4 text-[13px] leading-relaxed text-ink-200/80">
          {p.description}
        </p>
      )}

      {p.metrics && p.metrics.length > 0 && !compact && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {p.metrics.map((m) => (
            <span
              key={m}
              className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] text-accent"
            >
              {m}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, compact ? 3 : 5).map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-ink-200"
            >
              {s}
            </span>
          ))}
          {p.stack.length > (compact ? 3 : 5) && (
            <span className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-ink-300">
              +{p.stack.length - (compact ? 3 : 5)}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
