import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function MagneticButton({ href, children, className, target, rel, onClick, ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: dx * 0.25, y: dy * 0.4 });
  }

  function onLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 18, stiffness: 220, mass: 0.4 }}
      className={cn('inline-flex', className)}
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
