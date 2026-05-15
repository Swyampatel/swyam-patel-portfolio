import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Cloud, Code2, Crown, FlaskConical, Rocket } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';
import {
  RadialOrbitalTimeline,
  type OrbitalItem,
} from './ui/radial-orbital-timeline';

const orbitalData: OrbitalItem[] = [
  {
    id: 1,
    title: 'Head of Engineering',
    company: 'Mondai by Rita',
    date: 'Jan 2026 – Now',
    location: 'Remote · Jersey City, NJ',
    content:
      'Leading engineering org and driving AI-native architecture across the product platform.',
    icon: Crown,
    relatedIds: [2, 3],
    status: 'current',
    energy: 100,
    stack: ['React Native', 'Next.js', 'AWS'],
  },
  {
    id: 2,
    title: 'Co-Founder',
    company: 'Nanny Linkup',
    date: 'May 2025 – Now',
    location: 'Jersey City, NJ',
    content:
      'Architected cloud-native childcare marketplace on GCP. WebSocket chat with Socket.io + Redis. Hit 95+ PageSpeed.',
    icon: Rocket,
    relatedIds: [1],
    status: 'current',
    energy: 95,
    stack: ['GCP', 'Cloud Run', 'Firestore', 'Socket.io'],
  },
  {
    id: 3,
    title: 'Fullstack Engineer',
    company: 'Mondai by Rita',
    date: 'May 2025 – Jan 2026',
    location: 'Remote',
    content:
      'Shipped core full-stack features end-to-end. Promoted to Head of Engineering after 9 months.',
    icon: Code2,
    relatedIds: [1, 4],
    status: 'past',
    energy: 78,
    stack: ['React Native', 'Next.js', 'AWS'],
  },
  {
    id: 4,
    title: 'AI Researcher',
    company: 'NJCU',
    date: 'May 2025 – Jul 2025',
    location: 'Jersey City, NJ',
    content:
      '99.9% accuracy on 15K+ images using ResNet50 transfer learning. Edge CV system held 30 FPS at sub-100ms inference. Compressed model footprint by 75%.',
    icon: FlaskConical,
    relatedIds: [3, 5],
    status: 'past',
    energy: 70,
    stack: ['PyTorch', 'Computer Vision', 'ResNet50'],
  },
  {
    id: 5,
    title: 'Tech Director',
    company: 'ML Capital',
    date: 'Oct 2024 – Apr 2025',
    location: 'Remote',
    content:
      'Delivered reporting platform for 500+ institutional investors. Cut report generation 48h → 3h via Python + LaTeX automation. Built D3 dashboard, +45% engagement.',
    icon: Briefcase,
    relatedIds: [4, 6],
    status: 'past',
    energy: 85,
    stack: ['React.js', 'Node.js', 'D3.js', 'Python'],
  },
  {
    id: 6,
    title: 'Cloud Engineer',
    company: 'Mobilinq',
    date: 'Apr 2024 – Sep 2024',
    location: 'Remote · Toronto, ON',
    content:
      'Held 99.95% uptime SLA across multi-service GCP. Cut spend 33% ($18K → $12K monthly). GitOps + Terraform — eliminated 80% of deploy failures.',
    icon: Cloud,
    relatedIds: [5],
    status: 'past',
    energy: 65,
    stack: ['GCP', 'Terraform', 'BigQuery', 'GitOps'],
  },
];

export function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <section id="experience" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="01"
          label="Experience"
          title="Where I've shipped."
          description={
            isMobile
              ? 'Five years across early-stage product, AI research, and cloud infrastructure.'
              : 'Five years across early-stage product, AI research, and cloud infrastructure. Click any node to expand.'
          }
        />

        {!isMobile ? (
          <RadialOrbitalTimeline data={orbitalData} height={680} />
        ) : (
          <MobileTimeline />
        )}
      </div>
    </section>
  );
}

function MobileTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <motion.div
            key={`${exp.company}-${exp.role}-${idx}`}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(idx * 0.05, 0.25),
            }}
            className="group relative pl-8"
          >
            <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink-950 bg-ink-700 transition-colors group-hover:bg-accent" />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-ink-50">
                {exp.role}
              </h3>
              <span className="text-ink-400">·</span>
              <span className="text-base text-ink-200">{exp.company}</span>
              {exp.type && (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
                  {exp.type}
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-400">
              <span>
                {exp.start} — {exp.end}
              </span>
              <span className="h-1 w-1 rounded-full bg-ink-600" />
              <span>{exp.location}</span>
            </div>

            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-200">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 h-px w-3 flex-none bg-ink-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {exp.stack && exp.stack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-ink-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
