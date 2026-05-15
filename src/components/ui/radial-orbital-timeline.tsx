import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Link2, Zap } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useActive } from '../../lib/use-active';

export interface OrbitalItem {
  id: number;
  title: string;
  company?: string;
  date: string;
  location?: string;
  content: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'current' | 'past';
  energy: number;
  stack?: string[];
}

interface Props {
  data: OrbitalItem[];
  height?: number;
  className?: string;
}

const ROTATE_SPEED_DEG_PER_SEC = 6;
const EASE_FACTOR = 0.08;

export function RadialOrbitalTimeline({ data, height = 640, className }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [activeId, setActiveId] = useState<number | null>(null);
  const [pulse, setPulse] = useState<Record<number, boolean>>({});
  const [autoRotate, setAutoRotate] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const rotationRef = useRef(0);
  const targetRotationRef = useRef<number | null>(null);
  const radiusRef = useRef(220);
  const expandedRef = useRef<Record<number, boolean>>({});
  const autoRotateRef = useRef(true);

  expandedRef.current = expanded;
  autoRotateRef.current = autoRotate;

  const active = useActive(containerRef as React.RefObject<HTMLElement>, {
    rootMargin: '200px',
  });
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    function compute() {
      const w = containerRef.current?.clientWidth ?? 800;
      const h = containerRef.current?.clientHeight ?? height;
      const r = Math.min(w, h) * 0.34;
      radiusRef.current = Math.max(150, Math.min(260, r));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [height]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!activeRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (autoRotateRef.current) {
        rotationRef.current =
          (rotationRef.current + ROTATE_SPEED_DEG_PER_SEC * dt) % 360;
      } else if (targetRotationRef.current !== null) {
        const diff =
          ((targetRotationRef.current - rotationRef.current + 540) % 360) - 180;
        if (Math.abs(diff) < 0.05) {
          rotationRef.current = targetRotationRef.current;
          targetRotationRef.current = null;
        } else {
          rotationRef.current = (rotationRef.current + diff * EASE_FACTOR + 360) % 360;
        }
      }

      const total = data.length;
      const radius = radiusRef.current;

      for (let idx = 0; idx < total; idx++) {
        const item = data[idx];
        const el = nodeRefs.current[item.id];
        if (!el) continue;
        const angle = ((idx / total) * 360 + rotationRef.current) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);

        const z = Math.round(100 + 50 * Math.cos(rad));
        const isOpen = expandedRef.current[item.id];
        const baseOpacity = Math.max(
          0.45,
          Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2)),
        );
        const opacity = isOpen ? 1 : baseOpacity;

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        el.style.zIndex = String(isOpen ? 200 : z);
        el.style.opacity = opacity.toFixed(3);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  function getRelated(id: number): number[] {
    return data.find((d) => d.id === id)?.relatedIds ?? [];
  }

  function toggle(id: number) {
    setExpanded((prev) => {
      if (!prev[id]) {
        const idx = data.findIndex((d) => d.id === id);
        const target = (idx / data.length) * 360;
        targetRotationRef.current = (270 - target + 360) % 360;
        setActiveId(id);
        setAutoRotate(false);
        const rel = getRelated(id);
        const p: Record<number, boolean> = {};
        rel.forEach((r) => (p[r] = true));
        setPulse(p);
        return { [id]: true };
      }
      setActiveId(null);
      setAutoRotate(true);
      setPulse({});
      targetRotationRef.current = null;
      return {};
    });
  }

  function onContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpanded({});
      setActiveId(null);
      setPulse({});
      setAutoRotate(true);
      targetRotationRef.current = null;
    }
  }

  function isRelated(id: number) {
    if (!activeId) return false;
    return getRelated(activeId).includes(id);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-900/60 to-black',
        className,
      )}
      style={{ height }}
      onClick={onContainerClick}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.25) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)',
        }}
      />

      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div
          aria-hidden
          className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-accent via-violet-500 to-fuchsia-500 flex items-center justify-center z-10"
          style={{ animation: 'pulse-slow 4s cubic-bezier(0.4,0,0.6,1) infinite' }}
        >
          <span
            aria-hidden
            className="absolute h-20 w-20 rounded-full border border-white/20 opacity-70"
            style={{ animation: 'orbital-ping 1.6s cubic-bezier(0,0,0.2,1) infinite' }}
          />
          <span
            aria-hidden
            className="absolute h-24 w-24 rounded-full border border-white/10 opacity-50"
            style={{
              animation: 'orbital-ping 1.6s cubic-bezier(0,0,0.2,1) infinite',
              animationDelay: '0.6s',
            }}
          />
          <span className="h-7 w-7 rounded-full bg-white/85 backdrop-blur-md" />
        </div>

        <div
          aria-hidden
          className="absolute rounded-full border border-white/10"
          style={{ width: radiusRef.current * 2, height: radiusRef.current * 2 }}
        />
        <div
          aria-hidden
          className="absolute rounded-full border border-white/[0.06]"
          style={{ width: radiusRef.current * 2 + 60, height: radiusRef.current * 2 + 60 }}
        />

        {data.map((item) => {
          const isOpen = !!expanded[item.id];
          const related = isRelated(item.id);
          const isPulsing = !!pulse[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute cursor-pointer"
              style={{
                willChange: 'transform, opacity',
                transform: 'translate3d(0,0,0)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggle(item.id);
              }}
            >
              <div
                aria-hidden
                className={cn(
                  'absolute -inset-1 rounded-full',
                  isPulsing && 'animate-pulse',
                )}
                style={{
                  background:
                    'radial-gradient(circle, rgba(167,139,250,0.25) 0%, rgba(255,255,255,0) 70%)',
                  width: item.energy * 0.5 + 44,
                  height: item.energy * 0.5 + 44,
                  left: -((item.energy * 0.5 + 44 - 40) / 2),
                  top: -((item.energy * 0.5 + 44 - 40) / 2),
                }}
              />

              <div
                className={cn(
                  'h-10 w-10 rounded-full border-2 flex items-center justify-center',
                  isOpen
                    ? 'bg-accent text-ink-950 border-accent shadow-[0_0_30px_rgba(167,139,250,0.6)] scale-150'
                    : related
                      ? 'bg-white/60 text-ink-950 border-white animate-pulse'
                      : 'bg-ink-900 text-ink-100 border-white/30',
                )}
                style={{
                  transition:
                    'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <Icon size={16} />
              </div>

              <div
                className={cn(
                  'absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono uppercase tracking-wider',
                  isOpen ? 'text-ink-50' : 'text-ink-200/80',
                )}
                style={{ transition: 'color 200ms ease' }}
              >
                {item.title}
              </div>
              {item.company && (
                <div
                  className={cn(
                    'absolute top-[60px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px]',
                    isOpen ? 'text-ink-300' : 'text-ink-400',
                  )}
                  style={{ transition: 'color 200ms ease' }}
                >
                  {item.company}
                </div>
              )}

              {isOpen && (
                <div className="absolute left-1/2 top-[88px] w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-white/15 bg-ink-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/40" />

                  <div className="px-4 pb-2 pt-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider',
                          item.status === 'current'
                            ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400'
                            : 'border-white/15 bg-white/[0.04] text-ink-300',
                        )}
                      >
                        {item.status === 'current' ? '● Active' : 'Past'}
                      </span>
                      <span className="font-mono text-[10px] text-ink-400">{item.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-sm font-semibold text-ink-50">
                      {item.title}
                      {item.company && (
                        <span className="text-ink-300"> · {item.company}</span>
                      )}
                    </h3>
                    {item.location && (
                      <div className="mt-1 font-mono text-[10px] text-ink-400">
                        {item.location}
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-4 text-[12px] leading-relaxed text-ink-200">
                    <p>{item.content}</p>

                    <div className="mt-4 border-t border-white/5 pt-3">
                      <div className="mb-1 flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1 text-ink-300">
                          <Zap size={9} /> Tenure / impact
                        </span>
                        <span className="font-mono text-ink-400">{item.energy}%</span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-fuchsia-400"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {item.stack && item.stack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-ink-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 border-t border-white/5 pt-3">
                        <div className="mb-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                          <Link2 size={9} /> Connected
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((rid) => {
                            const rel = data.find((d) => d.id === rid);
                            if (!rel) return null;
                            return (
                              <button
                                key={rid}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggle(rid);
                                }}
                                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-transparent px-2 py-1 font-mono text-[10px] text-ink-200 transition hover:border-accent/40 hover:bg-white/[0.04] hover:text-ink-50"
                              >
                                {rel.title}
                                <ArrowRight size={8} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="rounded-full border border-white/10 bg-ink-900/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300 backdrop-blur-md">
          Click a node · click center to reset
        </span>
      </div>
    </div>
  );
}
