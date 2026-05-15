import { cn } from '../lib/cn';

type Props = {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
};

export function Marquee({ items, direction = 'left', speed = 40, className }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />

      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          animation: `${direction === 'left' ? 'marquee-l' : 'marquee-r'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex flex-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-100 transition-colors hover:border-accent/40 hover:text-ink-50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
