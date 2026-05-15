import { lazy, Suspense } from 'react';
import { Background } from './components/Background';
import { BootSequence } from './components/BootSequence';
import { CommandPalette } from './components/CommandPalette';
import { Contact } from './components/Contact';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { StatsShowcase } from './components/StatsShowcase';

const BentoShowcase = lazy(() =>
  import('./components/BentoShowcase').then((m) => ({ default: m.BentoShowcase })),
);
const Experience = lazy(() =>
  import('./components/Experience').then((m) => ({ default: m.Experience })),
);

function SectionSkeleton({ height = 540 }: { height?: number }) {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-2xl border border-white/5 bg-white/[0.01]"
          style={{ height }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <div id="top" className="relative min-h-screen">
      <BootSequence />
      <Background />
      <CursorSpotlight />
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton height={540} />}>
          <BentoShowcase />
        </Suspense>
        <StatsShowcase />
        <Suspense fallback={<SectionSkeleton height={680} />}>
          <Experience />
        </Suspense>
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
