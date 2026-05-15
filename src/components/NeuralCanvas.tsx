import { useEffect, useRef } from 'react';
import { useActive } from '../lib/use-active';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  r: number;
  pulse: number;
};

const COLORS = {
  node: 'rgba(167, 139, 250, ',
  link: 'rgba(167, 139, 250, ',
  glow: 'rgba(99, 102, 241, ',
};

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const active = useActive(canvasRef as React.RefObject<HTMLElement>, {
    rootMargin: '200px',
  });
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let activeLink = 0;
    const linkDistance = 140;
    const mouseRadius = 180;

    function init() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(120, Math.floor((width * height) / 11000));
      nodes = Array.from({ length: density }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.6,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    }

    function draw() {
      if (!activeRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx!.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (mouseRef.current.active) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const d = Math.hypot(dx, dy);
          if (d < mouseRadius && d > 0) {
            const force = (1 - d / mouseRadius) * 0.6;
            n.x -= (dx / d) * force;
            n.y -= (dy / d) * force;
          }
        }

        n.pulse += 0.012;
      }

      activeLink = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          if (d < linkDistance) {
            const opacity = (1 - d / linkDistance) * 0.4;
            ctx!.strokeStyle = COLORS.link + opacity + ')';
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
            activeLink++;
          }
        }

        if (mouseRef.current.active) {
          const a = nodes[i];
          const dx = mx - a.x;
          const dy = my - a.y;
          const d = Math.hypot(dx, dy);
          if (d < mouseRadius * 1.1) {
            const opacity = (1 - d / (mouseRadius * 1.1)) * 0.7;
            ctx!.strokeStyle = COLORS.glow + opacity + ')';
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mx, my);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) / 2;
        const r = n.r + pulse * 0.6;

        ctx!.beginPath();
        ctx!.fillStyle = COLORS.node + (0.6 + pulse * 0.4) + ')';
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.fillStyle = COLORS.glow + 0.08 + ')';
        ctx!.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (mouseRef.current.active) {
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(167, 139, 250, 0.9)';
        ctx!.arc(mx, my, 3, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      init();
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }

    function onLeave() {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    init();
    if (!reduceMotion) {
      draw();
    } else {
      ctx!.clearRect(0, 0, width, height);
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(167,139,250,0.6)';
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ display: 'block' }}
    />
  );
}
