import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { navSections, profile } from '../data/portfolio';

export function Nav() {
  const [active, setActive] = useState<string>('work');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.6] },
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300',
      )}
    >
      <nav
        className={cn(
          'flex w-full max-w-3xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300',
          scrolled
            ? 'border-white/10 bg-ink-900/80 backdrop-blur-xl'
            : 'border-white/5 bg-ink-900/40 backdrop-blur-md',
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-2 pr-3 font-display text-sm font-semibold tracking-tight text-ink-50"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-glow text-[11px] font-bold text-ink-950">
            {profile.initials}
          </span>
          <span className="hidden sm:block">{profile.name}</span>
        </a>

        <div className="flex items-center gap-1">
          {navSections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                active === section
                  ? 'text-ink-50'
                  : 'text-ink-300 hover:text-ink-100',
              )}
            >
              {active === section && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{section}</span>
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-100 transition hover:bg-white/10 sm:block"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
}
