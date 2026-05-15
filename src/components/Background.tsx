import { motion } from 'framer-motion';

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />

      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />

      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/4 h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(167,139,250,0.45) 0%, rgba(139,92,246,0.18) 40%, transparent 75%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -30, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-15%] top-[35%] h-[600px] w-[600px] rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(56,189,248,0.15) 50%, transparent 75%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 left-[-10%] h-[500px] w-[700px] rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236,72,153,0.3) 0%, rgba(167,139,250,0.12) 50%, transparent 75%)',
        }}
      />

      <div className="absolute inset-0 bg-noise opacity-[0.025]" />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, transparent 30%, rgba(7,7,8,0.8) 80%)',
        }}
      />
    </div>
  );
}
