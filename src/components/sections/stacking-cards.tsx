'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

const cards = [
  {
    id: 1,
    title: 'The Narrative Calibration',
    quote: '"Decoding your vision before decoding the market."',
    points: [
      'Deep-dive into the founder’s core truth',
      'Refining the pitch mechanics and flow',
      'Transforming complexity into inevitability',
    ],
    icon: <LinkIcon className="size-5" />,
    image: 'https://picsum.photos/seed/tech1/600/400',
    imageHint: 'abstract technology',
  },
  {
    id: 2,
    title: 'The Intelligence Filter',
    quote: '"Finding the right signal in a world of noise."',
    points: [
      'AI-driven investor thesis alignment',
      'Beyond-the-surface portfolio analysis',
      'Identifying conviction before the first conversation',
    ],
    icon: <LinkIcon className="size-5" />,
    image: 'https://picsum.photos/seed/tech2/600/400',
    imageHint: 'data network',
  },
  {
    id: 3,
    title: 'Automated Logic',
    quote: '"Building a data room that tells your story."',
    points: [
      'Bulletproof data room construction',
      'Personalized, data-driven outreach',
      'Automating the process, not the relationship',
    ],
    icon: <LinkIcon className="size-5" />,
    image: 'https://picsum.photos/seed/tech3/600/400',
    imageHint: 'server code',
  },
  {
    id: 4,
    title: 'Curated Introductions',
    quote: '"From a cold email to a warm handshake."',
    points: [
      'Orchestrating high-conviction introductions',
      'Ensuring you’re a priority, not a number',
      'Building momentum through qualified meetings',
    ],
    icon: <LinkIcon className="size-5" />,
    image: 'https://picsum.photos/seed/tech4/600/400',
    imageHint: 'business meeting',
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
          Here&apos;s how it all comes together
        </h2>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col gap-8 rounded-2xl border border-white/10 bg-black p-8 shadow-2xl backdrop-blur-md`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                <span className="text-muted-foreground">0{card.id}</span>{' '}
                {card.title}
              </h3>
              <div className="rounded-full border border-white/20 p-2 text-white/70">
                {card.icon}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground italic">
                {card.quote}
              </p>
              <ul className="space-y-2 text-foreground">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src={card.image}
              alt={card.title}
              width={600}
              height={400}
              data-ai-hint={card.imageHint}
              className="w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[400vh] py-24">
      <div className="sticky top-24 mx-auto max-w-6xl text-center">
        <h2 className="mb-12 font-headline text-4xl font-semibold">
          Here&apos;s how it all comes together
        </h2>
      </div>
      {cards.map((card, i) => {
        const start = i / cards.length;
        const end = start + 1 / cards.length;
        const scale = useTransform(scrollYProgress, [start, end], [1, 0.9]);

        return (
          <motion.div
            key={card.id}
            className={`sticky top-40 mx-auto my-4 flex h-[70vh] w-[90vw] max-w-5xl origin-top flex-col justify-between rounded-2xl border border-white/10 bg-black p-8 shadow-2xl backdrop-blur-md lg:p-12`}
            style={{ scale }}
          >
            <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">
                    <span className="text-muted-foreground">0{card.id}</span>{' '}
                    {card.title}
                  </h3>
                  <div className="rounded-full border border-white/20 p-2 text-white/70">
                    {card.icon}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center space-y-6">
                  <p className="text-xl text-muted-foreground italic">
                    {card.quote}
                  </p>
                  <ul className="space-y-2 text-lg text-foreground">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1.5 text-accent">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative hidden h-full w-full md:block">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  data-ai-hint={card.imageHint}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default StackingCards;
