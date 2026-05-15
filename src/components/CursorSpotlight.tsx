import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [coarse, setCoarse] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (coarse) return;
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [coarse, x, y]);

  if (!mounted || coarse) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
      style={{
        background: `radial-gradient(380px circle at var(--x) var(--y), rgba(167,139,250,0.10), transparent 60%)`,
      }}
    >
      <motion.div
        className="pointer-events-none fixed left-0 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: springX,
          y: springY,
          background:
            'radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}
