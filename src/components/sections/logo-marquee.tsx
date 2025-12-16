'use client';
import { motion } from 'framer-motion';

const logos = [
  'Sequoia',
  'Tiger Global',
  'GV',
  'Andreessen Horowitz',
  'Accel',
  'Lightspeed',
  'Insight Partners',
  'Kleiner Perkins',
];

export default function LogoMarquee() {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 py-8">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          ease: 'linear',
          duration: 30,
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8 text-2xl font-semibold text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
