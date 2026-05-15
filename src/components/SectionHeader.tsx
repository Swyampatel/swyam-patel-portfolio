import { motion } from 'framer-motion';

type Props = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeader({ index, label, title, description }: Props) {
  return (
    <div className="mb-12 sm:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-300"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-white/10" />
        <span>{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink-50 sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-4 max-w-xl text-base text-ink-300 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
