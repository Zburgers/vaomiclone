'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Flame, Calculator } from 'lucide-react';

const cards = [
  {
    id: 'financial',
    icon: <Calculator className="size-8 text-muted-foreground" />,
    title: 'The Financial Process',
    subtitle:
      'Metrics, market size, TAM, SAM, SOM. The cold, hard numbers that every investor expects. Necessary, but insufficient. This is table stakes.',
    items: [
      'Financial Modeling',
      'Market Analysis',
      'Competitive Landscape',
      'Unit Economics',
    ],
    highlight: false,
  },
  {
    id: 'emotional',
    icon: <Flame className="size-8 text-accent" />,
    title: 'The Emotional One',
    subtitle:
      "This is where conviction is born. It's the story, the founder's journey, the unwavering belief. It's the 'why' that numbers can't capture.",
    items: [
      'Narrative Calibration',
      'Founder-Market Fit',
      'Vision & Mission Clarity',
      "The 'Inevitable' Future",
    ],
    highlight: true,
  },
];

export default function ConvictionSplit() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] py-24">
      <div className="sticky top-1/2 mx-auto max-w-6xl -translate-y-1/2 px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {cards.map((card, i) => {
            const isFirstCard = i === 0;
            const targetScale = 1 - (cards.length - 1 - i) * 0.05;
            const scale = useTransform(
              scrollYProgress,
              [i / cards.length, 1],
              [1, targetScale]
            );

            const targetTranslateY = -i * 16; // -1rem
            const translateY = useTransform(
              scrollYProgress,
              [i / cards.length, 1],
              [0, targetTranslateY]
            );

            return (
              <motion.div
                key={card.id}
                className={`top-0 origin-top rounded-xl border border-white/10 p-8 ${
                  isFirstCard ? 'bg-transparent' : 'bg-white/5'
                }`}
                style={{
                  scale,
                  translateY,
                  position: isFirstCard ? 'static' : 'sticky',
                  top: `calc(50% - 50vh + ${i * 48}px)`, // Adjust sticky position
                }}
              >
                <div className="flex items-center gap-4">
                  {card.icon}
                  <h3
                    className={`text-3xl font-semibold ${
                      card.highlight ? 'text-white' : 'text-muted-foreground'
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`mt-4 text-lg ${
                    card.highlight
                      ? 'text-foreground'
                      : 'text-muted-foreground/70'
                  }`}
                >
                  {card.subtitle}
                </p>
                <ul
                  className={`mt-6 space-y-2 ${
                    card.highlight
                      ? 'text-foreground'
                      : 'text-muted-foreground/70'
                  }`}
                >
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className={card.highlight ? 'font-semibold' : ''}
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
