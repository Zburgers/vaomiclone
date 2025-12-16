import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import HelpedRaise from '@/components/sections/helped-raise';
import BrokenSystem from '@/components/sections/broken-system';
import ConvictionSplit from '@/components/sections/conviction-split';
import StackingCards from '@/components/sections/stacking-cards';
import Investors from '@/components/sections/investors';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="flex flex-col bg-black">
      <Header />
      <Hero />
      <HelpedRaise />
      <BrokenSystem />
      <ConvictionSplit />
      <StackingCards />
      <Investors />
      <Footer />
    </main>
  );
}
