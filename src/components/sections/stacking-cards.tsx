'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { Bot, Filter, Sparkles, Handshake } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const cards = [
  {
    id: 1,
    title: 'Narrative Calibration',
    description:
      'We refine your story into a sharp, compelling narrative that resonates with the right investors. We find the core truth and make it undeniable.',
    icon: <Sparkles className="size-8" />,
    bgColor: 'bg-gradient-to-br from-purple-900/20 to-black/10',
  },
  {
    id: 2,
    title: 'The Intelligence Filter',
    description:
      'Our AI analyzes thousands of data points to identify investors whose theses perfectly align with your vision, going beyond surface-level matches.',
    icon: <Filter className="size-8" />,
    bgColor: 'bg-gradient-to-br from-blue-900/20 to-black/10',
  },
  {
    id: 3,
    title: 'Automated Logic',
    description:
      'Vaomi builds a bulletproof data room and crafts personalized outreach that speaks directly to each investor’s interests and portfolio.',
    icon: <Bot className="size-8" />,
    bgColor: 'bg-gradient-to-br from-green-900/20 to-black/10',
  },
  {
    id: 4,
    title: 'Curated Introductions',
    description:
      'We don’t just connect you; we orchestrate warm, high-conviction introductions that ensure you’re not just another email in their inbox.',
    icon: <Handshake className="size-8" />,
    bgColor: 'bg-gradient-to-br from-yellow-900/20 to-black/10',
  },
];

const StackingCards = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (isMobile) {
    return (
      <section className="container mx-auto max-w-4xl space-y-8 py-24">
        <h2 className="mb-12 text-center font-headline text-4xl font-semibold">
          How Vaomi Works
        </h2>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col gap-4 rounded-2xl border border-white/10 ${card.bgColor} p-8 shadow-2xl backdrop-blur-md`}
          >
            <div className="flex items-center gap-4 text-accent">
              {card.icon}
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
            </div>
            <p className="text-lg text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[400vh] py-24">
      <div className="sticky top-24 mx-auto max-w-4xl text-center">
        <h2 className="mb-12 font-headline text-4xl font-semibold">
          How Vaomi Works
        </h2>
      </div>
      {cards.map((card, i) => {
        const start = i / cards.length;
        const end = start + 1 / cards.length;
        const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
        
        return (
          <motion.div
            key={card.id}
            className={`sticky top-40 mx-auto my-4 flex h-[70vh] w-[90vw] max-w-4xl origin-top flex-col justify-between rounded-2xl border border-white/10 ${card.bgColor} p-8 shadow-2xl backdrop-blur-md lg:p-12`}
            style={{ scale }}
          >
            <div>
              <div className="flex items-center gap-4 text-accent">
                {card.icon}
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              </div>
              <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
                {card.description}
              </p>
            </div>
            <div className="text-right text-5xl font-bold text-white/10">
              0{card.id}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default StackingCards;
