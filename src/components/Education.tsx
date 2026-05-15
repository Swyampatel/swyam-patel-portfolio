import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { certifications, education } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';
import { TiltCard } from './ui/tilt-card';

const ease = [0.16, 1, 0.3, 1] as const;

export function Education() {
  return (
    <section id="credentials" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="04"
          label="Education & Credentials"
          title="Backed by the work."
        />

        <div className="grid gap-4 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
            className="lg:col-span-2"
          >
            <TiltCard
              intensity={6}
              scale={1.018}
              className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <GraduationCap className="h-4 w-4 text-accent" />
                </div>

                <div className="font-mono text-[11px] uppercase tracking-wider text-ink-300">
                  Education
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink-50">
                  {education.school}
                </h3>
                <p className="mt-1 text-sm text-ink-200">{education.degree}</p>
                <p className="mt-3 font-mono text-xs text-ink-400">
                  {education.start} — {education.end}
                </p>

                <div className="mt-5 space-y-1.5">
                  {education.honors.map((h) => (
                    <div
                      key={h}
                      className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent"
                    >
                      <Award className="h-3 w-3" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <div className="grid gap-3 lg:col-span-3 sm:grid-cols-2">
            {certifications.map((c, idx) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.45,
                  ease,
                  delay: Math.min(idx * 0.05, 0.2),
                }}
              >
                <TiltCard
                  intensity={8}
                  scale={1.025}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
                >
                  {c.highlight && (
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                        Notable
                      </span>
                    </div>
                  )}

                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                    {c.issuer}
                  </div>
                  <h4 className="mt-2 pr-16 text-sm font-medium leading-snug text-ink-50">
                    {c.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink-400">
                    <span>{c.date}</span>
                    {c.credentialId && (
                      <span className="truncate text-ink-500">
                        ID · {c.credentialId.slice(0, 8)}…
                      </span>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
