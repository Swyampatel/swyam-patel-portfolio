import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  glare?: boolean;
};

const SMOOTH = 0.14;
const REST_EPS = 0.02;

type Subscriber = () => boolean;
const subs = new Set<Subscriber>();
let sharedRaf = 0;

function ensureLoop() {
  if (sharedRaf !== 0) return;
  const tick = () => {
    let anyActive = false;
    for (const s of subs) {
      if (s()) anyActive = true;
    }
    if (anyActive && subs.size > 0) {
      sharedRaf = requestAnimationFrame(tick);
    } else {
      sharedRaf = 0;
    }
  };
  sharedRaf = requestAnimationFrame(tick);
}

export function TiltCard({
  children,
  className,
  intensity = 8,
  scale = 1.02,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, s: 1, gx: 50, gy: 50, op: 0 });
  const current = useRef({ x: 0, y: 0, s: 1, gx: 50, gy: 50, op: 0 });
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (coarse) return;

    const update: Subscriber = () => {
      const c = current.current;
      const t = target.current;

      const dx = t.x - c.x;
      const dy = t.y - c.y;
      const ds = t.s - c.s;
      const dop = t.op - c.op;

      const atRest =
        Math.abs(dx) < REST_EPS &&
        Math.abs(dy) < REST_EPS &&
        Math.abs(ds) < 0.0005 &&
        Math.abs(dop) < 0.005 &&
        t.x === 0 &&
        t.y === 0 &&
        t.s === 1 &&
        t.op === 0;

      if (atRest) {
        const el = ref.current;
        if (el && (c.x !== 0 || c.y !== 0 || c.s !== 1)) {
          c.x = c.y = 0;
          c.s = 1;
          c.op = 0;
          el.style.transform = '';
          el.style.boxShadow = '';
          if (glareRef.current) glareRef.current.style.opacity = '0';
        }
        return false;
      }

      c.x += dx * SMOOTH;
      c.y += dy * SMOOTH;
      c.s += ds * SMOOTH;
      c.gx += (t.gx - c.gx) * SMOOTH;
      c.gy += (t.gy - c.gy) * SMOOTH;
      c.op += dop * SMOOTH;

      const el = ref.current;
      if (el) {
        el.style.transform = `perspective(1000px) rotateX(${c.x.toFixed(3)}deg) rotateY(${c.y.toFixed(3)}deg) scale3d(${c.s.toFixed(4)},${c.s.toFixed(4)},${c.s.toFixed(4)})`;

        const lift = Math.min(1, Math.max(0, (c.s - 1) / Math.max(0.0001, scale - 1)));
        if (lift > 0.02) {
          const sx = c.y * 0.4;
          const sy = c.x * 0.4;
          const sb = 28 + (Math.abs(c.x) + Math.abs(c.y)) * 0.7;
          el.style.boxShadow = `${sx.toFixed(2)}px ${sy.toFixed(2)}px ${sb.toFixed(2)}px rgba(0, 0, 0, ${(0.4 * lift).toFixed(3)})`;
        }
      }

      const ge = glareRef.current;
      if (ge) {
        ge.style.opacity = c.op.toFixed(3);
        if (c.op > 0.02) {
          ge.style.backgroundImage = `radial-gradient(circle at ${c.gx.toFixed(2)}% ${c.gy.toFixed(2)}%, rgba(255,255,255,0.12), transparent 55%)`;
        }
      }

      return true;
    };

    subs.add(update);
    return () => {
      subs.delete(update);
    };
  }, [coarse, scale]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (coarse) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    target.current.x = ((y - cy) / cy) * -intensity;
    target.current.y = ((x - cx) / cx) * intensity;
    target.current.s = scale;
    target.current.gx = (x / rect.width) * 100;
    target.current.gy = (y / rect.height) * 100;
    target.current.op = 1;
    ensureLoop();
  }

  function onLeave() {
    target.current.x = 0;
    target.current.y = 0;
    target.current.s = 1;
    target.current.op = 0;
    ensureLoop();
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative', className)}
    >
      {children}
      {glare && !coarse && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            mixBlendMode: 'overlay',
            opacity: 0,
          }}
        />
      )}
    </div>
  );
}
