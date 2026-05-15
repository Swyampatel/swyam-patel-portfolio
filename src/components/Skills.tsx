import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import { Marquee } from './Marquee';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  const groups = Object.entries(skills);
  const allSkills = groups.flatMap(([, list]) => list);
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="03"
          label="Stack"
          title="What I build with."
          description="Languages, frameworks, AI tooling, and cloud — the full toolkit I reach for."
        />
      </div>

      <div className="space-y-3">
        <Marquee items={row1} direction="left" speed={45} />
        <Marquee items={row2} direction="right" speed={50} />
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map(([category, list], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: Math.min(idx * 0.05, 0.2),
              }}
              className="bg-ink-900/80 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-300">
                <span className="text-accent">/</span>
                {category}
              </div>
              <div className="font-mono text-[11px] leading-relaxed text-ink-200">
                {list.length} tools
              </div>
              <div className="mt-2 font-display text-lg font-semibold text-ink-50">
                {list.slice(0, 3).join(' · ')}
                {list.length > 3 && (
                  <span className="text-ink-400"> +{list.length - 3}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
