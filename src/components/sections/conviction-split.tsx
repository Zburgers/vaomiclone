'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Flame } from 'lucide-react';

export default function ConvictionSplit() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const rightColScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);
  const rightColOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]);

  const leftColOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.5]);

  return (
    <section ref={targetRef} className="container mx-auto my-24 max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div style={{ opacity: leftColOpacity }} className="space-y-6">
          <h3 className="text-3xl font-semibold text-muted-foreground">
            The Financial Process
          </h3>
          <p className="text-lg text-muted-foreground/70">
            Metrics, market size, TAM, SAM, SOM. The cold, hard numbers that
            every investor expects. Necessary, but insufficient. This is table
            stakes.
          </p>
          <ul className="space-y-2 text-muted-foreground/70">
            <li>- Financial Modeling</li>
            <li>- Market Analysis</li>
            <li>- Competitive Landscape</li>
            <li>- Unit Economics</li>
          </ul>
        </motion.div>
        <motion.div
          style={{ scale: rightColScale, opacity: rightColOpacity }}
          className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-8"
        >
          <div className="flex items-center gap-4">
            <Flame className="size-8 text-accent" />
            <h3 className="text-3xl font-semibold text-white">
              The Emotional One
            </h3>
          </div>
          <p className="text-lg text-foreground">
            This is where conviction is born. It's the story, the founder's
            journey, the unwavering belief. It's the 'why' that numbers can't
            capture.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="font-semibold">- Narrative Calibration</li>
            <li className="font-semibold">- Founder-Market Fit</li>
            <li className="font-semibold">- Vision & Mission Clarity</li>
            <li className="font-semibold">- The 'Inevitable' Future</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
