import { useEffect, useRef, useState } from 'react';
import { useActive } from '../lib/use-active';

const BOARD_W = 3200;
const BOARD_H = 2160;
const PAN_DURATION_MS = 32000;

type Card = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind:
    | 'logo'
    | 'stat'
    | 'counter'
    | 'chart'
    | 'bars'
    | 'gradient'
    | 'code'
    | 'note'
    | 'tag';
  hue?: number;
  label?: string;
  value?: string;
  caption?: string;
  data?: number[];
  code?: { ln: string; tone: 'kw' | 'fn' | 'str' | 'mut' | 'cmt' }[];
  text?: string;
  tags?: string[];
};

const CARDS: Card[] = [
  { x: 60, y: 60, w: 360, h: 200, kind: 'stat', label: 'Uptime SLA · Mobilinq', value: '99.95', caption: 'GCP multi-service' },
  { x: 440, y: 60, w: 320, h: 280, kind: 'logo', hue: 270, label: 'Mondai by Rita', caption: 'Head of Engineering' },
  { x: 780, y: 60, w: 480, h: 280, kind: 'chart', hue: 280, label: 'Report time saved · ML Capital',
    data: [88, 78, 70, 64, 51, 42, 36, 30, 22, 14, 8, 6] },
  { x: 1280, y: 60, w: 320, h: 200, kind: 'counter', label: 'Institutional users', value: '500+', caption: 'ML Capital platform' },
  { x: 1620, y: 60, w: 380, h: 280, kind: 'code', label: 'cloud-run.yaml',
    code: [
      { ln: 'service:', tone: 'kw' },
      { ln: '  name: nannylinkup-api', tone: 'mut' },
      { ln: '  image: gcr.io/.../api:v2.4', tone: 'str' },
      { ln: '  scale:', tone: 'kw' },
      { ln: '    min: 1', tone: 'fn' },
      { ln: '    max: 50', tone: 'fn' },
      { ln: '  concurrency: 80', tone: 'mut' },
      { ln: '# zero-downtime rollout', tone: 'cmt' },
    ] },
  { x: 2020, y: 60, w: 280, h: 200, kind: 'stat', label: 'Cost cut · Mobilinq', value: '33', caption: '$18K → $12K monthly' },
  { x: 2320, y: 60, w: 320, h: 280, kind: 'gradient', hue: 200, label: 'GCP', caption: 'Cloud Run · Firestore · BigQuery' },
  { x: 2660, y: 60, w: 480, h: 280, kind: 'bars', hue: 160, label: 'PageSpeed · Nanny Linkup',
    data: [92, 96, 98, 100, 95, 97, 99, 98, 96, 100] },

  { x: 60, y: 280, w: 280, h: 220, kind: 'tag', label: 'Stack',
    tags: ['React', 'Node.js', 'Python', 'TypeScript', 'PyTorch', 'GCP'] },
  { x: 360, y: 360, w: 400, h: 220, kind: 'note',
    text: '“Cut report generation from 48h → 3h via Python + LaTeX automation.”', caption: 'ML Capital · Tech Director' },
  { x: 1280, y: 280, w: 320, h: 200, kind: 'counter', label: 'Roles shipped', value: '6', caption: 'across 5 years' },
  { x: 2020, y: 280, w: 280, h: 200, kind: 'stat', label: 'Model accuracy', value: '99.9', caption: 'ResNet50 · 15K images' },

  { x: 60, y: 520, w: 360, h: 280, kind: 'gradient', hue: 320, label: 'Nanny Linkup', caption: 'Co-Founder' },
  { x: 440, y: 600, w: 320, h: 200, kind: 'stat', label: 'Footprint reduced', value: '75', caption: 'NN compression' },
  { x: 780, y: 360, w: 480, h: 280, kind: 'code', label: 'socket-chat.ts',
    code: [
      { ln: "import { Server } from 'socket.io'", tone: 'kw' },
      { ln: "import Redis from 'ioredis'", tone: 'kw' },
      { ln: '', tone: 'cmt' },
      { ln: 'const io = new Server(httpServer)', tone: 'fn' },
      { ln: "io.on('connection', socket => {", tone: 'fn' },
      { ln: "  socket.on('msg', persist)", tone: 'mut' },
      { ln: '})', tone: 'fn' },
      { ln: '// 412 connected · 0 dropped', tone: 'cmt' },
    ] },
  { x: 1620, y: 360, w: 380, h: 200, kind: 'note',
    text: '“Edge CV system held 30 FPS at sub-100ms inference.”', caption: 'NJCU · AI Researcher' },
  { x: 2320, y: 360, w: 320, h: 200, kind: 'counter', label: 'Years building', value: '5+', caption: 'shipping since 2021' },
  { x: 2660, y: 360, w: 480, h: 220, kind: 'chart', hue: 240, label: 'p95 latency · Mondai',
    data: [120, 110, 95, 102, 87, 92, 78, 84, 79, 80, 76, 82] },

  { x: 60, y: 820, w: 320, h: 240, kind: 'logo', hue: 200, label: 'ML Capital', caption: 'Tech Director' },
  { x: 400, y: 820, w: 360, h: 240, kind: 'tag', label: 'AI',
    tags: ['PyTorch', 'TensorFlow', 'BERT', 'LSTM', 'Transfer Learning'] },
  { x: 780, y: 660, w: 480, h: 240, kind: 'bars', hue: 280, label: 'Cache hit rate · Redis',
    data: [88, 92, 94, 99, 97, 99, 98, 99, 96, 99] },
  { x: 1280, y: 500, w: 320, h: 280, kind: 'gradient', hue: 280, label: 'AI', caption: 'PyTorch · TensorFlow · NLP' },
  { x: 1620, y: 580, w: 380, h: 240, kind: 'code', label: 'pytorch-cv.py',
    code: [
      { ln: 'import torch', tone: 'kw' },
      { ln: 'from torchvision.models import resnet50', tone: 'kw' },
      { ln: '', tone: 'cmt' },
      { ln: 'model = resnet50(pretrained=True)', tone: 'fn' },
      { ln: 'model.fc = nn.Linear(2048, n_cls)', tone: 'mut' },
      { ln: '# 99.9% acc on 15K images', tone: 'cmt' },
    ] },
  { x: 2020, y: 500, w: 320, h: 240, kind: 'note',
    text: '“GitOps + Terraform — eliminated 80% of deploy failures.”', caption: 'Mobilinq · Cloud Engineer' },
  { x: 2360, y: 580, w: 320, h: 240, kind: 'stat', label: 'PageSpeed', value: '95+', caption: 'production · Nanny Linkup' },
  { x: 2700, y: 600, w: 380, h: 240, kind: 'counter', label: 'Weekly downloads', value: '200+', caption: 'ML Capital reports' },

  { x: 60, y: 1080, w: 380, h: 240, kind: 'chart', hue: 100, label: 'Deploy success rate',
    data: [62, 70, 78, 84, 89, 92, 95, 97, 98, 99, 99, 99] },
  { x: 460, y: 1080, w: 320, h: 240, kind: 'gradient', hue: 100, label: 'NJCU', caption: 'AI Researcher' },
  { x: 800, y: 920, w: 480, h: 240, kind: 'note',
    text: '“GCP cost cut 33% via committed-use agreements.”', caption: 'Mobilinq' },
  { x: 1300, y: 800, w: 320, h: 280, kind: 'logo', hue: 100, label: 'NJCU', caption: 'Computer Science' },
  { x: 1620, y: 840, w: 380, h: 220, kind: 'tag', label: 'Cloud',
    tags: ['Cloud Run', 'Firestore', 'BigQuery', 'Terraform', 'Docker', 'Kubernetes'] },
  { x: 2020, y: 760, w: 320, h: 240, kind: 'bars', hue: 40, label: 'Build duration · CI',
    data: [180, 160, 142, 128, 112, 98, 86, 80, 76, 72] },
  { x: 2360, y: 840, w: 380, h: 220, kind: 'code', label: 'terraform.tf',
    code: [
      { ln: "resource \"google_cloud_run_service\" \"api\" {", tone: 'kw' },
      { ln: "  name = \"nl-api\"", tone: 'mut' },
      { ln: "  location = \"us-central1\"", tone: 'str' },
      { ln: '}', tone: 'kw' },
    ] },
  { x: 2760, y: 860, w: 320, h: 240, kind: 'counter', label: "Dean's List", value: '2x', caption: "Spring + Fall '25" },

  { x: 60, y: 1340, w: 320, h: 240, kind: 'stat', label: 'Inference latency', value: '<100', caption: 'ms · edge CV' },
  { x: 400, y: 1340, w: 360, h: 240, kind: 'logo', hue: 30, label: 'Mobilinq', caption: 'Cloud Engineer' },
  { x: 780, y: 1180, w: 380, h: 240, kind: 'chart', hue: 320, label: 'Engagement lift · ML Capital',
    data: [40, 44, 49, 55, 62, 68, 73, 78, 82, 85] },
  { x: 1180, y: 1180, w: 320, h: 240, kind: 'gradient', hue: 220, label: 'Mondai', caption: 'AI-native platform' },
  { x: 1520, y: 1100, w: 320, h: 240, kind: 'counter', label: 'Error budget', value: '99.97', caption: 'within SLO' },
  { x: 1860, y: 1180, w: 320, h: 240, kind: 'note',
    text: '“Edge-compatible CV · 75% smaller · 99.5% acc preserved.”', caption: 'NJCU' },
  { x: 2200, y: 1100, w: 380, h: 240, kind: 'bars', hue: 200, label: 'Lighthouse · all categories',
    data: [98, 100, 96, 99, 100, 95, 99, 100] },
  { x: 2600, y: 1180, w: 380, h: 240, kind: 'tag', label: 'Languages',
    tags: ['TypeScript', 'Python', 'Kotlin', 'Java', 'Swift', 'SQL'] },
  { x: 3000, y: 1340, w: 200, h: 200, kind: 'gradient', hue: 50, label: 'GCP', caption: '·' },

  { x: 60, y: 1620, w: 360, h: 240, kind: 'gradient', hue: 240, label: 'Nanny Linkup', caption: 'Realtime · GCP' },
  { x: 440, y: 1620, w: 320, h: 240, kind: 'stat', label: 'Time-to-recover', value: '15', caption: 'min · DR objective' },
  { x: 780, y: 1440, w: 480, h: 240, kind: 'code', label: 'firestore-query.ts',
    code: [
      { ln: 'const q = db.collection("providers")', tone: 'fn' },
      { ln: '  .where("verified", "==", true)', tone: 'mut' },
      { ln: '  .orderBy("rating", "desc")', tone: 'mut' },
      { ln: '  .limit(20)', tone: 'mut' },
      { ln: '// p99 −43ms after index', tone: 'cmt' },
    ] },
  { x: 1280, y: 1440, w: 320, h: 240, kind: 'counter', label: 'Lines shipped', value: '120K', caption: 'across 6 roles' },
  { x: 1620, y: 1340, w: 380, h: 200, kind: 'tag', label: 'Frameworks',
    tags: ['React', 'Next.js', 'Node.js', 'Flask', 'Spring Boot'] },
  { x: 2020, y: 1340, w: 320, h: 200, kind: 'note',
    text: '“5+ years building · 0 prod incidents on watch.”', caption: 'Operating principle' },
  { x: 2360, y: 1340, w: 380, h: 240, kind: 'chart', hue: 60, label: 'Throughput · req/s',
    data: [120, 145, 160, 180, 220, 260, 280, 310, 340, 360, 380, 400] },
  { x: 2760, y: 1440, w: 320, h: 240, kind: 'gradient', hue: 280, label: 'Realtime', caption: 'Socket.io · WebRTC' },

  { x: 60, y: 1880, w: 320, h: 220, kind: 'tag', label: 'Data',
    tags: ['Firestore', 'BigQuery', 'Redis', 'PostgreSQL', 'MongoDB'] },
  { x: 400, y: 1880, w: 360, h: 220, kind: 'bars', hue: 0, label: 'Connected sockets',
    data: [50, 80, 110, 140, 180, 210, 260, 320, 380, 412] },
  { x: 780, y: 1700, w: 320, h: 220, kind: 'gradient', hue: 160, label: 'Realtime', caption: 'Socket.io · presence' },
  { x: 1120, y: 1700, w: 380, h: 220, kind: 'stat', label: 'Hit-rate · Redis', value: '99.2', caption: 'presence cache' },
  { x: 1520, y: 1700, w: 320, h: 220, kind: 'counter', label: 'Repos shipped', value: '20+', caption: 'public + private' },
  { x: 1860, y: 1700, w: 360, h: 220, kind: 'chart', hue: 280, label: 'Bundle size · /home',
    data: [220, 198, 184, 170, 158, 144, 132, 124, 118, 116] },
  { x: 2240, y: 1700, w: 380, h: 220, kind: 'note', text: '“Engineering leadership at 21. Shipping daily.”' },
  { x: 2640, y: 1700, w: 320, h: 220, kind: 'logo', hue: 220, label: 'AWS', caption: 'Mobilinq stack' },

  { x: 60, y: 1880, w: 320, h: 220, kind: 'gradient', hue: 60 },
  { x: 2640, y: 1940, w: 320, h: 180, kind: 'gradient', hue: 200 },
];

function ChartSparkline({
  data,
  accent,
  frame,
}: {
  data: number[];
  accent: string;
  frame: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const wave = Math.sin(frame / 28 + i * 0.55) * (range * 0.06);
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v + wave - min) / range) * 70 - 15;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const safeId = `g${accent.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={safeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,100 ${points} 100,100`} fill={`url(#${safeId})`} stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke={accent}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarsChart({
  data,
  accent,
  frame,
}: {
  data: number[];
  accent: string;
  frame: number;
}) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: '100%' }}>
      {data.map((v, i) => {
        const wave = Math.sin(frame / 22 + i * 0.85) * 8;
        const height = Math.max(15, Math.min(100, ((v + wave) / max) * 100));
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${height}%`,
              background: `linear-gradient(180deg, ${accent} 0%, ${accent}33 100%)`,
              borderRadius: 4,
              transition: 'height 60ms linear',
            }}
          />
        );
      })}
    </div>
  );
}

const codeColors: Record<string, string> = {
  kw: '#a78bfa',
  fn: '#7dd3fc',
  str: '#86efac',
  mut: '#e2e2e8',
  cmt: '#71717a',
};

function CardView({ card, frame }: { card: Card; frame: number }) {
  const baseHue = card.hue ?? 270;
  const accent = `hsl(${baseHue}, 75%, 65%)`;

  const base: React.CSSProperties = {
    position: 'absolute',
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    borderRadius: 18,
    background:
      'linear-gradient(180deg, rgba(20,20,24,0.95) 0%, rgba(10,10,12,0.95) 100%)',
    border: '1px solid rgba(255,255,255,0.06)',
    overflow: 'hidden',
    padding: 18,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
  };

  const labelEl = card.label ? (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
      }}
    >
      {card.label}
    </div>
  ) : null;

  const captionEl = card.caption ? (
    <div
      style={{
        marginTop: 6,
        fontSize: 11,
        color: 'rgba(255,255,255,0.45)',
        fontFamily: 'Geist Mono, ui-monospace, monospace',
      }}
    >
      {card.caption}
    </div>
  ) : null;

  if (card.kind === 'stat') {
    return (
      <div style={base}>
        {labelEl}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.04em' }}>
            {card.value}
          </span>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>%</span>
        </div>
        {captionEl}
      </div>
    );
  }

  if (card.kind === 'counter') {
    return (
      <div style={base}>
        {labelEl}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.04em' }}>
            {card.value}
          </span>
        </div>
        {captionEl}
      </div>
    );
  }

  if (card.kind === 'chart') {
    return (
      <div style={base}>
        {labelEl}
        <div style={{ flex: 1, marginTop: 4 }}>
          <ChartSparkline data={card.data!} accent={accent} frame={frame} />
        </div>
      </div>
    );
  }

  if (card.kind === 'bars') {
    return (
      <div style={base}>
        {labelEl}
        <div style={{ flex: 1, marginTop: 4 }}>
          <BarsChart data={card.data!} accent={accent} frame={frame} />
        </div>
      </div>
    );
  }

  if (card.kind === 'code') {
    return (
      <div style={base}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            fontFamily: 'Geist Mono, ui-monospace, monospace',
            fontSize: 12,
          }}
        >
          {card.code!.map((l, i) => (
            <div
              key={i}
              style={{ color: codeColors[l.tone], opacity: l.tone === 'cmt' ? 0.7 : 0.95 }}
            >
              {l.ln || ' '}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.kind === 'logo') {
    const hueShift = baseHue + (frame / 80) % 60;
    return (
      <div style={{ ...base, padding: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 30%, hsl(${hueShift}, 85%, 60%) 0%, hsl(${(hueShift + 60) % 360}, 75%, 35%) 55%, #0a0a0a 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 70% 80%, hsl(${(hueShift + 180) % 360}, 80%, 55%) 0%, transparent 50%)`,
            opacity: 0.45,
            mixBlendMode: 'screen',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 18,
          }}
        >
          {card.label && (
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
              {card.label}
            </div>
          )}
          {captionEl}
        </div>
      </div>
    );
  }

  if (card.kind === 'gradient') {
    const hueShift = baseHue + (frame / 100) % 30;
    return (
      <div style={{ ...base, padding: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 60% 40%, hsl(${hueShift}, 75%, 60%) 0%, hsl(${(hueShift + 50) % 360}, 65%, 30%) 55%, #0a0a0a 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 20% 80%, hsl(${(hueShift + 90) % 360}, 70%, 50%) 0%, transparent 60%)`,
            opacity: 0.5,
            mixBlendMode: 'screen',
          }}
        />
        {(card.label || card.caption) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 18,
            }}
          >
            {card.label && (
              <div style={{ fontSize: 18, fontWeight: 600 }}>{card.label}</div>
            )}
            {captionEl}
          </div>
        )}
      </div>
    );
  }

  if (card.kind === 'note') {
    return (
      <div style={base}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: 17,
            lineHeight: 1.4,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.01em',
          }}
        >
          {card.text}
        </div>
        {captionEl}
      </div>
    );
  }

  if (card.kind === 'tag') {
    return (
      <div style={base}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 6,
          }}
        >
          {card.tags!.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                padding: '5px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'Geist Mono, ui-monospace, monospace',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return <div style={base} />;
}

function easeInOutSine(t: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

export function BentoShowcase() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [frame, setFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const pauseStartRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const active = useActive(containerRef as React.RefObject<HTMLElement>, {
    rootMargin: '300px',
  });
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const onEnter = () => {
      if (!pausedRef.current) {
        pausedRef.current = true;
        pauseStartRef.current = performance.now();
      }
    };
    const onLeave = () => {
      if (pausedRef.current && pauseStartRef.current != null) {
        offsetRef.current += performance.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      pausedRef.current = false;
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    let raf = 0;
    let lastFrame = 0;

    const loop = (t: number) => {
      if (!activeRef.current) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (startRef.current == null) startRef.current = t;
      if (!pausedRef.current) {
        const elapsed = t - startRef.current - offsetRef.current;

        // Triangle wave: 0 → 1 → 0 → 1 ... over 2 * PAN_DURATION_MS
        // This eliminates the reset jump by ping-ponging direction
        const cycle = (elapsed % (PAN_DURATION_MS * 2)) / PAN_DURATION_MS;
        const linearPhase = cycle <= 1 ? cycle : 2 - cycle;
        const phase = easeInOutSine(linearPhase);

        const rect = el.getBoundingClientRect();
        const maxX = Math.max(0, BOARD_W - rect.width);
        const maxY = Math.max(0, BOARD_H - rect.height);
        setPos({ x: phase * maxX, y: phase * maxY });

        const nextFrame = Math.floor(elapsed / 16);
        if (nextFrame !== lastFrame) {
          lastFrame = nextFrame;
          setFrame(nextFrame);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-300">
            <span className="text-accent">⌖</span>
            <span className="h-px w-8 bg-white/10" />
            <span>The work, drifting by</span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-ink-500 sm:inline">
            Hover to pause
          </span>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-black"
          style={{ aspectRatio: '16 / 9', maxHeight: 540 }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: BOARD_W,
              height: BOARD_H,
              transform: `translate3d(${-pos.x}px, ${-pos.y}px, 0)`,
              willChange: 'transform',
            }}
          >
            {CARDS.map((c, i) => (
              <CardView key={i} card={c} frame={frame} />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 80%, #000 100%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,7,8,0.4) 0%, transparent 20%, transparent 80%, rgba(7,7,8,0.4) 100%)',
            }}
          />

          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-300">
              Real metrics · real stack · {CARDS.length} cards
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
