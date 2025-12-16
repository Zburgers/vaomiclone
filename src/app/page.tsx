import Hero from '@/components/sections/hero';
import LogoMarquee from '@/components/sections/logo-marquee';
import BrokenSystem from '@/components/sections/broken-system';
import ConvictionSplit from '@/components/sections/conviction-split';
import StackingCards from '@/components/sections/stacking-cards';
import Investors from '@/components/sections/investors';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <LogoMarquee />
      <BrokenSystem />
      <ConvictionSplit />
      <StackingCards />
      <Investors />
      <Footer />
    </main>
  );
}
