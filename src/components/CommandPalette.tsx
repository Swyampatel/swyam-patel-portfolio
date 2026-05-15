import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Code2,
  Copy,
  FolderGit2,
  GraduationCap,
  Linkedin,
  Mail,
  Search,
  Sparkles,
} from 'lucide-react';
import { profile } from '../data/portfolio';

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: 'navigate' | 'actions' | 'links';
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  keywords?: string[];
};

const groupOrder: Cmd['group'][] = ['navigate', 'actions', 'links'];
const groupLabels: Record<Cmd['group'], string> = {
  navigate: 'Navigate',
  actions: 'Actions',
  links: 'External',
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const commands: Cmd[] = useMemo(
    () => [
      { id: 'nav-work', label: 'Hero', hint: 'home', group: 'navigate', icon: Sparkles, perform: () => jump('top') },
      { id: 'nav-experience', label: 'Experience', hint: 'work history', group: 'navigate', icon: Briefcase, perform: () => jump('experience'), keywords: ['career', 'roles', 'work'] },
      { id: 'nav-projects', label: 'Projects', hint: 'selected work', group: 'navigate', icon: FolderGit2, perform: () => jump('projects'), keywords: ['portfolio', 'work', 'case studies'] },
      { id: 'nav-stack', label: 'Stack', hint: 'tools & tech', group: 'navigate', icon: Code2, perform: () => jump('stack'), keywords: ['skills', 'tools'] },
      { id: 'nav-credentials', label: 'Credentials', hint: 'education & certs', group: 'navigate', icon: GraduationCap, perform: () => jump('credentials') },
      { id: 'nav-contact', label: 'Contact', hint: 'send a message', group: 'navigate', icon: Mail, perform: () => jump('contact') },

      {
        id: 'act-copy-email',
        label: copied ? 'Email copied to clipboard' : `Copy email · ${profile.email}`,
        hint: '⏎',
        group: 'actions',
        icon: Copy,
        perform: copyEmail,
        keywords: ['email', 'contact', 'mail'],
      },
      {
        id: 'link-github',
        label: 'GitHub · /Swyampatel',
        group: 'links',
        icon: ArrowRight,
        perform: () => window.open(profile.socials.github, '_blank'),
        keywords: ['code', 'repo', 'open source'],
      },
      {
        id: 'link-linkedin',
        label: 'LinkedIn · /in/swyampatel',
        group: 'links',
        icon: Linkedin,
        perform: () => window.open(profile.socials.linkedin, '_blank'),
      },
    ],
    [copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const blob = `${c.label} ${c.hint ?? ''} ${(c.keywords ?? []).join(' ')}`.toLowerCase();
      return blob.includes(q);
    });
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<Cmd['group'], Cmd[]>();
    for (const c of filtered) {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    }
    return groupOrder.flatMap((g) => (map.get(g) ?? []).map((c) => ({ ...c, _group: g })));
  }, [filtered]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
        return;
      }
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(grouped.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        grouped[active]?.perform();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, grouped, active]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  let renderIdx = -1;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-3 py-2 font-mono text-[11px] text-ink-200 backdrop-blur-xl transition hover:border-accent/40 hover:text-ink-50 sm:bottom-6 sm:right-6"
      >
        <Search className="h-3 w-3" />
        <span>Quick nav</span>
        <kbd className="ml-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink-300">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-950/70 px-4 pt-[15vh] backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-2xl backdrop-blur-2xl"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
                style={{
                  background:
                    'conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(167,139,250,0.5) 80deg, transparent 180deg, rgba(99,102,241,0.4) 270deg, transparent 360deg)',
                  animation: 'beam-spin 6s linear infinite',
                }}
              />
              <div className="absolute inset-[1px] rounded-2xl bg-ink-900/95" />

              <div className="relative">
                <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
                  <Search className="h-4 w-4 text-ink-400" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search or jump to…"
                    className="flex-1 bg-transparent text-sm text-ink-50 placeholder:text-ink-400 focus:outline-none"
                  />
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase text-ink-300">
                    Esc
                  </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {grouped.length === 0 ? (
                    <div className="px-4 py-12 text-center text-sm text-ink-400">
                      No matches.
                    </div>
                  ) : (
                    groupOrder.map((g) => {
                      const items = grouped.filter((c) => c._group === g);
                      if (items.length === 0) return null;
                      return (
                        <div key={g} className="mb-2 last:mb-0">
                          <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                            {groupLabels[g]}
                          </div>
                          {items.map((cmd) => {
                            renderIdx++;
                            const isActive = renderIdx === active;
                            const Icon = cmd.icon;
                            const idx = renderIdx;
                            return (
                              <button
                                key={cmd.id}
                                onMouseEnter={() => setActive(idx)}
                                onClick={() => cmd.perform()}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                                  isActive
                                    ? 'bg-white/[0.06] text-ink-50'
                                    : 'text-ink-200 hover:bg-white/[0.03]'
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    isActive ? 'text-accent' : 'text-ink-400'
                                  }`}
                                />
                                <span className="flex-1 truncate text-sm">{cmd.label}</span>
                                {cmd.hint && (
                                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                                    {cmd.hint}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5 font-mono text-[10px] text-ink-400">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">↑↓</kbd>
                      navigate
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">⏎</kbd>
                      select
                    </span>
                  </div>
                  <span>swyam · v1.0</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
