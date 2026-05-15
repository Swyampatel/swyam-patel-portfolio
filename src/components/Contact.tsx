import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(
        `Portfolio inquiry from ${formData.get('name') ?? 'someone'}`,
      );
      const body = encodeURIComponent(String(formData.get('message') ?? ''));
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('idle');
      return;
    }

    formData.append('access_key', WEB3FORMS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
        setError(data.message ?? 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Network error');
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="05"
          label="Contact"
          title="Let's build something."
          description="Open to engineering leadership roles, founding-engineer opportunities, and serious collaborations."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 lg:col-span-2"
          >
            <h3 className="font-display text-xl font-semibold text-ink-50">
              Direct channels
            </h3>
            <p className="mt-2 text-sm text-ink-300">
              Fastest way to reach me. I read everything.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span className="font-mono text-[13px] text-ink-100">
                  {profile.email}
                </span>
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <Linkedin className="h-4 w-4 text-accent" />
                <span className="font-mono text-[13px] text-ink-100">
                  /in/swyampatel
                </span>
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <Github className="h-4 w-4 text-accent" />
                <span className="font-mono text-[13px] text-ink-100">
                  /Swyampatel
                </span>
              </a>

              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-mono text-[13px] text-ink-300">
                  {profile.location}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 lg:col-span-3"
          >
            <input type="hidden" name="from_name" value="Portfolio Site" />
            <input type="hidden" name="subject" value="New portfolio inquiry" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" name="name" label="Name" required />
              <Field id="email" name="email" label="Email" type="email" required />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-ink-50 placeholder:text-ink-400 transition focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="What are you working on?"
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="min-h-[20px] text-xs">
                {status === 'sent' && (
                  <span className="text-emerald-400">
                    Message sent. I'll reply soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-rose-400">
                    {error ?? 'Failed to send.'}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-50 px-5 py-2.5 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
};

function Field({ id, name, label, type = 'text', required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-300"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-ink-50 placeholder:text-ink-400 transition focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
